import React, { useRef, useState, useEffect } from "react";

const LightningSeparator: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState(50); // percent

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      let x = e.clientX;
      if (x < rect.left) x = rect.left;
      if (x > rect.right) x = rect.right;
      const percent = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
      setCenter(percent);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div ref={ref} className="relative flex justify-center items-center my-10 select-none">
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-sciscribe-gold/60 to-transparent blur-[2px] opacity-70 transition-all duration-300" />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-6 w-24 pointer-events-none z-20"
        style={{ left: `calc(${center}% - 3rem)` }}
      >
        <div className="glint w-full h-full" />
      </div>
    </div>
  );
};

export default LightningSeparator;
