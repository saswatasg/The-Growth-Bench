import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShoppingCart, Truck, Zap, Target, UserCheck, BarChartHorizontal } from 'lucide-react';
import Section from './Section';

const problemsData = [
  {
    icon: <ShoppingCart className="w-8 h-8 text-red-500" />,
    title: "Cart Distraction",
    description: "Cross-sells and promos siphoned attention away from completing the checkout process."
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
    title: "High Abandonment",
    description: "A staggering baseline of ~74% of users were dropping off before purchase."
  },
  {
    icon: <Truck className="w-8 h-8 text-blue-500" />,
    title: "Delivery Confusion",
    description: "Too many options presented with jargon-heavy language created decision paralysis."
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-500" />,
    title: "Mobile & Form Issues",
    description: "Pinch-zoom necessity, billing vs. shipping confusion, and no inline validation frustrated users."
  }
];

const problemTableData = [
  {
    problem: "High Checkout Abandonment",
    evidence: "74.09% (Q2–Q3), 70.77% (Oct–Nov)",
    businessImpact: "Directly suppressed revenue and inflated customer acquisition costs due to lost conversions."
  }
];

const goalsData = {
  business: [
    "Reduce overall cart abandonment rate",
    "Increase mobile conversion and revenue",
    "Improve customer satisfaction and trust signals"
  ],
  user: [
    "A shorter, more intuitive checkout flow",
    "Transparent costs and delivery estimates",
    "A seamless, mobile-first form experience"
  ]
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const ProblemCard = ({ icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0, 0.1)" }}
    className="bg-card/70 backdrop-blur-sm p-6 rounded-xl border border-border/20 flex flex-col items-start gap-4 transition-all duration-300"
  >
    <div className="flex items-center gap-3">
      {React.cloneElement(icon, { "aria-hidden": "true" })}
      <h3 className="text-xl font-bold text-primary">{title}</h3>
    </div>
    <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
  </motion.div>
);

const ProblemDiagnosis = () => {
  return (
    <>
      <Section title="Problem Diagnosis">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {problemsData.map((problem, index) => (
            <ProblemCard key={index} {...problem} />
          ))}
        </div>
        
        <motion.div variants={itemVariants} className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-primary/5">
                <tr>
                  <th className="p-4 font-semibold text-primary">Problem</th>
                  <th className="p-4 font-semibold text-primary">Evidence</th>
                  <th className="p-4 font-semibold text-primary">Business Impact</th>
                </tr>
              </thead>
              <tbody>
                {problemTableData.map((row, index) => (
                  <tr key={index} className="border-t border-border/20">
                    <td className="p-4 text-foreground font-medium">{row.problem}</td>
                    <td className="p-4 text-muted-foreground">{row.evidence}</td>
                    <td className="p-4 text-muted-foreground">{row.businessImpact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Section>

      <Section title="Goals">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target aria-hidden="true" className="w-7 h-7 text-green-500" />
              <h3 className="text-2xl font-bold text-foreground">Business Goals</h3>
            </div>
            <ul className="space-y-3">
              {goalsData.business.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <BarChartHorizontal aria-hidden="true" className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck aria-hidden="true" className="w-7 h-7 text-blue-500" />
              <h3 className="text-2xl font-bold text-foreground">User Goals</h3>
            </div>
             <ul className="space-y-3">
              {goalsData.user.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <UserCheck aria-hidden="true" className="w-5 h-5 mt-1 text-blue-500 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default ProblemDiagnosis;