# 🚀 Quick Start Guide

## Для гравців

### Telegram
1. Відкрийте [@YourBotName](https://t.me/YourBotName)
2. Натисніть START
3. Грайте!

### Веб-версія (для тестування)
1. Відкрийте `index.html` в браузері
2. Або запустіть локальний сервер:
```bash
python3 -m http.server 8000
# Відкрийте http://localhost:8000
```

---

## Для розробників

### 1. Клонування

```bash
git clone https://github.com/yourusername/boxing-manager.git
cd boxing-manager
```

### 2. Git LFS (ВАЖЛИВО!)

Файл `js/game.js` (~1.9 MB) зберігається через Git LFS:

```bash
# Встановити Git LFS
brew install git-lfs  # macOS
# або
sudo apt-get install git-lfs  # Linux

# Ініціалізувати
git lfs install

# Завантажити великі файли
git lfs pull
```

### 3. Запуск

```bash
# Простий HTTP сервер
python3 -m http.server 8000

# Або Node.js
npx http-server -p 8000

# Або PHP
php -S localhost:8000
```

Відкрийте: `http://localhost:8000`

---

## Структура

```
boxing-manager/
├── index.html          # 37 KB - головна сторінка
├── css/
│   └── styles.css      # 113 KB - всі стилі
├── js/
│   └── game.js         # 1.9 MB - вся логіка (Git LFS!)
├── .gitignore          # Ігноровані файли
└── .gitattributes      # Git LFS config
```

---

## Deployment

### GitHub Pages

```bash
# 1. Push код
git add .
git commit -m "Initial commit"
git push origin main

# 2. Settings → Pages
# Source: Deploy from branch
# Branch: main / root
# Save

# 3. Готово!
# URL: https://yourusername.github.io/boxing-manager/
```

### Telegram Mini App

```bash
# 1. Deploy на будь-який хостинг (GitHub Pages, Vercel, Netlify)
# 2. Отримати HTTPS URL
# 3. Telegram BotFather:

/newbot
# Назва: Boxing Manager Bot
# Username: YourBoxingBot

/setmenubutton
# Bot: @YourBoxingBot
# URL: https://yourusername.github.io/boxing-manager/
# Text: 🥊 Грати

# 4. Готово!
# t.me/YourBoxingBot
```

---

## Модифікація

### Змінити баланс

`js/game.js` → шукай:

```javascript
const roundRewards = {
    1: { cash: 5000, stars: 5 },   // Змінити тут
    2: { cash: 10000, stars: 10 },
    3: { cash: 20000, stars: 20 },
    4: { cash: 50000, stars: 50 }
};
```

### Змінити кольори

`css/styles.css` → шукай:

```css
:root {
    --blood-red: #8B0000;  /* Змінити */
    --ring-red: #C41E3A;
    --gold: #FFD700;
    --dark-bg: #0a0a0a;
}
```

### Додати тренування

`js/game.js` → шукай `TRAINING_OPTIONS`:

```javascript
{
    id: 'new_training',
    name: 'Нове тренування',
    icon: '💪',
    duration: 30,
    stats: { strength: 2 }
}
```

---

## Troubleshooting

### Git LFS не працює

```bash
# Перевстановити
git lfs install --force

# Завантажити файли
git lfs pull

# Перевірити
git lfs ls-files
# Має показати: js/game.js
```

### Гра не завантажується

1. Перевір консоль (F12)
2. Перевір чи існує `js/game.js`
3. Перевір розмір файлу (~1.9 MB)

### Telegram не відкриває

1. HTTPS обов'язковий!
2. URL має бути публічним
3. Перевір CORS

---

## Тестування

### Локально (без Telegram)

Просто відкрий `index.html` - працює!

### В Telegram

```bash
# Ngrok для тестування
ngrok http 8000

# Отримаєш HTTPS URL
# https://abc123.ngrok.io

# Вставити в BotFather
```

---

## Наступні кроки

1. ⭐ Поставте зірочку на GitHub
2. 📖 Прочитайте [README.md](README.md)
3. 🎮 Грайте та насолоджуйтесь!
4. 🐛 Знайшли баг? [Створіть Issue](https://github.com/yourusername/boxing-manager/issues)
5. 💡 Є ідея? [Обговоріть](https://github.com/yourusername/boxing-manager/discussions)

---

**Happy Coding! 🥊**
