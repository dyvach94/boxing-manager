# 🚀 Швидкий Старт БЕЗ Git LFS

## ✅ Цей варіант НЕ ПОТРЕБУЄ Git LFS!

Файл `core.js` мініфікований до 507 KB - підходить для звичайного GitHub!

---

## Крок 1️⃣: Встановлення Git

### Windows:
```
1. Завантаж: https://git-scm.com/download/win
2. Встанови (все за замовчуванням)
3. Перезапусти термінал
```

Перевір:
```bash
git --version
# → git version 2.x.x
```

---

## Крок 2️⃣: Розпакування

```bash
cd ~/Downloads
tar -xzf boxing-manager-0.91-nogitlfs.tar.gz
cd boxing-manager-0.91-nogitlfs
```

---

## Крок 3️⃣: Створення репозиторію на GitHub

1. https://github.com → **New repository**
2. Назва: `boxing-manager`
3. Public або Private
4. **НЕ** створюй README
5. **Create repository**

---

## Крок 4️⃣: Git команди

```bash
# 1. Ініціалізуй Git
git init

# 2. Додай файли
git add .

# 3. Commit
git commit -m "v0.91: Initial commit"

# 4. Додай remote
git remote add origin https://github.com/YOUR_USERNAME/boxing-manager.git

# 5. Rename branch
git branch -M main

# 6. Push!
git push -u origin main
```

### Якщо попросить пароль:

Використай **Personal Access Token**:

1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Права: ☑️ repo ☑️ workflow
5. Generate → Скопіюй токен
6. Використай як пароль

---

## Крок 5️⃣: GitHub Pages

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Save

Гра буде на:
```
https://YOUR_USERNAME.github.io/boxing-manager/
```

---

## 🎮 Локальне тестування

```bash
cd boxing-manager-0.91-nogitlfs
python3 -m http.server 8000
# або
python -m http.server 8000
```

Відкрий: http://localhost:8000

---

## 📝 Наступні оновлення

```bash
# 1. Зміни код
# 2. Add + Commit + Push
git add .
git commit -m "v0.92: New features"
git push
```

---

## ⚠️ Важливо!

- ✅ Файл мініфікований (507 KB)
- ✅ Git LFS НЕ потрібен
- ✅ Працює як звичайний репозиторій
- ⚠️ Код важче читати (без коментарів/відступів)

Для розробки використовуй версію з Git LFS або окремий dev файл!

---

**Готово! Простіше не буває!** 🎉
