import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { motion, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Work' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { openBookingModal } = useBookingModal();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-ink origin-left z-[60]"
        style={{ scaleX }}
      />
      <header className="sticky top-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur border-b border-hairline-soft">
        <div className="container-site flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center">
              <span className="text-caption-sm text-canvas font-bold leading-none">G</span>
            </div>
            <span className="font-display text-lg tracking-wide text-ink">
              THE GROWTH BENCH
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-body-sm font-medium no-underline transition-colors ${
                    isActive ? 'text-ink' : 'text-mute hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button size="sm" onClick={openBookingModal}>
              Book a Call
            </Button>
          </nav>

          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-canvas flex flex-col md:hidden">
          <div className="container-site flex items-center justify-between h-16 border-b border-hairline-soft">
            <span className="font-display text-lg tracking-wide text-ink">THE GROWTH BENCH</span>
            <button className="p-2 text-ink" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col container-site py-8 gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-heading-lg no-underline ${isActive ? 'text-ink' : 'text-mute'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4">
              <Button size="lg" className="w-full" onClick={() => { openBookingModal(); setIsOpen(false); }}>
                Book a Call
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
