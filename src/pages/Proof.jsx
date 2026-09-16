import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import HowItWorks from '@/components/HowItWorks';
import FitFilter from '@/components/FitFilter';
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
    description: 'Full-funnel e-commerce overhaul: revamped the entire website, set up precise tracking and analytics, and launched high-converting ad campaigns. In just 3 months, ROAS went from 1.8x to 5.7x with sustainable CAC.',
    tags: ['E-Commerce', 'Web Development', 'Ads'],
    before: '1.8x ROAS',
    after: '5.7x ROAS',
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
      <section className="bg-canvas py-[100px] md:py-[120px]">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">Case Studies</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
              Work that speaks<br />for itself.
            </h1>
            <p className="text-body-md text-mute mt-6 max-w-xl leading-relaxed">
              Real results from real engagements. Every project starts with a diagnosis.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison — Freelancer vs Agency vs Bench */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="max-w-2xl mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">Side by side</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">The same job, three ways.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 items-stretch mb-10">
            <div className="p-6 border border-hairline bg-canvas flex flex-col">
              <span className="text-label-xs text-mute uppercase tracking-wider mb-2">Freelancer</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Good people, limited scope. No systems, no strategy ownership. You outgrow them fast.</p>
              <div className="mt-4 pt-4 border-t border-hairline-soft text-body-sm text-sale font-medium">No full funnel view</div>
            </div>
            <div className="p-6 border-2 border-ink bg-canvas flex flex-col relative order-first md:order-none">
              <div className="absolute -top-3 left-6 bg-ink text-canvas text-label-xs uppercase tracking-wider px-4 py-1.5 rounded-full">Best of both</div>
              <span className="text-label-xs text-ink uppercase tracking-wider mt-2 mb-2">The Growth Bench</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">One senior partner who owns the full picture. Specialists on demand. Depth without overhead.</p>
              <div className="mt-4 pt-4 border-t border-ink/10 space-y-2">
                {['One partner, full context', 'Specialists on demand', 'First wins in weeks, not quarters', 'No middlemen'].map(item => (
                  <div key={item} className="text-body-sm text-ink flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border border-hairline bg-canvas flex flex-col">
              <span className="text-label-xs text-mute uppercase tracking-wider mb-2">Agency</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Expensive retainers, slow onboarding, layers between you and the people doing the work.</p>
              <div className="mt-4 pt-4 border-t border-hairline-soft text-body-sm text-sale font-medium">Paying for what you don&apos;t use</div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="text-label-xs text-mute uppercase tracking-wider font-medium py-3 pr-4"></th>
                  <th className="text-label-xs text-mute uppercase tracking-wider font-medium py-3 pr-4">Freelancer</th>
                  <th className="text-label-xs text-mute uppercase tracking-wider font-medium py-3 pr-4">Agency</th>
                  <th className="text-label-xs text-ink uppercase tracking-wider font-medium py-3">The Growth Bench</th>
                </tr>
              </thead>
              <tbody className="text-body-sm">
                {[
                  ['Owns your full funnel', 'One lane only', 'Handoffs between layers', 'Yes — one partner, full context'],
                  ['First meaningful win', 'Weeks to months', 'A quarter or more', 'Weeks, not quarters'],
                  ['Overhead', 'None', 'Retainer + account layers', 'No middlemen, specialists on demand'],
                  ['AI automation', 'Manual tools', 'Pilots that stall', 'Agentic systems across ops + support'],
                  ['Proof you can check', '—', '—', '$425K/mo recovered, 73.1% → 53.9%'],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-hairline-soft last:border-b-0">
                    <td className="py-4 pr-4 font-medium text-ink">{row[0]}</td>
                    <td className="py-4 pr-4 text-mute">{row[1]}</td>
                    <td className="py-4 pr-4 text-mute">{row[2]}</td>
                    <td className="py-4 text-ink font-medium">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-caption-sm text-mute mt-6">
            For D2C brands doing ₹10L–₹10Cr/month.
          </p>
        </div>
      </motion.section>

      {/* Case Studies */}
      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">Case studies</span>
            <div className="flex-1 h-px bg-hairline-soft" />
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
                  <div className="font-display text-display-lg text-ink leading-none my-4">{project.stat}</div>
                  <p className="text-body-sm text-mute leading-relaxed mb-4">{project.description}</p>
                  {(project.before || project.after) && (
                    <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-soft-cloud rounded-sm">
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

      {/* AI Implementation callout */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="p-6 md:p-8 border-2 border-ink bg-canvas max-w-4xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">AI Implementation</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">Our automation engine, productized.</h2>
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

      <HowItWorks className="bg-canvas" />
      <FitFilter className="bg-soft-cloud" />
    </>
  );
};

export default Proof;
