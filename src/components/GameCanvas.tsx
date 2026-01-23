import { useRef, useEffect } from 'react';
import { useSnakeStore, SNAKE_COLORS } from '@/stores/gameStore';

const CELL_SIZE = 20;

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { snake, food, foodColor, settings } = useSnakeStore();
  const gridSize = settings.gridSize;
  const canvasSize = gridSize * CELL_SIZE;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = settings.darkMode ? '#0a0a0a' : '#f0f0f0';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw grid
    ctx.strokeStyle = settings.darkMode ? '#1a1a2e' : '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvasSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvasSize, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const color = SNAKE_COLORS[index % SNAKE_COLORS.length];
      ctx.fillStyle = color;
      
      // Rounded rectangle for each segment
      const x = segment.x * CELL_SIZE + 1;
      const y = segment.y * CELL_SIZE + 1;
      const size = CELL_SIZE - 2;
      const radius = 4;
      
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + size - radius, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
      ctx.lineTo(x + size, y + size - radius);
      ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
      ctx.lineTo(x + radius, y + size);
      ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      // Add eyes to the head
      if (index === 0) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x + size * 0.3, y + size * 0.35, 3, 0, Math.PI * 2);
        ctx.arc(x + size * 0.7, y + size * 0.35, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + size * 0.3, y + size * 0.35, 1.5, 0, Math.PI * 2);
        ctx.arc(x + size * 0.7, y + size * 0.35, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw food with glow effect
    const foodX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const foodY = food.y * CELL_SIZE + CELL_SIZE / 2;
    
    // Glow
    const gradient = ctx.createRadialGradient(foodX, foodY, 0, foodX, foodY, CELL_SIZE);
    gradient.addColorStop(0, foodColor);
    gradient.addColorStop(0.5, foodColor + '80');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(food.x * CELL_SIZE - 5, food.y * CELL_SIZE - 5, CELL_SIZE + 10, CELL_SIZE + 10);
    
    // Food circle
    ctx.fillStyle = foodColor;
    ctx.beginPath();
    ctx.arc(foodX, foodY, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(foodX - 3, foodY - 3, 3, 0, Math.PI * 2);
    ctx.fill();
  }, [snake, food, foodColor, settings, gridSize, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className="border-2 border-gray-700 rounded-lg shadow-2xl"
      style={{ 
        maxWidth: '100%', 
        maxHeight: 'calc(100vh - 200px)',
        aspectRatio: '1'
      }}
    />
  );
}
