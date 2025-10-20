import { motion } from "framer-motion";

const cards = [
  { title: "Performance et Sécurité", desc: "Sites rapides, performants et optimisés , protection des données et des utilisateurs" },
  { title: "Design", desc: "Design et interactions pensées pour tous les écrans" },
  { title: "SEO-friendly", desc: "Bonnes pratiques SEO" },
  { title: "IA", desc: "Intelligence Artificielle pour une expérience utilisateur améliorée" },
];

export default function ServicesSection() {
  return (
    <section className="py-12 px-6 md:px-20">
      <h3 className="text-or text-sm mb-6">Nos Solutions et services</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="p-6 rounded-xl border border-gray-800 bg-white/2"
          >
            <h4 className="text-lg font-semibold text-white mb-2">{c.title}</h4>
            <p className="text-sm text-gray-300">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
