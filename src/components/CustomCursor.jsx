import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

const CURSOR_STATES = {
  default: {
    dot: { size: 6, opacity: 1 },
    ring: { size: 36, opacity: 1, borderWidth: 1.5 },
    label: '',
  },
  'hover-link': {
    dot: { size: 0, opacity: 0 },
    ring: { size: 56, opacity: 1, borderWidth: 2 },
    label: '',
  },
  'hover-interactive': {
    dot: { size: 0, opacity: 0 },
    ring: { size: 72, opacity: 1, borderWidth: 2 },
    label: '',
  },
  'hover-image': {
    dot: { size: 0, opacity: 0 },
    ring: { size: 88, opacity: 1, borderWidth: 1 },
    label: '',
  },
  'hover-button': {
    dot: { size: 8, opacity: 1 },
    ring: { size: 48, opacity: 1, borderWidth: 2 },
    label: '',
  },
};

const CustomCursor = () => {
  const [state, setState] = useState('default');
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useRef(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringSpringConfig = { stiffness: 250, damping: 22, mass: 0.15 };
  const dotSpringConfig = { stiffness: 600, damping: 28, mass: 0.08 };

  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);
  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

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

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
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
      {/* Ring cursor — follows with spring delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: config.ring.size,
          height: config.ring.size,
          opacity: visible ? config.ring.opacity : 0,
          borderWidth: config.ring.borderWidth,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 24,
          scale: { duration: 0.15 },
        }}
      >
        <div
          className="w-full h-full rounded-full border-ink mix-blend-difference"
          style={{ borderWidth: 'inherit' }}
        />
      </motion.div>

      {/* Dot cursor — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: config.dot.size,
          height: config.dot.size,
          opacity: visible ? config.dot.opacity : 0,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          scale: { duration: 0.1 },
        }}
      >
        <div className="w-full h-full rounded-full bg-ink mix-blend-difference" />
      </motion.div>
    </CursorContext.Provider>
  );
};

export default CustomCursor;
