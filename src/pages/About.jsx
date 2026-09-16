import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Palette, Code2, Target, ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { fadeUp, fadeIn, staggerContainer, staggerChild } from '@/lib/motion';

const About = () => {
  return (
    <>
      <PageMeta />

      {/* Hero */}
      <section className="bg-canvas py-[100px] md:py-[120px]">
        <div className="container-site text-center">
          <span className="text-label-xs text-mute uppercase tracking-wider">About</span>
          <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
            We're not an agency.<br />We're the growth partner<br />you actually wanted.
          </h1>
        </div>
      </section>

      {/* The Problem */}
      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="max-w-4xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">The Problem</span>
            <p className="text-body-md text-mute leading-relaxed mt-4 max-w-2xl">
              Most growing brands end up choosing between talented freelancers stretched too thin and large agencies with too many layers.
            </p>
            <p className="text-heading-md text-ink leading-snug mt-6 border-l-4 border-ink pl-5">
              "I just wanted one person who understood my whole business and could build the whole thing properly."
            </p>
            <p className="text-caption-sm text-mute mt-2">— What founders told us</p>
            <p className="text-body-md text-mute leading-relaxed mt-6 max-w-2xl">
              That person is your Growth Bench lead — a senior partner who owns the full picture, with the right specialists on call when the work demands it. No handoffs, no layers, no overhead you don't need.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Operating Model */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">The Operating Model</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">The same person who sees<br />the full picture builds it.</h2>
          </div>

          <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: '01', title: 'One lead, end to end', desc: 'The person who audits your funnel leads execution across every channel and every sprint. No handoffs, no context lost between strategy and delivery.' },
              { icon: '02', title: 'Specialists who scale', desc: 'CRO, ads, dev, design — deployed for what\'s needed, never burning hours on a retainer bench. You pay for depth, not occupancy.' },
              { icon: '03', title: 'Direct to the source', desc: 'Your lead works directly with you. No account managers routing messages, no briefings lost in translation. Decisions in hours, not days.' },
            ].map((step) => (
              <motion.div key={step.icon} {...staggerChild} className="p-6 bg-canvas border border-hairline-soft">
                <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center mb-4">
                  <span className="text-caption-sm text-canvas font-bold">{step.icon}</span>
                </div>
                <h3 className="text-heading-md text-ink">{step.title}</h3>
                <p className="text-body-sm text-mute mt-2 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How We Think */}
      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">How We Think</span>
          </div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
            {[
              { num: '01', title: 'Diagnosis before prescription.', body: "We don't recommend a channel until we understand the business. Every engagement starts with a thorough audit." },
              { num: '02', title: 'Owners, not vendors.', body: "We ask the questions a founder would ask. We'd rather delay a campaign by a week and get it right." },
              { num: '03', title: 'Speed through clarity.', body: 'Most delays come from unclear direction, not slow execution. We invest time upfront so everyone knows what we\'re building.' },
              { num: '04', title: 'Honest over impressive.', body: "We'd rather tell you something uncomfortable early than send a polished slide that turns out to be wrong." },
            ].map((p) => (
              <motion.div key={p.num} {...staggerChild}>
                <span className="text-label-xs text-mute font-mono">{p.num}</span>
                <h3 className="font-display text-heading-xl text-ink leading-none mt-1">{p.title}</h3>
                <p className="text-body-sm text-mute mt-3 leading-relaxed max-w-md">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section {...fadeIn} className="bg-ink py-[80px] md:py-[100px]">
        <div className="container-site text-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
            {[
              { stat: '3', label: 'Industries served — D2C, B2B SaaS, education' },
              { stat: '9', label: 'Service lines under one bench' },
              { stat: '25+', label: 'Projects delivered for brands and startups' },
            ].map((s) => (
              <div key={s.stat}>
                <motion.span
                  className="font-display text-heading-xl md:text-display-lg text-canvas leading-none block"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                  {s.stat}
                </motion.span>
                <div className="text-caption-md text-hairline mt-2">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-caption-sm text-hairline/80 mt-8">Representative outcomes across client engagements; individual results vary.</p>
        </div>
      </motion.section>

      {/* Founder — compact */}
      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 max-w-4xl items-start">
            <div className="w-20 h-20 rounded-full bg-ink flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/assets/images/founder.png"
                alt="Saswata S. Sengupta"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <span className="font-display text-display-md text-canvas hidden">S</span>
            </div>
            <div>
              <span className="text-label-xs text-mute uppercase tracking-wider">Founder</span>
              <h2 className="font-display text-heading-xl text-ink mt-1 leading-none">Saswata S. Sengupta</h2>
              <p className="text-body-md text-mute leading-relaxed mt-4 max-w-xl">
                Growth strategist and full-stack operator. Built growth systems for D2C e-commerce, B2B SaaS, and AI ventures — managing ad accounts spending crores per month, fixing checkout flows that recovered lakhs in lost revenue, and shipping AI automation from scratch.
              </p>
              <p className="text-body-md text-mute leading-relaxed mt-4 max-w-xl">
                MBA in Marketing &amp; Analytics (IIT Jodhpur). B.Tech in Mechanical Engineering. We run founder-led, with specialists deployed per project — no account layers, no overhead you don't need.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Flagship Services */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">What We Do</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">The growth stack, handled.</h2>
            <p className="text-body-md text-mute mt-4 max-w-xl mx-auto leading-relaxed">
              Nine service lines. Twenty specialists on call. One operating lead who owns the full picture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { id: 'ai-implementation', title: 'AI Implementation', tagline: 'Agents that run your repetitive work.', core: true },
              { id: 'strategy', title: 'Growth Strategy', tagline: 'The diagnosis before the prescription.', core: true },
              { id: 'website', title: 'Website & Dev', tagline: 'Conversion-first builds.', core: true },
              { id: 'ads', title: 'Ads', tagline: 'Full-funnel paid media.', core: true },
              { id: 'lead-systems', title: 'Lead Systems', tagline: 'Not just a form — a system.' },
              { id: 'cro', title: 'CRO', tagline: 'Structured experimentation.' },
              { id: 'ui-ux', title: 'UI/UX Design', tagline: 'Design that removes friction.' },
              { id: 'content-email', title: 'Content & Email', tagline: 'The organic engine.' },
              { id: 'analytics', title: 'Analytics', tagline: 'Own your data.' },
            ].map((service) => (
              <Link
                key={service.id}
                to={`/services#${service.id}`}
                className="group p-6 bg-canvas border border-hairline-soft hover:border-ink transition-all duration-300 no-underline flex items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-heading-md text-ink group-hover:text-mute transition-colors">{service.title}</h3>
                    {service.core && <span className="text-label-xs text-mute bg-soft-cloud px-2 py-0.5 rounded-full">Core</span>}
                  </div>
                  <p className="text-body-sm text-mute mt-1">{service.tagline}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-mute group-hover:text-ink transition-colors flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <a href="#full-bench" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors">
              See the full bench —20 specialists across 9 service lines <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* The Full Bench */}
      <motion.section id="full-bench" {...fadeUp} className="bg-ink py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-label-xs text-stone uppercase tracking-wider">The Full Bench</span>
            <h2 className="font-display text-display-md text-canvas mt-2 leading-none">
              A specialist for every<br />growth surface.
            </h2>
            <p className="text-body-md text-hairline mt-4 max-w-xl mx-auto leading-relaxed">
              One lead orchestrates. Twenty specialists deploy. You get depth without overhead.
            </p>
          </div>

          <motion.div {...staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Lightbulb,
                title: 'Strategy & Planning',
                flagship: ['Growth Consultant', 'Marketing Strategist'],
                all: ['GTM Engineer', 'Product Manager'],
              },
              {
                icon: Palette,
                title: 'Creative & Design',
                flagship: ['UI/UX Designer'],
                all: ['Graphic Designer', 'Video Editor', 'Copywriter', 'Motion Graphics Designer'],
              },
              {
                icon: Code2,
                title: 'Engineering & Tech',
                flagship: ['Web Developer', 'AI Automation Expert'],
                all: ['Solution Architect', 'Shopify Expert'],
              },
              {
                icon: Target,
                title: 'Marketing & Growth',
                flagship: ['Performance Marketer', 'SEO Specialist', 'CRO Specialist'],
                all: ['Email & Lifecycle Specialist', 'WhatsApp Commerce Specialist', 'Data & Analytics Analyst'],
              },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.title} {...staggerChild} className="p-5 bg-canvas/5 border border-stone/10">
                  <div className="w-10 h-10 rounded-full bg-canvas/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-canvas" />
                  </div>
                  <h3 className="text-heading-md text-canvas mb-3">{cat.title}</h3>
                  <ul className="space-y-1.5">
                    {cat.flagship.map((role) => (
                      <li key={role} className="text-body-sm text-canvas flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-canvas flex-shrink-0" />
                        {role}
                      </li>
                    ))}
                    {cat.all.map((role) => (
                      <li key={role} className="text-body-sm text-hairline flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-hairline/40 flex-shrink-0" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          <p className="text-caption-sm text-hairline/80 mt-8">
            Flagships marked with white dots. All roles deployed per project on a contract basis — no retainer bloat.
          </p>
        </div>
      </motion.section>

      {/* What We Don't Do */}
      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site text-center">
          <span className="text-label-xs text-mute uppercase tracking-wider">What We Don't Do</span>
          <h2 className="font-display text-display-md text-ink mt-2 leading-none">
            We pick a lane and<br />stay in it.
          </h2>
          <p className="text-body-md text-mute leading-relaxed mt-6 max-w-xl mx-auto">
            We don't do daily social media posting, influencer campaigns, PR, or 24/7 support tiers. What we do, we do thoroughly. What we don't do, we'll refer you to people who do it better.
          </p>
        </div>
      </motion.section>
    </>
  );
};

export default About;
