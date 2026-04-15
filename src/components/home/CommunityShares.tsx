'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Users, Heart } from 'lucide-react'

const COMMUNITY_PLACES = [
  {
    id: 'com-1',
    name: 'Le Petit Nid — Café Kids Friendly',
    category: 'Cafés-Restaurants kids friendly',
    city: 'Estavayer-le-Lac',
    canton: 'FR',
    image: 'https://picsum.photos/seed/com-cafe/800/600',
    description: 'Un café super accueillant avec un coin jeux immense. Les enfants adorent et les parents peuvent souffler tranquillement.',
    parentName: 'Marie L.',
    parentAvatar: 'https://picsum.photos/seed/parent-marie/80/80',
    ageRange: 'Tous âges',
    price: 'Consommation',
    tags: ['Coin jeux', 'Chaises hautes', 'Brunch weekend'],
  },
  {
    id: 'com-2',
    name: 'Sentier des Lutins — Balade en forêt',
    category: 'Balades kids friendly',
    city: 'Moudon',
    canton: 'VD',
    image: 'https://picsum.photos/seed/com-foret/800/600',
    description: 'Un sentier magique avec des petites cabanes et des sculptures en bois. Parfait pour une balade de 45 minutes avec des petits.',
    parentName: 'Thomas R.',
    parentAvatar: 'https://picsum.photos/seed/parent-thomas/80/80',
    ageRange: '2 – 8 ans',
    price: 'Gratuit',
    tags: ['Extérieur', 'Poussette OK', 'Gratuit'],
  },
  {
    id: 'com-3',
    name: 'Place de jeux du Château',
    category: 'Parcs / Places de jeux',
    city: 'Payerne',
    canton: 'VD',
    image: 'https://picsum.photos/seed/com-parc/800/600',
    description: 'Grande place de jeux rénovée avec toboggans, balançoires et un bac à sable. Bancs ombragés pour les parents.',
    parentName: 'Sophie M.',
    parentAvatar: 'https://picsum.photos/seed/parent-sophie/80/80',
    ageRange: '1 – 10 ans',
    price: 'Gratuit',
    tags: ['Ombragé', 'Toilettes', 'Parking'],
  },
  {
    id: 'com-4',
    name: 'Ferme pédagogique Les Mignons',
    category: 'Animaux',
    city: 'Fétigny',
    canton: 'FR',
    image: 'https://picsum.photos/seed/com-ferme/800/600',
    description: 'On peut nourrir les chèvres et caresser les lapins. Mes enfants en parlent encore des semaines après !',
    parentName: 'Julie D.',
    parentAvatar: 'https://picsum.photos/seed/parent-julie/80/80',
    ageRange: '2 – 12 ans',
    price: '5 CHF',
    tags: ['Animaux', 'Pique-nique', 'Accessible'],
  },
]

function CommunityCard({ place, index }: { place: typeof COMMUNITY_PLACES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.08 }}
      className="group"
    >
      <div className="bg-elevated rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">

        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Badge partagé par un parent */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-green-500 text-white text-[9px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
              <Users size={9} className="sm:w-[11px] sm:h-[11px]" />
              <span className="hidden sm:inline">Partagé par un parent</span>
              <span className="sm:hidden">Communauté</span>
            </span>
          </div>

          {/* Favorite */}
          <button className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Heart size={12} className="sm:w-[14px] sm:h-[14px] text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          {/* Category */}
          <span className="text-[10px] sm:text-[11px] font-medium text-accent tracking-wide uppercase mb-1 sm:mb-1.5 truncate">
            {place.category}
          </span>

          {/* Name */}
          <h3 className="font-display font-bold text-[13px] sm:text-[15px] text-text-primary leading-snug mb-1.5 sm:mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {place.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-text-secondary mb-2 sm:mb-3">
            <MapPin size={10} className="flex-shrink-0 sm:w-[11px] sm:h-[11px]" />
            <span className="text-[11px] sm:text-[12px] truncate">{place.city} · {place.canton}</span>
          </div>

          {/* Description (parent quote) — hidden on mobile */}
          <p className="hidden sm:block text-[13px] text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-2">
            &laquo; {place.description} &raquo;
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
            {place.tags.slice(0, 2).map(tag => (
              <span key={tag} className="sm:hidden text-[9px] font-medium text-text-secondary bg-canvas rounded-full px-1.5 py-0.5">
                {tag}
              </span>
            ))}
            {place.tags.map(tag => (
              <span key={tag} className="hidden sm:inline text-[10px] font-medium text-text-secondary bg-canvas rounded-full px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          {/* Parent info + price */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border mt-auto">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <img src={place.parentAvatar} alt={place.parentName} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover" />
              <span className="text-[11px] sm:text-[12px] text-text-secondary">{place.parentName}</span>
            </div>
            <span className="text-[12px] sm:text-[13px] font-bold text-text-primary font-display">{place.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CommunityShares() {
  return (
    <section className="py-20 md:py-28 bg-canvas">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div>
            <p className="text-[12px] font-medium text-green-600 uppercase tracking-[0.15em] mb-3">Partages de la communauté</p>
            <h2
              className="font-display font-black text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
            >
              Les bons plans des parents
            </h2>
            <p className="text-text-secondary mt-2 max-w-lg text-[15px]">
              Des lieux et activités partagés par des parents comme vous. Chaque suggestion est vérifiée avant publication.
            </p>
          </div>
          <Link
            href="/partager"
            className="hidden md:flex items-center gap-2 text-[13px] font-medium text-green-600 hover:gap-3 transition-all duration-200"
          >
            Partager un lieu <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {COMMUNITY_PLACES.map((place, i) => (
            <CommunityCard key={place.id} place={place} index={i} />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/partager"
            className="flex items-center gap-2 text-[13px] font-medium text-green-600 border border-green-300 px-5 py-2.5 rounded-full hover:bg-green-50 transition-all duration-200"
          >
            Partager un lieu <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
