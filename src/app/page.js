'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import IntroScreen from "@/components/IntroScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
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
      '/images/3496219.jpg',
      '/images/3560840.jpg', 
      '/images/4905662.jpg'
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
        <NavbarWrapper />
        <ScrollWrapper>
          <main className="min-h-screen pt-20">
            <HeroSection />
            

            
            {/* Menu3D au-dessus du titre "Nos Solutions et services" */}
            <ScrollAnimation direction="scale" delay={0.3} duration={0.8}>
              <section className="py-12 px-6 md:px-20">
                <div className="mb-12 overflow-hidden w-full">
                  <Menu3D instanceId="main-menu" />
                </div>
              </section>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.2} duration={0.7}>
              <ServicesSection />
            </ScrollAnimation>
            
            {/* RÉALISATIONS */}
            <section className="py-20 px-6 md:px-20">
              <ScrollAnimation direction="up" delay={0.1} duration={0.6}>
                <h3 className="text-4xl font-bold text-center text-white mb-16">Differentes solutions</h3>
              </ScrollAnimation>
              <ScrollCascade 
                direction="up" 
                stagger={0.15} 
                duration={0.7}
                className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                <div className="p-6 rounded-xl border border-gray-800 bg-white/5">
                  <div className="h-48 rounded-md mb-4 overflow-hidden relative bg-gray-800">
                    <Image 
                      src="/images/3496219.jpg" 
                      alt="E-commerce Luxe" 
                      fill
                      className="object-cover transition-opacity duration-300"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRobHB0eH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/2gAMAwEAAhEDEQA/AL+AD//Z"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-white">E-commerce</h4>
                  <p className="text-gray-300">Next.js • Stripe</p>
                </div>
                <div className="p-6 rounded-xl border border-gray-800 bg-white/5">
                  <div className="h-48 rounded-md mb-4 overflow-hidden relative bg-gray-800">
                    <Image 
                      src="/images/3560840.jpg" 
                      alt="Portfolio Créatif" 
                      fill
                      className="object-cover transition-opacity duration-300"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRobHB0eH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/2gAMAwEAAhEDEQA/AL+AD//Z"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Portfolio </h4>
                  <p className="text-gray-300">React • Tailwind</p>
                </div>
                <div className="p-6 rounded-xl border border-gray-800 bg-white/5">
                  <div className="h-48 rounded-md mb-4 overflow-hidden relative bg-gray-800">
                    <Image 
                      src="/images/4905662.jpg" 
                      alt="Landing SaaS" 
                      fill
                      className="object-cover transition-opacity duration-300"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRobHB0eH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/2gAMAwEAAhEDEQA/AL+AD//Z"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Site vitrine</h4>
                  <p className="text-gray-300">Next.js • Vercel</p>
                </div>
              </ScrollCascade>
              <ScrollAnimation direction="scale" delay={0.4} duration={0.6}>
                <div className="text-center mt-12">
                  <Link href="/produits" className="btn-radiant inline-block">
                    Voir toutes les réalisations
                  </Link>
                </div>
              </ScrollAnimation>
            </section>
          </main>
        </ScrollWrapper>
        <Footer />
      </div>
    </>
  );
}