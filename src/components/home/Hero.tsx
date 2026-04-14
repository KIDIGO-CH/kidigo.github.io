'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, MapPin, ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cities, categories } from '@/lib/data'

const STAT_ITEMS = [
  { value: '2 400+', label: 'Activités référencées' },
  { value: '850+', label: 'Organisateurs vérifiés' },
  { value: '45 000', label: 'Familles satisfaites' },
]

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (city) params.set('ville', city)
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

          {/* Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent-subtle text-accent text-[12px] font-medium px-4 py-2 rounded-full">
              <Sparkles size={13} />
              La plateforme n°1 des familles actives
            </span>
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
            className="bg-elevated rounded-3xl p-2 shadow-card-hover mb-10 border border-border"
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

              {/* City select */}
              <div className="flex items-center gap-3 bg-canvas rounded-2xl px-4 py-3 sm:min-w-[160px]">
                <MapPin size={16} className="text-text-muted flex-shrink-0" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-text-primary outline-none cursor-pointer appearance-none"
                >
                  <option value="">Toutes les villes</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="text-text-muted flex-shrink-0" />
              </div>

              {/* Submit */}
              <Button onClick={handleSearch} size="lg" className="sm:px-8 rounded-2xl">
                Rechercher
              </Button>
            </div>
          </motion.div>

          {/* Quick filters */}
          <motion.div
            className="flex flex-wrap gap-2 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.44 }}
          >
            <span className="text-[12px] text-text-muted self-center mr-1">Populaire :</span>
            {['Sport', 'Art créatif', 'Musique', 'Stages vacances', 'Anniversaires'].map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/recherche?categorie=${encodeURIComponent(tag)}`)}
                className="text-[12px] font-medium text-text-secondary bg-elevated border border-border hover:border-accent hover:text-accent px-3 py-1.5 rounded-full transition-all duration-200"
              >
                {tag}
              </button>
            ))}
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

          {/* Middle right */}
          <div className="rounded-3xl bg-accent-subtle border border-accent/20 flex flex-col justify-center items-center p-4 shadow-card">
            <div className="text-3xl mb-2">🎵</div>
            <p className="font-display font-bold text-[14px] text-text-primary text-center leading-snug">Éveil Musical</p>
            <p className="text-[11px] text-accent font-medium mt-1">Dès 2 ans · 22 CHF</p>
          </div>

          {/* Bottom left */}
          <div className="rounded-3xl bg-elevated border border-border flex items-center gap-3 p-4 shadow-card">
            <div className="w-10 h-10 rounded-2xl bg-accent-subtle flex items-center justify-center text-lg">🔬</div>
            <div>
              <p className="font-display font-bold text-[13px] text-text-primary leading-tight">Lab Juniors</p>
              <p className="text-[11px] text-text-secondary">Science & Découvertes</p>
            </div>
          </div>

          {/* Bottom right */}
          <div className="rounded-3xl overflow-hidden relative shadow-card">
            <img src="https://picsum.photos/seed/hero-3/400/200" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3">
              <p className="text-white font-display font-bold text-[13px]">Nature & Aventure</p>
              <p className="text-white/80 text-[11px]">Montreux · 18 CHF</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
