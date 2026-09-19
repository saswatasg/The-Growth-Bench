import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import QuestionRenderer from '@/components/assessment/QuestionRenderer';
import AntiCheatOverlay from '@/components/assessment/AntiCheatOverlay';
import Timer from '@/components/assessment/Timer';
import ScoreDisplay from '@/components/assessment/ScoreDisplay';
import { selectQuestions, scoreAttempt, TIMER_MINUTES, QUESTION_COUNT } from '@/lib/assessment';
import { PASS_THRESHOLD, MAX_ATTEMPTS } from '@/lib/training';
import { issueCertificate, addAuditLog } from '@/lib/supabase';
import { generateCertId } from '@/lib/training';

const TIMER_SECONDS = TIMER_MINUTES * 60;

const Assessment = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = React.useState('start'); // start | active | submitting | result | warning
  const [questions, setQuestions] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [result, setResult] = React.useState(null);
  const [attemptNumber, setAttemptNumber] = React.useState(1);
  const [participantName, setParticipantName] = React.useState('');
  const [error, setError] = React.useState('');

  // Violation tracking — persists across phase changes
  const violationCountRef = React.useRef(0);
  const lastViolationRef = React.useRef(0);

  const handleViolation = React.useCallback((type) => {
    const now = Date.now();
    // Debounce: only count once per 2 seconds
    if (now - lastViolationRef.current < 2000) return;
    lastViolationRef.current = now;

    violationCountRef.current += 1;

    if (violationCountRef.current >= 2) {
      // Second violation — auto-submit
      setWarningMsg('You triggered a second violation. Your assessment has been automatically submitted.');
      // Use functional setState to get current answers/questions
      setPhase('ended');
    } else {
      // First violation — warning
      setWarningMsg('Stay focused on the assessment. Moving your cursor to the edge of the screen or leaving the browser window is not allowed. This is your only warning.');
      setPhase('warning');
    }
  }, []);

  const [warningMsg, setWarningMsg] = React.useState('');

  // Auto-submit when phase becomes 'ended'
  React.useEffect(() => {
    if (phase === 'ended') {
      submitAssessment();
    }
  }, [phase]);

  const startAssessment = () => {
    if (!participantName.trim()) {
      setError('Enter your name to begin');
      return;
    }
    setError('');
    violationCountRef.current = 0;
    lastViolationRef.current = 0;
    const qs = selectQuestions(QUESTION_COUNT);
    setQuestions(qs);
    setAnswers({});
    setCurrentIndex(0);
    setPhase('active');
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const submitAssessment = async () => {
    setPhase('submitting');
    const scoreResult = scoreAttempt(questions, answers);
    setResult(scoreResult);

    // Exit fullscreen (if active)
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } catch (e) {}

    // Store attempt (mock for now)
    try {
      if (scoreResult.passed) {
        const certId = generateCertId();
        try {
          await issueCertificate({
            cert_id: certId,
            candidate_name: participantName,
            company_name: 'Self-enrolled',
            completion_date: new Date().toISOString().split('T')[0],
            score: scoreResult.percentage,
            issued_by: 'system',
          });
          await addAuditLog({
            cert_id: certId,
            action: 'issued',
            performed_by: 'system',
            details: { participant: participantName, score: scoreResult.percentage },
          });
        } catch (e) {
          console.warn('Certificate issuance failed (mock mode):', e);
        }
      }
    } catch (e) {
      console.warn('Attempt storage failed:', e);
    }

    setPhase('result');
  };

  const handleTimeExpire = () => {
    submitAssessment();
  };

  const handleRetry = () => {
    setAttemptNumber(attemptNumber + 1);
    setPhase('start');
    setResult(null);
    setAnswers({});
    setCurrentIndex(0);
    violationCountRef.current = 0;
    lastViolationRef.current = 0;
  };

  const dismissWarning = () => {
    setWarningMsg('');
    setPhase('active');
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).filter(k => {
    const val = answers[k];
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === 'object') return Object.keys(val).length > 0;
    return val !== undefined && val !== '';
  }).length;

  // Wrap everything in AntiCheatOverlay so violation listeners persist
  const isAssessing = phase === 'active' || phase === 'warning';

  return (
    <>
      <PageMeta />

      {isAssessing ? (
        <AntiCheatOverlay participantName={participantName} onViolation={handleViolation}>
          {/* Warning overlay */}
          {phase === 'warning' && (
            <div className="fixed inset-0 z-[200] bg-ink/90 flex items-center justify-center p-6">
              <div className="max-w-md bg-canvas p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-sale mx-auto mb-4" />
                <h2 className="font-display text-heading-lg text-ink mb-2">Warning</h2>
                <p className="text-body-md text-mute mb-6">{warningMsg}</p>
                <Button size="lg" onClick={dismissWarning}>
                  Return to Assessment
                </Button>
              </div>
            </div>
          )}

          {/* Active assessment */}
          {phase === 'active' && currentQuestion && (
            <section className="bg-canvas py-[48px] md:py-[80px]">
              <div className="container-site max-w-3xl">
                {/* Header bar */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-hairline-soft">
                  <div className="flex items-center gap-4">
                    <span className="text-body-sm text-mute">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    <div className="flex gap-1.5">
                      {questions.map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-ink' : answers[questions[i]?.id] ? 'bg-success' : 'bg-hairline'}`} />
                      ))}
                    </div>
                  </div>
                  <Timer seconds={TIMER_SECONDS} onExpire={handleTimeExpire} />
                </div>

                {/* Question */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-label-xs text-mute uppercase tracking-wider">
                      {currentQuestion.category} · {currentQuestion.type.replace('_', ' ')} · {currentQuestion.points} pts
                    </span>
                  </div>
                  <QuestionRenderer
                    question={currentQuestion}
                    answer={answers[currentQuestion.id]}
                    onChange={(val) => handleAnswer(currentQuestion.id, val)}
                  />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-hairline-soft">
                  <Button
                    variant="ghost"
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>

                  <span className="text-body-sm text-mute">
                    {answeredCount} of {questions.length} answered
                  </span>

                  {currentIndex < questions.length - 1 ? (
                    <Button onClick={goNext}>
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={submitAssessment} className="bg-success hover:bg-success/90">
                      Submit Assessment
                    </Button>
                  )}
                </div>
              </div>
            </section>
          )}
        </AntiCheatOverlay>
      ) : (
        <>
          {/* Start screen */}
          {phase === 'start' && (
            <section className="bg-canvas py-[60px] md:py-[120px]">
              <div className="container-site max-w-2xl mx-auto text-center">
                <span className="text-label-xs text-mute uppercase tracking-wider">Assessment</span>
                <h1 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">
                  Claude Practitioner Assessment
                </h1>
                <p className="text-body-lg text-mute mt-4 leading-relaxed">
                  {QUESTION_COUNT} questions · {TIMER_MINUTES} minutes · {PASS_THRESHOLD}% to pass · {MAX_ATTEMPTS} attempts
                </p>

                <div className="mt-8 p-6 bg-soft-cloud border border-hairline-soft text-left">
                  <h3 className="text-heading-md text-ink mb-3">Before you begin</h3>
                  <ul className="space-y-2 text-body-sm text-mute">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                      You have {MAX_ATTEMPTS} attempts to pass
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                      Questions are randomized — each attempt is different
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                      Mouse movement near screen edges or leaving the browser window will trigger a warning
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                      One warning, then the test auto-submits on the second violation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                      Copy/paste and right-click are disabled during the assessment
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                      The timer starts when you click "Begin"
                    </li>
                  </ul>
                </div>

                <div className="mt-8 max-w-sm mx-auto">
                  <label className="text-body-sm text-ink mb-2 block text-left">Your full name</label>
                  <input
                    type="text"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 text-body-md bg-soft-cloud border border-hairline-soft focus:outline-none focus:border-ink transition-colors"
                  />
                  {error && <p className="text-caption-sm text-sale mt-1 text-left">{error}</p>}
                </div>

                <div className="mt-8">
                  <Button size="lg" onClick={startAssessment}>
                    <Shield className="w-4 h-4 mr-2" /> Begin Assessment
                  </Button>
                </div>

                <p className="text-caption-sm text-mute mt-4">Anti-cheat monitoring is active. Stay focused on the assessment.</p>

                <div className="mt-6">
                  <Link to="/training/claude-practitioner" className="text-body-sm text-mute hover:text-ink transition-colors">
                    ← Back to program page
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Submitting */}
          {phase === 'submitting' && (
            <section className="bg-canvas py-[60px] md:py-[120px]">
              <div className="container-site max-w-lg mx-auto text-center">
                <div className="w-12 h-12 border-2 border-hairline-soft border-t-ink rounded-full animate-spin mx-auto mb-4" />
                <p className="text-body-md text-mute">Scoring your assessment...</p>
              </div>
            </section>
          )}

          {/* Results */}
          {phase === 'result' && result && (
            <section className="bg-canvas py-[60px] md:py-[120px]">
              <div className="container-site">
                <ScoreDisplay
                  result={result}
                  attemptNumber={attemptNumber}
                  maxAttempts={MAX_ATTEMPTS}
                  onRetry={handleRetry}
                  onFinish={() => navigate('/training/claude-practitioner')}
                />
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Assessment;
