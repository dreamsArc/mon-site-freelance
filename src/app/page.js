'use client';
import { useState } from "react";
import Image from "next/image";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ScrollWrapper from "@/components/ScrollWrapper";
import Menu3D from "@/components/Menu3D";
import Link from "next/link";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered && <IntroScreen onEnter={() => setEntered(true)} />}

      <div className={`min-h-screen ${entered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navbar />
        <ScrollWrapper>
          <main className="min-h-screen pt-20">
            <HeroSection />
            <ServicesSection />
            
            {/* Menu3D principal après ServicesSection */}
            <section className="py-12 px-6 md:px-20">
              <div className="mb-12 overflow-hidden w-full">
                <Menu3D instanceId="main-menu" />
              </div>
            </section>
            
            {/* RÉALISATIONS */}
            <section className="py-20 px-6 md:px-20">
              <h3 className="text-4xl font-bold text-center text-white mb-16">Réalisations récentes</h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="p-6 rounded-xl border border-gray-800 bg-white/5">
                  <div className="h-48 rounded-md mb-4 overflow-hidden relative">
                    <Image 
                      src="/images/3496219.jpg" 
                      alt="E-commerce Luxe" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-white">E-commerce Luxe</h4>
                  <p className="text-gray-300">Next.js • Stripe</p>
                </div>
                <div className="p-6 rounded-xl border border-gray-800 bg-white/5">
                  <div className="h-48 rounded-md mb-4 overflow-hidden relative">
                    <Image 
                      src="/images/3560840.jpg" 
                      alt="Portfolio Créatif" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Portfolio Créatif</h4>
                  <p className="text-gray-300">React • Tailwind</p>
                </div>
                <div className="p-6 rounded-xl border border-gray-800 bg-white/5">
                  <div className="h-48 rounded-md mb-4 overflow-hidden relative">
                    <Image 
                      src="/images/4905662.jpg" 
                      alt="Landing SaaS" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Landing SaaS</h4>
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