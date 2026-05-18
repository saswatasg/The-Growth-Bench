import React from 'react';
import { ArrowRight } from 'lucide-react';

const ClosingCTA = () => {
  const handleCalendarClick = () => {
    window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true', '_blank');
  };

  return (
    <section className="section-dark">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-white mb-4">Ready to fix your growth?</h2>
        <p className="text-white/50 text-[15px] md:text-[17px] mb-10 max-w-lg mx-auto">
          30-min call. No pitch, just diagnosis. Let&rsquo;s find out what&rsquo;s possible.
        </p>
        <button onClick={handleCalendarClick} className="btn-primary text-sm">
          Book a Free Strategy Call <ArrowRight className="ml-2 w-4 h-4 inline" />
        </button>
      </div>
    </section>
  );
};

export default ClosingCTA;
