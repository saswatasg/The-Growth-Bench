import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

const services = [
  { label: 'Growth Strategy', to: '/services#strategy' },
  { label: 'Website & Development', to: '/services#website' },
  { label: 'Ads', to: '/services#ads' },
  { label: 'Lead Systems', to: '/services#lead-systems' },
  { label: 'CRO', to: '/services#cro' },
  { label: 'UI/UX Design', to: '/services#ui-ux' },
  { label: 'Marketing Strategy', to: '/services#marketing-strategy' },
];

const Footer = () => {
  return (
    <footer style={{ background: 'var(--color-dark)' }}>
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                The Growth
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight" style={{ color: 'var(--color-primary)' }}>
                Bench
              </span>
            </div>
            <p className="text-sm text-white/60 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Strategy. Systems. Scale.
            </p>
            <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Full-stack growth partner for D2C brands and early-stage startups.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.label}>
                  <Link to={s.to} className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">About</Link></li>
              <li><Link to="/case-studies" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">Past Projects</Link></li>
              <li><Link to="/insights" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">Insights</Link></li>
              <li><Link to="/work-with-us" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4 uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hi@saswatasg.com" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> hi@saswatasg.com
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ borderTop: '1px solid var(--color-dark-mid)' }}>
        <div className="container-site py-10">
          <div className="max-w-lg mx-auto text-center">
            <h4 className="text-white font-display font-semibold text-sm mb-2">Get growth insights in your inbox</h4>
            <p className="text-xs text-white/40 mb-4">Frameworks, teardowns, and strategy. No spam. Unsubscribe anytime.</p>
            <form action="https://api.web3forms.com/submit" method="POST" className="flex gap-2 max-w-sm mx-auto">
              <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY} />
              <input type="hidden" name="subject" value="Newsletter signup from The Growth Bench website" />
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 text-sm px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="text-sm font-medium px-4 py-2 rounded-lg text-white transition-all hover:shadow-md"
                style={{ background: 'var(--color-primary)' }}
              >
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-white/30 mt-3">By subscribing, you agree to our <a href="/privacy" className="underline hover:text-white/50">Privacy Policy</a>.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--color-dark-mid)' }}>
        <div className="container-site flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-sm text-white/40">
            &copy; 2026 The Growth Bench. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-white/40 hover:text-white/60 no-underline transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-white/40 hover:text-white/60 no-underline transition-colors">Terms</Link>
            <Link to="/admin/login" className="text-xs text-white/20 hover:text-white/40 no-underline transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
