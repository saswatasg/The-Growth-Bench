import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';

const growEase = [0.34, 1.56, 0.64, 1];
const smoothEase = [0.25, 0.1, 0.25, 1];

const wordConfig = {
  GROWTH: { startY: 80, startScale: 0.6, staggerMs: 80, dur: 0.6 },
  THAT: { startY: 60, startScale: 0.7, staggerMs: 50, dur: 0.5 },
  STICKS: { startY: 40, startScale: 0.8, staggerMs: 35, dur: 0.4 },
};

function AnimatedWord({ word, wordOffset }) {
  const config = wordConfig[word];
  const letters = word.split('');

  return (
    <span className="inline-block">
      {letters.map((char, i) => {
        const delay = wordOffset + i * config.staggerMs;
        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: config.startY, scale: config.startScale }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: delay / 1000,
              duration: config.dur,
              ease: growEase,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}

const HeroSection = () => {
  const { openBookingModal } = useBookingModal();
  const words = ['GROWTH', 'THAT', 'STICKS'];

  const wordOffsets = [];
  let offset = 0;
  for (const word of words) {
    wordOffsets.push(offset);
    offset += word.length * wordConfig[word].staggerMs + 200;
  }

  const totalAnimMs = offset;
  const descDelay = totalAnimMs / 1000 + 0.3;
  const ctaDelay = descDelay + 0.5;

  return (
    <section className="bg-canvas py-section-lg border-b border-hairline-soft min-h-[70vh] flex items-center">
      <div className="container-site w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-display-xl text-ink leading-none">
            {words.map((word, wi) => (
              <React.Fragment key={word}>
                {wi > 0 && <span className="inline-block w-[0.15em]" />}
                <AnimatedWord word={word} wordOffset={wordOffsets[wi]} />
              </React.Fragment>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: descDelay, duration: 0.7, ease: smoothEase }}
            className="text-body-lg text-mute mt-6 leading-relaxed max-w-xl mx-auto"
          >
            Strategy, ads, CRO, web, and systems — connected by one lead who sees the entire funnel.
            No handoffs between specialists who don't talk. No overhead from layers that don't build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ctaDelay, duration: 0.5, ease: growEase }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <Button size="lg" onClick={openBookingModal}>
              Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Link
              to="/services"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-hairline text-body-sm font-medium text-ink no-underline hover:bg-soft-cloud transition-colors"
            >
              See Our Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
