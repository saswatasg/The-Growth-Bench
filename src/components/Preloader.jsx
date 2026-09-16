import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  'Sharpening strategy',
  'Aligning growth levers',
  'Preparing your audit',
  'Calibrating the funnel',
  'Loading the bench',
];

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
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

  useEffect(() => {
    if (done || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % messages.length);
    }, 450);
    return () => clearInterval(interval);
  }, [done, prefersReducedMotion]);

  if (done) return null;

  const letters = 'THE GROWTH BENCH'.split('');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center"
      >
        {/* Staggered letter reveal */}
        <div className="flex items-baseline gap-[0.15em] mb-10 overflow-hidden flex-wrap justify-center">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.05 + i * 0.04,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`font-display text-[2.5rem] md:text-[3.5rem] leading-none text-canvas inline-block ${char === ' ' ? 'w-[0.35em]' : ''}`}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Rotating message */}
        <div className="h-6 mb-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={msgIdx}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-caption-sm text-stone uppercase tracking-[0.2em] block"
            >
              {messages[msgIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-stone rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-canvas rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <span className="font-mono text-caption-sm text-stone tabular-nums">{progress}%</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
