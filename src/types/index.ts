export interface GameState {
  status: 'idle' | 'playing' | 'paused' | 'gameover'
  score: number
  highScore: number
  speed: number
  gridSize: number
  snake: Array<{ x: number; y: number }>
  food: { x: number; y: number }
  direction: { x: number; y: number }
  nextDirection: { x: number; y: number }
  lives: number
  level: number
}

export interface SettingsState {
  soundEnabled: boolean
  musicEnabled: boolean
  vibrationsEnabled: boolean
  difficulty: 'easy' | 'normal' | 'hard'
  theme: 'dark' | 'light' | 'system'
  showGrid: boolean
  showTimer: boolean
}

export interface StatsState {
  totalGames: number
  totalWins: number
  totalFoodEaten: number
  bestScore: number
  averageScore: number
  longestSnake: number
  lastPlayed: string | null
}

export type GameStatus = GameState['status']
