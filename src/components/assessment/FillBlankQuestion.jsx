import React from 'react';

const FillBlankQuestion = ({ question, answer, onChange }) => {
  const { template, blanks } = question.data;

  const updateBlank = (position, value) => {
    const updated = { ...(answer || {}) };
    updated[position] = value;
    onChange(updated);
  };

  // Split template around blanks and render inputs inline
  const renderTemplate = () => {
    const parts = template.split('___');
    const result = [];
    parts.forEach((part, i) => {
      result.push(<span key={`text-${i}`}>{part}</span>);
      if (i < blanks.length) {
        const blank = blanks[i];
        result.push(
          <input
            key={`blank-${i}`}
            type="text"
            value={(answer && answer[blank.position]) || ''}
            onChange={(e) => updateBlank(blank.position, e.target.value)}
            placeholder={blank.placeholder}
            className="inline-block w-32 px-2 py-1 mx-1 text-body-md bg-soft-cloud border-b-2 border-ink focus:outline-none focus:border-info transition-colors text-center"
          />
        );
      }
    });
    return result;
  };

  return (
    <div>
      <div className="text-body-lg text-ink leading-relaxed p-6 bg-canvas border border-hairline-soft">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default FillBlankQuestion;
