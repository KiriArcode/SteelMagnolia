# 🌸 SteelMagnolia — Style Guide для Cursor

> Fitness tracker для Кристины  
> UX/UI дизайнер • Гейм дизайнер • Любит яркие сочетания

---

## 🎯 Концепция

### Ключевые слова
```
Glow • Power • Play • Bloom • Level Up
``` 

### Design Pillars

| Принцип | Описание |
|---------|----------|
| **Glow Aesthetic** | Неоновые свечения, градиенты с blur |
| **Game Feel** | XP, уровни, badges, progress bars |
| **Bold Colors** | Яркие контрасты, не бояться цвета |
| **Soft Forms** | Blob-формы, большие радиусы, плавность |

---

## 🎨 Цветовая палитра

### Background (Тёмная база)
```css
--bg-void:      #0a0a0f;   /* Основной фон */
--bg-card:      #13131a;   /* Карточки */
--bg-elevated:  #1c1c26;   /* Поднятые элементы */
--bg-input:     #252532;   /* Инпуты */
```

**Tailwind:**
```html
bg-[#0a0a0f]   /* Основной фон */
bg-[#13131a]   /* Карточки */
bg-[#1c1c26]   /* Elevated */
bg-[#252532]   /* Inputs */
```

### Primary Gradient (Signature)
```css
/* Основной градиент бренда */
background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%);
/* Purple → Pink → Orange */
```

**Tailwind:**
```html
bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
```

### Accent Colors
| Цвет | HEX | Tailwind | Использование |
|------|-----|----------|---------------|
| **Purple** | `#a855f7` | `purple-500` | Primary actions, XP |
| **Pink** | `#ec4899` | `pink-500` | Highlights, hearts |
| **Orange** | `#f97316` | `orange-500` | Streak, fire |
| **Cyan** | `#06b6d4` | `cyan-500` | Info, cardio |
| **Lime** | `#84cc16` | `lime-500` | Success, complete |
| **Yellow** | `#facc15` | `yellow-400` | Stars, rewards |

### Workout Type Colors
| Тренировка | Градиент | Tailwind |
|------------|----------|----------|
| **Glutes & Legs** | Pink → Rose | `from-pink-500 to-rose-600` |
| **Abs & Core** | Orange → Amber | `from-orange-500 to-amber-600` |
| **Arms & Upper** | Purple → Violet | `from-purple-500 to-violet-600` |
| **Cardio** | Cyan → Teal | `from-cyan-500 to-teal-600` |
| **Full Body** | Pink → Orange (signature) | `from-pink-500 via-purple-500 to-orange-500` |

### Glow Effects
```css
/* Neon glow для кнопок и акцентов */
.glow-pink {
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5),
              0 0 40px rgba(236, 72, 153, 0.3);
}

.glow-purple {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.5),
              0 0 40px rgba(168, 85, 247, 0.3);
}

.glow-orange {
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.5),
              0 0 40px rgba(249, 115, 22, 0.3);
}
```

**Tailwind:**
```html
shadow-[0_0_20px_rgba(236,72,153,0.5)]
shadow-[0_0_30px_rgba(168,85,247,0.4)]
```

---

## ✨ Типографика

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
/* Или для более игривого вайба: */
font-family: 'Nunito', 'Poppins', sans-serif;
```

### Размеры
| Название | Tailwind | Размер | Использование |
|----------|----------|--------|---------------|
| Display | `text-4xl` | 36px | Большие числа, XP |
| Title | `text-2xl` | 24px | Заголовки страниц |
| Heading | `text-xl` | 20px | Заголовки секций |
| Body | `text-base` | 16px | Основной текст |
| Caption | `text-sm` | 14px | Подписи |
| Tiny | `text-xs` | 12px | Мелкие метки |

### Стили текста
```html
<!-- Заголовок с градиентом -->
<h1 class="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
  SteelMagnolia
</h1>

<!-- Обычный заголовок -->
<h2 class="text-xl font-bold text-white">Сегодня</h2>

<!-- Подпись -->
<p class="text-sm text-gray-400">5 упражнений • 30 мин</p>

<!-- Акцентный текст -->
<span class="text-pink-400 font-semibold">+150 XP</span>
```

---

## 📐 Spacing & Layout

### Border Radius (Мягкие формы)
```html
rounded-2xl    /* 16px - Карточки */
rounded-3xl    /* 24px - Большие карточки */
rounded-full   /* Круглые кнопки, аватары */
```

### Spacing
```html
p-4      /* 16px - Стандартный padding */
p-5      /* 20px - Карточки */
p-6      /* 24px - Большие секции */
gap-3    /* 12px - Между элементами */
gap-4    /* 16px - Между карточками */
mb-6     /* 24px - Между секциями */
```

### Touch Targets
```html
w-14 h-14    /* 56px - Кнопки +/- */
w-12 h-12    /* 48px - Icon buttons */
min-h-[56px] /* Минимум для тапа */
```

---

## 🧩 Компоненты

### 1. Primary Button (CTA)
```html
<button class="
  w-full py-4 px-6
  bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
  rounded-2xl
  font-bold text-lg text-white
  shadow-[0_0_30px_rgba(236,72,153,0.4)]
  active:scale-[0.98] transition-all
  hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]
">
  Начать тренировку ✨
</button>
```

### 2. Workout Card
```html
<button class="
  w-full p-5
  bg-gradient-to-br from-pink-500/20 to-rose-600/20
  border border-pink-500/30
  rounded-3xl
  backdrop-blur-sm
  active:scale-[0.98] transition-all
  hover:border-pink-500/50
  hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]
">
  <div class="flex items-center gap-4">
    <!-- Icon with glow -->
    <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]">
      🍑
    </div>
    <div class="flex-1 text-left">
      <h3 class="font-bold text-lg text-white">Glutes & Legs</h3>
      <p class="text-pink-300/70 text-sm">5 упражнений • 40 мин</p>
    </div>
    <div class="text-pink-400">
      →
    </div>
  </div>
</button>
```

### 3. XP Badge
```html
<div class="
  inline-flex items-center gap-1.5 
  px-3 py-1.5 
  bg-purple-500/20 
  border border-purple-500/30 
  rounded-full
">
  <span class="text-purple-400">⚡</span>
  <span class="text-purple-300 font-bold text-sm">2,450 XP</span>
</div>
```

### 4. Streak Fire
```html
<div class="flex items-center gap-2">
  <div class="
    w-12 h-12 
    bg-gradient-to-br from-orange-500 to-amber-600 
    rounded-xl 
    flex items-center justify-center
    shadow-[0_0_20px_rgba(249,115,22,0.5)]
    animate-pulse
  ">
    🔥
  </div>
  <div>
    <p class="text-2xl font-bold text-white">12</p>
    <p class="text-xs text-orange-300/70">дней подряд</p>
  </div>
</div>
```

### 5. Progress Ring
```html
<div class="relative w-24 h-24">
  <!-- Background ring -->
  <svg class="w-full h-full -rotate-90">
    <circle cx="48" cy="48" r="40" stroke="#252532" stroke-width="8" fill="none"/>
    <!-- Progress (75% = 0.75 * 251.2) -->
    <circle cx="48" cy="48" r="40" 
      stroke="url(#gradient)" 
      stroke-width="8" 
      fill="none"
      stroke-dasharray="251.2"
      stroke-dashoffset="62.8"
      stroke-linecap="round"
      class="drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#a855f7"/>
        <stop offset="100%" stop-color="#ec4899"/>
      </linearGradient>
    </defs>
  </svg>
  <!-- Center text -->
  <div class="absolute inset-0 flex flex-col items-center justify-center">
    <span class="text-2xl font-bold text-white">75%</span>
    <span class="text-xs text-gray-400">complete</span>
  </div>
</div>
```

### 6. Input с +/- (Glamour версия)
```html
<div class="flex items-center justify-center gap-4">
  <!-- Minus -->
  <button class="
    w-14 h-14 
    bg-[#252532] 
    border border-pink-500/20
    rounded-2xl 
    flex items-center justify-center
    text-pink-400 text-2xl
    active:bg-pink-500/20 active:scale-95
    transition-all
  ">
    −
  </button>
  
  <!-- Value -->
  <div class="w-28 text-center">
    <p class="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      42.5
    </p>
    <p class="text-sm text-gray-500">кг</p>
  </div>
  
  <!-- Plus -->
  <button class="
    w-14 h-14 
    bg-gradient-to-br from-purple-500/30 to-pink-500/30
    border border-pink-500/30
    rounded-2xl 
    flex items-center justify-center
    text-pink-300 text-2xl
    active:from-purple-500/50 active:to-pink-500/50 active:scale-95
    transition-all
  ">
    +
  </button>
</div>
```

### 7. Set Badge (Recorded)
```html
<div class="
  inline-flex items-center gap-2 
  px-4 py-2 
  bg-lime-500/20 
  border border-lime-500/30 
  rounded-xl
">
  <span class="text-lime-400">✓</span>
  <span class="text-lime-300 font-semibold">42.5 кг</span>
  <span class="text-lime-300/50"> × </span>
  <span class="text-lime-300">12</span>
</div>
```

### 8. Bottom Navigation
```html
<nav class="
  fixed bottom-0 left-0 right-0 
  bg-[#13131a]/90 
  backdrop-blur-lg 
  border-t border-white/5
  px-6 py-4
  safe-area-pb
">
  <div class="flex justify-around max-w-md mx-auto">
    <!-- Active -->
    <button class="flex flex-col items-center gap-1">
      <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
        <span class="text-xl">🏠</span>
      </div>
      <span class="text-xs text-pink-300">Home</span>
    </button>
    
    <!-- Inactive -->
    <button class="flex flex-col items-center gap-1">
      <div class="w-12 h-12 bg-[#252532] rounded-2xl flex items-center justify-center">
        <span class="text-xl opacity-50">📊</span>
      </div>
      <span class="text-xs text-gray-500">Stats</span>
    </button>
    
    <!-- Inactive -->
    <button class="flex flex-col items-center gap-1">
      <div class="w-12 h-12 bg-[#252532] rounded-2xl flex items-center justify-center">
        <span class="text-xl opacity-50">👤</span>
      </div>
      <span class="text-xs text-gray-500">Profile</span>
    </button>
  </div>
</nav>
```

### 9. Achievement Badge
```html
<div class="
  p-4 
  bg-gradient-to-br from-yellow-500/20 to-orange-500/20 
  border border-yellow-500/30 
  rounded-3xl
  flex items-center gap-4
">
  <div class="
    w-16 h-16 
    bg-gradient-to-br from-yellow-400 to-orange-500 
    rounded-2xl 
    flex items-center justify-center
    shadow-[0_0_25px_rgba(250,204,21,0.5)]
  ">
    <span class="text-3xl">🏆</span>
  </div>
  <div>
    <h4 class="font-bold text-yellow-300">First Week!</h4>
    <p class="text-sm text-yellow-300/60">7 тренировок подряд</p>
  </div>
  <div class="ml-auto text-yellow-400 font-bold">
    +500 XP
  </div>
</div>
```

### 10. Mood Slider
```html
<div class="bg-[#1c1c26] rounded-3xl p-5">
  <div class="flex justify-between items-center mb-4">
    <span class="text-4xl" x-text="getMoodEmoji(mood)">😊</span>
    <span class="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" x-text="mood">8</span>
  </div>
  
  <input 
    type="range" 
    min="1" max="10" 
    x-model="mood"
    class="
      w-full h-2 
      bg-[#252532] 
      rounded-full 
      appearance-none 
      cursor-pointer
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-6
      [&::-webkit-slider-thumb]:h-6
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-gradient-to-r
      [&::-webkit-slider-thumb]:from-purple-500
      [&::-webkit-slider-thumb]:to-pink-500
      [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(236,72,153,0.6)]
    "
  >
  
  <div class="flex justify-between text-xs text-gray-500 mt-2">
    <span>😫 Устала</span>
    <span>💪 Огонь!</span>
  </div>
</div>
```

---

## ✨ Анимации

### CSS Keyframes
```css
/* Glow pulse */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }
  50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
}

/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Sparkle */
@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* Confetti burst */
@keyframes confetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
}

/* Slide up */
@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale pop */
@keyframes pop {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
```

### Tailwind Animation Classes
```html
animate-pulse           /* Пульсация */
animate-bounce          /* Прыжок */
animate-[glow-pulse_2s_infinite]
animate-[float_3s_ease-in-out_infinite]
animate-[pop_0.3s_ease-out]
```

### Transition для интерактивности
```html
transition-all duration-200
active:scale-[0.97]
hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]
```

---

## 🎮 Геймификация

### XP System
```javascript
const XP_REWARDS = {
  workout_complete: 100,      // Завершила тренировку
  exercise_complete: 15,      // Выполнила упражнение
  set_recorded: 5,            // Записала подход
  streak_day: 25,             // День стрика
  streak_week: 200,           // Неделя подряд
  personal_record: 50,        // Новый рекорд
  first_workout: 500,         // Первая тренировка
};
```

### Levels
```javascript
const LEVELS = [
  { level: 1, name: 'Новичок', xp: 0, emoji: '🌱' },
  { level: 2, name: 'Старт взят', xp: 500, emoji: '🌿' },
  { level: 3, name: 'В ритме', xp: 1500, emoji: '🌸' },
  { level: 4, name: 'Набираю силу', xp: 3000, emoji: '💪' },
  { level: 5, name: 'Фитнес-леди', xp: 5000, emoji: '🔥' },
  { level: 6, name: 'Железная воля', xp: 8000, emoji: '⚡' },
  { level: 7, name: 'Королева зала', xp: 12000, emoji: '👑' },
  { level: 8, name: 'Легенда', xp: 20000, emoji: '🏆' },
];
```

### Achievements
```javascript
const ACHIEVEMENTS = [
  { id: 'first_workout', name: 'Первый шаг', emoji: '🎯', xp: 500 },
  { id: 'week_streak', name: 'Неделя огня', emoji: '🔥', xp: 200 },
  { id: 'month_streak', name: 'Месяц силы', emoji: '💎', xp: 1000 },
  { id: 'glute_master', name: 'Glute Master', emoji: '🍑', xp: 300 },
  { id: 'early_bird', name: 'Ранняя пташка', emoji: '🌅', xp: 150 },
  { id: 'night_owl', name: 'Ночная сова', emoji: '🦉', xp: 150 },
  { id: 'pr_breaker', name: 'Рекордсменка', emoji: '📈', xp: 250 },
];
```

### Level Progress Bar
```html
<div class="bg-[#1c1c26] rounded-2xl p-4">
  <div class="flex items-center justify-between mb-2">
    <div class="flex items-center gap-2">
      <span class="text-2xl">🌸</span>
      <span class="font-bold text-white">Level 3</span>
    </div>
    <span class="text-sm text-gray-400">1,850 / 3,000 XP</span>
  </div>
  
  <!-- Progress bar -->
  <div class="h-3 bg-[#252532] rounded-full overflow-hidden">
    <div 
      class="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full transition-all duration-500"
      style="width: 62%"
    ></div>
  </div>
  
  <p class="text-xs text-gray-500 mt-2">1,150 XP до Level 4 💪</p>
</div>
```

---

## 🖼 Эмодзи для UI

### Workout Types
```
🍑 Glutes & Legs
🔥 Abs & Core  
💪 Arms & Upper
🏃‍♀️ Cardio
⚡ Full Body
🧘‍♀️ Stretch
```

### Mood Scale
```javascript
function getMoodEmoji(value) {
  const emojis = {
    1: '😫', 2: '😔', 3: '😕', 4: '😐', 5: '🙂',
    6: '😊', 7: '😄', 8: '🤩', 9: '💪', 10: '🔥'
  };
  return emojis[value] || '😊';
}
```

### UI Icons
```
✨ Success, magic
⚡ XP, energy
🔥 Streak, fire
💎 Premium, special
👑 Achievement
🎯 Goal
📈 Progress
💪 Strength
🏆 Trophy
⭐ Star, favorite
```

---

## 📱 Экраны (Wireframes)

### Dashboard
```
┌─────────────────────────────────────┐
│ SteelMagnolia    🔥 12   ⚡2.4k │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Level 3 🌸                 │   │
│  │  ████████████░░░░  62%     │   │
│  │  1,150 XP до Level 4       │   │
│  └─────────────────────────────┘   │
│                                     │
│  Сегодня: Вторник                   │
│  ┌─────────────────────────────┐   │
│  │ 🍑 Glutes & Legs            →│   │
│  │ 5 упр • 40 мин    +100 XP   │   │
│  └─────────────────────────────┘   │
│                                     │
│  Неделя                             │
│  ┌───┬───┬───┬───┬───┬───┬───┐   │
│  │ ✓ │ ✓ │ ● │   │   │   │   │   │
│  │Пн │Вт │Ср │Чт │Пт │Сб │Вс │   │
│  └───┴───┴───┴───┴───┴───┴───┘   │
│                                     │
│  Последние достижения               │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │  🔥  │ │  🎯  │ │  📈  │       │
│  │Week! │ │Start │ │ PR!  │       │
│  └──────┘ └──────┘ └──────┘       │
│                                     │
├─────────────────────────────────────┤
│  🏠      📊      👤                 │
│  Home    Stats   Profile            │
└─────────────────────────────────────┘
```

### Exercise Screen
```
┌─────────────────────────────────────┐
│ ← Glutes & Legs          Завершить │
├─────────────────────────────────────┤
│  █████████░░░░░░░░░░  2/5           │
├─────────────────────────────────────┤
│                                     │
│         ┌───────────┐               │
│         │           │               │
│         │    🍑     │               │
│         │           │               │
│         └───────────┘               │
│                                     │
│      Ягодичный мост                 │
│      3 × 15 • Прошлый: 40 кг        │
│                                     │
│    ┌─────┐  ┌─────┐  ┌─────┐       │
│    │✓ 40 │  │✓ 42 │  │  ?  │       │
│    │ ×15 │  │ ×15 │  │     │       │
│    └─────┘  └─────┘  └─────┘       │
│                                     │
│      Подход 3                       │
│                                     │
│    ┌───┐   ┌─────────┐   ┌───┐    │
│    │ − │   │  42.5   │   │ + │    │
│    └───┘   │   кг    │   └───┘    │
│            └─────────┘             │
│                                     │
│    ┌───┐   ┌─────────┐   ┌───┐    │
│    │ − │   │   15    │   │ + │    │
│    └───┘   │  повт   │   └───┘    │
│            └─────────┘             │
│                                     │
│   ┌─────────────────────────────┐  │
│   │     ✓ Записать подход       │  │
│   │         +5 XP               │  │
│   └─────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│   ← Назад          Далее →          │
└─────────────────────────────────────┘
```

---

## 🔧 Tailwind Config

```javascript
// tailwind.config.js (для справки)
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-void': '#0a0a0f',
        'bg-card': '#13131a',
        'bg-elevated': '#1c1c26',
        'bg-input': '#252532',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.4)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.4)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.4)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
}
```

---

## 📝 Cursor Prompt Template

```
Создай [компонент] для SteelMagnolia:

Стиль:
- Тёмный фон: bg-[#0a0a0f] или bg-[#13131a]
- Градиенты: from-purple-500 via-pink-500 to-orange-500
- Glow эффекты: shadow-[0_0_30px_rgba(236,72,153,0.4)]
- Скруглённые формы: rounded-2xl или rounded-3xl
- Геймификация: XP бейджи, progress bars

Цвета акцентов:
- Pink #ec4899 — основной акцент
- Purple #a855f7 — XP, уровни
- Orange #f97316 — стрик, огонь
- Lime #84cc16 — успех
- Cyan #06b6d4 — кардио

Анимации:
- active:scale-[0.97] на кнопках
- hover:shadow-glow на интерактивных элементах
- transition-all duration-200
```

---

## ✅ Отличия от GymBro

| Элемент | GymBro | SteelMagnolia |
|---------|--------|---------------|
| Background | `#111827` | `#0a0a0f` (глубже) |
| Primary | Blue/Purple | Pink/Purple/Orange gradient |
| Cards | `bg-gray-800` | `bg-[#13131a]` + border glow |
| Buttons | Solid gradient | Gradient + glow shadow |
| Border Radius | `rounded-2xl` | `rounded-3xl` (мягче) |
| Animations | Minimal | Expressive + glow |
| Gamification | Streak only | XP + Levels + Badges |
| Tone | Functional | Playful + Rewarding |
