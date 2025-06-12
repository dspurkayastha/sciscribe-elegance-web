
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

export type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string;
  schema?: Record<string, unknown>;
  noindex?: boolean;
  trackPageView?: boolean;
  path?: string;
};

export const Seo = ({
  title = "SciScribe | Professional Scientific Editing & Writing Services",
  description = "SciScribe offers professional scientific editing, manuscript preparation, and illustration services to help researchers publish their work effectively.",
  image = "/images/og-image.png",
  article = false,
  keywords = "scientific editing, manuscript preparation, scientific illustrations, research papers, academic publishing",
  schema,
  noindex = false,
  trackPageView = true,
  path = "/", // Default path for when used outside of Router context
}: SeoProps): JSX.Element => {
  const { logPageView } = useAnalytics();
  const siteUrl = "https://www.sciscribesolutions.com"; // Updated to match your actual domain
  const url = `${siteUrl}${path}`;
  const canonicalUrl = url.endsWith("/") ? url : `${url}/`;

  // Format page title
  const seoTitle = 
    title === "SciScribe | Professional Scientific Editing & Writing Services" 
      ? title 
      : `${title} | SciScribe`;

  // Track page view when component mounts if enabled
  useEffect(() => {
    if (trackPageView) {
      logPageView(path);
    }
  }, [path, logPageView, trackPageView]);

  // Default organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SciScribe Solutions",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "sameAs": [
      "https://twitter.com/sciscribe",
      "https://www.linkedin.com/company/sciscribe-solutions"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SciScribe Solutions",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Service schema for service pages
  const serviceSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "provider": {
      "@type": "Organization",
      "name": "SciScribe Solutions"
    },
    "description": description,
    "url": url
  } : null;

  // Combine with any custom schema provided
  const fullSchema = [
    organizationSchema,
    websiteSchema,
    ...(serviceSchema ? [serviceSchema] : []),
    ...(schema ? [schema] : [])
  ];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph Tags for social sharing */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      {article && <meta property="og:type" content="article" />}
      {!article && <meta property="og:type" content="website" />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(fullSchema)}
      </script>
      
      {/* Additional meta tags for better SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SciScribe" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Remove dynamic meta tag addition that was causing TypeScript errors */}
    </Helmet>
  );
};

export default Seo;
