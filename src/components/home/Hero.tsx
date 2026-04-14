'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Plus, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LocationSearch } from '@/components/ui/LocationSearch'
import { WeatherWidget } from '@/components/home/WeatherWidget'
import { FilterBar, defaultFilters, type Filters } from '@/components/search/FilterBar'
import { activities as allActivities } from '@/lib/data'
import type { Activity } from '@/lib/types'

const STAT_ITEMS = [
  { value: '2 400+', label: 'Activités référencées' },
  { value: '850+', label: 'Organisateurs vérifiés' },
  { value: '45 000', label: 'Familles satisfaites' },
  { value: '1 200+', label: 'Partages par la communauté' },
]

const PLACEHOLDER_PHRASES = [
  "Que faire aujourd'hui avec un enfant de 3 ans ?",
  "Activités intérieures pour enfants de 3 et 7 ans",
  "Cours de natation près d'Estavayer",
  "Brunch kids friendly ce weekend",
  "Stage de vacances à Fribourg",
  "Anniversaire enfant 5 ans Lausanne",
  "Balade en famille autour du lac",
  "Atelier créatif pour enfant de 4 ans",
]

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function sortByProximity(acts: Activity[], lat: number, lng: number): Activity[] {
  return [...acts].sort((a, b) => haversineKm(lat, lng, a.lat, a.lng) - haversineKm(lat, lng, b.lat, b.lng))
}

// Default: Estavayer-le-Lac
const DEFAULT_LAT = 46.849
const DEFAULT_LNG = 6.846

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [locationLabel, setLocationLabel] = useState('')
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters })
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [nearbyActivities, setNearbyActivities] = useState<Activity[]>(() =>
    sortByProximity(allActivities, DEFAULT_LAT, DEFAULT_LNG)
  )
  const [cardIndex, setCardIndex] = useState(0)

  // Geolocate and sort activities
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setNearbyActivities(sortByProximity(allActivities, pos.coords.latitude, pos.coords.longitude))
      },
      () => {}, // keep default sort
      { enableHighAccuracy: false, timeout: 6000 }
    )
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PLACEHOLDER_PHRASES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Rotate activity cards every 4s
  useEffect(() => {
    if (nearbyActivities.length === 0) return
    const interval = setInterval(() => {
      setCardIndex((i) => (i + 1) % nearbyActivities.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [nearbyActivities])

  // Current pair of activities for the two bento slots
  const card1 = nearbyActivities[cardIndex] || allActivities[0]
  const card2 = nearbyActivities[(cardIndex + 1) % nearbyActivities.length] || allActivities[1]
  // Coup de coeur = highest rated nearby
  const coupDeCoeur = nearbyActivities.reduce((best, a) => a.rating > best.rating ? a : best, nearbyActivities[0] || allActivities[0])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (locationLabel) params.set('lieu', locationLabel)
    router.push(`/recherche?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-canvas">

      {/* Background subtle shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #FFF0ED 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -left-20 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FFD9D0 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 pt-24 pb-12 sm:pt-32 lg:pt-32 lg:pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-8 lg:gap-12 items-start">

        {/* Left — Content */}
        <div className="flex flex-col">

          {/* Badge */}
          <motion.div
            className="mb-5 sm:mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-accent-subtle text-accent text-[11px] sm:text-[12px] font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <Sparkles size={12} />
              <span className="hidden sm:inline">La plateforme n°1 des familles actives en Suisse romande</span>
              <span className="sm:hidden">N°1 des familles actives en Suisse romande</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display font-black text-text-primary leading-[1.08] mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(2rem, 6.5vw, 6rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
          >
            Trouvez l'activité idéale pour{' '}
            <span className="text-accent">voir leurs yeux s'illuminer.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-[15px] sm:text-[17px] text-text-secondary leading-relaxed mb-6 sm:mb-10 max-w-[480px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.26 }}
          >
            100% activités pour enfants, près de chez vous, filtrées en quelques secondes.
          </motion.p>

          {/* Search box */}
          <motion.div
            className="bg-elevated rounded-3xl p-2 shadow-card-hover mb-4 border border-border max-w-[640px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.34 }}
          >
            {/* Query input — full width with animated placeholder */}
            <div className="relative flex items-center gap-3 bg-canvas rounded-2xl px-4 py-3.5 mb-2">
              <Search size={16} className="text-text-muted flex-shrink-0" />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-transparent text-[14px] text-text-primary outline-none relative z-10"
                />
                {/* Animated rotating placeholder */}
                {!query && (
                  <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={phraseIndex}
                        className="text-[14px] text-text-muted whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isFocused ? 0.5 : 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {PLACEHOLDER_PHRASES[phraseIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* Location search */}
              <LocationSearch
                value={locationLabel}
                onChange={(label) => setLocationLabel(label)}
                className="flex-1"
              />

              {/* Submit */}
              <Button onClick={handleSearch} size="lg" className="sm:px-8 rounded-2xl">
                Rechercher
              </Button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="mb-6 sm:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.40 }}
          >
            <FilterBar filters={filters} onChange={setFilters} open={true} />
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 pt-6 sm:pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.54 }}
          >
            {STAT_ITEMS.map((item) => (
              <div key={item.label}>
                <p className="font-display font-black text-[17px] sm:text-[22px] text-text-primary leading-none mb-0.5">{item.value}</p>
                <p className="text-[10px] sm:text-[11px] text-text-secondary">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Visual bento (desktop) */}
        <motion.div
          className="hidden lg:grid grid-cols-2 grid-rows-3 gap-3 h-[580px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.2 }}
        >
          {/* Large card — Partager un lieu */}
          <a
            href="/partager"
            className="row-span-2 rounded-3xl bg-gradient-to-br from-accent/5 via-accent-subtle to-accent/10 border border-accent/20 flex flex-col justify-center items-center p-8 shadow-card hover:shadow-card-hover hover:scale-[1.01] transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #FF6B52 0%, transparent 70%)' }} />
            <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-300">
              <Plus size={28} className="text-accent" />
            </div>
            <p className="font-display font-bold text-[20px] text-text-primary leading-tight text-center mb-2">Partager un lieu</p>
            <p className="text-[13px] text-text-secondary text-center max-w-[200px] leading-relaxed">
              Vous connaissez un endroit kids friendly ? Partagez-le avec la communauté !
            </p>
            <span className="mt-4 text-[12px] font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
              Suggérer →
            </span>
          </a>

          {/* Top right — Activity card 1 (rotating) */}
          <a href={`/activite/${card1.slug}`} className="rounded-3xl overflow-hidden relative shadow-card group cursor-pointer">
            <AnimatePresence mode="wait">
              <motion.div
                key={card1.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={card1.image} alt={card1.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <span className="inline-block bg-accent text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full mb-1.5">{card1.category}</span>
              <p className="text-white font-display font-bold text-[14px] leading-snug">{card1.name}</p>
              <p className="text-white/80 text-[11px]">{card1.city} · {card1.price === 0 ? 'Gratuit' : `${card1.price} CHF`}</p>
            </div>
          </a>

          {/* Middle right — Weather */}
          <WeatherWidget />

          {/* Bottom left — Activity card 2 (rotating) */}
          <a href={`/activite/${card2.slug}`} className="rounded-3xl overflow-hidden relative shadow-card group cursor-pointer">
            <AnimatePresence mode="wait">
              <motion.div
                key={card2.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={card2.image} alt={card2.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <span className="inline-block bg-accent text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full mb-1.5">{card2.category}</span>
              <p className="text-white font-display font-bold text-[14px] leading-snug">{card2.name}</p>
              <p className="text-white/80 text-[11px]">{card2.city} · {card2.price === 0 ? 'Gratuit' : `${card2.price} CHF`}</p>
            </div>
          </a>

          {/* Bottom right — Coup de coeur (dynamic) */}
          <a href={`/activite/${coupDeCoeur.slug}`} className="rounded-3xl bg-gradient-to-br from-red-50 to-accent-subtle border border-accent/15 flex flex-col justify-center items-center p-4 shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200">
            <Heart size={20} className="text-accent fill-accent mb-2" />
            <p className="font-display font-bold text-[14px] text-text-primary leading-tight text-center">Coup de coeur</p>
            <p className="text-[12px] text-accent font-medium mt-1 text-center leading-tight">{coupDeCoeur.name}</p>
            <p className="text-[11px] text-text-muted">{coupDeCoeur.city} · {coupDeCoeur.price === 0 ? 'Gratuit' : `${coupDeCoeur.price} CHF`}</p>
          </a>
        </motion.div>
        </div>

        {/* Mobile bento cards */}
        <motion.div
          className="lg:hidden mt-8 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Partager un lieu */}
          <a
            href="/partager"
            className="col-span-2 rounded-2xl bg-gradient-to-r from-accent/5 via-accent-subtle to-accent/10 border border-accent/20 flex items-center gap-4 p-4 shadow-card active:scale-[0.98] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
              <Plus size={22} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[14px] text-text-primary leading-tight">Partager un lieu</p>
              <p className="text-[12px] text-text-secondary mt-0.5">Suggérez une activité kids friendly</p>
            </div>
            <span className="text-accent text-[18px] flex-shrink-0">→</span>
          </a>

          {/* Weather */}
          <div className="col-span-2 min-h-[160px]">
            <WeatherWidget />
          </div>

          {/* Coup de coeur (dynamic) */}
          <a href={`/activite/${coupDeCoeur.slug}`} className="rounded-2xl bg-gradient-to-br from-red-50 to-accent-subtle border border-accent/15 flex flex-col justify-center items-center p-4 shadow-card active:scale-[0.98] transition-all">
            <Heart size={18} className="text-accent fill-accent mb-1.5" />
            <p className="font-display font-bold text-[13px] text-text-primary leading-tight text-center">Coup de coeur</p>
            <p className="text-[11px] text-accent font-medium mt-1 text-center leading-tight">{coupDeCoeur.name}</p>
            <p className="text-[10px] text-text-muted">{coupDeCoeur.city} · {coupDeCoeur.price === 0 ? 'Gratuit' : `${coupDeCoeur.price} CHF`}</p>
          </a>

          {/* Activity card (rotating) */}
          <a href={`/activite/${card1.slug}`} className="rounded-2xl overflow-hidden relative shadow-card aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.div
                key={card1.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={card1.image} alt={card1.name} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <p className="text-white font-display font-bold text-[13px] leading-snug">{card1.name}</p>
              <p className="text-white/80 text-[10px]">{card1.city} · {card1.price === 0 ? 'Gratuit' : `${card1.price} CHF`}</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
