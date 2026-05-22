import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Search, Code2, Target, Users, TrendingUp, Palette, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';

const services = [
  {
    id: 'strategy', icon: Search,
    eyebrow: '01 — GROWTH STRATEGY',
    h2: 'The diagnosis before the prescription.',
    summary: 'We audit your funnel, find the fastest path to more revenue, and give you a prioritised 90-day roadmap. No 50-slide decks — a working plan tied to real outcomes.',
    includes: [
      'Full funnel audit (acquisition → activation → retention → revenue)',
      'ICP definition and customer segmentation',
      'Channel prioritisation: where to put money first',
      'Competitive landscape analysis',
      'GTM strategy for new channels or launches',
      '90-day growth roadmap with prioritised experiments',
      'OKR and KPI framework setup',
      'Monthly strategy reviews and recalibration',
    ],
    rightFor: [
      'You have budget but aren\'t sure where to put it next',
      'Revenue grows inconsistently — spikes and dips without clear reason',
      "You're launching a new product or entering a new market",
    ],
  },
  {
    id: 'website', icon: Code2,
    eyebrow: '02 — WEBSITE & DEVELOPMENT',
    h2: 'A website that works as hard as you do.',
    summary: 'We build conversion-first websites in Next.js, Webflow, or Shopify — fully tracked, tagged, and ready to optimise from day one. No expensive brochureware.',
    includes: [
      'Full website build (Next.js / Webflow / Shopify / custom)',
      'Landing page design and development',
      'UI/UX design with conversion-first wireframes',
      'Google Tag Manager setup and full event tagging',
      'GA4 implementation with custom event tracking',
      'Meta Pixel and CAPI integration',
      'Heatmap and session recording setup',
      'Core Web Vitals optimisation (Lighthouse 90+)',
      'Mobile-first responsive design',
      'Dev handoff or fully managed deployment',
    ],
    rightFor: [
      "You're launching for the first time or your site is 3+ years old",
      "Current conversion rates are poor and you don't know why",
      'You want one team to design, build, and track — not three vendors',
    ],
  },
  {
    id: 'ads', icon: Target,
    eyebrow: '03 — ADS',
    h2: 'Paid media that works because the funnel works.',
    summary: 'We manage Meta, Google, Amazon, and LinkedIn Ads — but we never treat ads as standalone. Every campaign is built with the landing page, attribution, and funnel in mind.',
    includes: [
      'Full account audit and health check for any platform',
      'Meta Ads: creative strategy, CAPI, audience architecture',
      'Google Ads: Search, Shopping, PMax, Display, YouTube',
      'Amazon Ads: Sponsored Products, Brands, DSP',
      'LinkedIn Ads: B2B targeting, lead gen forms',
      'Ad copy and creative brief development per platform',
      'Conversion tracking, attribution setup, GA4 integration',
      'Landing page recommendations per channel',
      'Bidding strategy and budget allocation framework',
      'Weekly performance summaries, monthly strategy reviews',
      'A/B testing: creative, audiences, landing pages, offers',
    ],
    rightFor: [
      'You want one team managing multiple ad platforms',
      'Current ads have no clear attribution or ROAS tracking',
      'You\'re scaling spend and need proper campaign architecture',
      'Conversions dropping — need someone who looks at the whole funnel',
    ],
  },
  {
    id: 'lead-systems', icon: Users,
    eyebrow: '04 — LEAD SYSTEMS',
    h2: 'A form is not a lead system.',
    summary: 'We build the full infrastructure: landing pages that capture, CRMs that organise, sequences that nurture, and scoring that tells you who to call first.',
    includes: [
      'Lead funnel architecture and mapping',
      'Landing page and lead magnet creation',
      'CRM setup and integration (HubSpot, Zoho, Notion, custom)',
      'Email nurture sequence design and copy',
      'WhatsApp and SMS follow-up sequences',
      'Lead scoring logic setup',
      'Form logic, confirmation flows, thank-you page sequences',
      'Lead quality feedback loop to ad campaigns',
      'Reporting dashboard: volume, quality, source attribution',
    ],
    rightFor: [
      "Running ads but leads aren't converting downstream",
      'No CRM, or your CRM is a spreadsheet nobody updates',
      'You want to build a B2B inbound system from scratch',
    ],
  },
  {
    id: 'cro', icon: TrendingUp,
    eyebrow: '05 — CRO',
    h2: 'Your website is a product. Treat it like one.',
    summary: 'We combine qualitative research with quantitative analysis, run structured experiments, and implement what works. Every page has a job — we make it do that job better.',
    includes: [
      'Funnel drop-off analysis (GA4, Shopify analytics)',
      'Session recording and heatmap analysis',
      'Qualitative research: user interviews, on-page surveys',
      'Hypothesis generation with ICE/PIE prioritisation',
      'A/B and multivariate test design and execution',
      'Copy, layout, CTA, UX, offer experiment frameworks',
      'Statistical significance monitoring',
      'Post-test analysis and rollout decisions',
      'Monthly CRO sprint report with next priorities',
    ],
    rightFor: [
      'You have traffic but conversions are low or inconsistent',
      "You've made gut-feeling changes without knowing if they worked",
      'You want a repeatable optimisation process that compounds',
    ],
  },
  {
    id: 'ui-ux', icon: Palette,
    eyebrow: '06 — UI/UX DESIGN',
    h2: 'Design that reduces friction.',
    summary: 'Good UI/UX removes the moments where a user hesitates or leaves. We work in Figma from research to final design to dev handoff — every decision tied to a user or business reason.',
    includes: [
      'UX research: user interviews, JTBD framework',
      'Information architecture and user flow mapping',
      'Low-fidelity wireframes',
      'High-fidelity UI design in Figma (desktop + mobile)',
      'Design system and component library',
      'Interactive prototype for testing',
      'Usability testing and design iteration',
      'Handoff-ready specs with developer annotations',
      'Design QA during development',
    ],
    rightFor: [
      "Building a new product, app, or website from scratch",
      "UI was designed by a developer or hasn't been updated in 3+ years",
      'You want design backed by user research, not aesthetics alone',
    ],
  },
  {
    id: 'marketing-strategy', icon: FileText,
    eyebrow: '07 — MARKETING STRATEGY',
    h2: 'The organic engine behind paid performance.',
    summary: 'Paid ads work better when your organic presence builds trust. We build the messaging framework, content architecture, and channel strategy that makes every channel more efficient.',
    includes: [
      'Brand messaging and positioning framework',
      'Content strategy and editorial calendar',
      'Email marketing: flows, campaigns, segmentation',
      'WhatsApp and SMS marketing strategy',
      'SEO strategy: keyword mapping, content clusters',
      'Social media content strategy (direction, not daily posting)',
      'UGC and creator sourcing strategy for D2C',
      'Competitor content analysis',
    ],
    rightFor: [
      "Running paid ads without any organic presence",
      "Email flows haven't been updated since launch",
      'You want a content strategy that serves your ICP, not just a calendar',
    ],
  },
];

const Section = ({ service, index }) => {
  const Icon = service.icon;
  return (
    <section id={service.id} className={index % 2 === 0 ? 'section-light' : 'section-mid'}>
      <div className="container-site">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0 mt-1">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="section-eyebrow">{service.eyebrow}</span>
            <h2 className="max-w-2xl">{service.h2}</h2>
          </div>
        </div>

        <p className="text-body text-lg max-w-3xl leading-relaxed mb-8">{service.summary}</p>

        <div className="mt-10 mb-8">
          <h3 className="font-display font-bold text-sm mb-4 text-dark flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" /> What's included
            <span className="text-xs text-muted-foreground font-normal ml-1">({service.includes.length})</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-2.5">
            {service.includes.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-body text-sm p-2.5 rounded-lg bg-white/60">
                <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="callout-box mb-12">
          <h4 className="font-display font-semibold text-sm mb-3 text-primary">This is right for you if...</h4>
          <ul className="space-y-1">
            {service.rightFor.map((item) => (
              <li key={item} className="text-sm flex items-start gap-2">
                <span className="text-primary mt-0.5">&rarr;</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {index < services.length - 1 && (
          <div className="text-right">
            <a href={`#${services[index + 1].id}`} className="link-arrow text-sm">
              Next: {services[index + 1].eyebrow.replace(/^\d+ — /, '')} &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

const Services = () => {
  const { openBookingModal } = useBookingModal();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );
    services.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageMeta />
      <section className="section-dark pt-28 pb-20 text-center">
        <div className="container-site">
          <nav aria-label="breadcrumb" className="flex items-center justify-center gap-1.5 text-sm text-white/50 mb-6">
            <Link to="/" className="hover:text-white/80 transition-colors no-underline text-white/50">Home</Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium" aria-current="page">Services</span>
          </nav>
          <div className="section-eyebrow section-eyebrow-light justify-center before:hidden">WHAT WE DO</div>
          <h1 className="text-white max-w-3xl mx-auto mb-6">The full growth stack. Not parts of it.</h1>
          <p className="text-faint text-lg max-w-2xl mx-auto leading-relaxed">
            Most agencies pick a lane — ads, or SEO, or design. We cover the entire growth surface because growth doesn't live in a lane.
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-border">
        <div className="container-site overflow-x-auto hide-scrollbar">
          <div className="flex gap-0 py-3 text-sm min-w-max">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`px-4 py-1 no-underline whitespace-nowrap transition-colors rounded-md ${
                  activeId === s.id ? 'bg-primary-light text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.eyebrow.replace(/^\d+ — /, '')}
              </a>
            ))}
          </div>
        </div>
      </div>

      {services.map((service, i) => (
        <Section key={service.id} service={service} index={i} />
      ))}

      <section className="section-dark text-center">
        <div className="container-site">
          <h2 className="text-white mb-4">Not sure which services you need?</h2>
          <p className="text-faint text-lg max-w-xl mx-auto leading-relaxed mb-10">
            That's what the audit call is for. We'll look at your current setup, identify the highest-impact gaps, and tell you honestly where we'd start.
          </p>
          <Button size="lg" onClick={openBookingModal}>Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>
    </>
  );
};

export default Services;
