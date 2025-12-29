# 🚀 Швидкий Старт

## ⚡ Для GitHub (з Git LFS)

### 1. Встанови Git + Git LFS

**Windows:**
- Git: https://git-scm.com/download/win
- Git LFS: https://git-lfs.github.com/

**Mac:**
```bash
brew install git git-lfs
```

**Linux:**
```bash
sudo apt install git git-lfs
```

Перевір:
```bash
git --version
git lfs version
```

---

### 2. Розпакуй архів

```bash
tar -xzf boxing-manager-0.94.tar.gz
cd boxing-manager-0.94
```

---

### 3. Тестуй локально

```bash
python3 -m http.server 8000
```

Відкрий: http://localhost:8000

**Перевір що працює!** ✅

---

### 4. Створи репозиторій на GitHub

1. https://github.com → New repository
2. Назва: `boxing-manager`
3. Public
4. Create (БЕЗ README!)

---

### 5. Git LFS + Push

```bash
# Init
git init
git lfs install

# Track великий файл
git lfs track "js/game.js"
git add .gitattributes

# Commit
git add .
git commit -m "v0.94: Critical bug fix"

# Push
git remote add origin https://github.com/YOUR_USERNAME/boxing-manager.git
git branch -M main
git push -u origin main
```

**При запиті пароля:** Використай Personal Access Token!

---

### 6. GitHub Pages

Settings → Pages → Source: main / (root) → Save

Гра буде на:
```
https://YOUR_USERNAME.github.io/boxing-manager/
```

---

## ✅ Готово!

---

## 🐛 Troubleshooting

### Git LFS не встановлюється:
- Використай online minifier для `js/game.js`
- Зменшить до ~500 KB
- Тоді Git LFS не потрібен

### Permission denied:
- Використовуй Personal Access Token
- GitHub → Settings → Developer settings → Tokens

### Гра зависає:
```
F12 → Console:
localStorage.clear()
location.reload()
```

---

**v0.94 виправляє CRITICAL баг - обов'язково оновись!** 🔥
