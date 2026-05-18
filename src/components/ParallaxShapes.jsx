import React, { useRef, useEffect } from 'react';

const shapes = [
  { size: 300, color: 'rgba(26,107,60,0.04)', radius: '50%', speed: 0.015, x: 0.1, y: 0.2 },
  { size: 200, color: 'rgba(26,107,60,0.03)', radius: '50%', speed: 0.025, x: 0.8, y: 0.1 },
  { size: 150, color: 'rgba(13,148,136,0.04)', radius: '30%', speed: 0.035, x: 0.2, y: 0.7 },
  { size: 250, color: 'rgba(26,107,60,0.03)', radius: '20%', speed: 0.02, x: 0.7, y: 0.8 },
  { size: 100, color: 'rgba(217,119,6,0.03)', radius: '50%', speed: 0.05, x: 0.5, y: 0.3 },
  { size: 180, color: 'rgba(26,107,60,0.025)', radius: '50%', speed: 0.04, x: 0.3, y: 0.5 },
  { size: 80, color: 'rgba(13,148,136,0.04)', radius: '50%', speed: 0.06, x: 0.9, y: 0.6 },
  { size: 120, color: 'rgba(26,107,60,0.02)', radius: '15%', speed: 0.045, x: 0.6, y: 0.4 },
];

const ParallaxShapes = () => {
  const refs = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let frame;
    const animate = () => {
      const m = mouseRef.current;
      const s = scrollRef.current;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const shape = shapes[i];
        const baseX = shape.x * window.innerWidth;
        const baseY = shape.y * window.innerHeight + s * (0.3 - i * 0.02);
        const offsetX = m.x * shape.speed * window.innerWidth;
        const offsetY = m.y * shape.speed * window.innerHeight;
        el.style.transform = `translate(${baseX + offsetX - shape.size / 2}px, ${baseY + offsetY - shape.size / 2}px)`;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <div
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            borderRadius: shape.radius,
            transition: 'none',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxShapes;
