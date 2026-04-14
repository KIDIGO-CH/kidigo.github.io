'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Sparkles, SlidersHorizontal, Plus, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LocationSearch } from '@/components/ui/LocationSearch'
import { WeatherWidget } from '@/components/home/WeatherWidget'
import { FilterBar, defaultFilters, countActiveFilters, type Filters } from '@/components/search/FilterBar'
import type { Location } from '@/lib/data'

const STAT_ITEMS = [
  { value: '2 400+', label: 'Activités référencées' },
  { value: '850+', label: 'Organisateurs vérifiés' },
  { value: '45 000', label: 'Familles satisfaites' },
]

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [locationLabel, setLocationLabel] = useState('')
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters })
  const [showFilters, setShowFilters] = useState(false)

  const activeCount = countActiveFilters(filters)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (locationLabel) params.set('lieu', locationLabel)
    router.push(`/recherche?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-canvas">

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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 min-h-[100dvh] grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-12 items-center pt-48 pb-28 lg:pt-32 lg:pb-0">

        {/* Left — Content */}
        <div className="flex flex-col">

          {/* Badge + Weather */}
          <motion.div
            className="mb-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent-subtle text-accent text-[12px] font-medium px-4 py-2 rounded-full">
              <Sparkles size={13} />
              La plateforme n°1 des familles actives en Suisse romande
            </span>
            <WeatherWidget />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display font-black text-text-primary leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
          >
            Trouvez l'activité idéale pour{' '}
            <span className="text-accent">voir leurs yeux s'illuminer.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-[17px] text-text-secondary leading-relaxed mb-10 max-w-[480px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.26 }}
          >
            Des loisirs choisis avec soin pour chaque âge et chaque envie.
            Explorez, comparez, émerveillez.
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

          {/* Filters toggle + FilterBar */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.40 }}
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-[13px] font-medium transition-all duration-200 mb-2 ${
                showFilters || activeCount > 0
                  ? 'bg-accent text-white border-accent'
                  : 'bg-canvas border-border text-text-secondary hover:border-accent/40'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filtres
              {activeCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white/25 text-[11px] font-bold flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
            <FilterBar filters={filters} onChange={setFilters} open={showFilters} />
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-8 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.54 }}
          >
            {STAT_ITEMS.map((item) => (
              <div key={item.label}>
                <p className="font-display font-black text-[22px] text-text-primary leading-none mb-0.5">{item.value}</p>
                <p className="text-[11px] text-text-secondary">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Visual bento */}
        <motion.div
          className="hidden lg:grid grid-cols-2 grid-rows-3 gap-3 h-[580px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.2 }}
        >
          {/* Large card top-left */}
          <div className="row-span-2 rounded-3xl overflow-hidden relative shadow-card">
            <img src="https://picsum.photos/seed/hero-1/400/500" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block bg-accent text-white text-[11px] font-medium px-3 py-1 rounded-full mb-2">Art créatif</span>
              <p className="text-white font-display font-bold text-[15px] leading-snug">Atelier Aquarelle</p>
              <p className="text-white/80 text-[12px]">Genève · 28 CHF</p>
            </div>
          </div>

          {/* Top right */}
          <div className="rounded-3xl overflow-hidden relative shadow-card">
            <img src="https://picsum.photos/seed/hero-2/400/280" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-display font-bold text-[13px]">Tennis Junior</p>
              <p className="text-white/80 text-[11px]">Lausanne · 35 CHF</p>
            </div>
          </div>

          {/* Middle right — Weather */}
          <WeatherWidget variant="card" />

          {/* Bottom left — Partager un lieu CTA */}
          <a
            href="/partager"
            className="rounded-3xl bg-gradient-to-br from-accent-subtle to-accent/10 border border-accent/20 flex flex-col justify-center items-center p-4 shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-accent/15 flex items-center justify-center mb-2 group-hover:bg-accent/25 transition-colors">
              <Plus size={20} className="text-accent" />
            </div>
            <p className="font-display font-bold text-[13px] text-text-primary leading-tight text-center">Partager un lieu</p>
            <p className="text-[11px] text-text-secondary text-center mt-0.5">Suggérez une activité kids friendly</p>
          </a>

          {/* Bottom right — Coup de coeur */}
          <a href="/activite/atelier-peinture-aquarelle-geneve" className="rounded-3xl bg-gradient-to-br from-red-50 to-accent-subtle border border-accent/15 flex flex-col justify-center items-center p-4 shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200">
            <Heart size={18} className="text-accent fill-accent mb-1.5" />
            <p className="font-display font-bold text-[13px] text-text-primary leading-tight text-center">Coup de coeur</p>
            <p className="text-[11px] text-accent font-medium mt-1 text-center">Atelier Aquarelle</p>
            <p className="text-[10px] text-text-muted">Genève · 28 CHF</p>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
