'use client';
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black/80 backdrop-blur-md fixed w-full top-0 z-40 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <div className="flex gap-6">
          <Link href="/produits" className="text-gray-300 hover:text-white">Réalisations</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
}