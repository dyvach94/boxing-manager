# 🚀 READY TO DEPLOY

## ⚠️ BEFORE DEPLOYING:

### 1. Edit .env file:

Replace these 2 values:

```
MONGODB_URI=mongodb+srv://boxingadmin:YOUR_PASSWORD@boxing-manager.XXX.mongodb.net/boxing-manager
```
Replace:
- YOUR_PASSWORD → your MongoDB password
- XXX → your cluster ID (from MongoDB)

```
ADMIN_IDS=YOUR_TELEGRAM_ID
```
Replace:
- YOUR_TELEGRAM_ID → your ID from @userinfobot

### 2. Upload to GitHub:

```bash
# In your boxing-manager repo:
cp index.js index.js.backup  # Backup old
cp /path/to/new/index.js .
cp /path/to/new/package.json .
cp /path/to/new/.env .

git add index.js package.json .env
git commit -m "Add MongoDB + Admin API"
git push
```

Vercel will auto-deploy!

### 3. Test:

```
https://boxing-managerbot.vercel.app/health

Should show:
{
  "status": "ok",
  "db": "connected"  ← IMPORTANT!
}
```

### 4. Setup Admin Panel:

Open admin-panel.html, find line 172:
```javascript
const ADMIN_ID = 'YOUR_TELEGRAM_ID';
```

Replace with your ID, save, open in browser!

---

## ✅ CHECKLIST:

```
□ MongoDB Atlas created
□ Database user created
□ Network access allowed (0.0.0.0/0)
□ Connection string copied
□ .env MONGODB_URI updated
□ Telegram ID obtained (@userinfobot)
□ .env ADMIN_IDS updated
□ Files uploaded to GitHub
□ Vercel deployed
□ /health shows "db": "connected"
□ Admin panel ADMIN_ID updated
□ Admin panel opened in browser
□ Stats showing
□ DONE! 🎉
```
