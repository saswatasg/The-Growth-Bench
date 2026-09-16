import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { loadPosts } from '@/lib/blogUtils';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp, fadeIn } from '@/lib/motion';

const Resources = () => {
  const { openBookingModal } = useBookingModal();
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];
  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageMeta />

      {/* Hero */}
      <section className="bg-canvas py-[100px] md:py-[120px]">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">Resources</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
              Frameworks. Teardowns.<br />Things that actually work.
            </h1>
            <p className="text-body-md text-mute mt-6 max-w-xl leading-relaxed">
              Blog posts, scorecards, and practical guides from the bench.
            </p>
          </div>
        </div>
      </section>

      {/* Scorecards — full-width black banner */}
      <section className="bg-ink py-[60px] md:py-[80px]">
        <div className="container-site">
          <div className="max-w-2xl mb-8">
            <span className="text-label-xs text-stone uppercase tracking-wider">Free tools</span>
            <h2 className="font-display text-display-md text-canvas mt-2 leading-none">Not ready to talk?<br />Take a free scorecard.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/ai-scorecard"
              className="group p-6 md:p-8 border border-stone/20 bg-ink hover:border-canvas transition-colors no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-canvas/10 flex items-center justify-center mb-4">
                <Workflow className="w-5 h-5 text-canvas" />
              </div>
              <h3 className="font-display text-heading-xl text-canvas leading-none">AI Readiness Scorecard</h3>
              <p className="text-body-sm text-stone mt-3 leading-relaxed">
                60 seconds, instant readout — recoverable hours, a ₹ range, and exactly where to start.
              </p>
              <span className="text-body-sm text-canvas mt-4 flex items-center gap-1 font-medium">
                Take the quiz <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              to="/growth-scorecard"
              className="group p-6 md:p-8 border border-stone/20 bg-ink hover:border-canvas transition-colors no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-canvas/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-canvas" />
              </div>
              <h3 className="font-display text-heading-xl text-canvas leading-none">Growth Audit Scorecard</h3>
              <p className="text-body-sm text-stone mt-3 leading-relaxed">
                Diagnose your funnel health — acquisition, conversion, retention, analytics. Get a prioritised fix list.
              </p>
              <span className="text-body-sm text-canvas mt-4 flex items-center gap-1 font-medium">
                Take the quiz <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog posts */}
      <motion.section {...fadeUp} className="bg-soft-cloud">
        <div className="container-site py-[80px] md:py-[100px]">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">Latest insights</span>
            <div className="flex-1 h-px bg-hairline" />
          </div>
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                aria-pressed={activeCategory === cat}
                className={`px-5 py-3 text-button-sm rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${
                  activeCategory === cat
                    ? 'bg-ink text-canvas border-ink'
                    : 'bg-canvas text-mute border-hairline hover:border-ink hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link key={post.slug} to={`/resources/${post.slug}`} className="block p-6 border border-hairline-soft bg-canvas no-underline group h-full flex flex-col">
                  <span className="inline-block text-label-xs text-mute bg-soft-cloud px-3 py-1 rounded-full mb-3 self-start uppercase">{post.category}</span>
                  <h3 className="text-heading-md text-ink mb-2 group-hover:text-mute transition-colors">{post.title}</h3>
                  <p className="text-body-sm text-mute leading-relaxed mb-4 flex-grow">{post.description}</p>
                  <div className="flex items-center justify-between text-caption-sm text-mute">
                    <span>{post.date}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <span className="text-body-sm text-ink flex items-center gap-1 mt-3">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-body-sm text-mute py-16">No posts in this category yet.</p>
          )}
        </div>
      </motion.section>

      {/* Results callout */}
      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">Real results</span>
            <div className="flex-1 h-px bg-hairline-soft" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/resources/we-fixed-checkout-flow-recovered-2-89-crore-month" className="block p-6 border border-hairline-soft bg-canvas no-underline group">
              <div className="font-display text-display-md text-ink mb-2">₹3.5 Cr / month recovered</div>
              <p className="text-body-sm text-mute leading-relaxed mb-3">In a 22-day A/B test, checkout abandonment fell from 73.1% to 53.9% — a 26% relative drop — with a 47% mobile conversion lift (1.2% → 1.76%).</p>
              <span className="text-body-sm text-ink flex items-center gap-1">Read the teardown <ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
            </Link>
            <Link to="/proof" className="block p-6 border border-hairline-soft bg-canvas no-underline group">
              <div className="font-display text-display-md text-ink mb-2">357% revenue growth in 3 months</div>
              <p className="text-body-sm text-mute leading-relaxed mb-3">Early-win snapshot for a D2C coffee brand — website revamp, precise tracking, and high-converting ad campaigns. ROAS went from 1.8x to 5.7x.</p>
              <span className="text-body-sm text-ink flex items-center gap-1">See case study <ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Bottom CTA — full-width black */}
      <motion.section {...fadeIn} className="bg-ink py-[100px] md:py-[120px] text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas leading-none mb-6">
            Ready to put these<br />insights to work?
          </h2>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
            Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.section>
    </>
  );
};

export default Resources;
