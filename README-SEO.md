# SEO Implementation Notes (accurate as of 2026-09-12)

Vite + React SPA. Runtime head tags via `react-helmet-async` (`src/components/PageMeta.jsx`);
static per-route head snapshots via `tools/prerender-meta.js` (runs in `npm run build`).

## Routes & meta

- Per-route titles/descriptions/canonicals live in `pageSpecificMeta` (`PageMeta.jsx`).
  Every public page renders its own `<PageMeta />` — there is intentionally NO global
  instance in `App.jsx` (avoids duplicate titles + JSON-LD).
- `/admin/*` renders `<PageMeta noindex>` and `robots.txt` disallows `/admin/`.
  Query strings (`/insights?category=`) are also disallowed; canonicals never include them.
- Titles stay ≤60 chars; homepage title leads with the positioning wedge.

## Prerendered head snapshots

`tools/prerender-meta.js` mirrors `pageSpecificMeta` + `src/content/blog.js` into
`dist/<route>.html` + `dist/<route>/index.html` (11 hubs + 25 posts) so social
scrapers and no-JS crawlers see route-correct OG/Twitter meta. Keep the script's
ROUTES map in sync when titles/descriptions change. Body remains the SPA shell.

## Structured data

- Global: Organization + WebSite + BreadcrumbList (`PageMeta.jsx`).
- Posts: BlogPosting with Person author, publisher logo, absolute image,
  `mainEntityOfPage`, `inLanguage` + FAQPage where visible FAQs exist (`BlogPost.jsx`).
- OG images must be absolute PNG URLs (`/assets/images/og-*.png` in `public/`).

## Sitemap & robots

- `public/sitemap.xml`: 11 hubs + 25 posts. Priority ladder: `/` 1.0 >
  services/pricing/solutions 0.9 > compare/scorecard/case-studies 0.8 >
  insights 0.7 > posts 0.6 (per-post `lastmod` from real publish dates).
- Trailing-slash canonicals everywhere; Vercel serves prestatic shells first,
  SPA fallback handles the rest (`vercel.json`).

## Post-deploy gates

Lighthouse (Performance ≥ 90, Accessibility ≥ 95, SEO = 100), FB/X card
validators per key URL, sitemap validity, no duplicate JSON-LD entities.
