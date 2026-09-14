import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';

// Unified triple-path row under every major CTA:
// Book (ready) · Scorecard (diagnose) · WhatsApp (quick question)
const CtaPaths = ({ tone = 'light', align = 'center' }) => {
  const { openBookingModal } = useBookingModal();
  const cls = tone === 'dark' ? 'text-stone hover:text-canvas dark:text-mute dark:hover:text-ink' : 'text-mute hover:text-ink dark:text-stone dark:hover:text-canvas';
  const justify = align === 'center' ? 'justify-center' : 'justify-start';
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm ${justify}`}>
      <button onClick={openBookingModal} className={`inline-flex items-center gap-1 font-medium no-underline transition-colors ${cls}`}>
        Ready? Book a free call <ArrowRight className="w-3.5 h-3.5" />
      </button>
      <Link to="/ai-scorecard" className={`inline-flex items-center gap-1 font-medium no-underline transition-colors ${cls}`}>
        Diagnosing? Take the AI scorecard <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 font-medium no-underline transition-colors ${cls}`}>
        Quick question? WhatsApp <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

export default CtaPaths;
