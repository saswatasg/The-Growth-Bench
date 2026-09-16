import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Code2, Target, Users, TrendingUp, Palette, FileText, BarChart3, Workflow, Lightbulb, Wrench, Rocket } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import ServiceModal from '@/components/ServiceModal';
import FaqSection from '@/components/FaqSection';
import PlatformLogos from '@/components/PlatformLogos';
import { fadeUp, staggerContainer, staggerChild } from '@/lib/motion';

const services = [
  {
    id: 'ai-implementation', icon: Workflow, category: 'core',
    title: 'AI Implementation',
    tagline: 'Agents that run your repetitive work.',
    shortDesc: 'Ops, support, content, follow-ups — automated end-to-end.',
    eyebrow: '01 — AI Implementation',
    h2: 'Agents that run your repetitive work end-to-end.',
    summary: 'Agentic AI for anything repeatable: ops, support, content, follow-ups, reviews.',
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
    id: 'strategy', icon: Search, category: 'core',
    title: 'Growth Strategy',
    tagline: 'The diagnosis before the prescription.',
    shortDesc: 'Funnel audit, ICP, 90-day roadmap.',
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
    id: 'website', icon: Code2, category: 'core',
    title: 'Website & Dev',
    tagline: 'Conversion-first builds.',
    shortDesc: 'Next.js, Webflow, Shopify — tracked and optimised from day one.',
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
    id: 'ads', icon: Target, category: 'core',
    title: 'Ads',
    tagline: 'Full-funnel paid media.',
    shortDesc: 'Meta, Google, Amazon, LinkedIn — with proper attribution.',
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
    id: 'lead-systems', icon: Users, category: 'supporting',
    title: 'Lead Systems',
    tagline: 'Not just a form — a system.',
    shortDesc: 'CRM, nurture, scoring. The infrastructure behind pipeline.',
    eyebrow: '05 — Lead Systems',
    h2: 'A form is not a lead system.',
    roles: ['CRM Specialist', 'Email & Lifecycle Specialist', 'WhatsApp Commerce Specialist'],
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
    id: 'cro', icon: TrendingUp, category: 'supporting',
    title: 'CRO',
    tagline: 'Structured experimentation.',
    shortDesc: 'Research, analysis, A/B testing that compounds.',
    eyebrow: '06 — CRO',
    h2: 'Your website is a product. Treat it like one.',
    roles: ['CRO Specialist', 'Data & Analytics Analyst'],
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
    id: 'ui-ux', icon: Palette, category: 'supporting',
    title: 'UI/UX Design',
    tagline: 'Design that removes friction.',
    shortDesc: 'Research to Figma to dev handoff.',
    eyebrow: '07 — UI/UX Design',
    h2: 'Design that reduces friction.',
    roles: ['UI/UX Designer', 'Graphic Designer', 'Motion Graphics Designer'],
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
    id: 'content-email', icon: FileText, category: 'supporting',
    title: 'Content & Email',
    tagline: 'The organic engine.',
    shortDesc: 'Email flows, SEO, content architecture.',
    eyebrow: '08 — Content & Email',
    h2: 'The organic engine behind paid performance.',
    roles: ['Copywriter', 'Content Strategist', 'Email & Lifecycle Specialist'],
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
    id: 'analytics', icon: BarChart3, category: 'supporting',
    title: 'Analytics',
    tagline: 'Own your data.',
    shortDesc: 'Dashboards, attribution, GA4, CAPI.',
    eyebrow: '09 — Analytics & Reporting',
    h2: 'Own your data before you scale spend.',
    roles: ['Data & Analytics Analyst', 'SEO Specialist'],
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

const coreServices = services.filter(s => s.category === 'core');
const supportingServices = services.filter(s => s.category === 'supporting');

const processSteps = [
  { icon: Lightbulb, num: '01', title: 'Audit', desc: 'We map your funnel, find leaks, and rank fixes by revenue impact.' },
  { icon: Wrench, num: '02', title: 'Build', desc: 'Strategy, systems, creative — shipped in weeks, not quarters.' },
  { icon: Rocket, num: '03', title: 'Scale', desc: 'Compound results through structured experiments and AI automation.' },
];

const Services = () => {
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
    { q: 'How much does it cost?', a: 'We scope every engagement after a free 30-minute audit — no public pricing, no retainer commitment upfront. If we\'re a fit, you get a clear fixed-timeline scope based on what your funnel actually needs. For Indian D2C brands, a serious managed retainer starts around ₹30K/month — anything cheaper is likely one junior running templated campaigns across many accounts.' },
    { q: 'How does onboarding work?', a: 'Step 1: free 30-min audit. Step 2: if we\'re a fit, we scope the plan. Step 3: kickoff call + access setup. Step 4: first deliverables within the first week, full strategy doc by day 14. You\'ll know exactly what\'s happening and when, from day one.' },
    { q: 'How soon can I see results?', a: 'Most clients see the first meaningful improvement within 30–60 days. Quick wins land in the first two weeks — a tracking fix, a checkout change, a campaign restructuring. Compound results build over 3–6 months as we stack optimizations across your full funnel.' },
    { q: 'What\'s the first thing you\'ll do with our brand?', a: 'We start with a diagnostic: attribution setup, creative audit, unit economics review, and funnel teardown. No guessing. We map where revenue is leaking before touching a single ad or line of code. Then we prioritize the highest-impact gap and build from there.' },
    { q: 'Who actually works on my account day-to-day?', a: 'You get a named account lead, not a rotating pool of juniors. The strategist who sells the engagement stays involved. Specialists (ads, dev, AI) are pulled in per project on a contract basis — no account layers, no overhead you don\'t need. And if anyone on the team changes, documented processes ensure nothing falls through the cracks.' },
    { q: 'How do you report ROAS — and what about blended vs platform ROAS?', a: 'Platform-reported ROAS inside Meta or Google is often inflated by over-attribution across overlapping campaigns. We report blended ROAS — total revenue divided by total ad spend across all channels with a stated attribution window. If an agency only shows you platform ROAS without reconciling it to your actual store revenue, they\'re hiding the real picture.' },
    { q: 'Do you own the ad accounts, or do we?', a: 'Your business owns all ad accounts. We access through a manager/partner role — never ownership. This applies to Meta Business Suite, Google Ads (we use MCC), and any other platforms. If the relationship ends, you retain all data, pixels, and account history without needing anyone\'s permission.' },
    { q: 'What if we don\'t see results in 90 days?', a: 'Get the answer in writing before signing. Our agreement includes a performance review at 90 days, defined KPIs both parties agreed to, and a clear off-boarding process with handoff of accounts, passwords, and creative assets. No excessive penalties for ending early. A confident partner won\'t hold your business hostage.' },
    { q: 'What can AI automate for us?', a: 'Anything repeatable: ops (COD verification, NDR follow-up, returns triage), support replies, catalog copy, follow-ups, reviews, creative variants. Nothing goes live without a human-review period. Every system ships with guardrails — money or promise-moving actions always need sign-off first.' },
    { q: 'How do you handle COD-heavy Indian D2C brands?', a: 'COD can eat 12–18% of gross COD revenue when you factor in handling fees (1.75%), RTO costs, remittance leakage (3%), and ops overhead. We implement WhatsApp-based COD verification flows, pre-shipping OTP confirmation, and high-risk pin code blocking. A generic agency unfamiliar with Indian logistics will optimize your ads but ignore the leak in your fulfillment pipeline.' },
    { q: 'Should we build in-house or hire an agency?', a: 'Below ₹15–20L monthly ad spend, a good agency gives you better leverage — media buying expertise, channel experience, and pattern recognition across accounts. Above that threshold with a senior hire who can manage the function, a hybrid model works best: you own strategy and creative direction, we own campaign execution and testing. Bad internal hiring and poor measurement cost far more than agency fees.' },
    { q: 'What channels beyond Meta and Google should we think about?', a: 'For Indian D2C specifically: WhatsApp commerce (broadcasts, cart recovery, COD confirmation) is massively underutilized — 530M+ users with 90%+ open rates. Influencer marketing is shifting toward direct brand-creator deals (cheaper than agency-led). Quick commerce platforms like Blinkit and Zepto are emerging as discovery channels. We prioritize based on your category, not just our service menu.' },
  ];

  return (
    <>
      <PageMeta />

      {/* Hero */}
      <section className="bg-canvas py-[100px] md:py-[120px]">
        <div className="container-site">
          <div className="text-center">
            <span className="text-label-xs text-mute uppercase tracking-wider">What We Do</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
              The full growth stack.<br />Not parts of it.
            </h1>
            <p className="text-body-lg text-mute mt-6 max-w-xl mx-auto leading-relaxed">
              Most agencies pick a lane. We cover the entire growth surface — because growth doesn&apos;t live in a lane.
            </p>
          </div>

          {/* Inline metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-hairline-soft max-w-3xl mx-auto">
            {[
              { num: '9', label: 'Service lines' },
              { num: '20+', label: 'Specialists on call' },
              { num: '$425K/mo', label: 'Recovered for one client' },
              { num: '5.7x', label: 'ROAS achieved' },
            ].map((m) => (
              <div key={m.label}>
                <div className="font-display text-heading-lg text-ink leading-none">{m.num}</div>
                <p className="text-caption-sm text-mute mt-1.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work — Process strip */}
      <motion.section {...fadeUp} className="bg-ink py-[60px] md:py-[80px]">
        <div className="container-site">
          <div className="text-center mb-8">
            <span className="text-label-xs text-hairline uppercase tracking-wider">How we work</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-canvas/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-canvas" />
                  </div>
                  <div>
                    <span className="text-caption-sm text-hairline font-mono">{step.num}</span>
                    <h3 className="font-display text-heading-lg text-canvas leading-none mt-0.5">{step.title}</h3>
                    <p className="text-body-sm text-hairline mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Core Services */}
      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">Core services</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* AI Implementation — featured, full width */}
            <button
              id="ai-implementation"
              onClick={() => openModal(services[0])}
              aria-label="View AI Implementation service details"
              className="md:col-span-2 group text-left p-6 md:p-8 border border-hairline-soft bg-soft-cloud hover:border-ink transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <span className="absolute top-4 right-4 text-label-xs uppercase tracking-wider bg-ink text-canvas px-3 py-1 rounded-full">New</span>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="max-w-xl">
                  <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center mb-4">
                    <Workflow className="w-5 h-5 text-canvas" />
                  </div>
                  <span className="text-caption-sm text-mute font-mono">01</span>
                  <h3 className="font-display text-heading-xl text-ink mt-1 leading-none">{services[0].title}</h3>
                  <p className="text-body-md text-mute mt-3 leading-relaxed">{services[0].shortDesc}</p>
                </div>
                <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
                  {services[0].benchmarks.slice(0, 3).map((b) => (
                    <div key={b.num}>
                      <span className="font-display text-heading-lg text-ink">{b.num}</span>
                      <span className="text-caption-sm text-mute ml-1 block mt-0.5">benchmarked</span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-body-sm text-ink mt-6 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                See overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Strategy */}
            <button
              id="strategy"
              onClick={() => openModal(services[1])}
              aria-label="View Growth Strategy service details"
              className="group text-left p-6 border border-hairline-soft bg-canvas hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <Search className="w-5 h-5 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">02</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[1].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[1].shortDesc}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Website */}
            <button
              id="website"
              onClick={() => openModal(services[2])}
              aria-label="View Website and Development service details"
              className="group text-left p-6 border border-hairline-soft bg-canvas hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <Code2 className="w-5 h-5 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">03</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[2].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[2].shortDesc}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Ads */}
            <button
              id="ads"
              onClick={() => openModal(services[3])}
              aria-label="View Ads service details"
              className="group text-left p-6 border border-hairline-soft bg-canvas hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                <Target className="w-5 h-5 text-ink group-hover:text-canvas transition-colors" />
              </div>
              <span className="text-caption-sm text-mute font-mono">04</span>
              <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{services[3].title}</h3>
              <p className="text-body-sm text-mute mt-2 leading-relaxed">{services[3].shortDesc}</p>
              <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                Overview <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Supporting Services */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">Supporting services</span>
          </div>
          <motion.div {...staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportingServices.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.id} {...staggerChild}>
                  <button
                    onClick={() => openModal(s)}
                    className="group text-left p-6 border border-hairline bg-canvas hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 w-full"
                  >
                    <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center mb-4 group-hover:bg-ink transition-colors">
                      <Icon className="w-5 h-5 text-ink group-hover:text-canvas transition-colors" />
                    </div>
                    <span className="text-caption-sm text-mute font-mono">{s.eyebrow.split(' — ')[0]}</span>
                    <h3 className="font-display text-heading-lg text-ink mt-1 leading-none">{s.title}</h3>
                    <p className="text-body-sm text-mute mt-2 leading-relaxed">{s.shortDesc}</p>
                    {s.roles && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {s.roles.map((role) => (
                          <span key={role} className="text-label-xs text-mute bg-soft-cloud px-2 py-0.5 rounded-full">{role}</span>
                        ))}
                      </div>
                    )}
                    <span className="text-body-sm text-ink mt-4 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity font-medium">
                      Overview <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Platforms strip */}
      <motion.section {...fadeUp} className="bg-canvas border-t border-b border-hairline-soft py-[40px] md:py-[50px]">
        <div className="container-site">
          <div className="text-center mb-6">
            <span className="text-label-xs text-mute uppercase tracking-wider">Platforms we work with</span>
          </div>
          <PlatformLogos />
        </div>
      </motion.section>

      {/* FAQ */}
      <FaqSection items={faqItems} />

      {/* Service Modal */}
      <ServiceModal service={selectedService} isOpen={modalOpen} onClose={closeModal} />
    </>
  );
};

export default Services;
