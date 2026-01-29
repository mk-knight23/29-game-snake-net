<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useStatsStore } from '@/stores/stats'
import {
  X,
  Volume2,
  Music,
  Grid3X3,
  Clock,
  Trophy,
  BarChart3,
  RotateCcw,
} from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  showHelp: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'update:showHelp', value: boolean): void
}>()

const settingsStore = useSettingsStore()
const statsStore = useStatsStore()

const showSettings = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value),
})

const showHelp = computed({
  get: () => props.showHelp,
  set: (value) => emit('update:showHelp', value),
})

function closeSettings(): void {
  showSettings.value = false
}

function resetStats(): void {
  if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
    statsStore.resetStats()
  }
}

const winRate = computed(() => statsStore.getWinRate().toFixed(1))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="showSettings" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeSettings"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div class="glass-panel w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-white/10">
            <h2 id="settings-title" class="text-xl font-bold text-white uppercase tracking-wider">
              Settings
            </h2>
            <button 
              @click="closeSettings"
              class="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close settings"
            >
              <X :size="20" class="text-white" />
            </button>
          </div>

          <div class="p-6 space-y-6">
            <section aria-labelledby="sound-heading">
              <h3 id="sound-heading" class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Audio
              </h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Volume2 :size="18" class="text-slate-400" />
                    <span class="text-white">Sound Effects</span>
                  </div>
                  <button 
                    @click="settingsStore.toggleSound()"
                    class="toggle-squid"
                    :class="settingsStore.settings.soundEnabled ? 'toggle-squid-checked' : 'bg-slate-600'"
                    role="switch"
                    :aria-checked="settingsStore.settings.soundEnabled"
                  >
                    <span 
                      class="toggle-squid-thumb"
                      :class="settingsStore.settings.soundEnabled ? 'toggle-squid-thumb-checked' : ''"
                    ></span>
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Music :size="18" class="text-slate-400" />
                    <span class="text-white">Background Music</span>
                  </div>
                  <button 
                    @click="settingsStore.toggleMusic()"
                    class="toggle-squid"
                    :class="settingsStore.settings.musicEnabled ? 'toggle-squid-checked' : 'bg-slate-600'"
                    role="switch"
                    :aria-checked="settingsStore.settings.musicEnabled"
                  >
                    <span 
                      class="toggle-squid-thumb"
                      :class="settingsStore.settings.musicEnabled ? 'toggle-squid-thumb-checked' : ''"
                    ></span>
                  </button>
                </div>
              </div>
            </section>

            <section aria-labelledby="game-heading">
              <h3 id="game-heading" class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Gameplay
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-white mb-2">Difficulty</label>
                  <div class="flex gap-2">
                    <button 
                      v-for="diff in ['easy', 'normal', 'hard']" 
                      :key="diff"
                      @click="settingsStore.setDifficulty(diff as 'easy' | 'normal' | 'hard')"
                      class="flex-1 py-2 px-4 rounded-lg text-sm font-medium uppercase tracking-wide transition-all"
                      :class="settingsStore.settings.difficulty === diff 
                        ? 'bg-neon-magenta text-white' 
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'"
                    >
                      {{ diff }}
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Grid3X3 :size="18" class="text-slate-400" />
                    <span class="text-white">Show Grid</span>
                  </div>
                  <button 
                    @click="settingsStore.toggleGrid()"
                    class="toggle-squid"
                    :class="settingsStore.settings.showGrid ? 'toggle-squid-checked' : 'bg-slate-600'"
                    role="switch"
                    :aria-checked="settingsStore.settings.showGrid"
                  >
                    <span 
                      class="toggle-squid-thumb"
                      :class="settingsStore.settings.showGrid ? 'toggle-squid-thumb-checked' : ''"
                    ></span>
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Clock :size="18" class="text-slate-400" />
                    <span class="text-white">Show Timer</span>
                  </div>
                  <button 
                    @click="settingsStore.toggleTimer()"
                    class="toggle-squid"
                    :class="settingsStore.settings.showTimer ? 'toggle-squid-checked' : 'bg-slate-600'"
                    role="switch"
                    :aria-checked="settingsStore.settings.showTimer"
                  >
                    <span 
                      class="toggle-squid-thumb"
                      :class="settingsStore.settings.showTimer ? 'toggle-squid-thumb-checked' : ''"
                    ></span>
                  </button>
                </div>
              </div>
            </section>

            <section aria-labelledby="stats-heading">
              <h3 id="stats-heading" class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Statistics
              </h3>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="glass-panel p-4 text-center">
                  <BarChart3 :size="20" class="text-neon-cyan mx-auto mb-2" />
                  <p class="text-2xl font-game text-white">{{ statsStore.stats.totalGames }}</p>
                  <p class="text-[10px] uppercase tracking-widest text-slate-500">Games</p>
                </div>
                
                <div class="glass-panel p-4 text-center">
                  <Trophy :size="20" class="text-amber-500 mx-auto mb-2" />
                  <p class="text-2xl font-game text-white">{{ winRate }}%</p>
                  <p class="text-[10px] uppercase tracking-widest text-slate-500">Win Rate</p>
                </div>
                
                <div class="glass-panel p-4 text-center">
                  <p class="text-2xl font-game text-neon-magenta">{{ statsStore.stats.bestScore }}</p>
                  <p class="text-[10px] uppercase tracking-widest text-slate-500">Best Score</p>
                </div>
                
                <div class="glass-panel p-4 text-center">
                  <p class="text-2xl font-game text-neon-lime">{{ statsStore.stats.longestSnake }}</p>
                  <p class="text-[10px] uppercase tracking-widest text-slate-500">Longest Snake</p>
                </div>
              </div>

              <button 
                @click="resetStats"
                class="w-full mt-4 py-3 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw :size="16" />
                Reset Statistics
              </button>
            </section>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="modal">
      <div 
        v-if="showHelp" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="showHelp = false"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
      >
        <div class="glass-panel w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-white/10">
            <h2 id="help-title" class="text-xl font-bold text-white uppercase tracking-wider">
              How to Play
            </h2>
            <button 
              @click="showHelp = false"
              class="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close help"
            >
              <X :size="20" class="text-white" />
            </button>
          </div>

          <div class="p-6 space-y-6">
            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                  <span class="text-neon-cyan font-game text-xs">↑↓←→</span>
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">Controls</h4>
                  <p class="text-slate-400 text-sm">Use Arrow keys or WASD to control the snake direction.</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-full bg-neon-magenta/20 flex items-center justify-center flex-shrink-0">
                  <span class="text-neon-magenta font-game text-xs">+</span>
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">Eat Food</h4>
                  <p class="text-slate-400 text-sm">Collect pink food to grow and increase your score.</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <span class="text-red-500 font-game text-xs">X</span>
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">Avoid Walls & Self</h4>
                  <p class="text-slate-400 text-sm">Don't hit the walls or your own tail!</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Trophy :size="20" class="text-amber-500" />
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">Score Points</h4>
                  <p class="text-slate-400 text-sm">Each food gives points. Complete levels by eating 5 foods!</p>
                </div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-white font-bold mb-3">Keyboard Shortcuts</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-400">Start Game</span>
                  <kbd class="px-2 py-1 bg-white/10 rounded text-white font-mono">Space</kbd>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Pause</span>
                  <kbd class="px-2 py-1 bg-white/10 rounded text-white font-mono">Esc</kbd>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Move</span>
                  <kbd class="px-2 py-1 bg-white/10 rounded text-white font-mono">↑ ↓ ← →</kbd>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Toggle Sound</span>
                  <kbd class="px-2 py-1 bg-white/10 rounded text-white font-mono">M</kbd>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Toggle Theme</span>
                  <kbd class="px-2 py-1 bg-white/10 rounded text-white font-mono">T</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "../../style.css";
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .glass-panel,
.modal-leave-active .glass-panel {
  transition: transform 0.3s ease;
}

.modal-enter-from .glass-panel,
.modal-leave-to .glass-panel {
  transform: scale(0.95) translateY(20px);
}

.toggle-squid {
  @apply relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300;
}

.toggle-squid-checked {
  @apply bg-neon-magenta;
}

.toggle-squid-thumb {
  @apply inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300;
}

.toggle-squid-thumb-checked {
  @apply translate-x-6;
}
</style>
