import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Users, Zap, Heart, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';
import { fadeUp, fadeIn } from '@/lib/motion';

const About = () => {
  const { openBookingModal } = useBookingModal();
  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">About</span>
            <h1 className="font-display text-display-md text-ink mt-2 leading-none">
              We're not an agency.<br />We're the growth partner<br />you actually wanted.
            </h1>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-canvas py-section-lg border-b border-hairline-soft">
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
          </div>

          <div className="grid grid-cols-3 gap-5 mt-12 items-stretch">
            <div className="p-5 border border-hairline-soft bg-soft-cloud flex flex-col">
              <span className="text-label-xs text-sale uppercase tracking-wider mb-2">Freelancer</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Good people, limited scope. No systems, no strategy ownership.</p>
              <div className="mt-3 pt-3 border-t border-hairline-soft text-body-sm text-sale font-medium">No full funnel view</div>
            </div>
            <div className="p-5 border-2 border-ink bg-canvas flex flex-col relative">
              <div className="absolute -top-3 left-5 bg-ink text-canvas text-label-xs uppercase tracking-wider px-4 py-1.5 rounded-full">The Bench</div>
              <span className="text-label-xs text-ink uppercase tracking-wider mt-2 mb-2">One partner + specialists</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Senior partner who owns the full picture. Specialists on demand. No overhead.</p>
              <div className="mt-3 pt-3 border-t border-ink/10 text-body-sm text-ink font-medium">Full context, no layers</div>
            </div>
            <div className="p-5 border border-hairline-soft bg-soft-cloud flex flex-col">
              <span className="text-label-xs text-sale uppercase tracking-wider mb-2">Agency</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Expensive retainers, slow onboarding, layers between you and the work.</p>
              <div className="mt-3 pt-3 border-t border-hairline-soft text-body-sm text-sale font-medium">Paying for what you don't use</div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-soft-cloud py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <span className="text-label-xs text-mute uppercase tracking-wider">How the Bench Works</span>
          <h2 className="font-display text-display-md text-ink mt-2 leading-none max-w-2xl">One senior partner. Specialists on demand. No middlemen.</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-4xl">
            {[
              { num: '01', icon: Users, title: 'You (Founder)', desc: 'Direct line to the person doing the work. No account managers, no briefings.' },
              { num: '02', icon: Search, title: 'Growth Bench Lead', desc: 'One senior partner with complete context on your business. Leads every engagement.' },
              { num: '03', icon: Zap, title: 'Bench Specialists', desc: 'Brought in as needed — CRO, ads, web dev, design. Agency depth without retainer overhead.' },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center flex-shrink-0">
                    <span className="text-caption-sm text-canvas font-bold">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-heading-md text-ink">{step.title}</h3>
                    <p className="text-body-sm text-mute mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <span className="text-label-xs text-mute uppercase tracking-wider">How We Think</span>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
            {[
              { num: '01', title: 'Diagnosis before prescription.', body: "We don't recommend a channel until we understand the business. Every engagement starts with a thorough audit." },
              { num: '02', title: 'Owners, not vendors.', body: "We ask the questions a founder would ask. We'd rather delay a campaign by a week and get it right." },
              { num: '03', title: 'Speed through clarity.', body: 'Most delays come from unclear direction, not slow execution. We invest time upfront so everyone knows what we\'re building.' },
              { num: '04', title: 'Honest over impressive.', body: "We'd rather tell you something uncomfortable early than send a polished slide that turns out to be wrong." },
            ].map((p) => (
              <div key={p.num}>
                <span className="text-label-xs text-mute font-mono">{p.num}</span>
                <h3 className="font-display text-display-md text-ink leading-none mt-1">{p.title}</h3>
                <p className="text-body-sm text-mute mt-3 leading-relaxed max-w-md">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="bg-ink py-section-lg">
        <div className="container-site text-center">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { stat: '28.71%', label: 'Add-to-cart lift via CRO' },
              { stat: '468%', label: 'Avg. ROAS' },
              { stat: '2+ yrs', label: 'Building growth systems' },
            ].map((s) => (
              <div key={s.stat}>
                <motion.span
                  className="font-display text-display-lg text-canvas leading-none block"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                  {s.stat}
                </motion.span>
                <div className="text-caption-md text-stone mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 max-w-4xl items-start">
            <div className="w-20 h-20 rounded-full bg-ink flex items-center justify-center flex-shrink-0">
              <span className="font-display text-display-md text-canvas">S</span>
            </div>
            <div>
              <span className="text-label-xs text-mute uppercase tracking-wider">The Founder</span>
              <h2 className="font-display text-display-md text-ink mt-1 leading-none">Saswata Sengupta</h2>
              <p className="text-body-md text-mute leading-relaxed mt-4 max-w-xl">
                I started The Growth Bench after years inside D2C e-commerce (a US furniture brand), B2B SaaS (a GST compliance platform), and product discovery (an AI venture studio). I've managed ad accounts spending crores per month, fixed checkout flows that recovered lakhs in lost revenue, and built growth systems for brands that started with nothing but a Shopify store.
              </p>
              <p className="text-body-md text-mute leading-relaxed mt-4 max-w-xl">
                What I learned is that most brands don't need a bigger agency or a cheaper freelancer. They need one person who owns the full picture — with the right specialists on call when the work demands it.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <a href="mailto:hi@saswatasg.com" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-ink text-canvas text-button-sm no-underline hover:bg-ink/90 transition-colors">
                  <Mail className="w-4 h-4" /> Email Saswata
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-hairline text-mute text-button-sm no-underline hover:bg-soft-cloud hover:text-ink transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <Button size="sm" variant="secondary" onClick={openBookingModal}>Book a Call</Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-soft-cloud py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            <div>
              <span className="text-label-xs text-mute uppercase tracking-wider">What We Don't Do</span>
              <p className="text-body-md text-mute leading-relaxed mt-4">
                We don't do daily social media posting, influencer campaigns, PR, or 24/7 support tiers. What we do, we do thoroughly. What we don't do, we'll refer you to people who do it better.
              </p>
            </div>
            <div>
              <h3 className="text-heading-md text-ink mb-4">The full bench</h3>
              <div className="flex flex-wrap gap-2">
                {['Product Manager', 'UI/UX Designer', 'SEO Specialist', 'Growth Consultant', 'Web Developer', 'Video Editor', 'Performance Marketer', 'CRO Specialist', 'AI Consultant'].map((role) => (
                  <span key={role} className="text-body-sm text-mute bg-canvas border border-hairline-soft px-3 py-1.5 rounded-full">{role}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="bg-ink py-section-lg text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas leading-none mb-6">
            Sound like what<br />you've been looking for?
          </h2>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
            Book a 30-Minute Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-caption-md text-stone italic mt-4">
            We'll tell you in the first 10 minutes if we're the right fit.
          </p>
        </div>
      </motion.section>
    </>
  );
};

export default About;
