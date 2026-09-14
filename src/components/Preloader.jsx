import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const { theme } = useTheme();
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

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center ${isDark ? 'bg-canvas' : 'bg-ink'}`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-8 ${isDark ? 'bg-ink' : 'bg-canvas'}`}>
          <span className={`font-display text-heading-lg leading-none ${isDark ? 'text-canvas' : 'text-ink'}`}>G</span>
        </div>
        <div className={`w-48 h-0.5 rounded-full overflow-hidden mb-4 ${isDark ? 'bg-soft-cloud' : 'bg-charcoal'}`}>
          <motion.div
            className={`h-full rounded-full ${isDark ? 'bg-ink' : 'bg-canvas'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <span className={`font-mono text-caption-sm ${isDark ? 'text-ink' : 'text-canvas'}`}>{progress}%</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
