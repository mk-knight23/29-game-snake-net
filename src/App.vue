<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSnakeStore } from './stores/snake'
import { 
  Play, 
  Trophy, 
  Settings, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Github,
  Activity
} from 'lucide-vue-next'

const store = useSnakeStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

const snake = ref([{ x: 10, y: 10 }])
const food = ref({ x: 15, y: 15 })
const direction = ref({ x: 0, y: -1 })
const nextDirection = ref({ x: 0, y: -1 })
let gameInterval: any = null

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    draw()
  }
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
  if (gameInterval) clearInterval(gameInterval)
})

function handleKey(e: KeyboardEvent) {
  if (store.status !== 'playing') return
  
  switch(e.key) {
    case 'ArrowUp': if (direction.value.y === 0) nextDirection.value = { x: 0, y: -1 }; break
    case 'ArrowDown': if (direction.value.y === 0) nextDirection.value = { x: 0, y: 1 }; break
    case 'ArrowLeft': if (direction.value.x === 0) nextDirection.value = { x: -1, y: 0 }; break
    case 'ArrowRight': if (direction.value.x === 0) nextDirection.value = { x: 1, y: 0 }; break
  }
}

function startGame() {
  store.setStatus('playing')
  store.score = 0
  snake.value = [{ x: 10, y: 10 }]
  nextDirection.value = { x: 1, y: 0 }
  spawnFood()
  if (gameInterval) clearInterval(gameInterval)
  gameInterval = setInterval(gameLoop, store.speed)
}

function gameLoop() {
  direction.value = nextDirection.value
  const head = { x: snake.value[0].x + direction.value.x, y: snake.value[0].y + direction.value.y }

  // Collision checks
  if (head.x < 0 || head.x >= store.gridSize || head.y < 0 || head.y >= store.gridSize || 
      snake.value.some(s => s.x === head.x && s.y === head.y)) {
    gameOver()
    return
  }

  snake.value.unshift(head)

  if (head.x === food.value.x && head.y === food.value.y) {
    store.setScore(store.score + 10)
    spawnFood()
  } else {
    snake.value.pop()
  }
  draw()
}

function spawnFood() {
  food.value = {
    x: Math.floor(Math.random() * store.gridSize),
    y: Math.floor(Math.random() * store.gridSize)
  }
}

function draw() {
  if (!ctx || !canvasRef.value) return
  const size = canvasRef.value.width / store.gridSize

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // Draw Snake
  ctx.shadowBlur = 15
  ctx.shadowColor = '#00f3ff'
  ctx.fillStyle = '#00f3ff'
  snake.value.forEach((s) => {
    ctx!.fillRect(s.x * size + 1, s.y * size + 1, size - 2, size - 2)
  })

  // Draw Food
  ctx.shadowColor = '#ff00ff'
  ctx.fillStyle = '#ff00ff'
  ctx!.fillRect(food.value.x * size + 1, food.value.y * size + 1, size - 2, size - 2)
}

function gameOver() {
  clearInterval(gameInterval)
  store.setStatus('gameover')
}
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center p-6 lg:p-12 crt bg-neon-bg">
    
    <div class="max-w-6xl w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
       
       <!-- Left Info Panel -->
       <div class="lg:col-span-4 space-y-12">
          <div class="space-y-4">
             <div class="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
                <span class="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse"></span>
                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-neon-cyan">System Online</span>
             </div>
             <h1 class="text-6xl font-display font-black tracking-tighter uppercase leading-none neon-text-cyan italic">
                Neon <br /> Snake.
             </h1>
             <p class="text-slate-500 font-medium text-lg leading-relaxed italic max-w-xs">A professional arcade reconstruction optimized for sub-second input response.</p>
          </div>

          <div class="grid grid-cols-2 gap-6 text-white">
             <div class="glass-panel p-6 space-y-2">
                <p class="text-[8px] font-black uppercase text-slate-500 tracking-widest">Multiplier</p>
                <p class="text-2xl font-black neon-text-magenta">{{ store.score }}</p>
             </div>
             <div class="glass-panel p-6 space-y-2">
                <p class="text-[8px] font-black uppercase text-slate-500 tracking-widest">High Score</p>
                <p class="text-2xl font-black text-white">{{ store.highScore }}</p>
             </div>
          </div>
       </div>

       <!-- Center Game Cabinet -->
       <div class="lg:col-span-5 flex justify-center">
          <div class="relative p-4 glass-panel neon-border">
             <canvas ref="canvasRef" width="400" height="400" class="bg-black/40 rounded-xl"></canvas>
             
             <!-- Overlays -->
             <div v-if="store.status === 'idle'" class="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
                <button @click="startGame" class="group flex flex-col items-center space-y-4 transition-all hover:scale-110 pointer-events-auto">
                   <div class="w-20 h-20 bg-neon-cyan rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,243,255,0.5)]">
                      <Play fill="currentColor" :size="32" class="ml-1" />
                   </div>
                   <span class="font-game text-[10px] uppercase text-white tracking-widest">Initiate Grid</span>
                </button>
             </div>

             <div v-if="store.status === 'gameover'" class="absolute inset-0 flex items-center justify-center bg-red-950/60 backdrop-blur-md rounded-2xl">
                <div class="text-center space-y-8 p-10 pointer-events-auto">
                   <div class="space-y-2">
                      <h2 class="text-4xl font-display font-black text-red-500 uppercase italic">Terminated</h2>
                      <p class="text-[10px] font-black uppercase text-white tracking-widest">Collision at {{ store.score }}</p>
                   </div>
                   <button @click="startGame" class="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-neon-cyan transition-all active:scale-95">
                      Retry Sequence
                   </button>
                </div>
             </div>
          </div>
       </div>

       <!-- Right Controller / Settings -->
       <aside class="lg:col-span-3 space-y-12">
          <div class="glass-panel p-8 space-y-8">
             <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center"><Settings class="mr-2" :size="14" /> Modulators</h3>
             <div class="space-y-6">
                <div class="space-y-3">
                   <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex justify-between">
                      <span>Reflex Delta</span>
                      <span class="text-neon-cyan">{{ store.speed }}ms</span>
                   </p>
                   <input type="range" min="50" max="200" v-model="store.speed" class="w-full h-1 bg-white/10 rounded-full appearance-none accent-neon-cyan cursor-pointer">
                </div>
                <div class="space-y-3">
                   <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Grid Size</p>
                   <div class="grid grid-cols-3 gap-2">
                      <button v-for="s in [15, 20, 25]" :key="s" 
                              @click="store.gridSize = s"
                              class="py-2 rounded-lg text-[10px] font-black border border-white/10 transition-all"
                              :class="store.gridSize === s ? 'bg-white text-black' : 'text-slate-500 hover:bg-white/5'">
                         {{ s }}
                      </button>
                   </div>
                </div>
             </div>
          </div>

          <div class="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.5em] text-slate-700 italic px-4">
             <div class="flex items-center space-x-3">
                <Github :size="12" />
                <span class="hover:text-white cursor-pointer">Source</span>
             </div>
             <span>SQ-SNK-2026</span>
          </div>
       </aside>

    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-game {
  font-family: 'Press Start 2P', cursive;
}
canvas {
  image-rendering: pixelated;
}
</style>
