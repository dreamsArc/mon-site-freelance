'use client';
import { Suspense } from 'react';
import Navbar from './Navbar';

function NavbarFallback() {
  return (
    <nav className="bg-black/80 backdrop-blur-md fixed w-full top-0 z-40 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Portfolio</div>
        <div className="flex gap-6">
          <div className="text-gray-300">Accueil</div>
          <div className="text-gray-300">Réalisations</div>
          <div className="text-gray-300">Contact</div>
        </div>
      </div>
    </nav>
  );
}

export default function NavbarWrapper() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <Navbar />
    </Suspense>
  );
}