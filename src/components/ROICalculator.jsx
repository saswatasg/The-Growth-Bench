import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { fadeUp } from '@/lib/motion';

const REVENUE_OPTIONS = [
  'Under ₹10L/month',
  '₹10L–₹25L/month',
  '₹25L–₹50L/month',
  '₹50L–₹1Cr/month',
  '₹1Cr–₹5Cr/month',
  'Over ₹5Cr/month',
];

const CHANNEL_OPTIONS = [
  'Meta Ads',
  'Google Ads',
  'Amazon Ads',
  'Shopify / E-Commerce',
  'WhatsApp / Email',
  'SEO / Content',
];

const ROICalculator = () => {
  const [revenue, setRevenue] = useState('');
  const [channels, setChannels] = useState(new Set());
  const [showResult, setShowResult] = useState(false);
  const { openBookingModal } = useBookingModal();

  const toggleChannel = (ch) => {
    const next = new Set(channels);
    if (next.has(ch)) next.delete(ch); else next.add(ch);
    setChannels(next);
  };

  const estimate = useMemo(() => {
    const revMap = {
      'Under ₹10L/month': { low: 3, mid: 5, high: 8 },
      '₹10L–₹25L/month': { low: 5, mid: 10, high: 18 },
      '₹25L–₹50L/month': { low: 10, mid: 18, high: 30 },
      '₹50L–₹1Cr/month': { low: 18, mid: 30, high: 50 },
      '₹1Cr–₹5Cr/month': { low: 30, mid: 50, high: 80 },
      'Over ₹5Cr/month': { low: 50, mid: 80, high: 120 },
    };
    const base = revMap[revenue] || { low: 0, mid: 0, high: 0 };
    const channelMultiplier = 1 + (channels.size * 0.15);
    return {
      low: Math.round(base.low * channelMultiplier),
      mid: Math.round(base.mid * channelMultiplier),
      high: Math.round(base.high * channelMultiplier),
    };
  }, [revenue, channels]);

  const canShow = revenue && channels.size > 0;

  return (
    <section className="bg-soft-cloud py-[80px] md:py-[100px]">
      <div className="container-site">
        <div className="max-w-2xl mb-10">
          <span className="text-label-xs text-mute uppercase tracking-wider">ROI Estimator</span>
          <h2 className="font-display text-display-md text-ink mt-2 leading-none">
            Estimate your growth potential.
          </h2>
          <p className="text-body-md text-mute mt-4 leading-relaxed max-w-xl">
            Get a rough range of what a growth partner could unlock for your brand. Real numbers come from the audit call.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
          <div className="space-y-8">
            <div>
              <p className="text-heading-md text-ink mb-4">What's your monthly revenue?</p>
              <div className="grid grid-cols-2 gap-2">
                {REVENUE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setRevenue(opt)}
                    className={`px-4 py-3 text-button-sm rounded-full border text-left transition-colors ${
                      revenue === opt
                        ? 'bg-ink text-canvas border-ink'
                        : 'bg-canvas text-mute border-hairline hover:border-ink hover:text-ink'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-heading-md text-ink mb-4">Which channels do you use?</p>
              <div className="flex flex-wrap gap-2">
                {CHANNEL_OPTIONS.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => toggleChannel(ch)}
                    className={`px-4 py-2.5 text-button-sm rounded-full border transition-colors ${
                      channels.has(ch)
                        ? 'bg-ink text-canvas border-ink'
                        : 'bg-canvas text-mute border-hairline hover:border-ink hover:text-ink'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              disabled={!canShow}
              onClick={() => setShowResult(true)}
              className="w-full md:w-auto"
            >
              <Calculator className="w-4 h-4 mr-2" /> Estimate Growth Potential
            </Button>
          </div>

          {showResult && canShow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-canvas border border-hairline-soft p-8 self-start"
            >
              <span className="text-label-xs text-mute uppercase tracking-wider block mb-2">Estimated monthly revenue lift</span>
              <div className="font-display text-display-lg text-ink leading-none my-4">
                ₹{estimate.low}L – ₹{estimate.high}L
              </div>
              <p className="text-body-sm text-mute leading-relaxed mb-6">
                Based on your current revenue and channel mix. Mid-point estimate: <strong className="text-ink">₹{estimate.mid}L/month</strong> additional revenue within 90 days.
              </p>
              <div className="border-t border-hairline-soft pt-4 mb-6">
                <p className="text-caption-sm text-mute leading-relaxed">
                  This is a rough estimate based on representative outcomes across D2C clients. Actual results depend on your market, product, and current funnel efficiency.
                </p>
              </div>
              <Button size="lg" className="w-full" onClick={openBookingModal}>
                Get Exact Numbers — Book a Free Audit <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
