import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameStatus } from '@/types'
import { STORAGE_KEYS, GAME_CONSTANTS } from '@/utils/constants'

export const useGameStore = defineStore('game', () => {
  const status = ref<GameStatus>('idle')
  const score = ref(0)
  const highScore = ref(parseInt(localStorage.getItem(STORAGE_KEYS.HIGH_SCORE) || '0'))
  const speed = ref<number>(GAME_CONSTANTS.DEFAULT_SPEED)
  const gridSize = ref<number>(GAME_CONSTANTS.DEFAULT_GRID_SIZE)
  const snake = ref<Array<{ x: number; y: number }>>([{ x: 10, y: 10 }])
  const food = ref({ x: 15, y: 15 })
  const direction = ref({ x: 0, y: -1 })
  const nextDirection = ref({ x: 0, y: -1 })
  const lives = ref(GAME_CONSTANTS.INITIAL_LIVES)
  const level = ref(1)
  const foodEaten = ref(0)
  
  // V2: Golden apple power-up
  const goldenApple = ref<{ x: number; y: number; active: boolean; timeLeft: number } | null>(null)
  const goldenAppleTimer = ref<number | null>(null)

  const progress = computed(() => (foodEaten.value / (gridSize.value * gridSize.value)) * 100)
  const isPlaying = computed(() => status.value === 'playing')
  const isPaused = computed(() => status.value === 'paused')
  const isGameOver = computed(() => status.value === 'gameover')
  const isIdle = computed(() => status.value === 'idle')

  const formattedTime = computed(() => {
    const seconds = Math.floor(foodEaten.value * 0.5)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  })

  function startGame(): void {
    status.value = 'playing'
    score.value = 0
    snake.value = [{ x: Math.floor(gridSize.value / 2), y: Math.floor(gridSize.value / 2) }]
    direction.value = { x: 1, y: 0 }
    nextDirection.value = { x: 1, y: 0 }
    lives.value = GAME_CONSTANTS.INITIAL_LIVES
    level.value = 1
    foodEaten.value = 0
    spawnFood()
  }

  function pauseGame(): void {
    status.value = status.value === 'paused' ? 'playing' : 'paused'
  }

  function gameOver(): void {
    status.value = 'gameover'
    if (score.value > highScore.value) {
      highScore.value = score.value
      localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.value.toString())
    }
  }

  function resetGame(): void {
    status.value = 'idle'
    score.value = 0
    snake.value = [{ x: Math.floor(gridSize.value / 2), y: Math.floor(gridSize.value / 2) }]
    direction.value = { x: 1, y: 0 }
    nextDirection.value = { x: 1, y: 0 }
    lives.value = GAME_CONSTANTS.INITIAL_LIVES
    level.value = 1
    foodEaten.value = 0
  }

  function moveSnake(): { collided: boolean; ateFood: boolean } {
    direction.value = { ...nextDirection.value }
    const head = {
      x: snake.value[0].x + direction.value.x,
      y: snake.value[0].y + direction.value.y
    }

    const collided = checkCollision(head)
    if (collided) {
      lives.value--
      if (lives.value <= 0) {
        gameOver()
      }
      return { collided: true, ateFood: false }
    }

    snake.value.unshift(head)

    const ateFood = head.x === food.value.x && head.y === food.value.y
    if (ateFood) {
      score.value += GAME_CONSTANTS.SCORE_PER_FOOD * level.value
      foodEaten.value++
      
      if (foodEaten.value % GAME_CONSTANTS.FOOD_PER_LEVEL === 0) {
        level.value++
        speed.value = Math.max(GAME_CONSTANTS.MIN_SPEED, speed.value - GAME_CONSTANTS.SPEED_INCREMENT)
      }
      
      spawnFood()
      
      // V2: Chance to spawn golden apple
      maybeSpawnGoldenApple()
    } else {
      // V2: Check golden apple collision
      if (goldenApple.value?.active && head.x === goldenApple.value.x && head.y === goldenApple.value.y) {
        score.value += GAME_CONSTANTS.SCORE_PER_FOOD * 3 // 3x points
        goldenApple.value = null
        if (goldenAppleTimer.value) {
          clearTimeout(goldenAppleTimer.value)
          goldenAppleTimer.value = null
        }
      } else {
        snake.value.pop()
      }
    }

    return { collided: false, ateFood }
  }
  
  // V2: Spawn golden apple with 15% chance
  function maybeSpawnGoldenApple(): void {
    if (goldenApple.value?.active) return // Don't spawn if one exists
    if (Math.random() < 0.15) {
      let newApple: { x: number; y: number }
      do {
        newApple = {
          x: Math.floor(Math.random() * gridSize.value),
          y: Math.floor(Math.random() * gridSize.value)
        }
      } while (
        snake.value.some(s => s.x === newApple.x && s.y === newApple.y) ||
        (food.value.x === newApple.x && food.value.y === newApple.y)
      )
      
      goldenApple.value = { ...newApple, active: true, timeLeft: 5000 }
      
      // Golden apple disappears after 5 seconds
      goldenAppleTimer.value = window.setTimeout(() => {
        goldenApple.value = null
      }, 5000)
    }
  }

  function spawnFood(): void {
    let newFood: { x: number; y: number }
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize.value),
        y: Math.floor(Math.random() * gridSize.value)
      }
    } while (snake.value.some(s => s.x === newFood.x && s.y === newFood.y))
    food.value = newFood
  }

  function checkCollision(head: { x: number; y: number }): boolean {
    if (head.x < 0 || head.x >= gridSize.value || head.y < 0 || head.y >= gridSize.value) {
      return true
    }
    return snake.value.some(s => s.x === head.x && s.y === head.y)
  }

  function setNextDirection(dir: { x: number; y: number }): void {
    if (direction.value.x === 0 && dir.x !== 0) {
      nextDirection.value = { x: dir.x, y: 0 }
    } else if (direction.value.y === 0 && dir.y !== 0) {
      nextDirection.value = { x: 0, y: dir.y }
    }
  }

  function setSpeed(speedValue: number): void {
    speed.value = Math.max(GAME_CONSTANTS.MIN_SPEED, Math.min(GAME_CONSTANTS.MAX_SPEED, speedValue))
  }

  function setGridSize(size: number): void {
    gridSize.value = size
    if (status.value === 'idle') {
      snake.value = [{ x: Math.floor(size / 2), y: Math.floor(size / 2) }]
    }
  }

  return {
    status,
    score,
    highScore,
    speed,
    gridSize,
    snake,
    food,
    goldenApple,
    direction,
    nextDirection,
    lives,
    level,
    foodEaten,
    progress,
    isPlaying,
    isPaused,
    isGameOver,
    isIdle,
    formattedTime,
    startGame,
    pauseGame,
    gameOver,
    resetGame,
    moveSnake,
    spawnFood,
    setNextDirection,
    setSpeed,
    setGridSize,
  }
})
