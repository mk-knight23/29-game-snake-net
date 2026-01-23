export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';
export type GameMode = 'classic' | 'noWalls' | 'timeAttack';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

export interface Position {
  x: number;
  y: number;
}

export interface GameSettings {
  difficulty: Difficulty;
  gameMode: GameMode;
  soundEnabled: boolean;
  darkMode: boolean;
  gridSize: number;
}

export interface GameStats {
  gamesPlayed: number;
  highScore: number;
  totalScore: number;
  longestSnake: number;
}

export interface PowerUp {
  type: 'speed' | 'slow' | 'double' | 'shrink';
  position: Position;
  duration: number;
}

export const DIFFICULTY_SPEEDS: Record<Difficulty, number> = {
  easy: 150,
  medium: 100,
  hard: 70,
  extreme: 50,
};

export const SNAKE_COLORS = [
  '#4ADE80', // green
  '#60A5FA', // blue
  '#A78BFA', // purple
  '#FBBF24', // yellow
  '#22D3EE', // cyan
  '#F472B6', // pink
];

export const FOOD_COLORS = [
  '#EF4444', // red
  '#F97316', // orange
  '#EC4899', // pink
  '#8B5CF6', // violet
];
