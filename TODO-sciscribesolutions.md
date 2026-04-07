# TODO: sciscribesolutions.com SEO & AI Search Fixes

Audit date: 2026-04-08

## Critical (Fix Immediately)

- [x] **Unblock AI search bots in robots.txt**
  - Allowed: `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `meta-externalagent`
  - Removed `Claude-Web` block (obsolete bot name)
  - Keep blocking training-only: `GPTBot`, `Google-Extended`, `CCBot`, `anthropic-ai`
- [x] **Fix manifest.json icons** — pointed to existing `/apple-icon.png` and `/icon.png`
- [x] **Add HSTS + security headers** via `next.config.mjs` `headers()` (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)

## High Priority

- [x] **Fix Twitter card metadata** — added `twitter:image` with OG image to root layout
- [ ] **Add `twitter:site` and `twitter:creator` handles** — need Twitter/X handle from owner
- [x] **Update sitemap.xml `lastmod` dates** — updated all page dates to 2026-04-08
- [x] **Add social profiles to live JSON-LD** (`JsonLd.tsx`) — Facebook, Instagram, LinkedIn added to `sameAs`
- [x] **Add canonical URL to `/blog` page** — added `alternates.canonical`
- [ ] **Add CSP header** — skipped for now, requires auditing all script sources to avoid breakage

## Moderate

- [x] **Remove dead SEO components** — deleted `SEOHead.tsx`, `LocalBusinessSchema.tsx`, `SEOPage.tsx`, `CanonicalUrl.tsx`, `RouterAwareCanonicalUrl.tsx`
- [x] **Remove legacy pages** — deleted `src/legacy_pages/` and `src/App.tsx` (unused by App Router)
- [ ] **Verify Caddy gzip/brotli compression** is enabled — requires VPS access
- [ ] **Add Organization schema** to JSON-LD (strengthens brand signals beyond ProfessionalService)
- [ ] **Address Dependabot vulnerabilities** — 18 flagged on GitHub (9 high, 6 moderate, 3 low)

## Informational

- Google Search Console verification block in layout.tsx is commented out (using HTML file method instead — works fine)
- Heavy client-side bundle (Three.js + Framer Motion + GSAP + Lenis) may impact Core Web Vitals — monitor with Lighthouse
