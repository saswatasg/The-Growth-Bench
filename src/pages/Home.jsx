import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import HeroSection from '@/components/home/HeroSection';
import StatRow from '@/components/home/StatRow';
import ServicesOverview from '@/components/home/ServicesOverview';
import BrandLogos from '@/components/home/BrandLogos';
import { Magnetic } from '@/components/Magnetic';

const BOOKING_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i';

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const Home = () => {
  return (
    <>
      <PageMeta />

      <HeroSection />

      <BrandLogos />

      {/* The Problem We Solve */}
      <section className="section-alt">
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">THE GAP IN THE MARKET</div>
            <h2 className="max-w-2xl mb-6">Most growing brands are stuck between two bad options.</h2>
            <p className="text-body text-lg max-w-3xl leading-relaxed mb-12">
              Option one: a solo freelancer who's stretched thin across 12 clients and can't see the full picture. Option two: a bloated 50-person agency with an account manager as the middleman and a price tag that assumes you're already profitable.
              <br /><br />
              The Growth Bench lives in the gap. Senior-led. Specialist-backed. One point of contact with full-stack capability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0 }} className="card-standard">
              <div className="w-12 h-12 rounded-full bg-surface-grey flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-body)" strokeWidth="1.5"><path d="M12 20V10M12 10L8 14M12 10L16 14"/><circle cx="12" cy="12" r="9"/></svg>
              </div>
              <h3 className="text-lg font-display font-bold mb-2">The freelancer problem</h3>
              <p className="text-sm text-body leading-relaxed">Good people, limited scope. No systems, no strategy ownership. You outgrow them faster than you expected.</p>
            </motion.div>

            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.1 }} className="card-highlighted">
              <span className="tag-amber text-[10px] mb-3 inline-block">WHERE YOU WANT TO BE</span>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <h3 className="text-lg font-display font-bold mb-2">The Growth Bench</h3>
              <p className="text-sm text-body leading-relaxed">One senior partner who owns the full picture. Specialists on the bench for every function. You get depth without the overhead.</p>
            </motion.div>

            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.2 }} className="card-standard">
              <div className="w-12 h-12 rounded-full bg-surface-grey flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-body)" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <h3 className="text-lg font-display font-bold mb-2">The agency problem</h3>
              <p className="text-sm text-body leading-relaxed">Expensive retainers, slow onboarding, and layers between you and the people actually doing the work.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <ServicesOverview />

      {/* How We Work (Bench Model) */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">HOW IT WORKS</div>
            <h2 className="max-w-xl mb-6">One partner. The right team. No layers.</h2>
            <p className="text-body text-lg max-w-3xl leading-relaxed mb-16">
              Every engagement is led by the founder of The Growth Bench — someone with full context on your business — with specialist bench members brought in based on what the work actually needs.
              <br /><br />
              You always know who's responsible. You never have to brief an account manager to brief a strategist to brief a designer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px border-t-2 border-dashed border-border" style={{ width: 'calc(66.66% - 56px)', margin: '0 auto' }} />

            {[
              { num: '01', title: 'We start with a diagnosis', body: 'One free 30-minute call where we audit your funnel, ask sharp questions, and tell you honestly what\'s broken and what the fastest lever is.' },
              { num: '02', title: 'We build the right team for your problem', body: 'Based on your needs, the right specialists come on. Not whoever\'s available — whoever\'s best for this specific job.' },
              { num: '03', title: 'We execute, report, and iterate', body: 'Every engagement runs on clear deliverables, weekly check-ins, and monthly strategy reviews. No black boxes, no vanity metrics.' },
            ].map((step, i) => (
              <motion.div key={step.num} {...stagger} transition={{ ...stagger.transition, delay: i * 0.1 }} className="text-center md:text-left">
                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mx-auto md:mx-0 mb-4 relative z-10">
                  <span className="font-display font-extrabold text-xl text-primary">{step.num}</span>
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-body leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatRow />

      {/* Who We Work With */}
      <section className="section-off">
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">WHO WE SERVE</div>
            <h2 className="max-w-xl mb-6">Built for founders who are done guessing.</h2>
            <p className="text-body text-lg max-w-2xl leading-relaxed mb-12">
              We work best with D2C brands and early-stage startups where the founder is still in the room — people who want a high-trust partner that thinks like an owner, not a vendor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0 }}>
              <h3 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--color-primary)' }}>You&apos;re a good fit if...</h3>
              <ul className="space-y-3">
                {[
                  "You're a D2C brand doing ₹10L–₹10Cr/month and growth feels inconsistent",
                  "You've tried agencies or freelancers and feel like something's always falling through the gap",
                  "You want one partner who understands your entire funnel — not five vendors who don't talk to each other",
                  "You're building from scratch and need systems, not just execution",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.1 }}>
              <h3 className="font-display font-bold text-lg mb-4 text-muted-foreground">We're probably not the right fit if...</h3>
              <ul className="space-y-3">
                {[
                  "You need daily social media posting or community management",
                  "You want the cheapest execution available with no strategic input",
                  "You're looking for a team of 20 people with enterprise SLAs",
                  "Your brief changes every week and you're not ready to commit to a direction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials + Final CTA */}
      <section className="section-alt">
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "Review",
                "position": 1,
                "itemReviewed": { "@type": "Organization", "name": "The Growth Bench" },
                "reviewRating": { "@type": "Rating", "ratingValue": 5 },
                "author": { "@type": "Person", "name": "Founder, US D2C Brand" },
                "reviewBody": "The Growth Bench fixed our checkout and helped us think about our entire funnel differently."
              },
              {
                "@type": "Review",
                "position": 2,
                "itemReviewed": { "@type": "Organization", "name": "The Growth Bench" },
                "reviewRating": { "@type": "Rating", "ratingValue": 5 },
                "author": { "@type": "Person", "name": "CMO, B2B SaaS Startup" },
                "reviewBody": "Most agencies just execute. The Growth Bench asks the right questions first, then builds the solution."
              }
            ]
          })}
        </script>
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">WHAT PEOPLE SAY</div>
            <h2 className="mb-12">Results that speak plainly.</h2>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="card-standard relative">
              <span className="absolute top-4 right-6 text-7xl font-display font-bold text-primary/10">&ldquo;</span>
              <p className="text-body italic leading-relaxed mb-4">The Growth Bench didn't just fix our checkout — they helped us think about our entire funnel differently. The results speak for themselves.</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>— Founder, US D2C Brand</p>
            </div>
            <div className="card-standard relative">
              <span className="absolute top-4 right-6 text-7xl font-display font-bold text-primary/10">&ldquo;</span>
              <p className="text-body italic leading-relaxed mb-4">What stood out was the strategic depth. Most agencies just execute. The Growth Bench asks the right questions first, then builds the solution. Completely different experience.</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>— CMO, B2B SaaS Startup</p>
            </div>
          </motion.div>

          <motion.p className="text-sm text-center text-muted-foreground mt-8">
            Ready to see what your business could do with a full growth partner?{' '}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-medium underline underline-offset-2" style={{ color: 'var(--color-primary)' }}>Book your free audit call.</a>
          </motion.p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-dark">
        <div className="container-site text-center">
          <motion.div {...stagger}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
              <Sparkles className="w-3.5 h-3.5" /> 7-Day Free Trial
            </div>
            <h2 className="text-white mb-4">Try us free for 7 days. No commitment.</h2>
            <p className="text-faint text-lg max-w-[520px] mx-auto leading-relaxed mb-10">
              Book a free 30-minute audit call. We'll look at your funnel, give you one concrete recommendation, and tell you honestly if we can help. No pitch, no pressure. If you don't see value in 7 days, you walk away.
            </p>
            <Magnetic strength={0.4}>
              <Button asChild size="lg" className="shadow-green text-base px-9 py-4">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
                  Book Your Free Trial <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </Magnetic>
            <p className="text-sm text-white/40 mt-4">
              No credit card required. No retainer commitment. <span className="text-white/60 font-medium">Cancel anytime.</span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
