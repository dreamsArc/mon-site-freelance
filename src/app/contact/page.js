'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import NavbarWrapper from "../../components/NavbarWrapper";
import Footer from "../../components/Footer";
import Menu3D from "../../components/Menu3D";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);

  useEffect(() => {
    // Retarder l'affichage du menu pour éviter le flash
    const timer = setTimeout(() => setMenuLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavbarWrapper />
      <div className="min-h-screen pt-20 px-6 md:px-20 py-12 relative overflow-hidden">
        {/* Background avec gradient et effets */}
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-gray-900 to-black">
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
            <div className="electric-card-container max-w-md mx-auto mb-12">
              <div className="electric-card">
                <div className="electric-content">
                  <div className="electric-top">
                    <span className="electric-tag">DigitalQbit pixel</span>
                    <h2 className="electric-title">Parlons de votre projet</h2>
                  </div>
                  <hr className="electric-divider" />
                  <form className="electric-form" onSubmit={(e) => {e.preventDefault(); setSent(true);}}>
                    <input 
                      className="electric-input" 
                      placeholder="Votre nom" 
                      type="text"
                      required
                    />
                    <input 
                      className="electric-input" 
                      placeholder="Votre email" 
                      type="email"
                      required
                    />
                    <textarea 
                      className="electric-textarea" 
                      placeholder="Décrivez votre projet..." 
                      rows="4"
                      required
                    ></textarea>
                    <button className="electric-button" type="submit">
                      Envoyer le message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="electric-card-container max-w-md mx-auto mb-12">
              <div className="electric-card electric-success">
                <div className="electric-content text-center">
                  <div className="electric-success-icon">✓</div>
                  <h2 className="electric-title text-green-400">Message envoyé !</h2>
                  <p className="electric-description">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
                </div>
              </div>
            </div>
          )}

          {/* Menu3D sous le formulaire */}
          <div style={{ 
            opacity: menuLoaded ? 1 : 0, 
            transition: 'opacity 0.5s ease',
            marginTop: '50px'
          }}>
            {menuLoaded && <Menu3D instanceId="contact-menu" disableAnimation={true} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}