import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QbitLogo from "./QbitLogo";
import Gallery3D from "./Gallery3D";

export default function IntroScreen({ onEnter }) {
  const skills = ["React", "Next.js", "Tailwind", "SEO", "Performance", "Mobile-first"];
  const [hovered, setHovered] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const btn = document.getElementById("enter-btn");
    if (btn) btn.focus();

    // Initialiser le canvas background - seulement côté client
    if (typeof window === 'undefined') return;
    
    const canvas = document.getElementById("intro-canvas");
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      
      const waterLineY = height / 2 + 30;
      
      const resizeHandler = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resizeHandler);

      function drawWaterSurface() {
        const gradient = ctx.createLinearGradient(0, waterLineY, 0, height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.1, 'rgba(10, 10, 15, 0.3)');
        gradient.addColorStop(0.5, 'rgba(10, 10, 15, 0.6)');
        gradient.addColorStop(1, 'rgba(5, 5, 10, 0.85)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, waterLineY, width, height - waterLineY);
        
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, waterLineY);
        ctx.lineTo(width, waterLineY);
        ctx.stroke();
      }

      function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, width, height);
        drawWaterSurface();
        requestAnimationFrame(animate);
      }

      animate();

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          className="introscreen fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background animé avec galerie 3D, canvas et circuits */}
          <div className="absolute inset-0 bg-black overflow-hidden">
            {/* Galerie 3D en arrière-plan */}
            <div className="absolute inset-0 z-0">
              <Gallery3D />
            </div>
            
            <canvas id="intro-canvas" className="absolute inset-0 w-full h-full z-5" style={{ opacity: 0.2 }}></canvas>
            
            {/* Circuits décoratifs */}
            <div className="circuits absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/3 pointer-events-none z-10">
              <div className="circuit-line absolute h-px bg-gradient-to-r from-transparent via-or/50 to-transparent opacity-30 w-2/5 top-1/5 left-1/10 animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
              <div className="circuit-line absolute h-px bg-gradient-to-r from-transparent via-or/50 to-transparent opacity-30 w-1/3 top-1/2 left-3/5" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
              <div className="circuit-line absolute h-px bg-gradient-to-r from-transparent via-or/50 to-transparent opacity-30 w-2/5 top-3/4 left-1/20" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
            </div>
          </div>

          <div className="max-w-3xl w-full p-6 text-center relative z-30">
        <div className="mb-8 relative">
          {/* Logo à son ancienne position au-dessus */}
          <div className="mx-auto mb-4 flex justify-center relative z-40">
            <QbitLogo size="normal" />
          </div>

          <div className="text-center relative z-40">
            <div className="qbit-text-logo mb-6">
              DIGITAL QBIT PIXEL
            </div>
            <div className="qbit-text-reflection">
              DIGITAL QBIT PIXEL
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 mt-6 relative z-40">
            Anthony Pichot — Développeur Web
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto relative z-40">
            Entrez dans l'expérience Qbit Pixel et découvrez des sites performants,
            modernes et pensés avec l'intelligence artificielle.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((s, i) => (
              <div
                key={s}
                className={`px-3 py-2 rounded-full border border-gray-700 text-sm text-gray-200 cursor-default shadow-sm ${hovered === i ? "bg-or/10" : "bg-white/1"}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            id="enter-btn"
            onClick={() => handleEnter()}
            className="btn-radiant pulse-neon focus:outline-none"
          >
            Entrer
          </button>

          <button
            onClick={() => handleEnter()}
            className="px-4 py-3 rounded-full border border-gray-700 text-sm text-gray-300 hover:bg-white/2"
            title="Accès rapide"
          >
            Accès rapide
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Astuce : explore les réalisations une fois à l'intérieur.
        </p>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
