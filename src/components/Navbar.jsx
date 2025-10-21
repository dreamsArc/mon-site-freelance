'use client';
import Link from "next/link";
import { useSmartHomeLink } from "../hooks/useSmartHomeLink";

export default function Navbar() {
  const homeUrl = useSmartHomeLink();

  return (
    <nav className="bg-black/80 backdrop-blur-md fixed w-full top-0 z-40 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href={homeUrl} className="text-2xl font-bold text-white hover:text-or transition-colors">DigitalQbit Pixel</Link>
        <div className="flex gap-6">
          <Link href={homeUrl} className="text-gray-300 hover:text-white">Accueil</Link>
          <Link href="/produits" className="text-gray-300 hover:text-white">Nos Solutions</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
        </div>
      </div>
    </nav>
  );
}