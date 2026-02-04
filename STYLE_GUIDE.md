# 🎨 GymBro PWA — Style Guide & Cursor Reference

> Детальный справочник для верстки в Cursor  
> Все значения pixel-perfect из React прототипа

---

## 📋 Оглавление

1. [Общие принципы](#общие-принципы)
2. [Цвета](#цвета)
3. [Типографика](#типографика)
4. [Отступы и размеры](#отступы-и-размеры)
5. [Компоненты](#компоненты)
6. [Иконки](#иконки)
7. [Анимации](#анимации)
8. [Tailwind Patterns](#tailwind-patterns)
9. [Alpine.js Patterns](#alpinejs-patterns)
10. [Чеклист верстки](#чеклист-верстки)

---

## 🎯 Общие принципы

### Mobile-First
```
Ширина экрана: 320px - 428px
Ориентация: только portrait
Touch targets: минимум 44x44px, рекомендуется 48x48px
```

### Структура страницы
```html
<body class="bg-gray-900 text-white min-h-screen">
  <div class="max-w-md mx-auto">
    <!-- Header (если есть) -->
    <!-- Content с padding -->
    <!-- Fixed bottom nav (если есть) -->
  </div>
</body>
```

### Cursor Prompt Template
```
Создай [компонент] со следующими требованиями:
- Tailwind CSS классы
- Тёмная тема (bg-gray-900 основной фон)
- Mobile-first (max-width: 428px)
- Touch-friendly (кнопки минимум 48px)
- Используй цвета из Style Guide
```

---

## 🎨 Цвета

### Background Colors
| Название | Tailwind | HEX | Использование |
|----------|----------|-----|---------------|
| Primary BG | `bg-gray-900` | #111827 | Основной фон страницы |
| Card BG | `bg-gray-800` | #1f2937 | Карточки, секции |
| Input BG | `bg-gray-700` | #374151 | Инпуты, кнопки secondary |
| Hover BG | `bg-gray-600` | #4b5563 | Hover состояния |

### Text Colors
| Название | Tailwind | HEX | Использование |
|----------|----------|-----|---------------|
| Primary | `text-white` | #FFFFFF | Заголовки, важный текст |
| Secondary | `text-gray-300` | #D1D5DB | Основной текст |
| Muted | `text-gray-400` | #9CA3AF | Подписи, метаданные |
| Disabled | `text-gray-500` | #6B7280 | Неактивные элементы |

### Accent Colors (Gradients)
| Название | Tailwind Gradient | Использование |
|----------|-------------------|---------------|
| Primary | `from-blue-500 to-purple-600` | Главные CTA кнопки |
| Upper Body | `from-blue-500 to-blue-600` | Карточка Upper Body |
| Lower Body | `from-green-500 to-green-600` | Карточка Lower Body |
| Full Body | `from-orange-500 to-red-500` | Карточка Full Body |
| Cardio | `from-purple-500 to-pink-600` | Карточка Cardio |
| Success | `from-green-500 to-emerald-600` | Кнопка сохранения |

### Solid Accent Colors
| Название | Tailwind | HEX | Использование |
|----------|----------|-----|---------------|
| Blue | `bg-blue-500` | #3B82F6 | Кнопки навигации |
| Green | `bg-green-500` | #22C55E | Успех, записанные сеты |
| Orange | `text-orange-400` | #FB923C | Стрик, предупреждения |
| Red | `text-red-400` | #F87171 | Ошибки, пульс |
| Purple | `bg-purple-500` | #A855F7 | Кардио, выбранные элементы |

### Opacity Backgrounds
```css
/* Для карточек поверх градиентов */
bg-white/20    /* rgba(255,255,255,0.2) - иконки на цветном фоне */
bg-gray-800/50 /* rgba(31,41,55,0.5) - карточки в HR zones */
bg-green-500/20 /* Фон записанных сетов */
bg-blue-500/30  /* Фон типа тренировки в истории */
```

### Cursor Prompt для цветов
```
Используй цветовую схему:
- Фон страницы: bg-gray-900
- Карточки: bg-gray-800
- Инпуты/кнопки: bg-gray-700
- Текст основной: text-white или text-gray-300
- Текст вторичный: text-gray-400
- Акценты: градиенты from-X-500 to-Y-600
```

---

## 🔤 Типографика

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
/* В Tailwind это дефолтный font-sans */
```

### Размеры текста
| Название | Tailwind | Размер | Line Height | Использование |
|----------|----------|--------|-------------|---------------|
| 4XL | `text-4xl` | 36px | 40px | Большие числа (вес, повторы) |
| 2XL | `text-2xl` | 24px | 32px | Заголовки страниц, стрик |
| XL | `text-xl` | 20px | 28px | Заголовки секций |
| LG | `text-lg` | 18px | 28px | Названия упражнений, кнопки |
| Base | `text-base` | 16px | 24px | Основной текст |
| SM | `text-sm` | 14px | 20px | Вторичный текст, подписи |
| XS | `text-xs` | 12px | 16px | Мелкие подписи, дни недели |

### Font Weight
| Tailwind | Значение | Использование |
|----------|----------|---------------|
| `font-bold` | 700 | Заголовки, числа, кнопки |
| `font-semibold` | 600 | Названия упражнений |
| `font-medium` | 500 | Важный текст |
| `font-normal` | 400 | Обычный текст |

### Примеры комбинаций
```html
<!-- Заголовок страницы -->
<h1 class="text-2xl font-bold">GYM Tracker</h1>

<!-- Название упражнения -->
<h2 class="text-lg font-bold">Тяга верхнего блока</h2>

<!-- Большое число (вес) -->
<p class="text-4xl font-bold">42.5</p>

<!-- Подпись -->
<p class="text-sm text-gray-400">Прошлый раз: 40 кг</p>

<!-- Мелкая метка -->
<span class="text-xs text-gray-500">Пн</span>
```

### Cursor Prompt для типографики
```
Типографика:
- Заголовки страниц: text-2xl font-bold
- Заголовки секций: text-xl font-bold или text-lg font-semibold  
- Большие числа: text-4xl font-bold
- Основной текст: text-base
- Подписи: text-sm text-gray-400
- Мелкий текст: text-xs text-gray-500
```

---

## 📏 Отступы и размеры

### Spacing Scale
| Tailwind | Pixels | Использование |
|----------|--------|---------------|
| `p-1` / `m-1` | 4px | Минимальный отступ |
| `p-2` / `m-2` | 8px | Между мелкими элементами |
| `p-3` / `m-3` | 12px | Padding в бейджах |
| `p-4` / `m-4` | 16px | Стандартный padding страницы |
| `p-5` / `m-5` | 20px | Padding в карточках |
| `p-6` / `m-6` | 24px | Большие отступы |
| `mb-4` | 16px | Между карточками |
| `mb-6` | 24px | Между секциями |
| `gap-2` | 8px | В flex между элементами |
| `gap-3` | 12px | Между кнопками |
| `gap-4` | 16px | Между карточками |

### Border Radius
| Tailwind | Pixels | Использование |
|----------|--------|---------------|
| `rounded` | 4px | Мелкие элементы |
| `rounded-lg` | 8px | Кнопки, инпуты |
| `rounded-xl` | 12px | Карточки средние |
| `rounded-2xl` | 16px | Большие карточки |
| `rounded-full` | 9999px | Круглые кнопки, аватары |

### Фиксированные размеры
| Элемент | Размер | Tailwind |
|---------|--------|----------|
| Touch target min | 44×44px | `w-11 h-11` |
| Icon button | 48×48px | `w-12 h-12` |
| Weight +/- button | 56×56px | `w-14 h-14` |
| Large icon | 64×64px | `w-16 h-16` |
| Exercise icon | 80×80px | `w-20 h-20` |
| Primary button height | 56px | `h-14` или `py-4` |
| Nav button height | 48px | `h-12` или `py-3` |
| Card icon | 40×40px | `w-10 h-10` |

### Примеры
```html
<!-- Padding страницы -->
<div class="p-4">...</div>

<!-- Карточка -->
<div class="bg-gray-800 rounded-2xl p-4 mb-4">...</div>

<!-- Flex с gap -->
<div class="flex gap-3">...</div>

<!-- Кнопка +/- -->
<button class="w-14 h-14 bg-gray-700 rounded-xl">...</button>

<!-- Иконка упражнения -->
<div class="w-20 h-20 bg-gray-700 rounded-xl p-2">...</div>
```

### Cursor Prompt для отступов
```
Отступы и размеры:
- Padding страницы: p-4 (16px)
- Padding карточек: p-4 или p-5
- Margin между карточками: mb-4
- Border radius карточек: rounded-2xl
- Кнопки +/-: w-14 h-14
- Иконки упражнений: w-20 h-20
- Touch targets: минимум w-12 h-12
```

---

## 🧩 Компоненты

### 1. Primary Button (CTA)
```html
<button class="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform">
  <div class="flex items-center gap-3">
    <div class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
      <!-- Icon -->
    </div>
    <div class="text-left">
      <p class="font-bold text-lg">Начать тренировку</p>
      <p class="text-blue-200 text-sm">Подзаголовок</p>
    </div>
  </div>
  <ChevronRight />
</button>
```

**Cursor Prompt:**
```
Создай Primary CTA кнопку:
- Ширина 100%
- Градиент from-blue-500 to-purple-600
- rounded-2xl, p-5
- Внутри: иконка 56x56 слева, текст по центру, стрелка справа
- shadow-lg shadow-blue-500/20
- При нажатии: active:scale-[0.98]
```

### 2. Card Button (Выбор тренировки)
```html
<button class="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 flex items-center gap-4 shadow-lg active:scale-[0.98] transition-transform">
  <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center p-2">
    <!-- SVG Icon -->
  </div>
  <div class="flex-1 text-left">
    <p class="text-2xl mb-1">💪</p>
    <p class="font-bold text-lg">Upper Body</p>
    <p class="text-white/70 text-sm">6 упражнений + 30 мин кардио</p>
  </div>
  <ChevronRight />
</button>
```

**Cursor Prompt:**
```
Создай карточку выбора тренировки:
- Ширина 100%
- Градиент по типу тренировки (blue/green/orange/purple)
- rounded-2xl, p-4
- Иконка 64x64 с bg-white/20
- Эмодзи + название + описание
- Стрелка справа
- active:scale-[0.98]
```

### 3. Info Card
```html
<div class="bg-gray-800 rounded-2xl p-4 mb-4">
  <div class="flex justify-between items-center mb-3">
    <span class="text-gray-400">Заголовок</span>
    <span class="text-lg font-semibold">Значение</span>
  </div>
  <!-- Content -->
</div>
```

### 4. Input с +/- кнопками
```html
<div class="mb-6">
  <p class="text-sm text-gray-400 text-center mb-2">Вес (кг)</p>
  <div class="flex items-center justify-center gap-4">
    <button class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600">
      <Minus />
    </button>
    <div class="w-24 text-center">
      <p class="text-4xl font-bold">42.5</p>
    </div>
    <button class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600">
      <Plus />
    </button>
  </div>
</div>
```

**Cursor Prompt:**
```
Создай инпут веса с кнопками +/-:
- Подпись сверху: text-sm text-gray-400 text-center
- Кнопки: w-14 h-14 bg-gray-700 rounded-xl
- Число по центру: text-4xl font-bold, ширина w-24
- Gap между элементами: gap-4
- При нажатии на кнопки: active:bg-gray-600
```

### 5. Badge (Записанный сет)
```html
<div class="bg-green-500/20 border border-green-500/50 rounded-lg px-3 py-2 text-sm">
  <span class="text-green-400 font-semibold">42.5 кг</span>
  <span class="text-gray-400"> × </span>
  <span>12</span>
</div>
```

### 6. Header с прогрессом
```html
<div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
  <div class="flex items-center justify-between mb-2">
    <button class="p-2 hover:bg-white/20 rounded-lg">
      <ChevronLeft />
    </button>
    <div class="text-center">
      <p class="text-sm opacity-80">Upper Body</p>
      <p class="font-bold">1 / 6</p>
    </div>
    <button class="p-2 hover:bg-white/20 rounded-lg text-sm">
      Завершить
    </button>
  </div>
  <!-- Progress bar -->
  <div class="h-2 bg-white/20 rounded-full overflow-hidden">
    <div class="h-full bg-white transition-all" style="width: 16.67%"></div>
  </div>
</div>
```

### 7. Bottom Navigation
```html
<div class="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
  <div class="flex gap-4 max-w-md mx-auto">
    <button class="flex-1 bg-gray-700 rounded-xl py-3 font-semibold flex items-center justify-center gap-2">
      <ChevronLeft /> Назад
    </button>
    <button class="flex-1 bg-blue-500 rounded-xl py-3 font-semibold flex items-center justify-center gap-2">
      Далее <ChevronRight />
    </button>
  </div>
</div>
```

**Cursor Prompt:**
```
Создай нижнюю навигацию:
- fixed bottom-0 left-0 right-0
- bg-gray-800 border-t border-gray-700
- Padding: p-4
- Две кнопки в ряд с gap-4
- Левая: bg-gray-700, правая: bg-blue-500
- rounded-xl py-3
- Иконки + текст с gap-2
```

### 8. Slider (Range input)
```html
<div class="bg-gray-800 rounded-2xl p-4">
  <p class="text-sm text-gray-400 mb-3">Как себя чувствуешь?</p>
  <div class="flex items-center justify-between mb-2">
    <span class="text-3xl">😊</span>
    <span class="text-4xl font-bold">7</span>
  </div>
  <input
    type="range"
    min="1"
    max="10"
    value="7"
    class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
  >
  <div class="flex justify-between text-xs text-gray-500 mt-1">
    <span>Плохо</span>
    <span>Отлично</span>
  </div>
</div>
```

### 9. Quick Select Buttons
```html
<div class="flex justify-center gap-2 mt-3">
  <button class="px-4 py-2 rounded-lg text-sm bg-gray-700">20</button>
  <button class="px-4 py-2 rounded-lg text-sm bg-purple-500">30</button>
  <button class="px-4 py-2 rounded-lg text-sm bg-gray-700">45</button>
  <button class="px-4 py-2 rounded-lg text-sm bg-gray-700">60</button>
</div>
```

### 10. Week Progress
```html
<div class="flex gap-1 mb-3">
  <!-- Для каждого дня -->
  <div class="flex-1 text-center">
    <div class="h-10 rounded-lg mb-1 flex items-center justify-center bg-green-500">
      <Check />
    </div>
    <span class="text-xs text-gray-500">Пн</span>
  </div>
  <!-- Текущий день -->
  <div class="flex-1 text-center">
    <div class="h-10 rounded-lg mb-1 flex items-center justify-center bg-blue-500 animate-pulse">
    </div>
    <span class="text-xs text-gray-500">Ср</span>
  </div>
  <!-- Будущий день -->
  <div class="flex-1 text-center">
    <div class="h-10 rounded-lg mb-1 flex items-center justify-center bg-gray-700">
    </div>
    <span class="text-xs text-gray-500">Чт</span>
  </div>
</div>
```

---

## 🖼 Иконки

### Lucide Icons (основные UI)
```html
<!-- Подключение -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<!-- Использование -->
<i data-lucide="chevron-left" class="w-6 h-6"></i>
<i data-lucide="chevron-right" class="w-6 h-6"></i>
<i data-lucide="check" class="w-6 h-6"></i>
<i data-lucide="plus" class="w-6 h-6"></i>
<i data-lucide="minus" class="w-6 h-6"></i>
<i data-lucide="dumbbell" class="w-8 h-8"></i>
<i data-lucide="heart" class="w-5 h-5 text-red-400"></i>
<i data-lucide="flame" class="w-5 h-5 text-orange-400"></i>
<i data-lucide="calendar" class="w-5 h-5 text-gray-400"></i>
<i data-lucide="activity" class="w-5 h-5"></i>
<i data-lucide="trending-up" class="w-4 h-4"></i>
<i data-lucide="rotate-ccw" class="w-4 h-4"></i>
<i data-lucide="award" class="w-10 h-10 text-green-400"></i>

<!-- Инициализация -->
<script>lucide.createIcons();</script>
```

### Размеры иконок
| Контекст | Класс | Размер |
|----------|-------|--------|
| Inline с текстом | `w-4 h-4` | 16px |
| Маленькая в кнопке | `w-5 h-5` | 20px |
| Стандартная | `w-6 h-6` | 24px |
| Большая в CTA | `w-8 h-8` | 32px |
| Hero icon | `w-10 h-10` | 40px |

### Exercise Icons (SVG)
```html
<!-- Контейнер для иконки упражнения -->
<div class="w-20 h-20 bg-gray-700 rounded-xl p-2">
  <svg viewBox="0 0 64 64" class="w-full h-full">
    <!-- SVG content -->
  </svg>
</div>

<!-- На цветном фоне -->
<div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center p-2">
  <svg viewBox="0 0 64 64" class="w-full h-full">
    <!-- SVG content with fill="white" -->
  </svg>
</div>
```

---

## ✨ Анимации

### Tailwind Transitions
```html
<!-- Плавное изменение всего -->
<div class="transition-all duration-200">

<!-- Только transform -->
<button class="transition-transform active:scale-[0.98]">

<!-- Только цвета -->
<button class="transition-colors hover:bg-gray-600">

<!-- Только opacity -->
<div class="transition-opacity opacity-0 hover:opacity-100">
```

### Pulse (текущий день/элемент)
```html
<div class="animate-pulse bg-blue-500">...</div>
```

### Custom CSS анимации
```css
/* В custom.css */

/* Fade in при появлении */
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide up для модалок */
.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* Scale для успеха */
.animate-success {
  animation: success 0.3s ease-out;
}

@keyframes success {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
```

### Cursor Prompt для анимаций
```
Добавь анимации:
- Кнопки при нажатии: active:scale-[0.98] transition-transform
- Hover на карточках: hover:bg-gray-600 transition-colors
- Текущий день: animate-pulse
- Появление элементов: transition-all duration-200
```

---

## 🌀 Tailwind Patterns

### Flex Layouts
```html
<!-- Центрирование -->
<div class="flex items-center justify-center">

<!-- Между краями -->
<div class="flex items-center justify-between">

<!-- В колонку -->
<div class="flex flex-col gap-4">

<!-- Flex-1 для заполнения -->
<div class="flex gap-4">
  <div class="flex-1">Растянется</div>
  <div class="w-12">Фиксированная</div>
</div>
```

### Grid Layouts
```html
<!-- 3 колонки -->
<div class="grid grid-cols-3 gap-3">

<!-- 7 колонок для дней недели -->
<div class="flex gap-1">
  <div class="flex-1">...</div> <!-- x7 -->
</div>
```

### Responsive (если понадобится)
```html
<!-- Mobile first -->
<div class="p-4 md:p-6 lg:p-8">
<div class="text-sm md:text-base">
<div class="grid-cols-2 md:grid-cols-3">
```

### Состояния
```html
<!-- Hover -->
<button class="hover:bg-gray-700">

<!-- Active (нажатие) -->
<button class="active:bg-gray-600 active:scale-[0.98]">

<!-- Focus -->
<input class="focus:ring-2 focus:ring-blue-500 outline-none">

<!-- Disabled -->
<button class="disabled:opacity-50 disabled:cursor-not-allowed">
```

### Shadows
```html
<!-- Стандартная тень -->
<div class="shadow-lg">

<!-- Цветная тень под CTA -->
<button class="shadow-lg shadow-blue-500/20">

<!-- Тень под карточками -->
<div class="shadow-md">
```

---

## 🔧 Alpine.js Patterns

### Базовый компонент
```html
<div x-data="{ count: 0 }">
  <button @click="count++">+</button>
  <span x-text="count"></span>
</div>
```

### Условный рендеринг
```html
<!-- Показать/скрыть -->
<div x-show="isVisible">...</div>

<!-- С анимацией -->
<div x-show="isOpen" x-transition>...</div>

<!-- Условие в классе -->
<div :class="{ 'bg-green-500': isActive, 'bg-gray-700': !isActive }">
```

### Циклы
```html
<template x-for="item in items" :key="item.id">
  <div x-text="item.name"></div>
</template>
```

### Двухстороннее связывание
```html
<input type="text" x-model="searchQuery">
<input type="range" x-model="moodValue">
```

### События
```html
<button @click="handleClick()">
<button @click="page = 'dashboard'">
<div @click.away="isOpen = false">
```

### Инициализация
```html
<div x-data="gymTracker()" x-init="init()">
```

### Computed-like
```javascript
// В Alpine компоненте
get currentExercise() {
  return this.workout?.exercises[this.currentIndex];
}
```

---

## ✅ Чеклист верстки

### Перед началом работы
- [ ] Подключен Tailwind CDN
- [ ] Подключен Alpine.js
- [ ] Подключен Lucide Icons
- [ ] Базовые стили body: `bg-gray-900 text-white min-h-screen`

### Для каждого компонента
- [ ] Touch target минимум 44x44px (кнопки, ссылки)
- [ ] Достаточный контраст текста
- [ ] Правильные отступы (p-4 для страниц, p-4/p-5 для карточек)
- [ ] Rounded corners (rounded-xl или rounded-2xl для карточек)
- [ ] Анимация при нажатии на кнопки

### Адаптивность
- [ ] Работает на 320px ширине
- [ ] Работает на 428px ширине
- [ ] Текст не обрезается
- [ ] Элементы не выходят за экран

### Интерактивность
- [ ] Hover состояния (desktop)
- [ ] Active состояния (mobile)
- [ ] Focus состояния (для accessibility)
- [ ] Disabled состояния

### Финальная проверка
- [ ] Протестировано на iOS Safari
- [ ] Протестировано на Android Chrome
- [ ] Нет горизонтального скролла
- [ ] Иконки отображаются
- [ ] Шрифты загружаются

---

## 📝 Cursor Prompt Templates

### Создание страницы
```
Создай страницу [название] для GymBro PWA:

Структура:
- Header: [описание]
- Content: [описание]
- Footer/Navigation: [описание]

Требования:
- Tailwind CSS
- Тёмная тема (bg-gray-900)
- Mobile-first (max-width 428px)
- Touch-friendly (кнопки 48px)
- Alpine.js для интерактивности

Используй стили из Style Guide:
- Карточки: bg-gray-800 rounded-2xl p-4
- Кнопки: bg-gradient-to-r rounded-xl
- Текст: text-white для заголовков, text-gray-400 для подписей
```

### Создание компонента
```
Создай компонент [название]:

Визуал:
- [описание внешнего вида]

Размеры:
- Ширина: [значение]
- Высота: [значение]
- Padding: [значение]
- Border radius: [значение]

Цвета:
- Фон: [цвет]
- Текст: [цвет]
- Border: [если есть]

Состояния:
- Default: [описание]
- Hover: [описание]
- Active: [описание]
- Disabled: [если нужно]

Код должен использовать Tailwind CSS классы.
```

### Исправление стилей
```
Исправь стили компонента [название]:

Текущая проблема:
- [описание]

Ожидаемый результат:
- [описание]

Используй эти значения из Style Guide:
- [конкретные значения]
```
