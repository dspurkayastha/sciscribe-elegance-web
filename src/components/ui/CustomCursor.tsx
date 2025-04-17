
import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import gsap from "gsap";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { theme } = useTheme();

  // Use effect to initialize the custom cursor
  useEffect(() => {
    // Create cursor elements if they don't exist
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
    
    // GSAP animation for smooth cursor movement with adjusted easing
    const animation = gsap.to({}, {
      duration: 0.016, // Higher framerate for smoother movement
      repeat: -1,
      onRepeat: () => {
        // Adjust damping factor for smoother following (closer to 1 = more direct tracking)
        posX += (mouseX - posX) / 5;
        posY += (mouseY - posY) / 5;
        
        // Position the follower (larger element)
        gsap.set(follower, {
          x: posX - 10, // Center the follower
          y: posY - 10
        });
        
        // Position the cursor (small dot) directly at mouse position
        gsap.set(cursor, {
          x: mouseX - 3, // Center the cursor
          y: mouseY - 3
        });
      }
    });
    
    // Track mouse movement
    const handleMouseMove = (e) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Handle mouse enter/leave for the document
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Handle interactive elements
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
    
    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    // Apply to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, label, textarea, select, .link'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverStart);
      el.addEventListener("mouseleave", handleLinkHoverEnd);
    });
    
    // Set initial cursor color based on system or user preference
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
    
    // Set cursor color immediately when component mounts
    updateCursorTheme();
    
    // Clean up
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

  // Don't render anything as we're appending directly to the body
  return null;
};

export default CustomCursor;
