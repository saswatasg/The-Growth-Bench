import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const TiltCard = ({ children, className, style, tiltFactor = 10, glare = true, ...props }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -tiltFactor;
    const rotateY = (x - 0.5) * tiltFactor;
    setTilt({ rotateX, rotateY });
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos({ x: 50, y: 50 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      className={className}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d', ...style }}
      {...props}
    >
      {children}
      {glare && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};
