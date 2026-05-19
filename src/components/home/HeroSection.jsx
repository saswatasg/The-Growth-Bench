import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay }
});

const HeroSection = () => {
  return (
    <section className="section-light min-h-screen flex items-center pt-16">
      <div className="container-site w-full">
        <div className="max-w-3xl">
          <motion.div {...fadeUp(0)} className="section-eyebrow">
            FULL-STACK GROWTH PARTNER
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} className="mb-6 gradient-text">
            We build the growth engine your brand actually needs.
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="text-base md:text-lg text-body max-w-[560px] mb-10 leading-relaxed"
          >
            Strategy. Systems. Performance marketing. CRO. Websites. Lead systems. UI/UX.
            Under one roof. One senior point of contact. No agency overhead.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="flex flex-wrap gap-4 mb-8">
            <Button asChild size="lg">
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i" target="_blank" rel="noopener noreferrer" className="no-underline">
                Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Link to="/services" className="btn-ghost no-underline">
              See Our Services
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.32)} className="social-proof">
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
