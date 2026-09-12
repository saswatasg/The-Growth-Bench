import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Search, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp, fadeIn } from '@/lib/motion';

const Compare = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">Compare</span>
            <h1 className="font-display text-display-md text-ink mt-2 leading-none">
              Freelancer, agency,<br />or bench?
            </h1>
            <p className="text-body-md text-mute mt-6 max-w-xl leading-relaxed">
              Most growing brands are stuck between two bad options. Here is exactly how the three models differ — and which one fits a D2C brand doing ₹10L–₹10Cr/month.
            </p>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            <div className="p-6 border border-hairline-soft bg-canvas flex flex-col">
              <span className="text-label-xs text-sale uppercase tracking-wider mb-2">Freelancer</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Good people, limited scope. No systems, no strategy ownership. You outgrow them fast.</p>
              <div className="mt-4 pt-4 border-t border-hairline-soft text-body-sm text-sale font-medium">
                No full funnel view
              </div>
            </div>

            <div className="p-6 border-2 border-ink bg-canvas flex flex-col relative">
              <div className="absolute -top-3 left-6 bg-ink text-canvas text-label-xs uppercase tracking-wider px-4 py-1.5 rounded-full">Best of both</div>
              <span className="text-label-xs text-ink uppercase tracking-wider mt-2 mb-2">The Growth Bench</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">One senior partner who owns the full picture. Specialists on demand. Depth without overhead.</p>
              <div className="mt-4 pt-4 border-t border-ink/10 space-y-2">
                {['One partner, full context', 'Specialists on demand', 'First wins in weeks, not quarters', 'No middlemen'].map(item => (
                  <div key={item} className="text-body-sm text-ink flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border border-hairline-soft bg-canvas flex flex-col">
              <span className="text-label-xs text-sale uppercase tracking-wider mb-2">Agency</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Expensive retainers, slow onboarding, layers between you and the people doing the work.</p>
              <div className="mt-4 pt-4 border-t border-hairline-soft text-body-sm text-sale font-medium">
                Paying for what you don't use
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-soft-cloud py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-2xl mb-12">
            <span className="text-label-xs text-mute uppercase tracking-wider">How It Works</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">One partner.<br />The right team.<br />No layers.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start max-w-4xl">
            {[
              { icon: Search, title: 'Diagnosis', desc: 'Free audit call to understand your funnel' },
              { icon: Users, title: 'Team Assembly', desc: 'Right specialists for what you need' },
              { icon: Zap, title: 'Execute & Iterate', desc: 'Weekly check-ins, continuous improvement' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-canvas border border-hairline-soft flex items-center justify-center flex-shrink-0">
                    <span className="text-body-sm font-bold text-mute">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-heading-md text-ink">{step.title}</h3>
                    <p className="text-body-sm text-mute mt-1">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-body-sm text-mute max-w-2xl mt-10 leading-relaxed">
            Every engagement is led by the founder — one person with complete context on your business.
            Specialist bench members are brought in based on what the work actually needs. No account managers, no briefing layers.
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <span className="text-label-xs text-success uppercase tracking-wider mb-3 block">Good fit</span>
              <ul className="space-y-3">
                {[
                  "D2C brand doing ₹10L–₹10Cr/month with inconsistent growth",
                  "Tried agencies or freelancers — something always falls through",
                  "Want one partner who understands your entire funnel",
                  "Building from scratch and need systems, not just execution",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-mute">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-label-xs text-sale uppercase tracking-wider mb-3 block">Not the right fit</span>
              <ul className="space-y-3">
                {[
                  "Need daily social media posting or community management",
                  "Want cheapest execution with no strategic input",
                  "Brief changes weekly, not ready to commit to direction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-mute">
                    <span className="text-sale mt-0.5 flex-shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="bg-ink py-section-lg text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas leading-none mb-6">
            Start with a free<br />audit call.
          </h2>
          <p className="text-body-md text-stone leading-relaxed mb-8 max-w-lg mx-auto">
            Book a free 30-minute call. We&apos;ll look at your funnel, give you one concrete recommendation, and tell you honestly if we can help. No pitch, no pressure.
          </p>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
            Book Your Free Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-caption-md text-stone mt-4">
            No retainer commitment. Cancel anytime.
          </p>
          <p className="mt-6">
            <Link to="/case-studies" className="text-caption-md text-stone underline underline-offset-2 hover:text-canvas transition-colors">
              See the results this model produces
            </Link>
            <span className="text-stone/40 mx-3">·</span>
            <Link to="/ai-scorecard" className="text-caption-md text-stone underline underline-offset-2 hover:text-canvas transition-colors">
              Take the 60-second AI scorecard
            </Link>
          </p>
        </div>
      </motion.section>
    </>
  );
};

export default Compare;
