
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

interface InteractiveBackgroundProps {
  className?: string;
}

export const InteractiveBackground = ({ className }: InteractiveBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const hueRef = useRef(0);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 120;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Update cursor glow position
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    const getRandomColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        // In dark mode: gold, purple, blue tones
        const colors = [
          'rgba(255, 193, 7, 0.7)', // Gold
          'rgba(139, 92, 246, 0.5)', // Purple
          'rgba(14, 165, 233, 0.5)', // Blue
          'rgba(20, 184, 166, 0.6)', // Teal
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      } else {
        // In light mode: subtle blues, purples and golds
        const colors = [
          'rgba(10, 25, 47, 0.3)', // Navy
          'rgba(139, 92, 246, 0.3)', // Purple
          'rgba(14, 165, 233, 0.25)', // Blue
          'rgba(255, 193, 7, 0.4)', // Gold
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    };

    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1,
          color: getRandomColor(),
          hue: Math.random() * 360,
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
      particlesRef.current = particles;
    };

    const connectParticles = () => {
      const maxDistance = 160;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // More pronounced connections near the mouse
            const mouseDistance = Math.sqrt(
              Math.pow(mouseRef.current.x - (particles[i].x + particles[j].x) / 2, 2) +
              Math.pow(mouseRef.current.y - (particles[i].y + particles[j].y) / 2, 2)
            );
            
            const maxMouseEffect = 300;
            const mouseEffect = mouseDistance < maxMouseEffect 
              ? (maxMouseEffect - mouseDistance) / maxMouseEffect 
              : 0;
            
            const opacity = (1 - distance / maxDistance) * (0.15 + mouseEffect * 0.2);
            
            // Use gradient for lines
            const isDark = document.documentElement.classList.contains('dark');
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y, 
              particles[j].x, particles[j].y
            );
            
            if (isDark) {
              gradient.addColorStop(0, `hsla(${particles[i].hue}, 70%, 60%, ${opacity})`);
              gradient.addColorStop(1, `hsla(${particles[j].hue}, 70%, 60%, ${opacity})`);
            } else {
              gradient.addColorStop(0, `hsla(${particles[i].hue}, 50%, 40%, ${opacity * 0.7})`);
              gradient.addColorStop(1, `hsla(${particles[j].hue}, 50%, 40%, ${opacity * 0.7})`);
            }

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.min(1.5, (1 - distance / maxDistance) * 3);
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hueRef.current = (hueRef.current + 0.5) % 360;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Pulsate size
        p.pulse += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulse) * 0.2 + 1;
        
        // Mouse attraction with improved physics
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const attraction = 0.03;
          
          p.speedX += Math.cos(angle) * force * attraction;
          p.speedY += Math.sin(angle) * force * attraction;
          
          // Increase opacity and adjust hue near mouse
          p.opacity = Math.min(0.8, p.opacity + force * 0.1);
          p.hue = (p.hue + 0.5) % 360;
        } else {
          // Gradually return to original opacity
          p.opacity = Math.max(0.1, p.opacity * 0.995);
        }
        
        // Update position with improved physics
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Add friction and randomness for more organic movement
        p.speedX *= 0.98;
        p.speedY *= 0.98;
        p.speedX += (Math.random() - 0.5) * 0.01;
        p.speedY += (Math.random() - 0.5) * 0.01;
        
        // Edge boundaries with bounce effect
        if (p.x <= 0 || p.x >= canvas.width) {
          p.speedX *= -0.8;
          p.x = p.x <= 0 ? 1 : canvas.width - 1;
        }
        if (p.y <= 0 || p.y >= canvas.height) {
          p.speedY *= -0.8;
          p.y = p.y <= 0 ? 1 : canvas.height - 1;
        }
        
        // Draw particle with glow effect
        const isDark = document.documentElement.classList.contains('dark');
        let fillStyle;
        
        if (distance < maxDistance) {
          // Particles near cursor get special colors
          const intensity = (maxDistance - distance) / maxDistance;
          fillStyle = isDark
            ? `hsla(${p.hue}, 80%, 60%, ${p.opacity + intensity * 0.3})`
            : `hsla(${p.hue}, 70%, 50%, ${p.opacity + intensity * 0.2})`;
        } else {
          fillStyle = p.color;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        
        // Add subtle glow
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulseFactor * 2, 0, Math.PI * 2);
          ctx.fillStyle = isDark 
            ? `rgba(255, 255, 255, ${p.opacity * 0.15})` 
            : `rgba(10, 25, 47, ${p.opacity * 0.05})`;
          ctx.fill();
        }
      }
      
      connectParticles();
      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    createParticles();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed -z-10 h-full w-full transition-opacity duration-1000 ${className}`}
      />
      <div 
        ref={cursorGlowRef}
        className="pointer-events-none fixed z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-sciscribe-gold/20 to-transparent opacity-70 blur-xl dark:from-sciscribe-gold/30"
      />
    </>
  );
};
