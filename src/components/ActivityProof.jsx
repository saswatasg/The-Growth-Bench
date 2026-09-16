import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

const stats = [
  { num: '28.71%', label: 'Avg. conversion lift' },
  { num: '468%', label: 'Avg. ROAS' },
  { num: '50+', label: 'Brands scaled across D2C, SaaS, and education' },
  { num: '2+ yrs', label: 'Avg. client tenure' },
];

const ActivityProof = ({ className = '' }) => {
  return (
    <motion.section {...fadeUp} className={`py-[100px] md:py-[120px] ${className}`}>
      <div className="container-site">
        <div className="text-center mb-12">
          <span className="text-label-xs text-stone uppercase tracking-wider">By The Numbers</span>
          <h2 className="font-display text-heading-xl text-canvas mt-3">
            The work compounds.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((s) => (
            <div key={s.num} className="text-center">
              <span className="font-display text-heading-xl md:text-display-md text-canvas leading-none block">
                {s.num}
              </span>
              <p className="text-caption-md text-stone mt-3 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-caption-sm text-stone/80 text-center mt-8">
          Representative outcomes across client engagements; individual results vary.
        </p>
      </div>
    </motion.section>
  );
};

export default ActivityProof;
