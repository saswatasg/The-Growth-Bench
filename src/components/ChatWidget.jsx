import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, Send, Sparkles } from 'lucide-react';
import { useBookingModal } from '@/context/BookingModalContext';
const CASESTUDIES_URL = '/case-studies';

const FAQ_GROUPS = [
  {
    category: 'Getting Started',
    items: [
      { q: 'What does The Growth Bench do?', a: "We're a full-stack growth partner for D2C brands & early-stage startups. Strategy, ads, CRO, websites, lead systems, UI/UX — all under one roof. One senior partner who owns the full picture, with specialists on the bench for every function.", followUp: { q: "I'm interested — how do I start?", a: "Book a free 30-minute audit call. We'll look at your funnel, give you one concrete recommendation, and tell you honestly if we're a fit." } },
      { q: 'How much does it cost?', a: 'Pricing depends on scope. We start with a free 30-minute audit — no commitment. If we\'re a fit, we\'ll scope a plan based on your needs. Most engagements range from ₹75K–₹3L/month depending on complexity.', followUp: { q: 'What determines the price?', a: 'Scope of work (ads management, CRO, web dev, or full-stack), number of channels, and whether you need ongoing management vs project-based delivery.' } },
      { q: 'Is there a free trial?', a: 'Yes — 7 days free, no commitment. If you don\'t see value in the first week, you walk away. No questions. No fine print.' },
      { q: 'How does onboarding work?', a: 'Step 1: Free 30-min audit. Step 2: If we\'re a fit, we scope the plan. Step 3: Kickoff call + access setup. Step 4: First deliverables within the first week. Full strategy doc by day 14.' },
    ],
  },
  {
    category: 'Services & Specialisation',
    items: [
      { q: 'Do you work with startups?', a: 'Absolutely. Early-stage startups are our bread and butter. We work best with founders who are still in the room — people who want a high-trust partner that thinks like an owner, not a vendor.' },
      { q: 'What industries do you specialise in?', a: 'D2C e-commerce (furniture, coffee, auto parts, building materials), B2B SaaS, education enrollment, and professional services. We work best where the founder is hands-on and growth is the priority.' },
      { q: 'What tools & platforms do you use?', a: 'Google Ads, Meta Ads, Amazon Ads, Shopify, React/Next.js, Figma, Salesforce, Zoho CRM, Mailchimp, Google Analytics, Search Console, Power BI, n8n, and more. We pick the right stack for each client.' },
    ],
  },
  {
    category: 'Results & Proof',
    items: [
      { q: 'How soon can I see results?', a: 'Most clients see their first meaningful improvement within 30-60 days. Quick wins (tracking fixes, UX tweaks, ad optimisations) show impact in the first two weeks. Compound results build over 3-6 months.' },
      { q: 'Can you share case studies?', a: 'Yes! We have detailed case studies across D2C, B2B SaaS, education, social impact, and more. You can view them all on our Case Studies page.', link: CASESTUDIES_URL },
      { q: 'What results have you delivered?', a: '$329K/month recovered for a D2C brand. 5.7x ROAS for a coffee brand. 13.7x ROAS for building materials. 118% Europe growth for auto parts. 154.5% sales lift in education. And more.' },
    ],
  },
];

const TypewriterText = ({ text, speed = 25, onComplete }) => {
  const [displayed, setDisplayed] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);
  const indexRef = React.useRef(0);
  const timeoutRef = React.useRef(null);
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;

  React.useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setIsComplete(false);
    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(type, speed);
      } else {
        setIsComplete(true);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };
    type();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!isComplete && <span className="inline-block w-0.5 h-4 bg-primary/50 ml-0.5 animate-pulse" />}
    </span>
  );
};

const ChatWidget = () => {
  const { openBookingModal } = useBookingModal();
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const [customInput, setCustomInput] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState([]);
  const [followUp, setFollowUp] = React.useState(null);
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  const [currentGroup, setCurrentGroup] = React.useState(0);

  React.useEffect(() => {
    if (messages.length === 0 && !showOptions) {
      setMessages([{ type: 'bot', text: "Hey! 👋 How can we help you grow today?", key: Date.now() }]);
      setShowOptions(true);
    }
  }, []);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showOptions, isTyping]);

  const addBotMessage = (text, key, cb) => {
    setIsTyping(true);
    const msgKey = key || Date.now();
    setMessages(prev => [...prev, { type: 'bot', text, key: msgKey, typing: true }]);
    const timer = setTimeout(() => {
      setMessages(prev => prev.map(m => m.key === msgKey ? { ...m, typing: false } : m));
      setIsTyping(false);
      if (cb) cb();
    }, Math.min(text.length * 15, 2000));
    return () => clearTimeout(timer);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, key: Date.now() }]);
  };

  const handleFAQClick = (faq) => {
    setShowOptions(false);
    addUserMessage(faq.q);
    if (faq.followUp) {
      setFollowUp(faq.followUp);
    } else {
      setFollowUp(null);
    }
    addBotMessage(faq.a, null, () => {
      setChatHistory(prev => [...prev, { q: faq.q, a: faq.a }]);
    });
  };

  const handleFollowUpClick = () => {
    if (!followUp) return;
    setShowOptions(false);
    addUserMessage(followUp.q);
    const fu = followUp;
    setFollowUp(null);
    addBotMessage(fu.a, null, () => {
      setChatHistory(prev => [...prev, { q: fu.q, a: fu.a }]);
    });
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim() || isTyping) return;
    setShowOptions(false);
    addUserMessage(customInput);
    setFollowUp(null);
    addBotMessage("Great question! Let me connect you with our team who can give you a detailed answer.", null, () => {
      setChatHistory(prev => [...prev, { q: customInput, a: 'Escalated to agent' }]);
    });
    setCustomInput('');
  };

  const handleTalkToAgent = () => {
    const context = chatHistory.map(h => `Q: ${h.q}\nA: ${h.a}`).join('\n\n');
    const waMessage = encodeURIComponent(`Hi! I was chatting with The Growth Bench and had a question:\n\n${context || 'I wanted to learn more about your services.'}\n\nCan you help?`);
    window.open(`https://wa.me/918777875140?text=${waMessage}`, '_blank');
  };

  const handleBookCall = () => {
    openBookingModal();
  };

  const resetChat = () => {
    setMessages([]);
    setShowOptions(true);
    setChatHistory([]);
    setCustomInput('');
    setFollowUp(null);
    setIsTyping(false);
    setCurrentGroup(0);
    setTimeout(() => {
      setMessages([{ type: 'bot', text: "Hey! 👋 How can we help you grow today?", key: Date.now() }]);
    }, 50);
  };

  const currentFAQs = FAQ_GROUPS.flatMap(g => g.items);

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && messages.length === 0) {
            setMessages([{ type: 'bot', text: "Hey! 👋 How can we help you grow today?", key: Date.now() }]);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ background: 'var(--color-primary)' }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-border/80 overflow-hidden"
            style={{ maxHeight: '620px', height: 'calc(100vh - 200px)', background: 'var(--color-card-bg)', backdropFilter: 'blur(12px)' }}
          >
            {/* Header */}
            <div className="p-4 text-white flex items-center gap-3" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm font-display">The Growth Bench</span>
                  <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white -mr-1 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-white/70">Usually replies in a few minutes</p>
              </div>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto p-4 space-y-3" style={{ maxHeight: 'calc(100% - 130px)', scrollBehavior: 'smooth' }}>
              {messages.map((msg) => (
                <div key={msg.key} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.type === 'user' ? 'text-white' : 'text-foreground'
                    }`}
                    style={{
                      background: msg.type === 'user' ? 'var(--color-primary)' : '#F3F4F6',
                    }}
                  >
                    {msg.typing ? (
                      <TypewriterText text={msg.text} speed={20} />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {/* FAQ Options */}
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2"
                >
                  {FAQ_GROUPS.map((group, gi) => (
                    <div key={gi} className="mb-3">
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 px-1">{group.category}</p>
                      <div className="space-y-1.5">
                        {group.items.map((faq, i) => (
                          <motion.button
                            key={faq.q}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (gi * group.items.length + i) * 0.05 }}
                            onClick={() => handleFAQClick(faq)}
                            className="w-full text-left text-sm px-3.5 py-3 rounded-xl border border-border/70 hover:border-primary/30 transition-all text-foreground flex items-center justify-between gap-2 hover:bg-primary/5"
                          >
                            <span className="flex-1 text-[13px]">{faq.q}</span>
                            <ChevronRight className="w-3 h-3 flex-shrink-0 text-muted-foreground" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Follow-up suggestion */}
              {followUp && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-1"
                >
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 px-1">You might also want to know:</p>
                  <button
                    onClick={handleFollowUpClick}
                    className="w-full text-left text-sm px-3.5 py-2.5 rounded-xl border border-primary/30 hover:border-primary/60 transition-all text-primary flex items-center justify-between gap-2 bg-primary/5"
                  >
                    <span className="flex-1 text-[13px] font-medium">{followUp.q}</span>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  </button>
                </motion.div>
              )}

              {/* Action Buttons */}
              {!showOptions && messages.length > 1 && !isTyping && !followUp && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-3 space-y-2 border-t border-border/60"
                >
                  <button
                    onClick={handleBookCall}
                    className="w-full text-center text-sm font-medium py-3 rounded-xl text-white transition-all hover:shadow-md"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    Book a Free Audit Call
                  </button>
                  <button
                    onClick={handleTalkToAgent}
                    className="w-full text-center text-sm py-3 rounded-xl border border-border text-foreground font-medium hover:bg-surface-off transition-all"
                  >
                    Talk to an Agent
                  </button>
                  <button
                    onClick={resetChat}
                    className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors pt-1"
                  >
                    Start over
                  </button>
                </motion.div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#F3F4F6] rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleCustomSubmit} className="border-t border-border/60 p-3 flex gap-2 bg-white/50 backdrop-blur-sm">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type your question..."
                disabled={isTyping}
                className="flex-1 text-sm px-3 py-2.5 rounded-lg border border-border/70 bg-surface-off outline-none focus:border-primary/30 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || !customInput.trim()}
                className="w-11 h-11 rounded-lg flex items-center justify-center text-white flex-shrink-0 transition-all disabled:opacity-50"
                style={{ background: 'var(--color-primary)' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
