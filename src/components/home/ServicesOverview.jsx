import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Code2, Target, TrendingUp, Users, Palette, FileText, BarChart3, ArrowRight } from 'lucide-react';

const services = [
  { num: '01', name: 'Growth Strategy', icon: Search, desc: 'Funnel audit, ICP, 90-day roadmap before touching a single ad account.' },
  { num: '02', name: 'Website & Development', icon: Code2, desc: 'Full builds in Next.js, Webflow, or Shopify. CRO and analytics baked in from day one.' },
  { num: '03', name: 'Ads', icon: Target, desc: 'Meta, Google, Amazon, LinkedIn — full-funnel campaigns with proper attribution.' },
  { num: '04', name: 'Lead Systems', icon: Users, desc: 'Landing pages, CRM, nurture sequences, scoring. Not just a form — a system.' },
  { num: '05', name: 'CRO', icon: TrendingUp, desc: 'Qualitative research, quantitative analysis, structured A/B testing.' },
  { num: '06', name: 'UI/UX Design', icon: Palette, desc: 'Research-grounded design in Figma. Dev-ready handoffs.' },
  { num: '07', name: 'Content & Email', icon: FileText, desc: 'Email flows, WhatsApp sequences, SEO strategy, content architecture.' },
  { num: '08', name: 'Analytics & Reporting', icon: BarChart3, desc: 'Dashboards, attribution, GA4, CAPI — own your data.' },
];

const ServicesOverview = () => {
  return (
    <section className="bg-ink py-section">
      <div className="container-site">
        <span className="text-caption-sm text-stone tracking-wider uppercase mb-3 block">WHAT WE DO</span>
        <h2 className="font-display text-heading-xl text-canvas mb-2">The full stack, handled.</h2>
        <p className="text-body-md text-stone max-w-xl mb-section">
          From the first strategy call to the live campaign to the optimised checkout — we cover the entire growth surface.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.num}
                to="/services"
                className="group block p-6 no-underline border border-stone/20 hover:border-stone/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-canvas/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-canvas" />
                </div>
                <span className="text-caption-sm text-stone font-mono">{s.num}</span>
                <h3 className="text-body-strong text-canvas mt-1 mb-1">{s.name}</h3>
                <p className="text-caption-md text-stone leading-relaxed">{s.desc}</p>
                <span className="text-caption-sm text-stone mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
