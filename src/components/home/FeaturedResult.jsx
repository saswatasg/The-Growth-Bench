import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedResult = () => {
  return (
    <section className="section-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--accent-gold)] font-medium">Featured Case Study</span>
          <h2 className="mt-3 mb-4">Cart &amp; Checkout Redesign</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <div className="text-[48px] md:text-[64px] font-bold tracking-[-0.03em] text-[var(--accent-gold)] leading-none mb-3">
              $329K
              <span className="text-base md:text-lg font-medium text-muted-foreground">/mo recovered</span>
            </div>
            <p className="text-[15px] md:text-[17px] text-muted-foreground leading-relaxed mb-6">
              Redesigned the cart and checkout flow at Sierra Living Concepts. Cut abandonment from 84.47% to 63.26%, lifted mobile conversion by 47%, and reduced checkout time by 34%.
            </p>
            <Link
              to="/case-studies/slc-cart-checkout-redesign"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-gold)] hover:underline"
            >
              Read the full case study <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="card-accent p-6 md:p-8">
            <p className="text-[14px] md:text-[15px] text-foreground/80 italic leading-relaxed mb-5">
              &ldquo;Saswata helped us scale our D2C coffee brand from the ground up. In just 3 months, he revamped our entire website, set up precise tracking, and launched high-converting ad campaigns.&rdquo;
            </p>
            <div className="text-sm font-semibold text-foreground">Pranav Mehta</div>
            <div className="text-[13px] text-muted-foreground">Founder &ndash; Caffena Coffee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResult;
