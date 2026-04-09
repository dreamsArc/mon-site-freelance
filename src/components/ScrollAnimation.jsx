'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Courbe ease-out exponentielle : départ vif, arrivée très douce
const EASE = [0.22, 1, 0.36, 1];

const ScrollAnimation = ({ 
  children, 
  className = '', 
  direction = 'up', 
  delay = 0, 
  duration = 0.55,
  distance = 28,
  once = true,
  threshold = 0.08 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold,
    margin: "-3% 0px -3% 0px" 
  });

  const variants = {
    up:     { initial: { opacity: 0, y:  distance }, animate: { opacity: 1, y: 0 } },
    down:   { initial: { opacity: 0, y: -distance }, animate: { opacity: 1, y: 0 } },
    left:   { initial: { opacity: 0, x:  distance }, animate: { opacity: 1, x: 0 } },
    right:  { initial: { opacity: 0, x: -distance }, animate: { opacity: 1, x: 0 } },
    fade:   { initial: { opacity: 0 },               animate: { opacity: 1 } },
    scale:  { initial: { opacity: 0, scale: 0.94 },  animate: { opacity: 1, scale: 1 } },
    rotate: { initial: { opacity: 0, rotate: -6, scale: 0.96 }, animate: { opacity: 1, rotate: 0, scale: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants[direction]}
      transition={{ duration, delay, ease: EASE, type: "tween" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Composant pour animations en cascade (plusieurs éléments)
export const ScrollCascade = ({ 
  children, 
  className = '', 
  direction = 'up', 
  stagger = 0.1,
  duration = 0.55,
  distance = 28,
  once = true 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold: 0.1,
    margin: "-5% 0px -5% 0px" 
  });

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger
      }
    }
  };

  const itemVariants = {
    up:    { initial: { opacity: 0, y:  distance }, animate: { opacity: 1, y: 0 } },
    down:  { initial: { opacity: 0, y: -distance }, animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x:  distance }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -distance }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.94 },  animate: { opacity: 1, scale: 1 } },
    fade:  { initial: { opacity: 0 },               animate: { opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children) ? 
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={itemVariants[direction]}
            transition={{ duration, ease: EASE }}
          >
            {child}
          </motion.div>
        )) 
        :
        <motion.div
          variants={itemVariants[direction]}
          transition={{ duration, ease: EASE }}
        >
          {children}
        </motion.div>
      }
    </motion.div>
  );
};

// Hook personnalisé pour animations simples
export const useScrollAnimation = (options = {}) => {
  const {
    direction = 'up',
    delay = 0,
    duration = 0.55,
    distance = 28,
    once = true,
    threshold = 0.08
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold,
    margin: "-3% 0px -3% 0px"
  });

  const variants = {
    initial: { 
      opacity: 0, 
      ...(direction === 'up'    && { y:  distance }),
      ...(direction === 'down'  && { y: -distance }),
      ...(direction === 'left'  && { x:  distance }),
      ...(direction === 'right' && { x: -distance }),
      ...(direction === 'scale' && { scale: 0.94 }),
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      transition: { duration, delay, ease: EASE }
    }
  };

  return { ref, variants, isInView };
};

export default ScrollAnimation;