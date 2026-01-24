import { ref } from 'vue'
import { Howl } from 'howler'
import { useSettingsStore } from '@/stores/settings'

export function useAudio() {
  const settingsStore = useSettingsStore()
  
  const sounds = ref<{
    start?: Howl
    eat?: Howl
    eliminate?: Howl
    gameover?: Howl
  }>({})

  function initializeSounds(): void {
    sounds.value.start = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
      volume: 0.4,
    })

    sounds.value.eat = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
      volume: 0.3,
    })

    sounds.value.eliminate = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3'],
      volume: 0.5,
    })

    sounds.value.gameover = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2028/2028-preview.mp3'],
      volume: 0.5,
    })
  }

  function playStart(): void {
    if (settingsStore.settings.soundEnabled && sounds.value.start) {
      sounds.value.start.play()
    }
  }

  function playEat(): void {
    if (settingsStore.settings.soundEnabled && sounds.value.eat) {
      sounds.value.eat.play()
    }
  }

  function playEliminate(): void {
    if (settingsStore.settings.soundEnabled && sounds.value.eliminate) {
      sounds.value.eliminate.play()
    }
  }

  function playGameOver(): void {
    if (settingsStore.settings.soundEnabled && sounds.value.gameover) {
      sounds.value.gameover.play()
    }
  }

  function stopAll(): void {
    Object.values(sounds.value).forEach(sound => {
      if (sound) sound.stop()
    })
  }

  function destroySounds(): void {
    stopAll()
    Object.values(sounds.value).forEach(sound => {
      if (sound) sound.unload()
    })
  }

  return {
    initializeSounds,
    playStart,
    playEat,
    playEliminate,
    playGameOver,
    stopAll,
    destroySounds,
  }
}
