import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, TestTube2, BarChart, ShoppingBasket, Sparkles } from 'lucide-react';
import Section from './Section';

const leadershipData = [
  { team: 'Design', role: 'Wireframing, Hi-Fi Mockups, Prototyping', icon: <PenTool className="text-purple-400"/> },
  { team: 'Engineering', role: 'Frontend Dev, API Integration, A/B Setup', icon: <TestTube2 className="text-blue-400"/> },
  { team: 'QA', role: 'Test Planning, Cross-Browser Testing', icon: <TestTube2 className="text-orange-400"/> },
  { team: 'Analytics', role: 'Event Tracking, Dashboarding, A/B Analysis', icon: <BarChart className="text-green-400"/> },
  { team: 'Merch/CS', role: 'Business Logic, User Feedback', icon: <ShoppingBasket className="text-red-400"/> },
];

const nextIterations = [
    { title: 'Express Pay', description: 'Integrate Apple/Google Pay earlier in the funnel.', icon: <Sparkles /> },
    { title: 'Auto-Apply Coupon', description: 'Automatically find and apply the best coupon code.', icon: <Sparkles /> },
    { title: 'Exit-Intent Recovery', description: 'Offer a small discount on cart abandonment intent.', icon: <Sparkles /> },
    { title: 'Address Autocomplete', description: 'Use Google Places API to speed up form filling.', icon: <Sparkles /> },
    { title: 'Post-Purchase UX', description: 'Clarify "What\'s Next" for delivery and tracking.', icon: <Sparkles /> },
];

const learnings = [
  "Early cost transparency builds trust and reduces sticker shock at the final step.",
  "In e-commerce, especially high-AOV, less choice can be more. Simplifying delivery options prevented analysis paralysis.",
  "Smart inline validation is a non-negotiable for a modern checkout. It reduces user frustration and retries.",
  "Disciplined measurement and phased rollouts are the safest path to deploying high-impact changes with confidence."
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const LeadershipLearnings = () => {
  return (
    <>
      <Section title="Cross-Functional Leadership">
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {leadershipData.map(item => (
            <div key={item.team} className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-lg p-4 text-center flex flex-col h-full">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto mb-3 border-2 border-primary/20 flex-shrink-0">
                    {React.cloneElement(item.icon, { className: 'w-6 h-6', "aria-hidden": "true" })}
                </div>
              <h4 className="font-bold text-foreground text-base">{item.team}</h4>
              <p className="text-xs text-muted-foreground mt-1 flex-grow">{item.role}</p>
            </div>
          ))}
        </motion.div>
      </Section>
      
      <Section title="Next Iterations">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nextIterations.map(item => (
                <motion.div 
                    key={item.title} 
                    variants={itemVariants}
                    className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-lg p-6 flex items-start gap-4"
                >
                    <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                        {React.cloneElement(item.icon, { className: 'w-6 h-6', "aria-hidden": "true" })}
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </Section>

      <Section title="Key Learnings">
        <div className="space-y-6">
          {learnings.map((learning, index) => (
            <motion.blockquote
              key={index}
              variants={itemVariants}
              className="bg-card/70 backdrop-blur-sm border-l-4 border-primary p-6 rounded-r-lg"
            >
              <p className="text-lg italic text-foreground leading-relaxed">"{learning}"</p>
            </motion.blockquote>
          ))}
        </div>
      </Section>
      
      <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mt-12">
        <p className="text-lg text-muted-foreground leading-relaxed">
          "Leading this checkout overhaul was a highlight at SLC. I'm incredibly grateful to the design, engineering, QA, and analytics teams who brought this vision to life and delivered exceptional results for our customers."
        </p>
      </motion.div>
    </>
  );
};

export default LeadershipLearnings;