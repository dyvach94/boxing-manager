# 🚀 Швидкий Старт: Git LFS + GitHub

## Крок 1️⃣: Встановлення Git LFS

### Windows:
```bash
# Завантаж: https://git-lfs.github.com/
# Або:
winget install GitHub.GitLFS
```

### Mac:
```bash
brew install git-lfs
```

### Linux:
```bash
sudo apt-get install git-lfs  # Ubuntu/Debian
```

Перевір:
```bash
git lfs version
# → git-lfs/3.x.x
```

---

## Крок 2️⃣: Розпакування

```bash
cd ~/Downloads  # або куди завантажив
tar -xzf boxing-manager-0.91-modular.tar.gz
cd boxing-manager-0.91
```

---

## Крок 3️⃣: Ініціалізація Git + LFS

```bash
# 1. Ініціалізуй Git
git init

# 2. Ініціалізуй Git LFS
git lfs install
# → Git LFS initialized.

# 3. Налаштуй трекінг великих файлів
git lfs track "js/core.js"
# → Tracking "js/core.js"

# 4. Додай .gitattributes
git add .gitattributes

# 5. Перевір
git lfs track
# → Listing tracked patterns
#     js/core.js (.gitattributes)
```

---

## Крок 4️⃣: Створення репозиторію на GitHub

1. Йди на https://github.com
2. Клік **"+"** → **"New repository"**
3. Назва: `boxing-manager`
4. Public або Private
5. **НЕ** створюй README (вже є!)
6. **Create repository**

Збережи URL:
```
https://github.com/YOUR_USERNAME/boxing-manager.git
```

---

## Крок 5️⃣: Перший Commit

```bash
# 1. Додай всі файли
git add .

# 2. Перевір статус
git status
# → On branch main
#   Changes to be committed:
#     new file: js/core.js  (stored with Git LFS)
#     ...

# 3. Commit
git commit -m "v0.91: Initial commit with bug fixes"

# 4. Перевір LFS
git lfs ls-files
# → js/core.js
```

---

## Крок 6️⃣: Push на GitHub

```bash
# 1. Додай remote
git remote add origin https://github.com/YOUR_USERNAME/boxing-manager.git

# 2. Rename branch to main (якщо треба)
git branch -M main

# 3. Push!
git push -u origin main
```

### Якщо попросить пароль:

GitHub більше НЕ приймає паролі! Треба Personal Access Token:

1. GitHub → **Settings** (твій профіль)
2. **Developer settings** (внизу)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token**
5. Дай права: ☑️ `repo` ☑️ `workflow`
6. **Generate token**
7. Скопіюй токен (показується тільки раз!)
8. Використай як пароль:
   ```
   Username: YOUR_USERNAME
   Password: ghp_xxxxxxxxxxxx (твій токен)
   ```

---

## Крок 7️⃣: Перевірка

На GitHub:
1. Йди на `https://github.com/YOUR_USERNAME/boxing-manager`
2. Перевір файли - мають бути всі ✅
3. Клікни на `js/core.js`
4. Має бути напис: **"Stored with Git LFS"** ✅

---

## Крок 8️⃣: GitHub Pages (Опціонально)

1. На GitHub → **Settings**
2. **Pages** (ліва панель)
3. **Source**: Deploy from a branch
4. **Branch**: `main` → `/ (root)`
5. **Save**

Зачекай 1-2 хвилини...

Твоя гра буде на:
```
https://YOUR_USERNAME.github.io/boxing-manager/
```

---

## 🎮 Тестування локально

Перед push, перевір що працює:

```bash
cd boxing-manager-0.91
python3 -m http.server 8000
```

Відкрий: http://localhost:8000

Має працювати:
- ✅ Вся гра
- ✅ Стилі (CSS)
- ✅ Логіка (JS)
- ✅ Статистика після бою (виправлено!)

---

## ⚠️ Troubleshooting

### "file is larger than 100 MB"
```bash
# Переконайся що Git LFS активний:
git lfs ls-files
# Має показати core.js

# Якщо немає:
git lfs track "js/core.js"
git add .gitattributes
git add js/core.js
git commit --amend --no-edit
git push --force
```

### "Permission denied"
```bash
# Використовуй Personal Access Token, не пароль!
# Генеруй тут: github.com/settings/tokens
```

### "Failed to push some refs"
```bash
# Force push (якщо впевнений):
git push -u origin main --force
```

---

## 📝 Наступні оновлення

```bash
# 1. Зміни файли
# 2. Commit
git add .
git commit -m "v0.92: Added new features"

# 3. Push
git push
```

---

## ✅ Готово!

Тепер у тебе:
- ✅ Гра на GitHub
- ✅ Git LFS для великих файлів
- ✅ Модульна структура
- ✅ Всі виправлення v0.91

**Good luck!** 🚀
