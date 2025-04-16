
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

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

  const cursorDotStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: clicked ? '12px' : linkHovered ? '16px' : '8px',
    height: clicked ? '12px' : linkHovered ? '16px' : '8px',
    opacity: hidden ? 0 : 1,
    transform: `translate(-50%, -50%) scale(${linkHovered ? 0 : 1})`
  };

  const cursorOutlineStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: linkHovered ? '60px' : '40px',
    height: linkHovered ? '60px' : '40px',
    opacity: hidden ? 0 : 0.7,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : 1})`,
  };

  // Only render on non-touch devices
  if ('ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <div className="cursor-dot" style={cursorDotStyle}></div>
      <div className="cursor-outline" style={cursorOutlineStyle}></div>
    </>
  );
};

export default CustomCursor;
