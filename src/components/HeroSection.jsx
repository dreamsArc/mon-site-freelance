"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const APPEAR_AT = 6.3; // secondes : début des animations

// Variantes partagées pour chaque lettre
const LETTER_VARIANTS = {
  hidden:  { x: -32, opacity: 0, filter: "blur(5px)" },
  visible: { x: 0,   opacity: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 110, damping: 16 } },
};

// Composant lettre par lettre avec effet patinage
function SkateText({ text, className, delay = 0, stagger = 0.048 }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: char === " " ? "inline" : "inline-block" }}
          variants={LETTER_VARIANTS}
        >
          {char === " " ? "\u00a0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function HeroSection() {
  const videoRef    = useRef(null);
  const prevTimeRef = useRef(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const t = video.currentTime;

      // Détection du rebouclage (temps a reculé de plus de 1s)
      if (t < prevTimeRef.current - 1) {
        setShowContent(false);
      }
      prevTimeRef.current = t;

      // Apparition à 6.3s — reste visible jusqu'au rebouclage
      if (t >= APPEAR_AT) setShowContent(true);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section className="h-screen flex flex-col justify-end items-start -mt-20 px-6 md:px-20 pb-16 relative overflow-hidden">
      {/* Background vidéo */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/pixel-creation-studio-opt.webm"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5" style={{ background: "linear-gradient(to top, rgba(4,6,16,0.85) 0%, transparent 100%)" }} />
      </div>

      {/* Contenu bas-gauche — apparaît à 6.3s, reste jusqu'au rebouclage */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            key="hero-content"
            className="relative z-10 max-w-2xl"
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          >
            {/* Surtitle — delay 0 */}
            <p className="text-or text-sm tracking-widest uppercase mb-3 leading-none">
              <SkateText
                text="Développement Web • Intelligence Artificielle • Créateur de contenu"
                delay={0}
                stagger={0.022}
              />
            </p>

            {/* H1 marque — delay 0.55s */}
            <h1 className="text-3xl md:text-[2.6rem] font-extrabold leading-snug text-gray-100">
              <SkateText
                text="Pixel Création Studio"
                className="text-or"
                delay={0.55}
                stagger={0.055}
              />
              <br />
              {/* Sous-titre — delay 1.6s */}
              <SkateText
                text="Expériences web rapides, modernes et sécurisées."
                className="font-semibold text-[1.4rem] md:text-[1.7rem] text-gray-200"
                delay={1.6}
                stagger={0.038}
              />
            </h1>

            {/* Paragraphe — delay 2.7s */}
            <p className="mt-4 text-[0.95rem] md:text-[1.1rem] text-gray-300 max-w-lg">
              <SkateText
                text="Sites performants, sécurisés et optimisés SEO pour entreprises, particuliers et professionnels."
                delay={2.7}
                stagger={0.025}
              />
            </p>

            {/* Bouton — delay 3.9s */}
            <motion.div
              className="mt-6"
              initial={{ x: -40, opacity: 0, filter: "blur(4px)" }}
              animate={{ x: 0,   opacity: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: 3.9 }}
            >
              <a href="/contact" className="btn-radiant inline-block">
                Me contacter
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

