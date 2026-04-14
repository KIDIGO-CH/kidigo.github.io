'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { categories } from '@/lib/data'
import type { Category } from '@/lib/types'

// ── Types ────────────────────────────────────────────────────────────
export type AgeOption = '0-3' | '4-6' | '7-10' | '11-14'
export type PriceOption = 'free' | '<10' | '10-30' | '30+'
export type DateOption = 'today' | 'weekend' | string
export type AccessibilityOption = 'pmr' | 'poussette'
export type ComfortOption = 'toilettes' | 'cafe'
export type AccessOption = 'parking' | 'transports'
export type EncadreOption = 'activite-encadree' | 'garde-ponctuelle' | 'atelier-animateur'

export type Filters = {
  categories: Category[]
  ages: AgeOption[]
  indoor: boolean | null
  prices: PriceOption[]
  dateFilter: DateOption | null
  nearbyKm: number | null
  userLat: number | null
  userLng: number | null
  accessibility: AccessibilityOption[]
  comfort: ComfortOption[]
  access: AccessOption[]
  animals: boolean
  encadre: EncadreOption[]
}

export const defaultFilters: Filters = {
  categories: [],
  ages: [],
  indoor: null,
  prices: [],
  dateFilter: null,
  nearbyKm: null,
  userLat: null,
  userLng: null,
  accessibility: [],
  comfort: [],
  access: [],
  animals: false,
  encadre: [],
}

const AGE_OPTIONS: { value: AgeOption; label: string }[] = [
  { value: '0-3', label: '0-3 ans' },
  { value: '4-6', label: '4-6 ans' },
  { value: '7-10', label: '7-10 ans' },
  { value: '11-14', label: '11-14 ans' },
]

const PRICE_OPTIONS: { value: PriceOption; label: string }[] = [
  { value: 'free', label: 'Gratuit' },
  { value: '<10', label: '< 10 CHF' },
  { value: '10-30', label: '10-30 CHF' },
  { value: '30+', label: '30+ CHF' },
]

interface FilterBarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  open: boolean
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]
}

// ── Pill ──────────────────────────────────────────────────────────────
function Pill({ active, onClick, children, color }: { active: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] sm:text-[12px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
        active
          ? 'text-white border-transparent'
          : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
      }`}
      style={active ? { backgroundColor: color || '#FF6B52', borderColor: color || '#FF6B52' } : undefined}
    >
      {children}
    </button>
  )
}

// ── Inline expandable filter group button ─────────────────────────────
function FilterGroup({ label, activeCount, isOpen, onToggle }: {
  label: string
  activeCount: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={`text-[12px] px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
        isOpen || activeCount > 0
          ? 'bg-accent text-white border-accent'
          : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
      }`}
    >
      {label}
      {activeCount > 0 && (
        <span className="w-4 h-4 rounded-full bg-white/25 text-[10px] font-bold flex items-center justify-center">
          {activeCount}
        </span>
      )}
      <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  )
}

// ── Main FilterBar ────────────────────────────────────────────────────
type FilterGroupKey = 'category' | 'age' | 'price' | 'quand' | 'encadre' | 'advanced'

export function FilterBar({ filters, onChange, open }: FilterBarProps) {
  const [locatingNearby, setLocatingNearby] = useState(false)
  const [openGroup, setOpenGroup] = useState<FilterGroupKey | null>(null)

  const set = (partial: Partial<Filters>) => onChange({ ...filters, ...partial })

  const toggleGroup = (key: FilterGroupKey) => setOpenGroup(prev => prev === key ? null : key)

  const handleNearby = () => {
    if (filters.nearbyKm !== null) {
      set({ nearbyKm: null, userLat: null, userLng: null })
      return
    }
    setLocatingNearby(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set({ nearbyKm: 20, userLat: pos.coords.latitude, userLng: pos.coords.longitude })
        setLocatingNearby(false)
      },
      () => setLocatingNearby(false),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const advancedCount = filters.accessibility.length + filters.comfort.length + filters.access.length + (filters.animals ? 1 : 0)

  const hasAnyFilter = filters.categories.length > 0 || filters.ages.length > 0 ||
    filters.indoor !== null || filters.prices.length > 0 ||
    filters.nearbyKm !== null || filters.dateFilter !== null ||
    filters.encadre.length > 0 || advancedCount > 0

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-3 sm:pt-4 pb-2 space-y-2.5 sm:space-y-3">

            {/* Level 1 — Visible filters */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
              <FilterGroup label="Catégorie" activeCount={filters.categories.length} isOpen={openGroup === 'category'} onToggle={() => toggleGroup('category')} />
              <FilterGroup label="Âge" activeCount={filters.ages.length} isOpen={openGroup === 'age'} onToggle={() => toggleGroup('age')} />
              <FilterGroup label="Prix" activeCount={filters.prices.length} isOpen={openGroup === 'price'} onToggle={() => toggleGroup('price')} />
              <FilterGroup label="Quand" activeCount={filters.dateFilter ? 1 : 0} isOpen={openGroup === 'quand'} onToggle={() => toggleGroup('quand')} />

              {/* Autour de moi */}
              <Pill active={filters.nearbyKm !== null} onClick={handleNearby}>
                <MapPin size={12} />
                {locatingNearby ? 'Localisation…' : filters.nearbyKm !== null ? `≤ ${filters.nearbyKm} km` : 'Autour de moi'}
              </Pill>

              {/* Encadré */}
              <FilterGroup label="Encadré" activeCount={filters.encadre.length} isOpen={openGroup === 'encadre'} onToggle={() => toggleGroup('encadre')} />

              {/* Advanced toggle */}
              <button
                onClick={() => toggleGroup('advanced')}
                className={`text-[12px] px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  openGroup === 'advanced' || advancedCount > 0
                    ? 'bg-text-primary text-white border-text-primary'
                    : 'bg-canvas border-border text-text-secondary hover:border-accent/30'
                }`}
              >
                <SlidersHorizontal size={12} />
                + Filtres
                {advancedCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white/25 text-[10px] font-bold flex items-center justify-center">
                    {advancedCount}
                  </span>
                )}
              </button>

              {/* Clear all */}
              {hasAnyFilter && (
                <button
                  onClick={() => onChange({ ...defaultFilters })}
                  className="text-[12px] text-red-500 hover:text-red-600 flex items-center gap-1 ml-1"
                >
                  <X size={12} /> Effacer
                </button>
              )}
            </div>

            {/* Expanded filter options (inline) */}
            {openGroup && openGroup !== 'advanced' && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-elevated rounded-2xl border border-border p-2.5 sm:p-3">
                {openGroup === 'category' && categories.map(c => (
                  <Pill
                    key={c.name}
                    active={filters.categories.includes(c.name)}
                    onClick={() => set({ categories: toggle(filters.categories, c.name) })}
                    color={c.color}
                  >
                    <span>{c.icon}</span> {c.name}
                  </Pill>
                ))}

                {openGroup === 'age' && AGE_OPTIONS.map(({ value, label }) => (
                  <Pill key={value} active={filters.ages.includes(value)} onClick={() => set({ ages: toggle(filters.ages, value) })}>
                    {label}
                  </Pill>
                ))}

                {openGroup === 'price' && PRICE_OPTIONS.map(({ value, label }) => (
                  <Pill key={value} active={filters.prices.includes(value)} onClick={() => set({ prices: toggle(filters.prices, value) })}>
                    {label}
                  </Pill>
                ))}

                {openGroup === 'quand' && (
                  <>
                    <Pill
                      active={filters.dateFilter === 'today'}
                      onClick={() => set({ dateFilter: filters.dateFilter === 'today' ? null : 'today' })}
                    >
                      <Calendar size={12} /> Aujourd&apos;hui
                    </Pill>
                    <Pill
                      active={filters.dateFilter === 'weekend'}
                      onClick={() => set({ dateFilter: filters.dateFilter === 'weekend' ? null : 'weekend' })}
                    >
                      <Calendar size={12} /> Ce weekend
                    </Pill>
                    <input
                      type="date"
                      value={filters.dateFilter && filters.dateFilter !== 'today' && filters.dateFilter !== 'weekend' ? filters.dateFilter : ''}
                      onChange={(e) => set({ dateFilter: e.target.value || null })}
                      className="text-[12px] px-3 py-1.5 rounded-full border bg-canvas border-border text-text-secondary outline-none cursor-pointer"
                    />
                  </>
                )}

                {openGroup === 'encadre' && [
                  { value: 'activite-encadree' as EncadreOption, label: 'Activité encadrée' },
                  { value: 'garde-ponctuelle' as EncadreOption, label: 'Garde ponctuelle' },
                  { value: 'atelier-animateur' as EncadreOption, label: 'Atelier avec animateur' },
                ].map(({ value, label }) => (
                  <Pill key={value} active={filters.encadre.includes(value)} onClick={() => set({ encadre: toggle(filters.encadre, value) })}>
                    {label}
                  </Pill>
                ))}
              </div>
            )}

            {/* Level 2 — Advanced filters */}
            {openGroup === 'advanced' && (
              <div className="bg-elevated rounded-2xl border border-border p-3 sm:p-4 space-y-3">
                {/* Accessibilité */}
                <div>
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.1em] mb-2">Accessibilité</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Pill active={filters.accessibility.includes('pmr')} onClick={() => set({ accessibility: toggle(filters.accessibility, 'pmr' as AccessibilityOption) })}>
                      ♿ PMR
                    </Pill>
                    <Pill active={filters.accessibility.includes('poussette')} onClick={() => set({ accessibility: toggle(filters.accessibility, 'poussette' as AccessibilityOption) })}>
                      🍼 Poussette
                    </Pill>
                  </div>
                </div>

                {/* Confort */}
                <div>
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.1em] mb-2">Confort</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Pill active={filters.comfort.includes('toilettes')} onClick={() => set({ comfort: toggle(filters.comfort, 'toilettes' as ComfortOption) })}>
                      🚻 Toilettes
                    </Pill>
                    <Pill active={filters.comfort.includes('cafe')} onClick={() => set({ comfort: toggle(filters.comfort, 'cafe' as ComfortOption) })}>
                      ☕ Café
                    </Pill>
                  </div>
                </div>

                {/* Accès */}
                <div>
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.1em] mb-2">Accès</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Pill active={filters.access.includes('parking')} onClick={() => set({ access: toggle(filters.access, 'parking' as AccessOption) })}>
                      🅿️ Parking
                    </Pill>
                    <Pill active={filters.access.includes('transports')} onClick={() => set({ access: toggle(filters.access, 'transports' as AccessOption) })}>
                      🚌 Transports publics
                    </Pill>
                  </div>
                </div>

                {/* Animaux */}
                <div>
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.1em] mb-2">Animaux</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Pill active={filters.animals} onClick={() => set({ animals: !filters.animals })}>
                      🐾 Animaux autorisés
                    </Pill>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Filter logic ──────────────────────────────────────────────────────
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function isToday(dateStr: string): boolean {
  const today = new Date()
  const d = new Date(dateStr)
  return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()
}

function isThisWeekend(dateStr: string): boolean {
  const now = new Date()
  const day = now.getDay()
  const sat = new Date(now)
  sat.setDate(now.getDate() + (6 - day))
  sat.setHours(0, 0, 0, 0)
  const sun = new Date(sat)
  sun.setDate(sat.getDate() + 1)
  sun.setHours(23, 59, 59, 999)
  const d = new Date(dateStr)
  return d >= sat && d <= sun
}

function matchesAge(ageMin: number, ageMax: number, ages: AgeOption[]): boolean {
  if (ages.length === 0) return true
  return ages.some(range => {
    const [lo, hi] = range.split('-').map(Number)
    return ageMin <= hi && ageMax >= lo
  })
}

function matchesPrice(price: number, prices: PriceOption[]): boolean {
  if (prices.length === 0) return true
  return prices.some(p => {
    if (p === 'free') return price === 0
    if (p === '<10') return price > 0 && price < 10
    if (p === '10-30') return price >= 10 && price <= 30
    if (p === '30+') return price > 30
    return false
  })
}

export function applyFilters(
  activities: import('@/lib/types').Activity[],
  filters: Filters
): import('@/lib/types').Activity[] {
  let result = [...activities]

  if (filters.categories.length > 0)
    result = result.filter(a => filters.categories.includes(a.category))
  if (filters.ages.length > 0)
    result = result.filter(a => matchesAge(a.ageMin, a.ageMax, filters.ages))
  if (filters.indoor !== null)
    result = result.filter(a => a.isIndoor === filters.indoor)
  if (filters.prices.length > 0)
    result = result.filter(a => matchesPrice(a.price, filters.prices))
  if (filters.nearbyKm !== null && filters.userLat !== null && filters.userLng !== null) {
    const { nearbyKm, userLat, userLng } = filters
    result = result.filter(a => haversineKm(userLat, userLng, a.lat, a.lng) <= nearbyKm)
  }
  if (filters.dateFilter) {
    if (filters.dateFilter === 'today')
      result = result.filter(a => isToday(a.nextDate))
    else if (filters.dateFilter === 'weekend')
      result = result.filter(a => isThisWeekend(a.nextDate))
    else
      result = result.filter(a => a.nextDate === filters.dateFilter)
  }

  return result
}

export function countActiveFilters(filters: Filters): number {
  return [
    filters.categories.length > 0,
    filters.ages.length > 0,
    filters.indoor !== null,
    filters.prices.length > 0,
    filters.nearbyKm !== null,
    filters.dateFilter !== null,
    filters.accessibility.length > 0,
    filters.comfort.length > 0,
    filters.access.length > 0,
    filters.animals,
    filters.encadre.length > 0,
  ].filter(Boolean).length
}
