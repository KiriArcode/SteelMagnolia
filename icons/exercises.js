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
