import { motion } from "framer-motion";

const cards = [
  { title: "Gestion de projets web",        desc: "Site vitrine, corporate, évènementiel, e-commerce, intranet, application mobile." },
  { title: "Application Web",               desc: "Développement d'applications web sur mesure pour répondre à vos besoins spécifiques." },
  { title: "Développements spécifiques",    desc: "Des outils adaptés à votre cœur de métier, applications & solutions personnalisées." },
  { title: "SEO & Référencement",         desc: "Optimisation et stratégie pour un référencement optimal." },
  { title: "Conception graphique & Webdesign", desc: "Logos, templates Web, plaquettes publicitaires, cartes de visite, newsletters..." },
  { title: "IA Agent Chatbot",           desc: "Implantation d'agents conversationnels intelligents pour améliorer l'expérience utilisateur." },
  { title: "Interface d'administration",    desc: "Outils spécifiques et personnalisés pour gérer efficacement votre entreprise." },
  { title: "Responsive design",             desc: "Compatible tous supports, tablette & application mobile." },
];

export default function ServicesSection() {
  const left  = cards.slice(0, 4);
  const right = cards.slice(4, 8);

  return (
    <section className="py-16 px-6 md:px-20">
      <h3 className="text-4xl font-bold text-center text-gray-100 mb-4">Mes Services</h3>
      <p className="text-center text-or text-lg mb-10">Des prestations adaptées à vos besoins</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.3fr_1fr] gap-10 items-center">

        {/* Colonne gauche */}
        <div className="flex flex-col gap-5">
          {left.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="py-3 px-4 border-l-2 border-or/40 bg-white/[0.02] rounded-r-lg hover:border-or hover:bg-white/[0.05] transition-all duration-300 cursor-default"
            >
              <h4 className="text-[1.1rem] font-semibold text-or mb-1">{c.title}</h4>
              <p className="text-[0.95rem] text-gray-300">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Vidéo centrale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block self-stretch"
        >
          <div className="relative w-full h-full min-h-[500px]">
            <video
              src="/videos/isometric-desktop-opt.webm"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center drop-shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            />
          </div>
        </motion.div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-5">
          {right.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="py-3 px-4 border-r-2 border-or/40 bg-white/[0.02] rounded-l-lg hover:border-or hover:bg-white/[0.05] transition-all duration-300 cursor-default"
            >
              <h4 className="text-[1.1rem] font-semibold text-or mb-1">{c.title}</h4>
              <p className="text-[0.95rem] text-gray-300">{c.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      <div className="text-center mt-16 mb-4">
        <a href="/produits" className="btn-radiant inline-block">Voir toutes mes réalisations</a>
      </div>
    </section>
  );
}
