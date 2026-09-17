import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phases = [
  {
    num: '01',
    range: 'Day 1–30',
    title: 'Diagnose & Fix',
    description: 'Full funnel audit, ICP definition, competitor teardown, KPI baseline. Quick wins executed in week 1–2. A prioritised 90-day roadmap delivered by day 30.',
    deliverables: [
      'Full funnel audit across acquisition, activation, retention, and revenue',
      'ICP definition and customer segmentation',
      'Competitor landscape analysis and gap identification',
      'KPI baseline and measurement framework',
      'Quick wins identified and executed in first 2 weeks',
      'Prioritised 90-day growth roadmap',
    ],
  },
  {
    num: '02',
    range: 'Day 31–60',
    title: 'Build & Launch',
    description: 'Campaigns live across prioritised channels. Landing pages built and A/B tested. Tracking fully wired. AI agents deployed for repeatable tasks.',
    deliverables: [
      'Campaign launch across prioritised channels',
      'Landing page optimisation and A/B testing begins',
      'Conversion tracking and attribution fully wired',
      'Email and WhatsApp nurture sequences deployed',
      'AI agents deployed for repeatable ops and support tasks',
      'First monthly strategy review and recalibration',
    ],
  },
  {
    num: '03',
    range: 'Day 61–90',
    title: 'Scale & Compound',
    description: 'Budget on proven winners. AI agents matured to full autonomy. Retention engine live. Full growth report with Q2 roadmap.',
    deliverables: [
      'Double down on winning channels and campaigns',
      'AI agents operating on full autonomy with human oversight',
      'Advanced segmentation and personalisation',
      'Retention engine: repeat purchase, review, and referral systems',
      'Full growth report with ROI analysis',
      'Q2 roadmap and next sprint planning',
    ],
  },
];

const GrowthTimeline = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="bg-canvas py-[60px] md:py-[120px]">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-label-xs text-mute uppercase tracking-wider">The Bench Method</p>
          <h2 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-[0.95]">
            What happens in your<br />first 90 days.
          </h2>
          <p className="text-body-lg text-mute mt-5 leading-relaxed max-w-xl mx-auto">
            A structured sprint, not an open-ended retainer. Three phases. Clear deliverables. Measurable outcomes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {phases.map((phase, i) => (
            <div key={phase.num} className="relative">
              {i < phases.length - 1 && (
                <div className="absolute left-[19px] top-[40px] w-px h-[calc(100%-40px)] bg-hairline-soft" />
              )}

              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
                aria-label={`${expanded === i ? 'Collapse' : 'Expand'} ${phase.title}`}
                className="relative z-10 w-full text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              >
                <div className="flex items-start gap-6 py-8">
                  <span className="font-mono text-body-sm text-mute mt-1 w-10 flex-shrink-0 select-none">
                    {phase.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-heading-xl text-ink leading-none">
                        {phase.title}
                      </h3>
                      <span className="text-caption-sm text-mute hidden sm:inline">{phase.range}</span>
                    </div>
                    <p className="text-body-md text-mute mt-3 leading-relaxed max-w-2xl">
                      {phase.description}
                    </p>
                  </div>
                  <motion.span
                    animate={{ rotate: expanded === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-mute mt-1 flex-shrink-0 text-xl leading-none select-none"
                  >
                    +
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-8 md:pl-16">
                      <div className="border-t border-hairline-soft pt-6">
                        <p className="text-label-xs text-mute uppercase tracking-wider mb-4">Deliverables</p>
                        <ul className="space-y-2.5">
                          {phase.deliverables.map((item) => (
                            <li key={item} className="text-body-sm text-mute flex items-start gap-2.5">
                              <span className="w-1 h-1 rounded-full bg-ink mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="border-t border-hairline-soft pt-8">
            <p className="text-body-sm text-mute text-center">
              Every phase includes weekly check-ins, continuous optimisation, and transparent reporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthTimeline;
