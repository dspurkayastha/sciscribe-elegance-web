import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
}

interface ParticleGlowProps {
  /** Core color of each glow (any valid CSS color / rgba) */
  particleColor?: string;
  /** How many particles to show */
  particleCount?: number;
  /** [min, max] velocity in px/frame */
  speedRange?: [number, number];
  /** [min, max] radius in px */
  sizeRange?: [number, number];
  /** How big the glow extends relative to size (e.g. 3 = 3× radius) */
  glowSizeMultiplier?: number;
}

export function ParticleGlow({
  particleColor = 'rgba(20,185,166,0.6)',
  particleCount = 20,
  speedRange = [0.2, 0.6],
  sizeRange = [2, 4],
  glowSizeMultiplier = 3,
}: ParticleGlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Utility: random in [min, max)
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle HiDPI
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create drifting glow particles
    const initParticles = () => {
      const { width, height } = canvas.getBoundingClientRect();
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        size: rand(sizeRange[0], sizeRange[1]),
        vx: rand(...speedRange) * (Math.random() < 0.5 ? -1 : 1),
        vy: rand(...speedRange) * (Math.random() < 0.5 ? -1 : 1),
        color: particleColor,
        opacity: rand(0.3, 0.6),
      }));
    };

    initParticles();

    let animationId: number;
    const animate = () => {
      if (!ctx) return;
      const { width, height } = canvas.getBoundingClientRect();

      // Clear full canvas each frame
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw glow: large radial gradient circle
        const glowRadius = p.size * glowSizeMultiplier;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw core dot (optional)
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [particleCount, particleColor, speedRange, sizeRange, glowSizeMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
