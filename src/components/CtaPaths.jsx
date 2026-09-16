import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';

const CtaPaths = ({ tone = 'light', align = 'center' }) => {
  const { openBookingModal } = useBookingModal();
  const cls = tone === 'dark' ? 'text-stone hover:text-canvas' : 'text-mute hover:text-ink';
  const justify = align === 'center' ? 'justify-center' : 'justify-start';
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm ${justify}`}>
      <Button variant="ghost" size="sm" onClick={openBookingModal} className={`gap-1 font-medium no-underline transition-colors ${cls}`}>
        Ready? Book a Free Audit Call <ArrowRight className="w-3.5 h-3.5" />
      </Button>
      <Link to="/ai-scorecard" className={`inline-flex items-center gap-1 font-medium no-underline transition-colors ${cls}`}>
        AI readiness? Take the scorecard <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <Link to="/growth-scorecard" className={`inline-flex items-center gap-1 font-medium no-underline transition-colors ${cls}`}>
        Growth leaks? Take the scorecard <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 font-medium no-underline transition-colors ${cls}`}>
        Quick question? WhatsApp <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

export default CtaPaths;
