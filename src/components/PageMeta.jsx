import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '@/lib/constants';

const defaultMeta = {
  title: "The Growth Bench — Full-Stack Growth Partner for D2C Brands & Startups",
  description: "Strategy, performance marketing, CRO, website development, lead systems, UI/UX, and AI implementation — under one roof with one lead who owns your full funnel. Book a free audit call.",
};

const pageSpecificMeta = {
  '/': {
    title: "The Growth Bench — Agentic AI + Full-Stack Growth for D2C",
    description: "Full-stack growth partner for D2C brands and early-stage startups. Agentic AI for ops, support, content and follow-ups, plus strategy, performance marketing, CRO, and web — under one roof. Book a free audit call."
  },
  '/services': {
    title: "Growth Services for D2C Brands | The Growth Bench",
    description: "Growth strategy, ads, CRO, web, AI implementation, analytics and more — the full stack for D2C brands and startups."
  },
  '/about': {
    title: "About The Growth Bench — Who We Are and How We Work",
    description: "We're a senior-led growth consultancy with specialists on demand — built for D2C brands and startups that outgrew freelancers but don't want agency overhead."
  },
  '/proof': {
    title: "Case Studies & Client Results | The Growth Bench",
    description: "Real outcomes with real numbers from clients across D2C, B2B SaaS, education, and more. CRO, ads, web development, AI implementation, and full-funnel strategy."
  },
  '/privacy': {
    title: "Privacy Policy | The Growth Bench",
    description: "The Growth Bench privacy policy — how we collect, use, and protect your personal data when you visit our website or use our services."
  },
  '/terms': {
    title: "Terms of Service | The Growth Bench",
    description: "The Growth Bench terms of service — the terms and conditions that govern your use of our website and growth consulting services."
  },
  '/insights': {
    title: "Growth Frameworks & Teardowns | The Growth Bench",
    description: "Actionable growth advice, CRO teardowns, and marketing strategy frameworks for D2C brands and early-stage startups."
  },
  '/resources': {
    title: "Growth Frameworks & Teardowns | The Growth Bench",
    description: "Actionable growth advice, CRO teardowns, and marketing strategy frameworks for D2C brands and early-stage startups."
  },
  '/get-started': {
    title: "Get Started — Book a Free Audit Call | The Growth Bench",
    description: "Start with a free scorecard or book a 30-minute audit call. One concrete recommendation, no pitch, no pressure."
  },
  '/pricing': {
    title: "Work With Us — Start With a Free Funnel Audit | The Growth Bench",
    description: "Tell us where growth hurts, then get a scoped plan after a free 30-minute audit call. No fixed prices — just what moves your funnel."
  },
  '/compare': {
    title: "Freelancer vs Agency vs Bench | The Growth Bench",
    description: "Compare freelancers, agencies, and the Growth Bench bench model on context, speed, and overhead. Built for D2C brands doing ₹10L–₹10Cr/month."
  },
  '/solutions/recover-abandoned-carts': {
    title: "Cart Recovery Service for D2C | The Growth Bench",
    description: "Checkout abandonment 73.1% to 53.9% in a 22-day A/B test, ~$425K/month recovered. The exact cart and checkout recovery playbook for D2C brands."
  },
  '/ai-scorecard': {
    title: "Automation Readiness Scorecard | The Growth Bench",
    description: "A few taps, a minute, instant readout. Score how much agentic AI can take off your plate — support, ops, content, follow-ups, creative — with recoverable hours and a ₹ range."
  }
};

const PageMeta = ({ title, description, noindex = false, articleSchema, ogImage: customOgImage }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const baseMeta = pageSpecificMeta[currentPath] || defaultMeta;
  const finalTitle = title || baseMeta.title;
  const finalDescription = description || baseMeta.description;

  const siteUrl = SITE_URL.endsWith('/') ? SITE_URL : `${SITE_URL}/`;
  const cleanPath = currentPath === '/' ? '' : currentPath.replace(/^\//, '').replace(/\/$/, '');
  const finalUrl = `${siteUrl}${cleanPath ? cleanPath + '/' : ''}`;
  const absImage = (p) => (p && p.startsWith('http') ? p : `${SITE_URL}${p && p.startsWith('/') ? '' : '/'}${p || ''}`);
  const ogImage = absImage(customOgImage || '/assets/images/og-card.png');

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Growth Bench",
    "url": SITE_URL,
    "description": "Full-stack growth partner for D2C brands and early-stage startups.",
    "serviceType": [
      "Growth Strategy", "Performance Marketing", "CRO",
      "Web Development", "UI/UX Design", "Lead Generation",
      "Google Ads", "Meta Ads", "AI Implementation"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Growth Bench",
    "url": SITE_URL,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  };

  const parts = currentPath.split('/').filter(Boolean);
  let accumulated = '';
  const items = [{ name: 'Home', path: '/' }];
  parts.forEach((part) => {
    accumulated += '/' + part;
    const label = part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({ name: label === 'Work With Us' ? 'Work With Us' : label, path: accumulated });
  });
  items.forEach((item, i) => {
    const itemUrl = item.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${item.path}/`;
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": itemUrl
    });
  });

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalUrl} />
      {noindex ? <meta name="robots" content="noindex" /> : <meta name="robots" content="index,follow" />}

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="The Growth Bench" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:alt" content={finalTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {articleSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      )}
    </Helmet>
  );
};

export default PageMeta;
