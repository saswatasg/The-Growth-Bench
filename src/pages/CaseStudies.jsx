import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import { TiltCard } from '@/components/TiltCard';

const pastProjects = [
  {
    client: 'Founder, US D2C Furniture Brand',
    stat: '$329K / month recovered',
    description: 'Complete cart & checkout flow redesign. Cut checkout abandonment by 26%, lifted mobile conversion by 47%. Automated Salesforce journeys drove +$113K/month.',
    details: [
      'AI-powered lead assistant → 71.63% close rate',
      '118 SKU optimisation → ATC rate up 18.17%, +$32K/month',
      'Bounce rate down 20.7% (41.04% → 32.54%)',
      'Lead submissions up 105% (2.14% → 4.40%)',
    ],
    tags: ['CRO', 'E-Commerce', 'UX', 'Analytics', 'Salesforce'],
  },
  {
    client: 'Founder, Premium D2C Coffee Brand',
    stat: '5.7x ROAS (from 1.8x)',
    description: 'Full-funnel rebuild from scratch. Redesigned website, set up tracking infrastructure, and launched high-converting campaigns across Google and Meta. Revenue scaled 3x in the first quarter.',
    details: [
      'Website redesign + analytics infrastructure',
      'Google Ads + Meta campaign architecture',
      'Full-funnel attribution setup',
      'Sustainable CAC at scale',
    ],
    tags: ['Web Development', 'Google Ads', 'Meta Ads', 'Analytics'],
  },
  {
    client: 'Founder, Building Materials Brand',
    stat: '13.7x ROAS',
    description: 'End-to-end digital transformation for a traditional business. Designed the website, implemented conversion tracking, and launched Search, PMax, and call-focused campaigns. Qualified leads surged within weeks.',
    details: [
      'Complete website design & development',
      'Analytics + conversion tracking implementation',
      'Search, PMax, and call-focused campaigns',
      'Dominant position in competitive market',
    ],
    tags: ['Web Development', 'Google Ads', 'Analytics'],
  },
  {
    client: 'Founder, Vintage Auto Parts E-Commerce',
    stat: '118% Europe growth · 95% US growth',
    description: 'Multi-market expansion across US and Europe with profitable growth. Balanced CAC across markets, optimised localised campaigns, and built scalable ad infrastructure.',
    details: [
      'Europe sales up 118%, US revenue up 95% in 4 months',
      '6.4x ROAS across both markets',
      'Scaled without sacrificing margins',
    ],
    tags: ['Performance Marketing', 'Meta Ads', 'Google Ads'],
  },
  {
    client: 'Product Lead, B2B SaaS Compliance Platform',
    stat: '17:1 gap → closed',
    description: 'Diagnosed and closed a massive product adoption gap. PRO+ subscribers were bypassing the native E-Way Bill module at a 17:1 ratio. Built the case to prioritise the fix and redesigned the notification strategy.',
    details: [
      'E-Way Bill adoption gap closed from 17:1 to parity',
      'E-Invoice gap closed from 19:1',
      'Full notification system redesign',
    ],
    tags: ['Product Strategy', 'B2B SaaS', 'Analytics', 'UX'],
  },
  {
    client: 'CEO, Education Enrollment Platform',
    stat: '154.5% sales lift · 24% enrollment boost',
    description: 'Full-stack growth overhaul. Redesigned acquisition funnels, optimised ad spend, and built a lead nurturing system that dramatically reduced CAC while scaling volume.',
    details: [
      'Sales increased 154.5% within campaign period',
      'Enrollments up 24% through funnel optimisation',
      'Certificate of Excellence for overall impact',
    ],
    tags: ['Performance Marketing', 'CRO', 'Strategy'],
  },
  {
    client: 'Campaign Director, Social Impact Organization',
    stat: '122% traffic · 158% engagement',
    description: 'Meta-driven campaign strategy on a limited budget. Designed targeted creatives, built lookalike audiences, and optimised delivery for maximum impact per rupee.',
    details: [
      'Website traffic increased 122%',
      'Social engagement up 158%',
      'Exceptional CTR on limited budget',
    ],
    tags: ['Meta Ads', 'Social Media', 'Creative Strategy'],
  },
  {
    client: 'Creative Director, Commercial Studio',
    stat: '58+ projects · 95%+ satisfaction',
    description: 'Built and scaled a commercial creative studio from scratch. Led a 6-person team delivering 58+ projects across events and commercial work.',
    details: [
      '95%+ client satisfaction across all engagements',
      'Built repeat-business model with consistent referrals',
    ],
    tags: ['Team Leadership', 'Client Management', 'Creative Direction'],
  },
  {
    client: 'Strategy Lead, Enterprise Technology Group',
    stat: '30-day AI agent deployment',
    description: 'Led discovery engagements for enterprise clients exploring AI agent adoption. Mapped workflows, diagnosed bottlenecks, and identified top automation opportunities per client.',
    details: [
      '12 industry verticals assessed for AI viability',
      'ROI estimates produced per agent opportunity identified',
      'Bridged client business problems to engineering architecture',
    ],
    tags: ['AI Strategy', 'Product Discovery', 'Enterprise'],
  },
];

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const allTags = [...new Set(pastProjects.flatMap((p) => p.tags))].sort();

const CaseStudies = () => {
  const { openBookingModal } = useBookingModal();
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All'
    ? pastProjects
    : pastProjects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <PageMeta />

      <section className="section-light pt-20 text-center">
        <div className="container-site">
          <motion.div {...stagger}>
            <nav aria-label="breadcrumb" className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium" aria-current="page">Case Studies</span>
            </nav>
          </motion.div>
          <motion.div {...stagger} className="section-eyebrow justify-center">CASE STUDIES</motion.div>
          <motion.h1 {...stagger} transition={{ ...stagger.transition, delay: 0.08 }}>Work that speaks for itself.</motion.h1>
          <motion.p {...stagger} transition={{ ...stagger.transition, delay: 0.16 }} className="text-body text-lg max-w-xl mx-auto leading-relaxed">
            Every project starts with a diagnosis. Here's what we found, what we changed, and what happened.
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="section-mid pt-6 pb-8">
        <div className="container-site">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag('All')}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                activeTag === 'All'
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-muted-foreground border-border hover:border-primary/30 hover:text-primary'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  activeTag === tag
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-muted-foreground border-border hover:border-primary/30 hover:text-primary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mid pt-0">
        <div className="container-site">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.client}
                  {...stagger}
                  transition={{ ...stagger.transition, delay: i * 0.06 }}
                >
                  <TiltCard tiltFactor={6} glare={false} className="card-standard h-full">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1.5">{project.client}</p>
                    <div className="text-xl font-bold text-primary mb-3">{project.stat}</div>
                    <p className="text-sm text-body leading-relaxed mb-4">{project.description}</p>
                    <ul className="space-y-1.5">
                      {project.details.map((d) => (
                        <li key={d} className="text-sm text-body flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-primary" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No projects with this tag yet.</p>
              <button onClick={() => setActiveTag('All')} className="link-arrow text-sm mt-2">View all projects</button>
            </div>
          )}
        </div>
      </section>

      <section className="section-light">
        <div className="container-site">
          <motion.div {...stagger}>
            <h2 className="mb-8">Insights from the same playbook</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/insights/we-fixed-checkout-flow-recovered-2-89-crore-month" className="card-standard block no-underline group">
                <span className="tag tag-green mb-2 self-start inline-block">CRO</span>
                <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors">We fixed a checkout flow. Recovered ₹2.89Cr/month.</h3>
                <p className="text-sm text-body leading-relaxed mb-3">A step-by-step breakdown of how we diagnosed checkout leaks, rebuilt the flow, and recovered $329K/month.</p>
                <span className="link-arrow text-sm">Read<ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
              </Link>
              <Link to="/insights/funnel-audit-101-find-the-leak-before-spending-more-on-ads" className="card-standard block no-underline group">
                <span className="tag tag-green mb-2 self-start inline-block">CRO</span>
                <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors">Funnel Audit 101: Find the leak before spending more on ads</h3>
                <p className="text-sm text-body leading-relaxed mb-3">Running ads to a broken funnel costs you money. Here's the audit framework we use to find leaks in under an hour.</p>
                <span className="link-arrow text-sm">Read<ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-dark text-center">
        <div className="container-site">
          <h2 className="text-white mb-4">Want results like these?</h2>
          <p className="text-faint text-lg max-w-lg mx-auto leading-relaxed mb-10">
            Every project starts with a free 30-minute audit. We'll tell you honestly if we can help and what the fastest path looks like.
          </p>
          <Button size="lg" onClick={openBookingModal}>Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
