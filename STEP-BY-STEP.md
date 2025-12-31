# 📖 ПОКРОКОВА ІНСТРУКЦІЯ - MONGODB + ADMIN

---

## ✅ ШАГ 1: MONGODB ATLAS (5 хвилин)

### 1.1 Реєстрація
```
🌐 https://www.mongodb.com/cloud/atlas/register

Email: ваш email
Password: сильний пароль
→ Create account
→ Verify email (check пошту)
```

### 1.2 Створити кластер
```
→ Build a Database
→ FREE (M0 Sandbox)
→ Provider: AWS
→ Region: Frankfurt (eu-central-1)
→ Cluster Name: boxing-manager
→ Create
⏳ Wait 3-5 minutes
```

### 1.3 Database User
```
Security → Database Access
→ Add New Database User
→ Username: boxingadmin
→ Autogenerate password → COPY IT! 📋
→ Atlas admin
→ Add User
```

### 1.4 Network Access
```
Security → Network Access
→ Add IP Address
→ ALLOW ACCESS FROM ANYWHERE
→ 0.0.0.0/0
→ Confirm
```

### 1.5 Connection String
```
Databases → CONNECT
→ Connect your application
→ Node.js
→ Copy string:

mongodb+srv://boxingadmin:<password>@boxing-manager.xxxxx.mongodb.net/

→ Replace <password> with YOUR password
→ Add /boxing-manager at end:

mongodb+srv://boxingadmin:YOUR_PASSWORD@boxing-manager.xxxxx.mongodb.net/boxing-manager
```

**📋 SAVE THIS CONNECTION STRING!**

---

## ✅ ШАГ 2: TELEGRAM ID (30 секунд)

```
1. Open Telegram
2. Message @userinfobot
3. Copy your "Id:" (example: 123456789)
```

**📋 SAVE YOUR TELEGRAM ID!**

---

## ✅ ШАГ 3: UPDATE .env FILE (1 хвилина)

Open `.env` file in text editor:

**Find line 19:**
```
MONGODB_URI=mongodb+srv://boxingadmin:REPLACE_WITH_YOUR_PASSWORD@boxing-manager.REPLACE.mongodb.net/boxing-manager?retryWrites=true&w=majority
```

**Replace with YOUR connection string from Step 1.5**

**Find line 29:**
```
ADMIN_IDS=REPLACE_WITH_YOUR_TELEGRAM_ID
```

**Replace with YOUR Telegram ID from Step 2**

**Save file!**

---

## ✅ ШАГ 4: DEPLOY BACKEND (2 хвилини)

### Option A: GitHub Website (easier)

```
1. https://github.com/dyvach94/boxing-manager

2. Click on index.js → Delete file

3. Upload Files → select these 3 files:
   - index.js
   - package.json
   - .env

4. Commit changes

5. Vercel will auto-deploy (wait 1-2 min)
```

### Option B: Git Command Line

```bash
cd boxing-manager

# Backup old
cp index.js index.js.old

# Copy new files
cp /path/to/new/index.js .
cp /path/to/new/package.json .
cp /path/to/new/.env .

# Commit
git add index.js package.json .env
git commit -m "Add MongoDB + Admin Panel"
git push

# Vercel auto-deploy
```

---

## ✅ ШАГ 5: TEST BACKEND (30 секунд)

```
Open: https://boxing-managerbot.vercel.app/health

Should show:
{
  "status": "ok",
  "time": 1735686123456,
  "notifications": 0,
  "db": "connected"  ← MUST BE "connected"!
}
```

**✅ If "db": "connected" → Backend works!**

**❌ If "db": "disconnected" → Check:**
- .env MONGODB_URI correct?
- Password correct?
- Network Access 0.0.0.0/0?
- Wait 1 more minute (Vercel deploy)

---

## ✅ ШАГ 6: SETUP ADMIN PANEL (1 хвилина)

Open `admin-panel.html` in text editor:

**Find line ~174:**
```javascript
const ADMIN_ID = 'REPLACE_WITH_YOUR_TELEGRAM_ID';
```

**Replace with YOUR Telegram ID:**
```javascript
const ADMIN_ID = '123456789';  // your real ID
```

**Save file!**

---

## ✅ ШАГ 7: OPEN ADMIN PANEL (10 секунд)

```
Double-click admin-panel.html
→ Opens in browser
→ Should show stats!
```

**✅ Success looks like:**
```
🥊 Boxing Manager Admin Panel
Total Users: 0
Active Today: 0
Total Revenue: $0.00
```

**❌ If error:**
- F12 → Console → check error
- ADMIN_ID correct?
- Backend /health working?

---

## 🎉 DONE!

### What you have now:

```
✅ MongoDB database (FREE)
✅ Backend with MongoDB
✅ Admin Panel working
✅ Can see all users
✅ Can ban/broadcast
✅ Analytics tracking
```

### Next steps:

```
1. Share game with friends
2. Watch users in admin panel
3. Track revenue
4. Send broadcast messages
5. Profit! 💰
```

---

## 📊 USING ADMIN PANEL:

### Dashboard shows:
- Total users
- Active today
- Total revenue
- Pending notifications

### Actions:
- **🔄 Refresh** - update stats
- **📢 Broadcast** - message to all users
- **📊 Export** - export data (coming soon)
- **❤️ Health Check** - check system

### User table shows:
- Username
- Cash & Stars
- Number of fighters
- Last active
- Lifetime value
- Ban button

---

## ⚠️ IMPORTANT:

### Security:
```
✅ .env file contains passwords - DO NOT SHARE
✅ Add .env to .gitignore if not already
✅ ADMIN_ID - keep secret
```

### Free Tier Limits:
```
MongoDB Atlas FREE:
✓ 512 MB storage
✓ Shared cluster
✓ Enough for 1000s of users

Vercel FREE:
✓ 100 GB bandwidth/month
✓ Serverless functions
✓ Enough for start
```

---

## 🆘 TROUBLESHOOTING:

### MongoDB not connecting:
```
1. Check password in .env (no special chars like <, >)
2. Network Access = 0.0.0.0/0
3. Connection string format correct?
4. Wait 5 minutes after cluster creation
```

### Admin panel empty:
```
1. ADMIN_ID in admin-panel.html correct?
2. ADMIN_IDS in backend .env correct?
3. F12 → Console → check errors
4. Backend /health returns 200?
```

### Users not saving:
```
1. Backend deployed?
2. MongoDB connected? (check /health)
3. Frontend calling /api/save-user?
```

---

**GOOD LUCK! 🚀**
