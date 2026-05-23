import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Search, Users, Zap } from 'lucide-react';
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

const Dash = () => <span className="w-6 h-px bg-primary inline-block mx-3 align-middle" />;

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

      {/* The Gap — Comparison Cards */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...stagger} className="text-center mb-10">
            <div className="section-eyebrow justify-center">THE GROWTH GAP</div>
            <h2 className="max-w-2xl mx-auto">Most growing brands are stuck between two bad options.</h2>
            <p className="text-body text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              Freelancers max out. Agencies layer up. Neither gives you what you actually need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch mb-8">
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0 }} className="card-standard flex flex-col relative border-t-2 border-t-red-300">
              <h3 className="text-base font-display font-bold mb-1 text-red-500">Freelancer</h3>
              <p className="text-xs text-body leading-relaxed flex-grow">Good people, limited scope. No systems, no strategy ownership. You outgrow them fast.</p>
              <div className="mt-3 pt-3 border-t border-border text-xs text-red-400 font-medium">
                No full funnel view
              </div>
            </motion.div>

            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.1 }}>
              <div className="card-standard flex flex-col relative border-t-4 border-t-primary shadow-md">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">Best of both</div>
                <h3 className="text-base font-display font-bold mb-1 mt-2 text-primary">The Growth Bench</h3>
                <p className="text-xs text-body leading-relaxed flex-grow">One senior partner who owns the full picture. Specialists on demand. Depth without overhead.</p>
                <div className="mt-3 pt-3 border-t border-primary/20 space-y-1">
                  {['One partner, full context', 'Specialists on demand', 'No middlemen'].map(item => (
                    <div key={item} className="text-xs text-primary font-medium flex items-center gap-1.5">
                      <Check className="w-3 h-3" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.2 }} className="card-standard flex flex-col relative border-t-2 border-t-red-300">
              <h3 className="text-base font-display font-bold mb-1 text-red-500">Agency</h3>
              <p className="text-xs text-body leading-relaxed flex-grow">Expensive retainers, slow onboarding, layers between you and the people doing the work.</p>
              <div className="mt-3 pt-3 border-t border-border text-xs text-red-400 font-medium">
                Paying for what you don't use
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServicesOverview />

      {/* How We Work — visual flow */}
      <section className="section-mid">
        <div className="container-site">
          <motion.div {...stagger} className="text-center mb-12">
            <div className="section-eyebrow justify-center">HOW IT WORKS</div>
            <h2 className="max-w-xl mx-auto">One partner. The right team. No layers.</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-8 md:p-10 bg-white rounded-xl border border-border mb-8 shadow-sm max-w-4xl mx-auto">
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0 }} className="text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-3">
                <Search className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-semibold">Diagnosis</p>
              <p className="text-xs text-muted-foreground">Free audit call</p>
            </motion.div>
            <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block flex-shrink-0" />
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.1 }} className="text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-semibold">Team Assembly</p>
              <p className="text-xs text-muted-foreground">Right specialists</p>
            </motion.div>
            <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block flex-shrink-0" />
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0.2 }} className="text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-accent-teal/10 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-7 h-7 text-accent-teal" />
              </div>
              <p className="text-sm font-semibold">Execute & Iterate</p>
              <p className="text-xs text-muted-foreground">Weekly check-ins</p>
            </motion.div>
          </div>

          <motion.div {...stagger} className="text-center">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every engagement is led by the founder — one person with complete context on your business.
              Specialist bench members are brought in based on what the work actually needs. No account managers, no briefing layers.
            </p>
          </motion.div>
        </div>
      </section>

      <StatRow />

      {/* Who We Serve */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...stagger} className="text-center mb-10">
            <div className="section-eyebrow justify-center">WHO WE SERVE</div>
            <h2 className="max-w-xl mx-auto">Built for founders who are done guessing.</h2>
            <p className="text-body text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              D2C brands and early-stage startups where the founder is still in the room.
              People who want a partner that thinks like an owner, not a vendor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div {...stagger} transition={{ ...stagger.transition, delay: 0 }}>
              <h3 className="font-display font-bold text-sm mb-4 text-primary flex items-center gap-2">
                <Check className="w-4 h-4" /> Good fit
              </h3>
              <ul className="space-y-3">
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
              <ul className="space-y-3">
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

      {/* Testimonials */}
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
          <motion.div {...stagger} className="text-center mb-12">
            <div className="section-eyebrow justify-center">WHAT PEOPLE SAY</div>
            <h2>Results that speak plainly.</h2>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            {testimonialsData.slice(0, 2).map((t, i) => (
              <div key={i} className="card-standard relative">
                <span className="absolute top-4 right-6 text-7xl font-display font-bold text-primary/10">&ldquo;</span>
                <p className="text-body italic leading-relaxed mb-4">{t.text}</p>
                <p className="text-sm font-semibold text-dark">— {t.name}, {t.title}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...stagger} className="text-center">
            <p className="text-sm text-muted-foreground">
              Ready to see what your business could do with a full growth partner?{' '}
              <button onClick={openBookingModal} className="text-primary font-medium underline underline-offset-2">Book your free audit call.</button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* From the Blog */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...stagger} className="text-center mb-10">
            <div className="section-eyebrow justify-center">FROM THE BENCH</div>
            <h2>Growth insights that actually help.</h2>
            <p className="text-body text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              Real frameworks, real teardowns, real numbers. No fluff.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {posts.slice(0, 3).map((post, i) => (
              <motion.div key={post.slug} {...stagger} transition={{ ...stagger.transition, delay: i * 0.1 }}>
                <Link to={`/insights/${post.slug}`} className="card-standard block no-underline group h-full">
                  <span className="tag tag-green mb-3 self-start inline-block">{post.category}</span>
                  <h3 className="font-display font-bold text-base mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
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
