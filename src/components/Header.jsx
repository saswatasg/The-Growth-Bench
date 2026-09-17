import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { WHATSAPP_URL } from '@/lib/constants';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/proof', label: 'Case Studies' },
  { to: '/resources', label: 'Insights' },
  { to: '/about', label: 'About' },
  { to: '/get-started', label: 'Get Started' },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { openBookingModal } = useBookingModal();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const closeButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-ink origin-left z-[70]"
        style={{ scaleX }}
      />
      <header className="sticky top-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur border-b border-hairline-soft">
        <div className="container-site flex items-center justify-between h-16">
          <Link to="/" className="flex items-center no-underline group">
            <img src="/logo.png" alt="The Growth Bench" className="h-12 w-auto" />
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
              Book a Free Audit Call
            </Button>
          </nav>

          <button
            className="md:hidden p-3.5 -m-1 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-full"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-ink/50 md:hidden"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-[min(80vw,320px)] bg-canvas shadow-2xl flex flex-col md:hidden"
            >
              {/* Close button */}
              <div className="flex items-center justify-end p-4">
                <button
                  ref={closeButtonRef}
                  onClick={handleClose}
                  aria-label="Close menu"
                  className="w-11 h-11 flex items-center justify-center text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-full hover:bg-soft-cloud transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-6 pb-6">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={handleClose}
                      className={({ isActive }) =>
                        `block py-3 px-4 text-body-lg font-medium no-underline rounded-lg transition-colors ${
                          isActive
                            ? 'text-ink bg-soft-cloud'
                            : 'text-mute hover:text-ink hover:bg-soft-cloud/50'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-hairline-soft" />

                {/* CTA */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => { openBookingModal(); handleClose(); }}
                >
                  Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Quick links */}
                <div className="mt-6 space-y-3">
                  <a
                    href="mailto:hello@thegrowthbench.com"
                    className="block text-body-sm text-mute no-underline hover:text-ink transition-colors"
                  >
                    hello@thegrowthbench.com
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-body-sm text-mute no-underline hover:text-ink transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
