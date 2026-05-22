import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Search, Target, Globe, Share2, TrendingUp, Code2, Palette, Users, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import PageMeta from '@/components/PageMeta';
import { BOOKING_URL, WHATSAPP_URL } from '@/lib/constants';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const MODULES = [
  { id: 'strategy', label: 'Strategy & Audit', desc: 'Funnel audit, roadmap, OKRs', icon: Search },
  { id: 'meta-ads', label: 'Meta Ads', desc: 'Facebook, Instagram, Reels, CAPI', icon: Target },
  { id: 'google-ads', label: 'Google Ads', desc: 'Search, Shopping, PMax, YouTube', icon: Globe },
  { id: 'social', label: 'Social Media', desc: 'Organic strategy, UGC, creator sourcing', icon: Share2 },
  { id: 'cro', label: 'CRO & Experimentation', desc: 'A/B testing, heatmaps, funnel analysis', icon: TrendingUp },
  { id: 'web-dev', label: 'Website & Development', desc: 'Full build, landing pages, tracking infra', icon: Code2 },
  { id: 'ui-ux', label: 'UI/UX Design', desc: 'Research, wireframes, Figma design', icon: Palette },
  { id: 'lead-systems', label: 'Lead Systems & CRM', desc: 'CRM setup, nurture sequences, lead scoring', icon: Users },
  { id: 'content', label: 'Content & Email Marketing', desc: 'Email flows, WhatsApp, content strategy', icon: FileText },
  { id: 'analytics', label: 'Analytics & Reporting', desc: 'Dashboards, attribution, insights', icon: BarChart3 },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

const WorkWithUs = () => {
  const [selectedModules, setSelectedModules] = useState(new Set());
  const [adSpend, setAdSpend] = useState('');
  const [channels, setChannels] = useState('');
  const [timeline, setTimeline] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: '', challenge: '', found: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hasAdsModule = selectedModules.has('meta-ads') || selectedModules.has('google-ads');

  const toggleModule = (id) => {
    const next = new Set(selectedModules);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedModules(next);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.challenge) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New custom pricing enquiry from The Growth Bench',
          name: form.name,
          email: form.email,
          company: form.company,
          revenue: form.revenue,
          challenge: form.challenge,
          found: form.found,
          selected_modules: [...selectedModules].join(', '),
          ad_spend_range: adSpend,
          channels_count: channels,
          timeline,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success('Message received! We\'ll be in touch within 24 hours.');
      } else {
        toast.error('Something went wrong. Please email us directly at hi@saswatasg.com.');
      }
    } catch {
      toast.error('Network error. Please email us directly at hi@saswatasg.com.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <PageMeta />

      {/* Hero */}
      <section className="section-light pt-32 pb-24">
        <div className="container-site">
          <motion.div {...fadeUp(0)} className="section-eyebrow">PRICING & ENQUIRY</motion.div>
          <motion.h1 {...fadeUp(0.08)} className="max-w-2xl">Let's look at your funnel together.</motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-body text-lg max-w-xl leading-relaxed mb-8">
            The first call is free. 30 minutes. We'll audit your current setup, give you one concrete recommendation, and tell you honestly if we're the right fit.
          </motion.p>
        </div>
      </section>

      {/* Module Builder */}
      <section className="section-off">
        <div className="container-site">
          <motion.div {...fadeUp(0)}>
            <div className="section-eyebrow">BUILD YOUR PACKAGE</div>
            <h2 className="mb-2">Pick what you need.</h2>
            <p className="text-body text-lg max-w-2xl leading-relaxed mb-8">
              Select the services that match your growth goals. Every engagement is scoped to your specific needs — no fixed prices, no unnecessary add-ons.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {MODULES.map((mod, i) => {
              const Icon = mod.icon;
              const isSelected = selectedModules.has(mod.id);
              return (
                <motion.button
                  key={mod.id}
                  type="button"
                  {...fadeUp(i * 0.04)}
                  onClick={() => toggleModule(mod.id)}
                  className={`relative flex items-start gap-3 p-4 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'border-primary bg-primary-light shadow-sm'
                      : 'border-border bg-white hover:border-primary/30 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-primary text-white' : 'bg-surface-off text-muted-foreground'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm">{mod.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{mod.desc}</div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Scope selectors */}
          {selectedModules.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-border space-y-4 mb-6"
            >
              <p className="text-sm font-display font-semibold">Scope your engagement</p>
              {hasAdsModule && (
                <div>
                  <Label htmlFor="adSpend">Monthly ad spend range</Label>
                  <select id="adSpend" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} className="input w-full">
                    <option value="">Select range</option>
                    <option value="under-1L">Under ₹1L/month</option>
                    <option value="1L-5L">₹1L–₹5L/month</option>
                    <option value="5L-plus">₹5L+/month</option>
                  </select>
                </div>
              )}
              <div>
                <Label htmlFor="channels">Channels to manage</Label>
                <select id="channels" value={channels} onChange={(e) => setChannels(e.target.value)} className="input w-full">
                  <option value="">Select</option>
                  <option value="1">1 channel</option>
                  <option value="2-3">2–3 channels</option>
                  <option value="4-plus">4+ channels</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timeline">Commitment timeline</Label>
                <select id="timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="input w-full">
                  <option value="">Select</option>
                  <option value="month-to-month">Month-to-month</option>
                  <option value="3-month">3 months</option>
                  <option value="6-month">6 months</option>
                </select>
              </div>
            </motion.div>
          )}

          <motion.p {...fadeUp(0.2)} className="text-center text-sm text-muted-foreground">
            {selectedModules.size > 0
              ? `${selectedModules.size} module${selectedModules.size > 1 ? 's' : ''} selected — share your details below and we'll send you a custom scope.`
              : 'Select the services you need above, then book a call or send us your requirements.'}
          </motion.p>
        </div>
      </section>

      {/* Booking Widget */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto">
            <h2 className="text-center mb-8">Book your free audit call</h2>

            {/* Google Calendar Embed */}
            <div className="border border-border rounded-xl overflow-hidden bg-white mb-8" style={{ minHeight: '650px', position: 'relative' }}>
              <div style={{ paddingBottom: '120%', height: 0 }}>
                <iframe
                  src={BOOKING_URL}
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                  loading="lazy"
                  title="Book a call with The Growth Bench"
                />
              </div>
            </div>

            {/* Enquiry form */}
            <div className="border-t border-border pt-8 mt-8">
              <p className="text-center text-sm text-muted-foreground mb-6">
                Or send us your requirements and we'll get back to you within 24 hours.
              </p>

              {/* Module summary */}
              {selectedModules.size > 0 && (
                <div className="max-w-lg mx-auto mb-6 p-4 bg-primary-light rounded-lg border border-primary/20">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Your package includes:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MODULES.filter((m) => selectedModules.has(m.id)).map((m) => (
                      <span key={m.id} className="text-xs bg-white px-2.5 py-1 rounded-full border border-primary/20 text-foreground">
                        {m.label}
                      </span>
                    ))}
                  </div>
                  {adSpend && <p className="text-xs text-muted-foreground mt-2">Ad spend: {adSpend}</p>}
                  {channels && <p className="text-xs text-muted-foreground">Channels: {channels}</p>}
                  {timeline && <p className="text-xs text-muted-foreground">Timeline: {timeline}</p>}
                </div>
              )}

              {submitted ? (
                <div className="text-center p-8 bg-primary-light rounded-lg">
                  <Check className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-display font-bold text-lg mb-2">We've got your message!</h3>
                  <p className="text-sm text-body">
                    You'll hear from us within 24 hours. If you'd rather not wait — email us directly at{' '}
                    <a href="mailto:hi@saswatasg.com" className="text-primary underline">hi@saswatasg.com</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                  <div>
                    <Label htmlFor="company">Company / Brand name *</Label>
                    <Input id="company" name="company" value={form.company} onChange={handleChange} placeholder="Your company name" required />
                  </div>
                  <div>
                    <Label htmlFor="revenue">Monthly revenue range</Label>
                    <select
                      id="revenue"
                      name="revenue"
                      value={form.revenue}
                      onChange={handleChange}
                      className="input w-full"
                    >
                      <option value="">Select a range</option>
                      <option value="under-10L">Under ₹10L/month</option>
                      <option value="10L-1Cr">₹10L–₹1Cr/month</option>
                      <option value="1Cr-plus">₹1Cr+/month</option>
                      <option value="not-sharing">Not comfortable sharing</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="challenge">What's the primary growth challenge right now? *</Label>
                    <Textarea id="challenge" name="challenge" value={form.challenge} onChange={handleChange} rows={3} placeholder="Tell us about your biggest growth bottleneck..." required />
                  </div>
                  <div>
                    <Label htmlFor="found">How did you find us?</Label>
                    <Input id="found" name="found" value={form.found} onChange={handleChange} placeholder="Google, LinkedIn, referral..." />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to our{' '}
                    <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
                    Your data is kept confidential and will only be used to follow up on your enquiry.
                  </p>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Get My Custom Quote \u2192'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What happens on the call */}
      <section className="section-off">
        <div className="container-site">
          <h2 className="mb-10">What happens on the call</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 'Step 1', title: 'You tell us about your business.', body: "Where you are, what you're trying to grow, what's not working. No prep needed — just talk us through it." },
              { step: 'Step 2', title: 'We diagnose live.', body: "We'll ask sharp questions and share what we're seeing. We usually spot 2–3 quick wins in the first 10 minutes." },
              { step: 'Step 3', title: 'We give you a recommendation.', body: "Even if we're not the right fit, you'll leave the call with at least one actionable thing to try. That's a promise." },
            ].map((s, i) => (
              <motion.div key={s.step} {...fadeUp(i * 0.1)} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-extrabold text-primary">{`0${i + 1}`}</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-body leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurances */}
      <section className="section-off">
        <div className="container-site">
          <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><span className="social-proof-dot" /> No retainer commitment to start</span>
            <span className="flex items-center gap-2"><span className="social-proof-dot" /> We'll tell you in 10 minutes if we can help</span>
            <span className="flex items-center gap-2"><span className="social-proof-dot" /> Most clients see a first result within 30 days</span>
          </motion.div>

          <div className="max-w-lg mx-auto mt-10 p-6 bg-surface-off rounded-lg border border-border">
            <p className="text-sm text-muted-foreground italic">
              To make the most of the call, it helps if you know: what your current monthly revenue roughly is, which channels you're currently using for growth, and what the biggest growth bottleneck feels like right now.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="section-light text-center pb-24">
        <div className="container-site">
          <p className="text-muted-foreground mb-4">Prefer to chat right away?</p>
          <Button asChild variant="outline">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
              Message us on WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default WorkWithUs;
