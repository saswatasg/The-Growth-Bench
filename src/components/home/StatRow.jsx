import React from 'react';

const stats = [
  { number: '28.71%', label: 'Avg. conversion lift across D2C and SaaS' },
  { number: '468%', label: 'Avg. ROAS across ad platforms managed' },
  { number: '2+ yrs', label: 'Avg. client tenure — we keep what we build' },
  { number: '8', label: 'Full-stack growth capabilities under one bench' },
];

const StatRow = () => {
  return (
    <section className="bg-soft-cloud py-section border-y border-hairline">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="hidden lg:block w-px bg-hairline" />}
              <div className="text-center">
                <div className="font-display text-4xl md:text-5xl text-ink leading-none">{stat.number}</div>
                <div className="text-caption-md text-mute mt-2 max-w-[180px] mx-auto">{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatRow;
