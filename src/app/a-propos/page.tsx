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
            className="font-display font-black text-text-primary leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            KIDIGO, né d'une question toute simple
          </h1>
        </Section>

        <div className="space-y-12 text-[16px] text-text-secondary leading-[1.8]">

          <Section delay={0.05}>
            <p className="text-[20px] font-display font-bold text-text-primary leading-snug mb-4">
              « Qu'est-ce qu'on fait aujourd'hui avec les enfants ? »
            </p>
            <p>
              Une question posée des dizaines de fois.<br />
              Souvent le week-end.<br />
              Parfois sous la pluie.<br />
              Et presque toujours… sans réponse évidente.
            </p>
          </Section>

          <Section delay={0.05}>
            <p>
              Parents de deux enfants de 3 et 7 ans, nous connaissons bien ce moment.
              Celui où il faut trouver une idée qui plaît à tout le monde.
              Un petit qui a besoin de bouger, un plus grand qui veut découvrir,
              et des parents qui veulent juste… que ce soit simple.
            </p>
          </Section>

          <Section delay={0.05}>
            <p>
              Puis il y a eu ce changement de région.
              Un nouvel environnement, de nouvelles habitudes…
              et surtout, plus aucun repère.
            </p>
            <p className="mt-4">
              Alors on cherche.<br />
              On ouvre 10 onglets.<br />
              On compare.<br />
              On doute.<br />
              On appelle parfois.<br />
              Et au final… on abandonne ou on fait « comme d'habitude ».
            </p>
          </Section>

          <Section delay={0.05}>
            <p className="text-[18px] font-display font-bold text-text-primary">
              On s'est dit que ça ne devrait pas être aussi compliqué.
            </p>
          </Section>

          {/* KIDIGO est né */}
          <Section delay={0.05}>
            <div className="bg-accent-subtle rounded-3xl p-6 sm:p-8 border border-accent/15">
              <p className="text-[18px] font-display font-bold text-text-primary mb-3">
                KIDIGO est né de cette réalité.
              </p>
              <p>
                De ces moments perdus à chercher.<br />
                De ces idées qu'on ne trouve pas.<br />
                Et de cette envie de faire mieux.
              </p>
              <p className="mt-4">
                Nous avons commencé là où nous vivons :<br />
                la région de la Broye (Fribourg & Vaud),<br />
                avec une mission simple :
              </p>
              <ul className="mt-3 space-y-1.5">
                <li>👉 Aider les parents à trouver facilement des activités adaptées à leurs enfants</li>
                <li>👉 Sans perdre de temps</li>
                <li>👉 Et sans compromis</li>
              </ul>
            </div>
          </Section>

          {/* Communauté */}
          <Section delay={0.05}>
            <p className="text-[18px] font-display font-bold text-text-primary mb-3">
              Mais très vite, une évidence s'est imposée :
            </p>
            <p className="text-[17px] font-medium text-text-primary italic mb-4">
              Les meilleures idées ne viennent pas que des plateformes. Elles viennent aussi des parents.
            </p>
            <ul className="space-y-1.5">
              <li>👉 Ceux qui connaissent le petit parc caché</li>
              <li>👉 Ceux qui ont testé l'atelier parfait</li>
              <li>👉 Ceux qui savent quel restaurant accueille vraiment bien les enfants</li>
            </ul>
            <p className="mt-4">
              KIDIGO devient donc aussi un lieu de partage.
              Un espace où chacun peut recommander, découvrir et inspirer.
            </p>
            <p className="mt-4">
              Et pour les partenaires — ateliers, lieux, restaurants —
              c'est une façon simple de se rendre visibles
              auprès des familles qui cherchent exactement ce qu'ils proposent.
            </p>
          </Section>

          {/* Anniversaires */}
          <Section delay={0.05}>
            <p className="text-[18px] font-display font-bold text-text-primary mb-3">
              Et puis il y a les anniversaires…
            </p>
            <p>
              Ce moment où l'on veut que tout soit parfait.
              Où l'on cherche LA bonne idée.
              Le lieu, l'activité, l'expérience qui fera briller les yeux de son enfant.
            </p>
            <p className="mt-4">
              Et là encore… on passe des heures à chercher.
            </p>
            <p className="mt-4">
              KIDIGO est aussi là pour ça.
              Pour transformer cette recherche en plaisir.
              Pour vous aider à créer des moments inoubliables, sans stress.
            </p>
          </Section>

          {/* Ambition */}
          <Section delay={0.05}>
            <div className="bg-elevated rounded-3xl p-6 sm:p-8 border border-border text-center">
              <p className="text-[18px] font-display font-bold text-text-primary mb-3">
                Notre ambition est claire :
              </p>
              <p className="text-[17px] font-medium text-accent mb-4">
                Devenir LA référence en Suisse romande pour toutes les activités autour et pour les enfants.
              </p>
              <p>
                Mais surtout,<br />
                vous faire gagner du temps…<br />
                et vous en redonner là où ça compte vraiment :
              </p>
              <p className="text-[22px] font-display font-bold text-text-primary mt-4">
                avec eux. ❤️
              </p>
            </div>
          </Section>
        </div>

        {/* CTA */}
        <Section delay={0.05}>
          <div className="text-center mt-16">
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
