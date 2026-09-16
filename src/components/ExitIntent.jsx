import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';

const ExitIntent = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    try {
      if (localStorage.getItem('tgb-exit-dismissed')) {
        setDismissed(true);
        return;
      }
    } catch {}

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [dismissed]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    try { localStorage.setItem('tgb-exit-dismissed', '1'); } catch {}
  };

  if (!show || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4"
        onClick={dismiss}
        role="dialog"
        aria-modal="true"
        aria-label="Get your free growth audit"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-canvas p-8 md:p-10 max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-mute hover:text-ink transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-label-xs text-mute uppercase tracking-wider">Before you go</span>
          <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">
            Get your free growth audit
          </h2>
          <p className="text-body-md text-mute mt-4 leading-relaxed">
            Book a free 30-minute call. We'll look at your funnel, find the biggest leak, and give you one concrete thing to fix — even if we never work together.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
            <Button size="lg" onClick={() => { dismiss(); openBookingModal(); }} className="w-full sm:w-auto">
              Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <button onClick={dismiss} className="text-body-sm text-mute underline underline-offset-2 hover:text-ink transition-colors">
              No thanks
            </button>
          </div>

          <p className="text-caption-sm text-mute mt-4">
            No retainer commitment. No pitch. Just a clear recommendation.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExitIntent;
