import React from 'react';

const stats = [
  { value: '$500K+', label: 'Monthly Revenue Impact' },
  { value: '70+', label: 'Product Changes Shipped' },
  { value: '20+', label: 'Brands Consulted' },
  { value: '3+', label: 'Years in Product & Growth' },
];

const brands = ['Sierra Living Concepts', 'Upcore Technologies', 'LiveKeeping', 'Caffena Coffee', 'Diwan Plywood', 'Vintage Bike Parts'];

const ImpactBar = () => {
  return (
    <section className="section-light py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[36px] md:text-[44px] font-bold tracking-[-0.03em] text-[var(--accent-gold)] leading-none">
                {stat.value}
              </div>
              <div className="text-[13px] md:text-sm text-muted-foreground font-medium mt-2 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-8 border-t border-border/40">
          <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Experience Across</span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-3">
            {brands.map((name, i) => (
              <span key={i} className="text-[13px] text-muted-foreground/70 font-medium">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactBar;
