'use client'

import { motion } from 'framer-motion'

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function CookiesPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 md:px-10">

        <Section>
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Cookies</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Politique de cookies
          </h1>
        </Section>

        <div className="space-y-10 text-[15px] text-text-secondary leading-relaxed">

          <Section delay={0.1}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un fichier déposé sur votre appareil lors de la navigation.
            </p>
          </Section>

          <Section delay={0.15}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">2. Types de cookies utilisés</h2>
            <p>Kidigo peut utiliser :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside">
              <li>Cookies essentiels (fonctionnement du site)</li>
              <li>Cookies de mesure d'audience</li>
              <li>Cookies de personnalisation</li>
            </ul>
          </Section>

          <Section delay={0.2}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">3. Gestion des cookies</h2>
            <p>
              L'utilisateur peut accepter, refuser ou configurer les cookies via le bandeau prévu à cet effet.
            </p>
          </Section>

          <Section delay={0.25}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">4. Durée de conservation</h2>
            <p>
              Les cookies sont conservés pour une durée limitée.
            </p>
          </Section>

          <Section delay={0.3}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">5. Contact</h2>
            <p>
              Pour toute question : <span className="text-text-muted">[email@email.com]</span>
            </p>
          </Section>
        </div>
      </div>
    </div>
  )
}
