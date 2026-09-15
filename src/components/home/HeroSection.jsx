import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';

const wordConfig = {
  GROWTH: {
    fallDistance: -120,
    startRotation: -5,
    staggerMs: 60,
    squashScale: { x: 1.1, y: 0.85 },
  },
  THAT: {
    fallDistance: -90,
    startRotation: 3,
    staggerMs: 45,
    squashScale: { x: 1.08, y: 0.88 },
  },
  STICKS: {
    fallDistance: -140,
    startRotation: -7,
    staggerMs: 35,
    squashScale: { x: 1.12, y: 0.8 },
  },
};

function StickyLetter({ char, delay, config }) {
  return (
    <motion.span
      className="inline-block"
      initial={{
        opacity: 0,
        y: config.fallDistance,
        rotateZ: config.startRotation,
        scale: 0.5,
      }}
      animate={{
        opacity: [0, 1, 1],
        y: [config.fallDistance, 0, config.squashScale.y * -6, 0, -2, 0],
        rotateZ: [config.startRotation, config.startRotation * -0.3, 0, 0],
        scale: [0.5, 1.04, config.squashScale.x, 1.01, 1],
      }}
      transition={{
        delay: delay / 1000,
        duration: 0.7,
        times: [0, 0.4, 0.55, 0.7, 0.85, 1],
        ease: [0.22, 0.03, 0.36, 1],
        opacity: { delay: delay / 1000, duration: 0.2 },
      }}
    >
      {char}
    </motion.span>
  );
}

function StickyWord({ word, wordOffset }) {
  const config = wordConfig[word];
  const letters = word.split('');
  return (
    <span className="inline-block">
      {letters.map((char, i) => (
        <StickyLetter
          key={`${word}-${i}`}
          char={char}
          delay={wordOffset + i * config.staggerMs}
          config={config}
        />
      ))}
    </span>
  );
}

const UnderlineReveal = () => (
  <motion.span
    className="block mx-auto mt-2 h-[3px] bg-ink origin-left"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 0.03, 0.36, 1] }}
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
  let offset = 150;
  for (const word of words) {
    wordOffsets.push(offset);
    offset += word.length * wordConfig[word].staggerMs + 120;
  }
  const totalAnimMs = offset;

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setAllLanded(true), totalAnimMs + 200);
    return () => clearTimeout(timer);
  }, [isInView, totalAnimMs]);

  return (
    <section ref={ref} className="bg-canvas py-[100px] md:py-[140px] overflow-hidden">
      <div className="container-site w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
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
                <StickyWord word={word} wordOffset={wordOffsets[wi]} />
              </React.Fragment>
            ))}
            {allLanded && <UnderlineReveal />}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={allLanded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.6 }}
            className="text-body-lg text-mute mt-10 leading-relaxed max-w-2xl mx-auto"
          >
            One partner. Full funnel. From audit to AI agents — we own the outcome, not just the channel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={allLanded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <Button size="lg" onClick={openBookingModal}>
              Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={allLanded ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-body-sm text-mute mt-6"
          >
            No retainer commitment · Cancel anytime · $345K/mo recovered for one client
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
