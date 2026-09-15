import React from 'react';
import { Check } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import { motion } from 'framer-motion';

const goodFit = [
  "D2C brand doing ₹10L–₹10Cr/month with inconsistent growth",
  "Tried agencies or freelancers — something always falls through",
  "Want one partner who understands your entire funnel",
  "Building from scratch and need systems, not just execution",
];

const FitFilter = ({ className = '' }) => {
  return (
    <motion.section {...fadeUp} className={`py-[80px] md:py-[100px] ${className}`}>
      <div className="container-site">
        <div className="max-w-2xl mx-auto">
          <span className="text-label-xs text-success uppercase tracking-wider mb-3 block">You're a great fit if</span>
          <ul className="space-y-3">
            {goodFit.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-body-md text-mute">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default FitFilter;
