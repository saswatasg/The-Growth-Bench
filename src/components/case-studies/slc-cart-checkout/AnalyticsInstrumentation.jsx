import React from 'react';
import { motion } from 'framer-motion';
import { Layers, FileJson, Code } from 'lucide-react';
import Section from './Section';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const CodeBlock = ({ children }) => (
  <div className="overflow-x-auto">
    <pre className="bg-black/80 text-white p-4 rounded-lg text-sm font-mono border border-border/20 shadow-inner w-full">
      <code>{children}</code>
    </pre>
  </div>
);

const ga4Events = `
// Event: begin_checkout
gtag('event', 'begin_checkout', {
  currency: 'USD',
  value: 789.99,
  items: [...]
});

// Event: add_shipping_info
gtag('event', 'add_shipping_info', {
  shipping_tier: 'White Glove',
  est_shipping_cost: 149.00
});

// Event: add_payment_info
gtag('event', 'add_payment_info', {
  payment_type: 'Credit Card'
});

// Custom Event for form validation errors
gtag('event', 'form_error', {
  form_name: 'shipping_address',
  error_field: 'zip_code',
  error_message: 'Invalid ZIP code'
});
`;

const formulas = `
// Checkout Abandonment Rate
const checkout_abandonment = 1 - (purchases / begin_checkout_events);

// Mobile Conversion Rate
const mobile_conversion = mobile_purchases / mobile_sessions;
`;

const AnalyticsInstrumentation = () => {
  return (
    <Section title="Analytics & Instrumentation">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3"><FileJson aria-hidden="true" />GA4 Event Structure</h3>
          <p className="text-muted-foreground mb-4">A robust event schema was crucial for measuring each step of the new funnel and diagnosing user friction points.</p>
          <Accordion type="single" collapsible className="w-full bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg p-2">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="text-base font-semibold hover:no-underline px-4">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>View GA4 Event Code</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <CodeBlock>{ga4Events.trim()}</CodeBlock>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3"><Layers aria-hidden="true" />Key Measurement Formulas</h3>
          <p className="text-muted-foreground mb-4">Core KPIs were defined with clear formulas to ensure consistent and accurate reporting across all dashboards.</p>
          <Accordion type="single" collapsible className="w-full bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg p-2">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="text-base font-semibold hover:no-underline px-4">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>View Formula Code</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <CodeBlock>{formulas.trim()}</CodeBlock>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </Section>
  );
};

export default AnalyticsInstrumentation;