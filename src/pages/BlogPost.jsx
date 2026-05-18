import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { blogPosts } from '@/content/blog';

const BlogPost = () => {
  const BOOKING_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i';

const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="section-light pt-32 pb-24">
        <div className="container-site text-center">
          <h1>Post not found</h1>
          <Link to="/insights" className="link-arrow mt-4 inline-block">
            <ArrowLeft className="w-4 h-4 inline mr-1" /> Back to Insights
          </Link>
        </div>
      </section>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "The Growth Bench" },
    "publisher": { "@type": "Organization", "name": "The Growth Bench" },
  };

  return (
    <>
      <PageMeta title={`${post.title} | The Growth Bench Insights`} description={post.description} articleSchema={articleSchema} />

      <article className="section-light pt-32 pb-24">
        <div className="container-site max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/insights" className="link-arrow text-sm mb-6 inline-block">
              <ArrowLeft className="w-4 h-4 inline mr-1" /> Back to Insights
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="tag tag-green">{post.category}</span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
              <span className="text-xs text-muted-foreground">{post.readTime} min read</span>
            </div>

            <h1 className="mb-4">{post.title}</h1>
            <p className="text-lg text-body leading-relaxed mb-8">{post.description}</p>

            <div className="border-t border-border pt-8" />

            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-dark prose-p:text-body prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-dark prose-code:font-mono prose-code:text-sm prose-code:bg-surface-grey prose-code:px-1 prose-code:rounded">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.body}
              </ReactMarkdown>
            </div>

            {/* Mid-article CTA */}
            <div className="callout-box my-10">
              <p className="!mb-0">
                <strong>Want this applied to your brand?</strong>{' '}
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold whitespace-nowrap">
                  Book a free audit call <ArrowRight className="w-4 h-4 inline" />
                </a>
                {' '}or{' '}
                <a href="https://wa.me/918777875140" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold whitespace-nowrap">
                  chat with us on WhatsApp
                </a>.
              </p>
            </div>

            {/* FAQ Section for AI Search */}
            {post.faq && post.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {post.faq.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-display font-semibold text-base mb-2">{item.q}</h3>
                      <p className="text-sm text-body leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>

                {/* FAQ Schema */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": post.faq.map((item) => ({
                      "@type": "Question",
                      "name": item.q,
                      "acceptedAnswer": { "@type": "Answer", "text": item.a },
                    })),
                  })}
                </script>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 pt-8 border-t border-border text-center">
              <p className="text-body mb-4">
                <strong>Ready to put these insights to work?</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
                    Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="https://wa.me/918777875140" target="_blank" rel="noopener noreferrer" className="no-underline">
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="font-display font-bold text-xl mb-6">Related posts</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts
                  .filter((p) => p.slug !== post.slug && p.category === post.category)
                  .slice(0, 2)
                  .map((related) => (
                    <Link key={related.slug} to={`/insights/${related.slug}`} className="card-standard block no-underline group">
                      <span className="tag tag-green mb-2 self-start">{related.category}</span>
                      <h4 className="font-display font-bold text-base mb-1 group-hover:text-primary transition-colors">{related.title}</h4>
                      <p className="text-xs text-muted-foreground">{related.readTime} min read</p>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
