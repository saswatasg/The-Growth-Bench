import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Search, Code2, Target, Users, TrendingUp, Palette, FileText, BarChart3, Workflow } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import PageMeta from '@/components/PageMeta';
import CtaPaths from '@/components/CtaPaths';
import { fadeUp, fadeIn } from '@/lib/motion';

const services = [
  {
    id: 'ai-implementation', icon: Workflow,
    title: 'AI Implementation',
    summary: 'Agentic AI for anything repeatable: ops, support, content, follow-ups, reviews.',
  },
  {
    id: 'strategy', icon: Search,
    title: 'Growth Strategy',
    summary: 'Funnel audit, ICP, 90-day roadmap before touching a single ad account.',
  },
  {
    id: 'website', icon: Code2,
    title: 'Website & Development',
    summary: 'Full builds in Next.js, Webflow, or Shopify. CRO and analytics baked in from day one.',
  },
  {
    id: 'ads', icon: Target,
    title: 'Ads',
    summary: 'Meta, Google, Amazon, LinkedIn — full-funnel campaigns with proper attribution.',
  },
  {
    id: 'lead-systems', icon: Users,
    title: 'Lead Systems',
    summary: 'Landing pages, CRM, nurture sequences, scoring. Not just a form — a system.',
  },
  {
    id: 'cro', icon: TrendingUp,
    title: 'CRO',
    summary: 'Qualitative research, quantitative analysis, structured A/B testing that compounds.',
  },
  {
    id: 'ui-ux', icon: Palette,
    title: 'UI/UX Design',
    summary: 'Research-grounded design in Figma. Dev-ready handoffs.',
  },
  {
    id: 'content-email', icon: FileText,
    title: 'Content & Email',
    summary: 'Email flows, WhatsApp sequences, SEO strategy, content architecture.',
  },
  {
    id: 'analytics', icon: BarChart3,
    title: 'Analytics & Reporting',
    summary: 'Dashboards, attribution, GA4, CAPI — own your data.',
  },
];

const sections = [
  {
    id: 'ai-implementation', icon: Workflow,
    eyebrow: '01 — AI Implementation',
    h2: 'Agents that run your repetitive work end-to-end.',
    summary: 'Most D2C teams are drowning in repeatable work: the same sizing question forty times a week, COD calls nobody has time for, product descriptions written one at a time, silence after checkout. We build agentic AI systems that take this off your plate — not a chatbot demo, but agents that check state, act inside your WhatsApp, Instagram, Shopify, and ops stack, verify the outcome, and escalate the hard exceptions with full context.',
    includes: [
      'Auto-replies for repeat customer questions (sizing, fabric, delivery, returns) across WhatsApp and Instagram',
      'COD verification calls + failed-delivery (NDR) follow-up across WhatsApp, SMS, and voice',
      'Returns triage: eligibility, pickup scheduling, refund briefs — exceptions land with full context',
      'AI-assisted product and catalog copy at scale, tuned for SEO',
      'Post-purchase and abandoned-cart follow-up sequences',
      'Review and UGC request automation',
      'Human-review period before anything goes live; money-moving actions need your approval',
      'Scoped roadmap with fixed-timeline build — same Diagnosis → Team Assembly → Execute & Iterate process',
    ],
    benchmarksNote: 'Industry benchmarks behind this build — category data, not our client results.',
    proof: 'Built by the same bench behind DhanPlan.in, our own outreach engine, and the large-scale catalog automation pipeline.',
    boundariesNote: 'The honest boundaries — what we don\u2019t promise',
    boundaries: [
      'A specific ROAS',
      'Platform approvals',
      'Inbox placement',
      'Overnight results',
    ],
    boundariesFoot: 'Money-moving actions always need your approval. Automation compounds after the human-review period.',
    benchmarks: [
      { num: '18–23%', label: 'WhatsApp cart-recovery in optimized flows vs 5–8% via email (Chatarmin 2026, 450+ brands)' },
      { num: '64–74%', label: 'Re-delivery on auto NDR outreach within 2 hours vs 28–36% with none (Base 2026, India D2C)' },
      { num: '4x', label: 'Shoppers who engage AI chat buy vs those who don\u2019t (Rep AI 2025, 17M shoppers)' },
      { num: '270%', label: 'Higher purchase likelihood with five reviews vs none (Northwestern Spiegel)' },
    ],
  },
  {
    id: 'strategy', icon: Search,
    eyebrow: '02 — Growth Strategy',
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
  },
  {
    id: 'website', icon: Code2,
    eyebrow: '03 — Website & Development',
    h2: 'A website that works as hard as you do.',
    summary: 'We build conversion-first websites in Next.js, Webflow, or Shopify — fully tracked, tagged, and ready to optimise from day one. No expensive brochureware.',
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
    eyebrow: '04 — Ads',
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
  },
  {
    id: 'lead-systems', icon: Users,
    eyebrow: '05 — Lead Systems',
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
  },
  {
    id: 'cro', icon: TrendingUp,
    eyebrow: '06 — CRO',
    h2: 'Your website is a product. Treat it like one.',
    summary: 'Same leaks, different stores: forced accounts, surprise shipping costs, missing trust signals, painful mobile flows. We combine qualitative research with quantitative analysis, run structured experiments, and implement what works. Every page has a job — we make it do that job better.',
    includes: [
      'Funnel drop-off analysis (GA4, Shopify analytics)',
      'Session recording and heatmap analysis',
      'Qualitative research: user interviews, on-page surveys',
      'Hypothesis generation with ICE/PIE prioritisation (impact-first ranking)',
      'A/B and multivariate test design and execution',
      'Copy, layout, CTA, UX, offer experiment frameworks',
      'Statistical significance monitoring',
      'Post-test analysis and rollout decisions',
      'Monthly CRO sprint report with next priorities',
    ],
  },
  {
    id: 'ui-ux', icon: Palette,
    eyebrow: '07 — UI/UX Design',
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
  },
  {
    id: 'content-email', icon: FileText,
    eyebrow: '08 — Content & Email',
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
  },
  {
    id: 'analytics', icon: BarChart3,
    eyebrow: '09 — Analytics & Reporting',
    h2: 'Own your data before you scale spend.',
    summary: 'We wire up clean tracking and reporting so every decision ties to revenue — no conflicting dashboards, no blind spots between ad platforms and Shopify or GA4.',
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

  const faqItems = [
    { q: 'How much does it cost?', a: 'We scope every engagement after a free 30-minute audit — no public pricing, no retainer commitment upfront. If we\u2019re a fit, you get a clear fixed-timeline scope based on what your funnel actually needs.' },
    { q: 'How does onboarding work?', a: 'Step 1: free 30-min audit. Step 2: if we\u2019re a fit, we scope the plan. Step 3: kickoff call + access setup. Step 4: first deliverables within the first week, full strategy doc by day 14.' },
    { q: 'How soon can I see results?', a: 'Most clients see the first meaningful improvement within 30\u201360 days. Quick wins land in the first two weeks; compound results build over 3\u20136 months.' },
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

      <section className="bg-canvas py-[100px] md:py-[120px]">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">What We Do</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
              The full growth stack.<br />Not parts of it.
            </h1>
            <p className="text-body-md text-mute mt-6 max-w-xl leading-relaxed">
              Most agencies pick a lane — ads, or SEO, or design. We cover the entire growth surface because growth doesn&apos;t live in a lane. Start with <a href="#ai-implementation" className="text-ink underline underline-offset-2">AI Implementation, our newest capability</a> — or any layer of the stack.
            </p>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-start gap-4 p-5 border border-hairline-soft bg-canvas no-underline group hover:border-ink transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-soft-cloud flex items-center justify-center flex-shrink-0 group-hover:bg-ink transition-colors">
                    <Icon className="w-4 h-4 text-ink group-hover:text-canvas transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-heading-md text-ink">{s.title}</h3>
                    <p className="text-body-sm text-mute mt-1 leading-relaxed">{s.summary}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </motion.section>

      {sections.map((service, i) => {
        const Icon = service.icon;
        return (
          <React.Fragment key={service.id}>
              <motion.section id={service.id} {...fadeUp} className={i % 2 === 0 ? 'bg-canvas scroll-mt-16' : 'bg-soft-cloud scroll-mt-16'}>
              <div className="container-site py-[80px] md:py-[100px]">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4 text-canvas" />
                    </div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">{service.eyebrow}</span>
                    <h2 className="font-display text-display-md text-ink mt-2 leading-none">{service.h2}</h2>
                    <p className="text-body-md text-mute mt-4 leading-relaxed">{service.summary}</p>
                    {service.proof && (
                      <p className="text-body-sm text-ink mt-4 leading-relaxed">{service.proof}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-heading-md text-ink mb-4">What's included</h3>
                    <ul className="space-y-2">
                      {service.includes.map((item) => (
                        <li key={item} className="text-body-sm text-mute flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {service.benchmarks && (
                  <div className="mt-12 border-t border-hairline-soft pt-8">
                    <span className="text-label-xs text-mute uppercase tracking-wider">{service.benchmarksNote}</span>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
                      {service.benchmarks.map((b) => (
                        <div key={b.num}>
                          <div className="font-display text-heading-xl md:text-display-md text-ink leading-none">{b.num}</div>
                          <p className="text-caption-md text-mute mt-2 leading-relaxed">{b.label}</p>
                        </div>
                      ))}
                    </div>
                    <Link to="/ai-scorecard" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors mt-8">
                      Take the 60-second AI scorecard <ArrowRight className="w-4 h-4" />
                    </Link>
                    {service.boundaries && (
                      <div className="mt-8 border border-hairline-soft p-6 max-w-2xl">
                        <span className="text-label-xs text-mute uppercase tracking-wider">{service.boundariesNote}</span>
                        <ul className="mt-3 space-y-2">
                          {service.boundaries.map((item) => (
                            <li key={item} className="text-body-sm text-mute flex items-start gap-2.5">
                              <span className="text-mute mt-0.5 flex-shrink-0">✕</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="text-caption-md text-mute mt-4 leading-relaxed">{service.boundariesFoot}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.section>
          </React.Fragment>
        );
      })}

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

      <motion.section {...fadeIn} className="bg-ink py-[100px] md:py-[120px] text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas leading-none mb-6">
            Not sure which<br />services you need?
          </h2>
          <p className="text-body-md text-stone leading-relaxed mb-8 max-w-lg mx-auto">
            That's what the audit call is for. We'll look at your current setup, identify the highest-impact gaps, and tell you honestly where we'd start.
          </p>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
            Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <div className="mt-6">
            <CtaPaths tone="dark" />
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Services;
