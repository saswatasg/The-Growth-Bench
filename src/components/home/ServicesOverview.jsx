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
    <section className="section-dark">
      <div className="container-site">
        <div className="section-eyebrow section-eyebrow-light">WHAT WE DO</div>
        <h2 className="text-white mb-4">The full stack, handled.</h2>
        <p className="text-faint text-lg max-w-xl mb-16">
          From the first strategy call to the live campaign to the optimised checkout — we cover the entire growth surface.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.num}
                to="/services"
                className="card-dark group flex flex-col no-underline"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="service-number mb-1 text-white/40">{s.num}</div>
                <h3 className="text-white font-display font-bold text-sm mb-1">{s.name}</h3>
                <p className="text-xs text-white/50 leading-relaxed flex-grow">{s.desc}</p>
                <span className="text-xs text-primary font-medium mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
