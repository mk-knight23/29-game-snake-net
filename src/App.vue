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
  Moon,
  Sun,
  HelpCircle,
  Heart,
  Zap,
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
  return 'bg-neon-bg'
})

const themeIcon = computed(() => {
  const theme = settingsStore.settings.theme
  if (theme === 'dark') return Moon
  if (theme === 'light') return Sun
  return Sun
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

function toggleTheme(): void {
  const themes: Array<'dark' | 'light' | 'system'> = ['dark', 'light', 'system']
  const currentIndex = themes.indexOf(settingsStore.settings.theme)
  const nextIndex = (currentIndex + 1) % themes.length
  settingsStore.setTheme(themes[nextIndex])
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
    class="h-screen w-screen flex items-center justify-center p-4 lg:p-8 transition-colors duration-500"
    :class="backgroundClass"
    role="application"
    aria-label="Neon Snake Game"
  >
    <div class="max-w-6xl w-full grid lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
      
      <!-- Left Info Panel -->
      <div class="lg:col-span-4 space-y-7 lg:space-y-9">
        <div class="space-y-3">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
            <span class="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
            <span class="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-neon-cyan">
              System Online
            </span>
          </div>
          <h1 class="text-4xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-none neon-text-cyan italic">
            Neon <br /> Snake.
          </h1>
          <p class="text-slate-500 text-sm lg:text-base font-medium leading-relaxed italic max-w-xs">
            A professional arcade reconstruction optimized for sub-second input response.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3 lg:gap-6 text-white">
          <div class="glass-panel p-4 lg:p-6 space-y-1">
            <p class="text-[8px] lg:text-[10px] font-black uppercase text-slate-500 tracking-widest">Score</p>
            <p class="text-xl lg:text-2xl font-black neon-text-magenta">{{ gameStore.score }}</p>
          </div>
          <div class="glass-panel p-4 lg:p-6 space-y-1">
            <p class="text-[8px] lg:text-[10px] font-black uppercase text-slate-500 tracking-widest">Best</p>
            <p class="text-xl lg:text-2xl font-black text-white">{{ gameStore.highScore }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 lg:gap-4 text-xs">
          <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
            <Heart :size="14" class="text-red-500" />
            <span class="font-mono text-white">{{ gameStore.lives }}</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
            <Zap :size="14" class="text-amber-500" />
            <span class="font-mono text-white">Lv.{{ gameStore.level }}</span>
          </div>
          <div v-if="settingsStore.settings.showTimer" class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
            <Activity :size="14" class="text-neon-cyan" />
            <span class="font-mono text-white">{{ gameStore.formattedTime }}</span>
          </div>
        </div>
      </div>

      <!-- Center Game Cabinet -->
      <div class="lg:col-span-5 flex justify-center">
        <div class="relative p-3 lg:p-4 glass-panel neon-border transition-transform" :style="shakeStyle">
          <canvas
            ref="canvasRef"
            width="400"
            height="400"
            class="rounded-xl bg-black/40"
            role="img"
            aria-label="Snake game canvas"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          ></canvas>
          
          <!-- Start Overlay -->
          <div 
            v-if="gameStore.isIdle" 
            class="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl"
          >
            <button 
              @click="handleStart"
              class="group flex flex-col items-center space-y-3 transition-all hover:scale-110 pointer-events-auto"
              aria-label="Start game"
            >
              <div class="w-16 lg:w-20 h-16 lg:h-20 bg-neon-cyan rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,243,255,0.5)]">
                <Play fill="currentColor" :size="28" class="ml-1 lg:ml-2" />
              </div>
              <span class="font-game text-[8px] lg:text-[10px] uppercase text-white tracking-widest">Initialize</span>
            </button>
          </div>

          <!-- Pause Overlay -->
          <div 
            v-if="gameStore.isPaused" 
            class="absolute inset-0 flex items-center justify-center bg-amber-950/60 backdrop-blur-md rounded-2xl"
          >
            <div class="text-center space-y-6 p-8 pointer-events-auto">
              <h2 class="text-3xl font-display font-black text-amber-500 uppercase italic">Paused</h2>
              <button 
                @click="handlePause"
                class="px-8 py-3 bg-white text-black rounded-xl font-black uppercase tracking-widest text-xs hover:bg-neon-cyan transition-all"
              >
                Resume
              </button>
            </div>
          </div>

          <!-- Game Over Overlay -->
          <div 
            v-if="gameStore.isGameOver" 
            class="absolute inset-0 flex items-center justify-center bg-red-950/60 backdrop-blur-md rounded-2xl"
          >
            <div class="text-center space-y-4 lg:space-y-6 p-6 lg:p-10 pointer-events-auto">
              <div class="space-y-2">
                <h2 class="text-3xl lg:text-4xl font-display font-black text-red-500 uppercase italic">Terminated</h2>
                <p class="text-[10px] lg:text-xs font-black uppercase text-white tracking-widest">
                  Final Score: {{ gameStore.score }}
                </p>
              </div>
              
              <div class="grid grid-cols-2 gap-3 lg:gap-4">
                <div class="glass-panel p-3 lg:p-4">
                  <p class="text-[8px] uppercase tracking-widest text-slate-500">Best</p>
                  <p class="text-lg lg:text-xl font-game text-white">{{ gameStore.highScore }}</p>
                </div>
                <div class="glass-panel p-3 lg:p-4">
                  <p class="text-[8px] uppercase tracking-widest text-slate-500">Level</p>
                  <p class="text-lg lg:text-xl font-game text-neon-cyan">{{ gameStore.level }}</p>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <button
                  @click="handleStart"
                  class="w-full bg-white text-black py-3 lg:py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-neon-cyan transition-all"
                >
                  Once More
                </button>
                <button
                  @click="handleReset"
                  class="w-full bg-transparent border border-white/20 text-white py-3 lg:py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
                >
                  Back to Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Controls Panel -->
      <aside class="lg:col-span-3 space-y-4 lg:space-y-6">
        <div class="glass-panel p-4 lg:p-6 space-y-4 lg:space-y-6">
          <h3 class="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-slate-500 flex items-center">
            <Settings class="mr-2" :size="14" /> Settings
          </h3>
          
          <div class="grid grid-cols-3 gap-2">
            <button 
              v-for="size in [15, 20, 25]" 
              :key="size"
              @click="gameStore.setGridSize(size)"
              class="py-2 rounded-lg text-xs font-black border transition-all"
              :class="gameStore.gridSize === size 
                ? 'bg-neon-cyan text-black border-neon-cyan' 
                : 'text-slate-500 border-white/10 hover:bg-white/5'"
            >
              {{ size }}x{{ size }}
            </button>
          </div>

          <div class="space-y-3">
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="preset in speedPresets"
                :key="preset.name"
                @click="gameStore.setSpeed(preset.value)"
                class="py-2 rounded-lg text-[10px] font-black border transition-all"
                :class="gameStore.speed === preset.value
                  ? 'bg-neon-cyan text-black border-neon-cyan'
                  : 'text-slate-500 border-white/10 hover:bg-white/5'"
              >
                {{ preset.name }}
              </button>
            </div>
            <div class="space-y-2">
              <p class="text-[10px] lg:text-[12px] font-bold text-slate-400 uppercase tracking-tighter flex justify-between">
                <span>Custom</span>
                <span class="text-neon-cyan">{{ gameStore.speed }}ms</span>
              </p>
              <input
                type="range"
                min="40"
                max="200"
                :value="gameStore.speed"
                @input="gameStore.setSpeed(Number(($event.target as HTMLInputElement).value))"
                class="w-full h-1 bg-white/10 rounded-full appearance-none accent-neon-cyan cursor-pointer"
              />
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button 
              @click="toggleTheme"
              class="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              :aria-label="`Toggle theme. Current: ${settingsStore.settings.theme}`"
            >
              <component :is="themeIcon" :size="16" class="text-white" />
            </button>
            
            <button 
              @click="showSettings = true"
              class="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Open settings"
            >
              <Settings :size="16" class="text-white" />
            </button>
            
            <button 
              @click="showHelp = true"
              class="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Open help"
            >
              <HelpCircle :size="16" class="text-white" />
            </button>
          </div>
        </div>

        <div class="hidden lg:flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em] text-slate-700 italic px-2">
          <span>© 2026 Made by MK — Built by Musharraf Kazi</span>
          <a
            href="https://github.com/mk-knight23/32-Snake-Game-Python-Web"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <Github :size="12" />
            <span>GitHub</span>
          </a>
        </div>
      </aside>

    </div>

    <SettingsPanel v-model:show="showSettings" v-model:showHelp="showHelp" />
  </div>
</template>

<style scoped>
@reference "./style.css";
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-game {
  font-family: 'Press Start 2P', cursive;
}

canvas {
  image-rendering: pixelated;
}

.neon-border {
  @apply border-2 border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.5)];
}

.neon-text-cyan {
  @apply text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)];
}

.neon-text-magenta {
  @apply text-neon-magenta drop-shadow-[0_0_8px_rgba(255,0,255,0.8)];
}

input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 rounded-full bg-neon-cyan cursor-pointer;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

input[type="range"]::-moz-range-thumb {
  @apply w-4 h-4 rounded-full bg-neon-cyan cursor-pointer;
  border: none;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

.glass-panel {
  @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl;
}
</style>
