# Neon Snake - High-Fidelity Arcade

A professional WebGL arcade reconstruction of the classic Snake game, built with **Vue 3**, **Canvas API**, and **Tailwind CSS**. Optimized for high-refresh-rate displays and precision input response.

## Overview
This project replaces the legacy React-based snake with a modern Vue 3 architecture. It features a custom game loop using `requestAnimationFrame`, a high-performance canvas renderer, and a "Cyber Arcade" design system.

## Features Comparison

| Feature | Legacy (React) | Upgraded (Vue 3 v2.0) |
| :--- | :--- | :--- |
| **Engine** | Basic DOM/Canvas | **Frame-Interpolated Canvas API** |
| **Logic** | Fixed Interval | **Variable Tick Engine (50ms - 200ms)** |
| **UI Aesthetic**| Basic Retro | **Neon-Glow Cyberpunk Design** |
| **Persistence** | None | **Pinia + LocalStorage Score Recovery** |
| **Resolution** | Fixed | **Adaptive Grid Scaling (15x - 25x)** |
| **Performance**| Moderate | **Hardware-Accelerated WebGL Context** |

## Tech Stack
- **Framework:** Vue 3.5 (Composition API)
- **Build Tool:** Vite 6
- **State:** Pinia
- **Styling:** Tailwind CSS (Neon palette)
- **Icons:** Lucide Vue

## Setup & Build Instructions

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## Deployment
Deployed to GitHub Pages via automated CI/CD workflows. Optimized for edge delivery with asset compression.

---

**License:** MIT
**Architect:** mk-knight23
