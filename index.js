const { Telegraf } = require('telegraf');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST']
}));
app.use(express.json());

// Storage для pending payments (в production використовуй БД)
const pendingPayments = new Map();

// ===== API ENDPOINTS =====

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// Create invoice
app.post('/api/create-invoice', async (req, res) => {
    try {
        const { title, description, payload, amount, userId } = req.body;
        
        console.log('📱 Creating invoice:', { title, amount, userId });
        
        // Валідація
        if (!title || !amount || !payload) {
            return res.status(400).json({ 
                error: 'Missing required fields' 
            });
        }
        
        // Створити invoice через Telegram Bot API
        const invoice = await bot.telegram.createInvoiceLink({
            title,
            description: description || title,
            payload: JSON.stringify({ 
                type: payload,
                userId,
                timestamp: Date.now()
            }),
            provider_token: '', // Empty for Telegram Stars
            currency: 'XTR', // Telegram Stars currency
            prices: [{ 
                label: title, 
                amount: amount // Amount in Stars
            }]
        });
        
        // Зберегти pending payment
        pendingPayments.set(payload, {
            userId,
            amount,
            title,
            created: Date.now()
        });
        
        console.log('✅ Invoice created:', invoice);
        
        res.json({ 
            success: true,
            invoice_link: invoice 
        });
        
    } catch (error) {
        console.error('❌ Invoice creation error:', error);
        res.status(500).json({ 
            error: error.message 
        });
    }
});

// Check payment status (для polling якщо потрібно)
app.get('/api/payment-status/:payload', (req, res) => {
    const { payload } = req.params;
    const payment = pendingPayments.get(payload);
    
    if (!payment) {
        return res.json({ status: 'not_found' });
    }
    
    res.json({ 
        status: payment.completed ? 'completed' : 'pending',
        payment 
    });
});

// ===== TELEGRAM BOT HANDLERS =====

// Pre-checkout query (перевірка перед оплатою)
bot.on('pre_checkout_query', async (ctx) => {
    try {
        console.log('💳 Pre-checkout query:', ctx.preCheckoutQuery);
        
        const { invoice_payload } = ctx.preCheckoutQuery;
        const data = JSON.parse(invoice_payload);
        
        // Тут можна додати додаткові перевірки
        // Наприклад, чи користувач має право купити цей товар
        
        await ctx.answerPreCheckoutQuery(true);
        console.log('✅ Pre-checkout approved');
        
    } catch (error) {
        console.error('❌ Pre-checkout error:', error);
        await ctx.answerPreCheckoutQuery(
            false, 
            'Помилка обробки платежу'
        );
    }
});

// Successful payment (після успішної оплати)
bot.on('successful_payment', async (ctx) => {
    try {
        const payment = ctx.message.successful_payment;
        console.log('🎉 Payment successful:', payment);
        
        const { 
            invoice_payload, 
            total_amount,
            telegram_payment_charge_id 
        } = payment;
        
        const data = JSON.parse(invoice_payload);
        const { type, userId } = data;
        
        // Позначити як виконаний
        const pending = pendingPayments.get(type);
        if (pending) {
            pending.completed = true;
            pending.completedAt = Date.now();
            pending.chargeId = telegram_payment_charge_id;
        }
        
        // Відправити підтвердження користувачу
        await ctx.reply(
            `✅ Оплату прийнято!\n\n` +
            `${pending?.title || 'Покупка'} активовано.\n` +
            `Сума: ${total_amount} ⭐\n\n` +
            `Повертайся в гру!`,
            {
                reply_markup: {
                    inline_keyboard: [[
                        { 
                            text: '🎮 Повернутися в гру',
                            web_app: { url: process.env.FRONTEND_URL }
                        }
                    ]]
                }
            }
        );
        
        console.log('✅ Payment processed:', {
            type,
            userId,
            amount: total_amount,
            chargeId: telegram_payment_charge_id
        });
        
        // Тут можна зберегти в БД, надіслати webhook в гру, тощо
        
    } catch (error) {
        console.error('❌ Payment processing error:', error);
    }
});

// Помилки bot
bot.catch((err, ctx) => {
    console.error('❌ Bot error:', err);
});

// ===== START SERVER =====

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
    console.log(`📱 Bot token: ${process.env.BOT_TOKEN.substring(0, 10)}...`);
});

// Launch bot
bot.launch().then(() => {
    console.log('🤖 Bot launched successfully');
}).catch((error) => {
    console.error('❌ Bot launch error:', error);
});

// Graceful stop
process.once('SIGINT', () => {
    bot.stop('SIGINT');
    process.exit(0);
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    process.exit(0);
});
