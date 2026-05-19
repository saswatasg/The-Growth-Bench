import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { number: '₹2.89Cr', label: 'monthly checkout recovery at a US D2C brand' },
  { number: '28.71%', label: 'add-to-cart lift through CRO and flow redesign' },
  { number: '168%', label: 'feature engagement uplift, B2B SaaS product' },
  { number: '3+', label: 'years building growth systems across D2C and SaaS' },
];

const StatRow = () => {
  return (
    <section className="section-primary">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && (
                <div className="hidden lg:block w-px bg-white/20" />
              )}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatRow;
