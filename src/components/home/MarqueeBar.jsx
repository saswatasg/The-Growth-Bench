import { motion } from 'framer-motion';

const stats = [
  '$329K/mo recovered', '5.7x ROAS', '13.7x ROAS', '154.5% sales lift',
  '468% avg. ROAS', '28.71% conv. lift', '2+ yrs avg. tenure', '8 growth capabilities'
];

const capabilities = [
  'Strategy & Audit', 'Growth Ads', 'CRO', 'Web Development',
  'Lead Systems', 'UI/UX Design', 'Performance Marketing', 'SEO'
];

const MarqueeBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-ink py-4 overflow-hidden border-b border-stone/20"
    >
      <div className="overflow-hidden mb-3">
        <div className="marquee-track">
          {[...stats, ...stats].map((s, i) => (
            <span key={i} className="flex-shrink-0 text-caption-sm text-stone/70 whitespace-nowrap">
              {s}
              <span className="mx-6 text-stone/30">·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track-reverse">
          {[...capabilities, ...capabilities].map((c, i) => (
            <span key={i} className="flex-shrink-0 text-caption-sm text-stone/50 whitespace-nowrap">
              {c}
              <span className="mx-6 text-stone/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MarqueeBar;
