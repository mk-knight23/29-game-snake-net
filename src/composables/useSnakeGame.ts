import { onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'
import { useStatsStore } from '@/stores/stats'
import { useAudio } from './useAudio'

export function useSnakeGame() {
  const gameStore = useGameStore()
  const settingsStore = useSettingsStore()
  const statsStore = useStatsStore()
  const audio = useAudio()
  
  let gameInterval: ReturnType<typeof setInterval> | null = null
  let animationFrameId: number | null = null

  function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const gridSize = gameStore.gridSize
    const cellSize = canvas.width / gridSize

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (settingsStore.settings.showGrid) {
      drawGrid(ctx, canvas, gridSize)
    }

    drawFood(ctx, cellSize)
    drawSnake(ctx, cellSize)
  }

  function drawGrid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, gridSize: number): void {
    const cellSize = canvas.width / gridSize
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1

    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(canvas.width, i * cellSize)
      ctx.stroke()
    }
  }

  function drawSnake(ctx: CanvasRenderingContext2D, cellSize: number): void {
    gameStore.snake.forEach((segment, index) => {
      const isHead = index === 0
      const brightness = 1 - (index / gameStore.snake.length) * 0.5

      ctx.fillStyle = `rgba(0, 243, 255, ${brightness})`
      ctx.shadowColor = '#00f3ff'
      ctx.shadowBlur = isHead ? 15 : 5

      const x = segment.x * cellSize + 1
      const y = segment.y * cellSize + 1
      const size = cellSize - 2

      ctx.beginPath()
      ctx.roundRect(x, y, size, size, 4)
      ctx.fill()

      if (isHead) {
        ctx.fillStyle = '#000'
        ctx.shadowBlur = 0

        const eyeSize = size * 0.15
        const eyeOffset = size * 0.25

        ctx.beginPath()
        ctx.arc(x + eyeOffset, y + eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.arc(x + size - eyeOffset, y + eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.fill()
      }
    })
  }

  function drawFood(ctx: CanvasRenderingContext2D, cellSize: number): void {
    const food = gameStore.food
    const x = food.x * cellSize + cellSize / 2
    const y = food.y * cellSize + cellSize / 2
    const radius = cellSize / 2 - 2

    ctx.fillStyle = '#ff00ff'
    ctx.shadowColor = '#ff00ff'
    ctx.shadowBlur = 20

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.shadowBlur = 0
  }

  function startGameLoop(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    audio.playStart()
    
    if (gameInterval) {
      clearInterval(gameInterval)
    }

    gameInterval = setInterval(() => {
      if (gameStore.isPlaying) {
        const result = gameStore.moveSnake()

        if (result.collided) {
          audio.playEliminate()
          if (gameStore.lives <= 0) {
            stopGameLoop()
            statsStore.recordGame(gameStore.score, gameStore.foodEaten, gameStore.snake.length)
            audio.playGameOver()
          }
        } else if (result.ateFood) {
          audio.playEat()
        }

        draw(ctx, canvas)
      }
    }, gameStore.speed)
  }

  function stopGameLoop(): void {
    if (gameInterval) {
      clearInterval(gameInterval)
      gameInterval = null
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  function resetGame(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    stopGameLoop()
    gameStore.resetGame()
    draw(ctx, canvas)
  }

  function handleResize(canvas: HTMLCanvasElement): void {
    const container = canvas.parentElement
    if (container) {
      const size = Math.min(container.clientWidth - 32, container.clientHeight - 32, 500)
      canvas.width = size
      canvas.height = size
    }
  }

  onUnmounted(() => {
    stopGameLoop()
  })

  return {
    draw,
    startGameLoop,
    stopGameLoop,
    resetGame,
    handleResize,
  }
}
