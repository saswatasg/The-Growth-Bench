import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, BarChart3, MessageCircle } from 'lucide-react';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';

const PreFooterCTA = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="bg-soft-cloud py-[60px] md:py-[80px]">
      <div className="container-site">
        <div className="text-center mb-10">
          <h2 className="font-display text-heading-xl text-ink">Not sure where to start?</h2>
          <p className="text-body-md text-mute mt-2">Pick the path that fits where you are right now.</p>
        </div>

        {/* Desktop: 2 columns — Book Call takes 50%, two smaller cards stack on right */}
        <div className="hidden md:grid grid-cols-2 gap-4 max-w-5xl mx-auto">
          {/* Primary: Book a Call — larger card */}
          <button
            onClick={openBookingModal}
            className="text-left p-8 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mb-5">
                <Phone className="w-6 h-6 text-ink" />
              </div>
              <h3 className="text-heading-lg text-ink mb-2">Book a Free Audit Call</h3>
              <p className="text-body-md text-mute leading-relaxed">30 minutes. One concrete recommendation. No pitch, no pressure.</p>
            </div>
            <span className="text-body-sm font-medium text-ink flex items-center gap-1 mt-6">
              Book now <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Right column: two smaller cards stacked */}
          <div className="flex flex-col gap-4">
            <Link
              to="/ai-scorecard"
              className="text-left p-6 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 no-underline flex flex-col justify-between flex-1"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5 text-ink" />
                </div>
                <h3 className="text-heading-md text-ink mb-1">Take the AI Scorecard</h3>
                <p className="text-body-sm text-mute leading-relaxed">60 seconds to find out what AI can automate in your business.</p>
              </div>
              <span className="text-body-sm font-medium text-ink flex items-center gap-1 mt-4">
                Start scorecard <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left p-6 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 no-underline flex flex-col justify-between flex-1"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5 text-ink" />
                </div>
                <h3 className="text-heading-md text-ink mb-1">WhatsApp Us</h3>
                <p className="text-body-sm text-mute leading-relaxed">Quick question? Get a fast answer directly on WhatsApp.</p>
              </div>
              <span className="text-body-sm font-medium text-ink flex items-center gap-1 mt-4">
                Send a message <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>

        {/* Mobile: Book Call full-width, then two side-by-side */}
        <div className="md:hidden flex flex-col gap-4 max-w-lg mx-auto">
          <button
            onClick={openBookingModal}
            className="text-left p-6 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          >
            <div className="w-10 h-10 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-ink" />
            </div>
            <h3 className="text-heading-md text-ink mb-1">Book a Free Audit Call</h3>
            <p className="text-body-sm text-mute leading-relaxed">30 minutes. One concrete recommendation. No pitch.</p>
            <span className="text-body-sm font-medium text-ink flex items-center gap-1 mt-4">
              Book now <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/ai-scorecard"
              className="text-left p-5 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 no-underline"
            >
              <div className="w-8 h-8 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mb-3">
                <BarChart3 className="w-4 h-4 text-ink" />
              </div>
              <h3 className="text-body-sm font-medium text-ink mb-1">AI Scorecard</h3>
              <p className="text-caption-sm text-mute leading-relaxed">60-second automation check.</p>
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left p-5 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 no-underline"
            >
              <div className="w-8 h-8 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mb-3">
                <MessageCircle className="w-4 h-4 text-ink" />
              </div>
              <h3 className="text-body-sm font-medium text-ink mb-1">WhatsApp</h3>
              <p className="text-caption-sm text-mute leading-relaxed">Quick answer, directly.</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
