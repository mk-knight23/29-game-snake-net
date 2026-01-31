# 🐍 Neon Snake - High-Fidelity Arcade

<p align="center">
  <img src="https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/Canvas-FF6B6B?style=for-the-badge&logo=canvas&logoColor=white" alt="Canvas API">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p>

<p align="center">
  A professional WebGL arcade reconstruction of the classic Snake game, built with **Vue 3**, **Canvas API**, and **Tailwind CSS**. Optimized for high-refresh-rate displays and precision input response.
</p>

<p align="center">
  <a href="https://mk-knight23.github.io/32-Snake-Game-Python-Web/">🚀 Live Demo</a>
</p>

![Game Screenshot](https://via.placeholder.com/800x450/050510/00f3ff?text=Neon+Snake)

## 🎮 Overview

This project is a professional arcade reconstruction of the classic Snake game using modern web technologies. It features a custom game loop using `requestAnimationFrame`, a high-performance canvas renderer, and a "Cyber Arcade" design system.

## ✨ Features

### Before → After

| Feature | Legacy | Upgraded (v1.0) |
|---------|--------|-----------------|
| **Framework** | Basic setup | Vue 3 + Vite |
| **State** | Simple store | 3 Pinia stores |
| **Theming** | Single theme | Dark/Light/System |
| **Accessibility** | None | Full ARIA + Keyboard |
| **Settings** | Inline only | Full settings panel |
| **Persistence** | High score only | Settings + Stats |
| **Audio** | None | Sound effects |
| **Game Modes** | 1 | 3 difficulty levels + Speed presets |
| **Statistics** | None | Comprehensive stats |
| **Mobile** | None | Swipe controls |
| **Visual FX** | None | Particles + Screen shake |
| **Linting** | None | ESLint + Prettier |

### New Features

- **Swipe Controls**: Swipe on mobile to control snake direction
- **Speed Presets**: Quick-select speed (Slow, Normal, Fast, Insane) or use custom slider
- **Particle Effects**: Visual feedback when eating food
- **Screen Shake**: Impact effect on game over

## 🛠️ Tech Stack

- **Framework**: Vue 3.5 (Composition API, Script Setup)
- **Build Tool**: Vite 6
- **State Management**: Pinia
- **Styling**: Tailwind CSS (Neon palette)
- **TypeScript**: Full type safety
- **Icons**: Lucide Vue Next
- **Audio**: Howler.js

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/32-Snake-Game-Python-Web.git
cd 32-Snake-Game-Python-Web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 How to Play

1. **Start Game**: Press `Space` or click the play button
2. **Control Snake**: Use Arrow keys or WASD
3. **Goal**: Eat pink food to grow and score points
4. **Avoid**: Walls and your own tail
5. **Levels**: Complete levels by eating 5 foods each
6. **Lives**: You have 3 lives - don't crash!

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start Game |
| `Esc` | Pause Game |
| `↑` / `W` | Move Up |
| `↓` / `S` | Move Down |
| `←` / `A` | Move Left |
| `→` / `D` | Move Right |
| `M` | Toggle Sound |
| `T` | Toggle Theme |

## 📁 Project Structure

```
32-Snake-Game-Python-Web/
├── src/
│   ├── assets/           # Static assets
│   ├── components/
│   │   └── ui/           # UI components
│   │       └── SettingsPanel.vue
│   ├── composables/      # Vue composables
│   │   ├── useAudio.ts
│   │   ├── useKeyboardControls.ts
│   │   └── useSnakeGame.ts
│   ├── stores/           # Pinia stores
│   │   ├── game.ts
│   │   ├── settings.ts
│   │   └── stats.ts
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── App.vue           # Main app component
│   ├── main.ts           # App entry point
│   └── style.css         # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🏗️ Architecture

### State Management

The app uses three Pinia stores:

1. **Game Store**: Manages game state, snake position, scoring, and game logic
2. **Settings Store**: Handles user preferences (sound, theme, difficulty)
3. **Stats Store**: Tracks player statistics and achievements

### Game Engine

The game uses a custom engine with:
- Variable tick rate (40ms - 200ms based on difficulty)
- Canvas-based rendering with hardware acceleration
- Smooth snake movement with interpolation
- Collision detection

### Component Structure

- **App.vue**: Main game container with canvas and UI
- **SettingsPanel.vue**: Settings and statistics modal

## 🎨 Theming

The app supports three theme modes:

- **Dark**: Default cyberpunk neon theme
- **Light**: Light theme for bright environments
- **System**: Follows system preference

Toggle themes with the theme button or `T` key.

## ♿ Accessibility

This project is built with accessibility in mind:

- Full ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support
- High contrast mode support

## 📱 Responsive Design

The game is fully responsive:

- **Desktop**: Full keyboard and mouse support
- **Tablet**: Touch controls and responsive UI
- **Mobile**: Touch-optimized controls

## 🔧 Configuration

### Game Settings

| Setting | Options | Default |
|---------|---------|---------|
| Difficulty | Easy / Normal / Hard | Normal |
| Grid Size | 15x / 20x / 25x | 20x |
| Speed | 40ms - 200ms | 100ms |
| Sound | On / Off | On |
| Show Grid | On / Off | On |
| Show Timer | On / Off | On |

### Build Configuration

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## 📦 Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

1. Build: `npm run build`
2. Output: `dist/` folder
3. Deploy to `gh-pages` branch

### Vercel

Deploy to Vercel with zero configuration:

```bash
npm i -g vercel
vercel
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the [Wiki](https://github.com/mk-knight23/32-Snake-Game-Python-Web/wiki)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/mk-knight23">mk-knight23</a>
</p>

---

### Live Demo
- GitHub Pages: <https://mk-knight23.github.io/32-Snake-Game-Python-Web/>
- Vercel: [Deploy your own](https://vercel.com/new)
- Netlify: [Deploy your own](https://app.netlify.com/start)

---

## 📝 Design Notes (V2)

### Intentional Quirk: The Golden Apple
V2 adds a golden apple that spawns rarely (10% chance) and gives 3x points. It flashes and disappears after 5 seconds if not eaten. This creates urgency—do you abandon your safe route for a risky detour? The timing (5 seconds) is arbitrary but feels right. Too long, and it's free points. Too short, and it's impossible.

### Tradeoff: Fixed Speed Increases
Speed increases every 5 food items, regardless of mode. I didn't implement "smart" difficulty that adapts to your skill. The tradeoff: predictable progression vs. dynamic challenge. Predictable lets players strategize around known milestones. Dynamic difficulty can feel patronizing—"the game is going easy on me."

### What I Chose NOT to Build
No multiplayer or leaderboards. Your high score is yours alone. Online leaderboards turn every game into a competition. Solo high-score chasing is meditative—you're only competing against your own patience and focus. Not everything needs to be social.

## 🎉 Additional Features (V3)

Two quality-of-life improvements for better gameplay flow:

### Pause Screen (ESC Key)
**Why added**: Previously, pressing ESC just returned you to the main menu with no options. If you wanted to quickly take a break, you'd lose your progress.

**What changed**: ESC now opens a pause overlay with three options: Resume (continue playing), Restart (start over), and Quit (return to menu). The game state is preserved while paused.

### High Score Celebration
**Why added**: Breaking your personal best felt underwhelming—it just showed a number. No fanfare, no acknowledgment.

**What changed**: When you beat your high score, the game now displays a "NEW BEST!" celebration with animated text before returning to the main menu. Small dopamine hit, big satisfaction.

### Intentionally Rejected: Mobile Pause Button
I considered adding a visible pause button on mobile screens. Rejected because the screen real estate is precious, and swipe-to-pause (from edges) is more elegant. Physical buttons (ESC on desktop, swipe gesture on mobile) keep the UI clean.
