import { Helmet } from 'react-helmet-async';

interface CanonicalUrlProps {
  baseUrl?: string;
  path?: string;
}

/**
 * Component that adds a canonical URL tag to the page head
 * This helps search engines understand the preferred URL for the page
 * and prevents duplicate content issues
 * 
 * Note: This component can be used both inside and outside of Router context
 * If used outside Router context, provide the path prop
 * If used inside Router context, use the RouterAwareCanonicalUrl component instead
 */
const CanonicalUrl = ({ 
  baseUrl = 'https://www.sciscribesolutions.com',
  path = '/' 
}: CanonicalUrlProps) => {
  const canonicalUrl = `${baseUrl}${path}`;
  
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalUrl;
