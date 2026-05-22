import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Search, Target, Globe, Share2, TrendingUp, Code2, Palette, Users, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const MODULES = [
  { id: 'strategy', label: 'Strategy & Audit', icon: Search },
  { id: 'meta-ads', label: 'Meta Ads', icon: Target },
  { id: 'google-ads', label: 'Google Ads', icon: Globe },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'cro', label: 'CRO & Experimentation', icon: TrendingUp },
  { id: 'web-dev', label: 'Website & Development', icon: Code2 },
  { id: 'ui-ux', label: 'UI/UX Design', icon: Palette },
  { id: 'lead-systems', label: 'Lead Systems & CRM', icon: Users },
  { id: 'content', label: 'Content & Email Marketing', icon: FileText },
  { id: 'analytics', label: 'Analytics & Reporting', icon: BarChart3 },
];

const WorkWithUs = () => {
  const [selectedModules, setSelectedModules] = useState(new Set());
  const [form, setForm] = useState({ name: '', email: '', company: '', challenge: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { openBookingModal } = useBookingModal();

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
          subject: 'New pricing enquiry from The Growth Bench',
          name: form.name,
          email: form.email,
          company: form.company,
          challenge: form.challenge,
          selected_modules: [...selectedModules].join(', ') || 'None selected',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success('Details sent! Now pick a time for your free call.');
      } else {
        toast.error('Something went wrong. Please email us at hi@saswatasg.com.');
      }
    } catch {
      toast.error('Network error. Please email us at hi@saswatasg.com.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <PageMeta />

      <section className="section-light pt-28 pb-20">
        <div className="container-site max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="section-eyebrow">GET STARTED</div>
            <h1 className="mb-4">Let's look at your funnel together.</h1>
            <p className="text-body text-lg leading-relaxed max-w-xl mx-auto">
              Free 30-minute audit call. We'll look at your setup, give you one concrete
              recommendation, and tell you honestly if we're the right fit.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-off pb-24">
        <div className="container-site max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {!submitted ? (
              <>
                <div className="mb-8">
                  <p className="text-sm font-display font-semibold mb-3">What do you need?</p>
                  <div className="flex flex-wrap gap-2">
                    {MODULES.map((mod) => {
                      const Icon = mod.icon;
                      const isSelected = selectedModules.has(mod.id);
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => toggleModule(mod.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all border ${
                            isSelected
                              ? 'border-primary bg-primary text-white'
                              : 'border-border bg-white hover:border-primary/30 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {mod.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm font-display font-semibold">Your details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name *"
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      required
                    />
                    <Input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company / Brand *"
                      required
                      className="sm:col-span-2"
                    />
                    <Textarea
                      name="challenge"
                      value={form.challenge}
                      onChange={handleChange}
                      rows={3}
                      placeholder="What's the biggest growth challenge right now? *"
                      required
                      className="sm:col-span-2"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to our{' '}
                    <a href="/privacy" className="underline hover:text-foreground">
                      Privacy Policy
                    </a>.
                  </p>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send & Book Your Free Call \u2192'}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">You're on the list.</h2>
                <p className="text-body mb-6">Now pick a time for your free audit call.</p>
                <Button onClick={openBookingModal}>
                  Book Your Free Call \u2192
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Or email us directly at{' '}
                  <a href="mailto:hi@saswatasg.com" className="text-primary underline">
                    hi@saswatasg.com
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="section-light pb-24">
        <div className="container-site">
          <h2 className="text-center mb-10">What happens on the call</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'You tell us about your business.', body: "Where you are, what you're trying to grow, what's not working." },
              { step: '02', title: 'We diagnose live.', body: "We'll ask sharp questions and share what we're seeing — we usually spot quick wins in 10 minutes." },
              { step: '03', title: 'We get you a clear next step.', body: "Even if we're not the right fit, you'll leave with at least one actionable thing to try." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-3">
                  <span className="font-display font-extrabold text-primary">{s.step}</span>
                </div>
                <h3 className="font-display font-bold mb-1">{s.title}</h3>
                <p className="text-sm text-body leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-off text-center pb-24">
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
