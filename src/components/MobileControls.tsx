import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useSnakeStore } from '@/stores/gameStore';
import type { Direction } from '@/types/game';

export function MobileControls() {
  const { gameState, setDirection } = useSnakeStore();

  if (gameState !== 'playing') return null;

  const handleDirection = (dir: Direction) => {
    setDirection(dir);
  };

  const buttonClass = "w-16 h-16 bg-gray-800/80 rounded-xl flex items-center justify-center active:bg-gray-700 active:scale-95 transition-all touch-manipulation";

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <div />
        <button
          className={buttonClass}
          onTouchStart={() => handleDirection('UP')}
        >
          <ArrowUp size={28} />
        </button>
        <div />
        <button
          className={buttonClass}
          onTouchStart={() => handleDirection('LEFT')}
        >
          <ArrowLeft size={28} />
        </button>
        <div className="w-16 h-16" />
        <button
          className={buttonClass}
          onTouchStart={() => handleDirection('RIGHT')}
        >
          <ArrowRight size={28} />
        </button>
        <div />
        <button
          className={buttonClass}
          onTouchStart={() => handleDirection('DOWN')}
        >
          <ArrowDown size={28} />
        </button>
        <div />
      </div>
    </div>
  );
}
