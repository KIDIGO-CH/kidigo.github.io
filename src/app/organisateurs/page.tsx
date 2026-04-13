'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Shield, Zap, Star, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { organizers } from '@/lib/data'

const BENEFITS = [
  { icon: TrendingUp, title: 'Visibilité maximale', text: 'Vos activités exposées à 45 000 familles actives. Notre référencement naturel vous propulse en tête des recherches locales.' },
  { icon: Users, title: 'Gestion simplifiée', text: 'Calendrier intégré, réservations en ligne, paiements sécurisés — concentrez-vous sur vos activités, nous gérons le reste.' },
  { icon: Shield, title: 'Label de confiance', text: 'Le badge "Vérifié KIDIGO" rassure immédiatement les parents et augmente votre taux de conversion.' },
  { icon: Zap, title: 'Démarrage rapide', text: 'Votre profil en ligne en moins de 30 minutes. Notre équipe vous accompagne à chaque étape de l\'inscription.' },
]

const PLANS = [
  {
    name: 'Starter',
    price: 'Gratuit',
    period: '',
    description: 'Pour démarrer et tester la plateforme.',
    features: ['Jusqu\'à 3 activités', 'Profil organisateur', 'Avis clients', 'Support email'],
    cta: 'Commencer gratuitement',
    accent: false,
  },
  {
    name: 'Pro',
    price: '49 CHF',
    period: '/ mois',
    description: 'Pour les organisateurs actifs qui veulent se développer.',
    features: ['Activités illimitées', 'Mise en avant dans les résultats', 'Statistiques avancées', 'Réservations en ligne', 'Support prioritaire', 'Badge Pro'],
    cta: 'Démarrer l\'essai gratuit',
    accent: true,
  },
  {
    name: 'Premium',
    price: '99 CHF',
    period: '/ mois',
    description: 'Pour les structures multi-activités ambitieuses.',
    features: ['Tout ce qui est dans Pro', 'Page organisateur dédiée', 'Campagnes email', 'Intégration agenda', 'Account manager dédié', 'Accès API'],
    cta: 'Nous contacter',
    accent: false,
  },
]

export default function OrganisateursPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Hero */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Pour les professionnels</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Développez votre activité avec KIDIGO
          </h1>
          <p className="text-[16px] text-text-secondary leading-relaxed mb-10">
            Rejoignez 850 organisateurs qui font confiance à KIDIGO pour développer leur clientèle et simplifier leurs réservations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg">
              Référencer mes activités <ArrowRight size={16} />
            </Button>
            <Link href="/comment-ca-marche">
              <Button variant="outline" size="lg">En savoir plus</Button>
            </Link>
          </div>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              className="bg-elevated rounded-3xl p-8 border border-border hover:shadow-card-hover transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-accent-subtle flex items-center justify-center mb-5">
                <b.icon size={22} className="text-accent" />
              </div>
              <h2 className="font-display font-bold text-[18px] text-text-primary mb-3">{b.title}</h2>
              <p className="text-[14px] text-text-secondary leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="bg-accent rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {[
            { value: '850+', label: 'Organisateurs partenaires' },
            { value: '45 000', label: 'Familles inscrites' },
            { value: '4,8/5', label: 'Note moyenne organisateurs' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display font-black text-[40px] text-white leading-none mb-2">{value}</p>
              <p className="text-[13px] text-white/70">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Pricing */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2
              className="font-display font-black text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Des tarifs clairs, sans surprise
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-3xl p-8 border ${plan.accent ? 'bg-accent border-accent text-white' : 'bg-elevated border-border'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.08 }}
              >
                <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] mb-2 ${plan.accent ? 'text-white/70' : 'text-text-muted'}`}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`font-display font-black text-[36px] ${plan.accent ? 'text-white' : 'text-text-primary'}`}>{plan.price}</span>
                  <span className={`text-[14px] ${plan.accent ? 'text-white/70' : 'text-text-muted'}`}>{plan.period}</span>
                </div>
                <p className={`text-[13px] mb-6 ${plan.accent ? 'text-white/80' : 'text-text-secondary'}`}>{plan.description}</p>
                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <CheckCircle size={15} className={plan.accent ? 'text-white' : 'text-accent'} />
                      <span className={`text-[13px] ${plan.accent ? 'text-white/90' : 'text-text-primary'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  fullWidth
                  variant={plan.accent ? 'secondary' : 'outline'}
                  size="md"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div>
          <h2
            className="font-display font-black text-text-primary text-center mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
          >
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {organizers.map((org, i) => (
              <motion.div
                key={org.id}
                className="bg-elevated rounded-3xl p-6 border border-border flex items-center gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.06 }}
              >
                <img src={org.logo} alt={org.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="font-display font-bold text-[14px] text-text-primary truncate">{org.name}</p>
                    {org.verified && <Shield size={12} className="text-accent flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-[12px] font-medium text-text-primary">{org.rating}</span>
                    <span className="text-[11px] text-text-muted">({org.reviewCount} avis)</span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-0.5">{org.activitiesCount} activités</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
