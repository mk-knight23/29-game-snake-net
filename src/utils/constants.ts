export const GAME_CONSTANTS = {
  DEFAULT_SPEED: 100,
  MIN_SPEED: 40,
  MAX_SPEED: 200,
  DEFAULT_GRID_SIZE: 20,
  MIN_GRID_SIZE: 10,
  MAX_GRID_SIZE: 30,
  INITIAL_LIVES: 3,
  SCORE_PER_FOOD: 10,
  FOOD_PER_LEVEL: 5,
  SPEED_INCREMENT: 10,
} as const

export const STORAGE_KEYS = {
  HIGH_SCORE: 'snake-highscore',
  SETTINGS: 'snake-settings',
  STATS: 'snake-stats',
} as const

export const KEYBOARD_SHORTCUTS = {
  START: 'Space',
  PAUSE: 'Escape',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  MUTE: 'M',
  THEME: 'T',
  SETTINGS: 'S',
} as const

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const
