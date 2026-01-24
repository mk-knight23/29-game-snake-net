/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f3ff',
          magenta: '#ff00ff',
          lime: '#39ff14',
          bg: '#050510',
          dark: '#0a0a0f',
          light: '#f8fafc',
        }
      },
      fontFamily: {
        game: ['"Press Start 2P"', 'system-ui'],
        display: ['system-ui', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 243, 255, 0.5)',
        'neon-magenta': '0 0 15px rgba(255, 0, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
