import React from 'react';
import { Compass, TrendingUp, BarChart2, Users } from 'lucide-react';

const services = [
  {
    icon: Compass,
    title: 'Product & Funnel Audits',
    description: 'End-to-end audit of your user journey to pinpoint where revenue is leaking. Using GA4, Clarity, and custom event instrumentation.',
  },
  {
    icon: TrendingUp,
    title: 'Conversion Rate Optimisation',
    description: 'Flows redesigned with data-driven hypotheses and A/B tests. Results include 25% lower cart abandonment and 2x lead submissions.',
  },
  {
    icon: BarChart2,
    title: 'Growth Marketing & Paid Acquisition',
    description: 'Full-funnel campaigns across Google, Meta, and Amazon with proper tracking and creative testing. Sustained 5.7x-13.7x ROAS for clients.',
  },
  {
    icon: Users,
    title: 'Analytics & Measurement Setup',
    description: 'GA4, GTM, Looker Studio dashboards, and custom event tracking so you know exactly what is happening in your product.',
  },
];

const WhatIDoSection = () => {
  return (
    <section className="section-dark" id="work">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--accent-gold)] font-medium">What I Do</span>
          <h2 className="text-white mt-3 mb-4">Services &amp; Expertise</h2>
          <p className="text-white/50 text-[15px] md:text-[17px] leading-relaxed">
            Helping companies across D2C, e-commerce, and B2B SaaS diagnose growth problems and fix what&rsquo;s broken.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={i} className="card-accent p-6 md:p-8 bg-white/[0.04] border-white/[0.06]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-gold)]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
                </div>
                <h3 className="text-white text-lg md:text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm md:text-[15px] leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
