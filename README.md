# 🥊 Boxing Manager v1.2 RECOVERY

**Telegram Mini App** - Станьте чемпіоном світу з боксу!

[![Version](https://img.shields.io/badge/version-1.2-blue.svg)](https://github.com/yourusername/boxing-manager)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🚨 v1.2 RECOVERY - СИСТЕМА BACKUP

### Що нового:
- ✅ **Автоматичний backup** перед кожним збереженням
- ✅ **Кнопка Recovery** (🔄) для відновлення даних
- ✅ **Виправлено баг** з турнірними нагородами
- ✅ **Захист від втрати** даних

---

## 🔄 Як відновити дані:

```
1. Натисніть іконку 🔄 в правому верхньому куті
2. Підтвердіть відновлення
3. Дані повернуться до попереднього збереження
```

---

## 🚀 Швидкий старт

### Для користувачів
Відкрийте бота: [@YourBotName](https://t.me/YourBotName)

### Для розробників

```bash
# Клонувати
git clone https://github.com/yourusername/boxing-manager.git
cd boxing-manager

# Git LFS (ОБОВ'ЯЗКОВО!)
git lfs install
git lfs pull

# Запустити
python3 -m http.server 8000
```

Відкрийте: `http://localhost:8000`

---

## 📁 Структура

```
boxing-manager/
├── index.html          # 2.0 MB - HTML + контент
├── css/
│   └── styles.css      # 113 KB - стилі
├── js/
│   └── game.js         # 1.9 MB - логіка (Git LFS!)
├── README.md
├── QUICKSTART.md
├── DEPLOYMENT.md
├── LICENSE
├── .gitignore
└── .gitattributes      # Git LFS config
```

---

## ✨ Features

- 🥊 Реалістична система боїв
- 🏆 Кар'єра + ТОП-100
- 🎯 Турніри (8 бійців)
- 👥 Команда (18 членів)
- 💪 Тренування (офлайн)
- 💎 VIP система
- 🏅 Досягнення
- 🔄 **Система backup**
- ☁️ Cloud sync
- 📱 Responsive

---

## 🐛 Виправлені баги (v1.2)

### 1. Турнірні нагороди
**Проблема:** Після турнірного бою не показувало нагороди  
**Рішення:** Використання `fighter._tournamentInfo` замість глобальної змінної

### 2. Втрата даних
**Проблема:** При помилці всі дані стирались  
**Рішення:** Автоматичний backup + кнопка Recovery

### 3. Білий екран
**Проблема:** Деякі екрани були білими  
**Рішення:** `!important` для background

---

## 📊 Changelog

### v1.2 (29.12.2024)
- ✅ Автоматичний backup
- ✅ Recovery кнопка
- ✅ Виправлено турнірні нагороди

### v1.1
- ✅ GitHub готовність
- ✅ Модульна структура

### v1.0
- ✅ Перша стабільна версія

---

## 🚀 Deployment

### GitHub Pages

```bash
# Push код
git add .
git commit -m "v1.2 RECOVERY"
git push origin main

# Settings → Pages → Deploy from main
```

URL: `https://yourusername.github.io/boxing-manager/`

### Telegram Bot

```
@BotFather:
/setmenubutton
URL: https://yourusername.github.io/boxing-manager/
Text: 🥊 Грати
```

---

## 📚 Документація

- [Quick Start](QUICKSTART.md) - Швидкий старт
- [Deployment](DEPLOYMENT.md) - Інструкції деплою
- [License](LICENSE) - MIT

---

## 🤝 Contributing

Pull requests welcome!

```bash
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

---

## 📝 License

MIT License - дивіться [LICENSE](LICENSE)

---

## 👨‍💻 Автор

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Telegram: [@yourusername](https://t.me/yourusername)

---

## 🙏 Подяки

- Telegram за WebApp SDK
- Claude за допомогу в розробці

---

**⭐ Поставте зірочку якщо вам сподобалось!**
