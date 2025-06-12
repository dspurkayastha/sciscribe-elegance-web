import { useLocation } from 'react-router-dom';
import CanonicalUrl from './CanonicalUrl';

interface RouterAwareCanonicalUrlProps {
  baseUrl?: string;
}

/**
 * Router-aware version of CanonicalUrl that uses the current location from React Router
 * This component must be used inside a Router context
 */
const RouterAwareCanonicalUrl = ({ baseUrl }: RouterAwareCanonicalUrlProps) => {
  const location = useLocation();
  return <CanonicalUrl baseUrl={baseUrl} path={location.pathname} />;
};

export default RouterAwareCanonicalUrl;
