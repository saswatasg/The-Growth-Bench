import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorContext = createContext({ setCursorState: () => {} });

export const useCursor = () => useContext(CursorContext);

const CURSOR_STATES = {
  default: { ringSize: 40, dotSize: 6 },
  'hover-link': { ringSize: 64, dotSize: 0 },
  'hover-interactive': { ringSize: 80, dotSize: 0 },
  'hover-image': { ringSize: 96, dotSize: 0 },
  'hover-button': { ringSize: 52, dotSize: 10 },
};

const CursorInner = ({ cursorX, cursorY, state }) => {
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const ringX = useSpring(cursorX, { stiffness: 180, damping: 18, mass: 0.12 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 18, mass: 0.12 });

  const dotX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.06 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.06 });

  const trail1X = useSpring(cursorX, { stiffness: 280, damping: 22, mass: 0.1 });
  const trail1Y = useSpring(cursorY, { stiffness: 280, damping: 22, mass: 0.1 });
  const trail2X = useSpring(cursorX, { stiffness: 200, damping: 20, mass: 0.12 });
  const trail2Y = useSpring(cursorY, { stiffness: 200, damping: 20, mass: 0.12 });

  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [cursorX, cursorY, visible]);

  const config = CURSOR_STATES[state] || CURSOR_STATES.default;
  const diff = 'difference';
  const trails = [
    { x: trail1X, y: trail1Y, size: 3, opacity: 0.6, stiffness: 280, damping: 22 },
    { x: trail2X, y: trail2Y, size: 2, opacity: 0.35, stiffness: 200, damping: 20 },
  ];

  return (
    <>
      {/* Ring — follows with elastic lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: config.ringSize,
          height: config.ringSize,
          opacity: visible ? 1 : 0,
          scale: isClicking ? 0.82 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, scale: { duration: 0.12 } }}
      >
        <div className="w-full h-full rounded-full border border-white" style={{ mixBlendMode: diff }} />
      </motion.div>

      {/* Main dot — snaps to cursor */}
      {config.dotSize > 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
          animate={{
            width: config.dotSize,
            height: config.dotSize,
            opacity: visible ? 1 : 0,
            scale: isClicking ? 1.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30, scale: { duration: 0.08 } }}
        >
          <div className="w-full h-full rounded-full bg-white" style={{ mixBlendMode: diff }} />
        </motion.div>
      )}

      {/* Trail dots */}
      {trails.map((t, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{ x: t.x, y: t.y, translateX: '-50%', translateY: '-50%' }}
          animate={{
            width: t.size,
            height: t.size,
            opacity: visible ? t.opacity : 0,
          }}
          transition={{ type: 'spring', stiffness: t.stiffness, damping: t.damping }}
        >
          <div className="w-full h-full rounded-full bg-white" style={{ mixBlendMode: diff }} />
        </motion.div>
      ))}
    </>
  );
};

const CustomCursor = () => {
  const [hidden, setHidden] = useState(true);
  const [state, setState] = useState('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const setCursorState = useCallback((newState) => {
    setState(newState);
  }, []);

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setHidden(touch || reduced);
  }, []);

  return (
    <CursorContext.Provider value={{ setCursorState }}>
      {!hidden && <CursorInner cursorX={cursorX} cursorY={cursorY} state={state} />}
    </CursorContext.Provider>
  );
};

export default CustomCursor;
