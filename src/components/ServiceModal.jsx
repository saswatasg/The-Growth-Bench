import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';

const ServiceModal = ({ service, isOpen, onClose }) => {
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!service) return null;
  const Icon = service.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[80] bg-canvas overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-hairline-soft flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center">
                  <Icon className="w-5 h-5 text-canvas" />
                </div>
                <div>
                  <span className="text-label-xs text-mute uppercase tracking-wider">{service.eyebrow}</span>
                  <h2 className="font-display text-heading-xl text-ink leading-none mt-0.5">{service.title}</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-hairline-soft flex items-center justify-center text-mute hover:text-ink hover:border-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 md:px-8 py-8 md:py-10">
                {/* Hero */}
                <div className="max-w-3xl">
                  <h3 className="font-display text-display-md md:text-display-lg text-ink leading-[0.95]">
                    {service.h2}
                  </h3>
                  <p className="text-body-md text-mute mt-5 leading-relaxed max-w-2xl">
                    {service.summary}
                  </p>
                  {service.proof && (
                    <p className="text-body-sm text-ink mt-4 leading-relaxed font-medium">{service.proof}</p>
                  )}
                </div>

                {/* Metrics (if available) */}
                {service.benchmarks && (
                  <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {service.benchmarks.map((b) => (
                      <div key={b.num} className="p-5 bg-soft-cloud border border-hairline-soft">
                        <div className="font-display text-heading-xl text-ink leading-none">{b.num}</div>
                        <p className="text-caption-sm text-mute mt-2 leading-relaxed">{b.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* What's included */}
                <div className="mt-10">
                  <h4 className="text-label-xs text-mute uppercase tracking-wider mb-5">What&apos;s included</h4>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 py-2 border-b border-hairline-soft/50">
                        <Check className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-body-sm text-mute leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Boundaries (if available) */}
                {service.boundaries && (
                  <div className="mt-10 p-6 border border-hairline-soft max-w-2xl">
                    <span className="text-label-xs text-mute uppercase tracking-wider">{service.boundariesNote}</span>
                    <div className="mt-4 space-y-2">
                      {service.boundaries.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <span className="text-mute text-sm">✕</span>
                          <span className="text-body-sm text-mute">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-caption-md text-mute mt-4 leading-relaxed">{service.boundariesFoot}</p>
                  </div>
                )}

                {/* AI Scorecard link (for AI service) */}
                {service.benchmarks && (
                  <div className="mt-8">
                    <a href="/ai-scorecard" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors">
                      Take the 60-second AI scorecard <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-6 md:px-8 py-5 border-t border-hairline-soft flex-shrink-0 bg-soft-cloud/50">
              <div className="flex items-center justify-between">
                <p className="text-body-sm text-mute hidden sm:block">
                  Not sure if this is the right fit? Start with a free audit call.
                </p>
                <Button size="sm" onClick={() => { openBookingModal(); onClose(); }}>
                  Book a Free Audit Call <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
