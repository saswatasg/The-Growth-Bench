import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Target, TrendingUp, ArrowRight, Workflow } from 'lucide-react';
import { fadeUp, staggerContainer, staggerChild } from '@/lib/motion';

const services = [
  { num: '01', name: 'AI Implementation', icon: Workflow, desc: 'Agentic AI for anything repeatable: ops, support, content, follow-ups, reviews.', to: '/services#ai-implementation' },
  { num: '02', name: 'Growth Strategy', icon: Search, desc: 'Funnel audit, ICP, 90-day roadmap before touching a single ad account.', to: '/services#strategy' },
  { num: '03', name: 'Ads', icon: Target, desc: 'Meta, Google, Amazon, LinkedIn — full-funnel campaigns with proper attribution.', to: '/services#ads' },
  { num: '04', name: 'CRO', icon: TrendingUp, desc: 'Qualitative research, quantitative analysis, structured A/B testing.', to: '/services' },
];

const ServicesOverview = () => {
  return (
    <motion.section {...fadeUp} className="bg-ink py-[60px] md:py-[120px]">
      <div className="container-site">
        <div className="text-center mb-12">
          <span className="text-label-xs text-stone uppercase tracking-wider">What we do</span>
          <h2 className="font-display text-heading-xl md:text-display-md text-canvas mt-2 leading-none">The full stack, handled.</h2>
          <p className="text-body-md text-stone mt-4 max-w-xl mx-auto leading-relaxed">
            From the first strategy call to the live campaign to the optimised checkout — plus the AI systems that take repetitive work off your plate.
          </p>
        </div>

        <motion.div {...staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.num} {...staggerChild}>
                <Link
                  to={s.to}
                  className="group block p-6 no-underline border border-stone/20 hover:border-stone/50 transition-colors h-full"
                >
                  <div className="w-10 h-10 rounded-full bg-canvas/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-canvas" />
                  </div>
                  <span className="text-caption-sm text-hairline font-mono">{s.num}</span>
                  <h3 className="text-body-md font-medium text-canvas mt-1 mb-1">{s.name}</h3>
                  <p className="text-caption-md text-hairline leading-relaxed">{s.desc}</p>
                  <span className="text-caption-sm text-hairline mt-3 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
          <Link to="/services" className="inline-flex items-center gap-1 text-body-sm font-medium text-canvas no-underline hover:text-stone transition-colors">
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/ai-scorecard" className="inline-flex items-center gap-1 text-body-sm font-medium text-hairline no-underline hover:text-canvas transition-colors">
            Not sure where to start? Take the 60-second AI scorecard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesOverview;
