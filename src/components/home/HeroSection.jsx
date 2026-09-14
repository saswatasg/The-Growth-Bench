import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';

const smoothEase = [0.25, 0.1, 0.25, 1];

const wordConfig = {
  GROWTH: {
    fallDistance: -140,
    startRotation: -6,
    staggerMs: 140,
    spring: { damping: 11, stiffness: 180, mass: 0.7 },
    squashScale: { x: 1.12, y: 0.82 },
  },
  THAT: {
    fallDistance: -110,
    startRotation: 4,
    staggerMs: 100,
    spring: { damping: 12, stiffness: 200, mass: 0.6 },
    squashScale: { x: 1.08, y: 0.88 },
  },
  STICKS: {
    fallDistance: -160,
    startRotation: -8,
    staggerMs: 80,
    spring: { damping: 10, stiffness: 160, mass: 0.8 },
    squashScale: { x: 1.15, y: 0.78 },
  },
};

function StickyLetter({ char, delay, config, onLanded }) {
  const [phase, setPhase] = useState('waiting');

  return (
    <motion.span
      className="inline-block will-change-transform"
      initial={{
        opacity: 0,
        y: config.fallDistance,
        rotateZ: config.startRotation,
        scale: 0.5,
      }}
      animate={
        phase === 'waiting'
          ? {
              opacity: [0, 1, 1],
              y: [
                config.fallDistance,
                0,
                config.squashScale.y * -8,
                0,
                -3,
                0,
              ],
              rotateZ: [
                config.startRotation,
                config.startRotation * -0.3,
                0,
                config.startRotation * 0.1,
                0,
              ],
              scale: [
                0.5,
                1.05,
                config.squashScale.x,
                1.02,
                1,
              ],
            }
          : {}
      }
      transition={
        phase === 'waiting'
          ? {
              delay: delay / 1000,
              duration: 1.4,
              times: [0, 0.35, 0.5, 0.65, 0.82, 1],
              ease: [0.22, 0.03, 0.36, 1],
              opacity: {
                delay: delay / 1000,
                duration: 0.3,
              },
            }
          : {}
      }
      onAnimationComplete={() => {
        if (phase === 'waiting') {
          setPhase('landed');
          onLanded?.();
        }
      }}
    >
      {char}
    </motion.span>
  );
}

function StickyWord({ word, wordOffset, onAllLanded }) {
  const [landedCount, setLandedCount] = useState(0);
  const config = wordConfig[word];
  const letters = word.split('');

  const handleLanded = () => {
    setLandedCount((prev) => {
      const next = prev + 1;
      if (next === letters.length) {
        onAllLanded?.();
      }
      return next;
    });
  };

  return (
    <span className="inline-block">
      {letters.map((char, i) => (
        <StickyLetter
          key={`${word}-${i}`}
          char={char}
          delay={wordOffset + i * config.staggerMs}
          config={config}
          onLanded={i === letters.length - 1 ? handleLanded : undefined}
        />
      ))}
    </span>
  );
}

const UnderlineReveal = ({ delay }) => (
  <motion.span
    className="block mx-auto mt-2 h-[3px] bg-ink origin-left"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{
      delay,
      duration: 0.8,
      ease: [0.22, 0.03, 0.36, 1],
    }}
    style={{ maxWidth: '280px' }}
  />
);

const HeroSection = () => {
  const { openBookingModal } = useBookingModal();
  const words = ['GROWTH', 'THAT', 'STICKS'];
  const [allLanded, setAllLanded] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const wordOffsets = [];
  let offset = 400;
  for (const word of words) {
    wordOffsets.push(offset);
    offset += word.length * wordConfig[word].staggerMs + 260;
  }

  const totalAnimMs = offset;
  const underlineDelay = totalAnimMs / 1000 + 0.2;
  const descDelay = underlineDelay + 0.6;
  const ctaDelay = descDelay + 0.6;

  return (
    <section ref={ref} className="bg-canvas py-[100px] md:py-[140px] overflow-hidden">
      <div className="container-site w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: smoothEase }}
          >
            <Link
              to="/services#ai-implementation"
              className="inline-flex items-center gap-2 text-label-xs uppercase tracking-wider border border-ink/20 rounded-full px-4 py-2 text-ink no-underline hover:bg-soft-cloud transition-colors"
            >
              Drowning in repeatable work? · Agentic AI for ops, support, content <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <h1 className="font-display text-display-lg md:text-display-xl lg:text-[80px] text-ink leading-[0.92] mt-8 select-none">
            {words.map((word, wi) => (
              <React.Fragment key={word}>
                {wi > 0 && <span className="inline-block w-[0.12em]" />}
                <StickyWord
                  word={word}
                  wordOffset={wordOffsets[wi]}
                  onAllLanded={wi === words.length - 1 ? () => setAllLanded(true) : undefined}
                />
              </React.Fragment>
            ))}
            {allLanded && <UnderlineReveal delay={0} />}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
            animate={allLanded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="text-body-lg text-mute mt-10 leading-relaxed max-w-2xl mx-auto"
          >
            Strategy, ads, CRO, web, and AI agents — connected by one lead who sees the entire funnel.
            No handoffs between specialists who don't talk. No overhead from layers that don't build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={allLanded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 0.03, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <Button size="lg" onClick={openBookingModal}>
              Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={allLanded ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-body-sm text-mute mt-6"
          >
            Or see{' '}
            <Link to="/services" className="text-ink font-medium underline underline-offset-2 hover:text-mute transition-colors">
              our services
            </Link>
            {' '}· take the{' '}
            <Link to="/ai-scorecard" className="text-ink font-medium underline underline-offset-2 hover:text-mute transition-colors">
              60-second AI scorecard
            </Link>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
