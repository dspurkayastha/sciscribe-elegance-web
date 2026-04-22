# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SciScribe Solutions — a marketing and services website for medical & scientific writing. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 3, shadcn/ui, and Firebase. Dark-mode-only, premium aesthetic with fluid 3D backgrounds, GSAP/Framer Motion animations, and zero border radius throughout.

## Commands

```bash
npm run dev       # Dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
npm start         # Production server
```

Firebase Cloud Functions (in `functions/`):
```bash
cd functions && npm install
firebase deploy --only functions    # Deploy functions
firebase deploy --only firestore    # Deploy Firestore rules
```

No test suite is configured. Playwright is a dependency but has no test files.

## Architecture

### App Router Pages

All pages use `"use client"` — client-side rendered with server-side metadata in `layout.tsx`.

- `/` — Home (HeroSection, ApolloSection, WhyChooseUs, Services)
- `/contact` — Manuscript submission form with file uploads
- `/services`, `/pricing`, `/pricing/payment` — Service tiers
- `/blog`, `/blog/[slug]` — Blog (uses mock data from `lib/mock-blog.ts`)
- `/portfolio`, `/about`, `/feedback` — Static/form pages
- `/privacy`, `/terms`, `/refund` — Legal pages

### Layout Structure

Root layout (`src/app/layout.tsx`) wraps everything in:
`ThemeProvider` > `TooltipProvider` > `SmoothScroll` (Lenis) > `FluidIridescentBackground` (Three.js) + `SideNav` (fixed left rail, 32-48px) + content (`pl-32 md:pl-48`) + `Footer`

Global providers: two Toasters (Radix + Sonner), CookieConsent, PageViewTracker, JsonLd.

### Key Directories

- `src/components/sections/` — Page-level section components (HeroSection, PricingSection, etc.)
- `src/components/layout/` — SideNav, Footer, Navbar, CookieConsent, SmoothScroll
- `src/components/backgrounds/` — Three.js fluid iridescent background
- `src/components/ui/` — shadcn/ui components (60+)
- `src/hooks/` — useAnalytics, useAdminGuard, useFirebase, useResearchAuth
- `src/lib/firebase.ts` — Firebase app init (Firestore, Storage, Auth, Analytics)
- `src/lib/firestore.ts` — Firestore write helpers for forms
- `src/utils/analytics.ts` — GA4 event tracking with consent

### Firebase Backend

Project: `sciscribe-solutions` (region: asia-south1)

Services used: Firestore (form submissions), Storage (file uploads), Auth (Google OAuth), Analytics (GA4).

Firestore collections are write-only from client: `contacts`, `consultations`, `quick_contacts`, `feedback`. Security rules in `firestore.rules`.

Cloud Functions (`functions/src/`): `submitContactFormV2`, `submitConsultationForm`, `submitQuickContactForm` — all with CORS, honeypot spam detection, GDPR consent fields.

### Form Pattern

Forms follow: useState/React Hook Form > file upload to Firebase Storage > submit to Firestore via `lib/firestore.ts` > analytics event via `useAnalytics()` > toast notification > redirect.

### Analytics

Consent-based GA4 via `analytics_consent` localStorage key. Custom events: `form_submitted`, `cta_click`, `consultation_booked`, `file_uploaded`, `page_view`. CookieConsent component gates tracking.

## Design System

- **Dark mode only** — `<html className="dark">`, background `#020817`
- **Zero border radius** — all radii set to `0px` in Tailwind config
- **Brand colors** — `sciscribe-teal` (#14B8A6, primary), `sciscribe-purple` (#A855F7, accent), `sciscribe-navy` (#0B1B2A), `sciscribe-coral` (#F97066)
- **Gradients** — `gradient-primary` (teal>cyan), `gradient-secondary` (purple>pink), `gradient-gold`, `gradient-blue`
- **Fonts** — Inter (sans), Playfair Display (serif), Geist Mono (mono)
- **Animations** — GSAP for complex sequences, Framer Motion for component transitions, Tailwind animate utilities (fade-in, slide-up, float, shimmer, pulse-soft)

## Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Notes

- `legacy-peer-deps=true` in `.npmrc` — required for dependency resolution
- Firebase config is hardcoded in `src/lib/firebase.ts` (public client-side keys)
- TypeScript is loose: `noImplicitAny: false`, `strictNullChecks: false`
- shadcn/ui configured with `rsc: false` in `components.json`
- Supabase client exists in `src/integrations/supabase/` but is not actively used
- Deployed via Firebase Hosting. Domain: sciscribesolutions.com

---

## Behavioral Guidelines (take precedence over everything above in case of conflict)

Derived from Andrej Karpathy's observations on common LLM coding mistakes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
