import React from 'react';

const EDGE_THRESHOLD_PERCENT = 2; // 2% from any edge
const MOUSE_CHECK_INTERVAL_MS = 100;

const AntiCheatOverlay = ({ children, participantName = '', onExitViolation }) => {
  const containerRef = React.useRef(null);
  const violationCountRef = React.useRef(0);
  const lastViolationRef = React.useRef(0);
  const warnedRef = React.useRef(false);

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

  // Mouse proximity detection — warns when cursor approaches screen edges
  React.useEffect(() => {
    const handleMouseMove = (e) => {
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
        const now = Date.now();
        // Debounce: only count once per second
        if (now - lastViolationRef.current < 1000) return;
        lastViolationRef.current = now;

        violationCountRef.current += 1;
        if (violationCountRef.current >= 2) {
          onExitViolation?.('ended');
        } else if (!warnedRef.current) {
          warnedRef.current = true;
          onExitViolation?.('warning');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [onExitViolation]);

  // Window blur detection — multi-monitor: cursor left browser window
  React.useEffect(() => {
    const handleBlur = () => {
      // Only count if the blur is from the window losing focus (not an iframe)
      if (document.activeElement?.tagName === 'IFRAME') return;

      const now = Date.now();
      if (now - lastViolationRef.current < 2000) return;
      lastViolationRef.current = now;

      violationCountRef.current += 1;
      if (violationCountRef.current >= 2) {
        onExitViolation?.('ended');
      } else if (!warnedRef.current) {
        warnedRef.current = true;
        onExitViolation?.('warning');
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [onExitViolation]);

  // Tab visibility detection
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const now = Date.now();
        if (now - lastViolationRef.current < 2000) return;
        lastViolationRef.current = now;

        violationCountRef.current += 1;
        if (violationCountRef.current >= 2) {
          onExitViolation?.('ended');
        } else if (!warnedRef.current) {
          warnedRef.current = true;
          onExitViolation?.('warning');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [onExitViolation]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Watermark overlay */}
      {participantName && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 200px,
              currentColor 200px,
              currentColor 201px
            )`,
          }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-mute font-mono whitespace-nowrap">
            {participantName} — {new Date().toISOString().split('T')[0]}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

export default AntiCheatOverlay;
