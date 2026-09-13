import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';

const StickyMobileCTA = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-ink border-t border-ink/20 px-4 py-3 safe-area-bottom"
    >
      <Button
        size="lg"
        className="w-full bg-canvas text-ink hover:bg-soft-cloud"
        onClick={openBookingModal}
      >
        Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

export default StickyMobileCTA;
