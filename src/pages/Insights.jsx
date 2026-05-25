import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { loadPosts } from '@/lib/blogUtils';
import { fadeUp, fadeIn } from '@/lib/motion';

const Insights = () => {
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

      <section className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">Insights</span>
            <h1 className="font-display text-display-md text-ink mt-2 leading-none">
              Frameworks. Teardowns.<br />Things that actually work.
            </h1>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-soft-cloud">
        <div className="container-site py-section-lg">
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                className={`px-5 py-2.5 text-button-sm rounded-full border transition-colors ${
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

      <motion.section {...fadeUp} className="bg-canvas py-section-lg">
        <div className="container-site">
          <h2 className="font-display text-display-md text-ink leading-none mb-8">Real results, same frameworks</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/case-studies" className="block p-6 border border-hairline-soft bg-canvas no-underline group">
              <div className="font-display text-display-md text-ink mb-2">$329K / month recovered</div>
              <p className="text-body-sm text-mute leading-relaxed mb-3">Complete cart & checkout flow redesign. Cut checkout abandonment by 26%, lifted mobile conversion by 47%.</p>
              <span className="text-body-sm text-ink flex items-center gap-1">See case study <ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
            </Link>
            <Link to="/case-studies" className="block p-6 border border-hairline-soft bg-canvas no-underline group">
              <div className="font-display text-display-md text-ink mb-2">5.7x ROAS (from 1.8x)</div>
              <p className="text-body-sm text-mute leading-relaxed mb-3">Full-funnel rebuild for a D2C coffee brand. Website redesign, analytics infrastructure, and high-converting ad campaigns.</p>
              <span className="text-body-sm text-ink flex items-center gap-1">See case study <ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Insights;
