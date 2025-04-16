
import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { Pen } from "lucide-react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);
    
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Track hover state for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, label, textarea, select');
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverStart);
      el.addEventListener("mouseleave", handleLinkHoverEnd);
    });
    
    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
    };
  }, []);

  // Get cursor styles based on theme
  const getCursorGlowColor = () => {
    return theme === 'dark' ? 'var(--cursor-glow-dark)' : 'var(--cursor-glow-light)';
  };

  const cursorOutlineStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: linkHovered ? '60px' : '40px',
    height: linkHovered ? '60px' : '40px',
    opacity: hidden ? 0 : 0.7,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : 1})`,
    backgroundColor: getCursorGlowColor(),
  };

  const cursorIconStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    transform: `translate(-50%, -50%) rotate(45deg) scale(${clicked ? 0.8 : 1})`,
    visibility: linkHovered ? 'hidden' : 'visible',
  };

  const cursorPointerStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : (linkHovered ? 1 : 0),
    transform: `translate(-50%, -50%)`,
  };

  // Only render on non-touch devices
  if ('ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Outer glow */}
      <div className="cursor-outline" style={cursorOutlineStyle}></div>
      
      {/* Pen cursor for normal state */}
      <div className="cursor-pen" style={cursorIconStyle}>
        <Pen size={16} strokeWidth={2} className="text-primary" />
      </div>
      
      {/* Pointer cursor for clickable elements */}
      <div className="cursor-pointer" style={cursorPointerStyle}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M7 2L17 12L11 12L8 18L4.5 8L7 2Z" 
            fill="currentColor" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
