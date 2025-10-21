'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollAnimation = ({ 
  children, 
  className = '', 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  distance = 50,
  once = true,
  threshold = 0.1 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold,
    margin: "-10% 0px -10% 0px" 
  });

  // Variants d'animation selon la direction
  const variants = {
    up: {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 }
    },
    down: {
      initial: { opacity: 0, y: -distance },
      animate: { opacity: 1, y: 0 }
    },
    left: {
      initial: { opacity: 0, x: distance },
      animate: { opacity: 1, x: 0 }
    },
    right: {
      initial: { opacity: 0, x: -distance },
      animate: { opacity: 1, x: 0 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    rotate: {
      initial: { opacity: 0, rotate: -10, scale: 0.95 },
      animate: { opacity: 1, rotate: 0, scale: 1 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Courbe d'animation fluide
        type: "tween"
      }}
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
  duration = 0.6,
  distance = 50,
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
    up: {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 }
    },
    down: {
      initial: { opacity: 0, y: -distance },
      animate: { opacity: 1, y: 0 }
    },
    left: {
      initial: { opacity: 0, x: distance },
      animate: { opacity: 1, x: 0 }
    },
    right: {
      initial: { opacity: 0, x: -distance },
      animate: { opacity: 1, x: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    }
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
            transition={{
              duration,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {child}
          </motion.div>
        )) 
        : 
        <motion.div
          variants={itemVariants[direction]}
          transition={{
            duration,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
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
    duration = 0.6,
    distance = 50,
    once = true,
    threshold = 0.1
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold,
    margin: "-10% 0px -10% 0px"
  });

  const variants = {
    initial: { 
      opacity: 0, 
      ...(direction === 'up' && { y: distance }),
      ...(direction === 'down' && { y: -distance }),
      ...(direction === 'left' && { x: distance }),
      ...(direction === 'right' && { x: -distance }),
      ...(direction === 'scale' && { scale: 0.8 }),
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return { ref, variants, isInView };
};

export default ScrollAnimation;