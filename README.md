# 🥊 Boxing Manager v0.91

Telegram Web App - менеджер боксу.

---

## 📁 Структура

```
boxing-manager/
├── index.html          37 KB
├── css/
│   └── styles.css      112 KB
└── js/
    └── game.js         1.9 MB
```

**Загальний розмір:** 2.1 MB

---

## 🚀 Локальне Тестування

```bash
cd boxing-manager
python3 -m http.server 8000
```

Відкрий: http://localhost:8000

**ВАЖЛИВО:** Не відкривай `index.html` напряму! Використовуй локальний сервер.

---

## 📦 Завантаження на GitHub

### З Git LFS (рекомендовано):

```bash
# 1. Встанови Git + Git LFS
# Git: https://git-scm.com
# Git LFS: https://git-lfs.github.com

# 2. Ініціалізація
git init
git lfs install
git lfs track "js/game.js"
git add .gitattributes

# 3. Commit
git add .
git commit -m "v0.91: Initial commit"

# 4. Push
git remote add origin https://github.com/YOUR_USERNAME/boxing-manager.git
git branch -M main
git push -u origin main
```

### Без Git LFS (треба мініфікувати):

Якщо не хочеш Git LFS, використай online minifier для `js/game.js`:
- https://www.toptal.com/developers/javascript-minifier

Зменшить до ~500 KB і підійде для GitHub без LFS.

---

## 🌐 GitHub Pages

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Save

Гра буде на: `https://YOUR_USERNAME.github.io/boxing-manager/`

---

## ✨ Особливості v0.91

- ✅ Виправлено: статистика після бою показується
- ✅ Візуальні ефекти та анімації
- ✅ Звукові ефекти (Web Audio API)
- ✅ Офлайн тренування
- ✅ Розширена команда (18 членів)
- ✅ Cloud збереження

---

## 🐛 Troubleshooting

### Гра не завантажується:
```bash
# Використовуй локальний сервер!
python3 -m http.server 8000
```

### Зависає:
```
F12 → Console:
localStorage.clear()
location.reload()
```

### Статистика не показується:
```
Переконайся що використовуєш v0.91
(перевір title в index.html)
```

---

## 📝 Ліцензія

MIT - використовуй як хочеш!

---

**Версія:** 0.91  
**Дата:** 29.12.2024
