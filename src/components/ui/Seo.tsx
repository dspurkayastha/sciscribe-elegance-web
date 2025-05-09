
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string;
};

export const Seo = ({
  title = "SciScribe | Professional Scientific Editing & Writing Services",
  description = "SciScribe offers professional scientific editing, manuscript preparation, and illustration services to help researchers publish their work effectively.",
  image = "/og-image.jpg",
  article = false,
  keywords = "scientific editing, manuscript preparation, scientific illustrations, research papers, academic publishing",
}: SeoProps): JSX.Element => {
  const { pathname } = useLocation();
  const siteUrl = "https://sciscribe.com"; // Replace with actual site URL
  const url = `${siteUrl}${pathname}`;
  const canonicalUrl = url.endsWith("/") ? url : `${url}/`;

  // Format page title
  const seoTitle = 
    title === "SciScribe | Professional Scientific Editing & Writing Services" 
      ? title 
      : `${title} | SciScribe`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
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
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": article ? "Article" : "WebSite",
          "name": title,
          "description": description,
          "url": url,
          ...(article ? {
            "publisher": {
              "@type": "Organization",
              "name": "SciScribe",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
              }
            }
          } : {})
        })}
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
