'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, LayoutGrid, Map, MapPin, Navigation } from 'lucide-react'
import { ActivityCard } from '@/components/search/ActivityCard'
import { FilterBar, applyFilters, countActiveFilters, defaultFilters, type Filters } from '@/components/search/FilterBar'
import { LocationSearch } from '@/components/ui/LocationSearch'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { activities, locations, type Location } from '@/lib/data'

const MapView = dynamic(
  () => import('@/components/search/MapView').then(mod => mod.MapView),
  { ssr: false, loading: () => <div className="w-full h-[calc(100dvh-200px)] rounded-3xl bg-surface animate-pulse" /> }
)

type SortOption = 'rating' | 'price-asc' | 'price-desc' | 'popular'

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
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters })
  const [sortBy, setSortBy] = useState<SortOption>('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [locatingNearby, setLocatingNearby] = useState(false)

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

    // Restore filters from URL
    const restored: Partial<Filters> = {}
    const cat = searchParams.get('cat')
    if (cat) restored.categories = cat.split(',') as Filters['categories']
    const age = searchParams.get('age')
    if (age) restored.ages = age.split(',') as Filters['ages']
    const prix = searchParams.get('prix')
    if (prix) restored.prices = prix.split(',') as Filters['prices']
    const date = searchParams.get('date')
    if (date) restored.dateFilter = date
    const nearby = searchParams.get('nearby')
    if (nearby) {
      const [km, lat, lng] = nearby.split(',').map(Number)
      restored.nearbyKm = km
      restored.userLat = lat
      restored.userLng = lng
    }
    const encadre = searchParams.get('encadre')
    if (encadre) restored.encadre = encadre.split(',') as Filters['encadre']
    const access = searchParams.get('access')
    if (access) restored.accessibility = access.split(',') as Filters['accessibility']
    const confort = searchParams.get('confort')
    if (confort) restored.comfort = confort.split(',') as Filters['comfort']
    const acces = searchParams.get('acces')
    if (acces) restored.access = acces.split(',') as Filters['access']
    const animaux = searchParams.get('animaux')
    if (animaux) restored.animals = true

    if (Object.keys(restored).length > 0) {
      setFilters(f => ({ ...f, ...restored }))
    }
  }, [searchParams])

  const handleLocationChange = (label: string, loc: Location | null) => {
    setLocationLabel(label)
    setLocationFilter(loc)
  }

  const filtered = useMemo(() => {
    let result = [...activities]

    // Text search
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // Location
    if (locationFilter) result = result.filter(locationFilter.filterFn)

    // All filters
    result = applyFilters(result, filters)

    // Sort
    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break
    }

    return result
  }, [query, locationFilter, filters, sortBy])

  const activeCount = countActiveFilters(filters) + (locationFilter ? 1 : 0)

  const clearAll = () => {
    setLocationLabel('')
    setLocationFilter(null)
    setFilters({ ...defaultFilters })
  }

  return (
    <div className="min-h-[100dvh] bg-canvas pt-16">

      {/* Sticky search header */}
      <div className="sticky top-16 z-30 bg-elevated/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-3 sm:py-4">
          {/* Row 1: Search input */}
          <div className="flex items-center gap-2 sm:gap-3 bg-canvas rounded-2xl px-3 sm:px-4 py-2.5 border border-border">
            <Search size={15} className="text-text-muted flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-muted outline-none min-w-0"
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X size={13} className="text-text-muted hover:text-text-primary" />
              </button>
            )}
          </div>

          {/* Row 2: Location search + Autour de moi */}
          <div className="flex items-center gap-2 mt-2">
            <LocationSearch
              value={locationLabel}
              onChange={handleLocationChange}
              compact
              className="flex-1 min-w-0"
            />
            <button
              onClick={handleNearby}
              className={`flex-shrink-0 h-[42px] px-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium text-[13px] ${
                filters.nearbyKm !== null
                  ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                  : 'bg-canvas border-border text-text-primary hover:border-accent/40'
              }`}
            >
              <Navigation size={13} className={locatingNearby ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">{locatingNearby ? 'Localisation…' : filters.nearbyKm !== null ? `≤ ${filters.nearbyKm} km` : 'Autour de moi'}</span>
              <span className="sm:hidden">{locatingNearby ? '…' : filters.nearbyKm !== null ? `${filters.nearbyKm} km` : 'Près de moi'}</span>
            </button>
          </div>

          {/* Filters — always visible */}
          <FilterBar filters={filters} onChange={setFilters} open={true} resultCount={filtered.length} />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-8">

        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
          <h1 className="font-display font-bold text-[16px] sm:text-[18px] text-text-primary">
            {filtered.length} activité{filtered.length > 1 ? 's' : ''}
            {filters.categories.length === 1 && <span className="text-accent ml-1">· {filters.categories[0]}</span>}
            {filters.categories.length > 1 && <span className="text-accent ml-1">· {filters.categories.length} catégories</span>}
            {locationLabel && <span className="text-text-secondary ml-1">· {locationLabel}</span>}
          </h1>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View mode toggle */}
            <div className="flex bg-canvas border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[12px] font-medium transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <LayoutGrid size={14} /> Liste
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[12px] font-medium transition-all duration-200 ${
                  viewMode === 'map' ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Map size={14} /> Carte
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-elevated border border-border rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-[12px] sm:text-[13px] text-text-primary outline-none cursor-pointer"
            >
              <option value="rating">Mieux notées</option>
              <option value="popular">Plus populaires</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Active filter badges */}
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {locationFilter && (
              <Badge variant="subtle">{locationLabel} <button onClick={() => handleLocationChange('', null)} className="ml-1">×</button></Badge>
            )}
            {filters.categories.map(cat => (
              <Badge key={cat} variant="subtle">{cat} <button onClick={() => setFilters(f => ({ ...f, categories: f.categories.filter(c => c !== cat) }))} className="ml-1">×</button></Badge>
            ))}
            {filters.ages.map(age => (
              <Badge key={age} variant="subtle">{age} ans <button onClick={() => setFilters(f => ({ ...f, ages: f.ages.filter(a => a !== age) }))} className="ml-1">×</button></Badge>
            ))}
            {filters.indoor !== null && (
              <Badge variant="subtle">{filters.indoor ? 'Intérieur' : 'Extérieur'} <button onClick={() => setFilters(f => ({ ...f, indoor: null }))} className="ml-1">×</button></Badge>
            )}
            {filters.prices.map(p => (
              <Badge key={p} variant="subtle">{p === 'free' ? 'Gratuit' : p === '<10' ? '< 10 CHF' : p === '10-30' ? '10-30 CHF' : '30+ CHF'} <button onClick={() => setFilters(f => ({ ...f, prices: f.prices.filter(x => x !== p) }))} className="ml-1">×</button></Badge>
            ))}
            {filters.nearbyKm !== null && (
              <Badge variant="subtle">≤ {filters.nearbyKm} km <button onClick={() => setFilters(f => ({ ...f, nearbyKm: null, userLat: null, userLng: null }))} className="ml-1">×</button></Badge>
            )}
            {filters.dateFilter && (
              <Badge variant="subtle">
                {filters.dateFilter === 'today' ? "Aujourd'hui" : filters.dateFilter === 'weekend' ? 'Ce weekend' : filters.dateFilter}
                <button onClick={() => setFilters(f => ({ ...f, dateFilter: null }))} className="ml-1">×</button>
              </Badge>
            )}
            {filters.accessibility.map(a => (
              <Badge key={a} variant="subtle">{a === 'pmr' ? '♿ PMR' : '🍼 Poussette'} <button onClick={() => setFilters(f => ({ ...f, accessibility: f.accessibility.filter(x => x !== a) }))} className="ml-1">×</button></Badge>
            ))}
            {filters.comfort.map(c => (
              <Badge key={c} variant="subtle">{c === 'toilettes' ? '🚻 Toilettes' : '☕ Café'} <button onClick={() => setFilters(f => ({ ...f, comfort: f.comfort.filter(x => x !== c) }))} className="ml-1">×</button></Badge>
            ))}
            {filters.access.map(a => (
              <Badge key={a} variant="subtle">{a === 'parking' ? '🅿️ Parking' : '🚌 Transports'} <button onClick={() => setFilters(f => ({ ...f, access: f.access.filter(x => x !== a) }))} className="ml-1">×</button></Badge>
            ))}
            {filters.animals && (
              <Badge variant="subtle">🐾 Animaux <button onClick={() => setFilters(f => ({ ...f, animals: false }))} className="ml-1">×</button></Badge>
            )}
          </div>
        )}

        {/* Results */}
        {filtered.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
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
            <Button onClick={clearAll} variant="outline">Effacer les filtres</Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
