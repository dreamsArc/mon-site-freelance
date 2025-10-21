'use client';
import { useState, useEffect, useRef } from 'react';

export default function HeroSlider({ slides = [], fullscreen = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [direction, setDirection] = useState(1); // 1 pour avant, -1 pour arrière
  const [isScrolling, setIsScrolling] = useState(false);
  const slidesRef = useRef(null);

  // Navigation avec direction automatique et va-et-vient
  const navigateSlide = (increment) => {
    setCurrentSlide(prev => {
      const nextSlide = prev + increment;
      
      // Si on atteint la fin (dernière image)
      if (nextSlide >= slides.length - 1) {
        setDirection(-1); // Changer direction vers arrière
        return slides.length - 1;
      }
      
      // Si on atteint le début (première image)
      if (nextSlide <= 0) {
        setDirection(1); // Changer direction vers avant
        return 0;
      }
      
      return nextSlide;
    });
  };

  // Navigation manuelle
  const nextSlide = () => {
    navigateSlide(1);
    setDirection(1);
  };

  const prevSlide = () => {
    navigateSlide(-1);
    setDirection(-1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Déterminer la direction basée sur le mouvement
    setDirection(index > currentSlide ? 1 : -1);
  };

  // Détection des breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mise à jour du style transform pour le scroll horizontal sur desktop
  useEffect(() => {
    if (isDesktop && fullscreen && slidesRef.current) {
      const translateX = -currentSlide * 20; // 20% par slide
      slidesRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentSlide, isDesktop, fullscreen]);

  // Auto-play adaptatif selon l'écran
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    
    // Différents intervalles selon l'écran
    const interval = setInterval(() => {
      navigateSlide(direction);
    }, isMobile ? 6000 : isTablet ? 5000 : 4000); // Plus lent sur mobile
    
    return () => clearInterval(interval);
  }, [currentSlide, direction, isAutoPlaying, slides.length, isMobile, isTablet]);

  // Pause auto-play au survol et gestion du scroll de la page (seulement desktop)
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsAutoPlaying(false);
      // Bloquer le scroll de la page en mode fullscreen desktop
      if (isDesktop && fullscreen) {
        document.body.style.overflow = 'hidden';
      }
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsAutoPlaying(true);
      // Rétablir le scroll de la page
      if (isDesktop && fullscreen) {
        document.body.style.overflow = 'auto';
      }
    }
  };

  // Contrôle du throttling pour le scroll déjà défini en haut

  // Gestion du scroll horizontal avec va-et-vient
  const handleScroll = (e) => {
    if (isDesktop && fullscreen && !isScrolling) {
      e.preventDefault();
      e.stopPropagation();
      
      const delta = e.deltaX || e.deltaY;
      
      if (Math.abs(delta) > 30) { // Seuil plus élevé pour éviter les scrolls accidentels
        setIsScrolling(true);
        
        // Déterminer la direction du scroll
        const scrollDirection = delta > 0 ? 1 : -1;
        navigateSlide(scrollDirection);
        setDirection(scrollDirection);
        
        // Empêcher les scrolls multiples rapides
        setTimeout(() => {
          setIsScrolling(false);
        }, 800); // Délai de 800ms entre chaque changement
      }
    }
  };

  // Navigation clavier avec va-et-vient
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isDesktop && fullscreen && !isScrolling) {
        setIsScrolling(true);
        
        if (e.key === 'ArrowLeft') {
          navigateSlide(-1);
          setDirection(-1);
        } else if (e.key === 'ArrowRight') {
          navigateSlide(1);
          setDirection(1);
        } else {
          setIsScrolling(false);
          return;
        }
        
        setTimeout(() => setIsScrolling(false), 300);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDesktop, fullscreen, isScrolling]);

  // Variables pour la navigation touch
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Fonctions de gestion des événements touch
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      navigateSlide('next');
    }
    if (isRightSwipe && currentSlide > 0) {
      navigateSlide('prev');
    }
  };

  // Nettoyage à la destruction du composant
  useEffect(() => {
    return () => {
      // Rétablir le scroll au cas où le composant serait démonté pendant un hover
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Indicateur de direction pour l'utilisateur
  const getDirectionIndicator = () => {
    if (currentSlide === 0) return '→';
    if (currentSlide === slides.length - 1) return '←';
    return direction === 1 ? '→' : '←';
  };

  if (slides.length === 0) return null;

  return (
    <div 
      className={`hero-slider ${fullscreen ? 'fullscreen' : ''} ${
        currentSlide === 0 ? 'at-start' : ''
      } ${
        currentSlide === slides.length - 1 ? 'at-end' : ''
      } ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''} ${isDesktop ? 'desktop' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slides" ref={slidesRef}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              {slide.link && (
                <a href={slide.link} className="slide-btn">
                  En savoir plus
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation avec indication de direction - masquée sur mobile */}
      {!isMobile && (
        <div className="slider-nav">
          <button 
            className="nav-btn prev" 
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            ←
          </button>
          <button 
            className="nav-btn next" 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            →
          </button>
        </div>
      )}

      <ul className="dots">
        {slides.map((_, index) => (
          <li
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </ul>

      {/* Zone de détection du hover en bas - Desktop uniquement */}
      {isDesktop && fullscreen && (
        <div className="hover-zone-bottom"></div>
      )}

      {/* Indicateur de swipe pour mobile */}
      {isMobile && (
        <div className="swipe-indicator">
          <div className="swipe-hint">
            <span>←</span>
            <span>Glissez pour naviguer</span>
            <span>→</span>
          </div>
        </div>
      )}

      {/* Barre de progression avec miniatures - n'apparaît qu'au hover du bas */}
      {isDesktop && fullscreen && (
        <div className="image-progress-bar">
          <div className="progress-track">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`progress-thumbnail ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                style={{ backgroundImage: `url('${slide.image}')` }}
                data-title={slide.title}
              />
            ))}
            
            {/* Indicateur de progression avec direction */}
            <div 
              className={`progress-indicator ${direction === -1 ? 'reverse' : ''}`}
              style={{
                width: `${100 / slides.length}%`,
                left: `${(currentSlide * 100) / slides.length}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Message d'aide avec indication de direction */}
      {isDesktop && fullscreen && (
        <div className="scroll-hint">
          <p>
            Survolez le bas pour les miniatures • Molette ou ← → pour naviguer
            <span className="direction-indicator">
              {getDirectionIndicator()} Direction: {direction === 1 ? 'Avant' : 'Arrière'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}