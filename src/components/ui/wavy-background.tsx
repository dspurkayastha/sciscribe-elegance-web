"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";
 
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const wRef = useRef<number>(0);
  const hRef = useRef<number>(0);
  const ntRef = useRef<number>(0);
  const animationIdRef = useRef<number>(0);
  
  const getSpeed = useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);
 
  const drawWave = useCallback((n: number, ctx: CanvasRenderingContext2D) => {
    const waveColors = colors ?? [
      "#38bdf8",
      "#818cf8",
      "#c084fc",
      "#e879f9",
      "#22d3ee",
    ];
    ntRef.current += getSpeed();
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 80; // Increased default width
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (let x = 0; x < wRef.current; x += 8) { // Increased step size for more dispersion
        const y = noise(x / 400, 0.5 * i, ntRef.current) * 150; // Increased noise frequency and amplitude
        ctx.lineTo(x, y + hRef.current * 0.38); // Moved waves down by increasing multiplier from 0.5 to 0.6
      }
      ctx.stroke();
      ctx.closePath();
    }
  }, [getSpeed, noise, colors, waveWidth]);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctxRef.current = ctx;
    wRef.current = ctx.canvas.width = window.innerWidth;
    hRef.current = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    ntRef.current = 0;
    
    const handleResize = () => {
      if (!ctxRef.current) return;
      wRef.current = ctxRef.current.canvas.width = window.innerWidth;
      hRef.current = ctxRef.current.canvas.height = window.innerHeight;
      ctxRef.current.filter = `blur(${blur}px)`;
    };
    
    window.addEventListener('resize', handleResize);
    
    const renderFrame = () => {
      if (!ctxRef.current) return;
      
      const ctx = ctxRef.current;
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, wRef.current, hRef.current);
      drawWave(5, ctx);
      animationIdRef.current = requestAnimationFrame(renderFrame);
    };
    
    renderFrame();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [blur, backgroundFill, waveOpacity, drawWave]);
 
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);
 
  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
