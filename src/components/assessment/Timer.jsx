import React from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ seconds, onExpire }) => {
  const [remaining, setRemaining] = React.useState(seconds);
  const expiredRef = React.useRef(false);

  React.useEffect(() => {
    if (remaining <= 0 && !expiredRef.current) {
      expiredRef.current = true;
      onExpire?.();
      return;
    }
    if (remaining <= 0) return;

    const timer = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(timer);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const warning = remaining <= 300 && remaining > 0;

  return (
    <div className={`flex items-center gap-2 text-body-sm font-mono ${warning ? 'text-sale' : 'text-mute'}`}>
      <Clock className="w-4 h-4" />
      <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
      {warning && <span className="text-caption-sm text-sale ml-2">5 min remaining</span>}
    </div>
  );
};

export default Timer;
