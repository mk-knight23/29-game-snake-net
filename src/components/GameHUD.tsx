import { Trophy, Pause, Play } from 'lucide-react';
import { useSnakeStore } from '@/stores/gameStore';

interface GameHUDProps {
  onPause: () => void;
}

export function GameHUD({ onPause }: GameHUDProps) {
  const { score, stats, gameState, snake } = useSnakeStore();

  return (
    <div className="flex items-center justify-between mb-4 w-full max-w-[400px]">
      {/* Score */}
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 bg-gray-800 rounded-lg">
          <span className="text-gray-400 text-sm">Score</span>
          <div className="text-2xl font-game text-green-400">{score}</div>
        </div>
        <div className="px-4 py-2 bg-gray-800 rounded-lg">
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <Trophy size={14} className="text-yellow-500" /> Best
          </span>
          <div className="text-2xl font-game text-yellow-400">{stats.highScore}</div>
        </div>
      </div>

      {/* Snake length */}
      <div className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-sm">
        Length: {snake.length}
      </div>

      {/* Pause button */}
      <button
        onClick={onPause}
        className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
      >
        {gameState === 'paused' ? <Play size={20} /> : <Pause size={20} />}
      </button>
    </div>
  );
}
