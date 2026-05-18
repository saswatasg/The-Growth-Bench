import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Smartphone, Clock, BarChart2 } from 'lucide-react';

const kpiData = [
  {
    icon: <TrendingUp className="w-8 h-8 text-green-500" />,
    value: '↓ 26%',
    label: 'Checkout Abandonment',
    details: '(73.1% → 53.9%)',
    color: 'green',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-blue-500" />,
    value: '+47%',
    label: 'Mobile Conversion',
    details: '',
    color: 'blue',
  },
  {
    icon: <Clock className="w-8 h-8 text-purple-500" />,
    value: '−34%',
    label: 'Avg Checkout Time',
    details: '',
    color: 'purple',
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-yellow-500" />,
    value: '480k Sessions',
    label: 'Sessions Impact',
    details: '22 days · 10% traffic',
    color: 'yellow',
  },
];

const chipData = ['Role: Growth Product Manager', 'Industry: E-Commerce (US)', 'Platform: Web + Mobile Web'];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const KpiCard = ({ icon, value, label, details, color }) => {
  const colorClasses = {
    green: 'shadow-green-500/10 hover:border-green-500/50',
    blue: 'shadow-blue-500/10 hover:border-blue-500/50',
    purple: 'shadow-purple-500/10 hover:border-purple-500/50',
    yellow: 'shadow-yellow-500/10 hover:border-yellow-500/50',
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/20 shadow-lg flex flex-col gap-4 transition-all duration-300 ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-4">
        {React.cloneElement(icon, { "aria-hidden": "true" })}
        <p className="text-4xl font-bold text-foreground">{value}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{label}</h3>
        {details && <p className="text-sm text-muted-foreground">{details}</p>}
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <>
      <motion.section variants={itemVariants} className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
          Redesigning Cart & Checkout at Sierra Living Concepts
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Product Manager Case Study — Impact, Strategy & Execution
        </p>
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6"
        >
          {chipData.map((chip, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="mb-16 md:mb-24">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
        >
          {kpiData.map((kpi, index) => (
            <KpiCard key={index} {...kpi} />
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default Hero;