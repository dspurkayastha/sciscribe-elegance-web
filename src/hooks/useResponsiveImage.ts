import { useState, useEffect } from 'react';

/**
 * Custom hook to load different image sources based on screen width
 * This helps optimize LCP performance by loading smaller images on mobile devices
 */
export function useResponsiveImage(
  desktopSrc: string,
  mobileSrc: string,
  mobileBreakpoint: number = 768
): string {
  const [imageSrc, setImageSrc] = useState<string>(
    window.innerWidth > mobileBreakpoint ? desktopSrc : mobileSrc
  );

  useEffect(() => {
    // Function to update image source based on window width
    const updateImageSrc = () => {
      const newSrc = window.innerWidth > mobileBreakpoint ? desktopSrc : mobileSrc;
      if (newSrc !== imageSrc) {
        setImageSrc(newSrc);
      }
    };

    // Set initial image source
    updateImageSrc();

    // Add event listener for window resize
    window.addEventListener('resize', updateImageSrc);

    // Clean up event listener
    return () => window.removeEventListener('resize', updateImageSrc);
  }, [desktopSrc, mobileSrc, mobileBreakpoint, imageSrc]);

  return imageSrc;
}

export default useResponsiveImage;
