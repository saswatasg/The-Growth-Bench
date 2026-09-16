import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import HeroSection from '@/components/home/HeroSection';
import MarqueeBar from '@/components/home/MarqueeBar';
import ServicesOverview from '@/components/home/ServicesOverview';
import GrowthTimeline from '@/components/GrowthTimeline';
import ActivityProof from '@/components/ActivityProof';
import FitFilter from '@/components/FitFilter';
import { loadPosts } from '@/lib/blogUtils';
import { testimonialsData } from '@/data/testimonials';
import { fadeUp } from '@/lib/motion';

const Home = () => {
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
      <ActivityProof className="bg-ink" />
      <FitFilter className="bg-canvas" />

      <motion.section {...fadeUp} className="bg-soft-cloud py-[100px] md:py-[120px]">
        <div className="container-site max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-label-xs text-mute uppercase tracking-wider">Client Results</span>
            <h2 className="font-display text-display-md text-ink mt-2">Results that speak plainly.</h2>
          </div>

          <div className="relative h-[320px] md:h-[280px] mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-8 md:p-10 border border-hairline-soft bg-canvas max-w-2xl mx-auto absolute inset-x-0 top-0"
              >
                <span aria-hidden="true" className="font-display text-display-lg text-hairline leading-none absolute top-4 left-6 select-none">&ldquo;</span>
                <p className="text-body-md text-mute leading-relaxed mb-6 relative z-10">{testimonialsData[currentTestimonial].text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-caption-sm text-ink font-bold">{testimonialsData[currentTestimonial].name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-ink">{testimonialsData[currentTestimonial].name}</p>
                    <p className="text-caption-sm text-mute">{testimonialsData[currentTestimonial].title}</p>
                    {testimonialsData[currentTestimonial].metric && (
                      <span className="text-label-xs text-success">{testimonialsData[currentTestimonial].metric}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${
                  i === currentTestimonial ? 'bg-ink w-6' : 'bg-hairline hover:bg-mute/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {posts.length > 0 && (
        <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
          <div className="container-site">
            <div className="max-w-2xl mb-12">
              <span className="text-label-xs text-mute uppercase tracking-wider">Latest Insights</span>
              <h2 className="font-display text-display-md text-ink mt-2">Growth insights<br />that actually help.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <Link key={post.slug} to={`/resources/${post.slug}`} className="block p-6 border border-hairline-soft bg-canvas no-underline group h-full">
                  <span className="inline-block text-label-xs text-mute bg-soft-cloud px-3 py-1 rounded-full mb-3 uppercase">{post.category}</span>
                  <h3 className="text-heading-md text-ink mb-2 group-hover:text-mute transition-colors">{post.title}</h3>
                  <p className="text-body-sm text-mute leading-relaxed mb-3 line-clamp-2">{post.description}</p>
                  <p className="text-body-sm text-mute flex items-center gap-1">
                    Read the breakdown <ArrowRight className="w-3.5 h-3.5" />
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
      )}
    </>
  );
};

export default Home;
