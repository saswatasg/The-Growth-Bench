import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';

const services = [
  {
    id: 'strategy',
    eyebrow: '01 — GROWTH STRATEGY',
    h2: 'The diagnosis before the prescription.',
    body: `Before running a single ad or redesigning a single page, we need to understand your business properly. Who's your actual customer? Where does the funnel break? What's the fastest path to more revenue — this month, not next quarter? Growth strategy is the work that makes everything else more effective. Without it, you're spending budget and effort optimising the wrong things.

We run a thorough audit of your current funnel, acquisition channels, product, and retention — and come back with a prioritised 90-day plan tied to real outcomes. Not a 50-slide deck. A working roadmap.`,
    includes: [
      'Full funnel audit (acquisition → activation → retention → revenue)',
      'ICP definition and customer segmentation',
      'Channel prioritisation: where to put money first and why',
      'Competitive landscape analysis',
      'GTM strategy for new channels or launches',
      '90-day growth roadmap with prioritised experiments',
      'OKR and KPI framework setup',
      'Monthly strategy reviews and recalibration calls',
    ],
    rightFor: [
      'You have budget but aren\'t sure where to put it next',
      'Your revenue is growing but inconsistently — it spikes and dips without a clear reason',
      "You're launching a new product or entering a new market",
    ],
  },
  {
    id: 'website',
    eyebrow: '02 — WEBSITE & DEVELOPMENT',
    h2: 'A website that works as hard as you do.',
    body: `A beautiful website that doesn't convert is just an expensive brochure. We build websites where every layout decision, every copy choice, and every page element is made with conversion in mind — without sacrificing how good it looks.

We handle the full build: UX research, design in Figma, development (Next.js, Webflow, or Shopify), and analytics infrastructure. Every website we build is tagged, tracked, and ready to be optimised from day one. You won't need to call a separate agency to "set up the tracking" after launch.`,
    includes: [
      'Full website build (Next.js / Webflow / Shopify / custom stack)',
      'Landing page design and development',
      'UI/UX design with conversion-first wireframes',
      'Google Tag Manager setup and full event tagging',
      'GA4 implementation with custom event tracking',
      'Meta Pixel and Conversions API (CAPI) integration',
      'Heatmap and session recording setup (Clarity / Hotjar)',
      'Core Web Vitals optimisation (Lighthouse 90+ target)',
      'Mobile-first responsive design',
      'Dev handoff or fully managed deployment',
    ],
    rightFor: [
      "You're launching for the first time or have a website that's 3+ years old",
      "Your current site has poor conversion rates and you don't know why",
      'You want one team to design, build, and track — not three separate vendors',
    ],
  },
  {
    id: 'google-ads',
    eyebrow: '03 — GOOGLE ADS',
    h2: 'We own the number. Not just the account.',
    body: `Most Google Ads agencies manage the account. We manage the outcome. The difference is that we look upstream — at landing page quality, at offer clarity, at search intent alignment — not just at the bid strategy inside the ads dashboard.

We build campaigns from scratch or take over existing accounts, and we run them with the same level of rigour we'd apply to our own budget. Every week you know what's happening. Every month you know what's changing and why.`,
    includes: [
      'Full account audit (for takeovers)',
      'Keyword research and search intent mapping',
      'Campaign architecture: Search, Shopping, Display, YouTube, Demand Gen',
      'Ad copy and creative brief',
      'Bidding strategy and budget allocation framework',
      'Conversion tracking and attribution setup',
      'Landing page recommendations',
      'Weekly performance summaries',
      'Monthly strategy review and budget reallocation',
      'A/B testing: ads, headlines, landing pages, CTAs',
    ],
    rightFor: [
      "You're running Google Ads with no clear attribution or ROAS tracking",
      "You're starting paid search from scratch and want it done right the first time",
      'Your CPAs are creeping up and no one knows how to fix it',
    ],
  },
  {
    id: 'meta-ads',
    eyebrow: '04 — META ADS',
    h2: 'Creative-led. Data-backed. Funnel-aware.',
    body: `The best Meta ad in the world won't work if it lands on a broken checkout. The best offer in the world won't work if the creative doesn't stop the scroll. Meta Ads management, done right, means owning the whole funnel — not just the campaign dashboard.

We design the creative strategy, build the audience architecture, set up attribution properly (including CAPI for post-iOS 14 accuracy), and manage the spend with weekly attention and monthly strategic review.`,
    includes: [
      'Account audit and Pixel health check',
      'Campaign structure: Awareness, Consideration, Retargeting layers',
      'Creative strategy: UGC, static, and video ad briefs',
      'Audience research, custom and lookalike audience builds',
      'Conversions API (CAPI) setup for accurate attribution',
      'Budget allocation and scaling framework',
      'Creative testing: hook tests, thumb-stop tests, offer tests',
      'Weekly reporting with key metrics and recommendations',
      'Monthly creative refresh planning',
    ],
    rightFor: [
      'Your Meta ROAS has been declining and you\'re not sure if it\'s the ad or the funnel',
      'You need someone who understands both the creative side and the data side',
      "You're scaling from ₹50K/month ad spend to ₹5L+/month and need proper architecture",
    ],
  },
  {
    id: 'lead-systems',
    eyebrow: '05 — LEAD SYSTEMS',
    h2: 'A form is not a lead system.',
    body: `Most businesses treat lead generation as a landing page and a spreadsheet. That's not a system — it's a starting point. We build the full infrastructure: the page that captures, the CRM that organises, the sequence that nurtures, and the scoring that tells your sales team who to call first.

Every piece connects. Every step is intentional. And the whole thing is measurable from first click to closed deal.`,
    includes: [
      'Lead funnel architecture and mapping',
      'Landing page and lead magnet creation',
      'CRM setup and integration (HubSpot, Zoho, Notion, or custom)',
      'Email nurture sequence design and copywriting',
      'WhatsApp and SMS follow-up sequence design',
      'Lead scoring logic setup',
      'Form logic, confirmation flows, and thank-you page sequences',
      'Lead quality feedback loop to ad campaigns',
      'Reporting dashboard: volume, quality, source attribution',
    ],
    rightFor: [
      "You're running ads but leads aren't converting downstream",
      'You have no CRM or your CRM is a spreadsheet that nobody updates',
      'You want to build a B2B inbound system from scratch',
    ],
  },
  {
    id: 'cro',
    eyebrow: '06 — CRO',
    h2: 'Your website is a product. Treat it like one.',
    body: `CRO is not an audit you do once and forget. It's an ongoing discipline of understanding user behaviour, forming hypotheses, running experiments, and implementing what works. Every page has a job to do — and our job is to make it do that job better.

We combine qualitative research (what are people actually confused by?) with quantitative analysis (where are they dropping off?) and run structured experiments that produce results you can build on.`,
    includes: [
      'Funnel drop-off analysis (GA4, Shopify analytics)',
      'Session recording and heatmap analysis (Clarity / Hotjar)',
      'Qualitative research: user interviews and on-page surveys',
      'Hypothesis generation with ICE or PIE prioritisation scoring',
      'A/B and multivariate test design and execution',
      'Copy, layout, CTA, UX, and offer experiment frameworks',
      'Statistical significance monitoring',
      'Post-test analysis and rollout decisions',
      'Monthly CRO sprint report with next priorities',
    ],
    rightFor: [
      'You have traffic but conversions are low or inconsistent',
      "You've made gut-feeling changes to your website without knowing if they worked",
      'You want a structured, repeatable optimisation process that compounds over time',
    ],
  },
  {
    id: 'ui-ux',
    eyebrow: '07 — UI/UX DESIGN',
    h2: 'Design that reduces friction, not just ink on a screen.',
    body: `Good UI/UX design is not about making things pretty. It's about removing the moments where a user hesitates, gets confused, or decides to leave. Every layout decision is a hypothesis about user behaviour. We test those hypotheses with research, not assumptions.

We work in Figma from research to final design to developer handoff — with full documentation so the build phase doesn't introduce new problems.`,
    includes: [
      'UX research: user interviews, Jobs-to-be-Done framework',
      'Information architecture and user flow mapping',
      'Low-fidelity wireframes (paper or digital)',
      'High-fidelity UI design in Figma (desktop and mobile)',
      'Design system and component library',
      'Interactive prototype for testing',
      'Usability testing and design iteration',
      'Handoff-ready specs with developer annotations',
      'Design QA during development',
    ],
    rightFor: [
      "You're building a new product, app, or website from scratch",
      "Your current UI was designed by a developer or hasn't been touched in 3+ years",
      'You want design backed by user research, not just aesthetic preference',
    ],
  },
  {
    id: 'marketing-strategy',
    eyebrow: '08 — MARKETING STRATEGY',
    h2: 'The organic engine behind your paid performance.',
    body: `Paid ads work better when your organic presence builds trust. Your SEO works better when your content answers real questions. Your email works better when the segmentation and messaging are actually thought through. Marketing strategy is the connective tissue that makes every other channel more efficient.

We build the messaging framework, the content architecture, and the channel strategy — and we tie it all back to what the business is actually trying to achieve.`,
    includes: [
      'Brand messaging and positioning framework',
      'Content strategy and editorial calendar',
      'Email marketing: flows (welcome, abandon, winback), campaigns, and segmentation',
      'WhatsApp and SMS marketing strategy',
      'SEO strategy: keyword mapping, content clusters, on-page optimisation',
      'Social media content strategy (architecture and direction, not daily posting)',
      'UGC and creator sourcing strategy for D2C brands',
      'Competitor content analysis',
    ],
    rightFor: [
      "You've been running paid ads without any organic presence and want to fix that",
      'Your email flows are either non-existent or haven\'t been updated since launch',
      'You want a content strategy that actually serves your ICP, not just fills a calendar',
    ],
  },
];

const Section = ({ service, index }) => (
  <section id={service.id} className={index % 2 === 0 ? 'section-light' : 'section-off'}>
    <div className="container-site">
      <span className="section-eyebrow">{service.eyebrow}</span>
      <h2 className="max-w-2xl mb-6">{service.h2}</h2>
      {service.body.split('\n\n').map((p, i) => (
        <p key={i} className="text-body text-lg max-w-3xl leading-relaxed mb-6">{p}</p>
      ))}

      {/* What's included */}
      <div className="mt-10 mb-8">
        <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--color-dark)' }}>What's included</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {service.includes.map((item) => (
            <div key={item} className="flex items-start gap-3 text-body">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right for you */}
      <div className="callout-box mb-12">
        <h4 className="font-display font-semibold text-sm mb-3" style={{ color: 'var(--color-primary)' }}>This is right for you if...</h4>
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

const Services = () => {
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
      {/* Hero */}
      <section className="section-dark pt-32 pb-24 text-center">
        <div className="container-site">
          <nav aria-label="breadcrumb" className="flex items-center justify-center gap-1.5 text-sm text-white/50 mb-6">
            <Link to="/" className="hover:text-white/80 transition-colors no-underline text-white/50">Home</Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium" aria-current="page">Services</span>
          </nav>
          <div className="section-eyebrow section-eyebrow-light justify-center before:hidden">WHAT WE DO</div>
          <h1 className="text-white max-w-3xl mx-auto mb-6">The full growth stack. Not parts of it.</h1>
          <p className="text-faint text-lg max-w-2xl mx-auto leading-relaxed">
            Most agencies pick a lane — or ads, or SEO, or design. We cover the entire growth surface because growth doesn't live in a lane. Every service we offer connects to the others. We know what's upstream and downstream of every decision we make.
          </p>
        </div>
      </section>

      {/* Sticky Nav */}
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

      {/* Service Sections */}
      {services.map((service, i) => (
        <Section key={service.id} service={service} index={i} />
      ))}

      {/* Pricing */}
      <section className="section-off">
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="section-eyebrow">PRICING</div>
            <h2 className="mb-4">Transparent pricing. No surprises.</h2>
            <p className="text-body text-lg max-w-2xl leading-relaxed mb-10">
              Every engagement is scoped to your specific needs. Here's what most projects look like.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }} className="card-standard flex flex-col">
              <h3 className="font-display font-bold text-lg mb-1">Growth Sprint</h3>
              <p className="text-3xl font-display font-extrabold text-primary mb-1">?75K<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
              <p className="text-xs text-muted-foreground mb-4">Monthly, 3-month minimum</p>
              <ul className="space-y-2 text-sm text-body flex-1 mb-6">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Strategy audit & roadmap</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> One growth channel managed</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Weekly check-ins</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Monthly strategy review</li>
              </ul>
              <Button asChild size="sm" className="w-full">
                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i" target="_blank" rel="noopener noreferrer" className="no-underline">Book a Call <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="card-highlighted flex flex-col border-primary/20">
              <span className="tag-amber text-[10px] mb-3 self-start">MOST POPULAR</span>
              <h3 className="font-display font-bold text-lg mb-1">Full-Stack Growth</h3>
              <p className="text-3xl font-display font-extrabold text-primary mb-1">?1.5L<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
              <p className="text-xs text-muted-foreground mb-4">Monthly, 3-month minimum</p>
              <ul className="space-y-2 text-sm text-body flex-1 mb-6">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Everything in Growth Sprint</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> 2-3 growth channels managed</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> CRO program running</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Full analytics infrastructure</li>
              </ul>
              <Button asChild size="sm" className="w-full">
                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i" target="_blank" rel="noopener noreferrer" className="no-underline">Book a Call <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="card-standard flex flex-col">
              <h3 className="font-display font-bold text-lg mb-1">Full Stack + Dev</h3>
              <p className="text-3xl font-display font-extrabold text-primary mb-1">?3L<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
              <p className="text-xs text-muted-foreground mb-4">Monthly, 3-month minimum</p>
              <ul className="space-y-2 text-sm text-body flex-1 mb-6">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Everything in Full-Stack Growth</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Website dev & CRO</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Dedicated bench specialists</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" /> Bi-weekly strategy calls</li>
              </ul>
              <Button asChild size="sm" className="w-full">
                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i" target="_blank" rel="noopener noreferrer" className="no-underline">Book a Call <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </motion.div>
          </div>
          <motion.p className="text-center text-sm text-muted-foreground mt-8">
            All plans include a 7-day free trial. No commitment. If you don't see value in the first week, you walk away.
          </motion.p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-dark text-center">
        <div className="container-site">
          <h2 className="text-white mb-4">Not sure which services you need?</h2>
          <p className="text-faint text-lg max-w-xl mx-auto leading-relaxed mb-10">
            That's what the audit call is for. We'll look at your current setup, identify the highest-impact gaps, and tell you honestly where we'd start.
          </p>
          <Button asChild size="lg">
            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i" target="_blank" rel="noopener noreferrer" className="no-underline">
              Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Services;
