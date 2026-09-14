import { motion } from 'framer-motion';

const items = [
  'AI Implementation for D2C', 'Agentic AI: ops + support + content', '$345K/mo recovered', '5.7x ROAS',
  '26% checkout drop cut', '47% mobile lift', '9 growth capabilities',
  'Strategy & Audit', 'Growth Ads', 'CRO', 'Web Development',
  'Lead Systems', 'UI/UX Design', 'Performance Marketing', 'SEO'
];

const MarqueeBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-ink dark:bg-canvas py-4 overflow-hidden border-b border-stone/20 dark:border-hairline-soft"
    >
      <div className="overflow-hidden">
        <div className="marquee-track">
          {items.map((s, i) => (
            <span key={`a-${i}`} className="flex-shrink-0 text-caption-sm text-stone dark:text-mute whitespace-nowrap">
              {s}
              <span className="mx-6 text-stone/30 dark:text-mute/30">·</span>
            </span>
          ))}
          {items.map((s, i) => (
            <span key={`b-${i}`} aria-hidden="true" className="flex-shrink-0 text-caption-sm text-stone dark:text-mute whitespace-nowrap">
              {s}
              <span className="mx-6 text-stone/30 dark:text-mute/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MarqueeBar;
