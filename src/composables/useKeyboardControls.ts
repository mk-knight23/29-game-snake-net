import { onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'
import { KEYBOARD_SHORTCUTS, DIRECTIONS } from '@/utils/constants'

type Handler = () => void

export function useKeyboardControls() {
  const gameStore = useGameStore()
  const settingsStore = useSettingsStore()
  
  const handlers = new Map<string, Set<Handler>>()

  function registerShortcut(key: string, handler: Handler): void {
    const upperKey = key.toUpperCase()
    if (!handlers.has(upperKey)) {
      handlers.set(upperKey, new Set())
    }
    handlers.get(upperKey)!.add(handler)
  }

  function unregisterShortcut(key: string, handler: Handler): void {
    const upperKey = key.toUpperCase()
    handlers.get(upperKey)?.delete(handler)
  }

  function handleKeydown(event: KeyboardEvent): void {
    const key = event.key.toUpperCase()
    const handlersForKey = handlers.get(key)

    if (key === KEYBOARD_SHORTCUTS.UP || key === 'W') {
      event.preventDefault()
      gameStore.setNextDirection(DIRECTIONS.UP)
      return
    }
    if (key === KEYBOARD_SHORTCUTS.DOWN || key === 'S') {
      event.preventDefault()
      gameStore.setNextDirection(DIRECTIONS.DOWN)
      return
    }
    if (key === KEYBOARD_SHORTCUTS.LEFT || key === 'A') {
      event.preventDefault()
      gameStore.setNextDirection(DIRECTIONS.LEFT)
      return
    }
    if (key === KEYBOARD_SHORTCUTS.RIGHT || key === 'D') {
      event.preventDefault()
      gameStore.setNextDirection(DIRECTIONS.RIGHT)
      return
    }

    if (handlersForKey && handlersForKey.size > 0) {
      event.preventDefault()
      handlersForKey.forEach(handler => handler())
    }
  }

  function initialize(): void {
    document.addEventListener('keydown', handleKeydown)
    
    registerShortcut(KEYBOARD_SHORTCUTS.START, () => {
      if (gameStore.isIdle || gameStore.isGameOver) {
        gameStore.startGame()
      }
    })

    registerShortcut(KEYBOARD_SHORTCUTS.PAUSE, () => {
      if (gameStore.isPlaying || gameStore.isPaused) {
        gameStore.pauseGame()
      }
    })

    registerShortcut(KEYBOARD_SHORTCUTS.MUTE, () => {
      settingsStore.toggleSound()
    })

    registerShortcut(KEYBOARD_SHORTCUTS.THEME, () => {
      const themes: Array<'dark' | 'light' | 'system'> = ['dark', 'light', 'system']
      const currentIndex = themes.indexOf(settingsStore.settings.theme)
      const nextIndex = (currentIndex + 1) % themes.length
      settingsStore.setTheme(themes[nextIndex])
    })
  }

  function destroy(): void {
    document.removeEventListener('keydown', handleKeydown)
    handlers.clear()
  }

  onMounted(() => {
    initialize()
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    registerShortcut,
    unregisterShortcut,
    initialize,
    destroy,
  }
}
