'use client';
import { useState } from 'react';
import Link from "next/link";
import NavbarWrapper from "../../components/NavbarWrapper";
import Footer from "../../components/Footer";
import Menu3D from "../../components/Menu3D";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <NavbarWrapper />
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
          <Link href="/?skipIntro=true" className="text-blue-400 mb-8 inline-block">← Accueil</Link>
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Contact</h1>
          
          {!sent ? (
            <form className="max-w-md mb-12 mx-auto" onSubmit={(e) => {e.preventDefault(); setSent(true);}}>
              <input className="w-full p-3 mb-4 rounded bg-white/5 border border-gray-800 text-white" placeholder="Nom" />
              <input className="w-full p-3 mb-4 rounded bg-white/5 border border-gray-800 text-white" placeholder="Email" />
              <textarea className="w-full p-3 mb-4 rounded bg-white/5 border border-gray-800 text-white" placeholder="Message" rows="5"></textarea>
              <button className="btn-radiant w-full">Envoyer</button>
            </form>
          ) : (
            <p className="text-green-400 text-xl mb-12 text-center">Message envoyé !</p>
          )}

          {/* Menu3D sous le formulaire */}
          <Menu3D instanceId="contact-menu" />
        </div>
      </div>
      <Footer />
    </>
  );
}