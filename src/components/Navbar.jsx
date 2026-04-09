'use client';
import Link from "next/link";
import { useSmartHomeLink } from "../hooks/useSmartHomeLink";
import { useState, useEffect } from "react";

export default function Navbar({ autoHide = false }) {
  const homeUrl = useSmartHomeLink();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoHide) {
      setVisible(true);
      return;
    }
    // Dès que autoHide passe à true : visible 3s puis cache
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3700);
    return () => clearTimeout(timer);
  }, [autoHide]);

  return (
    <>
      {/* Zone de hover invisible — déclenche l'apparition en mode autoHide */}
      {autoHide && !visible && (
        <div
          className="fixed top-0 left-0 w-full z-50"
          style={{ height: "60px" }}
          onMouseEnter={() => setVisible(true)}
        />
      )}
      <nav
        className="bg-gray-900 fixed w-full top-0 z-40 py-4"
        style={autoHide ? {
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: visible
            ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 0.55s cubic-bezier(0.4, 0, 1, 1)",
        } : {}}
        onMouseLeave={autoHide ? () => setVisible(false) : undefined}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-gray-100 hover:text-or transition-colors">Pixel Création Studio</a>
          <div className="flex gap-6">
            <Link href={homeUrl} className="text-gray-300 hover:text-or transition-colors">Accueil</Link>
            <Link href="/produits" className="text-gray-300 hover:text-or transition-colors">Nos Solutions</Link>
            <Link href="/contact" className="text-gray-300 hover:text-or transition-colors">Contact</Link>
          </div>
        </div>
      </nav>
    </>
  );
}