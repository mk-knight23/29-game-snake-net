/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f3ff',
          magenta: '#ff00ff',
          lime: '#39ff14',
          bg: '#050510'
        }
      },
      fontFamily: {
        game: ['"Press Start 2P"', 'system-ui'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
