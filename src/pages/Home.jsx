import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import HeroSection from '@/components/home/HeroSection';
import MarqueeBar from '@/components/home/MarqueeBar';
import ServicesOverview from '@/components/home/ServicesOverview';
import HowItWorks from '@/components/HowItWorks';
import FitFilter from '@/components/FitFilter';
import GrowthTimeline from '@/components/GrowthTimeline';
import ROICalculator from '@/components/ROICalculator';
import AsSeenIn from '@/components/AsSeenIn';
import ActivityProof from '@/components/ActivityProof';
import CtaPaths from '@/components/CtaPaths';
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
      setCurrentTestimonial(prev => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  return (
    <>
      <PageMeta />
      <HeroSection />
      <MarqueeBar />
      <ServicesOverview />
      <GrowthTimeline />
      <ROICalculator />
      <AsSeenIn className="bg-canvas dark:bg-ink" />

      <HowItWorks className="bg-soft-cloud dark:bg-charcoal" />

      <motion.section {...fadeIn} className="bg-ink dark:bg-canvas py-section-lg">
        <div className="container-site">
          <div className="text-center">
            <span className="text-label-xs text-stone dark:text-mute uppercase tracking-wider">By The Numbers</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              {[
                { num: '28.71%', label: 'Avg. conversion lift' },
                { num: '468%', label: 'Avg. ROAS' },
                { num: '2+ yrs', label: 'Avg. client tenure' },
                { num: '9', label: 'Growth capabilities' },
              ].map((s) => (
                <motion.div key={s.num} {...stagger} className="text-center md:border-r md:border-stone/20 dark:border-hairline-soft md:last:border-r-0">
                  <motion.span
                    className="font-display text-heading-xl md:text-display-lg text-canvas dark:text-ink leading-none block"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  >
                    {s.num}
                  </motion.span>
                  <div className="text-caption-md text-stone dark:text-mute mt-2">{s.label}</div>
                </motion.div>
              ))}
          </div>
          <p className="text-caption-sm text-stone/70 dark:text-mute/70 text-center mt-8">Representative outcomes across client engagements; individual results vary.</p>
        </div>
      </motion.section>

      <FitFilter className="bg-canvas dark:bg-ink" />
      <ActivityProof className="bg-soft-cloud dark:bg-charcoal" />

      <motion.section {...fadeUp} className="bg-soft-cloud dark:bg-charcoal py-section-lg border-b border-hairline-soft dark:border-ash">
        <div className="container-site max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider">What People Say</span>
            <h2 className="font-display text-display-md text-ink dark:text-canvas mt-2">Results that speak plainly.</h2>
          </div>

          <div className="relative min-h-[260px] md:min-h-[220px] mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-8 md:p-10 border border-hairline-soft dark:border-charcoal bg-canvas dark:bg-ink relative max-w-2xl mx-auto"
              >
                <span aria-hidden="true" className="font-display text-display-lg text-hairline dark:text-charcoal leading-none absolute top-4 left-6 select-none">&ldquo;</span>
                <p className="text-body-md text-mute dark:text-stone leading-relaxed mb-6 relative z-10">{testimonialsData[currentTestimonial].text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ink/10 dark:bg-canvas/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-caption-sm text-ink dark:text-canvas font-bold">{testimonialsData[currentTestimonial].name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-ink dark:text-canvas">{testimonialsData[currentTestimonial].name}</p>
                    <p className="text-caption-sm text-mute dark:text-stone">{testimonialsData[currentTestimonial].title}</p>
                    {testimonialsData[currentTestimonial].metric && (
                      <span className="text-label-xs text-success">{testimonialsData[currentTestimonial].metric}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mb-10">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 dark:focus-visible:ring-accent/40 ${
                  i === currentTestimonial ? 'bg-ink dark:bg-accent w-6' : 'bg-hairline dark:bg-charcoal hover:bg-mute/30 dark:hover:bg-ash w-2'
                }`}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-body-sm text-mute dark:text-stone mb-6">
              Ready to see what your business could do with a full growth partner?
            </p>
            <Button onClick={openBookingModal} size="lg">
              Book Your Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas dark:bg-ink py-section-lg">
        <div className="container-site">
          <div className="max-w-2xl mb-12">
            <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider">From The Bench</span>
            <h2 className="font-display text-display-md text-ink dark:text-canvas mt-2">Growth insights<br />that actually help.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.slug} to={`/insights/${post.slug}`} className="block p-6 border border-hairline-soft dark:border-charcoal bg-canvas dark:bg-charcoal no-underline group h-full">
                <span className="inline-block text-label-xs text-mute dark:text-stone bg-soft-cloud dark:bg-ink px-3 py-1 rounded-full mb-3 uppercase">{post.category}</span>
                <h3 className="text-heading-md text-ink dark:text-canvas mb-2 group-hover:text-mute dark:group-hover:text-stone transition-colors">{post.title}</h3>
                <p className="text-body-sm text-mute dark:text-stone leading-relaxed mb-3 line-clamp-2">{post.description}</p>
                <p className="text-body-sm text-mute dark:text-stone flex items-center gap-1">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/insights" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink dark:text-accent no-underline hover:text-mute dark:hover:text-accent/80 transition-colors">
              View all insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="bg-ink dark:bg-canvas py-section-lg text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas dark:text-ink leading-none mb-6">
            Start with a free<br />audit call.
          </h2>
          <p className="text-body-md text-stone dark:text-mute leading-relaxed mb-8 max-w-lg mx-auto">
            Book a free 30-minute call. We'll look at your funnel, give you one concrete recommendation, and tell you honestly if we can help. No pitch, no pressure.
          </p>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud dark:bg-ink dark:text-canvas dark:hover:bg-charcoal" onClick={openBookingModal}>
            Book Your Free Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-caption-md text-stone dark:text-mute mt-4">
            No retainer commitment. Cancel anytime.
          </p>
          <div className="mt-6">
            <CtaPaths tone="dark" />
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
