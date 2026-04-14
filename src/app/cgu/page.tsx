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

export default function CguPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 md:px-10">

        <Section>
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Conditions</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Conditions générales d'utilisation
          </h1>
        </Section>

        <div className="space-y-10 text-[15px] text-text-secondary leading-relaxed">

          <Section delay={0.1}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">1. Objet</h2>
            <p>
              Les présentes CGU régissent l'utilisation du site Kidigo, plateforme dédiée aux activités pour enfants.
            </p>
          </Section>

          <Section delay={0.15}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">2. Accès au service</h2>
            <p>
              Le site est accessible gratuitement. Certaines fonctionnalités peuvent nécessiter la création d'un compte.
            </p>
          </Section>

          <Section delay={0.2}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">3. Fonctionnement de la plateforme</h2>
            <p>Kidigo propose :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside">
              <li>Des activités référencées</li>
              <li>Des recommandations</li>
              <li>Des contenus partagés par des utilisateurs et partenaires</li>
            </ul>
          </Section>

          <Section delay={0.25}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">4. Responsabilité</h2>
            <p>
              Kidigo agit en tant que plateforme de mise en relation. Les activités proposées sont organisées par des tiers.
            </p>
            <p className="mt-3 font-medium text-text-primary">Kidigo ne peut être tenu responsable :</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside">
              <li>Du déroulement des activités</li>
              <li>De la qualité des prestations</li>
              <li>De tout incident survenu lors d'une activité</li>
            </ul>
          </Section>

          <Section delay={0.3}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">5. Contenu utilisateur</h2>
            <p>
              Les utilisateurs peuvent proposer des contenus. Ils s'engagent à fournir des informations exactes et respectueuses.
            </p>
            <p className="mt-3">
              Kidigo se réserve le droit de supprimer tout contenu inapproprié.
            </p>
          </Section>

          <Section delay={0.35}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">6. Compte utilisateur</h2>
            <p>
              L'utilisateur est responsable de la confidentialité de ses identifiants.
            </p>
          </Section>

          <Section delay={0.4}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">7. Modification des CGU</h2>
            <p>
              Kidigo se réserve le droit de modifier les présentes CGU à tout moment.
            </p>
          </Section>
        </div>
      </div>
    </div>
  )
}
