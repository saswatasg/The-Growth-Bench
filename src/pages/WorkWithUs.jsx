import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import PageMeta from '@/components/PageMeta';
import { BOOKING_URL, WHATSAPP_URL } from '@/lib/constants';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

const WorkWithUs = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: '', challenge: '', found: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          subject: 'New enquiry from The Growth Bench website',
          name: form.name,
          email: form.email,
          company: form.company,
          revenue: form.revenue,
          challenge: form.challenge,
          found: form.found,
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
          <motion.div {...fadeUp(0)} className="section-eyebrow">WORK WITH US</motion.div>
          <motion.h1 {...fadeUp(0.08)} className="max-w-2xl">Let's look at your funnel together.</motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-body text-lg max-w-xl leading-relaxed mb-8">
            The first call is free. 30 minutes. We'll audit your current setup, give you one concrete recommendation, and tell you honestly if we're the right fit.
          </motion.p>
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

      {/* Booking Widget */}
      <section className="section-light">
        <div className="container-site">
          <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto">
            <h2 className="text-center mb-8">Book your free audit call</h2>

            {/* Google Calendar Embed */}
            <div className="border border-border rounded-xl overflow-hidden bg-white mb-8" style={{ minHeight: '650px', position: 'relative' }}>
              <div style={{ paddingBottom: '120%', height: 0 }}>
                <iframe
                  src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                  loading="lazy"
                  title="Book a call with The Growth Bench"
                />
              </div>
            </div>

            {/* Fallback form */}
            <div className="border-t border-border pt-8 mt-8">
              <p className="text-center text-sm text-muted-foreground mb-6">
                Having trouble booking? Send us a message and we'll get back to you within 24 hours.
              </p>
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
                    {submitting ? 'Sending...' : 'Book a Call \u2192'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
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
