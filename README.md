# 29-game-snake-net

<p align="center">
  <img src="https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Pinia-FFC221?style=for-the-badge&logo=pinia&logoColor=white" alt="Pinia">
</p>

<p align="center">
  A premium synthwave-inspired snake game built with Vue 3, Pinia, and specialized design tokens.
</p>

<p align="center">
  <a href="https://29-game-snake-net.vercel.app">🚀 Live Demo (Vercel)</a> ·
  <a href="https://two9-game-snake-net.onrender.com">🎮 Live Demo (Render)</a>
</p>

## 🎮 Live Demos

| Platform | URL |
|----------|-----|
| **Vercel** | [29-game-snake-net.vercel.app](https://29-game-snake-net.vercel.app) |
| **Render** | [two9-game-snake-net.onrender.com](https://two9-game-snake-net.onrender.com) |

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Presentation Layer                           │
│  Vue 3 Components + Tailwind CSS v4 + Synthwave Design System │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Game Rendering Layer                        │
│  HTML5 Canvas API + 60fps Game Loop + Grid System             │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    State Management                           │
│  Pinia Stores (game, settings, stats, snake) + LocalStorage  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Game Logic Layer                            │
│  Snake Movement + Food Generation + Collision Detection      │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Features Layer                              │
│  Game Modes + Speed Presets + Achievements + Statistics       │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
29-game-snake-net/
├── src/
│   ├── components/                     # Vue components
│   │   ├── common/                    # Shared UI components
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   └── Input.vue
│   │   └── ui/                        # UI-specific components
│   │       ├── SettingsPanel.vue
│   │       ├── GameHUD.vue
│   │       └── GameOver.vue
│   │
│   ├── views/                          # Vue Router views
│   │   ├── Home.vue                  # Main game view
│   │   ├── Achievements.vue          # Achievements page
│   │   └── Stats.vue                 # Statistics page
│   │
│   ├── stores/                         # Pinia stores
│   │   ├── game.ts                   # Game state store
│   │   ├── gameStore.ts              # Additional game state
│   │   ├── settings.ts               # Settings store
│   │   ├── snake.ts                  # Snake-specific state
│   │   └── stats.ts                  # Statistics store
│   │
│   ├── composables/                    # Vue composables
│   │   ├── useAudio.ts               # Audio management
│   │   ├── useKeyboardControls.ts    # Keyboard shortcuts
│   │   └── useSnakeGame.ts          # Game logic composables
│   │
│   ├── router/                         # Vue Router
│   │   └── index.ts                  # Router configuration
│   │
│   ├── types/                          # TypeScript types
│   │   └── index.ts                  # Type definitions
│   │
│   ├── utils/                          # Utilities
│   │   └── constants.ts              # Game constants
│   │
│   ├── App.vue                         # Root component
│   ├── main.ts                        # Vue entry point
│   └── style.css                       # Global styles
│
├── public/                             # Static assets
│
├── .github/workflows/                  # CI/CD pipelines
│   ├── ci.yml                         # CI workflow
│   └── deploy.yml                     # Deploy workflow
│
├── docs/                               # Documentation
│   ├── architecture.md               # Architecture details
│   └── game-mechanics.md              # Game mechanics
│
├── vite.config.ts                      # Vite configuration
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.js                  # Tailwind CSS configuration
└── package.json                        # Dependencies & scripts
```

### Tech Stack

```typescript
{
  frontend: {
    framework: {
      name: "Vue",
      version: "3.5.13",
      features: [
        "Composition API",
        "Script Setup",
        "Reactive State",
        "Computed Properties",
        "Teleport",
        "Suspense",
        "TypeScript support"
      ]
    },
    router: {
      name: "Vue Router",
      version: "4.6.4",
      features: [
        "Route guards",
        "Lazy loading",
        "Navigation guards",
        "History mode"
      ]
    },
    buildTool: {
      name: "Vite",
      version: "6.0.5",
      features: [
        "HMR (Hot Module Replacement)",
        "ESBuild-based",
        "Fast development",
        "Optimized production builds"
      ]
    },
    styling: {
      name: "Tailwind CSS",
      version: "4.0.0",
      features: [
        "Dark/Light/System themes",
        "Responsive utilities",
        "Custom animations",
        "Synthwave color palette (neon violet, cyber rose)"
      ]
    }
  },
  gameRendering: {
    technology: "HTML5 Canvas API",
    features: [
      "60fps game loop",
      "Grid-based movement",
      "Smooth rendering",
      "Responsive canvas",
      "High-performance"
    ],
    gameLoop: {
      implementation: "requestAnimationFrame",
      features: [
        "Smooth 60fps",
        "Delta time calculation",
        "Optimized rendering"
      ]
    }
  },
  stateManagement: {
    library: "Pinia",
    version: "2.3.1",
    stores: [
      {
        name: "gameStore",
        purpose: "Game state and mechanics",
        state: [
          "isPlaying: boolean",
          "isPaused: boolean",
          "isGameOver: boolean",
          "score: number",
          "highScore: number",
          "gridSize: number",
          "speed: number"
        ],
        actions: [
          "startGame(): void",
          "pauseGame(): void",
          "resumeGame(): void",
          "endGame(): void",
          "setGridSize(size: number): void",
          "setSpeed(speed: number): void"
        ],
        persistence: "LocalStorage"
      },
      {
        name: "snakeStore",
        purpose: "Snake-specific state",
        state: [
          "snake: Point[]",
          "direction: Direction",
          "food: Point",
          "length: number"
        ],
        actions: [
          "moveSnake(): void",
          "changeDirection(direction: Direction): void",
          "generateFood(): void",
          "growSnake(): void"
        ],
        persistence: "LocalStorage"
      },
      {
        name: "settingsStore",
        purpose: "User preferences",
        state: [
          "theme: 'dark' | 'light' | 'system'",
          "volume: number",
          "showHelp: boolean",
          "gridSize: number",
          "speedPreset: 'slow' | 'normal' | 'fast' | 'insane'"
        ],
        actions: [
          "setTheme(theme: string): void",
          "setVolume(volume: number): void",
          "toggleHelp(): void",
          "initializeTheme(): void"
        ],
        persistence: "LocalStorage"
      },
      {
        name: "statsStore",
        purpose: "Game statistics",
        state: [
          "totalGames: number",
          "highScore: number",
          "totalScore: number",
          "playTime: number",
          "achievements: Achievement[]",
          "foodEaten: number",
          "longestSnake: number"
        ],
        actions: [
          "recordGame(score: number, duration: number): void",
          "unlockAchievement(id: string): void",
          "getAverageScore(): number",
          "getFoodEaten(): number"
        ],
        persistence: "LocalStorage"
      }
    ]
  },
  composables: {
    useSnakeGame: {
      purpose: "Game logic management",
      features: [
        "Game loop management",
        "Snake movement",
        "Collision detection",
        "Food generation",
        "Score calculation"
      ],
      methods: [
        "startGameLoop(): void",
        "stopGameLoop(): void",
        "updateGame(): void",
        "checkCollision(): boolean",
        "draw(): void",
        "handleResize(): void"
      ]
    },
    useKeyboardControls: {
      purpose: "Keyboard shortcuts",
      features: [
        "Arrow key controls",
        "Prevent reverse movement",
        "Pause/resume with space",
        "Quick restart"
      ],
      keys: {
        ArrowUp: "Move up",
        ArrowDown: "Move down",
        ArrowLeft: "Move left",
        ArrowRight: "Move right",
        Space: "Pause/resume",
        R: "Quick restart",
        P: "Open settings"
      }
    },
    useAudio: {
      purpose: "Audio management",
      features: [
        "Sound effects",
        "Background music",
        "Volume control",
        "Cross-browser support"
      ],
      sounds: [
        "Eat food",
        "Game over",
        "Pause",
        "Resume",
        "High score"
      ]
    }
  },
  audio: {
    library: "Howler.js",
    version: "2.2.4",
    features: [
      "Sound effects",
      "Background music",
      "Volume control",
      "Cross-browser support"
    ],
    sounds: [
      "Eat food sound",
      "Game over sound",
      "Pause sound",
      "Resume sound",
      "High score sound",
      "Button clicks"
    ]
  },
  icons: {
    library: "Lucide Vue Next",
    version: "0.563.0",
    icons: [
      "Play",
      "Settings",
      "Github",
      "Activity",
      "Trophy",
      "Moon",
      "Sun",
      "RotateCcw",
      "HelpCircle"
    ]
  },
  utilities: {
    vueuse: {
      library: "@vueuse/core",
      version: "11.3.0",
      features: [
        "LocalStorage",
        "Theme detection",
        "Media queries",
        "Event listeners",
        "Debounce"
      ]
    }
  }
}
```

### Component Architecture

```typescript
{
  components: {
    core: [
      {
        name: "App",
        purpose: "Root application component",
        features: [
          "Game canvas integration",
          "Theme management",
          "Game state integration",
          "Keyboard shortcuts",
          "Responsive layout",
          "Router integration"
        ]
      }
    ],
    views: [
      {
        name: "Home",
        purpose: "Main game view",
        features: [
          "Canvas game rendering",
          "Game HUD overlay",
          "Game controls",
          "Start/pause/restart",
          "Theme toggle",
          "Settings panel"
        ]
      },
      {
        name: "Achievements",
        purpose: "Achievement tracking",
        features: [
          "Achievement list",
          "Progress indicators",
          "Unlock status",
          "Tier badges"
        ]
      },
      {
        name: "Stats",
        purpose: "Statistics page",
        features: [
          "Game statistics",
          "High score",
          "Total score",
          "Play time",
          "Food eaten"
        ]
      }
    ],
    ui: [
      {
        name: "GameHUD",
        purpose: "Game HUD overlay",
        features: [
          "Score display",
          "High score",
          "Snake length",
          "Current speed",
          "Pause indicator"
        ]
      },
      {
        name: "GameOver",
        purpose: "Game over screen",
        features: [
          "Final score",
          "High score indicator",
          "Restart button",
          "Play again button"
        ]
      },
      {
        name: "SettingsPanel",
        purpose: "Settings modal",
        features: [
          "Theme toggle",
          "Volume control",
          "Grid size selection",
          "Speed preset selection",
          "Help display"
        ]
      }
    ],
    common: [
      {
        name: "Button",
        purpose: "Reusable button component",
        features: [
          "Multiple variants",
          "Disabled states",
          "Loading states",
          "Icon support",
          "Retro styling"
        ]
      },
      {
        name: "Card",
        purpose: "Card container",
        features: [
          "Hover effects",
          "Synthwave styling",
          "Responsive layout"
        ]
      },
      {
        name: "Input",
        purpose: "Input component",
        features: [
          "Label support",
          "Error states",
          "Retro styling"
        ]
      }
    ]
  }
}
```

### State Management

```typescript
{
  gameStore: {
    purpose: "Game state and mechanics",
    state: {
      isPlaying: "boolean - Game is active",
      isPaused: "boolean - Game is paused",
      isGameOver: "boolean - Game ended",
      score: "number - Current score",
      highScore: "number - Highest score",
      gridSize: "number - Grid size (10-30)",
      speed: "number - Game speed (ms)"
    },
    actions: [
      "startGame(): void - Start the game",
      "pauseGame(): void - Pause the game",
      "resumeGame(): void - Resume the game",
      "endGame(): void - End the game",
      "setGridSize(size: number): void - Set grid size",
      "setSpeed(speed: number): void - Set game speed"
    ],
    persistence: "LocalStorage",
    storageKey: "snake-game"
  },
  snakeStore: {
    purpose: "Snake-specific state",
    state: {
      snake: "Point[] - Snake body segments",
      direction: "Direction - Current direction",
      food: "Point - Food position",
      length: "number - Snake length"
    },
    actions: [
      "moveSnake(): void - Move snake one step",
      "changeDirection(direction: Direction): void - Change direction",
      "generateFood(): void - Generate new food",
      "growSnake(): void - Grow snake by 1"
    ],
    persistence: "None (runtime only)"
  },
  settingsStore: {
    purpose: "User preferences",
    state: {
      theme: "'dark' | 'light' | 'system' - Theme preference",
      volume: "number - Volume level (0-100)",
      showHelp: "boolean - Show help overlay",
      gridSize: "number - Grid size (10-30)",
      speedPreset: "'slow' | 'normal' | 'fast' | 'insane' - Speed preset"
    },
    actions: [
      "setTheme(theme: string): void - Set theme",
      "setVolume(volume: number): void - Set volume",
      "toggleHelp(): void - Toggle help",
      "initializeTheme(): void - Initialize theme"
    ],
    persistence: "LocalStorage",
    storageKey: "snake-game-settings"
  },
  statsStore: {
    purpose: "Game statistics",
    state: {
      totalGames: "number - Total games played",
      highScore: "number - Highest score",
      totalScore: "number - Total score accumulated",
      playTime: "number - Total play time (seconds)",
      achievements: "Achievement[] - Unlocked achievements",
      foodEaten: "number - Total food eaten",
      longestSnake: "number - Longest snake achieved"
    },
    actions: [
      "recordGame(score: number, duration: number): void - Record game result",
      "unlockAchievement(id: string): void - Unlock achievement",
      "getAverageScore(): number - Calculate average score",
      "getFoodEaten(): number - Get total food eaten"
    ],
    persistence: "LocalStorage",
    storageKey: "snake-game-stats"
  }
}
```

### Game Mechanics

```typescript
{
  gameLogic: {
    snake: {
      representation: "Array of points [{x, y}]",
      movement: "One cell at a time",
      growth: "Grow by 1 when eating food",
      speed: "Adjustable via speed presets"
    },
    food: {
      generation: "Random position not on snake",
      points: "+10 points per food",
      types: "Single food type (retro style)"
    },
    collision: {
      wallCollision: "Game over on wall hit",
      selfCollision: "Game over on self hit",
      foodCollision: "Eat and grow"
    },
    controls: {
      desktop: "Arrow keys + Space",
      mobile: "Swipe gestures + tap to pause",
      keyboard: [
        "ArrowUp - Move up",
        "ArrowDown - Move down",
        "ArrowLeft - Move left",
        "ArrowRight - Move right",
        "Space - Pause/resume",
        "R - Quick restart"
      ]
    }
  },
  gridSystem: {
    cellSize: "Dynamic based on canvas size and grid size",
    gridSizes: "10-30 (adjustable)",
    canvas: "Responsive, adapts to screen size",
    rendering: "Grid-based with cell-based coordinates"
  },
  speedPresets: [
    {
      name: "Slow",
      speed: 150,
      description: "Relaxed gameplay"
    },
    {
      name: "Normal",
      speed: 100,
      description: "Standard gameplay"
    },
    {
      name: "Fast",
      speed: 60,
      description: "Quick reactions"
    },
    {
      name: "Insane",
      speed: 40,
      description: "Ultimate challenge"
    }
  ],
  scoring: {
    food: "+10 points",
    highScore: "Tracked and persisted",
    totalScore: "Accumulated across games",
    statistics: [
      "Total games",
      "High score",
      "Total score",
      "Play time",
      "Food eaten",
      "Longest snake"
    ]
  }
}
```

### TypeScript Interfaces

```typescript
{
  types: {
    game: {
      GameState: {
        isPlaying: boolean
        isPaused: boolean
        isGameOver: boolean
        score: number
        highScore: number
        gridSize: number
        speed: number
      }
    },
    snake: {
      Point: {
        x: number
        y: number
      }
      Direction: 'up' | 'down' | 'left' | 'right'
      Snake: Point[]
    },
    settings: {
      Settings: {
        theme: 'dark' | 'light' | 'system'
        volume: number
        showHelp: boolean
        gridSize: number
        speedPreset: 'slow' | 'normal' | 'fast' | 'insane'
      }
    },
    stats: {
      Stats: {
        totalGames: number
        highScore: number
        totalScore: number
        playTime: number
        achievements: Achievement[]
        foodEaten: number
        longestSnake: number
      }
    },
    achievement: {
      Achievement: {
        id: string
        name: string
        description: string
        tier: 'Common' | 'Rare' | 'Epic' | 'Legendary'
        unlocked: boolean
        progress: number
      }
    }
  }
}
```

### Canvas Rendering

```typescript
{
  canvas: {
    technology: "HTML5 Canvas API",
    features: [
      "2D context rendering",
      "60fps game loop",
      "Grid-based rendering",
      "Responsive canvas size",
      "High-performance"
    ],
    rendering: {
      snake: {
        method: "Filled rectangles",
        colors: ["Neon green body", "Bright green head"],
        effects: ["Glow effect", "Retro styling"]
      },
      food: {
        method: "Filled circle",
        colors: ["Neon pink", "Pulsing effect"],
        animation: "Pulse animation"
      },
      grid: {
        method: "Optional grid lines",
        color: "Faint cyan",
        style: "Retro grid"
      }
    },
    gameLoop: {
      implementation: "requestAnimationFrame",
      fps: 60,
      delta: "Delta time calculation",
      updates: [
        "Move snake",
        "Check collisions",
        "Update score",
        "Draw frame"
      ]
    }
  }
}
```

### Features Architecture

```typescript
{
  features: {
    gameModes: {
      normal: {
        purpose: "Standard gameplay",
        features: ["Normal speed", "Standard scoring", "High score tracking"]
      },
      practice: {
        purpose: "Practice without pressure",
        features: ["Adjustable speed", "No high score", "Relaxed gameplay"]
      }
    },
    speedPresets: {
      slow: {
        description: "Relaxed gameplay",
        speed: 150,
        features: ["More time to think", "Easier to control"]
      },
      normal: {
        description: "Standard gameplay",
        speed: 100,
        features: ["Balanced experience", "Classic snake speed"]
      },
      fast: {
        description: "Quick reactions",
        speed: 60,
        features: ["Fast-paced", "Requires quick reactions"]
      },
      insane: {
        description: "Ultimate challenge",
        speed: 40,
        features: ["Extreme speed", "For skilled players"]
      }
    },
    gridSizes: {
      range: "10-30 cells",
      default: 20,
      smaller: {
        description: "Larger cells, easier",
        features: ["Easier to see", "Simpler gameplay"]
      },
      larger: {
        description: "Smaller cells, harder",
        features: ["More precision", "Harder gameplay"]
      }
    },
    achievements: {
      purpose: "Track accomplishments",
      categories: [
        "First Game",
        "High Scores",
        "Food Eaten",
        "Longest Snake",
        "Total Games"
      ],
      tiers: [
        "Common",
        "Rare",
        "Epic",
        "Legendary"
      ],
      storage: "LocalStorage",
      tracking: "Progress tracking for each achievement"
    },
    statistics: {
      purpose: "Track performance",
      metrics: [
        "Total games played",
        "High score",
        "Total score",
        "Play time",
        "Food eaten",
        "Longest snake achieved"
      ],
      features: [
        "Detailed breakdown",
        "Historical data",
        "Trend analysis"
      ]
    },
    settings: {
      purpose: "Customize experience",
      options: [
        {
          name: "Theme",
          options: ["Dark", "Light", "System"],
          default: "Dark"
        },
        {
          name: "Volume",
          range: "0-100",
          default: "50"
        },
        {
          name: "Grid Size",
          range: "10-30",
          default: 20
        },
        {
          name: "Speed Preset",
          options: ["Slow", "Normal", "Fast", "Insane"],
          default: "Normal"
        }
      ]
    }
  }
}
```

### UI/UX Design

```typescript
{
  design: {
    aesthetic: "Synthwave / Retro-Futurism",
    features: [
      "8-bit retro fonts (Press Start 2P, VT323)",
      "Neon violet and cyber rose accents",
      "Deep void backgrounds",
      "Glow effects",
      "Dark mode (default)",
      "Smooth animations",
      "Retro arcade feel"
    ],
    colors: [
      {
        name: "Void Background",
        value: "#0a0a0f - Deep void base"
      },
      {
        name: "Neon Violet",
        value: "#8b5cf6 - Primary accent"
      },
      {
        name: "Cyber Rose",
        value: "#f43f5e - Secondary accent"
      },
      {
        name: "Snake Body",
        value: "#22c55e - Neon green"
      },
      {
        name: "Snake Head",
        value: "#4ade80 - Bright green"
      },
      {
        name: "Food",
        value: "#ec4899 - Neon pink"
      }
    ],
    fonts: [
      {
        name: "Press Start 2P",
        usage: "Headlines and titles",
        style: "8-bit pixel font"
      },
      {
        name: "VT323",
        usage: "Body text",
        style: "Retro terminal font"
      }
    ],
    animations: {
      library: "CSS + GSAP",
      types: [
        "Game over fade",
        "Victory celebration",
        "Food pulse",
        "Snake glow",
        "Button hover effects"
      ]
    },
    responsiveness: {
      breakpoints: [
        "Mobile (320px)",
        "Tablet (768px)",
        "Desktop (1024px)",
        "Large (1280px)"
      ],
      features: [
        "Responsive canvas",
        "Touch controls",
        "Swipe gestures",
        "Keyboard navigation"
      ]
    }
  }
}
```

### Performance Optimization

```typescript
{
  performance: {
    strategies: [
      "requestAnimationFrame for smooth 60fps",
      "Canvas-based rendering (no DOM overhead)",
      "Efficient game loop",
      "LocalStorage persistence",
      "Debounced inputs",
      "Code splitting",
      "Lazy loading components"
    ],
    canvas: {
      optimizations: [
        "Offscreen canvas (future)",
        "Frame rate limiting",
        "Efficient drawing"
      ]
    },
    vue: {
      optimizations: [
        "Composition API efficiency",
        "Computed properties caching",
        "Watch debouncing",
        "Teleport performance"
      ]
    }
  }
}
```

### Error Handling

```typescript
{
  errorHandling: {
    user: {
      validation: "Input validation",
      features: [
        "Type checking",
        "Range validation",
        "Null checks",
        "Error boundaries"
      ]
    },
    game: {
      validation: "Game state validation",
      features: [
        "State consistency",
        "Prevent invalid moves",
        "Graceful degradation"
      ]
    }
  }
}
```

### Accessibility

```typescript
{
  accessibility: {
    features: [
      "Keyboard navigation",
      "ARIA labels",
      "Screen reader support",
      "Focus management",
      "Color contrast",
      "Touch support",
      "High contrast mode"
    ],
    keyboard: {
      shortcuts: [
        "Arrow keys - Move",
        "Space - Pause/resume",
        "R - Quick restart",
        "P - Settings",
        "ESC - Close modals"
      ]
    }
  }
}
```

### Build Pipeline

```typescript
{
  build: {
    dev: "npm run dev (Vite dev server)",
    build: "npm run build (vue-tsc -b && vite build)",
    output: "dist/ directory",
    features: [
      "TypeScript compilation",
      "Vue SFC compilation",
      "Code splitting",
      "Tree-shaking",
      "Minification",
      "Optimized bundles"
    ]
  }
}
```

### CI/CD Pipeline

```yaml
Push to main → Build → Test → Deploy
     ↓          ↓        ↓        ↓
  Trigger    Vite      Vitest   GitHub Pages
             Build     Tests     Deploy
```

- **Build**: Vite production build
- **Test**: Unit tests
- **Deploy**: GitHub Pages

### Environment Variables

```typescript
{
  envVariables: {
    VITE_APP_TITLE: "Application title",
    VITE_API_URL: "API base URL (optional)"
  }
}
```

### Deployment

```typescript
{
  deployment: {
    vercel: {
      url: "https://29-game-snake-net.vercel.app",
      features: [
        "Automatic deployments",
        "HTTPS",
        "Global CDN",
        "Preview deployments"
      ]
    },
    render: {
      url: "https://two9-game-snake-net.onrender.com",
      features: [
        "Automatic deployments",
        "HTTPS",
        "Global CDN"
      ]
    },
    githubPages: {
      url: "GitHub Pages deployment",
      features: [
        "Static site hosting",
        "Automatic deployment",
        "Free hosting"
      ]
    }
  }
}
```

### Key Architectural Decisions

**Why HTML5 Canvas for Rendering?**
- High-performance 2D rendering
- 60fps smooth gameplay
- No DOM overhead for game elements
- Efficient for grid-based games
- Full control over rendering
- Cross-browser support

**Why Pinia for State Management?**
- Official Vue state management
- Simpler than Vuex
- Excellent TypeScript support
- Modular stores
- Built-in devtools

**Why Vue 3 Composition API?**
- Better code organization
- Reusable composables
- Improved TypeScript support
- Better performance
- Smaller bundle size

**Why Tailwind CSS v4?**
- Zero config setup
- Modern features
- Dark mode support
- Custom themes
- Small bundle size

**Why Vite?**
- Fast development with HMR
- ESBuild-based for speed
- Optimized production builds
- Native ESM support
- Great Vue 3 integration

**Why Howler.js for Audio?**
- Cross-browser audio
- Audio sprites
- Volume control
- Mobile-friendly
- Reliable playback

### Design Philosophy

```typescript
{
  design: {
    principles: [
      "Synthwave aesthetics",
      "Retro arcade feel",
      "Smooth gameplay",
      "Responsive design",
      "Accessible gameplay"
    ],
    gameplay: {
      focus: "Precision and speed",
      elements: [
        "Classic snake mechanics",
        "Speed presets",
        "Grid size options",
        "High scores",
        "Achievements"
      ]
    }
  }
}
```

### Extension Points

```typescript
{
  extensions: [
    "Multiplayer mode",
    "Power-ups",
    "Obstacles",
    "More game modes",
    "More achievements",
    "Leaderboard",
    "Custom themes",
    "More food types",
    "Special effects",
    "Mobile app"
  ]
}
```

---

## 🎮 Overview

This project is a premium synthwave-inspired snake game using modern web technologies. It features:

- **HTML5 Canvas**: High-performance 2D rendering with 60fps game loop
- **Reactive State**: Vue 3 Composition API with Pinia
- **Game Mechanics**: Classic snake gameplay with modern features
- **Accessibility**: Full keyboard navigation and ARIA support
- **Theming**: Dark/Light/System theme support
- **Persistence**: High scores and settings saved to localStorage
- **Retro Aesthetic**: 8-bit fonts and synthwave color palette

## ✨ Features

### Modernization Feature Set
- **Retro-Futurism Design System**: Utilizing `Press Start 2P` and `VT323` for an authentic 8-bit feel.
- **Evolution Matrix**: Real-time logging of survivor data and run history.
- **Synthwave Aesthetics**: Deep void backgrounds with neon violet and cyber rose accents.
- **High-Performance Controls**: Optimized for sub-second input response on both desktop and mobile.
- **Grid-Based Gameplay**: Responsive grid system with adjustable grid size (10-30 cells).
- **Speed Presets**: 4 speed levels (Slow, Normal, Fast, Insane) for different skill levels.
- **Achievement System**: Track accomplishments across multiple tiers.
- **Statistics Tracking**: Comprehensive statistics including high score, total score, play time.
- **Touch Controls**: Swipe gestures for mobile playability.

### Before → After

| Feature | Legacy | Upgraded (v3.0) |
|---------|--------|-----------------|
| **Framework** | Vanilla JS | Vue 3 + Vite |
| **Rendering** | Basic Canvas | Canvas API + 60fps Loop |
| **State** | Local state | Pinia stores |
| **Theming** | Single theme | Dark/Light/System |
| **Accessibility** | None | Full ARIA + Keyboard |
| **Persistence** | None | Settings + Stats |
| **Settings** | None | Full settings panel |
| **Game Modes** | 1 speed | 4 speed presets |
| **Statistics** | None | Comprehensive stats |

## 🛠️ Tech Stack

- **Framework**: Vue 3.5 (Composition API, Script Setup)
- **Rendering**: HTML5 Canvas API
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **TypeScript**: Full type safety
- **Icons**: Lucide Vue Next
- **Audio**: Howler.js
- **Router**: Vue Router

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/29-game-snake-net.git
cd 29-game-snake-net

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Design Notes

### Intentional Quirk: Retro 8-Bit Fonts
The game uses `Press Start 2P` and `VT323` fonts for an authentic 8-bit arcade feel. While pixel fonts may seem outdated, they provide immediate nostalgia recognition and set the synthwave tone. The tradeoff is reduced readability at small sizes, but the aesthetic payoff is worth it for the target audience.

### Tradeoff: Grid-Based Movement
The snake moves in discrete grid cells rather than pixel-perfect movement. This creates the classic snake gameplay but limits precision. The benefit is simplified collision detection and predictable movement. Pixel-perfect movement would be smoother but would fundamentally change the snake game experience.

### What I Chose NOT to Build
No power-ups or obstacles. Classic snake is elegantly simple—add too many mechanics and it becomes a different game. The focus is on mastering the core snake mechanics with speed and grid size options. Power-ups would distract from the pure retro experience.

---

*Made by MK — Musharraf Kazi*

## 📝 License

MIT

---

*Last updated: 2026-03-01*
