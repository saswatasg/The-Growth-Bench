import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin } from 'lucide-react';

const services = [
  { label: 'Growth Strategy', to: '/services#strategy' },
  { label: 'Website & Development', to: '/services#website' },
  { label: 'Google Ads', to: '/services#google-ads' },
  { label: 'Meta Ads', to: '/services#meta-ads' },
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
              <li><Link to="/past-projects" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">Past Projects</Link></li>
              <li><Link to="/insights" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">Insights</Link></li>
              <li><Link to="/work-with-us" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">Work With Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4 uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@thegrowthbench.com" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> hello@thegrowthbench.com
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://thegrowthbench.com" className="text-sm text-white/50 hover:text-white/80 no-underline transition-colors">
                  thegrowthbench.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--color-dark-mid)' }}>
        <div className="container-site flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-sm text-white/40">
            &copy; 2025 The Growth Bench. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-white/40 hover:text-white/60 no-underline transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-white/40 hover:text-white/60 no-underline transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
