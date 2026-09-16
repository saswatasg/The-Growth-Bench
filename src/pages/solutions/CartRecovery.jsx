import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '@/components/PageMeta';
import { fadeUp } from '@/lib/motion';

const CartRecovery = () => {
  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-[60px] md:py-[120px]">
        <div className="container-site text-center">
          <span className="text-label-xs text-mute uppercase tracking-wider">Solutions · Cart &amp; Checkout Recovery</span>
          <h1 className="font-display text-heading-xl md:text-display-lg text-ink mt-2 leading-none">
            Recover the revenue<br />leaking at checkout.
          </h1>
          <p className="text-body-md text-mute mt-6 max-w-xl mx-auto leading-relaxed">
            For a US D2C furniture brand, checkout abandonment sat at 73.1% across 480,000 monthly sessions.
            We rebuilt the flow, tested it, and recovered approximately $425K/month. Here is the exact playbook — and how we run it for you.
          </p>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">What we fix</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Same leaks, different stores.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-8 max-w-4xl mx-auto">
            {[
              { title: 'Forced account creation', body: 'Requiring signup before payment was alone worth an estimated 22% of cart abandonment. Guest checkout first.' },
              { title: 'Surprise shipping costs', body: 'Costs revealed only at the final step cause last-minute exits. Real-time calculation at the cart page instead.' },
              { title: 'Missing trust signals', body: 'No badges, no return-policy links, no support visible mid-checkout. Trust has to sit where the hesitation happens.' },
              { title: 'Mobile friction', body: 'Tiny tap targets, non-sticky summaries, 4+ step flows. A single-page mobile flow cut checkout time by 34%.' },
            ].map((p) => (
              <div key={p.title}>
                <h3 className="text-heading-md text-ink">{p.title}</h3>
                <p className="text-body-sm text-mute mt-2 leading-relaxed max-w-md">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-soft-cloud py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">Results</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Tested, then rolled out.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 max-w-4xl mx-auto">
            {[
              { num: '73.1% → 53.9%', label: 'Checkout abandonment in a 22-day A/B test — a 26% relative drop' },
              { num: '84.47% → 58.2%', label: 'Cart abandonment site-wide after rollout — a 26-point drop' },
              { num: '+47%', label: 'Mobile conversion lift (1.2% → 1.76%)' },
              { num: '$425K/mo', label: 'Recovered revenue (≈₹3.5 Cr at the time)' },
            ].map((s) => (
              <div key={s.num} className="text-center md:text-left">
                <div className="font-display text-heading-xl md:text-display-md text-ink leading-none break-words">{s.num}</div>
                <p className="text-caption-md text-mute mt-2 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-caption-sm text-mute mt-8 max-w-2xl leading-relaxed">
            Client engagement outcomes; individual results vary. Full methodology in the{' '}
            <Link to="/resources/we-fixed-checkout-flow-recovered-2-89-crore-month" className="text-ink underline underline-offset-2">checkout teardown</Link>.
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            <div>
              <span className="text-label-xs text-mute uppercase tracking-wider">Follow-up sequences</span>
              <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Then we chase what still slips.</h2>
              <p className="text-body-md text-mute mt-4 leading-relaxed">
                Redesign fixes the flow; sequences recover the rest. Abandoned-cart follow-ups across email and WhatsApp,
                tuned per cart value — part of our <Link to="/services#ai-implementation" className="text-ink underline underline-offset-2">AI Implementation</Link> capability.
              </p>
            </div>
            <div>
              <h3 className="text-heading-md text-ink mb-4">Why WhatsApp earns its place</h3>
              <ul className="space-y-2">
                {[
                  'Optimized WhatsApp recovery flows: 18–23% vs 5–8% via email (Chatarmin 2026, 450+ brands — category data)',
                  'Cart-flow messages read 70–90% of the time vs ~20% for email',
                  'Two-way replies handle objections inside the same chat',
                ].map((item) => (
                  <li key={item} className="text-body-sm text-mute flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-ink mt-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default CartRecovery;
