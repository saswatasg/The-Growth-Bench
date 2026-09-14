import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const prefersReducedMotion = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const variants = {
  initial: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
  enter: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0.05 : 0.3, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: prefersReducedMotion ? 0 : -8, transition: { duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function PageTransition({ children }) {
  const location = useLocation();
  const keyRef = useRef(location.pathname);

  useEffect(() => {
    keyRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
