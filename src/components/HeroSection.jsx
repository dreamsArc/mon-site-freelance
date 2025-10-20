"use client";
import { motion } from "framer-motion";


export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-start px-6 md:px-20 relative overflow-hidden">
      {/* Background avec gradient et effets */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Circles décoratifs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-or/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-16 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern subtil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Contenu par-dessus le background */}
      <div className="relative z-10">
        <motion.h2
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-or text-sm mb-3"
      >
        Développement Web • Inteligence Artificielle • Créateur de contenu 
      </motion.h2>

      <motion.h1
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-extrabold leading-tight text-white"
      >
         <span className="text-or">DigitalQbit Pixel</span><br />
        Concevoir et réaliser des expériences web rapides modernes et sécurisées.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 max-w-xl text-gray-300"
      >
        Sites performants, sécurisés et optimisés SEO pour entreprises, particuliers et professionnels.
      </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8"
        >
          <a href="/contact" className="btn-radiant inline-block">
            Me contacter
          </a>
        </motion.div>
      </div>
    </section>
  );
}