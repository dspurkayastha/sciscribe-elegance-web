# TODO: aakhyan.health SEO & AI Search Fixes

Audit date: 2026-04-08
Hosting: Vercel (Mumbai/bom1 region)

## Critical (Fix Immediately)

- [ ] **Create `robots.txt`** — currently returns 404 (search engines can't discover crawl rules)
  - Allow all search bots (Googlebot, Bingbot)
  - Allow AI search bots (ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot)
  - Block AI training bots if desired (GPTBot, Google-Extended, CCBot, anthropic-ai)
  - Disallow any API/internal routes
  - Point to sitemap
  - Use Next.js `app/robots.ts` for dynamic generation
- [ ] **Create `sitemap.xml`** — currently returns 404 (search engines can't discover pages)
  - Include all public pages with proper priorities and lastmod dates
  - Use Next.js `app/sitemap.ts` for dynamic generation
- [ ] **Add JSON-LD structured data** — no schema.org markup exists
  - Add `SoftwareApplication` or `WebApplication` schema (product is a health-tech tool)
  - Add `Organization` schema with name, URL, logo
  - Add `MedicalWebPage` or `HealthTopicContent` schema if applicable
- [ ] **Submit to Google Search Console** — verify domain ownership and submit sitemap

## High Priority

- [ ] **Create `manifest.json`** — returns 404, needed for PWA support and mobile install
  - Add app name, icons, theme color, display mode
- [ ] **Add Content-Security-Policy header** — not configured (Vercel `headers` in next.config or `vercel.json`)
- [ ] **Register with Bing Webmaster Tools** — important for AI search (Copilot, ChatGPT use Bing index)

## Moderate

- [ ] **Add Ahrefs/analytics tracking** if desired (currently no analytics on this domain)
- [ ] **Add `twitter:site` and `twitter:creator`** handles to metadata
- [ ] **Consider adding a blog/content section** — fresh content improves search ranking and AI citation
- [ ] **Domain redirect consistency** — `aakhyan.health` uses 307 (temporary) to `www.aakhyan.health`; should be 301 (permanent) for SEO. Configure in Vercel dashboard or `vercel.json`.

## Notes

- Current meta tags (title, description, OG, Twitter card) are well-configured
- Site is fast (0.23s load, ~13KB compressed)
- Vercel provides good defaults: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Device tier detection script (`__AAKHYAN_TIER`) is a nice touch for adaptive performance
