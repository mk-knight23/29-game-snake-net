<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'
import { useSnakeGame } from '@/composables/useSnakeGame'
import { useKeyboardControls } from '@/composables/useKeyboardControls'
import { useAudio } from '@/composables/useAudio'
import { 
  Play, 
  Settings, 
  Github,
  Activity,
} from 'lucide-vue-next'
import SettingsPanel from '@/components/ui/SettingsPanel.vue'

const gameStore = useGameStore()
const settingsStore = useSettingsStore()
const snakeGame = useSnakeGame()
const audio = useAudio()
useKeyboardControls()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

const isMobile = ref(false)
const showSettings = ref(false)
const showHelp = ref(false)
const touchStartX = ref(0)
const touchStartY = ref(0)
const shakeIntensity = ref(0)

const backgroundClass = computed(() => {
  if (gameStore.isGameOver) return 'bg-red-950/20'
  if (gameStore.isPaused) return 'bg-amber-950/20'
  return 'bg-snake-void'
})


const speedPresets = [
  { name: 'Slow', value: 150 },
  { name: 'Normal', value: 100 },
  { name: 'Fast', value: 60 },
  { name: 'Insane', value: 40 },
]

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  settingsStore.initializeTheme()
  audio.initializeSounds()
  
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    snakeGame.handleResize(canvasRef.value)
    snakeGame.draw(ctx!, canvasRef.value)
  }
  
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
    if (canvasRef.value) {
      snakeGame.handleResize(canvasRef.value)
      if (gameStore.isIdle || gameStore.isGameOver) {
        snakeGame.draw(ctx!, canvasRef.value)
      }
    }
  })
})

watch(() => [gameStore.isPlaying, gameStore.gridSize], () => {
  if (ctx && canvasRef.value && (gameStore.isIdle || gameStore.isGameOver)) {
    snakeGame.draw(ctx, canvasRef.value)
  }
})

watch(() => gameStore.isPlaying, (isPlaying) => {
  if (!ctx || !canvasRef.value) return

  if (isPlaying) {
    snakeGame.startGameLoop(ctx, canvasRef.value)
  } else {
    snakeGame.stopGameLoop()
  }
})

watch(() => gameStore.isGameOver, (isGameOver) => {
  if (isGameOver) {
    // Trigger screen shake
    shakeIntensity.value = 10
    const shake = setInterval(() => {
      shakeIntensity.value *= 0.9
      if (shakeIntensity.value < 0.5) {
        clearInterval(shake)
        shakeIntensity.value = 0
      }
    }, 50)
  }
})

const shakeStyle = computed(() => {
  if (shakeIntensity.value <= 0) return {}
  const x = (Math.random() - 0.5) * shakeIntensity.value * 2
  const y = (Math.random() - 0.5) * shakeIntensity.value * 2
  return {
    transform: `translate(${x}px, ${y}px)`,
  }
})

function handleStart(): void {
  gameStore.startGame()
}

function handlePause(): void {
  gameStore.pauseGame()
}

function handleReset(): void {
  if (ctx && canvasRef.value) {
    snakeGame.resetGame(ctx, canvasRef.value)
  }
}


function handleTouchStart(event: TouchEvent): void {
  touchStartX.value = event.touches[0].clientX
  touchStartY.value = event.touches[0].clientY
}

function handleTouchEnd(event: TouchEvent): void {
  if (!gameStore.isPlaying) return

  const touchEndX = event.changedTouches[0].clientX
  const touchEndY = event.changedTouches[0].clientY

  const deltaX = touchEndX - touchStartX.value
  const deltaY = touchEndY - touchStartY.value

  const minSwipeDistance = 30

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        gameStore.setNextDirection({ x: 1, y: 0 })
      } else {
        gameStore.setNextDirection({ x: -1, y: 0 })
      }
    }
  } else {
    // Vertical swipe
    if (Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        gameStore.setNextDirection({ x: 0, y: 1 })
      } else {
        gameStore.setNextDirection({ x: 0, y: -1 })
      }
    }
  }
}
</script>

<template>
  <div 
    class="h-screen w-screen flex flex-col items-center justify-center p-4 lg:p-8 transition-colors duration-500 relative"
    :class="backgroundClass"
  >
    <!-- CRT Overlay -->
    <div class="crt-overlay"></div>
    
    <div class="max-w-6xl w-full grid lg:grid-cols-12 gap-8 items-start relative z-10">
      
      <!-- Left Panel: Evolution Matrix -->
      <aside class="lg:col-span-3 space-y-6 hidden lg:block">
        <div class="glass-panel p-6 border-l-4 border-snake-violet">
          <h2 class="text-[14px] font-game text-snake-rose mb-6 text-glow">EVOLUTION_LOG</h2>
          <div class="space-y-4 font-mono text-sm">
            <div v-for="(log, index) in gameStore.previousRuns" :key="index" class="flex justify-between border-b border-white/5 pb-2">
              <span class="text-white/40">RUN_{{ index + 1 }}</span>
              <span class="text-snake-white">{{ log.score }} pts</span>
            </div>
            <div v-if="gameStore.previousRuns.length === 0" class="text-white/20 italic">
              NO_VITAL_DATA_FOUND...
            </div>
          </div>
        </div>
      </aside>

      <!-- Center Member: Game Cabinet -->
      <main class="lg:col-span-6 flex flex-col items-center space-y-8">
        <div class="text-center space-y-4">
          <div class="inline-flex items-center space-x-3 px-4 py-1 bg-snake-violet/10 border border-snake-violet/30">
            <span class="w-2 h-2 bg-snake-rose animate-glitch"></span>
            <span class="text-[10px] font-game text-snake-violet tracking-widest uppercase">
              TERMINAL_ACTIVE
            </span>
          </div>
          <h1 class="text-5xl lg:text-7xl font-game text-glow text-snake-white tracking-tighter uppercase leading-none">
            SNAKE_<span class="text-snake-rose">NET</span>
          </h1>
        </div>

        <div class="relative p-4 lg:p-6 glass-panel border-2 border-snake-violet/50 shadow-neon-violet transition-transform" :style="shakeStyle">
          <canvas
            ref="canvasRef"
            width="400"
            height="400"
            class="bg-black/80"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          ></canvas>
          
          <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-snake-violet/5 opacity-50"></div>
          
          <!-- Start Overlay -->
          <div 
            v-if="gameStore.isIdle" 
            class="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <button 
              @click="handleStart"
              class="group flex flex-col items-center space-y-6 transition-all hover:scale-105 pointer-events-auto"
            >
              <div class="w-20 h-20 bg-snake-rose flex items-center justify-center text-white shadow-neon-rose text-glow">
                <Play fill="currentColor" :size="32" class="ml-1" />
              </div>
              <span class="font-game text-[10px] uppercase text-white tracking-[0.3em] animate-pulse">BOOT_SEQUENCE</span>
            </button>
          </div>

          <!-- Pause Overlay -->
          <div 
            v-if="gameStore.isPaused" 
            class="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <div class="text-center space-y-8 p-8 pointer-events-auto">
              <h2 class="text-3xl font-game text-snake-rose uppercase italic text-glow">INTERRUPTED</h2>
              <button 
                @click="handlePause"
                class="btn-snake-primary w-full"
              >
                RESUME_STREAM
              </button>
            </div>
          </div>

          <!-- Game Over Overlay -->
          <div 
            v-if="gameStore.isGameOver" 
            class="absolute inset-0 flex items-center justify-center bg-snake-rose/10 backdrop-blur-md border-t-2 border-snake-rose"
          >
            <div class="text-center space-y-8 p-10 pointer-events-auto">
              <div class="space-y-4">
                <h2 class="text-3xl lg:text-4xl font-game text-white uppercase italic text-glow">TERMINATED</h2>
                <div class="inline-block px-3 py-1 bg-snake-rose text-[10px] font-game text-white tracking-[0.5em] uppercase">
                  Data Loss Imminent
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-px bg-white/10">
                <div class="glass-panel p-6 bg-black/40">
                  <p class="text-[10px] font-game uppercase tracking-widest text-white/30 mb-2">SCORE</p>
                  <p class="text-2xl font-game text-white">{{ gameStore.score }}</p>
                </div>
                <div class="glass-panel p-6 bg-black/40">
                  <p class="text-[10px] font-game uppercase tracking-widest text-white/30 mb-2">LVL</p>
                  <p class="text-2xl font-game text-snake-violet">{{ gameStore.level }}</p>
                </div>
              </div>

              <div class="flex flex-col gap-4">
                <button
                  @click="handleStart"
                  class="btn-snake-primary"
                >
                  REBOOT_CORE
                </button>
                <button
                  @click="handleReset"
                  class="text-[10px] font-game text-white/40 hover:text-white transition-colors"
                >
                  [RETURN_TO_BIOS]
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Global Stats HUD -->
        <div class="w-full flex justify-between gap-4">
          <div class="glass-panel flex-1 p-6 border-b-2 border-snake-rose">
            <p class="text-[10px] font-game uppercase text-white/40 tracking-widest mb-2 text-glow">REAL_TIME_SCORE</p>
            <p class="text-4xl font-mono text-white tracking-widest">{{ gameStore.score.toString().padStart(6, '0') }}</p>
          </div>
          <div class="glass-panel flex-1 p-6 border-b-2 border-snake-violet">
            <p class="text-[10px] font-game uppercase text-white/40 tracking-widest mb-2 text-glow">SESSION_PEAK</p>
            <p class="text-4xl font-mono text-white tracking-widest">{{ gameStore.highScore.toString().padStart(6, '0') }}</p>
          </div>
        </div>
      </main>

      <!-- Right Panel: Terminal Config -->
      <aside class="lg:col-span-3 space-y-6">
        <div class="glass-panel p-6 border-r-4 border-snake-rose">
          <h3 class="text-[12px] font-game text-snake-rose mb-6 flex items-center text-glow">
            <Settings class="mr-3" :size="16" /> TERMINAL_V3.0
          </h3>
          
          <div class="space-y-8">
            <div class="space-y-3">
              <p class="text-[10px] font-game text-white/40 uppercase">Grid_Matrix</p>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  v-for="size in [15, 20, 25]" 
                  :key="size"
                  @click="gameStore.setGridSize(size)"
                  class="py-3 font-game text-[10px] border transition-all"
                  :class="gameStore.gridSize === size 
                    ? 'bg-snake-violet text-white border-snake-violet shadow-neon-violet' 
                    : 'text-white/40 border-white/10 hover:bg-white/5'"
                >
                  {{ size }}x
                </button>
              </div>
            </div>

            <div class="space-y-4">
              <p class="text-[10px] font-game text-white/40 uppercase">Clock_Speed</p>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="preset in speedPresets"
                  :key="preset.name"
                  @click="gameStore.setSpeed(preset.value)"
                  class="py-3 font-game text-[8px] border transition-all"
                  :class="gameStore.speed === preset.value
                    ? 'bg-snake-rose text-white border-snake-rose shadow-neon-rose'
                    : 'text-white/40 border-white/10 hover:bg-white/5'"
                >
                  {{ preset.name }}
                </button>
              </div>
            </div>

            <div class="flex flex-col gap-2 pt-4">
              <button 
                @click="showSettings = true"
                class="btn-snake-secondary w-full"
              >
                HARDWARE_CFG
              </button>
              <button 
                @click="showHelp = true"
                class="text-[10px] font-game text-white/20 hover:text-white py-4 transition-colors"
              >
                [PROTOCOL_HELP]
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center text-[10px] font-mono text-white/10 uppercase tracking-widest px-2">
          <span>© 2026 SNAKE_NET // MK</span>
          <div class="flex gap-4">
            <Github :size="12" />
            <Activity :size="12" />
          </div>
        </div>
      </aside>

    </div>

    <SettingsPanel v-model:show="showSettings" v-model:showHelp="showHelp" />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@reference "./style.css";

.font-game {
  font-family: 'Press Start 2P', cursive;
}

canvas {
  image-rendering: pixelated;
}

input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-snake-rose cursor-pointer shadow-neon-rose;
}

input[type="range"]::-moz-range-thumb {
  @apply w-4 h-4 bg-snake-rose cursor-pointer border-none shadow-neon-rose;
}
</style>
