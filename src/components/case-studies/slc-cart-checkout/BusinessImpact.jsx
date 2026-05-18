import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag } from 'lucide-react';
import Section from './Section';
import { Slider } from '@/components/ui/slider';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const BusinessImpact = () => {
  const [checkoutRate, setCheckoutRate] = useState([2]);
  const aov = 3500;
  const totalSessions = 480000;
  const testTraffic = 0.1;
  const controlAbandonment = 0.731;
  const variantAbandonment = 0.539;

  const calculation = useMemo(() => {
    const sessionsEnteringCheckout = totalSessions * (checkoutRate[0] / 100);
    const controlPurchases = sessionsEnteringCheckout * (1 - controlAbandonment);
    const variantPurchases = sessionsEnteringCheckout * (1 - variantAbandonment);
    
    const incrementalOrders = (variantPurchases - controlPurchases) / testTraffic;
    const incrementalRevenue = incrementalOrders * aov;

    return {
      incrementalOrders: Math.round(incrementalOrders),
      incrementalRevenue: Math.round(incrementalRevenue),
    };
  }, [checkoutRate, aov, totalSessions, testTraffic, controlAbandonment, variantAbandonment]);

  return (
    <Section title="Business Impact Modeling">
      <motion.div 
        variants={itemVariants} 
        className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl shadow-lg p-6 md:p-8"
      >
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold text-primary">Interactive Calculator</h3>
            <p className="text-muted-foreground leading-relaxed">Adjust the slider to model the potential annualized revenue impact based on the percentage of sessions entering checkout.</p>
            <div className="pt-2">
              <label htmlFor="checkout-rate-slider" className="block text-base font-medium text-foreground mb-4">
                Sessions Entering Checkout: <span className="font-bold text-primary text-lg">{checkoutRate[0].toFixed(1)}%</span>
              </label>
              <Slider
                id="checkout-rate-slider"
                defaultValue={checkoutRate}
                min={1}
                max={3}
                step={0.1}
                onValueChange={setCheckoutRate}
                aria-label={`Sessions entering checkout rate: ${checkoutRate[0].toFixed(1)}%`}
              />
            </div>
            <p className="text-xs text-muted-foreground pt-2">Based on an Average Order Value (AOV) of ${aov.toLocaleString()}.</p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            <motion.div whileHover={{y: -5}} className="bg-background/50 p-6 rounded-lg border border-border/30 text-center flex flex-col justify-center items-center">
              <ShoppingBag aria-hidden="true" className="w-10 h-10 mx-auto text-blue-500 mb-3" />
              <p className="text-sm text-muted-foreground">Annual Incremental Orders</p>
              <p className="text-3xl lg:text-4xl font-bold text-foreground mt-1">~{calculation.incrementalOrders.toLocaleString()}</p>
            </motion.div>
            <motion.div whileHover={{y: -5}} className="bg-background/50 p-6 rounded-lg border border-border/30 text-center flex flex-col justify-center items-center">
              <DollarSign aria-hidden="true" className="w-10 h-10 mx-auto text-green-500 mb-3" />
              <p className="text-sm text-muted-foreground">Annual Incremental Revenue</p>
              <p className="text-3xl lg:text-4xl font-bold text-foreground mt-1">${(calculation.incrementalRevenue / 1000).toFixed(0)}k</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default BusinessImpact;