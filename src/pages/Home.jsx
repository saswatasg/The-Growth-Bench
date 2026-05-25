import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Search, Users, Zap, BarChart3, TrendingUp, Code2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import HeroSection from '@/components/home/HeroSection';
import MarqueeBar from '@/components/home/MarqueeBar';
import { loadPosts } from '@/lib/blogUtils';
import { useBookingModal } from '@/context/BookingModalContext';
import { testimonialsData } from '@/data/testimonials';
import { fadeUp, fadeIn, stagger } from '@/lib/motion';

const Home = () => {
  const { openBookingModal } = useBookingModal();
  const [posts, setPosts] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentTestimonial]);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  return (
    <>
      <PageMeta />
      <HeroSection />
      <MarqueeBar />

      <motion.section {...fadeUp} className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-2xl mb-12">
            <span className="text-label-xs text-mute uppercase tracking-wider">The Gap</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">
              Most growing brands<br />are stuck between<br />two bad options.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            <div className="p-6 border border-hairline-soft bg-canvas flex flex-col">
              <span className="text-label-xs text-sale uppercase tracking-wider mb-2">Freelancer</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Good people, limited scope. No systems, no strategy ownership. You outgrow them fast.</p>
              <div className="mt-4 pt-4 border-t border-hairline-soft text-body-sm text-sale font-medium">
                No full funnel view
              </div>
            </div>

            <div className="p-6 border-2 border-ink bg-canvas flex flex-col relative">
              <div className="absolute -top-3 left-6 bg-ink text-canvas text-label-xs uppercase tracking-wider px-4 py-1.5 rounded-full">Best of both</div>
              <span className="text-label-xs text-ink uppercase tracking-wider mt-2 mb-2">The Growth Bench</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">One senior partner who owns the full picture. Specialists on demand. Depth without overhead.</p>
              <div className="mt-4 pt-4 border-t border-ink/10 space-y-2">
                {['One partner, full context', 'Specialists on demand', 'No middlemen'].map(item => (
                  <div key={item} className="text-body-sm text-ink flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border border-hairline-soft bg-canvas flex flex-col">
              <span className="text-label-xs text-sale uppercase tracking-wider mb-2">Agency</span>
              <p className="text-body-sm text-mute leading-relaxed flex-grow">Expensive retainers, slow onboarding, layers between you and the people doing the work.</p>
              <div className="mt-4 pt-4 border-t border-hairline-soft text-body-sm text-sale font-medium">
                Paying for what you don't use
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-soft-cloud py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-2xl mb-12">
            <span className="text-label-xs text-mute uppercase tracking-wider">How It Works</span>
            <h2 className="font-display text-display-md text-ink mt-2 leading-none">One partner.<br />The right team.<br />No layers.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start max-w-4xl">
            {[
              { icon: Search, title: 'Diagnosis', desc: 'Free audit call to understand your funnel' },
              { icon: Users, title: 'Team Assembly', desc: 'Right specialists for what you need' },
              { icon: Zap, title: 'Execute & Iterate', desc: 'Weekly check-ins, continuous improvement' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-canvas border border-hairline-soft flex items-center justify-center flex-shrink-0">
                    <span className="text-body-sm font-bold text-mute">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-heading-md text-ink">{step.title}</h3>
                    <p className="text-body-sm text-mute mt-1">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-body-sm text-mute max-w-2xl mt-10 leading-relaxed">
            Every engagement is led by the founder — one person with complete context on your business.
            Specialist bench members are brought in based on what the work actually needs. No account managers, no briefing layers.
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="bg-ink py-section-lg">
        <div className="container-site">
          <div className="text-center">
            <span className="text-label-xs text-stone uppercase tracking-wider">By The Numbers</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              {[
                { num: '28.71%', label: 'Avg. conversion lift' },
                { num: '468%', label: 'Avg. ROAS' },
                { num: '2+ yrs', label: 'Avg. client tenure' },
                { num: '8', label: 'Growth capabilities' },
              ].map((s) => (
                <motion.div key={s.num} {...stagger} className="text-center border-r border-stone/20 last:border-r-0">
                  <motion.span
                    className="font-display text-display-lg text-canvas leading-none block"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  >
                    {s.num}
                  </motion.span>
                  <div className="text-caption-md text-stone mt-2">{s.label}</div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <span className="text-label-xs text-success uppercase tracking-wider mb-3 block">Good fit</span>
              <ul className="space-y-3">
                {[
                  "D2C brand doing ₹10L–₹10Cr/month with inconsistent growth",
                  "Tried agencies or freelancers — something always falls through",
                  "Want one partner who understands your entire funnel",
                  "Building from scratch and need systems, not just execution",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-mute">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-label-xs text-sale uppercase tracking-wider mb-3 block">Not the right fit</span>
              <ul className="space-y-3">
                {[
                  "Need daily social media posting or community management",
                  "Want cheapest execution with no strategic input",
                  "Brief changes weekly, not ready to commit to direction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-mute">
                    <span className="text-sale mt-0.5 flex-shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-soft-cloud py-section-lg border-b border-hairline-soft">
        <div className="container-site max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-label-xs text-mute uppercase tracking-wider">What People Say</span>
            <h2 className="font-display text-display-md text-ink mt-2">Results that speak plainly.</h2>
          </div>

          <div className="relative min-h-[180px] mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-8 md:p-10 border border-hairline-soft bg-canvas relative max-w-2xl mx-auto"
              >
                <span className="font-display text-display-lg text-hairline leading-none absolute top-4 left-6 select-none">&ldquo;</span>
                <p className="text-body-md text-mute leading-relaxed mb-6 relative z-10">{testimonialsData[currentTestimonial].text}</p>
                <p className="text-body-sm font-medium text-ink">— {testimonialsData[currentTestimonial].name}</p>
                <p className="text-caption-sm text-mute">{testimonialsData[currentTestimonial].title}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mb-10">
            {testimonialsData.slice(0, 2).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentTestimonial ? 'bg-ink w-6' : 'bg-hairline hover:bg-mute/30'
                }`}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-body-sm text-mute mb-6">
              Ready to see what your business could do with a full growth partner?
            </p>
            <Button onClick={openBookingModal} size="lg">
              Book Your Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas py-section-lg">
        <div className="container-site">
          <div className="max-w-2xl mb-12">
            <span className="text-label-xs text-mute uppercase tracking-wider">From The Bench</span>
            <h2 className="font-display text-display-md text-ink mt-2">Growth insights<br />that actually help.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.slug} to={`/insights/${post.slug}`} className="block p-6 border border-hairline-soft bg-canvas no-underline group h-full">
                <span className="inline-block text-label-xs text-mute bg-soft-cloud px-3 py-1 rounded-full mb-3 uppercase">{post.category}</span>
                <h3 className="text-heading-md text-ink mb-3 group-hover:text-mute transition-colors">{post.title}</h3>
                <p className="text-body-sm text-ink flex items-center gap-1">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/insights" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors">
              View all insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="bg-ink py-section-lg text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas leading-none mb-6">
            Start with a free<br />audit call.
          </h2>
          <p className="text-body-md text-stone leading-relaxed mb-8 max-w-lg mx-auto">
            Book a free 30-minute call. We'll look at your funnel, give you one concrete recommendation, and tell you honestly if we can help. No pitch, no pressure.
          </p>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
            Book Your Free Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-caption-md text-stone mt-4">
            No retainer commitment. Cancel anytime.
          </p>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
