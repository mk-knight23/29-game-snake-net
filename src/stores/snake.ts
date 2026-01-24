import { defineStore } from 'pinia'

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover'

export const useSnakeStore = defineStore('snake', {
  state: () => ({
    status: 'idle' as GameStatus,
    score: 0,
    highScore: parseInt(localStorage.getItem('snake-highscore') || '0'),
    speed: 100,
    gridSize: 20,
    isMuted: false
  }),
  actions: {
    setScore(val: number) {
      this.score = val
      if (val > this.highScore) {
        this.highScore = val
        localStorage.setItem('snake-highscore', this.highScore.toString())
      }
    },
    setStatus(status: GameStatus) {
      this.status = status
    }
  }
})
