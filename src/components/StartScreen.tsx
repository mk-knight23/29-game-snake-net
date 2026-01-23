import { motion } from 'framer-motion';
import { Play, Settings, Trophy, Zap, Gamepad2 } from 'lucide-react';
import { useSnakeStore } from '@/stores/gameStore';
import type { Difficulty, GameMode } from '@/types/game';

interface StartScreenProps {
  onStart: () => void;
  onOpenSettings: () => void;
}

export function StartScreen({ onStart, onOpenSettings }: StartScreenProps) {
  const { settings, updateSettings, stats } = useSnakeStore();

  const difficulties: { value: Difficulty; label: string; color: string }[] = [
    { value: 'easy', label: 'Easy', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'bg-orange-500' },
    { value: 'extreme', label: 'Extreme', color: 'bg-red-500' },
  ];

  const gameModes: { value: GameMode; label: string; desc: string }[] = [
    { value: 'classic', label: 'Classic', desc: 'Hit walls = game over' },
    { value: 'noWalls', label: 'No Walls', desc: 'Wrap around edges' },
    { value: 'timeAttack', label: 'Time Attack', desc: 'Beat the clock' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-game text-green-400 mb-2"
            style={{ textShadow: '0 0 20px rgba(74, 222, 128, 0.5)' }}
          >
            SNAKE
          </motion.h1>
          <p className="text-gray-400">Classic Arcade Game</p>
        </div>

        {/* High Score */}
        <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
          <Trophy className="text-yellow-500" size={20} />
          <span className="text-yellow-500 font-bold">High Score: {stats.highScore}</span>
        </div>

        {/* Game Mode */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
            <Gamepad2 size={18} className="text-blue-400" />
            Game Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {gameModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => updateSettings({ gameMode: mode.value })}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  settings.gameMode === mode.value
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-300">
            <Zap size={18} className="text-yellow-400" />
            Difficulty
          </label>
          <div className="grid grid-cols-4 gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => updateSettings({ difficulty: diff.value })}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  settings.difficulty === diff.value
                    ? `${diff.color} text-white shadow-lg`
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 p-4 rounded-lg bg-gray-800/50 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Games Played:</span>
            <span className="ml-2 font-bold text-white">{stats.gamesPlayed}</span>
          </div>
          <div>
            <span className="text-gray-500">Total Score:</span>
            <span className="ml-2 font-bold text-green-400">{stats.totalScore}</span>
          </div>
        </div>

        {/* Controls hint */}
        <div className="mb-6 text-center text-sm text-gray-500">
          Use <kbd className="px-2 py-1 bg-gray-700 rounded">Arrow Keys</kbd> or{' '}
          <kbd className="px-2 py-1 bg-gray-700 rounded">WASD</kbd> to move
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onOpenSettings}
            className="flex-1 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-gray-300"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={onStart}
            className="flex-[3] py-4 rounded-lg bg-green-500 hover:bg-green-400 text-white font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/50"
          >
            <Play size={24} />
            PLAY
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
