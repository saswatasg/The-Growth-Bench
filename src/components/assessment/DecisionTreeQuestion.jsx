import React from 'react';

const DecisionTreeQuestion = ({ question, answer, onChange }) => {
  const { scenario, options, multiSelect } = question.data;

  const handleSelect = (optionId) => {
    if (multiSelect) {
      const current = Array.isArray(answer) ? answer : [];
      if (current.includes(optionId)) {
        onChange(current.filter(id => id !== optionId));
      } else {
        onChange([...current, optionId]);
      }
    } else {
      onChange(optionId);
    }
  };

  const isSelected = (optionId) => {
    if (multiSelect) {
      return Array.isArray(answer) && answer.includes(optionId);
    }
    return answer === optionId;
  };

  return (
    <div>
      <div className="p-5 bg-soft-cloud border border-hairline-soft mb-4">
        <p className="text-body-md text-ink leading-relaxed">{scenario}</p>
      </div>
      {multiSelect && (
        <p className="text-label-xs text-mute uppercase tracking-wider mb-3">Select all that apply</p>
      )}
      <div className="space-y-2">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`w-full text-left p-4 border transition-all ${
              isSelected(opt.id)
                ? 'border-ink bg-ink/5'
                : 'border-hairline-soft bg-canvas hover:border-ink/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 flex-shrink-0 mt-0.5 border-2 flex items-center justify-center ${
                multiSelect ? 'rounded-none' : 'rounded-full'
              } ${isSelected(opt.id) ? 'border-ink' : 'border-hairline'}`}>
                {isSelected(opt.id) && (
                  <div className={`w-2.5 h-2.5 bg-ink ${multiSelect ? '' : 'rounded-full'}`} />
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

export default DecisionTreeQuestion;
