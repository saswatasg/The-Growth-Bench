import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import CtaPaths from '@/components/CtaPaths';
import HowItWorks from '@/components/HowItWorks';
import FitFilter from '@/components/FitFilter';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp, fadeIn } from '@/lib/motion';

const Compare = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <>
      <PageMeta />

      <section className="bg-canvas dark:bg-ink py-section-lg border-b border-hairline-soft dark:border-charcoal">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider">Compare</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink dark:text-canvas mt-2 leading-none">
              Freelancer, agency,<br />or bench?
            </h1>
            <p className="text-body-md text-mute dark:text-stone mt-6 max-w-xl leading-relaxed">
              Most growing brands are stuck between two bad options. Here is exactly how the three models differ — and which one fits a D2C brand doing ₹10L–₹10Cr/month.
            </p>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-canvas dark:bg-ink py-section-lg border-b border-hairline-soft dark:border-charcoal">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            <div className="p-6 border border-hairline-soft dark:border-charcoal bg-canvas dark:bg-charcoal flex flex-col">
              <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider mb-2">Freelancer</span>
              <p className="text-body-sm text-mute dark:text-stone leading-relaxed flex-grow">Good people, limited scope. No systems, no strategy ownership. You outgrow them fast.</p>
              <div className="mt-4 pt-4 border-t border-hairline-soft dark:border-ash text-body-sm text-sale font-medium">
                No full funnel view
              </div>
            </div>

            <div className="p-6 border-2 border-ink dark:border-accent bg-canvas dark:bg-charcoal flex flex-col relative order-first md:order-none">
              <div className="absolute -top-3 left-6 bg-ink dark:bg-accent text-canvas dark:text-ink text-label-xs uppercase tracking-wider px-4 py-1.5 rounded-full">Best of both</div>
              <span className="text-label-xs text-ink dark:text-accent uppercase tracking-wider mt-2 mb-2">The Growth Bench</span>
              <p className="text-body-sm text-mute dark:text-stone leading-relaxed flex-grow">One senior partner who owns the full picture. Specialists on demand. Depth without overhead.</p>
              <div className="mt-4 pt-4 border-t border-ink/10 dark:border-accent/20 space-y-2">
                {['One partner, full context', 'Specialists on demand', 'First wins in weeks, not quarters', 'No middlemen'].map(item => (
                  <div key={item} className="text-body-sm text-ink dark:text-canvas flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border border-hairline-soft dark:border-charcoal bg-canvas dark:bg-charcoal flex flex-col">
              <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider mb-2">Agency</span>
              <p className="text-body-sm text-mute dark:text-stone leading-relaxed flex-grow">Expensive retainers, slow onboarding, layers between you and the people doing the work.</p>
              <div className="mt-4 pt-4 border-t border-hairline-soft dark:border-ash text-body-sm text-sale font-medium">
                Paying for what you don't use
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas dark:bg-ink py-section-lg border-b border-hairline-soft dark:border-charcoal">
        <div className="container-site">
          <div className="max-w-2xl mb-10">
            <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider">Side by side</span>
            <h2 className="font-display text-display-md text-ink dark:text-canvas mt-2 leading-none">The same job, three ways.</h2>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline dark:border-charcoal">
                  <th className="text-label-xs text-mute dark:text-stone uppercase tracking-wider font-medium py-3 pr-4"></th>
                  <th className="text-label-xs text-mute dark:text-stone uppercase tracking-wider font-medium py-3 pr-4">Freelancer</th>
                  <th className="text-label-xs text-mute dark:text-stone uppercase tracking-wider font-medium py-3 pr-4">Agency</th>
                  <th className="text-label-xs text-ink dark:text-accent uppercase tracking-wider font-medium py-3">The Growth Bench</th>
                </tr>
              </thead>
              <tbody className="text-body-sm">
                {[
                  ['Owns your full funnel', 'One lane only', 'Handoffs between layers', 'Yes — one partner, full context'],
                  ['First meaningful win', 'Weeks to months', 'A quarter or more', 'Weeks, not quarters'],
                  ['Overhead', 'None', 'Retainer + account layers', 'No middlemen, specialists on demand'],
                  ['AI automation', 'Manual tools', 'Pilots that stall', 'Agentic systems across ops + support'],
                  ['Proof you can check', '—', '—', '$345K/mo recovered, 73.1% → 53.9%'],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-hairline-soft dark:border-charcoal last:border-b-0">
                    <td className="py-4 pr-4 font-medium text-ink dark:text-canvas">{row[0]}</td>
                    <td className="py-4 pr-4 text-mute dark:text-stone">{row[1]}</td>
                    <td className="py-4 pr-4 text-mute dark:text-stone">{row[2]}</td>
                    <td className="py-4 text-ink dark:text-accent font-medium">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-caption-sm text-mute dark:text-stone mt-6">
            For D2C brands doing ₹10L–₹10Cr/month. Proof:{' '}
            <Link to="/insights/we-fixed-checkout-flow-recovered-2-89-crore-month" className="text-ink dark:text-accent underline underline-offset-2">Sierra teardown</Link>
            {' '}·{' '}
            <Link to="/ai-scorecard" className="text-ink dark:text-accent underline underline-offset-2">AI scorecard</Link>
          </p>
        </div>
      </motion.section>

      <HowItWorks className="bg-soft-cloud dark:bg-charcoal" />

      <FitFilter className="bg-canvas dark:bg-ink" />

      <motion.section {...fadeIn} className="bg-ink dark:bg-canvas py-section-lg text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas dark:text-ink leading-none mb-6">
            Start with a free<br />audit call.
          </h2>
          <p className="text-body-md text-stone dark:text-mute leading-relaxed mb-8 max-w-lg mx-auto">
            Book a free 30-minute call. We&apos;ll look at your funnel, give you one concrete recommendation, and tell you honestly if we can help. No pitch, no pressure.
          </p>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud dark:bg-ink dark:text-canvas dark:hover:bg-charcoal" onClick={openBookingModal}>
            Book Your Free Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-caption-md text-stone dark:text-mute mt-4">
            No retainer commitment. Cancel anytime.
          </p>
          <p className="mt-6">
            <Link to="/case-studies" className="text-caption-md text-stone dark:text-mute underline underline-offset-2 hover:text-canvas dark:hover:text-ink transition-colors">
              See the results this model produces
            </Link>
          </p>
          <div className="mt-6">
            <CtaPaths tone="dark" />
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Compare;
