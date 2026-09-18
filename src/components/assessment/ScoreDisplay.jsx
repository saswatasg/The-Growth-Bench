import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PASS_THRESHOLD } from '@/lib/training';

const ScoreDisplay = ({ result, attemptNumber, maxAttempts, onRetry, onFinish }) => {
  const passed = result.passed;
  const canRetry = attemptNumber < maxAttempts && !passed;

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-success/10' : 'bg-sale/10'}`}>
        {passed ? (
          <CheckCircle className="w-10 h-10 text-success" />
        ) : (
          <XCircle className="w-10 h-10 text-sale" />
        )}
      </div>

      <h2 className={`font-display text-display-md leading-none ${passed ? 'text-success' : 'text-sale'}`}>
        {passed ? 'Passed' : 'Not Passed'}
      </h2>

      <div className="mt-6 p-6 bg-soft-cloud border border-hairline-soft">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-display text-heading-lg text-ink">{result.score}</div>
            <p className="text-caption-sm text-mute">Score</p>
          </div>
          <div>
            <div className="font-display text-heading-lg text-ink">{result.percentage}%</div>
            <p className="text-caption-sm text-mute">Percentage</p>
          </div>
          <div>
            <div className="font-display text-heading-lg text-ink">{PASS_THRESHOLD}%</div>
            <p className="text-caption-sm text-mute">Required</p>
          </div>
        </div>
      </div>

      {passed && (
        <div className="mt-6 p-6 bg-success/5 border border-success">
          <Award className="w-8 h-8 text-success mx-auto mb-3" />
          <p className="text-body-md text-ink font-medium">Congratulations!</p>
          <p className="text-body-sm text-mute mt-2">
            Your certificate is being generated and will be emailed to you shortly.
          </p>
        </div>
      )}

      {!passed && canRetry && (
        <div className="mt-6">
          <p className="text-body-sm text-mute mb-4">
            You have {maxAttempts - attemptNumber} attempt{maxAttempts - attemptNumber > 1 ? 's' : ''} remaining.
          </p>
          <Button onClick={onRetry} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
        </div>
      )}

      {!passed && !canRetry && (
        <div className="mt-6 p-6 bg-soft-cloud border border-hairline-soft">
          <p className="text-body-md text-ink">
            You've used all {maxAttempts} attempts. Contact us to discuss next steps.
          </p>
          <a href="mailto:hello@thegrowthbench.com" className="text-body-sm text-ink underline mt-2 inline-block">
            hello@thegrowthbench.com
          </a>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/training/claude-practitioner">
          <Button variant="outline">Back to program page</Button>
        </Link>
        {!passed && canRetry && (
          <Button onClick={onRetry} variant="ghost">
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScoreDisplay;
