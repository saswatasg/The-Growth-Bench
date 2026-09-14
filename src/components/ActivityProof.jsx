import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

const stats = [
  { num: '50+', label: 'Brands scaled across D2C, SaaS, and education' },
  { num: '₹12Cr+', label: 'Ad spend optimised across Meta, Google, and Amazon' },
  { num: '2.4M+', label: 'Customer interactions automated via AI agents' },
  { num: '340+', label: 'A/B tests run across funnels and checkout flows' },
];

const ActivityProof = ({ className = '' }) => {
  return (
    <motion.section {...fadeUp} className={`py-section border-b border-hairline-soft ${className}`}>
      <div className="container-site">
        <div className="text-center mb-10">
          <span className="text-label-xs text-mute uppercase tracking-wider">Across The Bench</span>
          <h2 className="font-display text-heading-xl text-ink mt-2">
            The work compounds.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((s) => (
            <div key={s.num} className="text-center p-4 border border-hairline-soft bg-canvas">
              <span className="font-display text-heading-xl md:text-display-md text-ink leading-none block">
                {s.num}
              </span>
              <p className="text-caption-sm text-mute mt-2 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-caption-sm text-mute/60 text-center mt-6">
          Aggregate metrics across all client engagements and internal projects. Individual results vary.
        </p>
      </div>
    </motion.section>
  );
};

export default ActivityProof;
