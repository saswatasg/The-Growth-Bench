import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Code2, Target, Users, TrendingUp, Palette, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';

const serviceIcons = [
  { icon: Search, label: 'Strategy & Audit', href: '/services#strategy' },
  { icon: Target, label: 'Ads', href: '/services#ads' },
  { icon: TrendingUp, label: 'CRO', href: '/services#cro' },
  { icon: Code2, label: 'Web Dev', href: '/services#website' },
  { icon: Users, label: 'Lead Systems', href: '/services#lead-systems' },
  { icon: Palette, label: 'UI/UX', href: '/services#ui-ux' },
  { icon: FileText, label: 'Content', href: '/services#marketing-strategy' },
  { icon: BarChart3, label: 'Analytics', href: '/services#ads' },
];

const HeroSection = () => {
  const { openBookingModal } = useBookingModal();
  return (
    <section className="section-light min-h-screen flex items-center pt-16">
      <div className="container-site w-full">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.16 }}
            className="text-base md:text-lg text-body max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            One senior partner who owns the full picture. Specialist bench on demand. Full-stack capability across strategy, ads, CRO, web, and systems — without the overhead of an agency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.24 }}
            className="flex flex-wrap gap-4 mb-10 justify-center"
          >
            <Button size="lg" onClick={openBookingModal}>Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" /></Button>
            <Link to="/services" className="btn-ghost no-underline">
              See Our Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.32 }}
            className="mb-10"
          >
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-w-xl mx-auto">
              {serviceIcons.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.label}
                    to={s.href}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-border bg-white hover:border-primary/30 hover:shadow-sm transition-all no-underline group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] text-center text-muted-foreground group-hover:text-foreground leading-tight font-medium">
                      {s.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
            className="social-proof justify-center"
          >
            <span className="social-proof-dot" />
            <span>D2C & early-stage startups</span>
            <span className="text-faint">&middot;</span>
            <span className="social-proof-dot" />
            <span>India-based, globally experienced</span>
            <span className="text-faint">&middot;</span>
            <span className="social-proof-dot" />
            <span>Full-stack, no middlemen</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
