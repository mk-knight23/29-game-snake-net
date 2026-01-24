import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'
import type { SettingsState } from '@/types'
import { STORAGE_KEYS } from '@/utils/constants'

export const useSettingsStore = defineStore('settings', () => {
  const prefersDark = usePreferredDark()
  
  const settings = ref<SettingsState>({
    soundEnabled: true,
    musicEnabled: true,
    vibrationsEnabled: true,
    difficulty: 'normal',
    theme: 'system',
    showGrid: true,
    showTimer: true,
  })

  function loadSettings(): void {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        settings.value = { ...settings.value, ...parsed }
      } catch {
        console.warn('Failed to parse settings')
      }
    }
  }

  function saveSettings(): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings.value))
  }

  function toggleSound(): void {
    settings.value.soundEnabled = !settings.value.soundEnabled
    saveSettings()
  }

  function toggleMusic(): void {
    settings.value.musicEnabled = !settings.value.musicEnabled
    saveSettings()
  }

  function toggleVibrations(): void {
    settings.value.vibrationsEnabled = !settings.value.vibrationsEnabled
    saveSettings()
  }

  function toggleGrid(): void {
    settings.value.showGrid = !settings.value.showGrid
    saveSettings()
  }

  function toggleTimer(): void {
    settings.value.showTimer = !settings.value.showTimer
    saveSettings()
  }

  function setDifficulty(difficulty: SettingsState['difficulty']): void {
    settings.value.difficulty = difficulty
    saveSettings()
  }

  function setTheme(theme: SettingsState['theme']): void {
    settings.value.theme = theme
    applyTheme()
    saveSettings()
  }

  function applyTheme(): void {
    const theme = settings.value.theme
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark.value)
    
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }

  function initializeTheme(): void {
    loadSettings()
    applyTheme()
  }

  watch(prefersDark, () => {
    if (settings.value.theme === 'system') {
      applyTheme()
    }
  })

  return {
    settings,
    loadSettings,
    saveSettings,
    toggleSound,
    toggleMusic,
    toggleVibrations,
    toggleGrid,
    toggleTimer,
    setDifficulty,
    setTheme,
    applyTheme,
    initializeTheme,
  }
})
