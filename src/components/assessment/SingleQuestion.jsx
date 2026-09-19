import React from 'react';

const SingleQuestion = ({ question, answer, onChange }) => {
  const { scenario, question: questionText, options } = question.data;

  return (
    <div role="radiogroup" aria-labelledby="q-label">
      {scenario && (
        <div className="p-5 bg-soft-cloud border border-hairline-soft mb-4">
          <p className="text-body-md text-ink leading-relaxed">{scenario}</p>
        </div>
      )}
      <p id="q-label" className="text-body-md text-ink font-medium mb-4">{questionText}</p>
      <div className="space-y-2">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            role="radio"
            aria-checked={answer === opt.id}
            className={`w-full text-left p-4 border transition-all ${
              answer === opt.id
                ? 'border-ink bg-ink/5'
                : 'border-hairline-soft bg-canvas hover:border-ink/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 flex-shrink-0 mt-0.5 border-2 rounded-full flex items-center justify-center ${
                answer === opt.id ? 'border-ink' : 'border-hairline'
              }`}>
                {answer === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-ink" />}
              </div>
              <span className="text-body-md text-ink">{opt.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SingleQuestion;
