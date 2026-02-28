import { useEffect, useRef } from "react";

interface AnimatedGridProps {
  className?: string;
  cellSize?: number;
}

const AnimatedGrid = ({ className = "", cellSize = 28 }: AnimatedGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let pulses: Pulse[] = [];

    interface Pulse {
      x: number;
      y: number;
      dirX: number; // 1 = horizontal, 0 = vertical
      dirY: number;
      progress: number; // 0..1
      length: number;
      speed: number;
      opacity: number;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const spawnPulse = () => {
      const rect = canvas.getBoundingClientRect();
      const isHorizontal = Math.random() > 0.5;

      if (isHorizontal) {
        // Travel along a horizontal grid line
        const row = Math.floor(Math.random() * (rect.height / cellSize)) * cellSize;
        pulses.push({
          x: -cellSize * 4,
          y: row,
          dirX: 1,
          dirY: 0,
          progress: 0,
          length: cellSize * 3 + Math.random() * cellSize * 3,
          speed: 0.6 + Math.random() * 0.8,
          opacity: 0.15 + Math.random() * 0.2,
        });
      } else {
        // Travel along a vertical grid line
        const col = Math.floor(Math.random() * (rect.width / cellSize)) * cellSize;
        pulses.push({
          x: col,
          y: -cellSize * 4,
          dirX: 0,
          dirY: 1,
          progress: 0,
          length: cellSize * 3 + Math.random() * cellSize * 3,
          speed: 0.6 + Math.random() * 0.8,
          opacity: 0.15 + Math.random() * 0.2,
        });
      }
    };

    let lastSpawn = 0;
    const spawnInterval = 800; // ms between new pulses

    const animate = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Spawn new pulses periodically
      if (time - lastSpawn > spawnInterval) {
        spawnPulse();
        lastSpawn = time;
      }

      // Get computed style for the line color
      const style = getComputedStyle(canvas);
      const color = style.getPropertyValue("--pulse-color").trim() || "180, 180, 180";

      // Draw and update pulses
      pulses = pulses.filter((p) => {
        const headX = p.x + p.dirX * p.progress;
        const headY = p.y + p.dirY * p.progress;
        const tailX = headX - p.dirX * p.length;
        const tailY = headY - p.dirY * p.length;

        // Create gradient along the pulse
        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, `rgba(${color}, 0)`);
        gradient.addColorStop(0.3, `rgba(${color}, ${p.opacity * 0.5})`);
        gradient.addColorStop(0.7, `rgba(${color}, ${p.opacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Update position
        p.progress += p.speed;

        // Remove if fully off screen
        const maxDim = Math.max(rect.width, rect.height);
        return p.progress - p.length < maxDim + cellSize * 4;
      });

      animationId = requestAnimationFrame(animate);
    };

    // Seed a few initial pulses
    for (let i = 0; i < 3; i++) {
      spawnPulse();
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [cellSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      style={{ "--pulse-color": "130, 130, 160" } as React.CSSProperties}
    />
  );
};

export default AnimatedGrid;
