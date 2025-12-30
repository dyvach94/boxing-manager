const { Telegraf } = require('telegraf');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN || '8427853863:AAG7VC0jIJWf0-26pRqO9DSNyA5BLMDXsYc');
const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'] }));
app.options('*', cors());
app.use(express.json());

const payments = new Map();
const scheduledNotifications = new Map();

// ===== NOTIFICATION SYSTEM =====
async function sendNotification(userId, message) {
    try {
        await bot.telegram.sendMessage(userId, message, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: '🎮 Відкрити гру',
                        web_app: { url: 'https://dyvach94.github.io/boxing-manager/' }
                    }
                ]]
            }
        });
        console.log('📱 Notification sent to:', userId);
        return true;
    } catch (error) {
        console.error('❌ Notification error:', error);
        return false;
    }
}

// Check every minute
setInterval(() => {
    const now = Date.now();
    scheduledNotifications.forEach((notification, id) => {
        if (notification.time <= now) {
            sendNotification(notification.userId, notification.message);
            scheduledNotifications.delete(id);
        }
    });
}, 60000);

// ===== API =====
app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: Date.now(), notifications: scheduledNotifications.size });
});

app.post('/api/schedule-notification', async (req, res) => {
    try {
        const { userId, message, completionTime } = req.body;
        const id = Date.now() + Math.random();
        scheduledNotifications.set(id, { userId, message, time: completionTime });
        res.json({ success: true, notificationId: id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/create-invoice', async (req, res) => {
    try {
        const { title, description, payload, amount, userId } = req.body;
        if (!title || !amount || !payload) {
            return res.status(400).json({ success: false, error: 'Missing fields' });
        }
        const invoice = await bot.telegram.createInvoiceLink({
            title,
            description: description || title,
            payload: JSON.stringify({ type: payload, userId, time: Date.now() }),
            provider_token: '',
            currency: 'XTR',
            prices: [{ label: title, amount }]
        });
        payments.set(payload, { userId, amount, title, created: Date.now() });
        res.json({ success: true, invoice_link: invoice });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== BOT =====
bot.on('pre_checkout_query', async (ctx) => {
    await ctx.answerPreCheckoutQuery(true);
});

bot.on('successful_payment', async (ctx) => {
    const { total_amount } = ctx.message.successful_payment;
    await ctx.reply(`✅ Оплату прийнято!\n\nСума: ${total_amount} ⭐`, {
        reply_markup: {
            inline_keyboard: [[
                { text: '🎮 Повернутися', web_app: { url: 'https://dyvach94.github.io/boxing-manager/' } }
            ]]
        }
    });
});

bot.catch((err) => console.error('❌ Bot error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Port ${PORT}`));
bot.launch().then(() => console.log('🤖 Bot OK'));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = app;
