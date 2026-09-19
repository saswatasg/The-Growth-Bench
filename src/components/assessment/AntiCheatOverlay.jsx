import React from 'react';

const EDGE_THRESHOLD_PERCENT = 3;
const THROTTLE_MS = 200;

const AntiCheatOverlay = ({ children, participantName = '', onViolation }) => {
  const containerRef = React.useRef(null);
  const lastCheckRef = React.useRef(0);

  // Block copy/paste/contextmenu
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const block = (e) => e.preventDefault();
    const handlers = [
      ['copy', block],
      ['cut', block],
      ['paste', block],
      ['contextmenu', block],
      ['dragstart', block],
    ];
    handlers.forEach(([event, handler]) => el.addEventListener(event, handler));
    return () => handlers.forEach(([event, handler]) => el.removeEventListener(event, handler));
  }, []);

  // Mouse proximity detection — throttled
  React.useEffect(() => {
    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const now = Date.now();
        if (now - lastCheckRef.current < THROTTLE_MS) return;
        lastCheckRef.current = now;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const thresholdX = innerWidth * (EDGE_THRESHOLD_PERCENT / 100);
        const thresholdY = innerHeight * (EDGE_THRESHOLD_PERCENT / 100);

        const nearEdge =
          clientX <= thresholdX ||
          clientX >= innerWidth - thresholdX ||
          clientY <= thresholdY ||
          clientY >= innerHeight - thresholdY;

        if (nearEdge) {
          onViolation?.('mouse_edge');
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onViolation]);

  // Window blur detection (multi-monitor)
  React.useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement?.tagName === 'IFRAME') return;
      onViolation?.('window_blur');
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [onViolation]);

  // Tab visibility detection
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onViolation?.('tab_switch');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [onViolation]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Watermark overlay */}
      {participantName && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className="absolute text-[10px] text-mute font-mono whitespace-nowrap"
              style={{
                top: `${(i + 1) * 12}%`,
                left: `${(i % 3) * 30 + 5}%`,
                transform: `rotate(-15deg)`,
              }}
            >
              {participantName} — {new Date().toISOString().split('T')[0]}
            </span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

export default AntiCheatOverlay;
