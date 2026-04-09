'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from "next/link";
import NavbarWrapper from "../../components/NavbarWrapper";
import Footer from "../../components/Footer";
import Menu3D from "../../components/Menu3D";
import ScrollAnimation from "../../components/ScrollAnimation";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const lastSubmit = useRef(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [locked, setLocked] = useState(false);
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  // Validation côté client
  const validate = (data) => {
    const e = {};
    const name = data.name.trim();
    const email = data.email.trim();
    const message = data.message.trim();
    if (!name || name.length < 2)           e.name    = 'Nom trop court (min. 2 caractères)';
    if (name.length > 80)                    e.name    = 'Nom trop long (max. 80 caractères)';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Adresse email invalide';
    if (email.length > 150)                  e.email   = 'Email trop long';
    if (!message || message.length < 10)    e.message = 'Message trop court (min. 10 caractères)';
    if (message.length > 2000)               e.message = 'Message trop long (max. 2000 caractères)';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Honeypot : si le champ caché est rempli, c'est un bot
    if (e.target._hp?.value) return;
    // Rate limiting : 1 envoi toutes les 30s
    const now = Date.now();
    if (now - lastSubmit.current < 30000) {
      setErrors({ _global: 'Veuillez attendre avant de renvoyer.' });
      return;
    }
    const validation = validate(formData);
    if (Object.keys(validation).length > 0) { setErrors(validation); return; }
    setSubmitting(true);
    lastSubmit.current = now;
    // Simulation envoi (à remplacer par fetch vers API route)
    setTimeout(() => { setSubmitting(false); setSent(true); }, 600);
  };

  const handleMouseMove = useCallback((e) => {
    if (locked || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() =>
      setTilt({ x: -dy * 8, y: dx * 8 })
    );
  }, [locked]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // Retour progressif via une transition ralentie
    setTilt({ x: 0, y: 0 });
    // Ne pas déverrouiller si le verrou de clic est encore actif
  }, []);

  const handleCardClick = useCallback(() => {
    setLocked(true);
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <NavbarWrapper autoHide={true} />
      <div className="min-h-screen pt-20 px-6 md:px-20 py-12 relative overflow-x-hidden">
        {/* Background vidéo */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/videos/iot-concept-opt.webm"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay sombre pour lisibilité */}
          <div className="absolute inset-0" style={{ background: 'rgba(4,6,16,0.60)' }} />
          {/* Grid pattern subtil */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Contenu par-dessus le background */}
        <div className="relative z-10">
          <ScrollAnimation direction="left" duration={0.45}>
            <Link href="/?skipIntro=true" className="text-blue-400 mb-8 inline-block">← Accueil</Link>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" delay={0.1} duration={0.5}>
            <h1 className="text-4xl font-bold text-gray-100 mb-8 text-center">Contact</h1>
          </ScrollAnimation>
          
          {!sent ? (
            <ScrollAnimation direction="fade" delay={0.05} duration={0.4}>
              <div
                ref={cardRef}
                className="electric-card-container max-w-[515px] mx-auto mb-12"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleCardClick}
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: locked
                    ? 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    : tilt.x === 0 && tilt.y === 0
                      ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      : 'transform 0.18s ease-out',
                  willChange: 'transform',
                }}
              >
                <div className="electric-card">
                  <div className="electric-content">
                    <div className="electric-top">
                      <span className="electric-tag">Pixel Création Studio</span>
                      <h2 className="electric-title">Parlons de votre projet</h2>
                    </div>
                    <hr className="electric-divider" />
                    <form className="electric-form" onSubmit={handleSubmit}>
                      {/* Honeypot anti-bot : doit rester vide */}
                      <input name="_hp" type="text" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />
                      {errors._global && <p className="text-red-400 text-sm">{errors._global}</p>}
                      <div>
                        <input
                          className={`electric-input${errors.name ? ' border-red-400' : ''}`}
                          placeholder="Votre nom"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          maxLength={80}
                          required
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <input
                          className={`electric-input${errors.email ? ' border-red-400' : ''}`}
                          placeholder="Votre email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          maxLength={150}
                          required
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <textarea
                          className={`electric-textarea${errors.message ? ' border-red-400' : ''}`}
                          placeholder="Décrivez votre projet..."
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          maxLength={2000}
                          required
                        ></textarea>
                        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                      </div>
                      <button className="electric-button" type="submit" disabled={submitting}>
                        {submitting ? 'Envoi...' : 'Envoyer le message'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation direction="up" delay={0.2} duration={0.55}>
              <div className="electric-card-container max-w-[515px] mx-auto mb-12">
                <div className="electric-card electric-success">
                  <div className="electric-content text-center">
                    <div className="electric-success-icon">✓</div>
                    <h2 className="electric-title text-green-400">Message envoyé !</h2>
                    <p className="electric-description">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Menu3D sous le formulaire */}
          <ScrollAnimation direction="up" delay={0.3} duration={0.55}>
            <div style={{ marginTop: '50px' }}>
              <Menu3D instanceId="contact-menu" disableAnimation={true} />
            </div>
          </ScrollAnimation>
        </div>
      </div>
      <Footer />
    </>
  );
}