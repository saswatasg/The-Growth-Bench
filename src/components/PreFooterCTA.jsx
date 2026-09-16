import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, BarChart3, MessageCircle } from 'lucide-react';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';

const PreFooterCTA = () => {
  const { openBookingModal } = useBookingModal();

  const actions = [
    {
      icon: Phone,
      title: 'Book a Free Audit Call',
      desc: '30 minutes. One concrete recommendation. No pitch.',
      onClick: openBookingModal,
      primary: true,
    },
    {
      icon: BarChart3,
      title: 'Take the AI Scorecard',
      desc: '60 seconds to find out what AI can automate in your business.',
      to: '/ai-scorecard',
      primary: false,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Us',
      desc: 'Quick question? Get a fast answer directly on WhatsApp.',
      href: WHATSAPP_URL,
      primary: false,
    },
  ];

  return (
    <section className="bg-soft-cloud py-[60px] md:py-[80px]">
      <div className="container-site">
        <div className="text-center mb-10">
          <h2 className="font-display text-heading-xl text-ink">Not sure where to start?</h2>
          <p className="text-body-md text-mute mt-2">Pick the path that fits where you are right now.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {actions.map((action) => {
            const Icon = action.icon;
            const content = (
              <>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${action.primary ? 'bg-ink' : 'bg-canvas border border-hairline-soft'}`}>
                  <Icon className={`w-5 h-5 ${action.primary ? 'text-canvas' : 'text-ink'}`} />
                </div>
                <h3 className="text-heading-md text-ink mb-2">{action.title}</h3>
                <p className="text-body-sm text-mute leading-relaxed mb-4">{action.desc}</p>
                <span className="text-body-sm font-medium text-ink flex items-center gap-1">
                  Get started <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </>
            );

            if (action.onClick) {
              return (
                <button
                  key={action.title}
                  onClick={action.onClick}
                  className={`text-left p-6 transition-all duration-300 ${action.primary ? 'bg-ink text-canvas hover:opacity-90' : 'bg-canvas border border-hairline-soft hover:border-ink'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40`}
                >
                  {content}
                </button>
              );
            }

            if (action.to) {
              return (
                <Link
                  key={action.title}
                  to={action.to}
                  className="block p-6 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 no-underline"
                >
                  {content}
                </Link>
              );
            }

            return (
              <a
                key={action.title}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 no-underline"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
