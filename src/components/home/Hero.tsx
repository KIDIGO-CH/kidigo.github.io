'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Plus, Heart, Navigation } from 'lucide-react'
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
  "J'ai besoin de 2h tranquille",
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
  const [locatingNearby, setLocatingNearby] = useState(false)
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

  // Current trio of activities for the bento slots
  const card1 = nearbyActivities[cardIndex] || allActivities[0]
  const card2 = nearbyActivities[(cardIndex + 1) % nearbyActivities.length] || allActivities[1]
  const card3 = nearbyActivities[(cardIndex + 2) % nearbyActivities.length] || allActivities[2]
  // Coup de coeur = top rated nearby, rotating
  const topRated = [...nearbyActivities].sort((a, b) => b.rating - a.rating)
  const [coeurIndex, setCoeurIndex] = useState(0)

  useEffect(() => {
    if (topRated.length === 0) return
    const interval = setInterval(() => {
      setCoeurIndex((i) => (i + 1) % Math.min(topRated.length, 6))
    }, 5000)
    return () => clearInterval(interval)
  }, [topRated.length])

  const coupDeCoeur = topRated[coeurIndex] || allActivities[0]

  const handleNearby = () => {
    if (filters.nearbyKm !== null) {
      setFilters(f => ({ ...f, nearbyKm: null, userLat: null, userLng: null }))
      return
    }
    setLocatingNearby(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFilters(f => ({ ...f, nearbyKm: 20, userLat: pos.coords.latitude, userLng: pos.coords.longitude }))
        setLocatingNearby(false)
      },
      () => setLocatingNearby(false),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (locationLabel) params.set('lieu', locationLabel)
    if (filters.categories.length > 0) params.set('cat', filters.categories.join(','))
    if (filters.ages.length > 0) params.set('age', filters.ages.join(','))
    if (filters.prices.length > 0) params.set('prix', filters.prices.join(','))
    if (filters.dateFilter) params.set('date', filters.dateFilter)
    if (filters.nearbyKm !== null && filters.userLat !== null && filters.userLng !== null) {
      params.set('nearby', `${filters.nearbyKm},${filters.userLat},${filters.userLng}`)
    }
    if (filters.encadre.length > 0) params.set('encadre', filters.encadre.join(','))
    if (filters.accessibility.length > 0) params.set('access', filters.accessibility.join(','))
    if (filters.comfort.length > 0) params.set('confort', filters.comfort.join(','))
    if (filters.access.length > 0) params.set('acces', filters.access.join(','))
    if (filters.animals) params.set('animaux', '1')
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
              Partagez vos bons plans kids friendly et soyez récompensé !
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

          {/* Middle right — Activity card 2 (rotating) */}
          <a href={`/activite/${card2.slug}`} className="rounded-3xl overflow-hidden relative shadow-card group cursor-pointer">
            <AnimatePresence mode="wait">
              <motion.div
                key={`bento-card2-${card2.id}`}
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

          {/* Bottom left — Activity card 3 (rotating) */}
          <a href={`/activite/${card3.slug}`} className="rounded-3xl overflow-hidden relative shadow-card group cursor-pointer">
            <AnimatePresence mode="wait">
              <motion.div
                key={`bento-card3-${card3.id}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={card3.image} alt={card3.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <span className="inline-block bg-accent text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full mb-1.5">{card3.category}</span>
              <p className="text-white font-display font-bold text-[14px] leading-snug">{card3.name}</p>
              <p className="text-white/80 text-[11px]">{card3.city} · {card3.price === 0 ? 'Gratuit' : `${card3.price} CHF`}</p>
            </div>
          </a>

          {/* Bottom right — Coup de coeur (rotating with dynamic bg) */}
          <a href={`/activite/${coupDeCoeur.slug}`} className="rounded-3xl overflow-hidden relative shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200 group cursor-pointer">
            <AnimatePresence mode="wait">
              <motion.div
                key={`coeur-desktop-${coupDeCoeur.id}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={coupDeCoeur.image} alt={coupDeCoeur.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 p-4">
              <Heart size={20} className="text-white fill-white mb-2" />
              <p className="font-display font-bold text-[14px] text-white leading-tight text-center">Coup de coeur</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={coupDeCoeur.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[12px] text-white/90 font-medium mt-1 text-center leading-tight">{coupDeCoeur.name}</p>
                  <p className="text-[11px] text-white/70">{coupDeCoeur.city} · {coupDeCoeur.price === 0 ? 'Gratuit' : `${coupDeCoeur.price} CHF`}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </a>
        </motion.div>
        </div>

        {/* Search box + Weather — full width below grid */}
        <motion.div
          className="flex gap-4 items-start mb-2 lg:mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.34 }}
        >
          {/* Search box */}
          <div className="bg-elevated rounded-3xl p-2 shadow-card-hover border border-border flex-1 min-w-0">
            {/* Query input */}
            <div className="relative flex items-start gap-3 bg-canvas rounded-2xl px-4 py-3.5 mb-2 min-h-[56px]">
              <Search size={16} className="text-text-muted flex-shrink-0 mt-0.5" />
              <div className="flex-1 relative min-h-[36px]">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-transparent text-[14px] text-text-primary outline-none relative z-10"
                />
                {!query && (
                  <div className="absolute inset-0 flex items-start pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={phraseIndex}
                        className="text-[14px] text-text-muted leading-[1.4]"
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

            {/* Location + Autour de moi + Submit */}
            <div className="flex items-center gap-2">
              <LocationSearch
                value={locationLabel}
                onChange={(label) => setLocationLabel(label)}
                className="flex-1 min-w-0"
                compact
              />
              <button
                type="button"
                onClick={handleNearby}
                className={`flex-shrink-0 h-[42px] px-3 rounded-2xl border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium text-[13px] ${
                  filters.nearbyKm !== null
                    ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                    : 'bg-canvas border-border text-text-primary hover:border-accent/40'
                }`}
              >
                <Navigation size={13} className={locatingNearby ? 'animate-pulse' : ''} />
                <span className="hidden sm:inline">{locatingNearby ? 'Localisation…' : filters.nearbyKm !== null ? `≤ ${filters.nearbyKm} km` : 'Autour de moi'}</span>
                <span className="sm:hidden">{locatingNearby ? '…' : filters.nearbyKm !== null ? `${filters.nearbyKm} km` : 'Près de moi'}</span>
              </button>
              <Button onClick={handleSearch} size="lg" className="hidden lg:flex flex-shrink-0 px-8 rounded-2xl">
                Rechercher
              </Button>
            </div>

            {/* Submit — mobile only */}
            <div className="lg:hidden mt-2">
              <Button onClick={handleSearch} size="lg" className="w-full rounded-2xl">
                Rechercher
              </Button>
            </div>
          </div>

          {/* Weather — desktop only */}
          <div className="hidden lg:block w-[380px] flex-shrink-0">
            <WeatherWidget />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-4 sm:mb-6"
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
            <div key={item.label} className="text-center">
              <p className="font-display font-black text-[17px] sm:text-[22px] text-text-primary leading-none mb-0.5">{item.value}</p>
              <p className="text-[10px] sm:text-[11px] text-text-secondary">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mobile bento cards */}
        <motion.div
          className="lg:hidden mt-6 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Partager un lieu */}
          <a
            href="/partager"
            className="col-span-2 rounded-2xl bg-accent flex items-center gap-3 p-4 shadow-md active:scale-[0.98] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Plus size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[14px] text-white leading-tight">Partager un lieu</p>
              <p className="text-[11px] text-white/70 mt-0.5">Partagez vos bons plans et soyez récompensé</p>
            </div>
            <span className="text-white text-[18px] flex-shrink-0 group-active:translate-x-0.5 transition-transform">→</span>
          </a>

          {/* Weather */}
          <div className="col-span-2 min-h-[150px]">
            <WeatherWidget />
          </div>

          {/* Coup de coeur (rotating with dynamic bg) */}
          <a href={`/activite/${coupDeCoeur.slug}`} className="rounded-2xl overflow-hidden relative shadow-card active:scale-[0.98] transition-all aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`coeur-bg-${coupDeCoeur.id}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={coupDeCoeur.image} alt={coupDeCoeur.name} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 p-3">
              <Heart size={16} className="text-white fill-white mb-1" />
              <p className="font-display font-bold text-[12px] text-white leading-tight text-center">Coup de coeur</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={coupDeCoeur.id}
                  className="text-[10px] text-white/80 font-medium mt-0.5 text-center leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {coupDeCoeur.name}
                </motion.p>
              </AnimatePresence>
            </div>
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
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
              <p className="text-white font-display font-bold text-[12px] leading-snug">{card1.name}</p>
              <p className="text-white/80 text-[10px]">{card1.city} · {card1.price === 0 ? 'Gratuit' : `${card1.price} CHF`}</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
