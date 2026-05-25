import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

const footerLinks = {
  Services: [
    { label: 'Growth Strategy', to: '/services#strategy' },
    { label: 'Website & Development', to: '/services#website' },
    { label: 'Ads', to: '/services#ads' },
    { label: 'CRO', to: '/services#cro' },
    { label: 'UI/UX Design', to: '/services#ui-ux' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Work', to: '/case-studies' },
    { label: 'Insights', to: '/insights' },
    { label: 'Pricing', to: '/pricing' },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-ink text-canvas">
      <div className="container-site py-section-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="w-8 h-8 bg-canvas rounded-full flex items-center justify-center mb-3">
              <span className="text-caption-sm text-ink font-bold">G</span>
            </div>
            <p className="text-body-sm text-stone leading-relaxed max-w-xs">
              Full-stack growth partner for D2C brands and early-stage startups. Strategy, systems, scale.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-caption-sm text-canvas font-medium mb-4">{title}</h4>
              <ul className="space-y-2">
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

          <div>
            <h4 className="text-caption-sm text-canvas font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hi@saswatasg.com" className="text-body-sm text-stone no-underline hover:text-canvas transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-body-sm text-stone no-underline hover:text-canvas transition-colors flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-stone/20">
        <div className="container-site flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-caption-sm text-stone">
            &copy; 2026 The Growth Bench. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-caption-sm text-stone no-underline hover:text-canvas transition-colors">Privacy</Link>
            <Link to="/terms" className="text-caption-sm text-stone no-underline hover:text-canvas transition-colors">Terms</Link>
            <Link to="/admin/login" className="text-caption-sm text-stone/50 no-underline hover:text-stone transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
