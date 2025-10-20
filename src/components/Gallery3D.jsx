'use client';
import { useEffect } from 'react';

export default function Gallery3D() {
  useEffect(() => {
    // Composant purement décoratif - pas d'interactivité
  }, []);

  return (
    <section className="gallery3d">
      <div className="gallery-container" style={{"--count": 15, "--duration": "30s"}}>
        <img src="/images/pexels-designecologist-1779487.webp" style={{"--i": 1}} alt="Design Portfolio" loading="lazy" />
        <img src="/images/pexels-pixabay-221185.webp" style={{"--i": 2}} alt="Tech Portfolio" loading="lazy" />
        <img src="/images/pexels-tracy-le-blanc-67789-607812.webp" style={{"--i": 3}} alt="Code Portfolio" loading="lazy" />
        <img src="/images/collage-d-arriere-plan-de-programmation.webp" style={{"--i": 4}} alt="Programming Background" loading="lazy" />
        <img src="/images/concept-de-transformation-numerique-de-fond-de-cerveau-de-technologie-d-ia.webp" style={{"--i": 5}} alt="AI Technology" loading="lazy" />
        <img src="/images/fond-de-technologie-de-communication-numerique-avec-remix-numerique-d-ecran-virtuel-touchant-la-main.webp" style={{"--i": 6}} alt="Digital Communication" loading="lazy" />
        <img src="/images/homme-utilisant-la-technologie-intelligente-de-maquette-psd-de-tablette-numerique.webp" style={{"--i": 7}} alt="Smart Technology" loading="lazy" />
        <img src="/images/collage-de-personnes-utilisant-des-bobines.webp" style={{"--i": 8}} alt="Team Collaboration" loading="lazy" />
        <img src="/images/abstrait-3d-low-poly-avec-faible-profondeur-de-champ.jpg" style={{"--i": 9}} alt="3D Abstract Design" loading="lazy" />
        <img src="/images/armoire-numerique-sur-ecran-transparent.jpg" style={{"--i": 10}} alt="Digital Interface" loading="lazy" />
        <img src="/images/3496219.jpg" style={{"--i": 11}} alt="Tech Innovation" loading="lazy" />
        <img src="/images/3560840.jpg" style={{"--i": 12}} alt="Digital Workspace" loading="lazy" />
        <img src="/images/4905662.jpg" style={{"--i": 13}} alt="Modern Technology" loading="lazy" />
        <img src="/images/pexels-shkrabaanthony-5475786.jpg" style={{"--i": 14}} alt="Creative Workspace" loading="lazy" />
        <img src="/images/pexels-tima-miroshnichenko-6612384.webp" style={{"--i": 15}} alt="Tech Development" loading="lazy" />
      </div>
    </section>
  );
}