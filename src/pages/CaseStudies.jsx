import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp, fadeIn } from '@/lib/motion';

const pastProjects = [
  {
    client: 'US D2C Furniture Brand',
    stat: '$329K / month recovered',
    description: 'Complete cart & checkout flow redesign. Cut checkout abandonment by 26%, lifted mobile conversion by 47%. Automated Salesforce journeys drove +$113K/month.',
    tags: ['CRO', 'E-Commerce', 'UX'],
  },
  {
    client: 'Premium D2C Coffee Brand',
    stat: '5.7x ROAS (from 1.8x)',
    description: 'Full-funnel rebuild from scratch. Redesigned website, set up tracking infrastructure, and launched high-converting campaigns across Google and Meta. Revenue scaled 3x in the first quarter.',
    tags: ['Web Development', 'Google Ads', 'Meta Ads'],
  },
  {
    client: 'Building Materials Brand',
    stat: '13.7x ROAS',
    description: 'End-to-end digital transformation. Designed the website, implemented conversion tracking, and launched Search, PMax, and call-focused campaigns. Qualified leads surged within weeks.',
    tags: ['Web Development', 'Google Ads'],
  },
  {
    client: 'Vintage Auto Parts E-Commerce',
    stat: '118% Europe · 95% US growth',
    description: 'Multi-market expansion across US and Europe with profitable growth. Balanced CAC across markets and built scalable ad infrastructure.',
    tags: ['Performance Marketing', 'Meta Ads'],
  },
  {
    client: 'B2B SaaS Compliance Platform',
    stat: '17:1 adoption gap → closed',
    description: 'Diagnosed and closed a massive product adoption gap. Redesigned notification strategy and built the case to prioritise the fix.',
    tags: ['Product Strategy', 'B2B SaaS', 'UX'],
  },
  {
    client: 'Education Enrollment Platform',
    stat: '154.5% sales lift',
    description: 'Full-stack growth overhaul. Redesigned acquisition funnels, optimised ad spend, and built a lead nurturing system that reduced CAC while scaling volume.',
    tags: ['Performance Marketing', 'CRO', 'Strategy'],
  },
  {
    client: 'Social Impact Organization',
    stat: '122% traffic · 158% engagement',
    description: 'Meta-driven campaign strategy on a limited budget. Targeted creatives, lookalike audiences, optimised delivery for maximum impact per rupee.',
    tags: ['Meta Ads', 'Creative Strategy'],
  },
  {
    client: 'Commercial Studio',
    stat: '58+ projects · 95%+ satisfaction',
    description: 'Built and scaled a commercial creative studio from scratch. Led a 6-person team delivering 58+ projects across events and commercial work.',
    tags: ['Team Leadership', 'Creative Direction'],
  },
  {
    client: 'Enterprise Technology Group',
    stat: '30-day AI agent deployment',
    description: 'Led discovery engagements for enterprise clients exploring AI agent adoption. Mapped workflows, diagnosed bottlenecks, identified top automation opportunities.',
    tags: ['AI Strategy', 'Product Discovery'],
  },
];

const allTags = [...new Set(pastProjects.flatMap((p) => p.tags))].sort();

const CaseStudies = () => {
  const { openBookingModal } = useBookingModal();
  const [activeTag, setActiveTag] = React.useState('All');

  const filtered = activeTag === 'All'
    ? pastProjects
    : pastProjects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">Our Work</span>
            <h1 className="font-display text-display-md text-ink mt-2 leading-none">
              Work that speaks<br />for itself.
            </h1>
            <p className="text-body-md text-mute mt-6 max-w-xl leading-relaxed">
              Every project starts with a diagnosis. Here's what we found, what we changed, and what happened.
            </p>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-soft-cloud">
        <div className="container-site py-section-lg">
          <div className="flex flex-wrap gap-3 mb-10">
            {['All', ...allTags].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2.5 text-button-sm rounded-full border transition-colors ${
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

      <motion.section {...fadeUp} className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <h2 className="font-display text-display-md text-ink leading-none mb-8">From the same playbook</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/insights/we-fixed-checkout-flow-recovered-2-89-crore-month" className="block p-6 border border-hairline-soft bg-canvas no-underline group">
              <span className="inline-block text-label-xs text-mute bg-soft-cloud px-3 py-1 rounded-full mb-2 uppercase">CRO</span>
              <h3 className="text-heading-md text-ink mb-2 group-hover:text-mute transition-colors">We fixed a checkout flow. Recovered ₹2.89Cr/month.</h3>
              <span className="text-body-sm text-ink flex items-center gap-1">Read <ArrowRight className="w-3.5 h-3.5" /></span>
            </Link>
            <Link to="/insights/funnel-audit-101-find-the-leak-before-spending-more-on-ads" className="block p-6 border border-hairline-soft bg-canvas no-underline group">
              <span className="inline-block text-label-xs text-mute bg-soft-cloud px-3 py-1 rounded-full mb-2 uppercase">CRO</span>
              <h3 className="text-heading-md text-ink mb-2 group-hover:text-mute transition-colors">Funnel Audit 101: Find the leak before spending more on ads</h3>
              <span className="text-body-sm text-ink flex items-center gap-1">Read <ArrowRight className="w-3.5 h-3.5" /></span>
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="bg-ink py-section-lg text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas leading-none mb-6">
            Want results<br />like these?
          </h2>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
            Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.section>
    </>
  );
};

export default CaseStudies;
