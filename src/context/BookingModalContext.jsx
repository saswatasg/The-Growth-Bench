import React, { createContext, useContext, useState, useEffect } from 'react';
import { WHATSAPP_URL } from '@/lib/constants';

const BookingModalContext = createContext();

export function BookingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const openBookingModal = () => { setIsOpen(true); setLoading(true); };
  const closeBookingModal = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) setLoading(true);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => { if (e.key === 'Escape') closeBookingModal(); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <BookingModalContext.Provider value={{ openBookingModal, closeBookingModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4"
          onClick={closeBookingModal}
        >
          <div
            className="relative w-full max-w-3xl bg-canvas rounded-none overflow-hidden shadow-2xl"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Book a free audit call"
          >
            <button
              onClick={closeBookingModal}
              aria-label="Close booking dialog"
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas/90 flex items-center justify-center shadow-sm hover:bg-canvas transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div style={{ height: '85vh', minHeight: '600px', position: 'relative' }}>
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: 'var(--color-card-bg, #fff)' }}>
                  <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground">Loading booking calendar...</p>
                </div>
              )}
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3wx11wN9wr9kdE7TBGU3impXZ4_MkcsGh6NsUD7F854Fnr5XsJnsR2mnPQ-K1IFLGydbxR_KKZ?gv=true"
                style={{ border: 0, width: '100%', height: '100%', opacity: loading ? 0 : 1 }}
                frameBorder="0"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                title="Book a call with The Growth Bench"
                onLoad={() => setLoading(false)}
              />
            </div>
            <p className="text-center text-caption-sm text-mute py-3 bg-canvas border-t border-hairline-soft">
              Calendar not loading?{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
                WhatsApp us instead
              </a>
            </p>
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  );
}

export const useBookingModal = () => useContext(BookingModalContext);
