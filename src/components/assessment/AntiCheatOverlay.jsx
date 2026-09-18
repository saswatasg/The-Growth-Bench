import React from 'react';

const AntiCheatOverlay = ({ children, participantName = '', onExitViolation }) => {
  const containerRef = React.useRef(null);
  const exitCountRef = React.useRef(0);
  const isFullscreenRef = React.useRef(false);

  // Request fullscreen on mount
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const requestFS = async () => {
      try {
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        isFullscreenRef.current = true;
      } catch (e) {
        console.warn('Fullscreen request failed:', e);
      }
    };

    requestFS();

    // Block copy/paste/contextmenu
    const block = (e) => e.preventDefault();
    const handlers = [
      ['copy', block],
      ['cut', block],
      ['paste', block],
      ['contextmenu', block],
      ['dragstart', block],
    ];
    handlers.forEach(([event, handler]) => el.addEventListener(event, handler));

    return () => {
      handlers.forEach(([event, handler]) => el.removeEventListener(event, handler));
    };
  }, []);

  // Detect fullscreen exit
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
      isFullscreenRef.current = isFS;

      if (!isFS) {
        // User exited fullscreen
        exitCountRef.current += 1;
        if (exitCountRef.current >= 2) {
          // Second exit — end the test
          onExitViolation?.('ended');
        } else {
          // First exit — warn and re-enter fullscreen
          onExitViolation?.('warning');
          // Re-enter fullscreen after a brief delay
          setTimeout(() => {
            const el = containerRef.current;
            if (el && !document.fullscreenElement) {
              try {
                if (el.requestFullscreen) el.requestFullscreen();
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
              } catch (e) {
                // Fullscreen re-entry failed — count as another violation
                exitCountRef.current += 1;
                if (exitCountRef.current >= 2) onExitViolation?.('ended');
              }
            }
          }, 500);
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [onExitViolation]);

  // Detect tab visibility change
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs or minimized
        exitCountRef.current += 1;
        if (exitCountRef.current >= 2) {
          onExitViolation?.('ended');
        } else {
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
