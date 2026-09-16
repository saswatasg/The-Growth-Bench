import React from 'react';
import { Search, Users, Zap } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import { motion } from 'framer-motion';

const steps = [
  { icon: Search, title: 'Diagnosis', desc: 'Free audit call to understand your funnel' },
  { icon: Users, title: 'Team Assembly', desc: 'Right specialists for what you need' },
  { icon: Zap, title: 'Execute & Iterate', desc: 'Weekly check-ins, continuous improvement' },
];

const HowItWorks = ({ className = '' }) => {
  return (
    <motion.section {...fadeUp} className={`py-[80px] md:py-[100px] ${className}`}>
      <div className="container-site">
        <div className="max-w-2xl mb-12">
          <span className="text-label-xs text-mute uppercase tracking-wider">The Bench Method</span>
          <h2 className="font-display text-display-md text-ink mt-2 leading-none">One partner.<br />The right team.<br />No layers.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start max-w-4xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-canvas border border-hairline-soft flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-ink" />
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
  );
};

export default HowItWorks;
