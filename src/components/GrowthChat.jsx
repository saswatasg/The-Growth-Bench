import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { Link } from 'react-router-dom';

const flows = {
  start: {
    message: "Hey! I'm the Growth Bench assistant. What brings you here today?",
    options: [
      { label: 'Scale my brand', next: 'scale' },
      { label: 'Fix my ads', next: 'ads' },
      { label: 'Improve retention', next: 'retention' },
      { label: 'Explore AI tools', next: 'ai' },
    ],
  },
  scale: {
    message: "Got it — scaling is about finding what works and doubling down. What's your monthly revenue right now?",
    options: [
      { label: 'Under ₹10L', next: 'small' },
      { label: '₹10L–₹1Cr', next: 'mid' },
      { label: 'Over ₹1Cr', next: 'large' },
    ],
  },
  ads: {
    message: "Ad performance is usually a symptom, not the root cause. We typically find the leak is in the landing page or funnel — not the ad account itself.",
    options: [
      { label: 'See our Ads service', link: '/services#ads' },
      { label: 'Take the AI scorecard', link: '/ai-scorecard' },
      { label: 'Book a free audit', action: 'book' },
    ],
  },
  retention: {
    message: "Retention is where D2C brands leave the most money on the table. Our AI agents handle post-purchase follow-ups, review requests, and reactivation sequences.",
    options: [
      { label: 'See AI Implementation', link: '/services#ai-implementation' },
      { label: 'See our CRO service', link: '/services#cro' },
      { label: 'Book a free audit', action: 'book' },
    ],
  },
  ai: {
    message: "Agentic AI is our newest capability. We build agents that handle ops (COD verification, NDR follow-up), support replies, catalog copy, and post-purchase sequences — all with human review.",
    options: [
      { label: 'See AI Implementation', link: '/services#ai-implementation' },
      { label: 'Take the AI scorecard', link: '/ai-scorecard' },
      { label: 'Book a free audit', action: 'book' },
    ],
  },
  small: {
    message: "At under ₹10L/month, the fastest path is usually fixing conversion rate and launching 1-2 channels properly. We can get you to ₹25L+ in 3-6 months.",
    options: [
      { label: 'See our process', link: '/compare' },
      { label: 'Book a free audit', action: 'book' },
    ],
  },
  mid: {
    message: "₹10L–₹1Cr is the sweet spot for us. You have product-market fit but need systems to scale. Our 90-day sprint is designed for exactly this stage.",
    options: [
      { label: 'See the 90-day process', link: '/compare' },
      { label: 'Take the AI scorecard', link: '/ai-scorecard' },
      { label: 'Book a free audit', action: 'book' },
    ],
  },
  large: {
    message: "At ₹1Cr+, you probably have the channels working but need AI automation and advanced CRO to break through the ceiling. That's our sweet spot.",
    options: [
      { label: 'See AI Implementation', link: '/services#ai-implementation' },
      { label: 'See our CRO service', link: '/services#cro' },
      { label: 'Book a free audit', action: 'book' },
    ],
  },
};

const GrowthChat = () => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([{ node: 'start', step: 0 }]);
  const { openBookingModal } = useBookingModal();

  const currentNode = flows[history[history.length - 1].node];

  const handleOption = (opt) => {
    if (opt.action === 'book') {
      setOpen(false);
      openBookingModal();
      return;
    }
    if (opt.link) {
      setOpen(false);
      return;
    }
    setHistory([...history, { node: opt.next, step: history.length }]);
  };

  const reset = () => {
    setHistory([{ node: 'start', step: 0 }]);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full bg-ink text-canvas flex items-center justify-center shadow-lg hover:bg-charcoal transition-colors"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 right-5 md:bottom-24 md:right-6 z-50 w-[340px] bg-canvas border border-hairline-soft shadow-2xl overflow-hidden"
          >
            <div className="bg-ink text-canvas px-5 py-4">
              <p className="text-body-sm font-medium">The Growth Bench</p>
              <p className="text-caption-sm text-stone">Ask us anything</p>
            </div>

            <div className="p-5 max-h-[320px] overflow-y-auto space-y-4">
              {history.map((entry, i) => {
                const node = flows[entry.node];
                return (
                  <div key={i}>
                    <div className="bg-soft-cloud rounded-sm p-3 text-body-sm text-ink leading-relaxed">
                      {node.message}
                    </div>
                    {i === history.length - 1 && (
                      <div className="mt-3 space-y-2">
                        {node.options.map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() => handleOption(opt)}
                            className="w-full text-left px-3 py-2.5 text-body-sm text-ink border border-hairline-soft rounded-sm hover:border-ink hover:bg-soft-cloud transition-colors flex items-center justify-between group"
                          >
                            {opt.label}
                            {opt.link ? (
                              <Link to={opt.link} onClick={() => setOpen(false)} className="no-underline">
                                <ArrowRight className="w-3.5 h-3.5 text-mute group-hover:text-ink transition-colors" />
                              </Link>
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-mute group-hover:text-ink transition-colors" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-hairline-soft px-5 py-3 flex items-center justify-between">
              <button onClick={reset} className="text-caption-sm text-mute hover:text-ink transition-colors">
                Start over
              </button>
              <button
                onClick={() => { setOpen(false); openBookingModal(); }}
                className="text-caption-sm text-ink font-medium hover:text-mute transition-colors"
              >
                Book a call →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GrowthChat;
