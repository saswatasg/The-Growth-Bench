import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, TrendingUp, MessageSquare, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import CtaPaths from '@/components/CtaPaths';
import { WHATSAPP_URL } from '@/lib/constants';
import { fadeUp, fadeIn } from '@/lib/motion';

const STEPS = [
  { icon: MessageSquare, title: 'You tell us your story', body: 'Where your business is, what you want to grow, and what\'s been standing in the way.' },
  { icon: Zap, title: 'We diagnose live', body: 'We ask sharp questions and share what we\'re seeing — we usually spot quick wins in 10 minutes.' },
  { icon: Sparkles, title: 'You get a clear next step', body: 'Even if we\'re not the right fit, you\'ll leave with at least one concrete thing to try.' },
];

const GetStarted = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <>
      <PageMeta />

      {/* Hero */}
      <section className="bg-canvas py-[100px] md:py-[120px]">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">Get Started</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
              Start with a diagnosis.<br />Then we build.
            </h1>
            <p className="text-body-lg text-mute mt-6 max-w-xl leading-relaxed">
              Two paths in: take a free scorecard to see where you stand, or book a call and we&apos;ll diagnose together.
            </p>
          </div>
        </div>
      </section>

      {/* Scorecard choice — full-width black */}
      <section className="bg-ink py-[60px] md:py-[80px]">
        <div className="container-site">
          <div className="max-w-2xl mb-8">
            <span className="text-label-xs text-stone uppercase tracking-wider">Free scorecards</span>
            <h2 className="font-display text-display-md text-canvas mt-2 leading-none">Not ready to talk?<br />Diagnose yourself first.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/ai-scorecard"
              className="group p-6 md:p-8 border border-stone/20 bg-ink hover:border-canvas transition-colors no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-canvas/10 flex items-center justify-center mb-4">
                <Workflow className="w-5 h-5 text-canvas" />
              </div>
              <h3 className="font-display text-heading-xl text-canvas leading-none">AI Readiness Scorecard</h3>
              <p className="text-body-sm text-stone mt-3 leading-relaxed">
                Which parts of your ops, support, and content can be automated? 60 seconds, instant readout.
              </p>
              <span className="text-body-sm text-canvas mt-4 flex items-center gap-1 font-medium">
                Take the quiz <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              to="/growth-scorecard"
              className="group p-6 md:p-8 border border-stone/20 bg-ink hover:border-canvas transition-colors no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-canvas/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-canvas" />
              </div>
              <h3 className="font-display text-heading-xl text-canvas leading-none">Growth Audit Scorecard</h3>
              <p className="text-body-sm text-stone mt-3 leading-relaxed">
                Funnel health check — where are the leaks? Get a prioritised fix list in 60 seconds.
              </p>
              <span className="text-body-sm text-canvas mt-4 flex items-center gap-1 font-medium">
                Take the quiz <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Book a call */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[100px] md:py-[120px]">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">Or talk to us</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">Book a free 30-minute audit call.</h2>
            <p className="text-body-md text-mute mt-4 max-w-lg leading-relaxed">
              We&apos;ll look at your funnel, give you one concrete recommendation, and tell you honestly if we can help. No pitch, no pressure.
            </p>
          </div>
          <div className="mt-8">
            <Button size="lg" onClick={openBookingModal}>
              Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.section>

      {/* What happens on the call */}
      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <h2 className="font-display text-display-md text-ink text-center leading-none mb-12">What happens on the call</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-ink" />
                  </div>
                  <h3 className="text-heading-md text-ink mb-2">{s.title}</h3>
                  <p className="text-body-sm text-mute leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Quick contact */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[60px] md:py-[80px] text-center">
        <div className="container-site">
          <p className="text-body-sm text-mute mb-6">Prefer something quicker?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors"
            >
              WhatsApp us <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:hello@thegrowthbench.com"
              className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors"
            >
              Email hello@thegrowthbench.com <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="mt-8">
            <CtaPaths tone="light" />
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default GetStarted;
