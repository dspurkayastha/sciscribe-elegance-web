import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  mobileSrc?: string;
  mobileSizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  mobileSrc,
  sizes = '(max-width: 1200px) 100vw, 1200px',
  mobileSizes = '100vw',
  className = '',
  loading = 'lazy',
  ...props
}) => {
  const isMobile = useIsMobile();
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    setImgSrc(isMobile && mobileSrc ? mobileSrc : src || '');
  }, [isMobile, mobileSrc, src]);

  return (
    <img
      src={imgSrc || src}
      sizes={isMobile ? mobileSizes : sizes}
      className={`${className} w-full h-auto`}
      loading={loading}
      {...props}
      alt={props.alt || ''}
    />
  );
};
