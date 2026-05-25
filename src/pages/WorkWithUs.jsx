import React, { useState } from 'react';
import { ArrowRight, Check, Search, Target, Globe, Share2, TrendingUp, Code2, Palette, Users, FileText, BarChart3, Sparkles, Zap, MessageSquare, Phone } from 'lucide-react';
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
  { id: 'cro', label: 'CRO', icon: TrendingUp },
  { id: 'web-dev', label: 'Website & Development', icon: Code2 },
  { id: 'ui-ux', label: 'UI/UX Design', icon: Palette },
  { id: 'lead-systems', label: 'Lead Systems', icon: Users },
  { id: 'content', label: 'Content & Email', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const STEPS = [
  { icon: MessageSquare, title: 'You tell us your story', body: 'Where your business is, what you want to grow, and what\'s been standing in the way.' },
  { icon: Zap, title: 'We diagnose live', body: 'We ask sharp questions and share what we\'re seeing — we usually spot quick wins in 10 minutes.' },
  { icon: Sparkles, title: 'You get a clear next step', body: 'Even if we\'re not the right fit, you\'ll leave with at least one concrete thing to try.' },
];

const WorkWithUs = () => {
  const [step, setStep] = useState(1);
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

  const goStep = (s) => {
    if (s === 2 && selectedModules.size === 0) {
      toast.error('Pick at least one area you need help with');
      return;
    }
    setStep(s);
  };

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
          subject: 'New enquiry from The Growth Bench',
          name: form.name,
          email: form.email,
          company: form.company,
          challenge: form.challenge,
          selected_modules: [...selectedModules].join(', '),
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

      <section className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute uppercase tracking-wider">No Commitment. Just Clarity.</span>
            <h1 className="font-display text-display-md text-ink mt-2 leading-none">
              Get a free 30-min<br />audit of your funnel.
            </h1>
            <p className="text-body-md text-mute mt-4 max-w-lg leading-relaxed">
              Pick the areas you need help with, tell us about your business, and we'll diagnose your funnel — no pitch, no pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft-cloud py-section-lg">
        <div className="container-site max-w-2xl mx-auto">
          {!submitted ? (
            <>
              <div className="flex items-center gap-3 mb-10">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-caption-sm font-bold ${
                      step === s ? 'bg-ink text-canvas' : step > s ? 'bg-ink/20 text-ink' : 'bg-canvas text-mute border border-hairline'
                    }`}>
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && <div className={`w-12 h-px ${step > s ? 'bg-ink' : 'bg-hairline'}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <p className="text-heading-md text-ink mb-4">What do you need help with?</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {MODULES.map((mod) => {
                      const Icon = mod.icon;
                      const isSelected = selectedModules.has(mod.id);
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => toggleModule(mod.id)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 text-button-sm rounded-full border transition-colors ${
                            isSelected ? 'border-ink bg-ink text-canvas' : 'border-hairline bg-canvas text-mute hover:border-ink hover:text-ink'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {mod.label}
                        </button>
                      );
                    })}
                  </div>
                  <Button onClick={() => goStep(2)} disabled={selectedModules.size === 0} size="lg">
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-4">
                    <p className="text-caption-sm text-mute">Selected: {[...selectedModules].join(', ')}</p>
                    <button onClick={() => goStep(1)} className="text-caption-sm text-ink underline underline-offset-2">Change</button>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); goStep(3); }} className="space-y-4">
                    <p className="text-heading-md text-ink">Your details</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input name="name" value={form.name} onChange={handleChange} placeholder="Name *" required />
                      <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required />
                      <Input name="company" value={form.company} onChange={handleChange} placeholder="Company / Brand *" required className="sm:col-span-2" />
                      <Textarea name="challenge" value={form.challenge} onChange={handleChange} rows={3} placeholder="What's the biggest growth challenge right now? *" required className="sm:col-span-2" />
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <Button type="button" variant="outline" onClick={() => goStep(1)}>Back</Button>
                      <Button type="submit">Review & Submit <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="bg-canvas border border-hairline-soft p-6 mb-6 space-y-3">
                    <div>
                      <span className="text-caption-sm text-mute uppercase">Modules</span>
                      <p className="text-body-sm font-medium text-ink mt-0.5">{[...selectedModules].join(', ')}</p>
                    </div>
                    <div className="h-px bg-hairline-soft" />
                    <div>
                      <span className="text-caption-sm text-mute uppercase">Name</span>
                      <p className="text-body-sm font-medium text-ink mt-0.5">{form.name}</p>
                    </div>
                    <div>
                      <span className="text-caption-sm text-mute uppercase">Email</span>
                      <p className="text-body-sm font-medium text-ink mt-0.5">{form.email}</p>
                    </div>
                    <div>
                      <span className="text-caption-sm text-mute uppercase">Company</span>
                      <p className="text-body-sm font-medium text-ink mt-0.5">{form.company}</p>
                    </div>
                    <div>
                      <span className="text-caption-sm text-mute uppercase">Challenge</span>
                      <p className="text-body-sm text-mute mt-0.5">{form.challenge}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => goStep(2)}>Back</Button>
                    <Button onClick={handleSubmit} disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send & Book Call \u2192'}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7 text-canvas" />
              </div>
              <h2 className="font-display text-heading-xl text-ink mb-2">You're on the list.</h2>
              <p className="text-body-md text-mute mb-8">Now pick a time for your free 30-minute call.</p>
              <Button onClick={openBookingModal} size="lg">
                Book Your Free Call &rarr;
              </Button>
              <p className="text-caption-sm text-mute mt-6">
                Prefer email? <a href="mailto:hi@saswatasg.com" className="text-ink underline">hi@saswatasg.com</a>
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-canvas py-section-lg border-b border-hairline-soft">
        <div className="container-site">
          <h2 className="font-display text-display-md text-ink text-center leading-none mb-12">What happens on the call</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-ink" />
                  </div>
                  <h3 className="text-heading-md text-ink mb-2">{s.title}</h3>
                  <p className="text-body-sm text-mute leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-soft-cloud py-section-lg text-center">
        <div className="container-site">
          <div className="max-w-md mx-auto">
            <p className="text-body-sm text-mute mb-4">Prefer to chat right away?</p>
            <Button asChild variant="outline" size="lg">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
                Message us on WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkWithUs;
