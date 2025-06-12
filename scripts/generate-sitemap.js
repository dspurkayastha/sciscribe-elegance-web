#!/usr/bin/env node

/**
 * Sitemap Generator Script
 * 
 * This script automatically generates a sitemap.xml file with all the routes in your application.
 * It should be run as part of your build process to ensure the sitemap is always up to date.
 */

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://www.sciscribesolutions.com';
const PUBLIC_DIR = path.join(__dirname, '../public');

// Define your routes here - update this list when adding new pages
const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  { path: '/pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/portfolio', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'yearly' },
  { path: '/feedback', priority: 0.6, changefreq: 'yearly' },
  { path: '/payment', priority: 0.6, changefreq: 'yearly' },
  { path: '/privacy', priority: 0.4, changefreq: 'yearly' },
  { path: '/terms', priority: 0.4, changefreq: 'yearly' },
  { path: '/refund', priority: 0.4, changefreq: 'yearly' },
  { path: '/summer-offer', priority: 0.85, changefreq: 'monthly' },
  { path: '/thank-you', priority: 0.3, changefreq: 'yearly' },
];

// Exclude patterns - routes that should not be in the sitemap
const excludePatterns = [
  /^\/admin/,
  /^\/dashboard/,
  /^\/api/,
];

// Function to check if a route should be excluded
const shouldExclude = (path) => {
  return excludePatterns.some(pattern => pattern.test(path));
};

// Filter out excluded routes
const includedRoutes = routes.filter(route => !shouldExclude(route.path));

// Get today's date in ISO format (YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${includedRoutes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>
`;

// Self-executing async function to handle the async prettier formatting
(async () => {
  try {
    // Format the XML with prettier (async in newer versions)
    const formattedSitemap = await prettier.format(sitemap, {
      parser: 'html',
      printWidth: 100,
    });

    // Write the sitemap to the public directory
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), formattedSitemap);

    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
})();
