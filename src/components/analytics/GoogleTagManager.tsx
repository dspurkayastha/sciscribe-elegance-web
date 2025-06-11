import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initDataLayer, pushPageView } from '@/utils/gtm';

interface GoogleTagManagerProps {
  children?: React.ReactNode;
}

/**
 * GoogleTagManager component initializes the dataLayer and tracks page views
 * This component should be placed high in your component tree
 */
const GoogleTagManager = ({ children }: GoogleTagManagerProps) => {
  const location = useLocation();

  // Initialize dataLayer on mount
  useEffect(() => {
    initDataLayer();
  }, []);

  // Track page views when location changes
  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    pushPageView(path, title);
  }, [location]);

  return <>{children}</>;
};

export default GoogleTagManager;
