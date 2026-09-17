import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Workflow, MessageCircle, Truck, FileText, Repeat, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageMeta from '@/components/PageMeta';
import { useBookingModal } from '@/context/BookingModalContext';
import { WHATSAPP_URL } from '@/lib/constants';
import { fadeUp } from '@/lib/motion';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

// Full decision tree. Every option carries an explicit `next`.
// 'FIT' = revenue qualifier, 'RESULT' = result screen.
// Gate interception happens dynamically in answer().
const NODES = {
  q1: {
    arm: null,
    q: 'What eats most of your team\u2019s week?',
    hint: 'Solo founder? Pick wherever you personally lose hours.',
    options: [
      { label: 'Answering repeat questions', icon: MessageCircle, points: 0, next: 'A1', arm: 'support' },
      { label: 'Firefighting orders, COD & returns', icon: Truck, points: 0, next: 'B0', arm: 'ops' },
      { label: 'Content & catalog treadmill', icon: FileText, points: 0, next: 'C1', arm: 'content' },
      { label: 'Follow-ups & reviews silence', icon: Repeat, points: 0, next: 'D0', arm: 'followups' },
      { label: 'Creative & campaign production', icon: Palette, points: 0, next: 'E1', arm: 'creative' },
    ],
  },
  // ---- SUPPORT arm ----
  A1: {
    arm: 'support',
    q: 'How many repeat questions land per week?',
    options: [
      { label: 'Under 10', points: 0, next: 'A2' },
      { label: '10–40', points: 1, next: 'A2' },
      { label: '40–150', points: 2, next: 'A2', lever: 'WhatsApp + Instagram reply agents' },
      { label: '150+', points: 3, next: 'A2', lever: 'WhatsApp + Instagram reply agents' },
    ],
  },
  A2: {
    arm: 'support',
    q: 'Who answers them today?',
    options: [
      { label: 'Mostly automated already', points: 0, next: 'FIT' },
      { label: 'Mix of staff + templates', points: 1, next: 'A4' },
      { label: 'A staff team, manually', points: 2, next: 'A3t', lever: 'Trained reply agents with warm handoff' },
      { label: 'I do, personally', points: 3, next: 'A3f', lever: 'Founder offload — agents answer first' },
    ],
  },
  A3t: {
    arm: 'support',
    q: 'Roughly how many team-hours a week?',
    options: [
      { label: 'Under 5', points: 1, next: 'A4' },
      { label: '5–15', points: 2, next: 'A4', lever: 'Reclaim team hours with agents' },
      { label: '15+', points: 3, next: 'A4', lever: 'Reclaim team hours with agents' },
    ],
  },
  A3f: {
    arm: 'support',
    q: 'Roughly how many of YOUR hours a week?',
    options: [
      { label: 'Under 3', points: 1, next: 'A4' },
      { label: '3–10', points: 2, next: 'A4', lever: 'Reclaim founder hours with agents' },
      { label: '10+', points: 3, next: 'A4', lever: 'Reclaim founder hours with agents' },
    ],
  },
  A4: {
    arm: 'support',
    q: 'How fast do shoppers get answers?',
    options: [
      { label: 'Instantly, any hour', points: 0, next: 'FIT' },
      { label: 'Within minutes, in hours', points: 1, next: 'FIT' },
      { label: 'Next day', points: 2, next: 'FIT', lever: 'Instant 24/7 coverage on every channel' },
      { label: 'Days — or never', points: 3, next: 'FIT', lever: 'Instant 24/7 coverage on every channel' },
    ],
  },
  // ---- OPS arm ----
  B0: {
    arm: 'ops',
    q: 'How many orders go out per week?',
    options: [
      { label: 'Under 50', points: 0, next: 'B1' },
      { label: '50–200', points: 1, next: 'B1' },
      { label: '200–500', points: 2, next: 'B1' },
      { label: '500+', points: 3, next: 'B1' },
    ],
  },
  B1: {
    arm: 'ops',
    q: 'What share is cash-on-delivery?',
    options: [
      { label: 'No COD', points: 0, next: 'B2n' },
      { label: 'Under 30%', points: 1, next: 'B2' },
      { label: '30–60%', points: 2, next: 'B2', lever: 'COD risk scoring + verification' },
      { label: '60%+', points: 3, next: 'B2', lever: 'COD risk scoring + verification' },
    ],
  },
  B2: {
    arm: 'ops',
    q: 'How are COD orders verified today?',
    options: [
      { label: 'Auto-calling agent', points: 0, next: 'B3' },
      { label: 'Partly — spot checks', points: 1, next: 'B3' },
      { label: 'Manual team calls', points: 2, next: 'B3', lever: 'AI COD-calling agents' },
      { label: 'I call them myself', points: 3, next: 'B3', lever: 'AI COD-calling agents' },
    ],
  },
  B2n: {
    arm: 'ops',
    q: 'Who chases failed deliveries (NDR)?',
    options: [
      { label: 'Automated flows', points: 0, next: 'B3' },
      { label: 'Manual chasing', points: 2, next: 'B3', lever: 'Automated NDR flows (WhatsApp + voice)' },
      { label: 'Nobody — courier retries', points: 3, next: 'B3', lever: 'Automated NDR flows (WhatsApp + voice)' },
    ],
  },
  B3: {
    arm: 'ops',
    q: 'How are returns handled?',
    options: [
      { label: 'Structured + auto', points: 0, next: 'FIT' },
      { label: 'Partly manual', points: 1, next: 'FIT' },
      { label: 'Manual counter + calls', points: 3, next: (a) => (a.B2 >= 2 ? 'B4' : 'FIT'), lever: 'Returns-triage agents' },
    ],
  },
  B4: {
    arm: 'ops',
    q: 'Who chases the failed deliveries?',
    options: [
      { label: 'Automated flows', points: 0, next: 'FIT' },
      { label: 'Staff chases them', points: 2, next: 'FIT', lever: 'NDR-chasing autopilot' },
      { label: 'I chase them myself', points: 3, next: 'FIT', lever: 'NDR-chasing autopilot' },
    ],
  },
  // ---- CONTENT arm ----
  C1: {
    arm: 'content',
    q: 'How many products (SKUs) are in the catalog?',
    options: [
      { label: 'Under 25 SKUs', points: 0, next: 'C2' },
      { label: '25–150 SKUs', points: 1, next: 'C2' },
      { label: '150–500 SKUs', points: 2, next: 'C2', lever: 'AI catalog-copy pipeline' },
      { label: '500+ SKUs', points: 3, next: 'C2', lever: 'AI catalog-copy pipeline' },
    ],
  },
  C2: {
    arm: 'content',
    q: 'How is product and catalog copy produced?',
    options: [
      { label: 'AI-assisted at scale', points: 0, next: 'FIT' },
      { label: 'Partly assisted', points: 1, next: 'FIT' },
      { label: 'Templates + manual writing', points: 2, next: (a) => (a.C1 >= 2 ? 'C3' : 'FIT'), lever: 'AI catalog-copy pipeline' },
      { label: 'One by one, manually', points: 3, next: (a) => (a.C1 >= 2 ? 'C3' : 'FIT'), lever: 'AI catalog-copy pipeline' },
    ],
  },
  C3: {
    arm: 'content',
    q: 'Whose hours does the writing eat?',
    options: [
      { label: 'Freelancers (paid per piece)', points: 2, next: 'FIT', lever: 'Draft-with-agents, polish-with-humans workflow' },
      { label: 'Staff writers', points: 2, next: 'FIT', lever: 'Draft-with-agents, polish-with-humans workflow' },
      { label: 'Mine, personally', points: 3, next: 'FIT', lever: 'Draft-with-agents, polish-with-humans workflow' },
    ],
  },
  // ---- FOLLOW-UPS arm ----
  D0: {
    arm: 'followups',
    q: 'Roughly how many carts go abandoned per week?',
    options: [
      { label: 'Under 20', points: 0, next: 'D1' },
      { label: '20–100', points: 1, next: 'D1' },
      { label: '100–400', points: 2, next: 'D1' },
      { label: '400+', points: 3, next: 'D1' },
    ],
  },
  D1: {
    arm: 'followups',
    q: 'What happens after checkout?',
    options: [
      { label: 'Full WhatsApp + email sequences', points: 0, next: 'D2' },
      { label: 'Cart + post-purchase flows', points: 1, next: 'D2' },
      { label: 'Basic order emails', points: 2, next: 'D2', lever: 'Cart + post-purchase sequences' },
      { label: 'Silence', points: 3, next: 'D2', lever: 'Cart + post-purchase sequences' },
    ],
  },
  D2: {
    arm: 'followups',
    q: 'How do you collect reviews and UGC (customer photos & videos)?',
    options: [
      { label: 'Automated requests', points: 0, next: 'FIT' },
      { label: 'Post-purchase emails', points: 1, next: 'FIT' },
      { label: 'Occasional manual asks', points: 2, next: 'FIT', lever: 'Review + UGC automation' },
      { label: 'We don\u2019t', points: 3, next: (a) => (a.D1 === 3 ? 'D3' : 'FIT'), lever: 'Review + UGC automation' },
    ],
  },
  D3: {
    arm: 'followups',
    q: 'How do you recover abandoned carts today?',
    options: [
      { label: 'WhatsApp flows', points: 0, next: 'FIT' },
      { label: 'Email only', points: 2, next: 'FIT', lever: 'WhatsApp recovery flows' },
      { label: 'Nothing', points: 3, next: 'FIT', lever: 'WhatsApp recovery flows' },
    ],
  },
  // ---- CREATIVE arm ----
  E1: {
    arm: 'creative',
    q: 'Who makes your ad creatives today?',
    options: [
      { label: 'An agency', points: 0, next: 'E2' },
      { label: 'In-house team', points: 1, next: 'E2' },
      { label: 'Freelancers, per asset', points: 2, next: 'E2', lever: 'AI ad-creative variants engine' },
      { label: 'Founder DIY', points: 3, next: 'E2', lever: 'AI ad-creative variants engine' },
    ],
  },
  E2: {
    arm: 'creative',
    q: 'Fresh creatives needed per month?',
    options: [
      { label: 'Under 5', points: 0, next: 'FIT' },
      { label: '5–15', points: 1, next: 'FIT' },
      { label: '15–40', points: 2, next: 'FIT', lever: 'AI ad-creative variants engine' },
      { label: '40+', points: 3, next: 'FIT', lever: 'AI ad-creative variants engine' },
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

// Conservative volume midpoints + stated handle-times → monthly manual hours (pre-cap).
const MID = {
  volume: [5, 25, 95, 200],
  orders: [25, 125, 350, 750],
  catalog: [12, 87, 325, 750],
  carts: [10, 60, 250, 600],
  creatives: [2, 10, 27, 60],
};

const hoursFor = (arm, a) => {
  switch (arm) {
    case 'support': return ((MID.volume[a.A1 ?? 0] * 4 * 4.33) / 60);
    case 'ops': return ((MID.orders[a.B0 ?? 0] * 4.33 * 2) / 60);
    case 'content': return ((MID.catalog[a.C1 ?? 0] * 30) / 6 / 60);
    case 'followups': return ((MID.carts[a.D0 ?? 0] * 2 * 4.33) / 60);
    case 'creative': return (MID.creatives[a.E2 ?? 0] * 3);
    default: return 0;
  }
};

const BENCH = {
  support: 'WhatsApp flows read 70–90% vs ~20% email — category data, not our client results.',
  ops: 'Auto NDR outreach within 2h → 64–74% redelivery vs 28–36% with none (Base 2026). COD AI-calling runs 4.2× faster with 40%+ fewer COD returns (vendor-reported deployments).',
  content: 'Same pipeline behind large-scale catalogs — our proof, not a benchmark.',
  followups: 'Optimized WhatsApp cart-recovery: 18–23% vs 5–8% via email (Chatarmin 2026, 450+ brands).',
  creative: 'No benchmark cited — throughput proof from our own outreach engine. Validated line by line on your audit call.',
};

const SEQUENCE = {
  support: ['Reply playbook built from your 20 most-asked questions', 'Agents live on WhatsApp + Instagram with a human-review period', 'Expand to on-site + voice, tuned weekly from real chats'],
  ops: ['COD verification + NDR flow switched on for your top lane', 'Returns triage + exception dashboard — humans see only the hard 5%', 'Full order-ops coverage with approval gates on money moves'],
  content: ['Top-50 SKU rewrite sprint with SEO checks', 'Catalog pipeline live — agents draft, humans polish', 'Refresh cycles + new-launch automation'],
  followups: ['Cart + post-purchase sequences live in weeks', 'Review + UGC automation loop switched on', 'Full lifecycle messaging across WhatsApp + email'],
  creative: ['Hook × format variant pack for one hero product', 'Brief-to-variant pipeline live with a test matrix', 'Always-on creative testing without headcount'],
};

const RECALL_NODE = { support: 'A1', ops: 'B0', content: 'C1', followups: 'D0', creative: 'E2' };

const TIER_COPY = {
  hot: {
    headline: 'Automation-ready.',
    sub: 'Your store is leaking serious hours every week — and every one of these jobs runs end-to-end with agents, verified before anything touches a customer.',
  },
  warm: {
    headline: 'Leaking hours.',
    sub: 'Two or three systems would pay for themselves fast. Start with the biggest leak, prove it, then expand — same Diagnosis → Team Assembly → Execute & Iterate process.',
  },
  cold: {
    headline: 'Solid foundations.',
    sub: 'Honestly? Automation isn\u2019t your bottleneck yet. Fix the checkout flow first — that\u2019s where the money is hiding for most stores at your stage.',
  },
};

const tierFor = (pct) => {
  if (pct >= 65) return 'hot';
  if (pct >= 35) return 'warm';
  return 'cold';
};

const fmtIN = (n) => Math.round(n).toLocaleString('en-IN');

// ICE "Ease" made visible: sequence/review automation ships fastest,
// multi-system agents need 30–60 days with a human-review period.
const effortFor = (lever) =>
  /(sequences|flows|automation|UGC|variants engine)/i.test(lever)
    ? 'Low effort · live in weeks'
    : 'Medium effort · live in 30–60 days';

const AIScorecard = () => {
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

  const getMaxQuestions = (startArm) => {
    if (!startArm) return 6;
    let maxDepth = 0;
    const visit = (nodeId, depth) => {
      const node = NODES[nodeId];
      if (!node) return;
      if (node.next === 'FIT' || node.next === 'RESULT') { maxDepth = Math.max(maxDepth, depth); return; }
      if (typeof node.next === 'function') { visit('FIT', depth + 1); return; }
      if (node.next) visit(node.next, depth + 1);
    };
    const armStart = { support: 'A1', ops: 'B0', content: 'C1', followups: 'D0', creative: 'E1' }[startArm];
    if (armStart) visit(armStart, 1);
    return Math.max(maxDepth + 1, 3);
  };
  const maxQ = arm ? getMaxQuestions(arm) : 6;

  const postLead = async (payload) => {
    if (!WEB3FORMS_KEY) return;
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'New scorecard lead', ...payload }),
      });
    } catch (e) { console.error('Scorecard submission failed:', e); }
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
    let dest = rawDest === 'RESULT' ? 'result' : rawDest;
    if (!gatedRef.current && Object.keys(next).length >= 2 && dest !== 'result') {
      pendingRef.current = dest;
      dest = 'gate';
    }
    const h = [...history, step];
    setHistory(h);
    const target = dest;
    setTimeout(() => setStep(target), 180);
  };

  const submitGate = (e) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setGateError('Enter a valid email so we can send your score.');
      return;
    }
    setGateError('');
    gatedRef.current = true;
    postLead({ email, answers, arm, stage: 'mid-quiz' });
    setHistory([...history, step]);
    setStep(pendingRef.current || 'FIT');
  };

  const skipGate = () => {
    setSkipped(true);
    gatedRef.current = true;
    setHistory([...history, step]);
    setStep(pendingRef.current || 'FIT');
  };

  const retake = () => {
    setStep('hook');
    setHistory([]);
    setAnswers({});
    setArm(null);
    setEmail('');
    setSkipped(false);
    setGateError('');
    setDisplayPct(0);
    gatedRef.current = false;
    pendingRef.current = null;
    resultSent.current = false;
  };

  // Keyboard: Escape = back, 1–4 = quick-pick (Typeform-style).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && step !== 'hook' && step !== 'result' && step !== 'gate') {
        const h = [...history];
        const prev = h.pop();
        setHistory(h);
        setStep(prev || 'hook');
      }
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4 && NODES[step] && document.activeElement?.tagName !== 'INPUT') {
        const opts = NODES[step].options;
        if (opts[n - 1]) answer(step, n - 1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [step, answer, history]);

  const isResult = step === 'result';
  const node = NODES[step];

  // Score: earned ÷ max of visited nodes (paths differ in length).
  const earned = Object.entries(answers).reduce(
    (s, [id, idx]) => s + (NODES[id] ? NODES[id].options[idx].points : 0), 0
  );
  const max = Object.keys(answers).reduce(
    (s, id) => s + (NODES[id] ? Math.max(...NODES[id].options.map((o) => o.points)) : 0), 0
  );
  const pct = max > 0 ? Math.round((earned / max) * 100) : 0;
  const tier = tierFor(pct);

  // Hours + ₹ engine (conservative midpoints, stated handle-times, 70% capture cap).
  const rawHrs = hoursFor(arm, answers);
  const recHrs = rawHrs * 0.7;
  const inrLow = recHrs * 600;
  const inrHigh = recHrs * 1200;

  const topLevers = Object.entries(answers)
    .filter(([id]) => NODES[id])
    .map(([id, idx]) => ({ lever: NODES[id].options[idx].lever, points: NODES[id].options[idx].points }))
    .filter((x) => x.lever && x.points >= 2)
    .sort((a, b) => b.points - a.points)
    .map((x) => x.lever)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(0, 2);

  const recallNode = RECALL_NODE[arm];
  const recall =
    arm && recallNode && answers[recallNode] != null
      ? `You said ${NODES.q1.options.find((o) => o.arm === arm).label.toLowerCase()} — ${NODES[recallNode].options[answers[recallNode]].label.toLowerCase()}.`
      : null;

  useEffect(() => {
    if (!isResult || resultSent.current) return;
    resultSent.current = true;
    postLead({ email: email || '(skipped)', answers, arm, scorePct: pct, tier, hrs: Math.round(recHrs), skipped, stage: 'complete' });
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
    `Hi! I took the Automation Readiness Scorecard: ${pct}% (${tier}), ~${fmtIN(recHrs)} hrs/mo recoverable. Can we talk about what to automate first?`
  );

  const progress = Math.min(100, Math.round((answeredCount / maxQ) * 100));

  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-[48px] md:py-[100px] overflow-x-clip">
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
                      <Workflow className="w-7 h-7 text-canvas" />
                    </div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Free · About a minute · Instant readout</span>
                    <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
                      How much of your<br />week is repeatable?
                    </h1>
                    <p className="text-body-md text-mute mt-6 max-w-xl mx-auto leading-relaxed">
                      A few taps about your store. We&apos;ll score how much agentic AI can take off your plate —
                      support, ops, content, follow-ups, creative — with recoverable hours, a ₹ range, and exactly where to start.
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
                    <span className="text-label-xs text-mute uppercase tracking-wider">Almost there — you&apos;re 2 answers in</span>
                    <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Where should we send your readout?</h2>
                    <p className="text-body-md text-mute mt-4 leading-relaxed">
                      Your readiness score, recoverable hours, and the two systems to automate first. One email, no sequence, no spam.
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
                    recHrs={recHrs}
                    inrLow={inrLow}
                    inrHigh={inrHigh}
                    waScore={waScore}
                    openBookingModal={openBookingModal}
                    onRetake={retake}
                    skipped={skipped}
                    postLead={postLead}
                    mailCtx={{ answers, arm, scorePct: pct, tier, hrs: Math.round(recHrs) }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <motion.section {...fadeUp} className="bg-soft-cloud py-[48px] md:py-[100px]">
        <div className="container-site max-w-2xl mx-auto text-center">
          <h2 className="font-display text-heading-xl md:text-display-md text-ink leading-none">What the readout is based on</h2>
          <p className="text-body-md text-mute mt-4 leading-relaxed">
            Real automation economics: WhatsApp flows read 70–90% vs ~20% email; auto NDR outreach within
            2 hours re-delivers 64–74% vs 28–36%; optimized cart-recovery runs 18–23% vs 5–8% email.
            Category benchmarks — <Link to="/services#ai-implementation" className="text-ink underline underline-offset-2">see the systems</Link>.
          </p>
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
            className={`text-left px-5 py-4 rounded-none border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 flex items-center gap-3 ${
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
      try { document.execCommand('copy'); } catch (e) { console.error('Copy failed:', e); }
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
    postLead({ email: em, ...mailCtx, skipped: false, stage: 'result-capture' });
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

const ResultStep = ({ pct, displayPct, tier, levers, recall, arm, recHrs, inrLow, inrHigh, waScore, openBookingModal, onRetake, skipped, postLead, mailCtx }) => {
  const copy = TIER_COPY[tier];
  const seq = SEQUENCE[arm] || SEQUENCE.support;
  const shownLevers = tier === 'cold' ? (levers.length ? levers.slice(0, 1) : ['Cart + post-purchase sequences']) : levers;
  const leverTitle = tier === 'cold' ? 'Lowest-effort starting point' : 'Automate first → next';
  const annualHrs = recHrs * 12;
  return (
    <div className="text-center">
      <span className="text-label-xs text-mute uppercase tracking-wider">Your Automation Readiness</span>
      <div className="font-display text-display-md md:text-display-xl text-ink leading-none mt-2">
        {displayPct}<span className="text-stone">%</span>
      </div>
      <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-4 leading-none">{copy.headline}</h2>
      <p className="text-body-md text-mute mt-4 max-w-xl mx-auto leading-relaxed">{copy.sub}</p>
      {recall && <p className="text-caption-md text-mute mt-3 italic">{recall}</p>}

      <div className="mt-8 max-w-xl mx-auto bg-ink text-canvas p-6 md:p-8">
        <span className="text-label-xs text-stone uppercase tracking-wider">Recoverable every month</span>
        <div className="font-display text-heading-xl md:text-display-lg leading-none mt-2">~{fmtIN(recHrs)} hrs</div>
        <div className="text-body-md mt-2">worth roughly ₹{fmtIN(inrLow)} – ₹{fmtIN(inrHigh)}</div>
        <p className="text-caption-sm text-stone mt-3 leading-relaxed">
          That&apos;s ~{fmtIN(annualHrs)} hours a year — about {fmtIN(annualHrs / 40)} working weeks handed to agents.
        </p>
        <p className="text-caption-sm text-stone mt-2 leading-relaxed">
          At a typical ₹600–1,200/hr fully-loaded ops cost — bring your number and we&apos;ll re-run it on the audit call.
        </p>
      </div>

      {shownLevers.length > 0 && (
        <div className="mt-8 text-left max-w-xl mx-auto bg-soft-cloud border border-hairline-soft p-6">
          <span className="text-label-xs text-mute uppercase tracking-wider">{leverTitle}</span>
          <ul className="mt-3 space-y-4">
            {shownLevers.map((lever, i) => (
              <li key={lever} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-ink text-canvas text-caption-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span>
                  <span className="text-body-sm text-ink block">{lever}</span>
                  <span className="text-caption-sm text-mute">{effortFor(lever)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tier !== 'cold' && (
        <div className="mt-8 text-left max-w-xl mx-auto border border-hairline-soft p-6">
          <span className="text-label-xs text-mute uppercase tracking-wider">Your 90 days</span>
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
        <p className="text-caption-md text-mute mt-2 leading-relaxed">{BENCH[arm] || BENCH.support}</p>
        <p className="text-caption-md text-mute mt-3 leading-relaxed">
          Working shown: conservative volume midpoints × stated handle-times (4 min/reply · 2 min/order ops · 30 min/SKU spread over 6 mo · 2 min/cart · 3 hrs/asset), 70% automation cap.
          What shrinks it: thin or bad-fit traffic, no one to take the 5% exceptions. Challenge every line on the audit call.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {tier === 'hot' && (
          <Button size="lg" onClick={openBookingModal}>
            Get your automation roadmap <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {tier === 'warm' && (
          <Button size="lg" asChild>
            <Link to="/resources/we-fixed-checkout-flow-recovered-2-89-crore-month" className="no-underline">
              Read the recovery playbook <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
        {tier === 'cold' && (
          <Button size="lg" asChild>
            <Link to="/services" className="no-underline">
              See what AI can automate <ArrowRight className="w-4 h-4 ml-2" />
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
          text={`My Automation Readiness: ${pct}% (${tier}) — ~${fmtIN(recHrs)} hrs/mo recoverable (~₹${fmtIN(inrLow)}–${fmtIN(inrHigh)}/mo). Automate first: ${levers.join('; ') || 'n/a'}. Scored at thegrowthbench.com/ai-scorecard`}
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

export default AIScorecard;
