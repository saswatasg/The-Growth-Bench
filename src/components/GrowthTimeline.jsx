import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Zap, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp } from '@/lib/motion';

const phases = [
  {
    id: '30',
    title: 'Days 1–30',
    subtitle: 'Foundation',
    icon: Search,
    color: 'bg-ink',
    deliverables: [
      'Full funnel audit across acquisition, activation, retention, and revenue',
      'ICP definition and customer segmentation',
      'Competitor landscape analysis and gap identification',
      'KPI baseline and measurement framework',
      'Prioritised 90-day growth roadmap',
      'Quick wins identified and executed in first 2 weeks',
    ],
    metrics: 'First meaningful improvement within 30 days',
  },
  {
    id: '60',
    title: 'Days 31–60',
    subtitle: 'Activation',
    icon: Zap,
    color: 'bg-charcoal',
    deliverables: [
      'Campaign launch across prioritised channels',
      'Landing page optimisation and A/B testing begins',
      'AI-powered ad optimization and creative testing',
      'Email and WhatsApp nurture sequences deployed',
      'Conversion tracking and attribution fully wired',
      'First monthly strategy review and recalibration',
    ],
    metrics: 'Compound results building across channels',
  },
  {
    id: '90',
    title: 'Days 61–90',
    subtitle: 'Acceleration',
    icon: TrendingUp,
    color: 'bg-success',
    deliverables: [
      'Double down on winning channels and campaigns',
      'AI agents deployed for repeatable ops and support tasks',
      'Advanced segmentation and personalisation',
      'Scaling budget on proven ROAS-positive campaigns',
      'Full growth report with ROI analysis',
      'Quarter 2 roadmap and next sprint planning',
    ],
    metrics: 'Measurable revenue impact and system compounding',
  },
];

const GrowthTimeline = () => {
  const [activePhase, setActivePhase] = useState('30');
  const { openBookingModal } = useBookingModal();
  const current = phases.find(p => p.id === activePhase);

  return (
    <section className="bg-canvas dark:bg-ink py-section-lg border-b border-hairline-soft dark:border-charcoal">
      <div className="container-site">
        <div className="max-w-2xl mb-12">
          <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider">The Bench Method</span>
          <h2 className="font-display text-display-md text-ink dark:text-canvas mt-2 leading-none">
            What happens in your<br />first 90 days.
          </h2>
          <p className="text-body-md text-mute dark:text-stone mt-4 leading-relaxed max-w-xl">
            A structured sprint, not an open-ended retainer. Every phase has clear deliverables and measurable outcomes.
          </p>
        </div>

        <div className="flex gap-3 mb-10">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`px-6 py-3 text-button-sm rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 dark:focus-visible:ring-accent/40 ${
                activePhase === phase.id
                  ? 'bg-ink text-canvas border-ink dark:bg-accent dark:text-ink dark:border-accent'
                  : 'bg-canvas text-mute border-hairline hover:border-ink hover:text-ink dark:bg-transparent dark:text-stone dark:border-charcoal dark:hover:border-canvas dark:hover:text-canvas'
              }`}
            >
              {phase.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-[1fr_1fr] gap-10 max-w-4xl"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${current.color} flex items-center justify-center`}>
                  <current.icon className="w-5 h-5 text-canvas" />
                </div>
                <div>
                  <h3 className="font-display text-heading-xl text-ink dark:text-canvas">{current.subtitle}</h3>
                  <p className="text-caption-sm text-mute dark:text-stone">{current.title}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {current.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-mute dark:text-stone">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-soft-cloud dark:bg-charcoal p-6 border border-hairline-soft dark:border-ash self-start">
              <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider block mb-2">Expected by day {current.id}</span>
              <p className="text-heading-md text-ink dark:text-canvas leading-snug">{current.metrics}</p>
              <div className="mt-6 pt-6 border-t border-hairline-soft dark:border-ash">
                <p className="text-body-sm text-mute dark:text-stone leading-relaxed">
                  Every phase includes weekly check-ins, continuous optimisation, and transparent reporting. You see exactly what's working and what's next.
                </p>
              </div>
              <Button size="lg" className="w-full mt-6" onClick={openBookingModal}>
                Start Your 90-Day Sprint <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GrowthTimeline;
