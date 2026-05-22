import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { loadPosts } from '@/lib/blogUtils';

const Insights = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageMeta />

      {/* Hero */}
      <section className="section-light pt-20 text-center">
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <nav aria-label="breadcrumb" className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium" aria-current="page">Insights</span>
            </nav>
            <div className="section-eyebrow justify-center">INSIGHTS</div>
            <h1 className="max-w-2xl mx-auto">Frameworks. Teardowns. Things that actually work.</h1>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="section-light pt-0 pb-8">
        <div className="container-site">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="section-off">
        <div className="container-site">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link to={`/insights/${post.slug}`} className="card-standard block no-underline group h-full flex flex-col">
                    <span className="tag tag-green mb-3 self-start">{post.category}</span>
                    <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-body leading-relaxed mb-4 flex-grow">{post.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <span className="link-arrow text-sm mt-3">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">No posts in this category yet.</p>
          )}
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="section-light">
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <h2 className="mb-8">Real results from the same frameworks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/case-studies" className="card-standard block no-underline group">
                <div className="stat-number-dark text-xl mb-2" style={{ fontSize: '1.5rem' }}>$329K / month recovered</div>
                <p className="text-sm text-body leading-relaxed mb-3">Complete cart & checkout flow redesign. Cut checkout abandonment by 26%, lifted mobile conversion by 47%.</p>
                <span className="link-arrow text-sm">See full case study<ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
              </Link>
              <Link to="/case-studies" className="card-standard block no-underline group">
                <div className="stat-number-dark text-xl mb-2" style={{ fontSize: '1.5rem' }}>5.7x ROAS (from 1.8x)</div>
                <p className="text-sm text-body leading-relaxed mb-3">Full-funnel rebuild for a D2C coffee brand. Website redesign, analytics infrastructure, and high-converting ad campaigns.</p>
                <span className="link-arrow text-sm">See full case study<ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Insights;
