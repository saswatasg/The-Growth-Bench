import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Sparkles, Search, Users, Zap, Target, Globe, Code2, Palette, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import HeroSection from '@/components/home/HeroSection';
import StatRow from '@/components/home/StatRow';
import ServicesOverview from '@/components/home/ServicesOverview';
import { Magnetic } from '@/components/Magnetic';
import { loadPosts } from '@/lib/blogUtils';
import { useBookingModal } from '@/context/BookingModalContext';
import { testimonialsData } from '@/data/testimonials';

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const Home = () => {
  const { openBookingModal } = useBookingModal();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  return (
    <>
      <PageMeta />

      <HeroSection />

      {/* The Gap — simplified to just 3 cards */}
      <section className="section-mid">
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">THE GAP IN THE MARKET</div>
            <h2 className="max-w-2xl mb-8">Most growing brands are stuck between two bad options.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch mb-8">
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0 }} className="card-standard flex flex-col relative border-t-2 border-t-red-300">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><path d="M12 20V10M12 10L8 14M12 10L16 14"/><circle cx="12" cy="12" r="9"/></svg>
              </div>
              <h3 className="text-base font-display font-bold mb-1">Freelancer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-grow">Good people, limited scope. No systems, no strategy ownership. You outgrow them fast.</p>
              <div className="mt-3 pt-3 border-t border-border text-xs text-red-400 font-medium">
                No full funnel view
              </div>
            </motion.div>

            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.1 }} className="card-accent-top flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Best of both</div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mt-2">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-display font-bold mb-1">The Growth Bench</h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-grow">One senior partner who owns the full picture. Specialists on demand. Depth without overhead.</p>
              <div className="mt-3 pt-3 border-t border-primary/20 space-y-1">
                {['One partner, full context', 'Specialists on demand', 'No middlemen'].map(item => (
                  <div key={item} className="text-xs text-primary font-medium flex items-center gap-1.5">
                    <Check className="w-3 h-3" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.2 }} className="card-standard flex flex-col relative border-t-2 border-t-red-300">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <h3 className="text-base font-display font-bold mb-1">Agency</h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-grow">Expensive retainers, slow onboarding, layers between you and the people doing the work.</p>
              <div className="mt-3 pt-3 border-t border-border text-xs text-red-400 font-medium">
                Paying for what you don't use
              </div>
            </motion.div>
          </div>

          <motion.div {...stagger} className="text-center">
            <p className="text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary inline-block mr-2" />
              The Growth Bench lives in the gap. Senior-led. Specialist-backed. One point of contact with full-stack capability.
            </p>
          </motion.div>
        </div>
      </section>

      <ServicesOverview />

      {/* How We Work — visual flow */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">HOW IT WORKS</div>
            <h2 className="max-w-xl mb-10">One partner. The right team. No layers.</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-8 bg-white rounded-xl border border-border mb-8">
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-2">
                <Search className="w-7 h-7 text-primary" />
              </div>
              <p className="text-xs font-semibold max-w-[100px]">Diagnosis</p>
              <p className="text-[10px] text-muted-foreground">Free audit call</p>
            </motion.div>
            <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block flex-shrink-0" />
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.1 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-2">
                <Users className="w-7 h-7 text-white" />
              </div>
              <p className="text-xs font-semibold max-w-[100px]">Team Assembly</p>
              <p className="text-[10px] text-muted-foreground">Right specialists</p>
            </motion.div>
            <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block flex-shrink-0" />
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.2 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-teal/10 flex items-center justify-center mx-auto mb-2">
                <Zap className="w-7 h-7 text-accent-teal" />
              </div>
              <p className="text-xs font-semibold max-w-[100px]">Execute & Iterate</p>
              <p className="text-[10px] text-muted-foreground">Weekly check-ins</p>
            </motion.div>
          </div>

          <motion.div {...stagger} className="text-center">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Every engagement is led by the founder — one person with complete context on your business.
              Specialist bench members are brought in based on what the work actually needs. No account managers, no briefing layers.
            </p>
          </motion.div>
        </div>
      </section>

      <StatRow />

      {/* Who We Serve */}
      <section className="section-mid">
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">WHO WE SERVE</div>
            <h2 className="max-w-xl mb-6">Built for founders who are done guessing.</h2>
            <p className="text-body text-lg max-w-2xl leading-relaxed mb-10">
              D2C brands and early-stage startups where the founder is still in the room.
              People who want a partner that thinks like an owner, not a vendor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0 }}>
              <h3 className="font-display font-bold text-sm mb-4 text-primary flex items-center gap-2">
                <Check className="w-4 h-4" /> Good fit
              </h3>
              <ul className="space-y-2.5">
                {[
                  "D2C brand doing ₹10L–₹10Cr/month with inconsistent growth",
                  "Tried agencies or freelancers — something always falls through",
                  "Want one partner who understands your entire funnel",
                  "Building from scratch and need systems, not just execution",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-body">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.1 }}>
              <h3 className="font-display font-bold text-sm mb-4 text-muted-foreground flex items-center gap-2">
                <X className="w-4 h-4" /> Not the right fit
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Need daily social media posting or community management",
                  "Want cheapest execution with no strategic input",
                  "Brief changes weekly, not ready to commit to direction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* From the Blog */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">FROM THE BLOG</div>
            <h2 className="mb-4">Growth insights that actually help.</h2>
            <p className="text-body text-lg max-w-2xl leading-relaxed mb-10">
              Real frameworks, real teardowns, real numbers. No fluff.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post, i) => (
              <motion.div key={post.slug} {...stagger} transition={{ ...stagger.transition, delay: i * 0.1 }}>
                <Link to={`/insights/${post.slug}`} className="card-standard block no-underline group h-full">
                  <span className="tag tag-green mb-3 self-start">{post.category}</span>
                  <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-primary font-medium flex items-center gap-1">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div {...stagger} className="text-center mt-10">
            <Link to="/insights" className="btn-ghost no-underline">View all insights <ArrowRight className="w-4 h-4 ml-2 inline" /></Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials + Final CTA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": testimonialsData.map((t, i) => ({
          "@type": "Review",
          "position": i + 1,
          "itemReviewed": { "@type": "Organization", "name": "The Growth Bench" },
          "reviewRating": { "@type": "Rating", "ratingValue": 5 },
          "author": { "@type": "Person", "name": t.name },
          "reviewBody": t.text
        }))
      })}} />
      <section className="section-mid">
        <div className="container-site">
          <motion.div {...stagger}>
            <div className="section-eyebrow">WHAT PEOPLE SAY</div>
            <h2 className="mb-12">Results that speak plainly.</h2>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-2 gap-6 mb-16">
            {testimonialsData.slice(0, 2).map((t, i) => (
              <div key={i} className="card-standard relative">
                <span className="absolute top-4 right-6 text-7xl font-display font-bold text-primary/10">&ldquo;</span>
                <p className="text-body italic leading-relaxed mb-4">{t.text}</p>
                <p className="text-sm font-semibold text-dark">— {t.name}, {t.title}</p>
              </div>
            ))}
          </motion.div>

          <motion.p className="text-sm text-center text-muted-foreground mt-8">
            Ready to see what your business could do with a full growth partner?{' '}
            <button onClick={openBookingModal} className="text-primary font-medium underline underline-offset-2">Book your free audit call.</button>
          </motion.p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-dark">
        <div className="container-site text-center">
          <motion.div {...stagger}>
            <h2 className="text-white mb-4">Start with a free audit call.</h2>
            <p className="text-faint text-lg max-w-lg mx-auto leading-relaxed mb-8">
              Book a free 30-minute call. We'll look at your funnel, give you one concrete recommendation, and tell you honestly if we can help. No pitch, no pressure.
            </p>
            <Magnetic strength={0.4}>
              <Button size="lg" className="shadow-green text-base px-9 py-4" onClick={openBookingModal}>
                Book Your Free Call <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Magnetic>
            <p className="text-sm text-white/40 mt-4">
              No retainer commitment required. <span className="text-white/60 font-medium">Cancel anytime.</span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
