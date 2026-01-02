const { Telegraf } = require('telegraf');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

const payments = new Map();
const scheduledNotifications = new Map();

// MongoDB Schema
const UserSchema = new mongoose.Schema({
    telegramId: { type: String, unique: true, required: true },
    username: String,
    firstName: String,
    lastName: String,
    gameState: Object,
    fighters: Array,
    activeFighterIndex: Number,
    isBanned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now },
    totalPurchases: { type: Number, default: 0 },
    lifetimeValue: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);

// MongoDB Connection
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('✅ MongoDB connected'))
        .catch(err => console.error('❌ MongoDB:', err.message));
}

// Notification sender
async function sendNotification(userId, message) {
    try {
        await bot.telegram.sendMessage(userId, message, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [[
                    { text: '🎮 Відкрити гру', web_app: { url: 'https://dyvach94.github.io/boxing-manager/' } }
                ]]
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

// Notification scheduler
setInterval(() => {
    const now = Date.now();
    scheduledNotifications.forEach((notification, id) => {
        if (notification.time <= now) {
            sendNotification(notification.userId, notification.message);
            scheduledNotifications.delete(id);
        }
    });
}, 60000);

// Routes
app.get('/', (req, res) => res.json({ message: 'Boxing Manager API' }));

app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        time: Date.now(),
        notifications: scheduledNotifications.size,
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

app.post('/api/save-user', async (req, res) => {
    try {
        const { telegramId, username, firstName, lastName, gameState, fighters, activeFighterIndex } = req.body;
        await User.findOneAndUpdate(
            { telegramId },
            { telegramId, username, firstName, lastName, gameState, fighters, activeFighterIndex, lastActive: new Date() },
            { upsert: true, new: true }
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/load-user/:telegramId', async (req, res) => {
    try {
        const user = await User.findOne({ telegramId: req.params.telegramId });
        if (!user) return res.json({ success: false });
        res.json({ success: true, data: { gameState: user.gameState, fighters: user.fighters, activeFighterIndex: user.activeFighterIndex } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
        if (!title || !amount || !payload) return res.status(400).json({ error: 'Missing fields' });
        const invoice = await bot.telegram.createInvoiceLink({
            title, description: description || title,
            payload: JSON.stringify({ type: payload, userId, time: Date.now() }),
            provider_token: '', currency: 'XTR', prices: [{ label: title, amount }]
        });
        payments.set(payload, { userId, amount, title, created: Date.now() });
        res.json({ success: true, invoice_link: invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin
const ADMIN_IDS = (process.env.ADMIN_IDS || '').split(',');
const isAdmin = (req, res, next) => {
    const adminId = req.body.adminId || req.query.adminId;
    if (!ADMIN_IDS.includes(adminId)) return res.status(403).json({ error: 'Not authorized' });
    next();
};

app.post('/admin/stats', isAdmin, async (req, res) => {
    const totalUsers = await User.countDocuments();
    const activeToday = await User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 86400000) } });
    const totalRevenue = await User.aggregate([{ $group: { _id: null, total: { $sum: '$lifetimeValue' } } }]);
    res.json({ totalUsers, activeToday, totalRevenue: totalRevenue[0]?.total || 0 });
});

app.post('/admin/users', isAdmin, async (req, res) => {
    const users = await User.find().sort({ lastActive: -1 }).limit(100);
    res.json(users);
});

app.post('/admin/ban-user', isAdmin, async (req, res) => {
    await User.findOneAndUpdate({ telegramId: req.body.userId }, { isBanned: true });
    res.json({ success: true });
});

app.post('/admin/broadcast', isAdmin, async (req, res) => {
    const users = await User.find({ isBanned: false });
    let sent = 0;
    for (const user of users) {
        try { await sendNotification(user.telegramId, req.body.message); sent++; } catch (e) {}
    }
    res.json({ success: true, sent });
});

// Bot handlers
bot.on('pre_checkout_query', async (ctx) => await ctx.answerPreCheckoutQuery(true));
bot.on('successful_payment', async (ctx) => {
    const { invoice_payload, total_amount } = ctx.message.successful_payment;
    const data = JSON.parse(invoice_payload);
    await User.findOneAndUpdate({ telegramId: String(data.userId) }, { $inc: { totalPurchases: 1, lifetimeValue: total_amount * 0.0015 } });
    await ctx.reply(`✅ Оплату прийнято!\n\nСума: ${total_amount} ⭐`, {
        reply_markup: { inline_keyboard: [[{ text: '🎮 Повернутися', web_app: { url: 'https://dyvach94.github.io/boxing-manager/' } }]] }
    });
});

bot.catch((err) => console.error('Bot:', err.message));
bot.launch().then(() => console.log('🤖 Bot started'));

module.exports = app;
