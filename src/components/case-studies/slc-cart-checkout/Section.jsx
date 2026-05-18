import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Section = ({ title, children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`w-full mb-16 md:mb-24 ${className || ''}`}
    >
      {title && (
        <motion.h2
          variants={titleVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-foreground"
        >
          {title}
        </motion.h2>
      )}
      {children}
    </motion.section>
  );
};

export default Section;