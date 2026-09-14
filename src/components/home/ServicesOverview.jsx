import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Code2, Target, TrendingUp, Users, Palette, FileText, BarChart3, ArrowRight, Workflow } from 'lucide-react';

const services = [
  { num: '01', name: 'AI Implementation', icon: Workflow, desc: 'Agentic AI for anything repeatable: ops, support, content, follow-ups, reviews.', to: '/services#ai-implementation', featured: true },
  { num: '02', name: 'Growth Strategy', icon: Search, desc: 'Funnel audit, ICP, 90-day roadmap before touching a single ad account.', to: '/services#strategy' },
  { num: '03', name: 'Website & Development', icon: Code2, desc: 'Full builds in Next.js, Webflow, or Shopify. CRO and analytics baked in from day one.', to: '/services#website' },
  { num: '04', name: 'Ads', icon: Target, desc: 'Meta, Google, Amazon, LinkedIn — full-funnel campaigns with proper attribution.', to: '/services#ads' },
  { num: '05', name: 'Lead Systems', icon: Users, desc: 'Landing pages, CRM, nurture sequences, scoring. Not just a form — a system.', to: '/services#lead-systems' },
  { num: '06', name: 'CRO', icon: TrendingUp, desc: 'Qualitative research, quantitative analysis, structured A/B testing.', to: '/services#cro' },
  { num: '07', name: 'UI/UX Design', icon: Palette, desc: 'Research-grounded design in Figma. Dev-ready handoffs.', to: '/services#ui-ux' },
  { num: '08', name: 'Content & Email', icon: FileText, desc: 'Email flows, WhatsApp sequences, SEO strategy, content architecture.', to: '/services#content-email' },
  { num: '09', name: 'Analytics & Reporting', icon: BarChart3, desc: 'Dashboards, attribution, GA4, CAPI — own your data.', to: '/services#analytics' },
];

const ServicesOverview = () => {
  return (
    <section className="bg-ink dark:bg-canvas py-section-lg">
      <div className="container-site">
        <span className="text-label-xs text-stone dark:text-mute uppercase tracking-wider mb-3 block">WHAT WE DO</span>
        <h2 className="font-display text-heading-xl text-canvas dark:text-ink mb-2">The full stack, handled.</h2>
        <p className="text-body-md text-stone dark:text-mute max-w-xl mb-10">
          From the first strategy call to the live campaign to the optimised checkout — plus the AI systems that take repetitive work off your plate. We cover the entire growth surface.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => {
            const Icon = s.icon;
            if (s.featured) {
              return (
                <Link
                  key={s.num}
                  to={s.to}
                  className="group block p-6 no-underline bg-canvas dark:bg-ink border border-canvas dark:border-ink hover:opacity-95 transition-opacity relative sm:col-span-2"
                >
                  <span className="absolute top-4 right-4 text-label-xs uppercase tracking-wider bg-ink dark:bg-accent text-canvas dark:text-ink px-3 py-1 rounded-full">New</span>
                  <div className="w-10 h-10 rounded-full bg-ink dark:bg-canvas flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-canvas dark:text-ink" />
                  </div>
                  <span className="text-caption-sm text-mute dark:text-stone font-mono">{s.num}</span>
                  <h3 className="text-body-strong text-ink dark:text-canvas mt-1 mb-1">{s.name}</h3>
                  <p className="text-caption-md text-mute dark:text-stone leading-relaxed">{s.desc}</p>
                  <span className="text-caption-sm text-ink dark:text-accent mt-3 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    See how it works <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            }
            return (
              <Link
                key={s.num}
                to={s.to}
                className="group block p-6 no-underline border border-stone/20 dark:border-hairline-soft hover:border-stone/50 dark:hover:border-hairline transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-canvas/10 dark:bg-soft-cloud flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-canvas dark:text-ink" />
                </div>
                <span className="text-caption-sm text-stone dark:text-mute font-mono">{s.num}</span>
                <h3 className="text-body-strong text-canvas dark:text-ink mt-1 mb-1">{s.name}</h3>
                <p className="text-caption-md text-stone dark:text-mute leading-relaxed">{s.desc}</p>
                <span className="text-caption-sm text-stone dark:text-mute mt-3 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <Link to="/ai-scorecard" className="inline-flex items-center gap-1 text-body-sm font-medium text-canvas dark:text-ink no-underline hover:text-stone dark:hover:text-accent transition-colors">
            Not sure where to start? Take the 60-second AI scorecard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
