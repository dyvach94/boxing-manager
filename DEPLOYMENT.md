# 🚀 Deployment Guide

## Варіанти розгортання

### 1. GitHub Pages (Рекомендовано)

**Переваги:**
- ✅ Безкоштовно
- ✅ HTTPS автоматично
- ✅ CDN
- ✅ Git LFS підтримка

**Кроки:**

```bash
# 1. Створити репозиторій на GitHub
# 2. Клонувати
git clone https://github.com/yourusername/boxing-manager.git
cd boxing-manager

# 3. Встановити Git LFS
git lfs install
git lfs track "js/game.js"

# 4. Додати файли
git add .
git commit -m "Initial commit"
git push origin main

# 5. GitHub → Settings → Pages
# Source: Deploy from branch
# Branch: main
# Folder: / (root)
# Save

# 6. Чекаємо 1-2 хвилини
# URL: https://yourusername.github.io/boxing-manager/
```

**Git LFS лімити:**
- Безкоштовно: 1 GB storage, 1 GB bandwidth/month
- Достатньо для 500+ завантажень на місяць

---

### 2. Vercel

**Переваги:**
- ✅ Дуже швидко
- ✅ Auto deploy з Git
- ✅ Analytics

**Кроки:**

```bash
# 1. Встановити CLI
npm i -g vercel

# 2. Deploy
cd boxing-manager
vercel

# Або через веб-інтерфейс:
# vercel.com → Import Git Repository
```

---

### 3. Netlify

**Переваги:**
- ✅ Drag & Drop
- ✅ Form handling
- ✅ Serverless functions

**Кроки:**

```bash
# 1. Зайти на netlify.com
# 2. Drag & Drop папку boxing-manager
# 3. Готово!

# Або через CLI:
npm i -g netlify-cli
netlify deploy --prod
```

---

### 4. Cloudflare Pages

**Переваги:**
- ✅ Найшвидший CDN
- ✅ Безкоштовно
- ✅ Unlimited bandwidth

**Кроки:**

```bash
# 1. pages.cloudflare.com
# 2. Connect Git
# 3. Deploy!
```

---

## Telegram Bot Setup

### Крок 1: Створити бота

```
1. Відкрити @BotFather в Telegram
2. /newbot
3. Назва: Boxing Manager
4. Username: YourBoxingManagerBot
5. Отримаєш токен: 123456:ABC-DEF...
```

### Крок 2: Налаштувати WebApp

```
/setmenubutton
Виберіть бота: @YourBoxingManagerBot

URL: https://yourusername.github.io/boxing-manager/
Button text: 🥊 Грати
```

### Крок 3: Інші налаштування

```bash
# Опис
/setdescription
Станьте чемпіоном світу з боксу! 🥊

# Короткий опис
/setabouttext
Симулятор боксерської кар'єри

# Команди
/setcommands
start - Почати гру
help - Допомога
stats - Статистика

# Зображення
/setuserpic
# Завантажити лого 640x640
```

---

## Domain Setup (Optional)

### Свій домен для GitHub Pages

```bash
# 1. Купити домен (namecheap.com, godaddy.com)

# 2. DNS налаштування:
# A Record:
# @ → 185.199.108.153
# @ → 185.199.109.153
# @ → 185.199.110.153
# @ → 185.199.111.153

# CNAME Record:
# www → yourusername.github.io

# 3. GitHub → Settings → Pages → Custom domain
# boxing-manager.com
# Save

# 4. Чекаємо 24 години (DNS propagation)
```

---

## Performance Optimization

### 1. Компресія

```bash
# Gzip (автоматично на GitHub Pages)
# Розмір: 2.1 MB → ~400 KB

# Brotli (краще)
# npm install -g brotli
brotli -Z index.html
brotli -Z css/styles.css
brotli -Z js/game.js
```

### 2. CDN

```html
<!-- Додати в index.html -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="preconnect" href="https://telegram.org">
```

### 3. Caching

```
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

---

## Monitoring

### 1. Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- Telegram Analytics (вбудоване) -->
window.Telegram.WebApp.expand();
window.Telegram.WebApp.ready();
```

### 2. Error Tracking

```javascript
// Sentry
window.addEventListener('error', (e) => {
    console.error('Global error:', e);
    // Send to logging service
});
```

---

## Security

### Headers

```
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

### HTTPS

- GitHub Pages: Автоматично ✅
- Vercel: Автоматично ✅
- Netlify: Автоматично ✅

---

## Troubleshooting

### Git LFS quota exceeded

```bash
# Оптимізація:
# 1. Мініфікувати js/game.js
# 2. Або використати інший хостинг для .js

# Альтернатива:
# Завантажити game.js на окремий CDN
```

### Telegram не відкриває

```bash
# Перевірки:
1. URL має бути HTTPS ✓
2. URL має бути публічним ✓
3. Немає CORS помилок ✓
4. Telegram Web App SDK підключений ✓

# Дебаг:
# Відкрити в звичайному браузері
# F12 → Console → перевірити помилки
```

### Гра повільна

```bash
# 1. Перевірити розмір файлів
ls -lh css/ js/

# 2. Включити компресію
# GitHub Pages: автоматично
# Vercel: автоматично

# 3. Використати CDN
```

---

## Backup

```bash
# 1. Git backup (автоматично)
git push origin main

# 2. Ручний backup
tar -czf boxing-manager-backup-$(date +%Y%m%d).tar.gz boxing-manager/

# 3. Cloud backup
# rsync до Dropbox/Google Drive
```

---

## Updates

```bash
# 1. Зробити зміни
vim js/game.js

# 2. Commit
git add .
git commit -m "v1.2: Додано PvP"

# 3. Push
git push origin main

# 4. GitHub Pages оновиться автоматично!
```

---

## Support

Питання? Створіть [Issue](https://github.com/yourusername/boxing-manager/issues)!

**Happy Deploying! 🚀**
