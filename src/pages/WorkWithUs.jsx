import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Search, Target, TrendingUp, Code2, Palette, Users, FileText, BarChart3, Sparkles, Zap, MessageSquare, Workflow } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import PageMeta from '@/components/PageMeta';
import CtaPaths from '@/components/CtaPaths';
import { useBookingModal } from '@/context/BookingModalContext';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const MODULES = [
  { id: 'ai-implementation', label: 'AI Implementation', icon: Workflow },
  { id: 'strategy', label: 'Strategy & Audit', icon: Search },
  { id: 'ads', label: 'Ads', icon: Target },
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

  const faqItems = [
    { q: 'How much does it cost?', a: 'Scoped after a free 30-minute audit — no public pricing, no retainer commitment upfront. Fixed-timeline scope based on your funnel.' },
    { q: 'How does onboarding work?', a: 'Audit, scoped plan, kickoff + access, first deliverables within week one, strategy doc by day 14.' },
    { q: 'How soon do results show?', a: 'First meaningful improvement in 30–60 days, quick wins in the first two weeks.' },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

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
        openBookingModal();
      } else {
        toast.error('Something went wrong. Please email us at hello@thegrowthbench.com.');
      }
    } catch {
      toast.error('Network error. Please email us at hello@thegrowthbench.com.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <PageMeta />
      <Helmet>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Helmet>

      <section className="bg-canvas dark:bg-ink py-section-lg border-b border-hairline-soft dark:border-charcoal">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider">No Commitment. Just Clarity.</span>
            <h1 className="font-display text-display-md md:text-display-lg text-ink dark:text-canvas mt-2 leading-none">
              Get a free 30-min<br />audit of your funnel.
            </h1>
            <p className="text-body-md text-mute dark:text-stone mt-4 max-w-lg leading-relaxed">
              Pick the areas you need help with, tell us about your business, and we'll diagnose your funnel — no pitch, no pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft-cloud dark:bg-charcoal py-section-lg">
        <div className="container-site max-w-2xl mx-auto">
          {!submitted ? (
            <>
              <div className="flex items-center gap-3 mb-10">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-caption-sm font-bold ${
                      step === s ? 'bg-ink text-canvas dark:bg-accent dark:text-ink' : step > s ? 'bg-ink/20 text-ink dark:bg-accent/20 dark:text-accent' : 'bg-canvas text-mute border border-hairline dark:bg-ink dark:text-stone dark:border-charcoal'
                    }`}>
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && <div className={`w-12 h-px ${step > s ? 'bg-ink dark:bg-accent' : 'bg-hairline dark:bg-charcoal'}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <p className="text-heading-md text-ink dark:text-canvas mb-4">What do you need help with?</p>
                  <p className="text-caption-sm text-mute dark:text-stone mb-4">
                    Not sure?{' '}
                    <Link to="/ai-scorecard" className="text-ink dark:text-accent underline underline-offset-2">
                      Take the 60-second AI scorecard first
                    </Link>
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {MODULES.map((mod) => {
                      const Icon = mod.icon;
                      const isSelected = selectedModules.has(mod.id);
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => toggleModule(mod.id)}
                          aria-pressed={isSelected}
                          className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-button-sm rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 dark:focus-visible:ring-accent/40 ${
                            isSelected ? 'border-ink bg-ink text-canvas dark:border-accent dark:bg-accent dark:text-ink' : 'border-hairline bg-canvas text-mute hover:border-ink hover:text-ink dark:border-charcoal dark:bg-ink dark:text-stone dark:hover:border-canvas dark:hover:text-canvas'
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
                    <p className="text-caption-sm text-mute dark:text-stone">Selected: {[...selectedModules].join(', ')}</p>
                    <button onClick={() => goStep(1)} className="text-caption-sm text-ink dark:text-accent underline underline-offset-2">Change</button>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); goStep(3); }} className="space-y-4">
                    <p className="text-heading-md text-ink dark:text-canvas">Your details</p>
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
                  <div className="bg-canvas dark:bg-ink border border-hairline-soft dark:border-charcoal p-6 mb-6 space-y-3">
                    <div>
                      <span className="text-caption-sm text-mute dark:text-stone uppercase">Modules</span>
                      <p className="text-body-sm font-medium text-ink dark:text-canvas mt-0.5">{[...selectedModules].join(', ')}</p>
                    </div>
                    <div className="h-px bg-hairline-soft dark:bg-charcoal" />
                    <div>
                      <span className="text-caption-sm text-mute dark:text-stone uppercase">Name</span>
                      <p className="text-body-sm font-medium text-ink dark:text-canvas mt-0.5">{form.name}</p>
                    </div>
                    <div>
                      <span className="text-caption-sm text-mute dark:text-stone uppercase">Email</span>
                      <p className="text-body-sm font-medium text-ink dark:text-canvas mt-0.5">{form.email}</p>
                    </div>
                    <div>
                      <span className="text-caption-sm text-mute dark:text-stone uppercase">Company</span>
                      <p className="text-body-sm font-medium text-ink dark:text-canvas mt-0.5">{form.company}</p>
                    </div>
                    <div>
                      <span className="text-caption-sm text-mute dark:text-stone uppercase">Challenge</span>
                      <p className="text-body-sm text-mute dark:text-stone mt-0.5">{form.challenge}</p>
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
              <div className="w-14 h-14 rounded-full bg-ink dark:bg-accent flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7 text-canvas dark:text-ink" />
              </div>
              <h2 className="font-display text-heading-xl text-ink dark:text-canvas mb-2">You're on the list.</h2>
              <p className="text-body-md text-mute dark:text-stone mb-8">Now pick a time for your free 30-minute call.</p>
              <Button onClick={openBookingModal} size="lg">
                Book Your Free Call &rarr;
              </Button>
              <p className="text-caption-sm text-mute dark:text-stone mt-6">
                Prefer email? <a href="mailto:hello@thegrowthbench.com" className="text-ink dark:text-accent underline">hello@thegrowthbench.com</a>
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-canvas dark:bg-ink py-section-lg border-b border-hairline-soft dark:border-charcoal">
        <div className="container-site">
          <h2 className="font-display text-display-md text-ink dark:text-canvas text-center leading-none mb-12">What happens on the call</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-soft-cloud dark:bg-charcoal border border-hairline-soft dark:border-ash flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-ink dark:text-canvas" />
                  </div>
                  <h3 className="text-heading-md text-ink dark:text-canvas mb-2">{s.title}</h3>
                  <p className="text-body-sm text-mute dark:text-stone leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-canvas dark:bg-ink py-section-lg border-b border-hairline-soft dark:border-charcoal">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider">Questions, answered</span>
            <h2 className="font-display text-display-md text-ink dark:text-canvas mt-2 leading-none">What founders ask first.</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {faqItems.map((item) => (
                <div key={item.q}>
                  <h3 className="text-heading-md text-ink dark:text-canvas mb-2">{item.q}</h3>
                  <p className="text-body-sm text-mute dark:text-stone leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft-cloud dark:bg-charcoal py-section-lg text-center">
        <div className="container-site">
          <div className="max-w-xl mx-auto">
            <p className="text-body-sm text-mute dark:text-stone mb-6">Three ways in — pick yours.</p>
            <CtaPaths tone="light" />
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkWithUs;
