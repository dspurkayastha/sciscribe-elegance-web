
import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  canonical?: string;
}

const Seo = ({
  title,
  description,
  keywords = "science, editing, publication, sciscribe, research, consulting, academic services, manuscript editing, scientific communication",
  image = "/favicon.ico",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "SciScribe Solutions",
  section,
  canonical
}: SeoProps) => {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (name: string, content: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Basic SEO tags
    setMetaTag("description", description ?? "");
    setMetaTag("keywords", keywords);
    
    // Robots
    setMetaTag("robots", "index, follow");
    
    // Canonical URL
    let canonicalTag = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonical || url || window.location.href;

    // Open Graph & Twitter
    const metaTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description ?? "" },
      { property: "og:image", content: image.startsWith('http') ? image : new URL(image, window.location.origin).toString() },
      { property: "og:type", content: type },
      { property: "og:url", content: url ?? window.location.href },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:title", content: title },
      { property: "twitter:description", content: description ?? "" },
      { property: "twitter:image", content: image.startsWith('http') ? image : new URL(image, window.location.origin).toString() },
      { property: "twitter:site", content: "@SciScribeSol" },
      // Article specific metadata
      { property: "article:published_time", content: publishedTime ?? "" },
      { property: "article:modified_time", content: modifiedTime ?? "" },
      { property: "article:author", content: author },
      { property: "article:section", content: section ?? "" }
    ];

    metaTags.forEach(({ property, content }) => {
      if (!content) return;
      
      let tag = document.querySelector(`meta[property='${property}'],meta[name='${property}']`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        // Fix for the error: Use setAttribute instead of directly setting the property
        if (property.startsWith("og:") || property.startsWith("article:")) {
          tag.setAttribute("property", property);
        } else {
          tag.setAttribute("name", property);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
    
    // Structured data for better SEO
    if (type === 'website' || type === 'webpage') {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SciScribe Solutions",
        "url": window.location.origin,
        "logo": new URL("/favicon.ico", window.location.origin).toString(),
        "sameAs": [
          "https://twitter.com/SciScribeSol",
          "https://www.linkedin.com/company/sciscribe-solutions"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-800-SCISCRIBE",
          "contactType": "customer service"
        }
      };
      
      let scriptTag = document.getElementById('structured-data');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    return () => {
      // Cleanup structured data when component unmounts
      const structuredDataScript = document.getElementById('structured-data');
      if (structuredDataScript) structuredDataScript.remove();
    };
  }, [title, description, keywords, image, url, type, publishedTime, modifiedTime, author, section, canonical]);

  return null;
};
export default Seo;
