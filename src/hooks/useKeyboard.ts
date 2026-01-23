import { useEffect, useCallback } from 'react';
import { useSnakeStore } from '@/stores/gameStore';
import type { Direction } from '@/types/game';

export function useKeyboard() {
  const { gameState, setDirection, pauseGame, resumeGame, startGame } = useSnakeStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Prevent default for arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      // Space to start/pause/resume
      if (e.code === 'Space') {
        if (gameState === 'idle' || gameState === 'gameOver') {
          startGame();
        } else if (gameState === 'playing') {
          pauseGame();
        } else if (gameState === 'paused') {
          resumeGame();
        }
        return;
      }

      // Escape to pause
      if (e.code === 'Escape' && gameState === 'playing') {
        pauseGame();
        return;
      }

      // Direction controls
      if (gameState !== 'playing') return;

      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        KeyW: 'UP',
        KeyS: 'DOWN',
        KeyA: 'LEFT',
        KeyD: 'RIGHT',
      };

      const direction = keyMap[e.code];
      if (direction) {
        setDirection(direction);
      }
    },
    [gameState, setDirection, pauseGame, resumeGame, startGame]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
