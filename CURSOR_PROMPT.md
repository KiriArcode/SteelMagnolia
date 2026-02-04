# 🏋️ CURSOR PROMPT: GymBro PWA

> Краткий контекст для работы с AI в Cursor

---

## Проект

PWA для трекинга тренировок: Alpine.js + Tailwind CDN, без сборки, хостинг на GitHub Pages.

**URL:** https://nikolay-bogatyrev.github.io/GymbroPWA/

---

## Ограничения (соблюдать строго)

- ❌ Никаких npm, webpack, vite, Node.js, build-шагов
- ❌ Не менять порядок скриптов в `index.html` (data.js → storage.js → exercises.js → app.js)
- ❌ Не использовать `x-show` для переключения основных страниц — только `x-if` (проблемы с реактивностью)
- ✅ Все пути — относительные `./` (для GitHub Pages)
- ✅ Язык интерфейса — русский

---

## Стек

| Компонент | Технология |
|-----------|------------|
| Реактивность | Alpine.js 3.14+ |
| Стили | Tailwind CSS CDN |
| Иконки | Lucide Icons |
| Хранение | localStorage (обёртка в storage.js) |
| Офлайн | Service Worker (sw.js) |

---

## Структура

```
index.html       — весь UI, Alpine x-data="gymTracker()"
js/app.js        — логика, state, selectWorkout, saveWorkout, loadData
js/data.js       — WORKOUT_TEMPLATES (шаблоны тренировок)
js/storage.js    — Storage.getWorkouts, saveWorkout, getStats, saveStats
icons/exercises.js — EXERCISE_ICONS (SVG)
css/custom.css   — x-cloak, range slider, безопасные зоны
manifest.json    — PWA
sw.js            — кэш, CACHE_NAME (увеличивать при деплое)
```

---

## Запуск и проверка

1. **Локально:** открыть `index.html` в браузере или `npx serve .`
2. **GitHub Pages:** `git push` → https://nikolay-bogatyrev.github.io/GymbroPWA/
3. **После правок SW:** Hard refresh (Cmd+Shift+R) или DevTools → Application → Clear storage

---

## Ключевые документы

| Файл | Назначение |
|------|------------|
| [DATA_FLOW.md](DATA_FLOW.md) | Поток данных, init, loadData, saveWorkout |
| [docs/FEATURES.md](docs/FEATURES.md) | Фичи, acceptance criteria |
| [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) | Цвета, компоненты |

---

## Типичные проблемы

| Симптом | Решение |
|---------|---------|
| Страница не переключается | Использовать `x-if`, а не `x-show` |
| Старая версия после деплоя | Увеличить CACHE_NAME в sw.js |
| 404 на localhost | Base URL ставится только для `github.io` |
| "Прошлый раз" всегда дефолт | Проверить loadLastWeights в loadData |

---

## Чеклист при правках

- [ ] Кнопки: `type="button"`
- [ ] Для lastWeight: `??` вместо `||` (0 — валидное значение)
- [ ] x-for: массив, не `Object.entries` напрямую
- [ ] selectWorkout: глубокое копирование (`JSON.parse(JSON.stringify(...))`)
