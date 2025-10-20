'use client';
import { useEffect, useState, useRef } from 'react';

export default function Menu3D({ instanceId = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clientId, setClientId] = useState(instanceId || '');
  const containerRef = useRef(null);
  const lastScrollY = useRef(0);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    // Générer l'ID seulement côté client pour éviter l'erreur d'hydratation
    if (!clientId) {
      setClientId(`menu3d-${Math.random().toString(36).substr(2, 9)}`);
    }
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        setIsOpen(false);
        setIsTransitioning(true);
        lastScrollY.current = currentScrollY;
        
      // Réinitialiser l'état de transition après l'animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2500); // Correspond à la durée de l'animation CSS (2.5s)
      }
    };

    // Ajouter l'ID à l'écouteur pour éviter les conflits
    const throttledHandleScroll = (() => {
      let timeoutId;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleScroll, 16); // ~60fps
      };
    })();

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Si déjà ouvert, ne rien faire
    if (isOpen) return;
    
    // Nettoyer tout timeout précédent
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Déclenchement immédiat
    setIsOpen(true);
    setIsTransitioning(true);
    
    // Réinitialiser après l'animation
    hoverTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);
  };

  const handleMouseLeave = () => {
    // Nettoyer les timeouts pour éviter les états incohérents
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  return (
    <div 
      className={`all ${isOpen ? 'opened' : ''} ${isTransitioning ? 'transitioning' : ''}`}
      {...(clientId && { 'data-menu3d-id': clientId })}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="lefter">
        <div className="text">Performance</div>
      </div>
      <div className="left">
        <div className="text">Sécurité</div>
      </div>
      <div className="center">
        <div className="explainer"><span>Nos Services</span></div>
        <div className="text">Design</div>
      </div>
      <div className="right">
        <div className="text">SEO-friendly</div>
      </div>
      <div className="righter">
        <div className="text">IA</div>
      </div>
    </div>
  );
}