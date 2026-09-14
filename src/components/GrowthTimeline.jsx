import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, TrendingUp, ArrowRight, Check, Clock, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';

const phases = [
  {
    id: '30',
    dayRange: '1–30',
    title: 'Diagnose & Fix',
    tagline: 'Find the leaks. Stop the bleeding.',
    icon: Search,
    accent: '#111111',
    deliverables: [
      { label: 'Full funnel audit', detail: 'acquisition → activation → retention → revenue — every drop-off mapped' },
      { label: 'ICP & segmentation', detail: 'who converts, who churns, where the money actually is' },
      { label: 'Competitor teardown', detail: 'what they do better, where you can win' },
      { label: 'KPI baseline', detail: 'real numbers before touching anything' },
      { label: 'Quick wins', detail: 'executed in week 1–2, visible lift by day 30' },
      { label: '90-day roadmap', detail: 'prioritised experiments tied to revenue' },
    ],
    metric: { value: '30 days', label: 'to first meaningful improvement' },
    proof: 'Every engagement starts with a diagnosis. No strategy survives first contact with your data — so we look first.',
  },
  {
    id: '60',
    dayRange: '31–60',
    title: 'Build & Launch',
    tagline: 'Wire the systems. Start the engine.',
    icon: Zap,
    accent: '#39393b',
    deliverables: [
      { label: 'Campaign launch', detail: 'Meta, Google, Amazon — channels picked from the audit, not guesswork' },
      { label: 'Landing page builds', detail: 'conversion-first, A/B tested from day one' },
      { label: 'Tracking wired', detail: 'GA4, CAPI, pixels — every click attributed' },
      { label: 'Nurture sequences', detail: 'email + WhatsApp flows that follow up automatically' },
      { label: 'AI agents deployed', detail: 'repeatable tasks handed off — support, follow-ups, ops' },
      { label: 'First review', detail: "what worked, what didn't, what we're changing" },
    ],
    metric: { value: '60 days', label: 'to compound results across channels' },
    proof: 'Nothing stays theoretical. By week 6, real campaigns are live, real data is flowing, and real optimisations are in motion.',
  },
  {
    id: '90',
    dayRange: '61–90',
    title: 'Scale & Compound',
    tagline: 'Double down. Automate. Accelerate.',
    icon: TrendingUp,
    accent: '#007d48',
    deliverables: [
      { label: 'Winners scaled', detail: 'budget on what works, killed what doesn\'t' },
      { label: 'AI agents matured', detail: 'operating on full autonomy with human oversight' },
      { label: 'Advanced segmentation', detail: 'personalised flows for high-value cohorts' },
      { label: 'Retention engine', detail: 'repeat purchase, review, and referral systems live' },
      { label: 'Full growth report', detail: 'ROI analysis, channel performance, what moved' },
      { label: 'Q2 roadmap', detail: 'next sprint planned, team briefed, momentum locked' },
    ],
    metric: { value: '90 days', label: 'to measurable revenue impact' },
    proof: 'By day 90, the systems compound. What took manual effort in month one now runs on its own — and keeps improving.',
  },
];

const phaseList = [phases[0], phases[1], phases[2]];

function PhaseIndicator({ phase, index, isActive, onClick, total }) {
  const Icon = phase.icon;
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-xl p-3 -m-3 transition-colors"
      aria-pressed={isActive}
    >
      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
        isActive ? 'bg-ink text-canvas scale-110' : 'bg-soft-cloud text-mute group-hover:bg-ink/10'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="hidden md:block">
        <p className={`text-caption-sm uppercase tracking-wider transition-colors ${isActive ? 'text-ink' : 'text-mute'}`}>
          Day {phase.dayRange}
        </p>
        <p className={`text-heading-md transition-colors ${isActive ? 'text-ink' : 'text-mute group-hover:text-ink'}`}>
          {phase.title}
        </p>
      </div>
      {index < total - 1 && (
        <div className={`hidden md:block absolute left-[23px] top-14 w-px h-8 transition-colors ${
          isActive ? 'bg-ink' : 'bg-hairline'
        }`} />
      )}
    </button>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const GrowthTimeline = () => {
  const [activePhase, setActivePhase] = useState('30');
  const { openBookingModal } = useBookingModal();
  const current = phases.find(p => p.id === activePhase);

  return (
    <section className="bg-soft-cloud py-[100px] md:py-[120px]">
      <div className="container-site">
        <div className="max-w-2xl mb-16">
          <span className="text-label-xs text-mute uppercase tracking-wider">The Bench Method</span>
          <h2 className="font-display text-display-md text-ink mt-3 leading-[0.95]">
            What happens in your<br />first 90 days.
          </h2>
          <p className="text-body-lg text-mute mt-5 leading-relaxed max-w-xl">
            A structured sprint, not an open-ended retainer. Every phase has a clear objective, clear deliverables, and a clear outcome.
          </p>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] gap-12 max-w-5xl">
          <div className="flex flex-row lg:flex-col gap-2">
            {phaseList.map((phase, i) => (
              <PhaseIndicator
                key={phase.id}
                phase={phase}
                index={i}
                isActive={activePhase === phase.id}
                onClick={() => setActivePhase(phase.id)}
                total={phaseList.length}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="grid md:grid-cols-[1fr_320px] gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-label-xs text-mute uppercase tracking-wider">Day {current.dayRange}</span>
                  </div>
                  <h3 className="font-display text-heading-xl text-ink leading-none mb-1">{current.title}</h3>
                  <p className="text-body-md text-mute italic mb-8">{current.tagline}</p>

                  <div className="space-y-0">
                    {current.deliverables.map((item, i) => (
                      <motion.div
                        key={item.label}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={staggerItem}
                        className="flex items-start gap-3 py-3 border-b border-hairline-soft last:border-b-0"
                      >
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-success" />
                        <div>
                          <span className="text-body-sm font-medium text-ink">{item.label}</span>
                          <span className="text-body-sm text-mute"> — {item.detail}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6 self-start">
                  <div className="bg-canvas p-6 border border-hairline-soft">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-mute" />
                      <span className="text-label-xs text-mute uppercase tracking-wider">Expected by day {current.id}</span>
                    </div>
                    <p className="font-display text-heading-xl text-ink leading-none">{current.metric.value}</p>
                    <p className="text-body-sm text-mute mt-1">{current.metric.label}</p>
                  </div>

                  <div className="bg-canvas p-6 border border-hairline-soft">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-mute" />
                      <span className="text-label-xs text-mute uppercase tracking-wider">What you'll see</span>
                    </div>
                    <p className="text-body-sm text-mute leading-relaxed">{current.proof}</p>
                  </div>

                  <div className="bg-canvas p-6 border border-hairline-soft">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-4 h-4 text-mute" />
                      <span className="text-label-xs text-mute uppercase tracking-wider">Every phase includes</span>
                    </div>
                    <ul className="space-y-1.5">
                      {['Weekly check-ins', 'Transparent reporting', 'Continuous optimisation'].map((item) => (
                        <li key={item} className="text-body-sm text-mute flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-ink flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button size="lg" className="w-full" onClick={openBookingModal}>
                    Start Your 90-Day Sprint <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GrowthTimeline;
