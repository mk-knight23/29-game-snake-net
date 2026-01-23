import { motion } from 'framer-motion';
import { RotateCcw, Home, Trophy, Skull } from 'lucide-react';
import { useSnakeStore } from '@/stores/gameStore';

interface GameOverScreenProps {
  onRestart: () => void;
  onHome: () => void;
}

export function GameOverScreen({ onRestart, onHome }: GameOverScreenProps) {
  const { score, snake, stats } = useSnakeStore();
  const isNewHighScore = score === stats.highScore && score > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border-2 border-red-500/50"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          {isNewHighScore ? (
            <div className="w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center animate-pulse">
              <Trophy size={48} className="text-yellow-500" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
              <Skull size={48} className="text-red-500" />
            </div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-4xl font-game text-center mb-2 ${
            isNewHighScore ? 'text-yellow-500' : 'text-red-500'
          }`}
        >
          {isNewHighScore ? 'NEW HIGH SCORE!' : 'GAME OVER'}
        </motion.h2>

        {/* Score */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <div className="text-6xl font-game text-green-400 mb-2">{score}</div>
          <div className="text-gray-500">points</div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="text-center p-4 rounded-lg bg-gray-800">
            <div className="text-2xl font-bold text-blue-400">{snake.length}</div>
            <div className="text-xs text-gray-500">Snake Length</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-800">
            <div className="text-2xl font-bold text-yellow-400">{stats.highScore}</div>
            <div className="text-xs text-gray-500">High Score</div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <button
            onClick={onHome}
            className="flex-1 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-gray-300"
          >
            <Home size={20} />
            Menu
          </button>
          <button
            onClick={onRestart}
            className="flex-[2] py-4 rounded-lg bg-green-500 hover:bg-green-400 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/50"
          >
            <RotateCcw size={20} />
            PLAY AGAIN
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
