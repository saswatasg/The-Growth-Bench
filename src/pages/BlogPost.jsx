import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { loadPosts, loadCTAs } from '@/lib/blogUtils';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';

const slugToCategoryImage = {
  'Growth Strategy': '/assets/images/og-growth-strategy.png',
  'CRO': '/assets/images/og-cro.png',
  'Google Ads': '/assets/images/og-google-ads.png',
  'Meta Ads': '/assets/images/og-meta-ads.png',
  'Lead Systems': '/assets/images/og-lead-systems.png',
  'UI/UX': '/assets/images/og-ui-ux.png',
  'Website Dev': '/assets/images/og-website-dev.png',
  'Marketing Strategy': '/assets/images/og-marketing-strategy.png',
};

const BlogPost = () => {
  const { openBookingModal } = useBookingModal();
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [ctas, setCtas] = useState(null);

  useEffect(() => {
    setPosts(loadPosts());
    setCtas(loadCTAs());
  }, []);

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="bg-canvas">
        <div className="container-site py-section-lg text-center">
          <h1 className="font-display text-display-md text-ink">Post not found</h1>
          <Link to="/insights" className="text-body-sm text-ink underline mt-4 inline-block">Back to Insights</Link>
        </div>
      </section>
    );
  }

  const dateToISO = (dateStr) => {
    const months = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
    const [month, year] = dateStr.split(' ');
    return `${year}-${months[month]}-01`;
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": dateToISO(post.date),
    "dateModified": dateToISO(post.date),
    "image": slugToCategoryImage[post.category] || "/assets/images/og-card.png",
    "author": { "@type": "Organization", "name": "The Growth Bench" },
    "publisher": { "@type": "Organization", "name": "The Growth Bench" },
  };

  return (
    <>
      <PageMeta title={`${post.title} | The Growth Bench Insights`} description={post.description} articleSchema={articleSchema} ogImage={slugToCategoryImage[post.category] || "/assets/images/og-card.png"} />

      <article className="bg-canvas py-section-lg">
        <div className="container-site max-w-3xl mx-auto">
          <div className="mb-8">
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-caption-sm text-mute mb-6">
              <Link to="/" className="hover:text-ink transition-colors no-underline text-mute">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/insights" className="hover:text-ink transition-colors no-underline text-mute">Insights</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-ink font-medium">{post.title}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-label-xs text-mute bg-soft-cloud px-3 py-1 rounded-full uppercase">{post.category}</span>
              <span className="text-caption-sm text-mute">{post.date}</span>
              <span className="text-caption-sm text-mute">{post.readTime} min read</span>
            </div>

            <h1 className="font-display text-display-md text-ink leading-none">{post.title}</h1>
            <p className="text-body-md text-mute mt-4 leading-relaxed max-w-2xl">{post.description}</p>
          </div>

          <div className="border-t border-hairline-soft pt-8" />

          <div className="text-body-md text-mute leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-heading-xl [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-heading-md [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-ink [&_a]:underline [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_p]:mb-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.body}
            </ReactMarkdown>
          </div>

          {ctas?.midArticle && (
            <div className="bg-soft-cloud border border-hairline-soft p-6 my-10">
              <p className="text-body-sm text-mute">
                <strong>{ctas.midArticle.text}</strong>{' '}
                <button onClick={openBookingModal} className="text-ink font-medium underline ml-1">
                  {ctas.midArticle.button}
                </button>
                {ctas.midArticle.note && <> — {ctas.midArticle.note}.</>}
              </p>
            </div>
          )}

          {post.faq && post.faq.length > 0 && (
            <div className="mt-12 pt-8 border-t border-hairline-soft">
              <h2 className="font-display text-heading-xl text-ink mb-6">FAQs</h2>
              <div className="space-y-6">
                {post.faq.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-heading-md text-ink mb-2">{item.q}</h3>
                    <p className="text-body-sm text-mute leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": post.faq.map((item) => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": { "@type": "Answer", "text": item.a },
                  })),
                })}} />
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-hairline-soft flex items-center gap-3">
            <span className="text-label-xs text-mute uppercase">Share</span>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-ink transition-colors p-1" aria-label="Share on LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-ink transition-colors p-1" aria-label="Share on Twitter/X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>

          {ctas?.bottomCTA && (
            <div className="mt-12 pt-8 border-t border-hairline-soft text-center">
              <p className="text-body-md text-mute mb-4">
                <strong>{ctas.bottomCTA.text}</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={openBookingModal}>{ctas.bottomCTA.button} &rarr;</Button>
                {ctas.bottomCTA.secondary && (
                  <Button asChild variant="outline" size="lg">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
                      {ctas.bottomCTA.secondary}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-hairline-soft">
            <h3 className="font-display text-heading-lg text-ink mb-6">Related posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {posts
                .filter((p) => p.slug !== post.slug && p.category === post.category)
                .slice(0, 2)
                .map((related) => (
                  <Link key={related.slug} to={`/insights/${related.slug}`} className="block p-6 border border-hairline-soft bg-canvas no-underline group">
                    <span className="inline-block text-label-xs text-mute bg-soft-cloud px-3 py-1 rounded-full mb-2 uppercase">{related.category}</span>
                    <h4 className="text-heading-md text-ink mb-1 group-hover:text-mute transition-colors">{related.title}</h4>
                    <p className="text-caption-sm text-mute">{related.readTime} min read</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
