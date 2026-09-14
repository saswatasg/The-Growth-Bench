import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Start' },
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
        className="fixed top-0 left-0 right-0 h-0.5 bg-ink dark:bg-accent origin-left z-[60]"
        style={{ scaleX }}
      />
      <header className="sticky top-0 left-0 right-0 z-50 bg-canvas/95 dark:bg-ink/95 backdrop-blur border-b border-hairline-soft dark:border-charcoal">
        <div className="container-site flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <div className="w-8 h-8 bg-ink dark:bg-canvas rounded-full flex items-center justify-center">
              <span className="text-caption-sm text-canvas dark:text-ink font-bold leading-none">G</span>
            </div>
            <span className="font-display text-lg tracking-wide text-ink dark:text-canvas">
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
                    isActive ? 'text-ink dark:text-canvas' : 'text-mute hover:text-ink dark:hover:text-canvas'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <ThemeToggle />
            <Button size="sm" onClick={openBookingModal}>
              Book a Call
            </Button>
          </nav>

          <button
            className="md:hidden p-3 -m-1 text-ink dark:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 dark:focus-visible:ring-accent/40 rounded-full"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-canvas dark:bg-ink flex flex-col md:hidden">
          <div className="container-site flex items-center justify-between h-16 border-b border-hairline-soft dark:border-charcoal">
            <span className="font-display text-lg tracking-wide text-ink dark:text-canvas">THE GROWTH BENCH</span>
            <button className="p-3 -m-1 text-ink dark:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 dark:focus-visible:ring-accent/40 rounded-full" onClick={() => setIsOpen(false)} aria-label="Close menu">
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
                  `text-heading-lg no-underline ${isActive ? 'text-ink dark:text-canvas' : 'text-mute dark:text-stone'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-4 pt-4">
              <ThemeToggle />
              <Button size="lg" className="flex-1" onClick={() => { openBookingModal(); setIsOpen(false); }}>
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
