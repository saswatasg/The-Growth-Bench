import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Code2, Target, Users, TrendingUp, Palette, FileText, BarChart3, Workflow } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import PageMeta from '@/components/PageMeta';
import CtaPaths from '@/components/CtaPaths';
import ServiceModal from '@/components/ServiceModal';
import { fadeUp, fadeIn } from '@/lib/motion';

const services = [
  {
    id: 'ai-implementation', icon: Workflow,
    title: 'AI Implementation',
    tagline: 'Agents that run your repetitive work.',
    summary: 'Agentic AI for anything repeatable: ops, support, content, follow-ups, reviews.',
    eyebrow: '01 — AI Implementation',
    h2: 'Agents that run your repetitive work end-to-end.',
    proof: 'Built by the same bench behind DhanPlan.in, our own outreach engine, and the large-scale catalog automation pipeline.',
    includes: [
      'Auto-replies for repeat customer questions across WhatsApp and Instagram',
      'COD verification calls + failed-delivery follow-up across WhatsApp, SMS, and voice',
      'Returns triage: eligibility, pickup scheduling, refund briefs',
      'AI-assisted product and catalog copy at scale, tuned for SEO',
      'Post-purchase and abandoned-cart follow-up sequences',
      'Review and UGC request automation',
      'Human-review period before anything goes live',
      'Scoped roadmap with fixed-timeline build',
    ],
    benchmarks: [
      { num: '18–23%', label: 'WhatsApp cart-recovery in optimized flows vs 5–8% via email' },
      { num: '64–74%', label: 'Re-delivery on auto NDR outreach within 2 hours vs 28–36%' },
      { num: '4x', label: 'Shoppers who engage AI chat buy vs those who don\'t' },
      { num: '270%', label: 'Higher purchase likelihood with five reviews vs none' },
    ],
    benchmarksNote: 'Industry benchmarks — category data, not client results.',
    boundaries: ['A specific ROAS', 'Platform approvals', 'Inbox placement', 'Overnight results'],
    boundariesNote: 'The honest boundaries — what we don\'t promise',
    boundariesFoot: 'Money-moving actions always need your approval. Automation compounds after the human-review period.',
  },
  {
    id: 'strategy', icon: Search,
    title: 'Growth Strategy',
    tagline: 'The diagnosis before the prescription.',
    summary: 'Full funnel audit, ICP, 90-day roadmap before touching a single ad account.',
    eyebrow: '02 — Growth Strategy',
    h2: 'The diagnosis before the prescription.',
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
  },
  {
    id: 'website', icon: Code2,
    title: 'Website & Development',
    tagline: 'A website that works as hard as you do.',
    summary: 'Full builds in Next.js, Webflow, or Shopify. CRO and analytics baked in from day one.',
    eyebrow: '03 — Website & Development',
    h2: 'A website that works as hard as you do.',
    includes: [
      'Full website build (Next.js / Webflow / Shopify / custom)',
      'Landing page design and development',
      'UI/UX design with conversion-first wireframes',
      'Google Tag Manager setup and full event tagging',
      'GA4 implementation with custom event tracking',
      'Meta Pixel and CAPI integration (server-side tracking)',
      'Heatmap and session recording setup',
      'Core Web Vitals optimisation (Lighthouse 90+)',
      'Mobile-first responsive design',
      'Dev handoff or fully managed deployment',
    ],
  },
  {
    id: 'ads', icon: Target,
    title: 'Ads',
    tagline: 'Paid media that works because the funnel works.',
    summary: 'Meta, Google, Amazon, LinkedIn — full-funnel campaigns with proper attribution.',
    eyebrow: '04 — Ads',
    h2: 'Paid media that works because the funnel works.',
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
  },
  {
    id: 'lead-systems', icon: Users,
    title: 'Lead Systems',
    tagline: 'A form is not a lead system.',
    summary: 'Landing pages, CRM, nurture sequences, scoring. Not just a form — a system.',
    eyebrow: '05 — Lead Systems',
    h2: 'A form is not a lead system.',
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
  },
  {
    id: 'cro', icon: TrendingUp,
    title: 'CRO',
    tagline: 'Your website is a product. Treat it like one.',
    summary: 'Qualitative research, quantitative analysis, structured A/B testing that compounds.',
    eyebrow: '06 — CRO',
    h2: 'Your website is a product. Treat it like one.',
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
  },
  {
    id: 'ui-ux', icon: Palette,
    title: 'UI/UX Design',
    tagline: 'Design that reduces friction.',
    summary: 'Research-grounded design in Figma. Dev-ready handoffs.',
    eyebrow: '07 — UI/UX Design',
    h2: 'Design that reduces friction.',
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
  },
  {
    id: 'content-email', icon: FileText,
    title: 'Content & Email',
    tagline: 'The organic engine behind paid performance.',
    summary: 'Email flows, WhatsApp sequences, SEO strategy, content architecture.',
    eyebrow: '08 — Content & Email',
    h2: 'The organic engine behind paid performance.',
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
  },
  {
    id: 'analytics', icon: BarChart3,
    title: 'Analytics & Reporting',
    tagline: 'Own your data before you scale spend.',
    summary: 'Dashboards, attribution, GA4, CAPI — own your data.',
    eyebrow: '09 — Analytics & Reporting',
    h2: 'Own your data before you scale spend.',
    includes: [
      'GA4 implementation with custom events and key-event mapping',
      'Google Tag Manager setup and tagging health check',
      'Meta Pixel + CAPI and Google Ads enhanced conversions',
      'UTM governance and source/medium attribution cleanup',
      'Reporting dashboard: spend, revenue, CAC, ROAS by channel',
      'Monthly reporting cadence tied to the experiment backlog',
    ],
  },
];

const Services = () => {
  const { openBookingModal } = useBookingModal();
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback((service) => {
    setSelectedService(service);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  }, []);

  const faqItems = [
    { q: 'How much does it cost?', a: 'We scope every engagement after a free 30-minute audit — no public pricing, no retainer commitment upfront. If we\'re a fit, you get a clear fixed-timeline scope based on what your funnel actually needs.' },
    { q: 'How does onboarding work?', a: 'Step 1: free 30-min audit. Step 2: if we\'re a fit, we scope the plan. Step 3: kickoff call + access setup. Step 4: first deliverables within the first week, full strategy doc by day 14.' },
    { q: 'How soon can I see results?', a: 'Most clients see the first meaningful improvement within 30–60 days. Quick wins land in the first two weeks; compound results build over 3–6 months.' },
    { q: 'What can AI automate for us?', a: 'Anything repeatable: ops (COD verification, NDR follow-up, returns triage), support replies, catalog copy, follow-ups, reviews, creative variants. Nothing goes live without a human-review period.' },
    { q: 'What tools & platforms do you use?', a: 'Google Ads, Meta Ads, Amazon Ads, Shopify, React/Next.js, Figma, Salesforce, Zoho CRM, analytics, and WhatsApp/Instagram automation — picked per client, never one-size-fits-all.' },
    { q: 'What do you need from us to start?', a: 'Access to the tools involved (Shopify, ad accounts, WhatsApp Business), plus a few hours a week from your side for reviews and approvals. We handle everything else.' },
    { q: 'What if the AI makes a mistake?', a: 'Every system ships with a human-review period, and money or promise-moving actions always need sign-off first. Exceptions land with full context — and if a flow misbehaves, we pause it and fix it before it touches another customer.' },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <>
      <PageMeta />
      <Helmet>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Helmet>

      {/* Hero */}
      <section className="bg-canvas py-[100px] md:py-[120px]">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">What We Do</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
              The full growth stack.<br />Not parts of it.
            </h1>
            <p className="text-body-md text-mute mt-6 max-w-xl leading-relaxed">
              Most agencies pick a lane — ads, or SEO, or design. We cover the entire growth surface because growth doesn&apos;t live in a lane. Click any service to see what&apos;s inside.
            </p>
          </div>
        </div>
      </section>

      {/* Service Grid — Bento Layout */}
      <motion.section {...fadeUp} className="bg-canvas pb-[80px] md:pb-[100px]">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-4">
            {/* AI Implementation — spans 2 cols, featured */}
            <button
              onClick={() => openModal(services[0])}
              className="md:col-span-2 group text-left p-6 md:p-8 border border-hairline-soft bg-soft-cloud hover:border-ink transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <span className="absolute top-4 right-4 text-label-xs uppercase tracking-wider bg-ink text-canvas px-3 py-1 rounded-full">New</span>
              <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center mb-4">
                <Workflow className="w-5 h-5 text-canvas" />
              </div>
              <span className="text-caption-sm text-mute font-mono">01</span>
              <h3 className="font-display text-heading-xl text-ink mt-1 leading-none">{services[0].title}</h3>
              <p className="text-body-md text-mute mt-3 leading-relaxed max-w-lg">{services[0].tagline}</p>
              <div className="flex items-center gap-4 mt-5">
                {services[0].benchmarks.slice(0, 3).map((b) => (
                  <div key={b.num}>
                    <span className="font-display text-heading-md text-ink">{b.num}</span>
                    <span className="text-caption-sm text-mute ml-1.5 hidden sm:inline">benchmarked</span>
                  </div>
                ))}
              </div>
              <span className="text-body-sm text-ink mt-5 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                See overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Strategy */}
            <button
              onClick={() => openModal(services[1])}
              className="group text-left p-6 border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <Search className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">02</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[1].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[1].tagline}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Website */}
            <button
              onClick={() => openModal(services[2])}
              className="group text-left p-6 border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <Code2 className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">03</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[2].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[2].tagline}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Ads */}
            <button
              onClick={() => openModal(services[3])}
              className="group text-left p-6 border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <Target className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">04</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[3].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[3].tagline}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Lead Systems — spans 2 cols */}
            <button
              onClick={() => openModal(services[4])}
              className="md:col-span-2 group text-left p-6 md:p-8 border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <Users className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">05</span>
              <h3 className="font-display text-heading-xl text-ink mt-1 leading-none">{services[4].title}</h3>
              <p className="text-body-md text-mute mt-2 leading-relaxed max-w-lg">{services[4].tagline}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* CRO */}
            <button
              onClick={() => openModal(services[5])}
              className="group text-left p-6 border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <TrendingUp className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">06</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[5].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[5].tagline}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* UI/UX */}
            <button
              onClick={() => openModal(services[6])}
              className="group text-left p-6 border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <Palette className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">07</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[6].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[6].tagline}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Content & Email */}
            <button
              onClick={() => openModal(services[7])}
              className="group text-left p-6 border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <FileText className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">08</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[7].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[7].tagline}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Analytics */}
            <button
              onClick={() => openModal(services[8])}
              className="group text-left p-6 border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <BarChart3 className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">09</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[8].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[8].tagline}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[100px] md:py-[120px]">
        <div className="container-site">
          <span className="text-label-xs text-mute uppercase tracking-wider">Questions, answered</span>
          <h2 className="font-display text-display-md text-ink mt-2 leading-none max-w-2xl">What founders ask first.</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-8 max-w-4xl">
            {faqItems.map((item) => (
              <div key={item.q}>
                <h3 className="text-heading-md text-ink">{item.q}</h3>
                <p className="text-body-sm text-mute mt-2 leading-relaxed max-w-md">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section {...fadeIn} className="bg-ink py-[100px] md:py-[120px] text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas leading-none mb-6">
            Not sure which<br />services you need?
          </h2>
          <p className="text-body-md text-stone leading-relaxed mb-8 max-w-lg mx-auto">
            That&apos;s what the audit call is for. We&apos;ll look at your current setup, identify the highest-impact gaps, and tell you honestly where we&apos;d start.
          </p>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
            Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <div className="mt-6">
            <CtaPaths tone="dark" />
          </div>
        </div>
      </motion.section>

      {/* Service Modal */}
      <ServiceModal service={selectedService} isOpen={modalOpen} onClose={closeModal} />
    </>
  );
};

export default Services;
