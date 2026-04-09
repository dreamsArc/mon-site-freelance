'use client';
import { useEffect } from 'react';

export default function Gallery3D() {
  useEffect(() => {
    // Composant purement décoratif - pas d'interactivité
  }, []);

  return (
    <section className="gallery3d">
      <div className="gallery-container" style={{"--count": 16, "--duration": "22s"}}>
        <img src="/images/pexels-designecologist-1779487.webp" style={{"--i": 1,  "--x-pos": "-38rem", "--y-pos": "-18rem"}} alt="Design Portfolio" loading="lazy" />
        <img src="/images/pexels-pixabay-221185.webp"             style={{"--i": 2,  "--x-pos": "-13rem", "--y-pos": "-22rem"}} alt="Tech Portfolio" loading="lazy" />
        <img src="/images/pexels-tracy-le-blanc-67789-607812.webp" style={{"--i": 3,  "--x-pos": "+13rem", "--y-pos": "-18rem"}} alt="Code Portfolio" loading="lazy" />
        <img src="/images/collage-d-arriere-plan-de-programmation.webp" style={{"--i": 4,  "--x-pos": "+38rem", "--y-pos": "-22rem"}} alt="Programming Background" loading="lazy" />
        <img src="/images/concept-de-transformation-numerique-de-fond-de-cerveau-de-technologie-d-ia.webp" style={{"--i": 5,  "--x-pos": "-38rem", "--y-pos": "-4rem"}} alt="AI Technology" loading="lazy" />
        <img src="/images/fond-de-technologie-de-communication-numerique-avec-remix-numerique-d-ecran-virtuel-touchant-la-main.webp" style={{"--i": 6,  "--x-pos": "-13rem", "--y-pos": "-6rem"}} alt="Digital Communication" loading="lazy" />
        <img src="/images/homme-utilisant-la-technologie-intelligente-de-maquette-psd-de-tablette-numerique.webp" style={{"--i": 7,  "--x-pos": "+13rem", "--y-pos": "-4rem"}} alt="Smart Technology" loading="lazy" />
        <img src="/images/collage-de-personnes-utilisant-des-bobines.webp" style={{"--i": 8,  "--x-pos": "+38rem", "--y-pos": "-6rem"}} alt="Team Collaboration" loading="lazy" />
        <img src="/images/abstrait-3d-low-poly-avec-faible-profondeur-de-champ.webp" style={{"--i": 9,  "--x-pos": "-38rem", "--y-pos": "+12rem"}} alt="3D Abstract Design" loading="lazy" />
        <img src="/images/armoire-numerique-sur-ecran-transparent.webp" style={{"--i": 10, "--x-pos": "-13rem", "--y-pos": "+10rem"}} alt="Digital Interface" loading="lazy" />
        <img src="/images/3496219.webp"   style={{"--i": 11, "--x-pos": "+13rem", "--y-pos": "+12rem"}} alt="Tech Innovation" loading="lazy" />
        <img src="/images/3560840.webp"   style={{"--i": 12, "--x-pos": "+38rem", "--y-pos": "+10rem"}} alt="Digital Workspace" loading="lazy" />
        <img src="/images/4905662.webp"   style={{"--i": 13, "--x-pos": "-25rem", "--y-pos": "+24rem"}} alt="Modern Technology" loading="lazy" />
        <img src="/images/pexels-shkrabaanthony-5475786.webp" style={{"--i": 14, "--x-pos": "0rem",    "--y-pos": "+24rem"}} alt="Creative Workspace" loading="lazy" />
        <img src="/images/8252889.webp" style={{"--i": 15, "--x-pos": "+25rem", "--y-pos": "+24rem"}} alt="Tech Development" loading="lazy" />
        <img src="/images/laptop-computer-with-halfopen-screen-dark-background-copy-space.webp" style={{"--i": 16, "--x-pos": "-12rem", "--y-pos": "+36rem"}} alt="Laptop Dark" loading="lazy" />
         
      </div>
    </section>
  );
}