import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, SlidersHorizontal, Route, Percent, Timer, Smartphone } from 'lucide-react';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, LabelList } from 'recharts';
import Section from './Section';

const experimentationData = {
  test: "22 days, 10% traffic",
  primaryMetric: "Checkout Abandonment Rate",
  secondaryMetrics: ["Mobile Conversion Rate", "Average Checkout Duration"],
  guardrails: ["Sample Ratio Mismatch (SRM)", "Device/Browser Splits", "Significance threshold at p < 0.05"],
  rollout: "10% → 25% → 50% → 100% over 8 days post-analysis"
};

const resultsData = {
  abandonment: [
    { name: 'Start', Control: 73.1, Variant: 73.1 },
    { name: 'Day 5', Control: 73.0, Variant: 68.2 },
    { name: 'Day 10', Control: 73.2, Variant: 61.5 },
    { name: 'Day 15', Control: 73.1, Variant: 57.1 },
    { name: 'Day 22', Control: 73.1, Variant: 53.9 },
  ],
  mobileConversion: [
    { name: 'Mobile Conv.', Before: 1.70, After: 2.50 },
  ],
  checkoutTime: [
    { name: 'Avg. Time', Before: 7.6, After: 5.0 },
  ]
};

const AnimatedChart = ({ children, className, title }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full h-80 bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl p-4 overflow-hidden ${className}`}
      aria-label={title}
    >
      <div className="w-full h-full overflow-x-auto">
        <div className="min-w-[400px] h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg">
        <p className="label font-bold text-foreground">{`${label}`}</p>
        {payload.map((pld, i) => (
          <p key={i} style={{ color: pld.color }} className="text-sm">{`${pld.name}: ${pld.value}${pld.unit || ''}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const ExperimentationResults = () => {
  return (
    <Section title="Experimentation & Results">
      <div className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg p-6 mb-12 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3"><SlidersHorizontal aria-hidden="true" />A/B Test Setup</h3>
          <p className="text-muted-foreground mb-2"><strong className="text-foreground">Details:</strong> {experimentationData.test}</p>
          <p className="text-muted-foreground mb-2"><strong className="text-foreground">Primary Metric:</strong> {experimentationData.primaryMetric}</p>
          <p className="text-muted-foreground mb-2"><strong className="text-foreground">Secondary Metrics:</strong> {experimentationData.secondaryMetrics.join(', ')}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3"><ShieldCheck aria-hidden="true" />Guardrails & Rollout</h3>
          <ul className="space-y-2">
            {experimentationData.guardrails.map((g,i) => (
               <li key={i} className="flex items-start gap-3 text-sm">
                   <ShieldCheck aria-hidden="true" className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                   <span className="text-muted-foreground">{g}</span>
               </li>
            ))}
          </ul>
          <div className="flex items-start gap-3 text-sm mt-4">
             <Route aria-hidden="true" className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
             <p className="text-muted-foreground"><strong className="text-foreground">Rollout:</strong> {experimentationData.rollout}</p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3"><Percent aria-hidden="true" />Checkout Abandonment Rate</h3>
          <AnimatedChart title="Line chart showing checkout abandonment rate for Control vs Variant over 22 days.">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resultsData.abandonment} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} unit="%" tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                <Line type="monotone" dataKey="Control" stroke="#8884d8" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Variant" stroke="#82ca9d" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </AnimatedChart>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div>
              <h3 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3"><Smartphone aria-hidden="true" />Mobile Conversion</h3>
              <AnimatedChart title="Bar chart comparing mobile conversion rate Before (1.70%) and After (2.50%).">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={resultsData.mobileConversion} layout="vertical" margin={{ top: 20, right: 60, left: 20, bottom: 20 }}>
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey="name" hide />
                          <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip unit="%" />} />
                          <Bar dataKey="Before" fill="#a78bfa" radius={[0, 4, 4, 0]} barSize={30}>
                            <LabelList dataKey="Before" position="right" formatter={(v) => `${v}%`} className="font-bold fill-foreground"/>
                          </Bar>
                          <Bar dataKey="After" fill="#82ca9d" radius={[0, 4, 4, 0]} barSize={30}>
                            <LabelList dataKey="After" position="right" formatter={(v) => `${v}%`} className="font-bold fill-foreground"/>
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </AnimatedChart>
           </div>
           <div>
              <h3 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3"><Timer aria-hidden="true" />Avg. Checkout Time</h3>
              <AnimatedChart title="Bar chart comparing average checkout time Before (7.6 min) and After (5.0 min).">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={resultsData.checkoutTime} layout="vertical" margin={{ top: 20, right: 60, left: 20, bottom: 20 }}>
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey="name" hide />
                           <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip unit=" min"/>} />
                           <Bar dataKey="Before" fill="#a78bfa" radius={[0, 4, 4, 0]} barSize={30}>
                              <LabelList dataKey="Before" position="right" formatter={(v) => `${v} min`} className="font-bold fill-foreground"/>
                           </Bar>
                           <Bar dataKey="After" fill="#82ca9d" radius={[0, 4, 4, 0]} barSize={30}>
                              <LabelList dataKey="After" position="right" formatter={(v) => `${v} min`} className="font-bold fill-foreground"/>
                           </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </AnimatedChart>
           </div>
        </div>
      </div>
    </Section>
  );
};

export default ExperimentationResults;