'use client';

import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


export default function Produits() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 px-6 md:px-20 py-12 relative overflow-hidden">
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
          <Link href="/" className="text-blue-400 mb-8 inline-block">← Home</Link>
          <h1 className="text-4xl font-bold text-white mb-8">Réalisations</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-gray-800 bg-white/5">
              <div className="h-48 bg-gray-800 rounded mb-4 flex items-center">PROJET 1</div>
              <h3 className="text-xl font-bold text-white">E-commerce</h3>
              <p className="text-gray-300">Next.js • 2025</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
