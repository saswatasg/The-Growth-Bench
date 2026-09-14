import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

const CURSOR_STATES = {
  default: { size: 8, scale: 1, blend: 'difference' },
  'hover-link': { size: 40, scale: 1, blend: 'difference' },
  'hover-interactive': { size: 60, scale: 1, blend: 'difference' },
  'hover-image': { size: 80, scale: 1, blend: 'difference' },
};

const CustomCursor = () => {
  const [state, setState] = useState('default');
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchDevice(isTouch);
    prefersReducedMotion.current = reducedMotion;

    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, visible]);

  const setCursorState = useCallback((newState) => {
    setState(newState);
  }, []);

  if (isTouchDevice || prefersReducedMotion.current) return null;

  const config = CURSOR_STATES[state] || CURSOR_STATES.default;

  return (
    <CursorContext.Provider value={{ setCursorState }}>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: config.size,
          height: config.size,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div
          className="w-full h-full rounded-full bg-canvas"
          style={{ mixBlendMode: config.blend }}
        />
      </motion.div>
    </CursorContext.Provider>
  );
};

export default CustomCursor;
