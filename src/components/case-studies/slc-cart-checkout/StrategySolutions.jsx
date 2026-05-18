import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Map, CheckCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Section from './Section';

const hypotheses = [
  "Removing distractions from the cart will focus users on checkout.",
  "Surfacing estimated costs early will reduce sticker shock and build trust.",
  "Collapsing funnel steps will decrease perceived effort and reduce drop-offs.",
  "Clarifying delivery options with simple language will prevent analysis paralysis."
];

const roadmap = [
  "Cart page cleanup and distraction removal",
  "Consolidated 3-step funnel with inline validation",
  "Live shipping and tax cost estimator widget",
  "Simplified delivery options with clear, benefit-oriented language",
  "Sticky order summary for persistent cost visibility"
];

const solutions = [
  {
    title: "Cart: Clutter to Clarity",
    before: "The cart was cluttered with competing CTAs, cross-sells, and promotions that actively pulled users away from checking out.",
    after: "A distraction-free layout with a single, clear CTA. The order summary was made sticky to maintain focus and transparency."
  },
  {
    title: "Funnel: 5 Steps to 3",
    before: "A lengthy 5-step process created high user fatigue. No clear progress indicators made the journey feel endless.",
    after: "A condensed 3-step funnel (Address → Delivery → Payment) with a persistent breadcrumb navigator and smart inline validation to reduce errors."
  },
  {
    title: "Address: Confusion to Control",
    before: "Separate screens for billing and shipping addresses caused confusion and repetitive data entry, especially on mobile.",
    after: "A unified address page with a simple checkbox for 'same as shipping.' Inline error messages provided instant feedback without page reloads."
  },
  {
    title: "Delivery: Jargon to Simplicity",
    before: "A long list of confusingly named delivery options (e.g., 'LTL Curbside,' 'Standard Plus') led to decision paralysis.",
    after: "Two simple, plain-language choices presented as clear cards ('Standard' vs. 'White Glove') with bullet points and bolded prices."
  }
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const StrategySolutions = () => {
  return (
    <Section title="Strategy & Solutions">
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3"><Lightbulb aria-hidden="true" />Hypotheses</h3>
          <ul className="space-y-4">
            {hypotheses.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle aria-hidden="true" className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3"><Map aria-hidden="true" />Roadmap</h3>
          <ol className="space-y-4">
            {roadmap.map((r, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex-shrink-0 bg-primary/10 text-primary font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm">{i + 1}</span>
                <span className="text-muted-foreground leading-relaxed">{r}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
      <motion.div variants={itemVariants} className="mt-12">
        <h3 className="text-2xl font-bold text-primary mb-4 text-center">Solutions: Before & After</h3>
        <Accordion type="single" collapsible className="w-full bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg p-2">
          {solutions.map((s, i) => (
            <AccordionItem value={`item-${i}`} key={i} className="border-b-border/20 last:border-b-0">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4 text-left">{s.title}</AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="font-semibold text-orange-500 mb-2">Before</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.before}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-border/20 pt-4 md:pt-0 md:pl-6">
                    <h4 className="font-semibold text-green-500 mb-2">After</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.after}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
};

export default StrategySolutions;