import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const defaultMeta = {
  title: "The Growth Bench — Full-Stack Growth Partner for D2C Brands & Startups",
  description: "Full-stack growth partner for D2C brands and early-stage startups. Strategy, performance marketing, CRO, website development, lead systems, and UI/UX — under one roof. Book a free audit call.",
};

const pageSpecificMeta = {
  '/': {
    title: "The Growth Bench — Full-Stack Growth Partner for D2C Brands & Startups",
    description: "Full-stack growth partner for D2C brands and early-stage startups. Strategy, performance marketing, CRO, website development, lead systems, and UI/UX — under one roof. Book a free audit call."
  },
  '/services': {
    title: "Growth Services — Strategy, Ads, CRO, Web & More | The Growth Bench",
    description: "Explore The Growth Bench's full service stack: growth strategy, Google Ads, Meta Ads, CRO, website development, lead systems, and UI/UX design. Built for D2C brands and startups."
  },
  '/about': {
    title: "About The Growth Bench — Who We Are and How We Work",
    description: "The Growth Bench is a full-stack growth consultancy built on a bench model — senior-led, specialist-backed, with one point of contact for the complete growth stack."
  },
  '/past-projects': {
    title: "Past Projects & Client Results | The Growth Bench",
    description: "Real outcomes with real numbers from The Growth Bench clients. D2C, B2B SaaS, e-commerce — strategy, CRO, performance marketing, and growth systems that delivered measurable results."
  },
  '/case-studies': {
    title: "Past Projects & Client Results | The Growth Bench",
    description: "Real outcomes with real numbers from The Growth Bench clients. Strategy, CRO, performance marketing, and growth systems for D2C brands and startups."
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
    title: "Growth Frameworks & Teardowns | The Growth Bench Insights",
    description: "Actionable growth advice, CRO teardowns, and marketing strategy frameworks for D2C brands and early-stage startups."
  },
  '/work-with-us': {
    title: "Work With Us | The Growth Bench",
    description: "Book a free 30-minute audit call with The Growth Bench. We'll look at your funnel, give you one concrete recommendation, and tell you honestly if we can help."
  }
};

const PageMeta = ({ title, description, noindex = false, articleSchema }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const baseMeta = pageSpecificMeta[currentPath] || defaultMeta;
  const finalTitle = title || baseMeta.title;
  const finalDescription = description || baseMeta.description;

  const siteUrl = "https://thegrowthbench.com/";
  const cleanPath = currentPath === '/' ? '' : currentPath.replace(/^\//, '').replace(/\/$/, '');
  const finalUrl = `${siteUrl}${cleanPath ? cleanPath + '/' : ''}`;
  const ogImage = "/assets/images/og-card.svg";

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Growth Bench",
    "url": "https://thegrowthbench.com",
    "description": "Full-stack growth partner for D2C brands and early-stage startups.",
    "serviceType": [
      "Growth Strategy", "Performance Marketing", "CRO",
      "Web Development", "UI/UX Design", "Lead Generation",
      "Google Ads", "Meta Ads", "Marketing Strategy"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Growth Bench",
    "url": "https://thegrowthbench.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://thegrowthbench.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
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
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `https://thegrowthbench.com${item.path}/`
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
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="The Growth Bench" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
    </Helmet>
  );
};

export default PageMeta;
