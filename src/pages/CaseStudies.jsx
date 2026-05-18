import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { TiltCard } from '@/components/TiltCard';

const pastProjects = [
  {
    client: 'Founder, US D2C Furniture Brand',
    stat: '$329K / month recovered',
    description: 'Complete cart & checkout flow redesign. Cut checkout abandonment by 26%, lifted mobile conversion by 47%, reduced checkout time by 34%. Automated Salesforce journeys drove +$113K/month. Built 5 pricing tools that increased custom orders by 34%.',
    details: [
      'AI-powered lead assistant → 71.63% close rate',
      '118 SKU optimisation → ATC rate up 18.17%, +$32K/month',
      'Bounce rate down 20.7% (41.04% → 32.54%)',
      'Lead submissions up 105% (2.14% → 4.40%)',
      '70+ product and UX rollouts managed end-to-end',
    ],
    tags: ['CRO', 'E-Commerce', 'UX', 'Analytics', 'Salesforce'],
  },
  {
    client: 'Founder, Premium D2C Coffee Brand',
    stat: '5.7x ROAS (from 1.8x)',
    description: 'Full-funnel rebuild from scratch. Redesigned the entire website, set up precise tracking and analytics infrastructure, and launched high-converting ad campaigns across Google and Meta. Achieved sustainable CAC while scaling revenue 3x in the first quarter.',
    details: [
      'Website redesign + analytics infrastructure',
      'Google Ads + Meta campaign architecture',
      'Full-funnel attribution setup',
      'Sustainable CAC at scale',
    ],
    tags: ['Web Development', 'Google Ads', 'Meta Ads', 'Analytics', 'CRO'],
  },
  {
    client: 'Founder, Building Materials Brand',
    stat: '13.7x ROAS',
    description: 'End-to-end digital transformation for a traditional business entering online channels. Designed the complete website, implemented conversion tracking and analytics, and launched Search, Performance Max, and call-focused campaigns. Qualified leads surged within weeks.',
    details: [
      'Complete website design & development',
      'Analytics + conversion tracking implementation',
      'Search, PMax, and call-focused campaigns',
      'Dominant position in competitive market',
    ],
    tags: ['Web Development', 'Google Ads', 'Analytics', 'SEO'],
  },
  {
    client: 'Founder, Vintage Auto Parts E-Commerce',
    stat: '118% Europe growth · 95% US growth',
    description: 'Multi-market expansion strategy across US and Europe while maintaining profitable growth. Balanced CAC across markets, optimised localised campaigns, and built scalable ad infrastructure. Revenue doubled in both regions within 4 months.',
    details: [
      'Europe sales up 118% in 4 months',
      'US revenue up 95% in 4 months',
      '6.4x ROAS across both markets',
      'Scaled without sacrificing margins',
    ],
    tags: ['Performance Marketing', 'Meta Ads', 'Google Ads', 'Strategy'],
  },
  {
    client: 'Product Lead, B2B SaaS Compliance Platform',
    stat: '17:1 gap → closed',
    description: 'Diagnosed and closed massive product adoption gaps for a B2B SaaS platform serving Indian SMBs. Identified that PRO+ subscribers were bypassing the native E-Way Bill module at a 17:1 ratio in favour of Tally. Built the executive case to prioritise the fix and led the notification strategy overhaul.',
    details: [
      'E-Way Bill adoption gap closed from 17:1 to parity',
      'E-Invoice gap closed from 19:1',
      'Full notification system redesign',
      'Multi-tier feature adoption strategy',
    ],
    tags: ['Product Strategy', 'B2B SaaS', 'Analytics', 'UX'],
  },
  {
    client: 'CEO, Education Enrollment Platform',
    stat: '154.5% sales lift · 24% enrollment boost',
    description: 'Full-stack growth overhaul for an education enrollment business. Redesigned acquisition funnels, optimised ad spend across channels, and built a lead nurturing system that dramatically reduced CAC while scaling volume.',
    details: [
      'Sales increased 154.5% within campaign period',
      'Enrollments up 24% through funnel optimisation',
      'Reduced customer acquisition cost via market research',
      'Certificate of Excellence for overall impact',
    ],
    tags: ['Performance Marketing', 'CRO', 'Strategy', 'Analytics'],
  },
  {
    client: 'Campaign Director, Social Impact Organization',
    stat: '122% traffic · 158% engagement',
    description: 'Meta-driven campaign strategy for a social awareness initiative with limited budget. Designed targeted ad creatives, built lookalike audiences from engaged users, and optimised delivery for maximum impact per rupee spent.',
    details: [
      'Website traffic increased 122% through Meta campaigns',
      'Social engagement up 158% across all channels',
      'Creative assets designed for brand consistency',
      'Achieved exceptional CTR on limited budget',
    ],
    tags: ['Meta Ads', 'Social Media', 'Creative Strategy'],
  },
  {
    client: 'Creative Director, Commercial Studio',
    stat: '58+ projects · 95%+ client satisfaction',
    description: 'Built and scaled a commercial creative studio from scratch. Led a 6-person team delivering photography, video, and brand content for 58+ clients across events and commercial work. Managed end-to-end client relationships and project delivery.',
    details: [
      'Delivered 58+ commercial projects on time and budget',
      '95%+ client satisfaction across all engagements',
      'Led and managed a 6-person creative team',
      'Built repeat-business model with consistent referrals',
    ],
    tags: ['Team Leadership', 'Client Management', 'Creative Direction'],
  },
  {
    client: 'Strategy Lead, Enterprise Technology Group',
    stat: '30-day AI agent deployment',
    description: 'Led end-to-end discovery engagements for enterprise clients exploring AI agent adoption. Mapped workflows, diagnosed bottlenecks, and identified the top 3 highest-impact automation opportunities per client. Produced written blueprints before any code was written.',
    details: [
      '12 industry verticals assessed for AI agent viability',
      '45-minute AI posture audits conducted per engagement',
      'ROI estimates produced per agent opportunity identified',
      'Bridged gap between client business problems and engineering architecture briefs',
    ],
    tags: ['AI Strategy', 'Product Discovery', 'Enterprise', 'Solution Architecture'],
  },
];

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const CaseStudies = () => {
  return (
    <>
      <PageMeta />

      <section className="section-light pt-32 pb-24">
        <div className="container-site">
          <motion.div {...stagger}>
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium" aria-current="page">Past Projects</span>
            </nav>
          </motion.div>
          <motion.div {...stagger} className="section-eyebrow">PAST PROJECTS</motion.div>
          <motion.h1 {...stagger} transition={{ ...stagger.transition, delay: 0.08 }}>Work that speaks for itself.</motion.h1>
          <motion.p {...stagger} transition={{ ...stagger.transition, delay: 0.16 }} className="text-body text-lg max-w-xl leading-relaxed">
            Every project starts with a diagnosis. Here's what we've found, what we changed, and what happened as a result.
          </motion.p>
        </div>
      </section>

      <section className="section-alt">
        <div className="container-site">
          <div className="space-y-8">
            {pastProjects.map((project, i) => (
              <motion.div
                key={project.client}
                {...stagger}
                transition={{ ...stagger.transition, delay: i * 0.08 }}
              >
                <TiltCard tiltFactor={6} glare={false} className="card-standard">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{project.client}</p>
                  <div className="stat-number-dark text-2xl mb-3" style={{ fontSize: '1.75rem' }}>{project.stat}</div>
                  <p className="text-sm text-body leading-relaxed mb-4">{project.description}</p>
                  <ul className="space-y-1.5">
                    {project.details.map((d) => (
                      <li key={d} className="text-sm text-body flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: 'var(--color-primary)' }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Insights */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...stagger}>
            <h2 className="mb-8">Insights from the same playbook</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/insights/we-fixed-checkout-flow-recovered-2-89-crore-month" className="card-standard block no-underline group">
                <span className="tag tag-green mb-2 self-start inline-block">CRO</span>
                <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">We fixed a checkout flow. Recovered ₹2.89Cr/month.</h3>
                <p className="text-sm text-body leading-relaxed mb-3">A step-by-step breakdown of how we diagnosed checkout leaks, rebuilt the flow, and recovered $329K/month for a US D2C furniture brand.</p>
                <span className="link-arrow text-sm">Read<ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
              </Link>
              <Link to="/insights/funnel-audit-101-find-the-leak-before-spending-more-on-ads" className="card-standard block no-underline group">
                <span className="tag tag-green mb-2 self-start inline-block">CRO</span>
                <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">Funnel Audit 101: Find the leak before spending more on ads</h3>
                <p className="text-sm text-body leading-relaxed mb-3">Running ads to a broken funnel costs you money. Here's the exact audit framework we use to find leaks in under an hour.</p>
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

export default CaseStudies;
