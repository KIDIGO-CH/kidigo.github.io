'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, LayoutGrid, Map } from 'lucide-react'
import { ActivityCard } from '@/components/search/ActivityCard'
import { LocationSearch } from '@/components/ui/LocationSearch'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { activities, categories, locations, type Location } from '@/lib/data'
import type { Category } from '@/lib/types'

const MapView = dynamic(
  () => import('@/components/search/MapView').then(mod => mod.MapView),
  { ssr: false, loading: () => <div className="w-full h-[calc(100dvh-200px)] rounded-3xl bg-surface animate-pulse" /> }
)

type SortOption = 'rating' | 'price-asc' | 'price-desc' | 'popular'
type AgeFilter = null | 2 | 5 | 8 | 11

const AGE_OPTIONS: { value: AgeFilter; label: string }[] = [
  { value: null, label: 'Tous âges' },
  { value: 2, label: '2-4 ans' },
  { value: 5, label: '5-7 ans' },
  { value: 8, label: '8-10 ans' },
  { value: 11, label: '11-14 ans' },
]

export default function RecherchePage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-canvas" />}>
      <RechercheContent />
    </Suspense>
  )
}

function RechercheContent() {
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('')
  const [locationLabel, setLocationLabel] = useState('')
  const [locationFilter, setLocationFilter] = useState<Location | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [isIndoor, setIsIndoor] = useState<boolean | null>(null)
  const [priceMax, setPriceMax] = useState<number | null>(null)
  const [isFree, setIsFree] = useState(false)
  const [ageFilter, setAgeFilter] = useState<AgeFilter>(null)
  const [sortBy, setSortBy] = useState<SortOption>('rating')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')

  // Read URL params on mount
  useEffect(() => {
    const q = searchParams.get('q')
    const lieu = searchParams.get('lieu')
    if (q) setQuery(q)
    if (lieu) {
      setLocationLabel(lieu)
      const match = locations.find(l => (l.type === 'canton' ? l.locality : `${l.npa} ${l.locality}`) === lieu)
      if (match) setLocationFilter(match)
    }
  }, [searchParams])

  const handleLocationChange = (label: string, loc: Location | null) => {
    setLocationLabel(label)
    setLocationFilter(loc)
  }

  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const filtered = useMemo(() => {
    let result = [...activities]

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (locationFilter) result = result.filter(locationFilter.filterFn)
    if (selectedCategories.length > 0) result = result.filter(a => selectedCategories.includes(a.category))
    if (isIndoor !== null) result = result.filter(a => a.isIndoor === isIndoor)
    if (isFree) {
      result = result.filter(a => a.price === 0)
    } else if (priceMax !== null) {
      result = result.filter(a => a.price <= priceMax)
    }
    if (ageFilter !== null) {
      const ageMax = ageFilter + 3
      result = result.filter(a => a.ageMin <= ageMax && a.ageMax >= ageFilter)
    }

    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break
    }

    return result
  }, [query, locationFilter, selectedCategories, isIndoor, priceMax, isFree, ageFilter, sortBy])

  const activeFiltersCount = [
    locationFilter,
    selectedCategories.length > 0,
    isIndoor !== null,
    priceMax !== null || isFree,
    ageFilter !== null,
  ].filter(Boolean).length

  const clearFilters = () => {
    setLocationLabel('')
    setLocationFilter(null)
    setSelectedCategories([])
    setIsIndoor(null)
    setPriceMax(null)
    setIsFree(false)
    setAgeFilter(null)
  }

  return (
    <div className="min-h-[100dvh] bg-canvas pt-16">

      {/* Sticky search header */}
      <div className="sticky top-16 z-30 bg-elevated/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4">
          <div className="flex items-center gap-3">

            {/* Search input */}
            <div className="flex-1 flex items-center gap-3 bg-canvas rounded-2xl px-4 py-2.5 border border-border">
              <Search size={15} className="text-text-muted flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une activité…"
                className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-muted outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')}>
                  <X size={13} className="text-text-muted hover:text-text-primary" />
                </button>
              )}
            </div>

            {/* Location search */}
            <LocationSearch
              value={locationLabel}
              onChange={handleLocationChange}
              compact
              className="hidden sm:block sm:min-w-[220px]"
            />

            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-[13px] font-medium transition-all duration-200 ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-accent text-white border-accent'
                  : 'bg-canvas border-border text-text-secondary hover:border-accent/40'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filtres
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white/25 text-[11px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-3">

                  {/* Categories — multi-select pills */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map(c => {
                      const isActive = selectedCategories.includes(c.name)
                      return (
                        <button
                          key={c.name}
                          onClick={() => toggleCategory(c.name)}
                          className={`text-[12px] px-3 py-2 rounded-xl border transition-all duration-200 flex items-center gap-1.5 ${
                            isActive
                              ? 'text-white border-transparent'
                              : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
                          }`}
                          style={isActive ? { backgroundColor: c.color, borderColor: c.color } : undefined}
                        >
                          <span>{c.icon}</span>
                          {c.name}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex flex-wrap gap-3 items-center">

                    {/* Indoor/Outdoor */}
                    <div className="flex gap-2">
                      {[{ v: null, label: 'Tous lieux' }, { v: true, label: 'Intérieur' }, { v: false, label: 'Extérieur' }].map(({ v, label }) => (
                        <button
                          key={label}
                          onClick={() => setIsIndoor(v)}
                          className={`text-[12px] px-3 py-2 rounded-xl border transition-all duration-200 ${
                            isIndoor === v ? 'bg-accent text-white border-accent' : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="w-px h-6 bg-border" />

                    {/* Age filter */}
                    <div className="flex gap-2">
                      {AGE_OPTIONS.map(({ value, label }) => (
                        <button
                          key={label}
                          onClick={() => setAgeFilter(value)}
                          className={`text-[12px] px-3 py-2 rounded-xl border transition-all duration-200 ${
                            ageFilter === value ? 'bg-accent text-white border-accent' : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="w-px h-6 bg-border" />

                    {/* Price — with Gratuit */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setIsFree(false); setPriceMax(null) }}
                        className={`text-[12px] px-3 py-2 rounded-xl border transition-all duration-200 ${
                          !isFree && priceMax === null ? 'bg-accent text-white border-accent' : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
                        }`}
                      >
                        Tous prix
                      </button>
                      <button
                        onClick={() => { setIsFree(true); setPriceMax(null) }}
                        className={`text-[12px] px-3 py-2 rounded-xl border transition-all duration-200 ${
                          isFree ? 'bg-accent text-white border-accent' : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
                        }`}
                      >
                        Gratuit
                      </button>
                      {[20, 35, 50, 100].map((price) => (
                        <button
                          key={price}
                          onClick={() => { setIsFree(false); setPriceMax(price) }}
                          className={`text-[12px] px-3 py-2 rounded-xl border transition-all duration-200 ${
                            !isFree && priceMax === price ? 'bg-accent text-white border-accent' : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
                          }`}
                        >
                          ≤ {price} CHF
                        </button>
                      ))}
                    </div>

                    {activeFiltersCount > 0 && (
                      <button onClick={clearFilters} className="text-[12px] text-red-500 hover:text-red-600 flex items-center gap-1 ml-2">
                        <X size={12} /> Effacer tout
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-[18px] text-text-primary">
              {filtered.length} activité{filtered.length > 1 ? 's' : ''}
              {selectedCategories.length === 1 && <span className="text-accent ml-1">· {selectedCategories[0]}</span>}
              {selectedCategories.length > 1 && <span className="text-accent ml-1">· {selectedCategories.length} catégories</span>}
              {locationLabel && <span className="text-text-secondary ml-1">· {locationLabel}</span>}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="flex bg-canvas border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <LayoutGrid size={14} />
                Liste
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all duration-200 ${
                  viewMode === 'map'
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Map size={14} />
                Carte
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-elevated border border-border rounded-xl px-3 py-2 text-[13px] text-text-primary outline-none cursor-pointer"
            >
              <option value="rating">Mieux notées</option>
              <option value="popular">Plus populaires</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Active filter badges */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {locationFilter && <Badge variant="subtle">{locationLabel} <button onClick={() => handleLocationChange('', null)} className="ml-1">×</button></Badge>}
            {selectedCategories.map(cat => (
              <Badge key={cat} variant="subtle">{cat} <button onClick={() => toggleCategory(cat)} className="ml-1">×</button></Badge>
            ))}
            {isIndoor !== null && <Badge variant="subtle">{isIndoor ? 'Intérieur' : 'Extérieur'} <button onClick={() => setIsIndoor(null)} className="ml-1">×</button></Badge>}
            {ageFilter !== null && <Badge variant="subtle">{AGE_OPTIONS.find(a => a.value === ageFilter)?.label} <button onClick={() => setAgeFilter(null)} className="ml-1">×</button></Badge>}
            {isFree && <Badge variant="subtle">Gratuit <button onClick={() => setIsFree(false)} className="ml-1">×</button></Badge>}
            {!isFree && priceMax !== null && <Badge variant="subtle">≤ {priceMax} CHF <button onClick={() => setPriceMax(null)} className="ml-1">×</button></Badge>}
          </div>
        )}

        {/* Results */}
        {filtered.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((activity, i) => (
                  <ActivityCard key={activity.id} activity={activity} index={i} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <MapView activities={filtered} />
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="text-5xl mb-6">🔍</div>
            <h2 className="font-display font-bold text-[22px] text-text-primary mb-3">Aucune activité trouvée</h2>
            <p className="text-text-secondary text-[15px] mb-8 max-w-md">
              Essayez de modifier vos filtres ou d'élargir votre recherche à d'autres villes.
            </p>
            <Button onClick={clearFilters} variant="outline">Effacer les filtres</Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
