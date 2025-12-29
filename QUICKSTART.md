# 🚀 Швидкий Старт

## Крок 1: Тестування

```bash
cd boxing-manager
python3 -m http.server 8000
```

Відкрий: http://localhost:8000

**Має працювати!** ✅

---

## Крок 2: GitHub

### Встанови Git + Git LFS:

**Windows:**
```
Git: https://git-scm.com/download/win
Git LFS: https://git-lfs.github.com/
```

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

## Крок 3: Створи репозиторій

1. GitHub → New repository
2. Назва: `boxing-manager`
3. Public
4. Create

---

## Крок 4: Git LFS + Push

```bash
cd boxing-manager

# Init
git init
git lfs install

# Track великий файл
git lfs track "js/game.js"
git add .gitattributes

# Commit
git add .
git commit -m "v0.91: Initial commit"

# Push
git remote add origin https://github.com/YOUR_USERNAME/boxing-manager.git
git branch -M main
git push -u origin main
```

**Якщо попросить пароль:**  
Використай Personal Access Token замість пароля!

GitHub → Settings → Developer settings → Tokens → Generate

---

## Крок 5: GitHub Pages

1. Settings → Pages
2. Source: main / (root)
3. Save

Гра буде на:
```
https://YOUR_USERNAME.github.io/boxing-manager/
```

---

## ✅ Готово!

**Гра на GitHub!** 🎉

---

## 🐛 Якщо щось не так:

### Git LFS не встановлюється:
```
Використай online minifier для js/game.js
Зменшить до ~500 KB
Тоді Git LFS не потрібен
```

### Permission denied:
```
Використовуй Personal Access Token,
не пароль GitHub!
```

### Гра не працює на GitHub Pages:
```
Переконайся що всі файли завантажились:
- index.html
- css/styles.css
- js/game.js
```

---

**Все має працювати!** ✅
