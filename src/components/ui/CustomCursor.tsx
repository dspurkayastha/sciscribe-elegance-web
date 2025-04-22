
import { useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeProvider";

const CustomCursor = () => {
  const { theme } = useTheme();
  const yellowGlowRef = useRef<HTMLDivElement | null>(null);
  const whiteGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Yellow Glow
    let yellowGlow = document.getElementById("cursor-yellow-glow") as HTMLDivElement | null;
    if (!yellowGlow) {
      yellowGlow = document.createElement("div");
      yellowGlow.id = "cursor-yellow-glow";
      yellowGlow.className =
        "pointer-events-none fixed z-50 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-sciscribe-gold/20 to-transparent opacity-70 blur-xl dark:from-sciscribe-gold/30 transition-opacity duration-700";
      document.body.appendChild(yellowGlow);
    }
    yellowGlowRef.current = yellowGlow;

    // White Glow
    let whiteGlow = document.getElementById("cursor-white-glow") as HTMLDivElement | null;
    if (!whiteGlow) {
      whiteGlow = document.createElement("div");
      whiteGlow.id = "cursor-white-glow";
      whiteGlow.className =
        "pointer-events-none fixed z-50 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 dark:bg-white/20 blur-lg opacity-70 transition-opacity duration-300";
      document.body.appendChild(whiteGlow);
    }
    whiteGlowRef.current = whiteGlow;

    // Don't set cursor style - let the default cursor show
    // document.body.style.cursor = "pointer";

    let mouseX = 0;
    let mouseY = 0;
    let yellowX = 0;
    let yellowY = 0;
    let whiteX = 0;
    let whiteY = 0;

    const update = () => {
      // Animate the glow positions towards the real pointer (increased responsiveness)
      yellowX += (mouseX - yellowX) * 0.35; // more responsive
      yellowY += (mouseY - yellowY) * 0.35;
      whiteX += (mouseX - whiteX) * 0.45; // even more responsive
      whiteY += (mouseY - whiteY) * 0.45;

      if (yellowGlowRef.current) {
        yellowGlowRef.current.style.left = `${yellowX}px`;
        yellowGlowRef.current.style.top = `${yellowY}px`;
        yellowGlowRef.current.style.opacity = "1";
      }
      if (whiteGlowRef.current) {
        whiteGlowRef.current.style.left = `${whiteX}px`;
        whiteGlowRef.current.style.top = `${whiteY}px`;
        whiteGlowRef.current.style.opacity = "0.7";
      }
      requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    update();

    // Theme update for dark/light mode, just adjusts class (optional)
    const updateGlowColors = () => {
      const isDark =
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      if (yellowGlowRef.current)
        yellowGlowRef.current.className =
          isDark
            ? "pointer-events-none fixed z-50 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-sciscribe-gold/30 to-transparent opacity-70 blur-xl transition-opacity duration-700"
            : "pointer-events-none fixed z-50 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-sciscribe-gold/20 to-transparent opacity-70 blur-xl transition-opacity duration-700";
      if (whiteGlowRef.current)
        whiteGlowRef.current.className =
          isDark
            ? "pointer-events-none fixed z-50 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-lg opacity-70 transition-opacity duration-300"
            : "pointer-events-none fixed z-50 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-lg opacity-70 transition-opacity duration-300";
    };
    updateGlowColors();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (yellowGlowRef.current && yellowGlowRef.current.parentNode)
        yellowGlowRef.current.parentNode.removeChild(yellowGlowRef.current);
      if (whiteGlowRef.current && whiteGlowRef.current.parentNode)
        whiteGlowRef.current.parentNode.removeChild(whiteGlowRef.current);
    };
  }, [theme]);

  return null;
};

export default CustomCursor;
