'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

const STAR_COLORS = [
  '#8b5cf6',
  '#a855f7',
  '#c084fc',
  '#e9d5ff',
  '#fbbf24',
  '#fef08a',
  '#ffffff',
];

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Hide on coarse touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let lastX = -100;
    let lastY = -100;
    let isHoveringClickable = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw 4-point star shape
    const drawStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      let rot = (Math.PI / 2) * 3 + rotation;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.save();
      context.globalAlpha = Math.max(0, alpha);
      context.beginPath();
      context.moveTo(cx, cy - outerRadius);

      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
      context.fillStyle = color;
      context.shadowColor = color;
      context.shadowBlur = 8;
      context.fill();
      context.restore();
    };

    const createParticle = (x: number, y: number, isBurst = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 4 + 1.5 : Math.random() * 1.8 + 0.3;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.15,
        size: Math.random() * (isBurst ? 6.5 : 5) + 1.8,
        alpha: 1,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.12,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.group') ||
          target.getAttribute('role') === 'button')
      ) {
        isHoveringClickable = true;
      } else {
        isHoveringClickable = false;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      // Spawn a rich stream of stardust stars along movement path
      if (dist > 2) {
        const count = isHoveringClickable ? 6 : 3;
        for (let i = 0; i < count; i++) {
          createParticle(
            lastX + (dx / count) * i + (Math.random() - 0.5) * 8,
            lastY + (dy / count) * i + (Math.random() - 0.5) * 8
          );
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onClick = (e: MouseEvent) => {
      // Spawn burst of 18 stars on click
      for (let i = 0; i < 18; i++) {
        createParticle(e.clientX, e.clientY, true);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update stardust trail (slower decay for longer trail)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.016; // Slower fade-out for longer star trail
        p.rotation += p.rotationSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        drawStar(ctx, p.x, p.y, 4, p.size, p.size / 2, p.color, p.alpha, p.rotation);
      }

      // Draw Shooting Star Cursor Head (Enlarges into bright gold star when hovering clickable items)
      if (lastX > 0 && lastY > 0) {
        const starSize = isHoveringClickable ? 15 : 8;
        const innerSize = isHoveringClickable ? 6.5 : 3.5;
        const starColor = isHoveringClickable ? '#fbbf24' : '#8b5cf6';

        drawStar(ctx, lastX, lastY, 4, starSize, innerSize, starColor, 1, Date.now() * 0.004);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 hidden md:block"
    />
  );
}
