import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Code2, Target, Users, TrendingUp, Palette, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import PageMeta from '@/components/PageMeta';
import { fadeUp, fadeIn, stagger } from '@/lib/motion';

const services = [
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
    id: 'marketing-strategy', icon: FileText,
    title: 'Marketing Strategy',
    summary: 'Messaging, content, email, SEO — the organic engine behind paid performance.',
  },
];

const sections = [
  {
    id: 'strategy', icon: Search,
    eyebrow: '01 — Growth Strategy',
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
    eyebrow: '02 — Website & Development',
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
  },
  {
    id: 'ads', icon: Target,
    eyebrow: '03 — Ads',
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
    eyebrow: '04 — Lead Systems',
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
  },
  {
    id: 'ui-ux', icon: Palette,
    eyebrow: '06 — UI/UX Design',
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
    id: 'marketing-strategy', icon: FileText,
    eyebrow: '07 — Marketing Strategy',
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
];

const Services = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">What We Do</span>
            <h1 className="font-display text-display-md text-ink mt-2 leading-none">
              The full growth stack.<br />Not parts of it.
            </h1>
            <p className="text-body-md text-mute mt-6 max-w-xl leading-relaxed">
              Most agencies pick a lane — ads, or SEO, or design. We cover the entire growth surface because growth doesn't live in a lane.
            </p>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-canvas py-section-lg">
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
          <motion.section key={service.id} id={service.id} {...fadeUp} className={i % 2 === 0 ? 'bg-canvas border-t border-hairline-soft' : 'bg-soft-cloud border-t border-hairline-soft'}>
            <div className="container-site py-section-lg">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-canvas" />
                  </div>
                  <span className="text-label-xs text-mute uppercase tracking-wider">{service.eyebrow}</span>
                  <h2 className="font-display text-display-md text-ink mt-2 leading-none">{service.h2}</h2>
                  <p className="text-body-md text-mute mt-4 leading-relaxed">{service.summary}</p>
                </div>
                <div>
                  <h3 className="text-heading-md text-ink mb-4">What's included</h3>
                  <ul className="space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="text-body-sm text-mute flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-ink mt-2.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}

      <motion.section {...fadeIn} className="bg-ink py-section-lg text-center">
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
        </div>
      </motion.section>
    </>
  );
};

export default Services;
