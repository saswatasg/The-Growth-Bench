import React from 'react';

const SimulationQuestion = ({ question, answer, onChange }) => {
  const { context, task, steps } = question.data;

  const updateStep = (stepIndex, value) => {
    const updated = { ...(answer || {}) };
    updated[stepIndex] = value;
    onChange(updated);
  };

  const updateMultiSelect = (stepIndex, option) => {
    const updated = { ...(answer || {}) };
    const current = updated[stepIndex] || [];
    if (current.includes(option)) {
      updated[stepIndex] = current.filter(o => o !== option);
    } else {
      updated[stepIndex] = [...current, option];
    }
    onChange(updated);
  };

  return (
    <div>
      <div className="p-5 bg-soft-cloud border border-hairline-soft mb-4">
        <p className="text-body-md text-ink leading-relaxed">{context}</p>
      </div>
      <p className="text-body-md text-ink font-medium mb-6">{task}</p>

      <div className="space-y-6">
        {steps.map((step, i) => (
          <div key={i}>
            <label className="text-body-sm text-ink font-medium mb-2 block">
              {i + 1}. {step.prompt}
            </label>

            {step.type === 'textarea' && (
              <textarea
                value={(answer && answer[i]) || ''}
                onChange={(e) => updateStep(i, e.target.value)}
                placeholder="Type your answer..."
                rows={4}
                className="w-full px-4 py-3 text-body-md bg-canvas border border-hairline-soft focus:outline-none focus:border-ink transition-colors resize-y"
              />
            )}

            {step.type === 'multi-select' && step.options && (
              <div className="space-y-2">
                {step.options.map(opt => (
                  <label key={opt} className="flex items-center gap-3 p-3 bg-canvas border border-hairline-soft cursor-pointer hover:border-ink transition-colors">
                    <input
                      type="checkbox"
                      checked={(answer?.[i] || []).includes(opt)}
                      onChange={() => updateMultiSelect(i, opt)}
                      className="w-4 h-4 accent-ink"
                    />
                    <span className="text-body-sm text-ink">{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimulationQuestion;
