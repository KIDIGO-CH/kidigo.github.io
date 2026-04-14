'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Sparkles, Plus, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LocationSearch } from '@/components/ui/LocationSearch'
import { WeatherWidget } from '@/components/home/WeatherWidget'
import { FilterBar, defaultFilters, type Filters } from '@/components/search/FilterBar'
import type { Location } from '@/lib/data'

const STAT_ITEMS = [
  { value: '2 400+', label: 'Activités référencées' },
  { value: '850+', label: 'Organisateurs vérifiés' },
  { value: '45 000', label: 'Familles satisfaites' },
  { value: '1 200+', label: 'Partages par la communauté' },
]

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [locationLabel, setLocationLabel] = useState('')
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters })

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
            className="bg-elevated rounded-3xl p-2 shadow-card-hover mb-4 border border-border"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.34 }}
          >
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Query input */}
              <div className="flex-1 flex items-center gap-3 bg-canvas rounded-2xl px-4 py-3">
                <Search size={16} className="text-text-muted flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Sport, musique, art créatif…"
                  className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-muted outline-none"
                />
              </div>

              {/* Location search */}
              <LocationSearch
                value={locationLabel}
                onChange={(label) => setLocationLabel(label)}
                className="sm:min-w-[200px]"
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

          {/* Top right — Activity image */}
          <div className="rounded-3xl overflow-hidden relative shadow-card">
            <img src="https://picsum.photos/seed/hero-2/400/280" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-block bg-accent text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full mb-1.5">Sport</span>
              <p className="text-white font-display font-bold text-[14px] leading-snug">Tennis Junior</p>
              <p className="text-white/80 text-[11px]">Lausanne · 35 CHF</p>
            </div>
          </div>

          {/* Middle right — Weather */}
          <WeatherWidget />

          {/* Bottom left — Activity image */}
          <div className="rounded-3xl overflow-hidden relative shadow-card">
            <img src="https://picsum.photos/seed/hero-1/400/280" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-block bg-accent text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full mb-1.5">Art créatif</span>
              <p className="text-white font-display font-bold text-[14px] leading-snug">Atelier Aquarelle</p>
              <p className="text-white/80 text-[11px]">Genève · 28 CHF</p>
            </div>
          </div>

          {/* Bottom right — Coup de coeur */}
          <a href="/activite/atelier-peinture-aquarelle-geneve" className="rounded-3xl bg-gradient-to-br from-red-50 to-accent-subtle border border-accent/15 flex flex-col justify-center items-center p-4 shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200">
            <Heart size={20} className="text-accent fill-accent mb-2" />
            <p className="font-display font-bold text-[14px] text-text-primary leading-tight text-center">Coup de coeur</p>
            <p className="text-[12px] text-accent font-medium mt-1 text-center">Atelier Aquarelle</p>
            <p className="text-[11px] text-text-muted">Genève · 28 CHF</p>
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

          {/* Coup de coeur */}
          <a href="/activite/atelier-peinture-aquarelle-geneve" className="rounded-2xl bg-gradient-to-br from-red-50 to-accent-subtle border border-accent/15 flex flex-col justify-center items-center p-4 shadow-card active:scale-[0.98] transition-all">
            <Heart size={18} className="text-accent fill-accent mb-1.5" />
            <p className="font-display font-bold text-[13px] text-text-primary leading-tight text-center">Coup de coeur</p>
            <p className="text-[11px] text-accent font-medium mt-1 text-center">Atelier Aquarelle</p>
            <p className="text-[10px] text-text-muted">Genève · 28 CHF</p>
          </a>

          {/* Activity card */}
          <div className="rounded-2xl overflow-hidden relative shadow-card aspect-[4/3]">
            <img src="https://picsum.photos/seed/hero-2/400/280" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-display font-bold text-[13px] leading-snug">Tennis Junior</p>
              <p className="text-white/80 text-[10px]">Lausanne · 35 CHF</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
