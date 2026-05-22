import React, { createContext, useContext, useState } from 'react';

const BookingModalContext = createContext();

export function BookingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal = () => setIsOpen(true);
  const closeBookingModal = () => setIsOpen(false);

  return (
    <BookingModalContext.Provider value={{ openBookingModal, closeBookingModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeBookingModal}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeBookingModal}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div style={{ height: '85vh', minHeight: '600px' }}>
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3wx11wN9wr9kdE7TBGU3impXZ4_MkcsGh6NsUD7F854Fnr5XsJnsR2mnPQ-K1IFLGydbxR_KKZ?gv=true"
                style={{ border: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                title="Book a call with The Growth Bench"
              />
            </div>
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  );
}

export const useBookingModal = () => useContext(BookingModalContext);
