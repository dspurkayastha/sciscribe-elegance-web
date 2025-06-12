import { Helmet } from 'react-helmet-async';
import CanonicalUrl from './CanonicalUrl';

interface SEOHeadProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'service';
  image?: string;
  schema?: Record<string, unknown>;
  path?: string;
}

/**
 * Comprehensive SEO component that adds all necessary meta tags and structured data
 * to improve search engine visibility and understanding
 */
const SEOHead = ({
  title = 'SciScribe Solutions - Professional Scientific Writing Services',
  description = 'Expert scientific editing, writing, and publication support services for researchers and academics.',
  type = 'website',
  image = 'https://www.sciscribesolutions.com/images/og-image.png',
  schema,
  path = '/',
}: SEOHeadProps) => {
  // Default organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SciScribe Solutions',
    url: 'https://www.sciscribesolutions.com',
    logo: 'https://www.sciscribesolutions.com/images/logo.png',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61576386514296',
      'https://www.instagram.com/sciscribesolutions_ig/',
      'https://www.linkedin.com/company/sciscribe-solutions',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919395582679',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  };

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SciScribe Solutions',
    url: 'https://www.sciscribesolutions.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.sciscribesolutions.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // Combine with any custom schema provided
  const fullSchema = [organizationSchema, websiteSchema, ...(schema ? [schema] : [])];

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(fullSchema)}
        </script>
      </Helmet>
      
      {/* Add canonical URL */}
      <CanonicalUrl path={path} />
    </>
  );
};

export default SEOHead;
