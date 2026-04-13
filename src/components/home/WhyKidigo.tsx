'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Search, Star } from 'lucide-react'

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Organisateurs vérifiés',
    description: 'Chaque partenaire KIDIGO est contrôlé : diplômes, assurance, avis parents vérifiés. Votre confiance est notre priorité absolue.',
    color: '#16A34A',
    bg: '#DCFCE7',
  },
  {
    icon: Search,
    title: 'Recherche ultra-rapide',
    description: 'Trouvez l\'activité parfaite en moins de 30 secondes. Filtrez par âge, ville, budget, jour de la semaine et bien plus.',
    color: '#0284C7',
    bg: '#E0F2FE',
  },
  {
    icon: Star,
    title: 'Avis authentiques',
    description: 'Des milliers d\'avis de parents comme vous, vérifiés et transparents. Choisissez en toute confiance grâce à des retours réels.',
    color: '#D97706',
    bg: '#FEF3C7',
  },
]

export function WhyKidigo() {
  return (
    <section className="py-20 md:py-28 bg-canvas">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Pourquoi KIDIGO ?</p>
          <h2
            className="font-display font-black text-text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
          >
            Simple, fiable et conçu pour les familles
          </h2>
          <p className="text-[16px] text-text-secondary leading-relaxed">
            KIDIGO n'est pas qu'un annuaire. C'est une plateforme qui met la qualité et la sécurité au cœur de chaque expérience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="bg-elevated rounded-3xl p-7 border border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.08 }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: reason.bg }}
              >
                <reason.icon size={22} style={{ color: reason.color }} />
              </div>
              <h3 className="font-display font-bold text-[16px] text-text-primary mb-3">{reason.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
