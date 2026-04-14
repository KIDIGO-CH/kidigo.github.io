'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const SELECTIONS = [
  {
    title: 'Top 10 des meilleurs brunchs kids friendly',
    description: 'Les adresses testées et approuvées par les familles pour bruncher en toute tranquillité.',
    image: 'https://picsum.photos/seed/sel-brunch/800/500',
    tag: 'Restaurants',
    color: '#92400E',
    slug: 'meilleurs-brunchs-kids-friendly',
  },
  {
    title: 'Fermes pédagogiques à découvrir',
    description: 'Les plus belles fermes de Suisse romande où vos enfants peuvent nourrir les animaux et découvrir la vie agricole.',
    image: 'https://picsum.photos/seed/sel-ferme/800/500',
    tag: 'Nature',
    color: '#65A30D',
    slug: 'fermes-pedagogiques',
  },
  {
    title: 'Les meilleurs vide-greniers et brocantes pour enfants',
    description: 'Jouets, vêtements, livres — les brocantes dédiées à l\'enfant pour faire de bonnes affaires.',
    image: 'https://picsum.photos/seed/sel-brocante/800/500',
    tag: 'Événements',
    color: '#D97706',
    slug: 'vide-greniers-brocantes-enfants',
  },
  {
    title: 'Les plus belles places de jeux de la région',
    description: 'Des aires de jeux originales, sécurisées et gratuites pour laisser vos enfants s\'amuser en plein air.',
    image: 'https://picsum.photos/seed/sel-jeux/800/500',
    tag: 'Parcs',
    color: '#16A34A',
    slug: 'plus-belles-places-de-jeux',
  },
  {
    title: 'Piscines et parcs aquatiques pour enfants',
    description: 'Les meilleures piscines avec pataugeoires, toboggans et espaces bébés de Suisse romande.',
    image: 'https://picsum.photos/seed/sel-piscine/800/500',
    tag: 'Piscine',
    color: '#0EA5E9',
    slug: 'piscines-parcs-aquatiques-enfants',
  },
  {
    title: 'Musées gratuits ou à petit prix pour les familles',
    description: 'Culture et découvertes sans se ruiner — notre sélection de musées accessibles avec des enfants.',
    image: 'https://picsum.photos/seed/sel-musee/800/500',
    tag: 'Musées',
    color: '#6366F1',
    slug: 'musees-gratuits-familles',
  },
  {
    title: 'Balades faciles avec poussette',
    description: 'Des itinéraires accessibles et agréables pour se promener en famille, même avec les tout-petits.',
    image: 'https://picsum.photos/seed/sel-balade/800/500',
    tag: 'Balades',
    color: '#0891B2',
    slug: 'balades-faciles-poussette',
  },
  {
    title: 'Anniversaires originaux : nos meilleures idées',
    description: 'Des lieux et activités pour organiser un anniversaire mémorable sans stress.',
    image: 'https://picsum.photos/seed/sel-anniv/800/500',
    tag: 'Anniversaires',
    color: '#E11D48',
    slug: 'anniversaires-originaux',
  },
  {
    title: 'Stages vacances incontournables',
    description: 'Les stages créatifs, sportifs et nature les mieux notés pour occuper vos enfants pendant les vacances.',
    image: 'https://picsum.photos/seed/sel-stage/800/500',
    tag: 'Stages',
    color: '#7C3AED',
    slug: 'stages-vacances-incontournables',
  },
]

export default function SelectionPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10">

        <motion.div
          className="mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Nos sélections</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Le meilleur pour vos enfants
          </h1>
          <p className="text-[15px] sm:text-[16px] text-text-secondary max-w-xl">
            Des sélections thématiques préparées par notre équipe pour vous aider à trouver les meilleures activités, sorties et bons plans en famille.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SELECTIONS.map((sel, i) => (
            <motion.div
              key={sel.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.05 }}
            >
              <Link href={`/selection/${sel.slug}`} className="group block">
                <div className="bg-elevated rounded-3xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={sel.image}
                      alt={sel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span
                      className="absolute top-3 left-3 text-[11px] font-medium text-white px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: sel.color }}
                    >
                      {sel.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="font-display font-bold text-[16px] sm:text-[17px] text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
                      {sel.title}
                    </h2>
                    <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-2">
                      {sel.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-[12px] font-medium text-accent group-hover:gap-2 transition-all duration-200">
                      Découvrir <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
