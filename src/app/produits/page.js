'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import NavbarWrapper from "../../components/NavbarWrapper";
import ScrollAnimation from "../../components/ScrollAnimation";
import HeroSlider from "../../components/HeroSlider";

export default function Produits() {
  const [mounted, setMounted] = useState(false);

  // Données pour le slider - adaptées à vos services
  const slidesData = useMemo(() => [
    {
      id: 1,
      title: "E-commerce",
      description: "Solutions de vente en ligne performantes avec Next.js et Stripe. Interface moderne, paiements sécurisés et gestion complète des stocks.",
      image: "/images/6461401.jpg",
      link: "/contact"
    },
    {
      id: 2,
      title: "Portfolio",
      description: "Sites vitrines élégants et responsives avec React et Tailwind CSS. Design sur-mesure pour mettre en valeur votre activité.",
      image: "/images/3560840.jpg",
      link: "/contact"
    },
    {
      id: 3,
      title: "Applications Web",
      description: "Développement d'applications web modernes et performantes. Interface utilisateur intuitive et expérience optimisée.",
      image: "/images/4905662.jpg",
      link: "/contact"
    },
    {
      id: 4,
      title: "SEO & Performance",
      description: "Optimisation complète pour les moteurs de recherche. Amélioration des performances et de la visibilité en ligne.",
      image: "/images/1690.jpg",
      link: "/contact"
    },
    {
      id: 5,
      title: "Solutions IA",
      description: "Intégration d'intelligence artificielle dans vos projets web. Automatisation et fonctionnalités intelligentes sur mesure.",
      image: "/images/852.jpg",
      link: "/contact"
    }
  ], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Chargement...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <NavbarWrapper />
      
      <main className="h-full overflow-hidden flex flex-col">
        <div className="flex-1 overflow-hidden flex flex-col">
          
          {/* Header - Compact */}
          <div className="flex-shrink-0 pt-4 pb-2 px-6 bg-black/50 backdrop-blur-sm">
            <ScrollAnimation type="left" className="mb-1">
              <Link 
                href="/?skipIntro=true" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                ← Retour à l&apos;accueil
              </Link>
            </ScrollAnimation>

            <ScrollAnimation type="up" className="text-center">
             
              
            </ScrollAnimation>
          </div>

          {/* Hero Slider - Prend tout l'espace restant */}
          <div className="flex-1">
            <HeroSlider slides={slidesData} fullscreen={true} />
          </div>

        </div>
      </main>
    </div>
  );
}
