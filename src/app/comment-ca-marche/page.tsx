'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Cherchez',
    description: 'Entrez votre ville, l\'âge de votre enfant et le type d\'activité. Notre moteur de recherche vous propose les meilleures options en quelques secondes.',
    color: '#FF6B52',
    bg: '#FFF0ED',
  },
  {
    step: '02',
    icon: Filter,
    title: 'Filtrez',
    description: 'Affinez par catégorie, budget, jour de la semaine, intérieur ou extérieur. Lisez les avis authentiques de parents comme vous.',
    color: '#0284C7',
    bg: '#E0F2FE',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Profitez',
    description: 'Votre enfant vit une expérience mémorable. Partagez votre avis pour aider les autres familles à choisir en confiance.',
    color: '#D97706',
    bg: '#FEF3C7',
  },
]


export default function CommentCaMarchePage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Simple & rapide</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Comment ça marche ?
          </h1>
          <p className="text-[16px] text-text-secondary leading-relaxed">
            Des idées pour émerveiller vos enfants. Sans y passer des heures. Bienvenue sur Kidigo.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative bg-elevated rounded-3xl p-7 border border-border"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
            >
              <div className="font-display font-black text-[52px] leading-none text-text-muted/20 mb-4 select-none">
                {step.step}
              </div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: step.bg }}
              >
                <step.icon size={22} style={{ color: step.color }} />
              </div>
              <h2 className="font-display font-bold text-[18px] text-text-primary mb-3">{step.title}</h2>
              <p className="text-[14px] text-text-secondary leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-display font-black text-[28px] text-text-primary mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-[15px] text-text-secondary mb-8">Plus de 2 400 activités vous attendent.</p>
          <Link href="/recherche">
            <Button size="lg">
              Explorer les activités <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
