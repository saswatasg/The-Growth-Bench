import React from 'react';

const EDGE_THRESHOLD_PERCENT = 2;

const AntiCheatOverlay = ({ children, participantName = '', onViolation }) => {
  const containerRef = React.useRef(null);

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

  // Mouse proximity detection
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
        onViolation?.('mouse_edge');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
