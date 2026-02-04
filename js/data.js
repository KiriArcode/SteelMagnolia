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
