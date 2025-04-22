import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import gsap from "gsap";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    
    const follower = document.createElement("div");
    follower.classList.add("cursor-follower");
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);
    
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    
    const animation = gsap.to({}, {
      duration: 0.008,
      repeat: -1,
      onRepeat: () => {
        posX += (mouseX - posX) / 1.5;
        posY += (mouseY - posY) / 1.5;
        
        gsap.set(follower, {
          x: posX - 10,
          y: posY - 10
        });
        
        gsap.set(cursor, {
          x: mouseX - 3,
          y: mouseY - 3
        });
      }
    });
    
    const handleMouseMove = (e) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleLinkHoverStart = () => {
      setIsHovered(true);
      cursor.classList.add("active");
      follower.classList.add("active");
    };
    
    const handleLinkHoverEnd = () => {
      setIsHovered(false);
      cursor.classList.remove("active");
      follower.classList.remove("active");
    };
    
    const handleMouseDown = () => {
      setIsActive(true);
      cursor.classList.add("clicked");
      follower.classList.add("clicked");
    };
    
    const handleMouseUp = () => {
      setIsActive(false);
      cursor.classList.remove("clicked");
      follower.classList.remove("clicked");
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, label, textarea, select, .link'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverStart);
      el.addEventListener("mouseleave", handleLinkHoverEnd);
    });
    
    const updateCursorTheme = () => {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = theme === "dark" || (theme === "system" && systemDarkMode);
      
      document.documentElement.style.setProperty(
        "--cursor-color", 
        isDark ? "#ffffff" : "#000000"
      );
      document.documentElement.style.setProperty(
        "--cursor-follower-color", 
        isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
      );
    };
    
    updateCursorTheme();
    
    return () => {
      animation.kill();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
      
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      
      if (follower.parentNode) {
        follower.parentNode.removeChild(follower);
      }
    };
  }, [theme]);

  return null;
};

export default CustomCursor;
