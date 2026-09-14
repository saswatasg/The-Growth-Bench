import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setDone(true);
      return;
    }

    const t0 = Date.now();
    const duration = 1800;

    const tick = () => {
      const elapsed = Date.now() - t0;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 200);
      }
    };

    requestAnimationFrame(tick);
  }, [prefersReducedMotion]);

  if (done) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full bg-canvas flex items-center justify-center mb-8">
          <span className="font-display text-2xl text-ink font-bold leading-none">G</span>
        </div>
        <div className="w-48 h-0.5 bg-charcoal rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-canvas rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <span className="font-mono text-sm text-stone">{progress}%</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
