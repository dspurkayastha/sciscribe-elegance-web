import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessSchemaProps {
  path?: string;
}

/**
 * Component to add LocalBusiness structured data to your website
 * This helps Google understand your business information for local search results
 * and Google Maps listings
 */
const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({ path }) => {
  // Base URL for canonical URLs
  const baseUrl = 'https://www.sciscribesolutions.com';
  const pageUrl = path ? `${baseUrl}${path}` : baseUrl;
  
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SciScribe Solutions',
    description: 'Expert scientific editing, publication support, and research consultancy that transforms your work into compelling scientific narratives.',
    url: 'https://www.sciscribesolutions.com',
    logo: 'https://www.sciscribesolutions.com/images/logo.png',
    image: 'https://www.sciscribesolutions.com/images/og-image.png',
    telephone: '+919395582679',
    email: 'contact@sciscribesolutions.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '24:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61576386514296',
      'https://www.instagram.com/sciscribesolutions_ig/',
      'https://www.linkedin.com/company/sciscribe-solutions',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
