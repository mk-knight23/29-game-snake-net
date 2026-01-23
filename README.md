# Snake Game - Classic Arcade

A modern web-based Snake game built with React, TypeScript, and Canvas. Features multiple game modes, difficulty levels, and mobile support.

![Snake Game](public/favicon.svg)

## Features

### Gameplay
- **Classic Snake mechanics** - Eat food, grow longer, avoid collisions
- **Multiple Game Modes**:
  - **Classic** - Hit walls = game over
  - **No Walls** - Wrap around edges
  - **Time Attack** - Beat the clock (coming soon)
- **4 Difficulty Levels** - Easy, Medium, Hard, Extreme

### Visual & Audio
- **Colorful rainbow snake** - Each segment has a unique color
- **Glowing food effects** - Visual feedback on food items
- **Smooth animations** - 60fps game loop
- **Dark theme** - Easy on the eyes

### User Experience
- **Keyboard controls** - Arrow keys or WASD
- **Mobile touch controls** - D-pad for phones/tablets
- **Persistent high scores** - Stored locally
- **Pause/Resume** - Space or Escape

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI components |
| **TypeScript** | Type safety |
| **Vite** | Build tool |
| **HTML Canvas** | Game rendering |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Zustand** | State management |

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/32-Snake-Game-Python-Web.git

# Navigate to project
cd 32-Snake-Game-Python-Web

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Controls

| Input | Action |
|-------|--------|
| Arrow Up / W | Move Up |
| Arrow Down / S | Move Down |
| Arrow Left / A | Move Left |
| Arrow Right / D | Move Right |
| Space | Start / Pause |
| Escape | Pause |

## Game Modes

### Classic
Standard snake gameplay. Hit the walls and it's game over.

### No Walls
Snake wraps around edges. Only self-collision ends the game.

### Time Attack (Coming Soon)
Race against the clock to achieve the highest score.

## Difficulty Levels

| Level | Speed | Description |
|-------|-------|-------------|
| Easy | Slow | Great for beginners |
| Medium | Normal | Balanced challenge |
| Hard | Fast | For experienced players |
| Extreme | Very Fast | Ultimate challenge |

## Project Structure

```
src/
├── components/
│   ├── GameCanvas.tsx      # Canvas rendering
│   ├── StartScreen.tsx     # Main menu
│   ├── GameOverScreen.tsx  # Game over modal
│   ├── GameHUD.tsx         # Score display
│   └── MobileControls.tsx  # Touch controls
├── hooks/
│   └── useKeyboard.ts      # Keyboard input
├── stores/
│   └── gameStore.ts        # Zustand store
├── types/
│   └── game.ts             # TypeScript types
├── App.tsx                 # Main component
└── main.tsx                # Entry point
```

## Live Demo

[Play Now](https://mk-knight23.github.io/32-Snake-Game-Python-Web)

## Legacy

This project was originally built with Python (Pygame) for desktop. The web version maintains the same gameplay while adding modern features and mobile support.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with love by [MK Knight](https://github.com/mk-knight23)
