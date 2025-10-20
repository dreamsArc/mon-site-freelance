'use client';
import { useEffect, useState, useMemo } from 'react';
import { motion } from "framer-motion";

export default function Menu3D({ instanceId = null }) {
  const [clientId, setClientId] = useState(instanceId || '');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Générer l'ID seulement côté client pour éviter l'erreur d'hydratation
    if (!clientId) {
      setClientId(`menu3d-${Math.random().toString(36).substr(2, 9)}`);
    }
    
    // Délayer l'animation pour éviter les conflits avec l'IntroScreen
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [clientId]);

  // Mémoriser les variants pour éviter les re-calculs
  const variants = useMemo(() => ({
    card: {
      hidden: { y: 20, opacity: 0, rotateX: -15 },
      visible: (i) => ({
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      })
    },
    text: {
      hidden: { y: 15, opacity: 0 },
      visible: (i) => ({
        y: 0,
        opacity: 0,
        transition: {
          delay: i * 0.1 + 0.3,
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      })
    },
    container: {
      hidden: { opacity: 0, scale: 0.98 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }
  }), []);

  if (!isVisible) {
    return <div className="all" style={{ opacity: 0 }} />;
  }

  return (
    <motion.div 
      className="all"
      variants={variants.container}
      initial="hidden"
      animate="visible"
      {...(clientId && { 'data-menu3d-id': clientId })}
    >
      <motion.div 
        className="card-container"
        variants={variants.card}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="lefter"></div>
        <motion.div 
          className="text"
          variants={variants.text}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Performance
        </motion.div>
      </motion.div>

      <motion.div 
        className="card-container"
        variants={variants.card}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <div className="left"></div>
        <motion.div 
          className="text"
          variants={variants.text}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Sécurité
        </motion.div>
      </motion.div>

      <motion.div 
        className="card-container"
        variants={variants.card}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <div className="center">
          <div className="explainer"><span>Nos Services</span></div>
        </div>
        <motion.div 
          className="text"
          variants={variants.text}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Design
        </motion.div>
      </motion.div>

      <motion.div 
        className="card-container"
        variants={variants.card}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <div className="right"></div>
        <motion.div 
          className="text"
          variants={variants.text}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          SEO-friendly
        </motion.div>
      </motion.div>

      <motion.div 
        className="card-container"
        variants={variants.card}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <div className="righter"></div>
        <motion.div 
          className="text"
          variants={variants.text}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          IA
        </motion.div>
      </motion.div>
    </motion.div>
  );
}