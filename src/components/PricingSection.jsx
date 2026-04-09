'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1];

const plans = [
  {
    title: 'Site Vitrine Standard', target: 'Indépendants, TPE',
    price: '1 490 €', suffix: 'HT',
    items: ['Base WordPress', 'Design Premium', 'SEO Ready', 'Formation incluse'],
    featured: false,
  },
  {
    title: 'Site Sur-Mesure', target: 'PME, Artisans',
    price: '2 200 €', suffix: 'HT',
    items: ['Design UI/UX unique', 'Performance maximale', 'Stratégie SEO avancée'],
    featured: true,
  },
  {
    title: 'E-Commerce', target: 'Boutiques en ligne',
    price: '3 500 €', suffix: 'HT',
    items: ['WooCommerce / PrestaShop', 'Paiement intégré', 'Gestion des stocks'],
    featured: false,
  },
  {
    title: 'Accompagnement', target: 'Maintenance & Évolution',
    price: '70 €', suffix: '/ mois',
    items: ['Mises à jour', 'Sécurité', 'Support 48h', 'Sauvegardes'],
    featured: false,
  },
];

const details = [
  { icon: '🟢', title: 'Pack Vitrine "Essentiel"', desc: 'WordPress avec éditeur moderne, design personnalisé, hébergement inclus 12 mois, SEO de base et formation 1h.' },
  { icon: '🔵', title: 'Pack Sur-Mesure', desc: 'Design unique via Figma, code optimisé, animations avancées et stratégie SEO approfondie.' },
  { icon: '🛒', title: 'E-Commerce', desc: 'Boutique complète avec paiements, transporteurs, UX optimisée et conformité RGPD.' },
  { icon: '🛠️', title: 'Maintenance', desc: 'TJM : 400 €/jour | Maintenance annuelle : 750 € | Développement spécifique sur devis.' },
];

export default function PricingSection() {
  return (
    <section className="py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
        className="text-center mb-14"
      >
        <h3 className="text-4xl font-bold text-gray-100 mb-3">Nos Offres</h3>
        <p className="text-or text-lg">Des solutions adaptées à chaque besoin</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09, duration: 0.55, ease: EASE }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`relative rounded-2xl p-6 flex flex-col gap-4 bg-white/[0.04] backdrop-blur-sm border transition-colors duration-300 ${
              plan.featured
                ? 'border-or shadow-[0_0_30px_rgba(207,148,38,0.18)] scale-105'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-or text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Populaire
              </span>
            )}
            <div>
              <h4 className={`text-lg font-bold mb-1 ${plan.featured ? 'text-or' : 'text-gray-100'}`}>{plan.title}</h4>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{plan.target}</p>
            </div>
            <div className="flex items-end gap-1">
              <span className={`text-3xl font-extrabold ${plan.featured ? 'text-or' : 'text-gray-100'}`}>{plan.price}</span>
              <span className="text-gray-400 text-sm mb-1">{plan.suffix}</span>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {plan.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-or">✓</span>{item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`mt-2 text-center text-sm font-semibold py-2 rounded-xl transition-colors duration-200 ${
                plan.featured
                  ? 'bg-or text-black hover:bg-amber-400'
                  : 'border border-white/20 text-gray-300 hover:border-or hover:text-or'
              }`}
            >
              Démarrer
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
        className="mt-20 max-w-3xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Détails des prestations</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {details.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
              className="bg-white/[0.04] border border-white/10 rounded-xl p-5 hover:border-or/40 transition-colors duration-300"
            >
              <p className="text-base font-semibold text-gray-100 mb-2">{d.icon} {d.title}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
        className="mt-20 text-center"
      >
        <h3 className="text-3xl font-bold text-gray-100 mb-3">Une idée ? Un projet ?</h3>
        <p className="text-gray-400 mb-8">Demandez votre devis personnalisé</p>
        <Link href="/contact" className="btn-radiant inline-block">
          100% GRATUIT &amp; SANS ENGAGEMENT
        </Link>
      </motion.div>
    </section>
  );
}