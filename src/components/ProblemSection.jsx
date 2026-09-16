import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp, staggerContainer, staggerChild } from '@/lib/motion';

const problems = [
  {
    headline: 'Your agency sends reports, not results.',
    body: "You're paying for activity, not outcomes.",
  },
  {
    headline: 'Freelancers disappear when complexity rises.',
    body: "One person can't cover your entire funnel.",
  },
  {
    headline: 'Your checkout converts, but your funnel leaks.',
    body: 'Fixing one part doesn\'t fix the system.',
  },
  {
    headline: "You've tried AI. It added tools, not time.",
    body: 'AI without strategy is just another tab open.',
  },
];

const ProblemSection = ({ className = '' }) => {
  const { openBookingModal } = useBookingModal();

  return (
    <motion.section {...fadeUp} className={`py-[80px] md:py-[100px] ${className}`}>
      <div className="container-site">
        <div className="max-w-2xl mb-10">
          <span className="text-label-xs text-mute uppercase tracking-wider">Sound familiar?</span>
          <h2 className="font-display text-display-md text-ink mt-2 leading-none">
            Most growth problems look the same from the inside.
          </h2>
        </div>

        <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-5 max-w-4xl">
          {problems.map((p) => (
            <motion.div key={p.headline} {...staggerChild} className="p-6 border border-hairline-soft bg-canvas">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-mute flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-heading-md text-ink">{p.headline}</h3>
                  <p className="text-body-sm text-mute mt-1">{p.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 max-w-4xl">
          <Button size="lg" onClick={openBookingModal}>
            Book a Free Audit Call — we'll diagnose which problem is costing you the most
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default ProblemSection;
