'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import IntroScreen from "@/components/IntroScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ScrollWrapper from "@/components/ScrollWrapper";
import Menu3D from "@/components/Menu3D";
import ScrollAnimation, { ScrollCascade } from '@/components/ScrollAnimation';
import Link from "next/link";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Vérifier d'abord si le composant est monté
    setMounted(true);
    
    // Vérifier les paramètres URL côté client seulement
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('skipIntro') === 'true') {
      setEntered(true);
    }

    // Précharger les images critiques pour éviter les sauts
    const criticalImages = [
      '/images/3496219.webp',
      '/images/3560840.webp',
      '/images/4905662.webp'
    ];
    
    criticalImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Ne pas rendre le contenu jusqu'à ce que le composant soit monté
  if (!mounted) {
    return null;
  }

  return (
    <>
      {!entered && <IntroScreen onEnter={() => setEntered(true)} />}

      <div className={`min-h-screen transition-opacity duration-300 ${entered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <NavbarWrapper autoHide={entered} />
        <ScrollWrapper>
          <main className="min-h-screen pt-20">
            <HeroSection />
            

            
            {/* Menu3D au-dessus du titre "Nos Solutions et services" */}
            <ScrollAnimation direction="up" delay={0} duration={0.6}>
              <section className="py-16 px-6 md:px-20">
                <div className="mb-12 overflow-hidden w-full">
                  <Menu3D instanceId="main-menu" />
                </div>
              </section>
            </ScrollAnimation>
            
            {/* Background abstrait couvrant ServicesSection + Compatible Mobile */}
            <div className="relative">
              <Image
                src="/images/abstrait-3d-low-poly-avec-faible-profondeur-de-champ.webp"
                alt=""
                fill
                className="object-cover object-center"
                style={{ zIndex: 0 }}
                aria-hidden="true"
              />
              {/* Overlay sombre pour lisibilité */}
              <div className="absolute inset-0" style={{ background: 'rgba(8,8,14,0.92)', zIndex: 1 }} />

              {/* Contenu au-dessus */}
              <div className="relative" style={{ zIndex: 2 }}>
                <ScrollAnimation direction="up" delay={0.1} duration={0.55}>
                  <ServicesSection />
                </ScrollAnimation>

                {/* RÉALISATIONS */}
                <section className="py-16 px-6 md:px-20">
                  <ScrollAnimation direction="up" delay={0} duration={0.5}>
                    <h3 className="text-4xl font-bold text-center text-gray-100 mb-4">Compatible Mobile, Tablettes &amp; P.C</h3>
                    <p className="text-center text-or text-lg mb-16">Développement Web Responsive</p>
                  </ScrollAnimation>
                  <ScrollCascade
                    direction="up"
                    stagger={0.1}
                    duration={0.55}
                    className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                  >
                    <div className="rounded-xl border border-gray-800 bg-white/5 overflow-hidden">
                      <div className="h-48 relative bg-gray-800">
                        <Image 
                          src="/images/3496219.webp" 
                          alt="E-commerce Luxe" 
                          fill
                          className="object-cover transition-opacity duration-300"
                          priority={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRobHB0eH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/2gAMAwEAAhEDEQA/AL+AD//Z"
                        />
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-800 bg-white/5 overflow-hidden">
                      <div className="h-48 relative bg-gray-800">
                        <Image 
                          src="/images/computer-laptop-tablet-view-from-wooden-table.webp" 
                          alt="Compatible mobile tablette PC" 
                          fill
                          className="object-cover transition-opacity duration-300"
                          priority={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-800 bg-white/5 overflow-hidden">
                      <div className="h-48 relative bg-gray-800">
                        <Image 
                          src="/images/pexels-tracy-le-blanc-67789-607812.webp" 
                          alt="Pexels Tracy Le Blanc" 
                          fill
                          className="object-cover transition-opacity duration-300"
                          priority={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </ScrollCascade>
                </section>
              </div>
            </div>

            {/* TARIFS */}
            <ScrollAnimation direction="up" delay={0.05} duration={0.55}>
              <PricingSection />
            </ScrollAnimation>
          </main>
        </ScrollWrapper>
        <Footer />
      </div>
    </>
  );
}