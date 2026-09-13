// tools/prerender-meta.js
// Post-build step: emit per-route static HTML shells so social scrapers and
// no-JS crawlers see route-correct <head> meta (title, description, OG).
// Body stays the SPA shell; runtime react-helmet-async takes over once JS loads.
//
// KEEP IN SYNC with:
//   - src/components/PageMeta.jsx (pageSpecificMeta titles/descriptions)
//   - src/content/blog.js (post slugs/titles/descriptions)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/content/blog.js';

const SITE = 'https://www.thegrowthbench.com';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

// Mirrors BlogPost.jsx slugToCategoryImage (PNG only — crawlers need raster).
const CATEGORY_IMAGE = {
  'Growth Strategy': '/assets/images/og-growth-strategy.png',
  CRO: '/assets/images/og-cro.png',
  'Google Ads': '/assets/images/og-google-ads.png',
  'Meta Ads': '/assets/images/og-meta-ads.png',
  'Lead Systems': '/assets/images/og-lead-systems.png',
  'UI/UX': '/assets/images/og-ui-ux.png',
  'Website Dev': '/assets/images/og-website-dev.png',
  'Marketing Strategy': '/assets/images/og-marketing-strategy.png',
};

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const ROUTES = [
  { path: '/', title: 'The Growth Bench — Agentic AI + Full-Stack Growth for D2C', description: 'Full-stack growth partner for D2C brands and early-stage startups. Agentic AI for ops, support, content and follow-ups, plus strategy, performance marketing, CRO, and web — under one roof. Book a free audit call.', image: '/assets/images/og-card.png' },
  { path: '/services/', title: 'Growth Services for D2C Brands | The Growth Bench', description: 'Growth strategy, ads, CRO, web, AI implementation, analytics and more — the full stack for D2C brands and startups.', image: '/assets/images/og-card.png' },
  { path: '/about/', title: 'About The Growth Bench — Who We Are and How We Work', description: "We're a senior-led growth consultancy with specialists on demand — built for D2C brands and startups that outgrew freelancers but don't want agency overhead.", image: '/assets/images/og-card.png' },
  { path: '/case-studies/', title: 'Case Studies & Client Results | The Growth Bench', description: 'Real outcomes with real numbers from clients across D2C, B2B SaaS, education, and more. CRO, ads, web development, AI implementation, and full-funnel strategy.', image: '/assets/images/og-card.png' },
  { path: '/insights/', title: 'Growth Frameworks & Teardowns | The Growth Bench', description: 'Actionable growth advice, CRO teardowns, and marketing strategy frameworks for D2C brands and early-stage startups.', image: '/assets/images/og-card.png' },
  { path: '/pricing/', title: 'Work With Us — Start With a Free Funnel Audit | The Growth Bench', description: 'Tell us where growth hurts, then get a scoped plan after a free 30-minute audit call. No fixed prices — just what moves your funnel.', image: '/assets/images/og-card.png' },
  { path: '/compare/', title: 'Freelancer vs Agency vs Bench | The Growth Bench', description: 'Compare freelancers, agencies, and the Growth Bench bench model on context, speed, and overhead. Built for D2C brands doing ₹10L–₹10Cr/month.', image: '/assets/images/og-card.png' },
  { path: '/solutions/recover-abandoned-carts/', title: 'Cart Recovery Service for D2C | The Growth Bench', description: 'Checkout abandonment 73.1% to 53.9% in a 22-day A/B test, ~$345K/month recovered. The exact cart and checkout recovery playbook for D2C brands.', image: '/assets/images/og-cro.png' },
  { path: '/ai-scorecard/', title: 'Automation Readiness Scorecard | The Growth Bench', description: 'A few taps, a minute, instant readout. Score how much agentic AI can take off your plate — support, ops, content, follow-ups, creative — with recoverable hours and a ₹ range.', image: '/assets/images/og-card.png' },
  { path: '/privacy/', title: 'Privacy Policy | The Growth Bench', description: 'The Growth Bench privacy policy — how we collect, use, and protect your personal data when you visit our website or use our services.', image: '/assets/images/og-card.png' },
  { path: '/terms/', title: 'Terms of Service | The Growth Bench', description: 'The Growth Bench terms of service — the terms and conditions that govern your use of our website and growth consulting services.', image: '/assets/images/og-card.png' },
  ...blogPosts.map((p) => ({
    path: `/insights/${p.slug}/`,
    title: `${p.title} | The Growth Bench Insights`,
    description: p.description,
    image: CATEGORY_IMAGE[p.category] || '/assets/images/og-card.png',
  })),
];

const shell = readFileSync(join(DIST, 'index.html'), 'utf-8');

const render = (route) => {
  const url = `${SITE}${route.path}`;
  const image = `${SITE}${route.image}`;
  let html = shell;
  const sub = (re, val) => { html = html.replace(re, val); };
  sub(/<title>.*?<\/title>/, `<title>${esc(route.title)}</title>`);
  sub(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(route.description)}" />`);
  sub(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`);
  sub(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`);
  sub(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${esc(route.title)}" />`);
  sub(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${esc(route.description)}" />`);
  sub(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`);
  sub(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${esc(route.title)}" />`);
  sub(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${esc(route.description)}" />`);
  sub(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${image}" />`);
  return html;
};

let count = 0;
for (const route of ROUTES) {
  const html = render(route);
  if (route.path === '/') {
    writeFileSync(join(DIST, 'index.html'), html);
  } else {
    const rel = route.path.replace(/^\//, '').replace(/\/$/, '');
    mkdirSync(join(DIST, dirname(rel)), { recursive: true });
    writeFileSync(join(DIST, `${rel}.html`), html);
    mkdirSync(join(DIST, rel), { recursive: true });
    writeFileSync(join(DIST, rel, 'index.html'), html);
  }
  count += 1;
}
console.log(`prerender-meta: wrote ${count} route shells`);
