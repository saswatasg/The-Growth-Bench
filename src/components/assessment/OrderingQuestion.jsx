import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const OrderingQuestion = ({ question, answer, onChange }) => {
  const { instruction, items } = question.data;
  const [ordered, setOrdered] = React.useState(
    answer || [...items].sort(() => Math.random() - 0.5).map(i => i.id)
  );

  React.useEffect(() => {
    onChange(ordered);
  }, [ordered]);

  const moveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...ordered];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setOrdered(newOrder);
  };

  const moveDown = (index) => {
    if (index === ordered.length - 1) return;
    const newOrder = [...ordered];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setOrdered(newOrder);
  };

  const getItemText = (id) => items.find(i => i.id === id)?.text || id;

  return (
    <div>
      <p className="text-body-md text-ink mb-4">{instruction}</p>
      <p className="text-label-xs text-mute uppercase tracking-wider mb-3">Drag to reorder (most suitable → least suitable)</p>
      <div className="space-y-2">
        {ordered.map((id, index) => (
          <div key={id} className="flex items-center gap-3 p-4 bg-canvas border border-hairline-soft">
            <span className="font-display text-heading-lg text-mute w-8 text-center">{index + 1}</span>
            <span className="flex-1 text-body-md text-ink">{getItemText(id)}</span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="p-1 text-mute hover:text-ink disabled:opacity-30 transition-colors"
                aria-label="Move up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === ordered.length - 1}
                className="p-1 text-mute hover:text-ink disabled:opacity-30 transition-colors"
                aria-label="Move down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderingQuestion;
