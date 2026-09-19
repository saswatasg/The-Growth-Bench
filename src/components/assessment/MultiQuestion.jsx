import React from 'react';

const MultiQuestion = ({ question, answer, onChange }) => {
  const { scenario, question: questionText, options } = question.data;
  const selected = answer || [];

  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter(s => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div role="group" aria-labelledby="q-label">
      {scenario && (
        <div className="p-5 bg-soft-cloud border border-hairline-soft mb-4">
          <p className="text-body-md text-ink leading-relaxed">{scenario}</p>
        </div>
      )}
      <p id="q-label" className="text-body-md text-ink font-medium mb-4">{questionText}</p>
      <p className="text-label-xs text-mute uppercase tracking-wider mb-3">Select all that apply</p>
      <div className="space-y-2">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            role="checkbox"
            aria-checked={selected.includes(opt.id)}
            className={`w-full text-left p-4 border transition-all ${
              selected.includes(opt.id)
                ? 'border-ink bg-ink/5'
                : 'border-hairline-soft bg-canvas hover:border-ink/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 flex-shrink-0 mt-0.5 border-2 flex items-center justify-center ${
                selected.includes(opt.id) ? 'border-ink bg-ink' : 'border-hairline'
              }`}>
                {selected.includes(opt.id) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-body-md text-ink">{opt.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiQuestion;
