import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Calendar, Users, Clock, Award, BookOpen, MessageCircle, QrCode, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { formatINR, BASE_PRICE_PAISE } from '@/lib/training';
import { fadeUp, staggerContainer, staggerChild } from '@/lib/motion';

const WHATS_LEAVE = [
  'Know exactly which Claude surface — chat, Projects, Artifacts, Claude Code, Cowork, Desktop — to reach for, for any task.',
  'Have shipped a working custom Skill, connector, or automation for a real, recurring job.',
  'Understand MCP and token/cost tradeoffs well enough to use Claude efficiently and safely.',
  'Hold a Growth Bench certificate of completion, backed by a hands-on final assessment.',
];

const SCHEDULE = [
  { day: 'Day 1', focus: 'Claude Foundations & Your First Real Task', format: 'Live, 2 hrs' },
  { day: 'Day 2', focus: 'Extending Claude: Skills, Connectors, Automation & Design', format: 'Live, 2 hrs' },
  { day: 'Day 3', focus: 'MCP, Token/Cost Optimization & Practical Assessment', format: 'Live, 2 hrs' },
];

const DAY_DETAILS = [
  {
    day: 'Day 1',
    title: 'Claude Foundations & Your First Real Task',
    question: '"Which Claude do I even open for this?"',
    points: [
      'A working map of every Claude surface — when to use Chat, Projects, Artifacts, Claude Code, Cowork, and Desktop.',
      'Responsible steering and judgment: how to direct Claude without over-delegating.',
      'A live end-to-end exercise where each participant finishes one real task from their own work.',
    ],
  },
  {
    day: 'Day 2',
    title: 'Extending Claude: Skills, Connectors, Automation & Design',
    question: '"How do I make Claude do the same thing every time, on its own?"',
    points: [
      'Writing a custom Skill from scratch — one that fits your actual workflow.',
      'Using connectors and the plugins directory to extend Claude\'s reach.',
      'Artifacts & Projects as persistent context — building a knowledge base Claude can reference.',
      'Scheduled Tasks: automating recurring work without manual triggers.',
      'A hands-on Design exercise to build a multi-step automation.',
    ],
  },
  {
    day: 'Day 3',
    title: 'MCP, Token/Cost Optimization & Practical Assessment',
    question: '"How do I connect this to our real tools, without wasting budget?"',
    points: [
      'MCP from a practitioner\'s side — connecting Claude to your real data sources.',
      'Model and cost tradeoffs — when to use Sonnet vs Opus, and how to optimize token usage.',
      'An open troubleshooting clinic for real problems from your team\'s workflow.',
      'A light hands-on assessment that closes the program and earns your certificate.',
    ],
  },
];

const INCLUDED = [
  { icon: BookOpen, title: 'Free Skill Library', desc: '100+ custom-curated Claude Skills, ready to install and use immediately across your team\'s real workflows.' },
  { icon: MessageCircle, title: 'Lifetime Monthly Q&A', desc: 'A standing 2-hour live session every month, open for as long as the relationship continues — not just for the program\'s duration.' },
];

const WHO_FOR = [
  'Marketing teams spending hours on repetitive content, reporting, or campaign management.',
  'Operations teams drowning in manual processes that Claude could automate.',
  'Founders and growth leads who want their team to use Claude strategically, not just for one-off tasks.',
];

const WHO_NOT = [
  'Teams already using Claude Code daily with deep technical expertise.',
  'Individual contributors looking for a basic "how to use ChatGPT" workshop.',
  'Companies that need a custom-built automation — we do that separately as a service.',
];

const FAQ_ITEMS = [
  { q: 'How does invoicing and GST work?', a: 'We issue a GST-compliant invoice for every enrollment. Companies can pay via bank transfer or UPI. GST is included in the listed price.' },
  { q: 'What is the refund policy?', a: 'Full refund if cancelled 7+ days before the first session. 50% refund if cancelled 3–7 days before. No refund within 3 days of the first session, but you can transfer your seat to a future cohort at no cost.' },
  { q: 'What if someone misses a live day?', a: 'Each session is recorded and shared with enrolled participants for 30 days. However, the Day 3 assessment must be completed live — it cannot be taken from the recording.' },
  { q: 'What is the minimum and maximum cohort size?', a: 'Minimum 12, maximum 35 participants per cohort. We run smaller cohorts by arrangement — contact us to discuss.' },
  { q: 'How do you handle our data?', a: 'We collect only participant name and email, shared by the employer with consent. Data is used solely for training delivery and certificate issuance. Full details in our Privacy Policy.' },
  { q: 'Is this affiliated with Anthropic?', a: 'No. This is an independent program built around Claude. It is not affiliated with, endorsed by, or issued by Anthropic.' },
];

const TrainingLanding = () => {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <>
      <PageMeta />

      {/* Breadcrumb */}
      <div className="bg-canvas pt-6">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-body-sm text-mute">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink">Training</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-canvas py-[60px] md:py-[100px]">
        <div className="container-site text-center">
          <span className="text-label-xs text-mute uppercase tracking-wider">Training</span>
          <h1 className="font-display text-display-md md:text-display-lg text-ink mt-2 leading-none">
            Claude Practitioner Training
          </h1>
          <p className="text-body-lg text-mute mt-4 leading-relaxed max-w-2xl mx-auto">
            A 3-Day Live Certification Program
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-body-sm text-mute">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Next live cohort starts October 2026</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 12–35 per cohort</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 3 × 2-hour sessions</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link to="/training/claude-practitioner/enroll">
              <Button size="lg">Enroll Your Team — {formatINR(BASE_PRICE_PAISE)}/person <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
          <p className="text-body-sm text-mute mt-4">Limited to 35 seats per cohort. No pre-work required.</p>
        </div>
      </section>

      {/* The Opportunity */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <span className="text-label-xs text-mute uppercase tracking-wider">The Opportunity</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Most teams already use Claude. Few use it well.</h2>
            <div className="mt-6 space-y-4">
              <p className="text-body-lg text-mute leading-relaxed">
                Your team uses Claude for drafting, research, one-off tasks — but that usage is scattered and unstructured. It rarely goes beyond chat.
              </p>
              <p className="text-body-lg text-mute leading-relaxed">
                This program gives your team a shared, structured fluency across Claude's full toolset: building Skills, connecting real data sources, automating recurring work, and knowing which surface to reach for and when.
              </p>
              <p className="text-body-lg text-mute leading-relaxed">
                It closes with a hands-on assessment and a Growth Bench certificate — a verifiable outcome, not just a workshop memory.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Who this is for */}
      <motion.section {...fadeUp} className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <span className="text-label-xs text-success uppercase tracking-wider">Who this is for</span>
              <h3 className="font-display text-heading-lg text-ink mt-2 mb-4">Teams ready to go beyond chat</h3>
              <ul className="space-y-3">
                {WHO_FOR.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-body-md text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-label-xs text-mute uppercase tracking-wider">Who this is not for</span>
              <h3 className="font-display text-heading-lg text-ink mt-2 mb-4">Already deep in Claude? Skip this.</h3>
              <ul className="space-y-3">
                {WHO_NOT.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-mute">—</span>
                    <span className="text-body-md text-mute">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* What the team leaves with */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <span className="text-label-xs text-mute uppercase tracking-wider">Outcomes</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">What your team leaves with</h2>
            <motion.ul {...staggerContainer} className="mt-8 space-y-4">
              {WHATS_LEAVE.map((item, i) => (
                <motion.li key={i} {...staggerChild} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-body-md text-ink">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.section>

      {/* Program at a glance */}
      <motion.section {...fadeUp} className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">Schedule</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Program at a glance</h2>
            <p className="text-body-md text-mute mt-4">No pre-work required — Day 1 opens with the fundamentals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {SCHEDULE.map((s) => (
              <div key={s.day} className="p-6 bg-soft-cloud border border-hairline-soft">
                <span className="text-label-xs text-mute uppercase tracking-wider">{s.day}</span>
                <h3 className="text-heading-md text-ink mt-2">{s.focus}</h3>
                <p className="text-body-sm text-mute mt-2">{s.format}</p>
              </div>
            ))}
          </div>
          <p className="text-body-sm text-mute mt-6 text-center max-w-2xl mx-auto">
            A certificate of completion is issued to each participant who passes the Day 3 assessment.
          </p>
        </div>
      </motion.section>

      {/* Included extras */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">Included</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Also included, at no extra cost</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {INCLUDED.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 bg-canvas border border-hairline-soft">
                  <div className="w-10 h-10 rounded-full bg-soft-cloud border border-hairline-soft flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ink" />
                  </div>
                  <h3 className="text-heading-md text-ink">{item.title}</h3>
                  <p className="text-body-sm text-mute mt-2 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Day-by-day detail */}
      <motion.section {...fadeUp} className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">Curriculum</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Day-by-day breakdown</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {DAY_DETAILS.map((d) => (
              <div key={d.day} className="p-6 md:p-8 bg-soft-cloud border border-hairline-soft">
                <span className="text-label-xs text-mute uppercase tracking-wider">{d.day}</span>
                <h3 className="font-display text-heading-lg text-ink mt-2">{d.title}</h3>
                <p className="text-body-md text-mute mt-2 italic">{d.question}</p>
                <ul className="mt-4 space-y-2">
                  {d.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-body-sm text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Format & delivery */}
      <motion.section {...fadeUp} className="bg-soft-cloud py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <span className="text-label-xs text-mute uppercase tracking-wider">Format</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Format & delivery</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-canvas border border-hairline-soft">
                <h3 className="text-heading-md text-ink">Virtual</h3>
                <p className="text-body-sm text-mute mt-2">Live sessions via video call. Interactive, not pre-recorded. Screen sharing and real-time Q&A.</p>
              </div>
              <div className="p-6 bg-canvas border border-hairline-soft">
                <h3 className="text-heading-md text-ink">On-site</h3>
                <p className="text-body-sm text-mute mt-2">We come to your office. Hands-on workshops with your team in the room. Available for cohorts of 15+.</p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Cohort size', value: '12–35' },
                { label: 'Sessions', value: '3 × 2 hrs' },
                { label: 'Timeline', value: '1–2 weeks' },
                { label: 'Materials', value: 'Included' },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 bg-canvas border border-hairline-soft">
                  <div className="font-display text-heading-lg text-ink">{item.value}</div>
                  <p className="text-caption-sm text-mute mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Certificate preview */}
      <motion.section {...fadeUp} className="bg-ink py-[48px] md:py-[100px]">
        <div className="container-site text-center">
          <span className="text-label-xs text-stone uppercase tracking-wider">Certificate</span>
          <h2 className="font-display text-heading-xl md:text-display-md text-canvas mt-2 leading-none">A certificate worth framing</h2>
          <p className="text-body-md text-hairline mt-4 max-w-xl mx-auto">
            Every participant who passes the Day 3 assessment receives a Growth Bench certificate of completion.
          </p>
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="bg-canvas p-8 md:p-12 border border-hairline-soft">
              <div className="text-center">
                <div className="mb-6">
                  <span className="font-display text-heading-lg text-ink tracking-wider">THE GROWTH BENCH</span>
                </div>
                <p className="text-label-xs text-mute uppercase tracking-wider mb-4">Certificate of Completion</p>
                <p className="text-body-md text-mute mb-2">This certifies that</p>
                <p className="font-display text-heading-xl text-ink my-4">[Participant Name]</p>
                <p className="text-body-md text-mute mb-2">has successfully completed</p>
                <p className="font-display text-heading-lg text-ink mt-2 mb-6">Claude Practitioner Training</p>
                <div className="flex justify-center gap-8 text-caption-sm text-mute mb-6">
                  <span>Date: [Completion Date]</span>
                  <span>ID: GB-CPT-XXXXXXXX</span>
                </div>
                <div className="flex justify-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-soft-cloud border border-hairline-soft flex items-center justify-center mb-2 mx-auto">
                      <QrCode className="w-10 h-10 text-mute" />
                    </div>
                    <p className="text-caption-sm text-mute">Scan to verify</p>
                  </div>
                  <div className="text-center">
                    <div className="border-b border-ink w-32 mb-2 mx-auto" />
                    <p className="text-caption-sm text-mute">Saswata Sengupta</p>
                    <p className="text-caption-sm text-mute">Founder, The Growth Bench</p>
                  </div>
                </div>
                <p className="text-caption-sm text-mute mt-4">
                  Independent program built around Claude. Not affiliated with, endorsed, or issued by Anthropic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section {...fadeUp} className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">FAQ</span>
            <h2 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Common questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <button
                key={item.q}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left border border-hairline-soft bg-soft-cloud p-5 transition-colors hover:border-ink/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-heading-md text-ink pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-mute flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === i && (
                  <p className="text-body-md text-mute leading-relaxed mt-3">{item.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Disclosure */}
      <div className="bg-soft-cloud py-6">
        <div className="container-site text-center">
          <p className="text-caption-sm text-mute">
            Independent program built around Claude. Not affiliated with, endorsed, or issued by Anthropic.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <motion.section {...fadeUp} className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site text-center">
          <h2 className="font-display text-heading-xl md:text-display-md text-ink leading-none">Ready to certify your team?</h2>
          <p className="text-body-md text-mute mt-4">Next live cohort starts October 2026. Limited to 35 seats.</p>
          <div className="mt-8">
            <Link to="/training/claude-practitioner/enroll">
              <Button size="lg">Enroll Your Team <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default TrainingLanding;
