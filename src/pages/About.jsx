import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Users, Zap, Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

const About = () => {
  const { openBookingModal } = useBookingModal();
  return (
    <>
      <PageMeta />

      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium" aria-current="page">About</span>
            </nav>
          </motion.div>
          <motion.div {...fadeIn(0)} className="section-eyebrow">ABOUT</motion.div>
          <motion.h1 {...fadeIn(0.08)} className="max-w-3xl">
            We're not an agency. We're the growth partner you actually wanted.
          </motion.h1>
        </div>
      </section>

      <section className="section-mid">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">Why The Growth Bench exists.</h2>
            <div className="max-w-3xl text-body text-lg leading-relaxed">
              <p>Most growing brands end up choosing between talented freelancers stretched too thin and large agencies with too many layers. <em>"I just wanted one person who understood my whole business and could build the whole thing properly."</em> — that's what founders told us. That's what The Growth Bench is.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">How the bench actually works.</h2>
            <p className="text-body text-lg max-w-3xl leading-relaxed mb-8">
              Every engagement is led by the founder — one senior person with complete context on your business. 
              When the work calls for a specialist, the right person from our vetted bench comes in. 
              You get agency depth without the headcount or the briefing layers.
            </p>
          </motion.div>

          <motion.div {...fadeIn(0.1)} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-8 bg-white rounded-xl border border-border">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-2">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm font-semibold">You (Founder)</p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-2">
                <Search className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-semibold text-primary">Growth Bench Lead</p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent-teal/10 flex items-center justify-center mx-auto mb-2">
                <Zap className="w-8 h-8 text-accent-teal" />
              </div>
              <p className="text-sm font-semibold">Bench Specialists (as needed)</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-mid">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-10">How we think about growth.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: <Search className="w-5 h-5 text-primary" />,
                title: 'Diagnosis before prescription.',
                body: "We don't recommend a channel until we understand the business. Every engagement starts with a thorough audit — it's the only honest way to start.",
              },
              {
                icon: <Heart className="w-5 h-5 text-primary" />,
                title: 'Owners, not vendors.',
                body: "We ask the questions a founder would ask. We'd rather delay a campaign by a week and get it right than launch something mediocre on time.",
              },
              {
                icon: <Zap className="w-5 h-5 text-primary" />,
                title: 'Speed through clarity.',
                body: 'Most delays come from unclear direction, not slow execution. We invest time upfront so everyone knows exactly what we\'re building and why.',
              },
              {
                icon: <Heart className="w-5 h-5 text-primary" />,
                title: 'Honest over impressive.',
                body: "We'd rather tell you something uncomfortable early than send a polished slide that turns out to be wrong. Good decisions require honesty.",
              },
            ].map((principle, i) => (
              <motion.div key={principle.title} {...fadeIn(0.1 * i)} className="card-standard">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-3">{principle.icon}</div>
                <h3 className="font-display font-bold text-base mb-1">{principle.title}</h3>
                <p className="text-sm text-body leading-relaxed">{principle.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-primary">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { stat: '₹2.89Cr', label: 'Monthly checkout recovery' },
              { stat: '28.71%', label: 'Add-to-cart lift via CRO' },
              { stat: '168%', label: 'Feature engagement uplift' },
              { stat: '3+ yrs', label: 'Building growth systems' },
            ].map((s, i) => (
              <motion.div key={s.stat} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="stat-number text-3xl">{s.stat}</div>
                <div className="text-sm text-white/70 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">Where the experience comes from.</h2>
            <div className="max-w-3xl text-body text-lg leading-relaxed">
              <p>The Growth Bench is founded by someone who has worked inside D2C e-commerce (a US furniture brand), B2B SaaS (a GST compliance platform), and product discovery (an AI venture studio). The work has crossed performance marketing, product management, growth strategy, website CRO, and analytics infrastructure — all with real revenue on the line. The ₹2.89Cr checkout recovery and 28.71% ATC lift on the homepage came from actual sprints on actual brands.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-mid">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">Who you'll be working with.</h2>
          </motion.div>
          <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
            <motion.div {...fadeIn(0.1)} className="flex flex-col items-center md:items-start">
              <div className="w-40 h-40 rounded-full bg-primary-light flex items-center justify-center mb-4 overflow-hidden">
                <span className="text-5xl font-display font-bold text-primary">S</span>
              </div>
              <h3 className="font-display font-bold text-lg text-center md:text-left">Saswata Sengupta</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">Founder, The Growth Bench</p>
            </motion.div>
            <motion.div {...fadeIn(0.2)} className="space-y-4 text-body text-lg leading-relaxed">
              <p>Hi — I'm Saswata. I started The Growth Bench after years inside D2C e-commerce, B2B SaaS, and product discovery — on both the agency side and the founder side. I've managed ad accounts spending crores per month, fixed checkout flows that recovered lakhs in lost revenue, and built growth systems for brands that started with nothing but a Shopify store.</p>
              <p>What I learned is that most brands don't need a bigger agency or a cheaper freelancer. They need one person who owns the full picture — with the right specialists on call when the work demands it. Reach me at <a href="mailto:hi@saswatasg.com" className="text-primary underline">hi@saswatasg.com</a>.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">What we aren't.</h2>
            <p className="text-body text-lg max-w-3xl leading-relaxed mb-6">
              We don't do daily social media posting, influencer campaigns, PR, or 24/7 support tiers. 
              What we do, we do thoroughly. What we don't do, we'll refer you to people who do it better.
            </p>
          </motion.div>

          <motion.div {...fadeIn(0.1)}>
            <h3 className="font-display font-bold text-base mb-3">The full bench</h3>
            <div className="flex flex-wrap gap-2">
              {['Product Manager', 'UI/UX Designer', 'SEO Specialist', 'Growth Consultant', 'Web Developer', 'Video Editor', 'Graphic Designer', 'Performance Marketer', 'CRO Specialist', 'AI Consultant', 'CRM Consultant'].map((role) => (
                <span key={role} className="tag tag-green">{role}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-dark text-center">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="text-white mb-4">If this sounds like what you've been looking for...</h2>
            <Button size="lg" onClick={openBookingModal}>Book a 30-Minute Call <ArrowRight className="w-4 h-4 ml-2" /></Button>
            <p className="text-sm text-white/40 italic mt-4">
              No commitment. We'll tell you in the first 10 minutes if we're the right fit.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
