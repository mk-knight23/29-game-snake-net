import { onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'
import { useStatsStore } from '@/stores/stats'
import { useAudio } from './useAudio'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

export function useSnakeGame() {
  const gameStore = useGameStore()
  const settingsStore = useSettingsStore()
  const statsStore = useStatsStore()
  const audio = useAudio()

  let gameInterval: ReturnType<typeof setInterval> | null = null
  let animationFrameId: number | null = null
  let particles: Particle[] = []

  function spawnParticles(x: number, y: number, color: string): void {
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8
      const speed = 2 + Math.random() * 2
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        color,
      })
    }
  }

  function updateParticles(): void {
    particles = particles.filter(p => {
      p.x += p.vx
      p.y += p.vy
      p.life -= 0.05
      return p.life > 0
    })
  }

  function drawParticles(ctx: CanvasRenderingContext2D): void {
    particles.forEach(p => {
      const alpha = p.life / p.maxLife
      ctx.fillStyle = p.color
      ctx.globalAlpha = alpha
      ctx.shadowColor = p.color
      ctx.shadowBlur = 10

      ctx.beginPath()
      ctx.arc(p.x, p.y, 3 * alpha, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    })
  }

  function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const gridSize = gameStore.gridSize
    const cellSize = canvas.width / gridSize

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (settingsStore.settings.showGrid) {
      drawGrid(ctx, canvas, gridSize)
    }

    drawParticles(ctx)
    drawFood(ctx, cellSize)
    drawGoldenApple(ctx, cellSize)
    drawSnake(ctx, cellSize)

    // Update particles for next frame
    updateParticles()
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
  
  // V2: Draw golden apple with pulsing effect
  function drawGoldenApple(ctx: CanvasRenderingContext2D, cellSize: number): void {
    const apple = gameStore.goldenApple
    if (!apple?.active) return
    
    const x = apple.x * cellSize + cellSize / 2
    const y = apple.y * cellSize + cellSize / 2
    const baseRadius = cellSize / 2 - 2
    // Pulsing effect
    const pulse = 1 + Math.sin(Date.now() / 100) * 0.1
    const radius = baseRadius * pulse
    
    ctx.fillStyle = '#fbbf24'
    ctx.shadowColor = '#fbbf24'
    ctx.shadowBlur = 25
    
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    
    // Inner highlight
    ctx.fillStyle = '#f59e0b'
    ctx.beginPath()
    ctx.arc(x - 2, y - 2, radius * 0.5, 0, Math.PI * 2)
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
          // Spawn particles at food position
          const cellSize = canvas.width / gameStore.gridSize
          const food = gameStore.food
          const x = food.x * cellSize + cellSize / 2
          const y = food.y * cellSize + cellSize / 2
          spawnParticles(x, y, '#ff00ff')
        }
        
        // V2: Check if golden apple was eaten (score increased by 3x amount)
        if (gameStore.goldenApple?.active) {
          const head = gameStore.snake[0]
          if (head.x === gameStore.goldenApple.x && head.y === gameStore.goldenApple.y) {
            audio.playEat()
            const cellSize = canvas.width / gameStore.gridSize
            const x = gameStore.goldenApple.x * cellSize + cellSize / 2
            const y = gameStore.goldenApple.y * cellSize + cellSize / 2
            spawnParticles(x, y, '#fbbf24')
          }
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
    particles = []
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
