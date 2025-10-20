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
import Link from "next/link";

export default function Home() {
  const [entered, setEntered] = useState(() => {
    // Optimisation : Vérifier les paramètres URL directement lors de l'initialisation
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('skipIntro') === 'true';
    }
    return false;
  });

  useEffect(() => {
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

  return (
    <>
      {!entered && <IntroScreen onEnter={() => setEntered(true)} />}

      <div className={`min-h-screen ${entered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <NavbarWrapper />
        <ScrollWrapper>
          <main className="min-h-screen pt-20">
            <HeroSection />
            
            {/* Menu3D au-dessus du titre "Nos Solutions et services" */}
            <section className="py-12 px-6 md:px-20">
              <div className="mb-12 overflow-hidden w-full">
                <Menu3D instanceId="main-menu" />
              </div>
            </section>
            
            <ServicesSection />
            
            {/* RÉALISATIONS */}
            <section className="py-20 px-6 md:px-20">
              <h3 className="text-4xl font-bold text-center text-white mb-16">Differente solution</h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              </div>
              <div className="text-center mt-12">
                <Link href="/produits" className="btn-radiant inline-block">
                  Voir toutes les réalisations
                </Link>
              </div>
            </section>
          </main>
        </ScrollWrapper>
        <Footer />
      </div>
    </>
  );
}