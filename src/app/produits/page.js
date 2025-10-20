'use client';

import { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarWrapper from "../../components/NavbarWrapper";
import Footer from "../../components/Footer";
import "../../styles/animated-cards.css";

export default function Produits() {
  const realisations = useMemo(() => [
    {
      id: 1,
      title: "E-commerce",
      description: "Next.js • Stripe",
      image: "/images/3496219.jpg",
      alt: "E-commerce Luxe",
      details: "Plateforme e-commerce complète avec système de paiement intégré"
    },
    {
      id: 2,
      title: "Portfolio",
      description: "React • Tailwind",
      image: "/images/3560840.jpg",
      alt: "Portfolio Créatif",
      details: "Portfolio moderne et interactif pour créatifs et professionnels"
    },
    {
      id: 3,
      title: "Site vitrine",
      description: "Next.js • Vercel",
      image: "/images/4905662.jpg",
      alt: "Landing SaaS",
      details: "Site vitrine optimisé pour la conversion et le SEO"
    },
    {
      id: 4,
      title: "Application Web",
      description: "React • Node.js",
      image: "/images/3496219.jpg",
      alt: "Application Web",
      details: "Application web sur mesure avec backend personnalisé"
    },
    {
      id: 5,
      title: "Dashboard",
      description: "Vue.js • Analytics",
      image: "/images/3560840.jpg",
      alt: "Dashboard Analytics",
      details: "Interface d'administration avec tableaux de bord avancés"
    },
    {
      id: 6,
      title: "Mobile App",
      description: "React Native • API",
      image: "/images/4905662.jpg",
      alt: "Application Mobile",
      details: "Application mobile cross-platform performante"
    }
  ], []);

  useEffect(() => {
    // Précharger les images
    realisations.forEach(realisation => {
      const img = new window.Image();
      img.src = realisation.image;
    });
  }, [realisations]);

  return (
    <>
      <NavbarWrapper />
      <div className="min-h-screen pt-20 px-6 md:px-20 py-12 relative overflow-hidden" style={{ background: '#212534' }}>
        {/* Background avec gradient et effets */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#212534] via-gray-900 to-black">
          {/* Circles décoratifs */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-16 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          
          {/* Grid pattern subtil */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Contenu par-dessus le background */}
        <div className="relative z-10">
          <Link href="/?skipIntro=true" className="text-blue-400 mb-8 inline-block hover:text-blue-300 transition-colors">
            ← Accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Nos Solutions</h1>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Découvrez notre gamme complète de solutions digitales conçues pour faire prospérer votre entreprise
          </p>
          
          {/* Grille des cartes animées */}
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {realisations.map((realisation) => (
              <div key={realisation.id} className="animated-card">
                <div className="card-content">
                  <div className="card-image">
                    <Image 
                      src={realisation.image} 
                      alt={realisation.alt} 
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRobHB0eH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/2gAMAwEAAhEDEQA/AL+AD//Z"
                    />
                  </div>
                  <div>
                    <h3 className="card-title">{realisation.title}</h3>
                    <p className="card-description">{realisation.description}</p>
                    <p className="text-xs mt-2 opacity-60" style={{ fontFamily: 'sans-serif', color: 'inherit' }}>
                      {realisation.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">Prêt à démarrer votre projet ?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
