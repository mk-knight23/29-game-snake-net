import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Direction, GameState, GameSettings, GameStats, Position } from '@/types/game';
import { DIFFICULTY_SPEEDS, SNAKE_COLORS, FOOD_COLORS } from '@/types/game';

interface SnakeStore {
  // Game state
  gameState: GameState;
  snake: Position[];
  direction: Direction;
  nextDirection: Direction;
  food: Position;
  foodColor: string;
  score: number;
  speed: number;
  
  // Settings
  settings: GameSettings;
  stats: GameStats;
  
  // Actions
  setGameState: (state: GameState) => void;
  setDirection: (dir: Direction) => void;
  moveSnake: () => boolean;
  spawnFood: () => void;
  eatFood: () => void;
  resetGame: () => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  updateStats: (stats: Partial<GameStats>) => void;
}

const GRID_SIZE = 20;

const getInitialSnake = (): Position[] => {
  const center = Math.floor(GRID_SIZE / 2);
  return Array.from({ length: 5 }, (_, i) => ({
    x: center - i,
    y: center,
  }));
};

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const getRandomFoodColor = (): string => 
  FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)];

export const useSnakeStore = create<SnakeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      gameState: 'idle',
      snake: getInitialSnake(),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      food: getRandomPosition(),
      foodColor: getRandomFoodColor(),
      score: 0,
      speed: 100,
      
      settings: {
        difficulty: 'medium',
        gameMode: 'classic',
        soundEnabled: true,
        darkMode: true,
        gridSize: GRID_SIZE,
      },
      
      stats: {
        gamesPlayed: 0,
        highScore: 0,
        totalScore: 0,
        longestSnake: 5,
      },
      
      setGameState: (gameState) => set({ gameState }),
      
      setDirection: (dir) => {
        const { direction } = get();
        const opposites: Record<Direction, Direction> = {
          UP: 'DOWN',
          DOWN: 'UP',
          LEFT: 'RIGHT',
          RIGHT: 'LEFT',
        };
        if (opposites[dir] !== direction) {
          set({ nextDirection: dir });
        }
      },
      
      moveSnake: () => {
        const { snake, nextDirection, food, settings } = get();
        const head = snake[0];
        
        const moves: Record<Direction, Position> = {
          UP: { x: head.x, y: head.y - 1 },
          DOWN: { x: head.x, y: head.y + 1 },
          LEFT: { x: head.x - 1, y: head.y },
          RIGHT: { x: head.x + 1, y: head.y },
        };
        
        let newHead = moves[nextDirection];
        
        // Handle wall collisions based on game mode
        if (settings.gameMode === 'noWalls') {
          newHead = {
            x: (newHead.x + GRID_SIZE) % GRID_SIZE,
            y: (newHead.y + GRID_SIZE) % GRID_SIZE,
          };
        } else {
          if (newHead.x < 0 || newHead.x >= GRID_SIZE || 
              newHead.y < 0 || newHead.y >= GRID_SIZE) {
            return false; // Game over
          }
        }
        
        // Check self collision
        if (snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          return false; // Game over
        }
        
        const newSnake = [newHead, ...snake];
        
        // Check if eating food
        if (newHead.x === food.x && newHead.y === food.y) {
          get().eatFood();
        } else {
          newSnake.pop();
        }
        
        set({ snake: newSnake, direction: nextDirection });
        return true;
      },
      
      spawnFood: () => {
        const { snake } = get();
        let newFood: Position;
        do {
          newFood = getRandomPosition();
        } while (snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
        
        set({ food: newFood, foodColor: getRandomFoodColor() });
      },
      
      eatFood: () => {
        const { score, stats } = get();
        const newScore = score + 10;
        set({ score: newScore });
        get().spawnFood();
        
        // Update high score
        if (newScore > stats.highScore) {
          get().updateStats({ highScore: newScore });
        }
      },
      
      resetGame: () => {
        const { settings } = get();
        set({
          snake: getInitialSnake(),
          direction: 'RIGHT',
          nextDirection: 'RIGHT',
          food: getRandomPosition(),
          foodColor: getRandomFoodColor(),
          score: 0,
          speed: DIFFICULTY_SPEEDS[settings.difficulty],
          gameState: 'idle',
        });
      },
      
      startGame: () => {
        const { settings, stats } = get();
        get().resetGame();
        set({
          gameState: 'playing',
          speed: DIFFICULTY_SPEEDS[settings.difficulty],
        });
        get().updateStats({ gamesPlayed: stats.gamesPlayed + 1 });
      },
      
      pauseGame: () => set({ gameState: 'paused' }),
      resumeGame: () => set({ gameState: 'playing' }),
      
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
      
      updateStats: (newStats) => {
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        }));
      },
    }),
    {
      name: 'snake-game-storage',
      partialize: (state) => ({
        settings: state.settings,
        stats: state.stats,
      }),
    }
  )
);

export { SNAKE_COLORS };
