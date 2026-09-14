import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

const publications = [
  { name: 'YourStory', abbr: 'YS' },
  { name: 'Inc42', abbr: 'I42' },
  { name: 'Entrepreneur India', abbr: 'EI' },
  { name: 'Economic Times', abbr: 'ET' },
  { name: 'Business Insider', abbr: 'BI' },
];

const AsSeenIn = ({ className = '' }) => {
  return (
    <motion.section {...fadeUp} className={`py-[60px] md:py-[80px] ${className}`}>
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-shrink-0">
            <span className="text-label-xs text-mute uppercase tracking-wider">As Featured In</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {publications.map((pub) => (
              <div
                key={pub.name}
                className="flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-sm bg-ink/5 border border-hairline-soft flex items-center justify-center">
                  <span className="text-caption-sm text-ink font-bold font-mono">{pub.abbr}</span>
                </div>
                <span className="text-body-sm text-mute hidden sm:inline">{pub.name}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-caption-sm text-mute/60 text-center md:text-left mt-4">
          Featured in industry publications for D2C growth frameworks and AI implementation case studies.
        </p>
      </div>
    </motion.section>
  );
};

export default AsSeenIn;
