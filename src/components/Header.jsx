import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { motion, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/proof', label: 'Case Studies' },
  { to: '/resources', label: 'Insights' },
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
        className="fixed top-0 left-0 right-0 h-0.5 bg-ink origin-left z-[70]"
        style={{ scaleX }}
      />
      <header className="sticky top-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur border-b border-hairline-soft">
        <div className="container-site flex items-center justify-between h-16">
          <Link to="/" className="flex items-center no-underline group">
            <img src="/logo.png" alt="The Growth Bench" className="h-8 w-auto" />
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
            <NavLink
              to="/get-started"
              className={({ isActive }) =>
                `text-body-sm font-medium no-underline transition-colors ${
                  isActive ? 'text-ink' : 'text-mute hover:text-ink'
                }`
              }
            >
              Get Started
            </NavLink>
            <Button size="sm" onClick={openBookingModal}>
              Book a Free Audit Call
            </Button>
          </nav>

          <button
            className="md:hidden p-3 -m-1 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-full"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-canvas flex flex-col md:hidden">
          <div className="container-site flex items-center justify-between h-16 border-b border-hairline-soft">
            <img src="/logo.png" alt="The Growth Bench" className="h-8 w-auto" />
            <button className="p-3 -m-1 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-full" onClick={() => setIsOpen(false)} aria-label="Close menu">
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
            <NavLink
              to="/get-started"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-heading-lg no-underline ${isActive ? 'text-ink' : 'text-mute'}`
              }
            >
              Get Started
            </NavLink>
            <div className="pt-4">
              <Button size="lg" className="w-full" onClick={() => { openBookingModal(); setIsOpen(false); }}>
                Book a Free Audit Call
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
