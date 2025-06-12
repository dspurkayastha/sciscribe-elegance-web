import React from 'react';
import { Helmet } from 'react-helmet-async';
import CanonicalUrl from './CanonicalUrl';

interface SEOPageProps {
  children: React.ReactNode;
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'service';
  image?: string;
  publishedDate?: string;
  modifiedDate?: string;
  keywords?: string[];
  breadcrumbs?: Array<{
    name: string;
    path: string;
  }>;
}

/**
 * SEOPage component for optimizing individual pages for search engines
 * Includes schema.org structured data for better search engine understanding
 */
const SEOPage: React.FC<SEOPageProps> = ({
  children,
  title,
  description,
  path,
  type = 'website',
  image = 'https://www.sciscribesolutions.com/images/og-image.png',
  publishedDate,
  modifiedDate,
  keywords = [],
  breadcrumbs = [],
}) => {
  const baseUrl = 'https://www.sciscribesolutions.com';
  const fullUrl = `${baseUrl}${path}`;
  
  // Create breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      ...breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: `${baseUrl}${item.path}`,
      })),
    ],
  };

  // Create page schema based on type
  let pageSchema: Record<string, unknown>;
  
  if (type === 'article') {
    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      image,
      author: {
        '@type': 'Organization',
        name: 'SciScribe Solutions',
        url: baseUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'SciScribe Solutions',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo.png`,
        },
      },
      datePublished: publishedDate || new Date().toISOString(),
      dateModified: modifiedDate || new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
    };
  } else if (type === 'service') {
    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description,
      provider: {
        '@type': 'Organization',
        name: 'SciScribe Solutions',
        url: baseUrl,
      },
      url: fullUrl,
    };
  } else {
    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: fullUrl,
      lastReviewed: modifiedDate || new Date().toISOString(),
    };
  }

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={fullUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
        
        {/* Breadcrumb Schema */}
        {breadcrumbs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        )}
      </Helmet>
      
      {/* Add canonical URL */}
      <CanonicalUrl baseUrl={baseUrl} />
      
      {children}
    </>
  );
};

export default SEOPage;
