const { Telegraf } = require('telegraf');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN || '8427853863:AAG7VC0jIJWf0-26pRqO9DSNyA5BLMDXsYc');
const app = express();

// ===== CORS FIX =====
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Preflight requests
app.options('*', cors());

app.use(express.json());

const payments = new Map();

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        time: Date.now(),
        bot: 'connected'
    });
});

// Create invoice
app.post('/api/create-invoice', async (req, res) => {
    try {
        const { title, description, payload, amount, userId } = req.body;
        
        console.log('📱 Creating invoice:', { title, amount, userId });
        
        if (!title || !amount || !payload) {
            return res.status(400).json({ 
                success: false,
                error: 'Missing required fields' 
            });
        }
        
        const invoice = await bot.telegram.createInvoiceLink({
            title,
            description: description || title,
            payload: JSON.stringify({ 
                type: payload,
                userId,
                time: Date.now()
            }),
            provider_token: '',
            currency: 'XTR',
            prices: [{ label: title, amount }]
        });
        
        payments.set(payload, {
            userId,
            amount,
            title,
            created: Date.now()
        });
        
        console.log('✅ Invoice created');
        
        res.json({ 
            success: true,
            invoice_link: invoice 
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Bot handlers
bot.on('pre_checkout_query', async (ctx) => {
    try {
        await ctx.answerPreCheckoutQuery(true);
        console.log('✅ Pre-checkout approved');
    } catch (error) {
        console.error('❌ Pre-checkout error:', error);
        await ctx.answerPreCheckoutQuery(false, 'Помилка');
    }
});

bot.on('successful_payment', async (ctx) => {
    try {
        const { invoice_payload, total_amount } = ctx.message.successful_payment;
        const data = JSON.parse(invoice_payload);
        
        console.log('🎉 Payment successful:', data.type);
        
        await ctx.reply(
            `✅ Оплату прийнято!\n\nСума: ${total_amount} ⭐\n\nПовертайся в гру!`,
            {
                reply_markup: {
                    inline_keyboard: [[
                        { 
                            text: '🎮 Повернутися',
                            web_app: { url: 'https://dyvach94.github.io/boxing-manager/' }
                        }
                    ]]
                }
            }
        );
    } catch (error) {
        console.error('❌ Payment error:', error);
    }
});

bot.catch((err) => {
    console.error('❌ Bot error:', err);
});

// Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server on port ${PORT}`);
});

bot.launch().then(() => {
    console.log('🤖 Bot launched');
}).catch((error) => {
    console.error('❌ Bot launch error:', error);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = app;
