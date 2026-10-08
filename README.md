# Realtime Dividend Bank

Статичний GitHub Pages застосунок: вводиш кількість сертифікатів і річний Dividend Rate, після чого лічильник нараховує дохід у реальному часі.

## Запуск на GitHub Pages

1. Створи новий GitHub repository.
2. Завантаж `index.html`, `style.css`, `script.js`.
3. Repository → Settings → Pages.
4. У Source вибери `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Відкрий адресу GitHub Pages.

Розрахунок виконується локально в браузері. Сервер для обчислень не потрібен.

Формула:
`дохід = кількість сертифікатів × dividend rate × час / 365 днів`.

Для простоти використовується 365-денний рік.
