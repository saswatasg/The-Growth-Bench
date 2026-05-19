import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BOOKING_URL } from '@/lib/constants';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Past Projects' },
  { to: '/insights', label: 'Insights' },
  { to: '/work-with-us', label: 'Work With Us' },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const overlayRef = React.useRef(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="container-site flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1 no-underline">
            <span className="font-display text-xl font-extrabold tracking-tight" style={{ color: 'var(--color-dark)' }}>
              The Growth
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight" style={{ color: 'var(--color-primary)' }}>
              Bench
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide uppercase no-underline transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button asChild size="sm">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="no-underline">Book a Call</a>
            </Button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-3 text-foreground"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Overlay — separate from <header> to avoid fixed-in-fixed stacking issues */}
      {isOpen && (
        <div ref={overlayRef} className="fixed inset-0 z-[60] bg-gray-900/95 flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            className="absolute top-4 right-4 p-2 text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl font-display font-semibold no-underline hover:text-primary transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
          <Button asChild size="lg" className="mt-4" onClick={() => setIsOpen(false)}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="no-underline">Book a Call</a>
          </Button>
        </div>
      )}
    </>
  );
};

export default Header;
