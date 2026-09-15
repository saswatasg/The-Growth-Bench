import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorContext = createContext({ setCursorState: () => {} });

export const useCursor = () => useContext(CursorContext);

const TRAIL_COUNT = 5;

const CURSOR_STATES = {
  default: { mainSize: 8, trailSize: 4, ringSize: 36 },
  'hover-link': { mainSize: 0, trailSize: 0, ringSize: 56 },
  'hover-interactive': { mainSize: 0, trailSize: 0, ringSize: 72 },
  'hover-image': { mainSize: 0, trailSize: 0, ringSize: 88 },
  'hover-button': { mainSize: 10, trailSize: 5, ringSize: 48 },
};

const SPRING_CONFIGS = [
  { stiffness: 500, damping: 28, mass: 0.08 },
  { stiffness: 320, damping: 25, mass: 0.1 },
  { stiffness: 220, damping: 22, mass: 0.12 },
  { stiffness: 160, damping: 20, mass: 0.14 },
  { stiffness: 120, damping: 18, mass: 0.16 },
];

const CursorInner = ({ cursorX, cursorY, state }) => {
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const ringX = useSpring(cursorX, { stiffness: 200, damping: 20, mass: 0.15 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 20, mass: 0.15 });

  const dotX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.08 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.08 });

  const trail1X = useSpring(cursorX, SPRING_CONFIGS[1]);
  const trail1Y = useSpring(cursorY, SPRING_CONFIGS[1]);
  const trail2X = useSpring(cursorX, SPRING_CONFIGS[2]);
  const trail2Y = useSpring(cursorY, SPRING_CONFIGS[2]);
  const trail3X = useSpring(cursorX, SPRING_CONFIGS[3]);
  const trail3Y = useSpring(cursorY, SPRING_CONFIGS[3]);
  const trail4X = useSpring(cursorX, SPRING_CONFIGS[4]);
  const trail4Y = useSpring(cursorY, SPRING_CONFIGS[4]);

  useEffect(() => {
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

  const config = CURSOR_STATES[state] || CURSOR_STATES.default;

  const trailSprings = [
    { x: trail1X, y: trail1Y },
    { x: trail2X, y: trail2Y },
    { x: trail3X, y: trail3Y },
    { x: trail4X, y: trail4Y },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: config.ringSize,
          height: config.ringSize,
          opacity: visible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, scale: { duration: 0.15 } }}
      >
        <div className="w-full h-full rounded-full border-[1.5px] border-ink mix-blend-difference" />
      </motion.div>

      {config.mainSize > 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
          animate={{
            width: config.mainSize,
            height: config.mainSize,
            opacity: visible ? 1 : 0,
            scale: isClicking ? 1.6 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30, scale: { duration: 0.1 } }}
        >
          <div className="w-full h-full rounded-full bg-ink mix-blend-difference" />
        </motion.div>
      )}

      {trailSprings.map((t, i) => {
        const size = config.trailSize * (1 - (i + 1) * 0.15);
        return (
          <motion.div
            key={i}
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{ x: t.x, y: t.y, translateX: '-50%', translateY: '-50%' }}
            animate={{
              width: Math.max(size, 1),
              height: Math.max(size, 1),
              opacity: visible ? Math.max(1 - (i + 1) * 0.2, 0.1) : 0,
              scale: isClicking ? 1.4 : 1,
            }}
            transition={{ type: 'spring', stiffness: SPRING_CONFIGS[i + 1].stiffness, damping: SPRING_CONFIGS[i + 1].damping, scale: { duration: 0.12 } }}
          >
            <div className="w-full h-full rounded-full bg-ink mix-blend-difference" />
          </motion.div>
        );
      })}
    </>
  );
};

const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [state, setState] = useState('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const setCursorState = useCallback((newState) => {
    setState(newState);
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchDevice(isTouch || reducedMotion);
  }, []);

  return (
    <CursorContext.Provider value={{ setCursorState }}>
      {!isTouchDevice && <CursorInner cursorX={cursorX} cursorY={cursorY} state={state} />}
    </CursorContext.Provider>
  );
};

export default CustomCursor;
