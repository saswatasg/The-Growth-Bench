import React from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ seconds, onExpire }) => {
  const startRef = React.useRef(Date.now());
  const expiredRef = React.useRef(false);
  const [remaining, setRemaining] = React.useState(seconds);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      const left = Math.max(0, seconds - elapsed);
      setRemaining(left);

      if (left <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const warning = remaining <= 300 && remaining > 0;
  const lastMinute = remaining <= 60 && remaining > 0;

  return (
    <div className={`flex items-center gap-2 text-body-sm font-mono ${warning ? 'text-sale' : 'text-mute'}`}>
      <Clock className="w-4 h-4" />
      <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
      {lastMinute && <span className="text-caption-sm text-sale ml-2">Final minute</span>}
      {warning && !lastMinute && <span className="text-caption-sm text-sale ml-2">{Math.ceil(remaining / 60)} min left</span>}
    </div>
  );
};

export default Timer;
