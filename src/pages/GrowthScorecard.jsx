import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp, ShoppingCart, Users, BarChart3, Target, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';
import { fadeUp, fadeIn } from '@/lib/motion';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const NODES = {
  q1: {
    arm: null,
    q: 'Where does most of your traffic come from?',
    hint: 'Pick the channel that drives the most visitors right now.',
    options: [
      { label: 'Meta (Facebook / Instagram) Ads', icon: Target, points: 0, next: 'A1', arm: 'acquisition' },
      { label: 'Google Ads / SEO', icon: Search, points: 0, next: 'B1', arm: 'conversion' },
      { label: 'WhatsApp / Email / Repeat customers', icon: Mail, points: 0, next: 'C1', arm: 'retention' },
      { label: 'Not sure / No tracking', icon: BarChart3, points: 0, next: 'D1', arm: 'analytics' },
    ],
  },
  // ---- ACQUISITION arm ----
  A1: {
    arm: 'acquisition',
    q: 'What\'s your current ROAS on paid ads?',
    options: [
      { label: 'Below 1x (losing money)', points: 3, next: 'A2', lever: 'Full-funnel ad audit + landing page rebuild' },
      { label: '1x – 2x (break-even)', points: 2, next: 'A2', lever: 'Audience architecture + creative testing' },
      { label: '2x – 4x (profitable)', points: 1, next: 'A2' },
      { label: '4x+ (strong)', points: 0, next: 'A2' },
    ],
  },
  A2: {
    arm: 'acquisition',
    q: 'How do you track which ads actually drive sales?',
    options: [
      { label: 'We don\'t — no pixel or CAPI', points: 3, next: 'FIT', lever: 'Meta CAPI + GA4 attribution setup' },
      { label: 'Pixel only, no server-side', points: 2, next: 'FIT', lever: 'Server-side CAPI + UTM governance' },
      { label: 'Full tracking (pixel + CAPI + GA4)', points: 0, next: 'FIT' },
    ],
  },
  // ---- CONVERSION arm ----
  B1: {
    arm: 'conversion',
    q: 'What\'s your website conversion rate?',
    options: [
      { label: 'Below 1%', points: 3, next: 'B2', lever: 'CRO audit + checkout flow rebuild' },
      { label: '1% – 2%', points: 2, next: 'B2', lever: 'Landing page optimisation + trust signals' },
      { label: '2% – 4%', points: 1, next: 'B2' },
      { label: '4%+ (strong)', points: 0, next: 'B2' },
    ],
  },
  B2: {
    arm: 'conversion',
    q: 'How many steps in your checkout?',
    options: [
      { label: '4+ steps with account creation forced', points: 3, next: 'FIT', lever: 'Guest checkout + 2-step flow' },
      { label: '3 steps, guest checkout available', points: 1, next: 'FIT' },
      { label: '1–2 steps, streamlined', points: 0, next: 'FIT' },
    ],
  },
  // ---- RETENTION arm ----
  C1: {
    arm: 'retention',
    q: 'What % of your revenue comes from repeat customers?',
    options: [
      { label: 'Under 10%', points: 3, next: 'C2', lever: 'Post-purchase + WhatsApp nurture flows' },
      { label: '10% – 25%', points: 2, next: 'C2', lever: 'Review automation + loyalty sequences' },
      { label: '25% – 40%', points: 1, next: 'C2' },
      { label: '40%+ (strong)', points: 0, next: 'C2' },
    ],
  },
  C2: {
    arm: 'retention',
    q: 'Do you have automated post-purchase sequences?',
    options: [
      { label: 'No — we send manual emails sometimes', points: 3, next: 'FIT', lever: 'Full lifecycle automation (WhatsApp + email)' },
      { label: 'Basic email only (1–2 emails)', points: 2, next: 'FIT', lever: 'WhatsApp + multi-touch nurture' },
      { label: 'Full flows (email + WhatsApp)', points: 0, next: 'FIT' },
    ],
  },
  // ---- ANALYTICS arm ----
  D1: {
    arm: 'analytics',
    q: 'How complete is your tracking setup?',
    options: [
      { label: 'No GA4 / no events / no dashboards', points: 3, next: 'D2', lever: 'Full GA4 + GTM + dashboard build' },
      { label: 'Basic GA4, no custom events', points: 2, next: 'D2', lever: 'Custom event tracking + attribution cleanup' },
      { label: 'GA4 + custom events, no dashboard', points: 1, next: 'D2' },
      { label: 'Full setup with dashboard', points: 0, next: 'D2' },
    ],
  },
  D2: {
    arm: 'analytics',
    q: 'Can you tell which channel drives the most revenue?',
    options: [
      { label: 'No idea — numbers conflict', points: 3, next: 'FIT', lever: 'UTM governance + source/medium cleanup' },
      { label: 'Roughly, but not confident', points: 2, next: 'FIT' },
      { label: 'Yes — clear attribution', points: 0, next: 'FIT' },
    ],
  },
  FIT: {
    arm: null,
    q: 'Monthly revenue band?',
    options: [
      { label: 'Under ₹10L', points: 0, next: 'RESULT' },
      { label: '₹10L – ₹1Cr', points: 1, next: 'RESULT' },
      { label: '₹1Cr – ₹10Cr', points: 1, next: 'RESULT' },
      { label: '₹10Cr+', points: 1, next: 'RESULT' },
    ],
  },
};

const TIER_COPY = {
  hot: {
    headline: 'Major leaks found.',
    sub: 'Your funnel has clear, fixable gaps that are costing real revenue every month. The good news: these are the exact problems we solve.',
  },
  warm: {
    headline: 'Room to optimise.',
    sub: 'Your foundations are solid but there are compounding gains waiting. A structured experiment programme would move the needle fast.',
  },
  cold: {
    headline: 'Strong fundamentals.',
    sub: 'Your funnel is in good shape. The next gains come from scaling what works and automating the manual bits.',
  },
};

const SEQUENCE = {
  acquisition: ['Audit ad accounts + fix tracking gaps', 'Rebuild landing pages + test new audiences', 'Scale winning campaigns + add retargeting'],
  conversion: ['Fix checkout flow + mobile UX', 'A/B test key pages (PDP, cart, checkout)', 'Implement heatmap + session recording loop'],
  retention: ['Set up post-purchase + cart recovery flows', 'Launch review + UGC automation', 'Build loyalty + referral programme'],
  analytics: ['GA4 + GTM full implementation', 'Build attribution dashboard + UTM governance', 'Monthly reporting cadence tied to experiments'],
};

const BENCH = {
  acquisition: 'Industry average ROAS: 2–4x for D2C. Top performers hit 5–7x with full-funnel creative + proper attribution.',
  conversion: 'Average e-commerce conversion: 1.5–3%. Top D2C brands: 4–6%. Checkout abandonment alone costs most stores 20–30% of revenue.',
  retention: 'Repeat customers spend 67% more than new ones. WhatsApp cart recovery: 18–23% vs 5–8% email (Chatarmin 2026, 450+ brands).',
  analytics: 'Brands with proper attribution spend 20–30% less on CAC because they know which channels actually drive revenue.',
};

const tierFor = (pct) => {
  if (pct >= 65) return 'hot';
  if (pct >= 35) return 'warm';
  return 'cold';
};

const fmtIN = (n) => Math.round(n).toLocaleString('en-IN');

const GrowthScorecard = () => {
  const { openBookingModal } = useBookingModal();
  const [step, setStep] = useState('hook');
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [arm, setArm] = useState(null);
  const [email, setEmail] = useState('');
  const [skipped, setSkipped] = useState(false);
  const [gateError, setGateError] = useState('');
  const [displayPct, setDisplayPct] = useState(0);
  const gatedRef = useRef(false);
  const pendingRef = useRef(null);
  const resultSent = useRef(false);

  const answeredCount = Object.keys(answers).length;

  const postLead = async (payload) => {
    if (!WEB3FORMS_KEY) return;
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'New growth scorecard lead', ...payload }),
      });
    } catch {}
  };

  const goBack = () => {
    const h = [...history];
    const prev = h.pop();
    setHistory(h);
    setStep(prev || 'hook');
  };

  const answer = (nodeId, optIdx) => {
    const node = NODES[nodeId];
    const opt = node.options[optIdx];
    const next = { ...answers, [nodeId]: optIdx };
    setAnswers(next);
    if (opt.arm) setArm(opt.arm);
    const rawDest = typeof opt.next === 'function' ? opt.next(next) : opt.next;

    if (rawDest === 'FIT' && !gatedRef.current && answeredCount >= 1) {
      pendingRef.current = { nodeId, optIdx, dest: 'FIT' };
      setStep('gate');
      return;
    }

    let dest = rawDest === 'RESULT' ? 'result' : rawDest;
    setHistory([...history, nodeId]);
    setStep(dest);
  };

  const skipGate = () => {
    setSkipped(true);
    if (pendingRef.current) {
      setHistory([...history, pendingRef.current.nodeId]);
      setStep(pendingRef.current.dest === 'FIT' ? 'fit' : pendingRef.current.dest);
      pendingRef.current = null;
    }
  };

  const submitGate = (e) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setGateError('Enter a valid email.');
      return;
    }
    setGateError('');
    gatedRef.current = true;
    postLead({ email, answers, arm, stage: 'gate' });
    if (pendingRef.current) {
      setHistory([...history, pendingRef.current.nodeId]);
      setStep('fit');
      pendingRef.current = null;
    }
  };

  const retake = () => {
    setStep('hook');
    setHistory([]);
    setAnswers({});
    setArm(null);
    setEmail('');
    setSkipped(false);
    gatedRef.current = false;
    pendingRef.current = null;
    resultSent.current = false;
    setDisplayPct(0);
  };

  useEffect(() => {
    if (step !== 'fit' || step === 'result') return;
    setHistory([...history, 'fit']);
    setStep('result');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && step !== 'hook' && step !== 'result') goBack();
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4 && NODES[step] && document.activeElement?.tagName !== 'INPUT') {
        const opts = NODES[step].options;
        if (opts[n - 1]) answer(step, n - 1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const isResult = step === 'result';
  const node = NODES[step];

  const earned = Object.entries(answers).reduce(
    (s, [id, idx]) => s + (NODES[id] ? NODES[id].options[idx].points : 0), 0
  );
  const max = Object.keys(answers).reduce(
    (s, id) => s + (NODES[id] ? Math.max(...NODES[id].options.map((o) => o.points)) : 0), 0
  );
  const pct = max > 0 ? Math.round((earned / max) * 100) : 0;
  const tier = tierFor(pct);

  const topLevers = Object.entries(answers)
    .filter(([id]) => NODES[id])
    .map(([id, idx]) => ({ lever: NODES[id].options[idx].lever, points: NODES[id].options[idx].points }))
    .filter((x) => x.lever && x.points >= 2)
    .sort((a, b) => b.points - a.points)
    .map((x) => x.lever)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(0, 2);

  const recallNode = arm === 'acquisition' ? 'A1' : arm === 'conversion' ? 'B1' : arm === 'retention' ? 'C1' : arm === 'analytics' ? 'D1' : null;
  const recall =
    arm && recallNode && answers[recallNode] != null
      ? `You said ${NODES.q1.options.find((o) => o.arm === arm).label.toLowerCase()} — ${NODES[recallNode].options[answers[recallNode]].label.toLowerCase()}.`
      : null;

  useEffect(() => {
    if (!isResult || resultSent.current) return;
    resultSent.current = true;
    postLead({ email: email || '(skipped)', answers, arm, scorePct: pct, tier, skipped, stage: 'complete' });
    const t0 = Date.now();
    const timer = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / 1000);
      setDisplayPct(Math.round(pct * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResult]);

  const waScore = encodeURIComponent(
    `Hi! I took the Growth Audit Scorecard: ${pct}% (${tier}). Can we talk about what to fix first?`
  );

  const progress = Math.min(100, Math.round((answeredCount / 5) * 100));

  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-[80px] md:py-[100px] overflow-x-clip">
        <div className="container-site max-w-2xl mx-auto">
          {step !== 'hook' && !isResult && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-caption-sm text-mute">
                  {answeredCount} answered · about a minute
                </span>
                <span className="text-caption-sm text-mute font-mono">{progress}%</span>
              </div>
              <div className="h-1 bg-hairline-soft rounded-full overflow-hidden">
                <div className="h-full bg-ink transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {step === 'hook' && (
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center mx-auto mb-6">
                      <TrendingUp className="w-7 h-7 text-canvas" />
                    </div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Free · About a minute · Instant readout</span>
                    <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
                      Where is your growth<br />funnel leaking?
                    </h1>
                    <p className="text-body-md text-mute mt-6 max-w-xl mx-auto leading-relaxed">
                      A few taps about your funnel. We&apos;ll score your growth health and show you the highest-impact fixes —
                      acquisition, conversion, retention, analytics — with a prioritised action list.
                    </p>
                    <Button size="lg" className="mt-8" onClick={() => { setHistory([...history, step]); setStep('q1'); }}>
                      Start the scorecard <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-caption-sm text-mute mt-4">No signup. No pitch. Just your number.</p>
                  </div>
                )}

                {node && (
                  <QuestionStep
                    nodeId={step}
                    node={node}
                    selected={answers[step]}
                    onPick={(optIdx) => answer(step, optIdx)}
                    onBack={goBack}
                  />
                )}

                {step === 'gate' && (
                  <div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Almost there — you&apos;re almost done</span>
                    <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Where should we send your readout?</h2>
                    <p className="text-body-md text-mute mt-4 leading-relaxed">
                      Your growth score, priority fixes, and a 90-day roadmap. One email, no sequence, no spam.
                    </p>
                    <form onSubmit={submitGate} className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@yourbrand.com"
                        aria-label="Email address"
                        className="flex-1"
                      />
                      <Button type="submit" size="lg">Send my readout <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </form>
                    {gateError && <p className="text-body-sm text-sale mt-3">{gateError}</p>}
                    <div className="flex items-center gap-4 mt-4">
                      <button onClick={goBack} className="inline-flex items-center gap-1 text-caption-sm text-mute hover:text-ink transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      <button onClick={skipGate} className="text-caption-sm text-ink underline underline-offset-2">
                        Just show me — skip
                      </button>
                    </div>
                  </div>
                )}

                {isResult && (
                  <ResultStep
                    pct={pct}
                    displayPct={displayPct}
                    tier={tier}
                    levers={topLevers}
                    recall={recall}
                    arm={arm}
                    waScore={waScore}
                    openBookingModal={openBookingModal}
                    onRetake={retake}
                    skipped={skipped}
                    postLead={postLead}
                    mailCtx={{ answers, arm, scorePct: pct, tier, skipped: false, stage: 'result-capture' }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-soft-cloud py-[80px] md:py-[100px]">
        <div className="container-site max-w-2xl mx-auto text-center">
          <h2 className="font-display text-display-md text-ink leading-none">What the readout is based on</h2>
          <p className="text-body-md text-mute mt-4 leading-relaxed">
            Real funnel economics: average D2C conversion 1.5–3%, top performers 4–6%. WhatsApp cart recovery
            18–23% vs 5–8% email. Repeat customers spend 67% more. Category benchmarks — <Link to="/services" className="text-ink underline underline-offset-2">see the systems</Link>.
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="bg-ink py-[100px] md:py-[120px] text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-display text-display-md text-canvas leading-none mb-6">
            Want it exact, not<br />directional?
          </h2>
          <p className="text-body-md text-stone leading-relaxed mb-8 max-w-lg mx-auto">
            The scorecard points at the leak. The free audit call measures it — one concrete recommendation, no pitch.
          </p>
          <Button size="lg" className="bg-canvas text-ink hover:bg-soft-cloud" onClick={openBookingModal}>
            Book a Free Audit Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.section>
    </>
  );
};

const QuestionStep = ({ nodeId, node, selected, onPick, onBack }) => (
  <div>
    <h2 className="font-display text-heading-xl md:text-display-md text-ink leading-none max-w-xl">{node.q}</h2>
    {node.hint && <p className="text-body-sm text-mute mt-3">{node.hint}</p>}
    <div className="grid gap-3 mt-8">
      {node.options.map((opt, i) => {
        const Icon = opt.icon;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onPick(i)}
            aria-pressed={selected === i}
            className={`text-left px-5 py-4 rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 flex items-center gap-3 ${
              selected === i
                ? 'border-ink bg-ink text-canvas'
                : 'border-hairline bg-canvas text-ink hover:border-ink/40'
            }`}
          >
            {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
            <span className="text-body-md font-medium">{opt.label}</span>
            <span className="ml-auto text-caption-sm opacity-40 font-mono hidden sm:inline">{i + 1}</span>
          </button>
        );
      })}
    </div>
    <p className="text-caption-sm text-mute mt-4 hidden md:block">Tip: press 1–{node.options.length} to answer instantly.</p>
    <button onClick={onBack} className="inline-flex items-center gap-1 text-caption-sm text-mute hover:text-ink transition-colors mt-2">
      <ArrowLeft className="w-3.5 h-3.5" /> Back
    </button>
  </div>
);

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      aria-live="polite"
      className="text-caption-sm text-ink underline underline-offset-2 hover:text-mute transition-colors"
    >
      {copied ? 'Copied — share it anywhere' : 'Copy my readout'}
    </button>
  );
};

const EmailCapture = ({ postLead, mailCtx }) => {
  const [em, setEm] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!em || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) {
      setErr('Enter a valid email.');
      return;
    }
    setErr('');
    postLead({ email: em, ...mailCtx });
    setDone(true);
  };
  if (done) return <p className="text-caption-sm text-success">Readout on its way — check your inbox.</p>;
  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 items-center justify-center">
      <Input
        type="email"
        value={em}
        onChange={(e) => setEm(e.target.value)}
        placeholder="you@yourbrand.com"
        aria-label="Email address for readout"
        className="sm:max-w-xs"
      />
      <Button type="submit" variant="outline">Email me this readout</Button>
    </form>
  );
};

const ResultStep = ({ pct, displayPct, tier, levers, recall, arm, waScore, openBookingModal, onRetake, skipped, postLead, mailCtx }) => {
  const copy = TIER_COPY[tier];
  const seq = SEQUENCE[arm] || SEQUENCE.acquisition;
  const shownLevers = tier === 'cold' ? (levers.length ? levers.slice(0, 1) : ['Fix tracking + attribution']) : levers;
  const leverTitle = tier === 'cold' ? 'Quick win to start' : 'Fix first → next';

  return (
    <div className="text-center">
      <span className="text-label-xs text-mute uppercase tracking-wider">Your Growth Health</span>
      <div className="font-display text-display-md md:text-display-xl text-ink leading-none mt-2">
        {displayPct}<span className="text-stone">%</span>
      </div>
      <h2 className="font-display text-display-md text-ink mt-4 leading-none">{copy.headline}</h2>
      <p className="text-body-md text-mute mt-4 max-w-xl mx-auto leading-relaxed">{copy.sub}</p>
      {recall && <p className="text-caption-md text-mute mt-3 italic">{recall}</p>}

      {shownLevers.length > 0 && (
        <div className="mt-8 text-left max-w-xl mx-auto bg-soft-cloud border border-hairline-soft p-6">
          <span className="text-label-xs text-mute uppercase tracking-wider">{leverTitle}</span>
          <ul className="mt-3 space-y-4">
            {shownLevers.map((lever, i) => (
              <li key={lever} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-ink text-canvas text-caption-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-body-sm text-ink">{lever}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tier !== 'cold' && (
        <div className="mt-8 text-left max-w-xl mx-auto border border-hairline-soft p-6">
          <span className="text-label-xs text-mute uppercase tracking-wider">Your 90-day roadmap</span>
          <ul className="mt-3 space-y-3">
            {['Weeks 1–2', 'Weeks 4–8', 'Weeks 8–12'].map((when, i) => (
              <li key={when} className="text-body-sm text-mute leading-relaxed">
                <span className="text-ink font-medium">{when}:</span> {seq[i]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 text-left max-w-xl mx-auto">
        <span className="text-label-xs text-mute uppercase tracking-wider">Behind this readout</span>
        <p className="text-caption-md text-mute mt-2 leading-relaxed">{BENCH[arm] || BENCH.acquisition}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {tier === 'hot' && (
          <Button size="lg" onClick={openBookingModal}>
            Get your growth roadmap <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {tier === 'warm' && (
          <Button size="lg" asChild>
            <Link to="/proof" className="no-underline">
              See the results this produces <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
        {tier === 'cold' && (
          <Button size="lg" asChild>
            <Link to="/services" className="no-underline">
              Explore our services <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
        <Button size="lg" variant="outline" asChild>
          <a
            href={`${WHATSAPP_URL}?text=${waScore}`}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            Discuss on WhatsApp
          </a>
        </Button>
      </div>
      {tier !== 'hot' && (
        <button onClick={openBookingModal} className="text-caption-sm text-ink underline underline-offset-2 mt-4">
          or book the free audit directly
        </button>
      )}
      <div className="mt-6 flex flex-col items-center gap-4">
        <CopyButton
          text={`My Growth Health: ${pct}% (${tier}). Fix first: ${levers.join('; ') || 'n/a'}. Scored at thegrowthbench.com/growth-scorecard`}
        />
        {skipped && <EmailCapture postLead={postLead} mailCtx={mailCtx} />}
        <button onClick={onRetake} className="text-caption-sm text-mute hover:text-ink transition-colors underline underline-offset-2">
          Retake the scorecard
        </button>
      </div>
      <p className="text-caption-sm text-mute mt-4 max-w-md mx-auto leading-relaxed">
        Directional estimate from your answers + category benchmarks — your audit call makes it exact.
      </p>
    </div>
  );
};

export default GrowthScorecard;
