import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

const partners = [
  { name: 'Google Partner', level: 'Premier Partner' },
  { name: 'Meta Business Partner', level: 'Business Partner' },
  { name: 'Shopify Partner', level: 'Partner' },
  { name: 'Clutch', level: 'Top Agency' },
];

const stats = [
  { num: '28.71%', label: 'Avg. conversion lift' },
  { num: '468%', label: 'Avg. ROAS' },
  { num: '2+ yrs', label: 'Avg. client tenure' },
];

const SocialProofBar = () => {
  return (
    <motion.section {...fadeUp} className="bg-soft-cloud border-b border-hairline-soft">
      <div className="container-site py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-ink/10 flex items-center justify-center">
                  <span className="text-caption-sm text-ink font-bold">{p.name.charAt(0)}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-caption-sm text-ink font-medium leading-tight">{p.name}</p>
                  <p className="text-label-xs text-mute">{p.level}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 md:gap-8 md:border-l md:border-hairline md:pl-8">
            {stats.map((s) => (
              <div key={s.num} className="text-center">
                <span className="font-display text-heading-lg text-ink leading-none block">{s.num}</span>
                <span className="text-label-xs text-mute mt-1 block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SocialProofBar;
