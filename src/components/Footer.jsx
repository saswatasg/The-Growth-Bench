import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';
import { useBookingModal } from '@/context/BookingModalContext';

const footerLinks = {
  Services: [
    { label: 'AI Implementation', to: '/services' },
    { label: 'Growth Strategy', to: '/services' },
    { label: 'Website & Development', to: '/services' },
    { label: 'Ads', to: '/services' },
    { label: 'CRO', to: '/services' },
    { label: 'Analytics & Reporting', to: '/services' },
  ],
  Resources: [
    { label: 'Insights', to: '/resources' },
    { label: 'AI Scorecard', to: '/ai-scorecard' },
    { label: 'Growth Scorecard', to: '/growth-scorecard' },
  ],
  Company: [
    { label: 'Case Studies', to: '/proof' },
    { label: 'About', to: '/about' },
    { label: 'Get Started', to: '/get-started' },
  ],
};

const Footer = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <footer className="bg-ink text-canvas">
      {/* CTA Banner */}
      <div className="border-b border-stone/10">
        <div className="container-site py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-heading-xl text-canvas leading-none">Ready to grow?</h3>
            <p className="text-body-sm text-stone mt-2">Book a free 30-minute audit call. No pitch, no pressure.</p>
          </div>
          <button
            onClick={openBookingModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-canvas text-ink text-body-sm font-medium rounded-full hover:bg-soft-cloud transition-colors shrink-0"
          >
            Book a Free Audit Call <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Link Grid */}
      <div className="container-site py-[60px] md:py-[80px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {/* Brand + Contact */}
          <div className="col-span-2 md:col-span-1">
            <img src="/logo.png" alt="The Growth Bench" className="w-8 h-8 logo-dark mb-4" />
            <p className="text-body-sm text-stone leading-relaxed max-w-xs mb-6">
              Full-stack growth partner for D2C brands and early-stage startups. Strategy, systems, scale.
            </p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@thegrowthbench.com" className="text-body-sm text-stone no-underline hover:text-canvas transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> hello@thegrowthbench.com
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-body-sm text-stone no-underline hover:text-canvas transition-colors flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-caption-sm text-canvas font-medium mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-body-sm text-stone no-underline hover:text-canvas transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone/10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-caption-sm text-stone">
            &copy; 2026 The Growth Bench. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-caption-sm text-stone no-underline hover:text-canvas transition-colors">Privacy</Link>
            <Link to="/terms" className="text-caption-sm text-stone no-underline hover:text-canvas transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
