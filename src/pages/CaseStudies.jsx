import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import CtaPaths from '@/components/CtaPaths';
import { fadeUp, fadeIn } from '@/lib/motion';

const pastProjects = [
  {
    client: 'Sierra Living Concepts — US D2C Furniture Brand',
    stat: '₹2.89 Cr / month recovered',
    description: 'The problem: a 73.1% checkout abandonment rate across 480,000 monthly sessions — the kind of leak that swallows ad spend before it converts. What we did: rebuilt the checkout flow, fixed mobile-specific friction points, and replaced one-off redesign guesses with a systematic conversion-testing process. The result: in a 22-day A/B test on 10% traffic, checkout abandonment fell from 73.1% to 53.9% — a 26% relative drop — with a 28.71% lift in add-to-cart rate. Mobile conversion rate ended up ahead of Wayfair\u2019s.',
    tags: ['CRO', 'E-Commerce', 'UX'],
  },
  // SNAPSHOT — only the 357% figure and the homepage testimonial are confirmed for Caffena.
  // Framed publicly as an early-win snapshot until traffic, test window, and
  // attribution reach Sierra-level methodology. Do not expand without source.
  {
    client: 'Caffena Coffee — D2C Coffee Brand',
    stat: '357% revenue growth in 3 months',
    description: 'Early-win snapshot (full teardown pending). Full-funnel e-commerce overhaul: revamped the entire website, set up precise tracking and analytics, and launched high-converting ad campaigns. In just 3 months, ROAS went from 1.8x to 5.7x with sustainable CAC.',
    tags: ['E-Commerce', 'Web Development', 'Ads', 'Snapshot'],
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
            <span className="text-label-xs text-mute uppercase tracking-wider">Case Studies</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
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
          <div className="p-6 md:p-8 border-2 border-ink bg-canvas max-w-4xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">AI Implementation</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">The Sierra engine, productized.</h2>
            <p className="text-body-md text-mute mt-4 leading-relaxed max-w-2xl">
              The content and SEO automation pipeline behind Sierra-scale catalog work is one example — our agents now also run ops, support, and follow-ups end-to-end. Nothing goes live without a human-review period.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="/services#ai-implementation" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors">
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
          <div className="mt-6">
            <CtaPaths tone="dark" />
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default CaseStudies;
