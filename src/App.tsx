import { useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameCanvas } from '@/components/GameCanvas';
import { StartScreen } from '@/components/StartScreen';
import { GameOverScreen } from '@/components/GameOverScreen';
import { GameHUD } from '@/components/GameHUD';
import { MobileControls } from '@/components/MobileControls';
import { useSnakeStore } from '@/stores/gameStore';
import { useKeyboard } from '@/hooks/useKeyboard';

function App() {
  const {
    gameState,
    setGameState,
    moveSnake,
    speed,
    score,
    stats,
    updateStats,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
  } = useSnakeStore();

  const gameLoopRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Initialize keyboard controls
  useKeyboard();

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= speed) {
        const alive = moveSnake();
        if (!alive) {
          // Game over
          updateStats({ totalScore: stats.totalScore + score });
          setGameState('gameOver');
          return;
        }
        lastUpdateRef.current = timestamp;
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, speed, moveSnake, setGameState, updateStats, stats.totalScore, score]);

  const handleStart = useCallback(() => {
    startGame();
  }, [startGame]);

  const handlePause = useCallback(() => {
    if (gameState === 'playing') {
      pauseGame();
    } else if (gameState === 'paused') {
      resumeGame();
    }
  }, [gameState, pauseGame, resumeGame]);

  const handleRestart = useCallback(() => {
    startGame();
  }, [startGame]);

  const handleHome = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Game UI */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <GameHUD onPause={handlePause} />
      )}
      
      {/* Game Canvas */}
      <GameCanvas />
      
      {/* Mobile Controls */}
      <MobileControls />

      {/* Pause overlay */}
      {gameState === 'paused' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-4xl font-game text-yellow-400 mb-8">PAUSED</h2>
            <button
              onClick={handlePause}
              className="px-8 py-4 bg-green-500 hover:bg-green-400 rounded-lg text-white font-bold text-lg transition-all"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {gameState === 'idle' && (
          <StartScreen
            onStart={handleStart}
            onOpenSettings={() => {}}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState === 'gameOver' && (
          <GameOverScreen onRestart={handleRestart} onHome={handleHome} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-2 text-center text-gray-600 text-sm">
        Made by MK Knight
      </div>
    </div>
  );
}

export default App;
