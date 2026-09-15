import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { loadPosts } from '@/lib/blogUtils';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp, fadeIn } from '@/lib/motion';

const Insights = () => {
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

      <section className="bg-canvas py-[100px] md:py-[120px]">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">Insights</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
              Frameworks. Teardowns.<br />Things that actually work.
            </h1>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-soft-cloud">
        <div className="container-site py-[80px] md:py-[100px]">
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
                <Link key={post.slug} to={`/insights/${post.slug}`} className="block p-6 border border-hairline-soft bg-canvas no-underline group h-full flex flex-col">
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

      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <div className="p-6 md:p-8 border-2 border-ink bg-canvas max-w-4xl flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-grow">
              <span className="text-label-xs text-mute uppercase tracking-wider">AI Scorecard</span>
              <h2 className="font-display text-display-md text-ink mt-2 leading-none">How automatable is your store?</h2>
              <p className="text-body-sm text-mute mt-3 leading-relaxed max-w-xl">
                60 seconds, instant readout — recoverable hours, a ₹ range, and exactly where to start.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-shrink-0">
              <Link to="/ai-scorecard" className="inline-flex items-center gap-1 text-body-sm font-medium text-ink no-underline hover:text-mute transition-colors flex-shrink-0">
                Take the scorecard <ArrowRight className="w-4 h-4" />
              </Link>
              <button onClick={openBookingModal} className="inline-flex items-center gap-1 text-body-sm font-medium text-mute no-underline hover:text-ink transition-colors flex-shrink-0">
                Book a free audit call <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="bg-canvas py-[80px] md:py-[100px]">
        <div className="container-site">
          <h2 className="font-display text-display-md text-ink leading-none mb-8">Real results, same frameworks</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/insights/we-fixed-checkout-flow-recovered-2-89-crore-month" className="block p-6 border border-hairline-soft bg-canvas no-underline group">
              <div className="font-display text-display-md text-ink mb-2">₹3.5 Cr / month recovered</div>
              <p className="text-body-sm text-mute leading-relaxed mb-3">In a 22-day A/B test, checkout abandonment fell from 73.1% to 53.9% — a 26% relative drop — with a 28.71% lift in add-to-cart rate.</p>
              <span className="text-body-sm text-ink flex items-center gap-1">Read the teardown <ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
            </Link>
            <Link to="/case-studies" className="block p-6 border border-hairline-soft bg-canvas no-underline group">
              <div className="font-display text-display-md text-ink mb-2">357% revenue growth in 3 months</div>
              <p className="text-body-sm text-mute leading-relaxed mb-3">Early-win snapshot (full teardown pending) for a D2C coffee brand — website revamp, precise tracking, and high-converting ad campaigns. ROAS went from 1.8x to 5.7x.</p>
              <span className="text-body-sm text-ink flex items-center gap-1">See case study <ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Insights;
