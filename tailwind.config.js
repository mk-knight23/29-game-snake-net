/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        snake: {
          green: '#4ADE80',
          blue: '#60A5FA',
          purple: '#A78BFA',
          yellow: '#FBBF24',
          cyan: '#22D3EE',
          pink: '#F472B6',
          orange: '#FB923C',
        },
        game: {
          bg: '#0a0a0a',
          grid: '#1a1a2e',
          border: '#2d2d44',
        }
      },
      fontFamily: {
        game: ['Press Start 2P', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}
