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

export default function ConfidentialitePage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 md:px-10">

        <Section>
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Vos données</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Politique de confidentialité
          </h1>
        </Section>

        <div className="space-y-10 text-[15px] text-text-secondary leading-relaxed">

          <Section delay={0.1}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">1. Données collectées</h2>
            <p>Kidigo peut collecter les données suivantes :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside">
              <li>Adresse email</li>
              <li>Informations liées au compte (ex : âge des enfants)</li>
              <li>Données de navigation</li>
              <li>Localisation (si activée)</li>
            </ul>
          </Section>

          <Section delay={0.15}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">2. Finalité de la collecte</h2>
            <p>Les données sont utilisées pour :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside">
              <li>Fournir les services du site</li>
              <li>Personnaliser les recommandations</li>
              <li>Améliorer l'expérience utilisateur</li>
              <li>Communiquer avec l'utilisateur</li>
            </ul>
          </Section>

          <Section delay={0.2}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">3. Partage des données</h2>
            <p>Les données ne sont pas vendues.</p>
            <p className="mt-3">
              Elles peuvent être partagées avec des prestataires techniques (hébergement, analytics) uniquement dans le cadre du fonctionnement du site.
            </p>
          </Section>

          <Section delay={0.25}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">4. Durée de conservation</h2>
            <p>
              Les données sont conservées uniquement le temps nécessaire à l'utilisation du service.
            </p>
          </Section>

          <Section delay={0.3}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">5. Sécurité</h2>
            <p>
              Kidigo met en œuvre des mesures techniques et organisationnelles pour protéger les données.
            </p>
          </Section>

          <Section delay={0.35}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">6. Droits des utilisateurs</h2>
            <p>Conformément aux lois en vigueur, vous pouvez :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside">
              <li>Demander l'accès à vos données</li>
              <li>Demander leur modification ou suppression</li>
              <li>Retirer votre consentement</li>
            </ul>
            <p className="mt-4 text-text-muted">Contact : [email@email.com]</p>
          </Section>
        </div>
      </div>
    </div>
  )
}
