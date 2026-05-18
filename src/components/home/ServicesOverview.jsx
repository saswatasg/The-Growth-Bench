import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  { num: '01', name: 'Growth Strategy & Consulting', desc: 'The diagnosis before the prescription. We map your funnel, your ICP, and your actual growth levers before touching a single ad account.' },
  { num: '02', name: 'Website Design & Development', desc: 'Built to convert, not just to look good. Full builds in Next.js, Webflow, or Shopify with CRO and analytics infrastructure baked in from day one.' },
  { num: '03', name: 'Google Ads', desc: 'Full-funnel Google Ads from keyword research to campaign architecture to weekly optimisation. We own the number.' },
  { num: '04', name: 'Meta Ads', desc: 'Creative-led, data-backed Facebook and Instagram campaigns. Cold audiences to loyal customers — we build the whole funnel.' },
  { num: '05', name: 'Lead Generation Systems', desc: 'End-to-end lead infrastructure: landing pages, CRM setup, nurture sequences, scoring logic. Not just a form — a system.' },
  { num: '06', name: 'Conversion Rate Optimisation', desc: 'We treat your website like a product and improve it constantly. Qualitative research, quantitative analysis, and structured A/B testing.' },
  { num: '07', name: 'UI/UX Design', desc: 'Research-grounded design in Figma. From user flows to component libraries to dev-ready handoffs. Every decision tied to a user or business reason.' },
  { num: '08', name: 'Marketing Strategy & Content', desc: 'Brand messaging, email flows, SEO strategy, content architecture. The organic engine that makes your paid channels more efficient.' },
];

const ServicesOverview = () => {
  return (
    <section className="section-dark">
      <div className="container-site">
        <div className="section-eyebrow section-eyebrow-light">WHAT WE DO</div>
        <h2 className="text-white mb-4">The full stack, handled.</h2>
        <p className="text-faint text-lg max-w-[580px] mb-16">
          From the first strategy call to the live campaign to the optimised checkout — we cover the entire growth surface. Pick what you need or let us build the whole engine.
        </p>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {services.map((s) => (
            <div key={s.num} className="group">
              <div className="service-number mb-2">{s.num}</div>
              <h3 className="text-white font-display text-xl font-bold mb-2">{s.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-sm leading-relaxed">{s.desc}</p>
              <Link to="/services" className="link-arrow text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-primary)' }}>
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/services" className="btn-ghost-light no-underline">
            See the full services breakdown &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
