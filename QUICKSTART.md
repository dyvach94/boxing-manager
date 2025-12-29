# 🚀 Quick Start

## Для гравців

### Telegram
[@YourBotName](https://t.me/YourBotName) → START → Грайте!

---

## Для розробників

### 1. Клонування

```bash
git clone https://github.com/yourusername/boxing-manager.git
cd boxing-manager
```

### 2. Git LFS (ОБОВ'ЯЗКОВО!)

```bash
# Встановити
brew install git-lfs        # macOS
sudo apt install git-lfs    # Linux

# Ініціалізувати
git lfs install
git lfs pull
```

### 3. Запуск

```bash
python3 -m http.server 8000
```

Відкрийте: `http://localhost:8000`

---

## 🔄 Recovery система

### Автоматичний backup
Кожне збереження створює backup попередньої версії в `localStorage`.

### Відновлення через UI
1. Натисніть іконку 🔄 в top bar
2. Підтвердіть відновлення
3. Гра перезавантажиться з backup

### Відновлення через консоль
```javascript
// F12 → Console
localStorage.setItem('boxingManager_character', 
  localStorage.getItem('boxingManager_character_backup'));
location.reload();
```

---

## 📦 Структура

```
boxing-manager/
├── index.html (2.0 MB)
├── css/styles.css (113 KB)
└── js/game.js (1.9 MB) ← Git LFS!
```

---

## 🚀 Deploy на GitHub Pages

```bash
git add .
git commit -m "Initial commit"
git push origin main

# Settings → Pages → Deploy from main
```

---

## 📱 Telegram Bot

```
@BotFather:

/newbot
Назва: Boxing Manager
Username: YourBoxingBot

/setmenubutton
URL: https://yourusername.github.io/boxing-manager/
Text: 🥊 Грати
```

---

## 🐛 Troubleshooting

### Git LFS не працює
```bash
git lfs install --force
git lfs pull
```

### Гра не завантажується
1. F12 → Console
2. Перевірити помилки
3. Перевірити `js/game.js` (~1.9 MB)

---

**Готово! 🎉**
