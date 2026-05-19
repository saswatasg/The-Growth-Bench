import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Users, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

const About = () => {
  return (
    <>
      <PageMeta />

      {/* Hero */}
      <section className="section-light pt-32 pb-24">
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

      {/* Origin Story */}
      <section className="section-off">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">Why The Growth Bench exists.</h2>
            <div className="max-w-3xl space-y-4 text-body text-lg leading-relaxed">
              <p>The Growth Bench was built because there's a real gap between what most growing brands need and what's actually available to them.</p>
              <p>Freelancers are talented but stretched thin. They can manage your ads or design your page, but they can't see the full picture. Agencies have the scope, but they come with overhead, layers, and a business model that rewards hours billed over outcomes delivered.</p>
              <p>Founders who've been through both situations often say the same thing: <em>"I just wanted one person who understood my whole business and could build the whole thing properly."</em></p>
              <p>That's what The Growth Bench is.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Bench Model */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">How the bench actually works.</h2>
            <p className="text-body text-lg max-w-3xl leading-relaxed mb-10">
              Every engagement is led by the founder of The Growth Bench — one senior person with complete context on your business, your goals, and your constraints.
              <br /><br />
              When the work calls for a specialist — a Shopify developer, a Klaviyo expert, a creative strategist — the right person from the bench comes in. These are people we've worked with before, vetted over time, and trust to deliver. They're not hired off a marketplace the morning you sign a contract.
              <br /><br />
              This means you get the depth of an agency without the headcount, without the briefing layers, and without paying for 30 people who aren't touching your account this month.
            </p>
          </motion.div>

          {/* Simple flow diagram */}
          <motion.div {...fadeIn(0.1)} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-8 bg-surface-off rounded-xl border border-border">
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

      {/* Our Approach */}
      <section className="section-off">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-10">How we think about growth.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Search className="w-6 h-6 text-primary" />,
                title: 'Diagnosis before prescription.',
                body: "We don't recommend a channel until we understand the business. Every engagement starts with a thorough audit — not because it's a deliverable, but because it's the only honest way to start.",
              },
              {
                icon: <Heart className="w-6 h-6 text-primary" />,
                title: 'Owners, not vendors.',
                body: "We ask the questions a founder would ask. Is this the right move right now? Is there a faster path? We'd rather delay a campaign by a week and get it right than launch something mediocre on time.",
              },
              {
                icon: <Zap className="w-6 h-6 text-primary" />,
                title: 'Speed through clarity.',
                body: 'Most delays come from unclear direction, not slow execution. We invest time upfront to make sure everyone knows exactly what we\'re building, why, and what success looks like.',
              },
              {
                icon: <Heart className="w-6 h-6 text-primary" />,
                title: 'Honest over impressive.',
                body: "We'd rather tell you something uncomfortable early than send you a polished slide that turns out to be wrong. Our job is to help you make good decisions — and that requires honesty.",
              },
            ].map((principle, i) => (
              <motion.div key={principle.title} {...fadeIn(0.1 * i)} className="card-standard">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">{principle.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2">{principle.title}</h3>
                <p className="text-sm text-body leading-relaxed">{principle.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">Where the experience comes from.</h2>
            <div className="max-w-3xl space-y-4 text-body text-lg leading-relaxed">
              <p>The Growth Bench is founded by someone who has worked inside D2C e-commerce (a US furniture brand), B2B SaaS (a GST compliance product serving Indian SMEs), and product discovery (an AI-focused venture studio). The work has crossed performance marketing, product management, growth strategy, website CRO, and analytics infrastructure.</p>
              <p>The experience isn't from textbooks or certifications — it's from building and optimising real products with real revenue on the line. The 28.71% add-to-cart lift and ₹2.89 crore monthly checkout recovery numbers on the homepage came from actual sprints on actual brands.</p>
              <p>That context shapes how we work. We understand that founders are stressed about money, that campaigns don't always work the first time, and that trust is built through doing what you said you'd do — not through pitch decks.</p>
            </div>
          </motion.div>
        </div>
      </section>
`n      {/* Founder */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">Who you'll be working with.</h2>
          </motion.div>
          <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
            <motion.div {...fadeIn(0.1)} className="flex flex-col items-center md:items-start">
              <div className="w-48 h-48 rounded-full bg-primary-light flex items-center justify-center mb-4 overflow-hidden">
                <span className="text-6xl font-display font-bold text-primary">S</span>
              </div>
              <h3 className="font-display font-bold text-xl text-center md:text-left">Saswata Mukherjee</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">Founder, The Growth Bench</p>
            </motion.div>
            <motion.div {...fadeIn(0.2)} className="space-y-4 text-body text-lg leading-relaxed">
              <p>Hi � I'm Saswata. I started The Growth Bench after spending years inside D2C e-commerce, B2B SaaS, and product discovery � on both the agency side and the founder side.</p>
              <p>I've managed ad accounts spending crores per month. I've fixed checkout flows that recovered lakhs in lost revenue. I've built growth systems from scratch for brands that had nothing but a Shopify store and a spreadsheet.</p>
              <p>What I learned is that most brands don't need a bigger agency or a cheaper freelancer. They need one person who actually owns the full picture � with the right specialists on call when the work demands it.</p>
              <p>That's what The Growth Bench is. If you'd like to talk about whether we can help, I'd love to hear from you.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="mb-6">Let's be upfront about what we aren't.</h2>
            <p className="text-body text-lg max-w-3xl leading-relaxed mb-8">
              We're not the right fit for every business, and we'd rather say that here than waste your time on a call.
              <br /><br />
              We don't do daily social media posting. We don't manage influencer campaigns. We don't do PR. We're not a graphic design studio or a video production house. We don't offer 24/7 support tiers or dedicated account teams with SLAs.
              <br /><br />
              What we do, we do thoroughly. What we don't do, we'll refer you to people who do it better than us.
            </p>
          </motion.div>

          {/* The team */}
          <motion.div {...fadeIn(0.1)}>
            <h3 className="font-display font-bold text-xl mb-4">The full bench</h3>
            <p className="text-body mb-6 max-w-2xl">
              When you work with The Growth Bench, you get access to a curated team of senior specialists — not a single generalist pretending to cover everything:
            </p>
            <div className="flex flex-wrap gap-2">
              {['Product Manager', 'UI/UX Designer', 'SEO Specialist', 'Growth Consultant', 'Web Developer', 'Video Editor', 'Graphic Designer', 'Performance Marketer', 'CRO Specialist', 'AI Consultant', 'CRM Consultant'].map((role) => (
                <span key={role} className="tag tag-green">{role}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark text-center">
        <div className="container-site">
          <motion.div {...fadeIn(0)}>
            <h2 className="text-white mb-4">If this sounds like what you've been looking for...</h2>
            <Button asChild size="lg">
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i" target="_blank" rel="noopener noreferrer" className="no-underline">
                Book a 30-Minute Call <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
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
