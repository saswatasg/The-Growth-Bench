import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp } from '@/lib/motion';

const pastProjects = [
  {
    client: 'US D2C Furniture Brand',
    stat: '₹3.5 Cr / month recovered',
    description: 'The problem: a 73.1% checkout abandonment rate across 480,000 monthly sessions — the kind of leak that swallows ad spend before it converts. What we did: rebuilt the checkout flow, fixed mobile-specific friction points, and replaced one-off redesign guesses with a systematic conversion-testing process. The result: in a 22-day A/B test on 10% traffic, checkout abandonment fell from 73.1% to 53.9% — a 26% relative drop — with a 28.71% lift in add-to-cart rate.',
    tags: ['CRO', 'E-Commerce', 'UX'],
    before: '73.1% checkout abandonment',
    after: '53.9% checkout abandonment',
    timeline: '22-day A/B test',
  },
  {
    client: 'D2C Coffee Brand',
    stat: '357% revenue growth in 3 months',
    description: 'Full-funnel e-commerce overhaul: revamped the entire website, set up precise tracking and analytics, and launched high-converting ad campaigns. In just 3 months, ROAS went from 1.8x to 6.7x with sustainable CAC.',
    tags: ['E-Commerce', 'Web Development', 'Ads'],
    before: '1.8x ROAS',
    after: '6.7x ROAS',
    timeline: '3 months',
  },
  {
    client: 'D2C Skincare Brand',
    stat: '4.2x ROAS in 60 days',
    description: 'Burned through Meta Ads budget with no results. Rebuilt the entire funnel — landing pages, tracking, creative strategy. Within 60 days, ROAS went from sub-1x to 4.2x while reducing CAC by 38%.',
    tags: ['Ads', 'CRO', 'Analytics'],
    before: 'Sub-1x ROAS, rising CAC',
    after: '4.2x ROAS, 38% lower CAC',
    timeline: '60 days',
  },
  {
    client: 'B2B SaaS Startup — Fintech',
    stat: '3x demo requests in 90 days',
    description: 'Full go-to-market build: website redesign, CRM integration, nurture sequences, and LinkedIn Ads campaigns. Demo requests tripled while cost per demo dropped 44%.',
    tags: ['Strategy', 'Ads', 'Lead Systems'],
    before: 'Inconsistent demo pipeline',
    after: '3x demo requests, 44% lower cost per demo',
    timeline: '90 days',
  },
  {
    client: 'D2C Fashion Brand',
    stat: '62% lower CAC, 2.8x revenue',
    description: 'Restructured ad accounts, rebuilt landing pages, implemented AI-powered follow-up sequences. Customer acquisition cost dropped 62% while revenue grew 2.8x over 5 months.',
    tags: ['Ads', 'AI Implementation', 'CRO'],
    before: 'High CAC, thin margins',
    after: '62% lower CAC, 2.8x revenue',
    timeline: '5 months',
  },
  {
    client: 'D2C Health & Wellness',
    stat: '41% repeat purchase rate',
    description: 'Built a complete retention engine: email flows, WhatsApp sequences, review automation, and post-purchase systems. Repeat purchase rate went from 12% to 41% in 4 months.',
    tags: ['Content & Email', 'AI Implementation', 'Lead Systems'],
    before: '12% repeat purchase rate',
    after: '41% repeat purchase rate',
    timeline: '4 months',
  },
];

const allTags = [...new Set(pastProjects.flatMap((p) => p.tags))].sort();

const Proof = () => {
  const { openBookingModal } = useBookingModal();
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All'
    ? pastProjects
    : pastProjects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <PageMeta />

      {/* Hero */}
      <section className="bg-canvas py-[60px] md:py-[120px]">
        <div className="container-site text-center">
          <span className="text-label-xs text-mute uppercase tracking-wider">Case Studies</span>
          <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
            Work that speaks<br />for itself.
          </h1>
          <p className="text-body-md text-mute mt-6 max-w-xl mx-auto leading-relaxed">
            Real results from real engagements. Every project starts with a diagnosis.
          </p>
        </div>
      </section>

      {/* Comparison — Freelancer vs Agency vs Bench */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">Side by side</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">The same job, three ways.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {/* Freelancer */}
            <div className="p-6 border border-hairline bg-canvas flex flex-col">
              <span className="text-label-xs text-mute uppercase tracking-wider mb-3">Freelancer</span>
              <p className="text-body-sm text-mute leading-relaxed mb-5">Good people, limited scope. No systems, no strategy ownership. You outgrow them fast.</p>
              <div className="space-y-3 text-body-sm">
                <div className="flex justify-between"><span className="text-mute">Owns funnel</span><span className="text-ink">One lane</span></div>
                <div className="flex justify-between"><span className="text-mute">First win</span><span className="text-ink">Weeks–months</span></div>
                <div className="flex justify-between"><span className="text-mute">Overhead</span><span className="text-ink">None</span></div>
                <div className="flex justify-between"><span className="text-mute">AI</span><span className="text-ink">Manual tools</span></div>
                <div className="flex justify-between"><span className="text-mute">Proof</span><span className="text-mute">—</span></div>
              </div>
              <div className="mt-5 pt-4 border-t border-hairline-soft text-body-sm text-sale font-medium">No full funnel view</div>
            </div>

            {/* The Growth Bench — featured */}
            <div className="p-6 border-2 border-ink bg-canvas flex flex-col relative order-first md:order-none">
              <div className="absolute -top-3 left-6 bg-ink text-canvas text-label-xs uppercase tracking-wider px-4 py-1.5 rounded-full">Best of both</div>
              <span className="text-label-xs text-ink uppercase tracking-wider mt-2 mb-3">The Growth Bench</span>
              <p className="text-body-sm text-mute leading-relaxed mb-5">One senior partner who owns the full picture. Specialists on demand. Depth without overhead.</p>
              <div className="space-y-3 text-body-sm">
                <div className="flex justify-between"><span className="text-mute">Owns funnel</span><span className="text-ink font-medium">Yes — full context</span></div>
                <div className="flex justify-between"><span className="text-mute">First win</span><span className="text-ink font-medium">Weeks</span></div>
                <div className="flex justify-between"><span className="text-mute">Overhead</span><span className="text-ink font-medium">None</span></div>
                <div className="flex justify-between"><span className="text-mute">AI</span><span className="text-ink font-medium">Agentic systems</span></div>
                <div className="flex justify-between"><span className="text-mute">Proof</span><span className="text-ink font-medium">$425K/mo recovered</span></div>
              </div>
              <div className="mt-5 pt-4 border-t border-ink/10 space-y-2">
                {['One partner, full context', 'Specialists on demand', 'First wins in weeks'].map(item => (
                  <div key={item} className="text-body-sm text-ink flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Agency */}
            <div className="p-6 border border-hairline bg-canvas flex flex-col">
              <span className="text-label-xs text-mute uppercase tracking-wider mb-3">Agency</span>
              <p className="text-body-sm text-mute leading-relaxed mb-5">Expensive retainers, slow onboarding, layers between you and the people doing the work.</p>
              <div className="space-y-3 text-body-sm">
                <div className="flex justify-between"><span className="text-mute">Owns funnel</span><span className="text-ink">Handoffs</span></div>
                <div className="flex justify-between"><span className="text-mute">First win</span><span className="text-ink">A quarter+</span></div>
                <div className="flex justify-between"><span className="text-mute">Overhead</span><span className="text-ink">Retainer + layers</span></div>
                <div className="flex justify-between"><span className="text-mute">AI</span><span className="text-ink">Pilots that stall</span></div>
                <div className="flex justify-between"><span className="text-mute">Proof</span><span className="text-mute">—</span></div>
              </div>
              <div className="mt-5 pt-4 border-t border-hairline-soft text-body-sm text-sale font-medium">Paying for what you don&apos;t use</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Case Studies */}
      <motion.section {...fadeUp} className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">Case studies</span>
          </div>
          <div className="flex flex-wrap gap-3 mb-10">
            {['All', ...allTags].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                className={`px-5 py-3 text-button-sm rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${
                  activeTag === tag
                    ? 'bg-ink text-canvas border-ink'
                    : 'bg-canvas text-mute border-hairline hover:border-ink hover:text-ink'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((project) => (
                <div key={project.client} className="p-6 border border-hairline-soft bg-canvas">
                  <p className="text-caption-sm text-mute uppercase tracking-wide mb-1">{project.client}</p>
                  <div className="font-display text-heading-xl md:text-display-lg text-ink leading-none my-4 break-words">{project.stat}</div>
                  <p className="text-body-sm text-mute leading-relaxed mb-4">{project.description}</p>
                  {(project.before || project.after) && (
                    <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-soft-cloud">
                      <div>
                        <span className="text-label-xs text-mute uppercase tracking-wider block mb-1">Before</span>
                        <span className="text-body-sm text-ink font-medium">{project.before}</span>
                      </div>
                      <div>
                        <span className="text-label-xs text-mute uppercase tracking-wider block mb-1">After</span>
                        <span className="text-body-sm text-success font-medium">{project.after}</span>
                      </div>
                    </div>
                  )}
                  {project.timeline && (
                    <p className="text-caption-sm text-mute mb-4">Timeline: {project.timeline}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-label-xs text-mute bg-soft-cloud px-2.5 py-1 rounded-full uppercase">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-body-sm text-mute">No projects with this tag yet.</p>
              <button onClick={() => setActiveTag('All')} className="text-body-sm text-ink underline underline-offset-2 mt-2">View all projects</button>
            </div>
          )}
        </div>
      </motion.section>

      {/* AI Implementation callout — full width */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="p-6 md:p-8 border-2 border-ink bg-canvas">
            <span className="text-label-xs text-mute uppercase tracking-wider">AI Implementation</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Our automation engine, productized.</h2>
            <p className="text-body-md text-mute mt-4 leading-relaxed max-w-2xl">
              The content and SEO automation pipeline behind large-scale catalog work is one example — our agents now also run ops, support, and follow-ups end-to-end. Nothing goes live without a human-review period.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="/services" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors">
                See AI Implementation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/ai-scorecard" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors">
                Take the 60-second AI scorecard <ArrowRight className="w-4 h-4" />
              </Link>
              <Button size="sm" onClick={openBookingModal}>Book a Free Audit Call</Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section {...fadeUp} className="bg-ink py-[48px] md:py-[100px]">
        <div className="container-site text-center">
          <h2 className="font-display text-heading-xl md:text-display-md text-canvas leading-none">
            Ready to see what&apos;s<br />actually leaking?
          </h2>
          <p className="text-body-md text-hairline mt-4 max-w-xl mx-auto leading-relaxed">
            30 minutes. One concrete recommendation.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
              Book a Free Audit Call
            </Button>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Proof;
