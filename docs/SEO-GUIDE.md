# SciScribe Elegance SEO Implementation Guide

This document provides a comprehensive overview of the SEO implementation for the SciScribe Elegance website, including best practices, component usage, and maintenance procedures.

## Table of Contents

1. [SEO Components](#seo-components)
2. [Structured Data](#structured-data)
3. [Meta Tags](#meta-tags)
4. [Canonical URLs](#canonical-urls)
5. [Sitemap Generation](#sitemap-generation)
6. [Google Search Console](#google-search-console)
7. [Analytics Integration](#analytics-integration)
8. [Maintenance Procedures](#maintenance-procedures)

## SEO Components

We've implemented several React components to manage SEO across the site:

### SEOHead Component

`SEOHead` is the base SEO component that adds essential meta tags and structured data to the document head. It's included in the `_document.tsx` file to ensure it's present on every page.

```tsx
// Example usage in _document.tsx
<SEOHead />
```

### SEOPage Component

`SEOPage` is a wrapper component for individual pages that adds page-specific SEO elements:

```tsx
<SEOPage
  title="Page Title"
  description="Page description for search engines"
  path="/page-path"
  type="website" // or "article" or "service"
  keywords={['keyword1', 'keyword2']}
>
  {/* Page content */}
</SEOPage>
```

### CanonicalUrl Component

`CanonicalUrl` automatically adds canonical URL tags based on the current route:

```tsx
<CanonicalUrl baseUrl="https://www.sciscribesolutions.com" />
```

## Structured Data

We've implemented several structured data components using Schema.org markup:

### LocalBusinessSchema

Adds local business information for Google Maps and local search results:

```tsx
<LocalBusinessSchema />
```

### FAQSchema

Adds FAQ structured data for rich results in search:

```tsx
<FAQSchema faqs={[
  { question: "Question text", answer: "Answer text" }
]} />
```

## Meta Tags

The following meta tags have been implemented:

- **Title**: Unique for each page
- **Description**: Concise summary of page content
- **Robots**: Set to "index, follow" to allow indexing
- **Canonical**: Points to the preferred URL for each page
- **Open Graph**: For social media sharing
- **Twitter Card**: For Twitter sharing

## Canonical URLs

Canonical URLs help prevent duplicate content issues. They're implemented via:

1. The `CanonicalUrl` component that automatically generates canonical URLs
2. Proper URL structure throughout the site

## Sitemap Generation

A sitemap generator script has been added to automatically create and update the sitemap.xml file:

- Located at `/scripts/generate-sitemap.js`
- Runs automatically during the build process
- Updates lastmod dates to the current date
- Includes all important pages with proper priorities

To manually generate the sitemap:

```bash
npm run generate-sitemap
```

## Google Search Console

A placeholder verification file has been added at `/public/google9f6d3d1e2c59f5b2.html`. To complete verification:

1. Register at [Google Search Console](https://search.google.com/search-console)
2. Download the actual verification file
3. Replace the placeholder with the downloaded file
4. Deploy the site
5. Submit your sitemap.xml in Search Console

## Analytics Integration

SEO components are integrated with analytics tracking:

- Page views are automatically tracked
- CTA clicks are tracked with detailed parameters
- Form submissions include conversion tracking

## Maintenance Procedures

To maintain optimal SEO:

1. **For new pages**:
   - Wrap the page content in the `SEOPage` component
   - Add the page to the sitemap generator script
   - Include appropriate structured data

2. **Regular checks**:
   - Monitor Google Search Console for indexing issues
   - Update content and meta descriptions for underperforming pages
   - Check for broken links and fix them

3. **After significant updates**:
   - Request re-indexing in Google Search Console
   - Update the sitemap if new pages were added
   - Verify analytics tracking is working correctly

Remember that SEO is an ongoing process. Regular monitoring and updates are essential for maintaining and improving search visibility.
