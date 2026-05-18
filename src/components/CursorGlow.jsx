import React, { useRef, useEffect } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouse = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
      }
    };

    const handleLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    const handleEnter = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,107,60,0.12) 0%, transparent 70%)',
        transform: 'translate(-200px, -200px)',
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
