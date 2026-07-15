import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from './ReducedMotionProvider';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMobile = window.innerWidth < 768;
    let frameId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    const colors = ['#168BFF', '#49E8FF', '#FFD43B', '#FF7A00'];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const maxParticles = isMobile ? 18 : 36;
      const spawnChance = isMobile ? 0.94 : 0.84;

      if (particles.length < maxParticles && Math.random() > spawnChance) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 1,
          vy: -Math.random() * 2 - 0.5,
          life: 0,
          maxLife: Math.random() * 200 + 100,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life >= p.maxLife || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - progress);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * (isMobile ? 0.22 : 0.34);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      frameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
    />
  );
};
