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

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 md:px-10">

        <Section>
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Informations légales</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Mentions légales
          </h1>
        </Section>

        <div className="space-y-10 text-[15px] text-text-secondary leading-relaxed">

          <Section delay={0.1}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">Éditeur du site</h2>
            <p>Le site Kidigo est édité par :</p>
            <p className="mt-2 text-text-muted">[Nom / Raison sociale]</p>
            <p className="text-text-muted">[Adresse complète]</p>
            <p className="text-text-muted">Email : [email@email.com]</p>
          </Section>

          <Section delay={0.15}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">Responsable de la publication</h2>
            <p className="text-text-muted">[Nom Prénom]</p>
          </Section>

          <Section delay={0.2}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <p className="mt-2 text-text-muted">[Nom de l'hébergeur]</p>
            <p className="text-text-muted">[Adresse de l'hébergeur]</p>
            <p className="text-text-muted">[Site web]</p>
          </Section>

          <Section delay={0.25}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu présent sur le site Kidigo (textes, images, logos, design, etc.) est protégé par les lois en vigueur sur la propriété intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, diffusion ou utilisation sans autorisation préalable est interdite.
            </p>
          </Section>

          <Section delay={0.3}>
            <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">Responsabilité</h2>
            <p>
              Kidigo s'efforce de fournir des informations aussi précises que possible. Toutefois, les informations relatives aux activités proposées sont fournies par des tiers et peuvent être sujettes à modification.
            </p>
            <p className="mt-3">
              Kidigo ne saurait être tenu responsable d'erreurs, d'omissions ou de changements intervenus après publication.
            </p>
          </Section>
        </div>
      </div>
    </div>
  )
}
