'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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

export default function AProposPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 md:px-10">

        {/* Intro */}
        <Section>
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Notre histoire</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Qu'est-ce qu'on fait aujourd'hui avec les enfants ?
          </h1>
          <p className="text-[17px] text-text-secondary leading-relaxed">
            Une question posée des dizaines de fois. Souvent le week-end, parfois sous la pluie, et presque toujours sans réponse évidente.
          </p>
        </Section>

        <div className="space-y-10 text-[16px] text-text-secondary leading-[1.8] mt-10">

          <Section delay={0.05}>
            <p>
              Parents de deux enfants de 3 et 7 ans, installés depuis peu dans la Broye, on connaît bien ce moment. 10 onglets ouverts, des sites qui ne répondent pas, des infos périmées. Et au final, on fait "comme d'habitude" ou on abandonne.
            </p>
            <p className="mt-4 text-[18px] font-display font-bold text-text-primary">
              On s'est dit que ça ne devrait pas être aussi compliqué.
            </p>
          </Section>

          <Section delay={0.05}>
            <div className="bg-accent-subtle rounded-3xl p-6 sm:p-8 border border-accent/15">
              <p className="text-[18px] font-display font-bold text-text-primary mb-3">
                KIDIGO est né de cette réalité.
              </p>
              <p>
                Une plateforme pensée par des parents, pour des parents. On a commencé par la Broye (Fribourg & Vaud) avec une mission simple : vous aider à trouver l'activité parfaite pour vos enfants, sans perdre de temps.
              </p>
            </div>
          </Section>

          <Section delay={0.05}>
            <p>
              Mais les meilleures idées ne viennent pas que des plateformes. Elles viennent des parents qui connaissent le petit parc caché, l'atelier parfait ou le restaurant qui accueille vraiment bien les familles. KIDIGO est aussi un lieu de partage, où chacun peut recommander et inspirer.
            </p>
          </Section>

          <Section delay={0.05}>
            <div className="bg-elevated rounded-3xl p-6 sm:p-8 border border-border text-center">
              <p className="text-[17px] font-medium text-accent mb-3">
                Notre ambition : devenir LA référence en Suisse romande pour les activités enfants.
              </p>
              <p>
                Mais surtout, vous faire gagner du temps et vous en redonner là où ça compte vraiment :
              </p>
              <p className="text-[22px] font-display font-bold text-text-primary mt-3">
                avec eux.
              </p>
            </div>
          </Section>
        </div>

        {/* CTA */}
        <Section delay={0.05}>
          <div className="text-center mt-14">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/recherche"><Button size="lg">Explorer les activités <ArrowRight size={16} /></Button></Link>
              <Link href="/partager"><Button variant="outline" size="lg">Partager un lieu</Button></Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
