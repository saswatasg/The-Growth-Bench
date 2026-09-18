import React from 'react';

const ScenarioQuestion = ({ question, answer, onChange }) => {
  const { scenario, task, rubric } = question.data;

  return (
    <div>
      <div className="p-5 bg-soft-cloud border border-hairline-soft mb-4">
        <p className="text-body-md text-ink leading-relaxed">{scenario}</p>
      </div>
      <p className="text-body-md text-ink font-medium mb-3">{task}</p>
      {rubric && (
        <div className="mb-4">
          <p className="text-label-xs text-mute uppercase tracking-wider mb-2">Your answer will be evaluated on:</p>
          <ul className="space-y-1">
            {rubric.map((r, i) => (
              <li key={i} className="text-body-sm text-mute flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mute flex-shrink-0 mt-2" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
      <textarea
        value={answer || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
        rows={8}
        className="w-full px-4 py-3 text-body-md bg-canvas border border-hairline-soft focus:outline-none focus:border-ink transition-colors resize-y"
      />
    </div>
  );
};

export default ScenarioQuestion;
