# 🏋️ CURSOR PROMPT: GymBro PWA

## Цель
Создать PWA приложение для трекинга тренировок которое:
- Работает как мобильное приложение (устанавливается на телефон)
- Выглядит идентично React прототипу
- Не требует сборки (никаких npm, webpack, vite)
- Хостится бесплатно на GitHub Pages
- Хранит данные в localStorage
- Работает офлайн

## Технологический стек

```
Alpine.js    — реактивность (как React, но без сборки)
Tailwind CDN — стили (те же классы что в прототипе)
Lucide       — иконки (те же что в прототипе)
localStorage — хранение данных
Service Worker — офлайн работа
```

## Структура проекта

```
gymbroPWA/
├── index.html          ← Единственный HTML (всё приложение)
├── js/
│   ├── app.js          ← Alpine.js компоненты и логика
│   ├── data.js         ← Шаблоны тренировок (статика)
│   └── storage.js      ← Работа с localStorage
├── css/
│   └── custom.css      ← Дополнительные стили (минимум)
├── icons/
│   └── exercises.js    ← SVG иконки упражнений
├── docs/
│   ├── FEATURES.md     ← Список фич и задачи
│   └── STYLE_GUIDE.md  ← Справочник для Cursor
├── manifest.json       ← PWA манифест
├── sw.js               ← Service Worker
└── README.md
```

---

## ЗАДАЧА 1: Создай index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#111827">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  
  <title>GymBro</title>
  
  <!-- PWA -->
  <link rel="manifest" href="manifest.json">
  <link rel="apple-touch-icon" href="icons/icon-192.png">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            gray: {
              900: '#111827',
              800: '#1f2937',
              700: '#374151',
              600: '#4b5563',
              500: '#6b7280',
              400: '#9ca3af',
            }
          }
        }
      }
    }
  </script>
  
  <!-- Alpine.js -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/custom.css">
</head>
<body class="bg-gray-900 text-white min-h-screen" x-data="gymTracker()">

  <!-- ========== СТРАНИЦА: DASHBOARD ========== -->
  <div x-show="page === 'dashboard'" x-cloak class="min-h-screen p-4 pb-24">
    
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">GymBro</h1>
        <p class="text-gray-400 text-sm">Привет, <span x-text="profile.name"></span>! 👋</p>
      </div>
      <div class="text-right">
        <p class="text-sm text-gray-400">Стрик</p>
        <p class="text-2xl font-bold text-orange-400 flex items-center gap-1">
          <i data-lucide="flame" class="w-5 h-5"></i>
          <span x-text="stats.streak"></span>
        </p>
      </div>
    </div>

    <!-- Week Progress Card -->
    <div class="bg-gray-800 rounded-2xl p-4 mb-4">
      <div class="flex justify-between items-center mb-3">
        <span class="text-gray-400">Эта неделя</span>
        <span class="text-lg font-semibold">
          <span x-text="stats.weekCompleted"></span>/<span x-text="stats.weekTotal"></span>
        </span>
      </div>
      
      <!-- Week days -->
      <div class="flex gap-1 mb-3">
        <template x-for="(day, index) in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" :key="day">
          <div class="flex-1 text-center">
            <div 
              class="h-10 rounded-lg mb-1 flex items-center justify-center transition-colors"
              :class="{
                'bg-green-500': index < stats.weekCompleted,
                'bg-blue-500 animate-pulse': index === stats.weekCompleted,
                'bg-gray-700': index > stats.weekCompleted
              }"
            >
              <i x-show="index < stats.weekCompleted" data-lucide="check" class="w-5 h-5"></i>
            </div>
            <span class="text-xs text-gray-500" x-text="day"></span>
          </div>
        </template>
      </div>
      
      <!-- Stats row -->
      <div class="flex justify-between text-sm">
        <div class="text-center">
          <p class="text-gray-400">Кардио</p>
          <p class="font-semibold text-blue-400"><span x-text="stats.cardioMinutes"></span> мин</p>
        </div>
        <div class="text-center">
          <p class="text-gray-400">Настроение</p>
          <p class="font-semibold text-green-400">⌀ <span x-text="stats.avgMood.toFixed(1)"></span></p>
        </div>
      </div>
    </div>

    <!-- HR Zones Card -->
    <div class="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-2xl p-4 mb-4 border border-red-700/50">
      <div class="flex items-center gap-2 mb-2">
        <i data-lucide="heart" class="w-5 h-5 text-red-400"></i>
        <span class="font-semibold">Пульсовые зоны</span>
        <span class="text-xs text-gray-400 ml-auto">Возраст: <span x-text="profile.age"></span></span>
      </div>
      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="bg-gray-800/50 rounded-lg p-2">
          <p class="text-xs text-gray-400">Макс ЧСС</p>
          <p class="text-xl font-bold text-red-400" x-text="profile.maxHR"></p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-2">
          <p class="text-xs text-gray-400">Жиросжигание</p>
          <p class="text-xl font-bold text-orange-400">
            <span x-text="profile.fatBurnLow"></span>-<span x-text="profile.fatBurnHigh"></span>
          </p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-2">
          <p class="text-xs text-gray-400">Интервал</p>
          <p class="text-xl font-bold text-yellow-400">
            <span x-text="profile.intervalLow"></span>-<span x-text="profile.intervalHigh"></span>
          </p>
        </div>
      </div>
    </div>

    <!-- Start Workout Button -->
    <button
      @click="page = 'select-workout'"
      class="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-5 mb-4 flex items-center justify-between shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
    >
      <div class="flex items-center gap-3">
        <div class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
          <i data-lucide="dumbbell" class="w-8 h-8"></i>
        </div>
        <div class="text-left">
          <p class="font-bold text-lg">Начать тренировку</p>
          <p class="text-blue-200 text-sm" x-text="getTodayPlan()"></p>
        </div>
      </div>
      <i data-lucide="chevron-right" class="w-6 h-6"></i>
    </button>

    <!-- Recent Workouts -->
    <div class="bg-gray-800 rounded-2xl p-4">
      <h3 class="font-semibold mb-3 flex items-center gap-2">
        <i data-lucide="calendar" class="w-5 h-5 text-gray-400"></i>
        Последние тренировки
      </h3>
      <div class="space-y-2">
        <template x-for="workout in recentWorkouts" :key="workout.id">
          <div class="flex items-center gap-3 bg-gray-700/50 rounded-xl p-3">
            <div 
              class="w-10 h-10 rounded-lg flex items-center justify-center"
              :class="getWorkoutTypeColor(workout.type)"
            >
              <i :data-lucide="workout.type === 'cardio' ? 'activity' : 'dumbbell'" class="w-5 h-5"></i>
            </div>
            <div class="flex-1">
              <p class="font-medium" x-text="workout.name"></p>
              <p class="text-sm text-gray-400" x-text="workout.date"></p>
            </div>
            <div class="text-right">
              <p class="text-lg" x-text="getMoodEmoji(workout.mood)"></p>
              <p class="text-xs text-gray-400"><span x-text="workout.mood"></span>/10</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <!-- ========== СТРАНИЦА: SELECT WORKOUT ========== -->
  <div x-show="page === 'select-workout'" x-cloak class="min-h-screen p-4">
    
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="page = 'dashboard'" class="p-2 hover:bg-gray-800 rounded-lg">
        <i data-lucide="chevron-left" class="w-6 h-6"></i>
      </button>
      <h1 class="text-xl font-bold">Выбери тренировку</h1>
    </div>

    <!-- Workout Cards -->
    <div class="space-y-3">
      <template x-for="(workout, key) in workouts" :key="key">
        <button
          @click="selectWorkout(key)"
          class="w-full rounded-2xl p-4 flex items-center gap-4 shadow-lg active:scale-[0.98] transition-transform"
          :class="workout.gradient"
        >
          <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center p-2">
            <div x-html="getExerciseIcon(workout.exercises[0]?.icon || 'dumbbell')"></div>
          </div>
          <div class="flex-1 text-left">
            <p class="text-2xl mb-1" x-text="workout.emoji"></p>
            <p class="font-bold text-lg" x-text="workout.name"></p>
            <p class="text-white/70 text-sm">
              <span x-text="workout.exercises.length"></span> упражнений + 
              <span x-text="workout.cardio"></span> мин кардио
            </p>
          </div>
          <i data-lucide="chevron-right" class="w-6 h-6"></i>
        </button>
      </template>

      <!-- Cardio Only -->
      <button
        @click="page = 'cardio'; isCardioOnly = true"
        class="w-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-4 flex items-center gap-4 shadow-lg active:scale-[0.98] transition-transform"
      >
        <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center p-2">
          <div x-html="getExerciseIcon('treadmill')"></div>
        </div>
        <div class="flex-1 text-left">
          <p class="text-2xl mb-1">🏃</p>
          <p class="font-bold text-lg">Только кардио</p>
          <p class="text-white/70 text-sm">Пн/Ср/Пт — 45-60 минут</p>
        </div>
        <i data-lucide="chevron-right" class="w-6 h-6"></i>
      </button>
    </div>
  </div>

  <!-- ========== СТРАНИЦА: WORKOUT ========== -->
  <div x-show="page === 'workout'" x-cloak class="min-h-screen pb-32">
    
    <!-- Header -->
    <div 
      class="p-4"
      :class="currentWorkout?.gradient || 'bg-gradient-to-r from-blue-500 to-blue-600'"
    >
      <div class="flex items-center justify-between mb-2">
        <button @click="page = 'select-workout'" class="p-2 hover:bg-white/20 rounded-lg">
          <i data-lucide="chevron-left" class="w-6 h-6"></i>
        </button>
        <div class="text-center">
          <p class="text-sm opacity-80" x-text="currentWorkout?.name"></p>
          <p class="font-bold">
            <span x-text="currentExerciseIndex + 1"></span> / 
            <span x-text="currentWorkout?.exercises.length"></span>
          </p>
        </div>
        <button @click="page = 'complete'" class="p-2 hover:bg-white/20 rounded-lg text-sm">
          Завершить
        </button>
      </div>
      
      <!-- Progress bar -->
      <div class="h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          class="h-full bg-white transition-all duration-300"
          :style="`width: ${((currentExerciseIndex + 1) / (currentWorkout?.exercises.length || 1)) * 100}%`"
        ></div>
      </div>
    </div>

    <!-- Exercise Card -->
    <div class="p-4">
      <div class="bg-gray-800 rounded-2xl p-4 mb-4">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-20 h-20 bg-gray-700 rounded-xl p-2">
            <div x-html="getExerciseIcon(currentExercise?.icon)"></div>
          </div>
          <div class="flex-1">
            <h2 class="font-bold text-lg" x-text="selectedAlt || currentExercise?.name"></h2>
            <p class="text-gray-400">
              <span x-text="currentExercise?.sets"></span>×<span x-text="currentExercise?.reps"></span>
            </p>
            <p 
              x-show="currentExercise?.lastWeight !== 0"
              class="text-sm text-blue-400 flex items-center gap-1 mt-1"
            >
              <i data-lucide="trending-up" class="w-4 h-4"></i>
              Прошлый раз: <span x-text="currentExercise?.lastWeight"></span> кг
            </p>
          </div>
        </div>

        <!-- Alternatives Toggle -->
        <button 
          @click="showAlternatives = !showAlternatives"
          class="w-full text-left text-sm text-gray-400 flex items-center gap-2 mb-2"
        >
          <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
          <span x-text="showAlternatives ? 'Скрыть альтернативы' : `Альтернативы (${currentExercise?.alts?.length || 0})`"></span>
        </button>
        
        <!-- Alternatives List -->
        <div x-show="showAlternatives" x-collapse class="space-y-2 mb-4">
          <template x-for="(alt, i) in currentExercise?.alts" :key="i">
            <button
              @click="selectedAlt = (selectedAlt === alt ? null : alt); showAlternatives = false"
              class="w-full text-left p-2 rounded-lg text-sm transition-colors"
              :class="selectedAlt === alt ? 'bg-blue-500/30 border border-blue-500' : 'bg-gray-700'"
              x-text="alt"
            ></button>
          </template>
          <button
            x-show="selectedAlt"
            @click="selectedAlt = null"
            class="w-full text-left p-2 rounded-lg text-sm bg-gray-700"
          >
            ← Вернуть основное
          </button>
        </div>
      </div>

      <!-- Completed Sets -->
      <div x-show="currentExerciseSets.length > 0" class="mb-4">
        <p class="text-sm text-gray-400 mb-2">Записанные подходы:</p>
        <div class="flex flex-wrap gap-2">
          <template x-for="(set, i) in currentExerciseSets" :key="i">
            <div class="bg-green-500/20 border border-green-500/50 rounded-lg px-3 py-2 text-sm">
              <span class="text-green-400 font-semibold" x-text="set.weight + ' кг'"></span>
              <span class="text-gray-400"> × </span>
              <span x-text="set.reps"></span>
            </div>
          </template>
        </div>
      </div>

      <!-- Input Form -->
      <div class="bg-gray-800 rounded-2xl p-4">
        <p class="text-center text-gray-400 mb-4">
          Подход <span x-text="currentExerciseSets.length + 1"></span>
        </p>
        
        <!-- Weight Input -->
        <div class="mb-6">
          <p class="text-sm text-gray-400 text-center mb-2">Вес (кг)</p>
          <div class="flex items-center justify-center gap-4">
            <button 
              @click="currentWeight = Math.max(0, currentWeight - 2.5)"
              class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600"
            >
              <i data-lucide="minus" class="w-6 h-6"></i>
            </button>
            <div class="w-24 text-center">
              <p class="text-4xl font-bold" x-text="currentWeight"></p>
            </div>
            <button 
              @click="currentWeight += 2.5"
              class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600"
            >
              <i data-lucide="plus" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <!-- Reps Input -->
        <div class="mb-6">
          <p class="text-sm text-gray-400 text-center mb-2">Повторения</p>
          <div class="flex items-center justify-center gap-4">
            <button 
              @click="currentReps = Math.max(1, currentReps - 1)"
              class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600"
            >
              <i data-lucide="minus" class="w-6 h-6"></i>
            </button>
            <div class="w-24 text-center">
              <p class="text-4xl font-bold" x-text="currentReps"></p>
            </div>
            <button 
              @click="currentReps++"
              class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-600"
            >
              <i data-lucide="plus" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <!-- Record Button -->
        <button
          @click="recordSet()"
          class="w-full bg-green-500 hover:bg-green-600 rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <i data-lucide="check" class="w-6 h-6"></i>
          Записать подход
        </button>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
      <div class="flex gap-4 max-w-md mx-auto">
        <button
          :disabled="currentExerciseIndex === 0"
          @click="prevExercise()"
          class="flex-1 bg-gray-700 rounded-xl py-3 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <i data-lucide="chevron-left" class="w-5 h-5"></i>
          Назад
        </button>
        <button
          @click="nextExercise()"
          class="flex-1 bg-blue-500 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
        >
          Далее
          <i data-lucide="chevron-right" class="w-5 h-5"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- ========== СТРАНИЦА: CARDIO ========== -->
  <div x-show="page === 'cardio'" x-cloak class="min-h-screen p-4">
    
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="page = isCardioOnly ? 'select-workout' : 'workout'" class="p-2 hover:bg-gray-800 rounded-lg">
        <i data-lucide="chevron-left" class="w-6 h-6"></i>
      </button>
      <h1 class="text-xl font-bold" x-text="isCardioOnly ? 'Кардио тренировка' : `Кардио (${currentWorkout?.cardio || 30} мин)`"></h1>
    </div>

    <!-- HR Zones reminder -->
    <div class="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-3 mb-4 border border-red-700/30">
      <p class="text-sm text-gray-300 flex items-center gap-2">
        <i data-lucide="heart" class="w-4 h-4 text-red-400"></i>
        Целевой пульс: 
        <span class="font-bold text-orange-400">
          <span x-text="profile.fatBurnLow"></span>-<span x-text="profile.fatBurnHigh"></span> уд/мин
        </span>
      </p>
    </div>

    <!-- Cardio Type -->
    <div class="bg-gray-800 rounded-2xl p-4 mb-4">
      <p class="text-sm text-gray-400 mb-3">Тип кардио</p>
      <div class="grid grid-cols-3 gap-3">
        <template x-for="type in cardioTypes" :key="type.id">
          <button
            @click="cardioData.type = type.id"
            class="p-3 rounded-xl flex flex-col items-center gap-2 transition-colors"
            :class="cardioData.type === type.id ? 'bg-purple-500' : 'bg-gray-700'"
          >
            <div class="w-12 h-12" x-html="getExerciseIcon(type.icon)"></div>
            <span class="text-sm" x-text="type.name"></span>
          </button>
        </template>
      </div>
    </div>

    <!-- Duration -->
    <div class="bg-gray-800 rounded-2xl p-4 mb-4">
      <p class="text-sm text-gray-400 mb-3">Длительность (минуты)</p>
      <div class="flex items-center justify-center gap-4">
        <button 
          @click="cardioData.duration = Math.max(5, cardioData.duration - 5)"
          class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center"
        >
          <i data-lucide="minus" class="w-6 h-6"></i>
        </button>
        <div class="w-24 text-center">
          <p class="text-4xl font-bold" x-text="cardioData.duration"></p>
        </div>
        <button 
          @click="cardioData.duration += 5"
          class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center"
        >
          <i data-lucide="plus" class="w-6 h-6"></i>
        </button>
      </div>
      
      <!-- Quick select -->
      <div class="flex justify-center gap-2 mt-3">
        <template x-for="min in [20, 30, 45, 60]" :key="min">
          <button
            @click="cardioData.duration = min"
            class="px-4 py-2 rounded-lg text-sm transition-colors"
            :class="cardioData.duration === min ? 'bg-purple-500' : 'bg-gray-700'"
            x-text="min"
          ></button>
        </template>
      </div>
    </div>

    <!-- Podcast -->
    <div class="bg-gray-800 rounded-2xl p-4 mb-4">
      <p class="text-sm text-gray-400 mb-2">🎧 Подкаст (опционально)</p>
      <input
        type="text"
        placeholder="NotebookLM: AI архитектура..."
        x-model="cardioData.podcast"
        class="w-full bg-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500"
      >
    </div>

    <button
      @click="page = 'complete'"
      class="w-full bg-purple-500 hover:bg-purple-600 rounded-xl py-4 font-bold text-lg active:scale-[0.98] transition-transform"
      x-text="isCardioOnly ? 'Завершить кардио' : 'Далее →'"
    ></button>
  </div>

  <!-- ========== СТРАНИЦА: COMPLETE ========== -->
  <div x-show="page === 'complete'" x-cloak class="min-h-screen p-4">
    
    <!-- Success Header -->
    <div class="text-center mb-6">
      <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <i data-lucide="award" class="w-10 h-10 text-green-400"></i>
      </div>
      <h1 class="text-2xl font-bold mb-2">Отличная работа! 💪</h1>
      <p class="text-gray-400">Осталось оценить самочувствие</p>
    </div>

    <!-- Mood Post Workout -->
    <div class="bg-gray-800 rounded-2xl p-4 mb-4">
      <p class="text-sm text-gray-400 mb-3">Как себя чувствуешь сейчас?</p>
      <div class="flex items-center justify-between mb-2">
        <span class="text-3xl" x-text="getMoodEmoji(moodPost)"></span>
        <span class="text-4xl font-bold" x-text="moodPost"></span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        x-model="moodPost"
        class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
      >
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>Плохо</span>
        <span>Отлично</span>
      </div>
    </div>

    <!-- Mood Day -->
    <div class="bg-gray-800 rounded-2xl p-4 mb-4">
      <p class="text-sm text-gray-400 mb-3">Общее самочувствие за день</p>
      <div class="flex items-center justify-between mb-2">
        <span class="text-3xl" x-text="getMoodEmoji(moodDay)"></span>
        <span class="text-4xl font-bold" x-text="moodDay"></span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        x-model="moodDay"
        class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      >
    </div>

    <!-- Notes -->
    <div class="bg-gray-800 rounded-2xl p-4 mb-6">
      <p class="text-sm text-gray-400 mb-2">📝 Заметки (опционально)</p>
      <textarea
        placeholder="Плечо побаливало, сократил вес на жиме..."
        x-model="notes"
        class="w-full bg-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
      ></textarea>
    </div>

    <!-- Save Button -->
    <button
      @click="saveWorkout()"
      class="w-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
    >
      <i data-lucide="check" class="w-6 h-6"></i>
      Сохранить тренировку
    </button>
  </div>

  <!-- Scripts -->
  <script src="js/data.js"></script>
  <script src="js/storage.js"></script>
  <script src="icons/exercises.js"></script>
  <script src="js/app.js"></script>
  
  <!-- Initialize Lucide Icons -->
  <script>
    // Re-init icons when Alpine updates DOM
    document.addEventListener('alpine:initialized', () => {
      lucide.createIcons();
      
      // Watch for DOM changes
      const observer = new MutationObserver(() => {
        lucide.createIcons();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  </script>
</body>
</html>
```

---

## ЗАДАЧА 2: Создай js/app.js

```javascript
/**
 * GymBro - Main Alpine.js Component
 */
function gymTracker() {
  return {
    // ===== STATE =====
    page: 'dashboard',
    
    // Profile
    profile: {
      name: 'Николай',
      age: 36,
      maxHR: 184,
      fatBurnLow: 110,
      fatBurnHigh: 138,
      intervalLow: 147,
      intervalHigh: 166,
    },
    
    // Stats
    stats: {
      streak: 12,
      weekCompleted: 5,
      weekTotal: 7,
      cardioMinutes: 245,
      avgMood: 7.8,
    },
    
    // Workouts data
    workouts: WORKOUT_TEMPLATES, // from data.js
    currentWorkout: null,
    currentExerciseIndex: 0,
    
    // Exercise state
    sets: [],
    currentWeight: 20,
    currentReps: 12,
    showAlternatives: false,
    selectedAlt: null,
    
    // Cardio
    isCardioOnly: false,
    cardioData: {
      type: 'treadmill',
      duration: 30,
      podcast: '',
    },
    cardioTypes: [
      { id: 'treadmill', name: 'Дорожка', icon: 'treadmill' },
      { id: 'bike', name: 'Велосипед', icon: 'bike' },
      { id: 'stepper', name: 'Степпер', icon: 'stepper' },
    ],
    
    // Mood
    moodPost: 7,
    moodDay: 7,
    notes: '',
    
    // Recent workouts
    recentWorkouts: [],
    
    // ===== COMPUTED =====
    get currentExercise() {
      return this.currentWorkout?.exercises[this.currentExerciseIndex];
    },
    
    get currentExerciseSets() {
      return this.sets.filter(s => s.exerciseIndex === this.currentExerciseIndex);
    },
    
    // ===== INIT =====
    init() {
      // Load data from localStorage
      this.loadData();
      
      // Calculate HR zones based on age
      this.calculateHRZones();
      
      console.log('GymBro initialized');
    },
    
    // ===== METHODS =====
    calculateHRZones() {
      const maxHR = 220 - this.profile.age;
      this.profile.maxHR = maxHR;
      this.profile.fatBurnLow = Math.round(maxHR * 0.6);
      this.profile.fatBurnHigh = Math.round(maxHR * 0.75);
      this.profile.intervalLow = Math.round(maxHR * 0.8);
      this.profile.intervalHigh = Math.round(maxHR * 0.9);
    },
    
    getTodayPlan() {
      const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      const today = new Date().getDay();
      const dayName = days[today];
      
      const plans = {
        0: 'Отдых',
        1: 'Кардио 45-60 мин',
        2: 'Upper Body',
        3: 'Кардио 45-60 мин',
        4: 'Lower Body',
        5: 'Кардио 45-60 мин',
        6: 'Full Body + Core',
      };
      
      return `Сегодня: ${dayName} — ${plans[today]}`;
    },
    
    selectWorkout(key) {
      this.currentWorkout = { ...this.workouts[key], key };
      this.currentExerciseIndex = 0;
      this.sets = [];
      this.selectedAlt = null;
      this.showAlternatives = false;
      
      // Set initial weight/reps from first exercise
      const firstEx = this.currentWorkout.exercises[0];
      this.currentWeight = firstEx.lastWeight || 20;
      this.currentReps = typeof firstEx.reps === 'number' ? firstEx.reps : 12;
      
      this.page = 'workout';
    },
    
    recordSet() {
      // Save the set
      this.sets.push({
        exerciseIndex: this.currentExerciseIndex,
        exerciseId: this.currentExercise.id,
        exerciseName: this.selectedAlt || this.currentExercise.name,
        weight: this.currentWeight,
        reps: this.currentReps,
        timestamp: new Date().toISOString(),
      });
      
      // Check if all sets completed for this exercise
      const targetSets = this.currentExercise.sets;
      if (this.currentExerciseSets.length >= targetSets) {
        this.nextExercise();
      }
    },
    
    nextExercise() {
      if (this.currentExerciseIndex < this.currentWorkout.exercises.length - 1) {
        this.currentExerciseIndex++;
        this.selectedAlt = null;
        this.showAlternatives = false;
        
        // Load next exercise defaults
        const nextEx = this.currentExercise;
        this.currentWeight = nextEx.lastWeight || this.currentWeight;
        this.currentReps = typeof nextEx.reps === 'number' ? nextEx.reps : 12;
      } else {
        // All exercises done, go to cardio
        this.isCardioOnly = false;
        this.cardioData.duration = this.currentWorkout.cardio || 30;
        this.page = 'cardio';
      }
    },
    
    prevExercise() {
      if (this.currentExerciseIndex > 0) {
        this.currentExerciseIndex--;
        this.selectedAlt = null;
        this.showAlternatives = false;
        
        const prevEx = this.currentExercise;
        this.currentWeight = prevEx.lastWeight || this.currentWeight;
        this.currentReps = typeof prevEx.reps === 'number' ? prevEx.reps : 12;
      }
    },
    
    saveWorkout() {
      // Create workout record
      const workout = {
        id: Date.now(),
        date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
        dateISO: new Date().toISOString(),
        type: this.currentWorkout?.key || 'cardio',
        name: this.currentWorkout?.name || 'Кардио',
        sets: [...this.sets],
        cardio: { ...this.cardioData },
        moodPost: this.moodPost,
        moodDay: this.moodDay,
        notes: this.notes,
        mood: this.moodPost, // for display
      };
      
      // Save to storage
      Storage.saveWorkout(workout);
      
      // Update stats
      this.updateStats(workout);
      
      // Reset state
      this.currentWorkout = null;
      this.currentExerciseIndex = 0;
      this.sets = [];
      this.moodPost = 7;
      this.moodDay = 7;
      this.notes = '';
      this.isCardioOnly = false;
      
      // Reload recent workouts
      this.loadData();
      
      // Go to dashboard
      this.page = 'dashboard';
    },
    
    updateStats(workout) {
      // Update streak
      this.stats.weekCompleted = Math.min(7, this.stats.weekCompleted + 1);
      
      // Update cardio minutes
      if (workout.cardio?.duration) {
        this.stats.cardioMinutes += workout.cardio.duration;
      }
      
      // Update average mood
      const allWorkouts = Storage.getWorkouts();
      if (allWorkouts.length > 0) {
        const totalMood = allWorkouts.reduce((sum, w) => sum + (w.moodPost || 7), 0);
        this.stats.avgMood = totalMood / allWorkouts.length;
      }
      
      // Save stats
      Storage.saveStats(this.stats);
    },
    
    loadData() {
      // Load stats
      const savedStats = Storage.getStats();
      if (savedStats) {
        this.stats = { ...this.stats, ...savedStats };
      }
      
      // Load recent workouts
      this.recentWorkouts = Storage.getWorkouts().slice(0, 5);
      
      // Load last weights for exercises
      this.loadLastWeights();
    },
    
    loadLastWeights() {
      const workouts = Storage.getWorkouts();
      
      // Update lastWeight for each exercise based on history
      Object.keys(this.workouts).forEach(workoutKey => {
        this.workouts[workoutKey].exercises.forEach(exercise => {
          // Find last set for this exercise
          for (const workout of workouts) {
            const lastSet = workout.sets?.find(s => s.exerciseId === exercise.id);
            if (lastSet) {
              exercise.lastWeight = lastSet.weight;
              break;
            }
          }
        });
      });
    },
    
    // ===== HELPERS =====
    getMoodEmoji(mood) {
      if (mood >= 8) return '😊';
      if (mood >= 5) return '😐';
      return '😔';
    },
    
    getWorkoutTypeColor(type) {
      const colors = {
        tuesday: 'bg-blue-500/30',
        thursday: 'bg-green-500/30',
        saturday: 'bg-orange-500/30',
        cardio: 'bg-purple-500/30',
      };
      return colors[type] || 'bg-gray-500/30';
    },
    
    getExerciseIcon(iconName) {
      return EXERCISE_ICONS[iconName] || EXERCISE_ICONS.dumbbell;
    },
  };
}
```

---

## ЗАДАЧА 3: Создай js/data.js

```javascript
/**
 * Workout Templates
 */
const WORKOUT_TEMPLATES = {
  tuesday: {
    name: 'Upper Body',
    emoji: '💪',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
    cardio: 30,
    exercises: [
      { 
        id: 'lat_pulldown', 
        name: 'Тяга верхнего блока', 
        sets: 3, 
        reps: 12, 
        icon: 'lat_pulldown', 
        lastWeight: 45,
        alts: ['Тяга гантели в наклоне', 'Подтягивания в гравитроне']
      },
      { 
        id: 'shoulder_press', 
        name: 'Жим гантелей от плеч', 
        sets: 3, 
        reps: 12, 
        icon: 'shoulder_press', 
        lastWeight: 10,
        alts: ['Жим в тренажёре сидя', 'Жим Арнольда']
      },
      { 
        id: 'cable_row', 
        name: 'Тяга горизонтального блока', 
        sets: 3, 
        reps: 12, 
        icon: 'cable_row', 
        lastWeight: 40,
        alts: ['Тяга штанги в наклоне', 'Тяга Т-грифа']
      },
      { 
        id: 'dumbbell_press', 
        name: 'Жим гантелей лёжа', 
        sets: 3, 
        reps: 10, 
        icon: 'dumbbell_press', 
        lastWeight: 12,
        alts: ['Жим в тренажёре', 'Жим штанги лёжа']
      },
      { 
        id: 'lateral_raise', 
        name: 'Разведение на дельты', 
        sets: 3, 
        reps: 12, 
        icon: 'lateral_raise', 
        lastWeight: 15,
        alts: ['Разведение в тренажёре', 'Разведение в наклоне']
      },
      { 
        id: 'bicep_curl', 
        name: 'Подъём на бицепс', 
        sets: 3, 
        reps: 12, 
        icon: 'bicep_curl', 
        lastWeight: 10,
        alts: ['Молотки', 'Подъём на скамье Скотта']
      },
    ]
  },
  
  thursday: {
    name: 'Lower Body',
    emoji: '🦵',
    gradient: 'bg-gradient-to-r from-green-500 to-green-600',
    cardio: 20,
    exercises: [
      { 
        id: 'leg_press', 
        name: 'Жим ногами', 
        sets: 3, 
        reps: 15, 
        icon: 'leg_press', 
        lastWeight: 100,
        alts: ['Приседания в Смите', 'Гакк-приседания']
      },
      { 
        id: 'romanian_deadlift', 
        name: 'Румынская тяга с гантелями', 
        sets: 3, 
        reps: 12, 
        icon: 'romanian_deadlift', 
        lastWeight: 16,
        alts: ['Становая в Смите', 'Гиперэкстензия с весом']
      },
      { 
        id: 'glute_bridge', 
        name: 'Ягодичный мост с весом', 
        sets: 3, 
        reps: 15, 
        icon: 'glute_bridge', 
        lastWeight: 40,
        alts: ['Ягодичный мост в Смите', 'Толчки бёдрами']
      },
      { 
        id: 'leg_extension', 
        name: 'Разгибания ног', 
        sets: 3, 
        reps: 15, 
        icon: 'leg_extension', 
        lastWeight: 35,
        alts: ['Приседания-ножницы', 'Выпады']
      },
      { 
        id: 'leg_curl', 
        name: 'Сгибания ног', 
        sets: 3, 
        reps: 15, 
        icon: 'leg_curl', 
        lastWeight: 30,
        alts: ['Румынская тяга на одной ноге', 'Сгибания стоя']
      },
    ]
  },
  
  saturday: {
    name: 'Full Body + Core',
    emoji: '🔥',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
    cardio: 30,
    exercises: [
      { 
        id: 'pull_up', 
        name: 'Подтягивания в гравитроне', 
        sets: 3, 
        reps: 10, 
        icon: 'pull_up', 
        lastWeight: -30,
        alts: ['Тяга верхнего блока', 'Австралийские подтягивания']
      },
      { 
        id: 'chest_press', 
        name: 'Жим гантелей лёжа', 
        sets: 3, 
        reps: 10, 
        icon: 'dumbbell_press', 
        lastWeight: 18,
        alts: ['Жим в тренажёре', 'Отжимания с весом']
      },
      { 
        id: 'squat', 
        name: 'Приседания в Смите', 
        sets: 3, 
        reps: 12, 
        icon: 'squat', 
        lastWeight: 40,
        alts: ['Гоблет приседания', 'Жим ногами']
      },
      { 
        id: 'hyperextension', 
        name: 'Гиперэкстензии', 
        sets: 3, 
        reps: 15, 
        icon: 'hyperextension', 
        lastWeight: 10,
        alts: ['Румынская тяга лёгкая', 'Супермен на полу']
      },
      { 
        id: 'plank', 
        name: 'Планка', 
        sets: 3, 
        reps: '45-60 сек', 
        icon: 'plank', 
        lastWeight: 0,
        alts: ['Планка на локтях динамичная']
      },
      { 
        id: 'side_plank', 
        name: 'Боковая планка', 
        sets: 2, 
        reps: '30 сек/сторона', 
        icon: 'side_plank', 
        lastWeight: 0,
        alts: ['Русские скручивания']
      },
      { 
        id: 'glute_bridge_2', 
        name: 'Ягодичный мост', 
        sets: 3, 
        reps: 20, 
        icon: 'glute_bridge', 
        lastWeight: 20,
        alts: ['Толчки бёдрами', 'Мост на одной ноге']
      },
    ]
  }
};
```

---

## ЗАДАЧА 4: Создай js/storage.js

```javascript
/**
 * LocalStorage wrapper for GymBro
 */
const Storage = {
  KEYS: {
    WORKOUTS: 'gym_workouts',
    STATS: 'gym_stats',
    PROFILE: 'gym_profile',
  },
  
  // ===== WORKOUTS =====
  getWorkouts() {
    try {
      const data = localStorage.getItem(this.KEYS.WORKOUTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading workouts:', e);
      return [];
    }
  },
  
  saveWorkout(workout) {
    try {
      const workouts = this.getWorkouts();
      workouts.unshift(workout); // Add to beginning
      
      // Keep only last 100 workouts
      if (workouts.length > 100) {
        workouts.pop();
      }
      
      localStorage.setItem(this.KEYS.WORKOUTS, JSON.stringify(workouts));
      return true;
    } catch (e) {
      console.error('Error saving workout:', e);
      return false;
    }
  },
  
  // ===== STATS =====
  getStats() {
    try {
      const data = localStorage.getItem(this.KEYS.STATS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading stats:', e);
      return null;
    }
  },
  
  saveStats(stats) {
    try {
      localStorage.setItem(this.KEYS.STATS, JSON.stringify(stats));
      return true;
    } catch (e) {
      console.error('Error saving stats:', e);
      return false;
    }
  },
  
  // ===== PROFILE =====
  getProfile() {
    try {
      const data = localStorage.getItem(this.KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading profile:', e);
      return null;
    }
  },
  
  saveProfile(profile) {
    try {
      localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
      return true;
    } catch (e) {
      console.error('Error saving profile:', e);
      return false;
    }
  },
  
  // ===== EXPORT/IMPORT =====
  exportData() {
    return {
      workouts: this.getWorkouts(),
      stats: this.getStats(),
      profile: this.getProfile(),
      exportedAt: new Date().toISOString(),
    };
  },
  
  importData(data) {
    try {
      if (data.workouts) {
        localStorage.setItem(this.KEYS.WORKOUTS, JSON.stringify(data.workouts));
      }
      if (data.stats) {
        localStorage.setItem(this.KEYS.STATS, JSON.stringify(data.stats));
      }
      if (data.profile) {
        localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(data.profile));
      }
      return true;
    } catch (e) {
      console.error('Error importing data:', e);
      return false;
    }
  },
  
  // ===== CLEAR =====
  clearAll() {
    localStorage.removeItem(this.KEYS.WORKOUTS);
    localStorage.removeItem(this.KEYS.STATS);
    localStorage.removeItem(this.KEYS.PROFILE);
  }
};
```

---

## ЗАДАЧА 5: Создай icons/exercises.js

Скопируй SVG иконки из прототипа React в объект:

```javascript
/**
 * Exercise SVG Icons
 * White fill, 64x64 viewBox
 */
const EXERCISE_ICONS = {
  // Default
  dumbbell: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="8" y="26" width="48" height="12" fill="white" rx="2"/>
      <rect x="4" y="22" width="8" height="20" fill="white" rx="2"/>
      <rect x="52" y="22" width="8" height="20" fill="white" rx="2"/>
    </svg>
  `,
  
  lat_pulldown: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="20" y="4" width="24" height="4" fill="white" rx="2"/>
      <line x1="32" y1="8" x2="32" y2="16" stroke="white" stroke-width="3"/>
      <line x1="20" y1="8" x2="14" y2="20" stroke="white" stroke-width="3"/>
      <line x1="44" y1="8" x2="50" y2="20" stroke="white" stroke-width="3"/>
      <circle cx="32" cy="32" r="8" fill="white" opacity="0.8"/>
      <path d="M24 32 L16 44 M40 32 L48 44" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="40" x2="32" y2="56" stroke="white" stroke-width="4"/>
      <line x1="24" y1="56" x2="40" y2="56" stroke="white" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `,
  
  shoulder_press: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <circle cx="32" cy="14" r="8" fill="white" opacity="0.8"/>
      <line x1="32" y1="22" x2="32" y2="40" stroke="white" stroke-width="4"/>
      <path d="M32 26 L20 20 L12 8" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 26 L44 20 L52 8" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <rect x="6" y="4" width="12" height="6" fill="white" rx="3"/>
      <rect x="46" y="4" width="12" height="6" fill="white" rx="3"/>
      <line x1="24" y1="40" x2="24" y2="58" stroke="white" stroke-width="3"/>
      <line x1="40" y1="40" x2="40" y2="58" stroke="white" stroke-width="3"/>
    </svg>
  `,
  
  cable_row: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="4" y="20" width="8" height="28" fill="white" opacity="0.5" rx="2"/>
      <line x1="12" y1="34" x2="24" y2="34" stroke="white" stroke-width="2"/>
      <circle cx="32" cy="30" r="6" fill="white" opacity="0.8"/>
      <line x1="32" y1="36" x2="32" y2="48" stroke="white" stroke-width="4"/>
      <path d="M32 40 L24 34 L24 30" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 40 L40 34 L40 30" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M24 48 L24 58 M40 48 L40 58" stroke="white" stroke-width="3"/>
      <rect x="20" y="54" width="24" height="6" fill="white" opacity="0.5" rx="2"/>
    </svg>
  `,
  
  dumbbell_press: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="12" y="44" width="40" height="12" fill="white" opacity="0.5" rx="4"/>
      <circle cx="32" cy="32" r="6" fill="white" opacity="0.8"/>
      <line x1="32" y1="38" x2="32" y2="44" stroke="white" stroke-width="4"/>
      <path d="M32 36 L20 28 L12 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 36 L44 28 L52 24" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <rect x="4" y="20" width="14" height="6" fill="white" rx="3"/>
      <rect x="46" y="20" width="14" height="6" fill="white" rx="3"/>
    </svg>
  `,
  
  bicep_curl: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <circle cx="32" cy="12" r="8" fill="white" opacity="0.8"/>
      <line x1="32" y1="20" x2="32" y2="44" stroke="white" stroke-width="4"/>
      <path d="M32 24 L24 32 L24 44 L20 44" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 24 L40 28 L44 20" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <rect x="42" y="14" width="8" height="10" fill="white" rx="2"/>
      <line x1="24" y1="44" x2="24" y2="58" stroke="white" stroke-width="3"/>
      <line x1="40" y1="44" x2="40" y2="58" stroke="white" stroke-width="3"/>
    </svg>
  `,
  
  lateral_raise: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <circle cx="32" cy="14" r="6" fill="white" opacity="0.8"/>
      <line x1="32" y1="20" x2="32" y2="40" stroke="white" stroke-width="4"/>
      <path d="M32 26 L16 20" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 26 L48 20" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <circle cx="14" cy="20" r="4" fill="white"/>
      <circle cx="50" cy="20" r="4" fill="white"/>
      <line x1="26" y1="40" x2="26" y2="56" stroke="white" stroke-width="3"/>
      <line x1="38" y1="40" x2="38" y2="56" stroke="white" stroke-width="3"/>
    </svg>
  `,
  
  leg_press: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="4" y="40" width="24" height="20" fill="white" opacity="0.5" rx="4"/>
      <circle cx="44" cy="28" r="6" fill="white" opacity="0.8"/>
      <path d="M44 34 L40 48 L28 52" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <path d="M40 48 L52 44 L56 32" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <rect x="52" y="24" width="8" height="12" fill="white" rx="2"/>
    </svg>
  `,
  
  romanian_deadlift: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <circle cx="32" cy="20" r="6" fill="white" opacity="0.8"/>
      <path d="M32 26 L32 36 L28 50" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <path d="M32 36 L36 50" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <path d="M32 30 L20 38 L16 44" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 30 L44 38 L48 44" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <rect x="8" y="42" width="16" height="4" fill="white" rx="2"/>
      <rect x="40" y="42" width="16" height="4" fill="white" rx="2"/>
    </svg>
  `,
  
  glute_bridge: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <ellipse cx="32" cy="44" rx="20" ry="8" fill="white" opacity="0.3"/>
      <path d="M16 40 Q32 20 48 40" stroke="white" stroke-width="4" fill="none"/>
      <circle cx="48" cy="36" r="5" fill="white" opacity="0.8"/>
      <rect x="26" y="28" width="12" height="6" fill="white" rx="2"/>
    </svg>
  `,
  
  leg_extension: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="8" y="24" width="20" height="32" fill="white" opacity="0.3" rx="4"/>
      <circle cx="40" cy="28" r="6" fill="white" opacity="0.8"/>
      <line x1="40" y1="34" x2="28" y2="40" stroke="white" stroke-width="4"/>
      <path d="M28 40 L40 52 L52 52" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <rect x="50" y="48" width="8" height="8" fill="white" rx="2"/>
    </svg>
  `,
  
  leg_curl: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="8" y="20" width="24" height="12" fill="white" opacity="0.3" rx="4"/>
      <circle cx="20" cy="26" r="5" fill="white" opacity="0.8"/>
      <path d="M32 26 L48 26 L52 40" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <path d="M52 40 L44 52 L40 52" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <rect x="36" y="50" width="8" height="6" fill="white" rx="2"/>
    </svg>
  `,
  
  pull_up: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="12" y="4" width="40" height="4" fill="white" rx="2"/>
      <line x1="20" y1="8" x2="20" y2="16" stroke="white" stroke-width="3"/>
      <line x1="44" y1="8" x2="44" y2="16" stroke="white" stroke-width="3"/>
      <circle cx="32" cy="22" r="6" fill="white" opacity="0.8"/>
      <line x1="32" y1="28" x2="32" y2="44" stroke="white" stroke-width="4"/>
      <path d="M32 32 L20 16" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 32 L44 16" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="26" y1="44" x2="26" y2="58" stroke="white" stroke-width="3"/>
      <line x1="38" y1="44" x2="38" y2="58" stroke="white" stroke-width="3"/>
    </svg>
  `,
  
  squat: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <circle cx="32" cy="12" r="7" fill="white" opacity="0.8"/>
      <line x1="32" y1="19" x2="32" y2="36" stroke="white" stroke-width="4"/>
      <path d="M32 36 L24 52 L24 60" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <path d="M32 36 L40 52 L40 60" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <rect x="8" y="8" width="48" height="5" fill="white" rx="2"/>
      <path d="M32 24 L20 12" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 24 L44 12" stroke="white" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,
  
  hyperextension: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="8" y="32" width="32" height="8" fill="white" opacity="0.3" rx="2" transform="rotate(-20 24 36)"/>
      <circle cx="48" cy="20" r="5" fill="white" opacity="0.8"/>
      <path d="M44 24 L28 36" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <path d="M28 36 L16 48" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M36 32 L44 40 L52 44" stroke="white" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,
  
  plank: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <circle cx="12" cy="32" r="5" fill="white" opacity="0.8"/>
      <line x1="17" y1="32" x2="52" y2="32" stroke="white" stroke-width="4"/>
      <line x1="20" y1="32" x2="16" y2="44" stroke="white" stroke-width="3"/>
      <line x1="48" y1="32" x2="52" y2="44" stroke="white" stroke-width="3"/>
    </svg>
  `,
  
  side_plank: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <circle cx="20" cy="16" r="5" fill="white" opacity="0.8"/>
      <path d="M20 21 L24 36 L44 48" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <line x1="24" y1="36" x2="20" y2="52" stroke="white" stroke-width="3"/>
      <line x1="20" y1="21" x2="12" y2="8" stroke="white" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,
  
  treadmill: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="8" y="44" width="48" height="12" fill="white" opacity="0.5" rx="4"/>
      <rect x="12" y="48" width="40" height="4" fill="white" rx="2"/>
      <rect x="48" y="20" width="8" height="28" fill="white" opacity="0.5" rx="2"/>
      <circle cx="28" cy="32" r="5" fill="white" opacity="0.8"/>
      <path d="M28 37 L28 44" stroke="white" stroke-width="3"/>
      <path d="M28 36 L22 40 L20 48" stroke="white" stroke-width="2"/>
      <path d="M28 36 L34 42 L36 48" stroke="white" stroke-width="2"/>
    </svg>
  `,
  
  bike: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <circle cx="16" cy="48" r="10" fill="none" stroke="white" stroke-width="3"/>
      <circle cx="48" cy="48" r="10" fill="none" stroke="white" stroke-width="3"/>
      <path d="M16 48 L28 32 L40 32 L48 48" stroke="white" stroke-width="3"/>
      <line x1="28" y1="32" x2="28" y2="20" stroke="white" stroke-width="3"/>
      <rect x="24" y="16" width="8" height="4" fill="white" rx="1"/>
      <circle cx="36" cy="24" r="4" fill="white" opacity="0.8"/>
    </svg>
  `,
  
  stepper: `
    <svg viewBox="0 0 64 64" class="w-full h-full">
      <rect x="16" y="48" width="14" height="8" fill="white" rx="2"/>
      <rect x="34" y="40" width="14" height="8" fill="white" rx="2"/>
      <rect x="20" y="56" width="24" height="4" fill="white" opacity="0.5" rx="1"/>
      <circle cx="32" cy="16" r="5" fill="white" opacity="0.8"/>
      <line x1="32" y1="21" x2="32" y2="34" stroke="white" stroke-width="3"/>
      <path d="M32 34 L24 44 L23 52" stroke="white" stroke-width="2"/>
      <path d="M32 34 L40 36 L41 44" stroke="white" stroke-width="2"/>
    </svg>
  `,
};
```

---

## ЗАДАЧА 6: Создай css/custom.css

```css
/* Custom styles that can't be done with Tailwind */

/* Hide elements with x-cloak until Alpine loads */
[x-cloak] {
  display: none !important;
}

/* Range slider styling */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-track {
  background: #374151;
  height: 8px;
  border-radius: 4px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: currentColor;
  margin-top: -8px;
}

input[type="range"].accent-green-500::-webkit-slider-thumb {
  background: #22c55e;
}

input[type="range"].accent-blue-500::-webkit-slider-thumb {
  background: #3b82f6;
}

/* Smooth page transitions */
.page-enter {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Collapse animation for Alpine */
[x-collapse] {
  overflow: hidden;
}

/* iOS safe areas */
@supports (padding: env(safe-area-inset-bottom)) {
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Prevent pull-to-refresh on mobile */
html, body {
  overscroll-behavior-y: contain;
}

/* Touch feedback */
button:active {
  opacity: 0.9;
}

/* Hide scrollbar but allow scrolling */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

## ЗАДАЧА 7: Создай manifest.json

```json
{
  "name": "GymBro",
  "short_name": "GYM",
  "description": "Трекер тренировок",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#111827",
  "theme_color": "#111827",
  "orientation": "portrait",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## ЗАДАЧА 8: Создай sw.js (Service Worker)

```javascript
const CACHE_NAME = 'gymbroPWA-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/custom.css',
  '/js/app.js',
  '/js/data.js',
  '/js/storage.js',
  '/icons/exercises.js',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
```

---

## ЗАДАЧА 9: Создай README.md

```markdown
# 🏋️ GymBro PWA

Мобильное приложение для отслеживания тренировок.

## 🚀 Быстрый старт

1. Скачай или клонируй репозиторий
2. Открой `index.html` в браузере
3. Готово!

## 📱 Установка на телефон

### Android (Chrome)
1. Открой сайт в Chrome
2. Нажми меню (⋮) → "Добавить на главный экран"

### iOS (Safari)
1. Открой сайт в Safari
2. Нажми "Поделиться" → "На экран Домой"

## 🛠 Технологии

- **Alpine.js** — реактивность
- **Tailwind CSS** — стили
- **Lucide** — иконки
- **localStorage** — хранение данных

## 📁 Структура

\`\`\`
gymbroPWA/
├── index.html      ← Всё приложение
├── js/
│   ├── app.js      ← Alpine компонент
│   ├── data.js     ← Шаблоны тренировок
│   └── storage.js  ← LocalStorage
├── css/
│   └── custom.css
├── icons/
│   └── exercises.js
├── docs/
│   ├── FEATURES.md
│   └── STYLE_GUIDE.md
├── manifest.json
└── sw.js
\`\`\`

## ✏️ Редактирование тренировок

Открой `js/data.js` и измени объект `WORKOUT_TEMPLATES`.

## 📚 Документация

- [FEATURES.md](docs/FEATURES.md) — список фич и задачи
- [STYLE_GUIDE.md](docs/STYLE_GUIDE.md) — справочник для верстки

## 💾 Экспорт данных

В консоли браузера:
\`\`\`javascript
JSON.stringify(Storage.exportData())
\`\`\`

## 📄 Лицензия

MIT
```

---

## Деплой на GitHub Pages

1. Создай репозиторий на GitHub
2. `git init`
3. `git add .`
4. `git commit -m "Initial commit"`
5. `git remote add origin https://github.com/YOUR_USERNAME/gymbroPWA.git`
6. `git push -u origin main`
7. Settings → Pages → Source: main branch → Save
8. Через 1-2 минуты сайт будет на `https://YOUR_USERNAME.github.io/gymbroPWA/`

---

## Чеклист

- [ ] index.html создан
- [ ] js/app.js создан
- [ ] js/data.js создан
- [ ] js/storage.js создан
- [ ] icons/exercises.js создан
- [ ] css/custom.css создан
- [ ] manifest.json создан
- [ ] sw.js создан
- [ ] README.md создан
- [ ] docs/FEATURES.md скопирован
- [ ] docs/STYLE_GUIDE.md скопирован
- [ ] Репозиторий на GitHub
- [ ] GitHub Pages включён
- [ ] Протестировано на телефоне
