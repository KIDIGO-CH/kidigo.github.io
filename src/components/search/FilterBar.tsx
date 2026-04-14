'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, ChevronDown } from 'lucide-react'
import { categories } from '@/lib/data'
import type { Category, EffortLevel } from '@/lib/types'

// ── Types ────────────────────────────────────────────────────────────
export type AgeOption = '0-3' | '4-6' | '7-10' | '11-14'
export type PriceOption = 'free' | '<10' | '10-30' | '30+'
export type DateOption = 'today' | 'weekend' | string

export type Filters = {
  categories: Category[]
  ages: AgeOption[]
  indoor: boolean | null
  prices: PriceOption[]
  efforts: EffortLevel[]
  dateFilter: DateOption | null
  nearbyKm: number | null
  userLat: number | null
  userLng: number | null
}

export const defaultFilters: Filters = {
  categories: [],
  ages: [],
  indoor: null,
  prices: [],
  efforts: [],
  dateFilter: null,
  nearbyKm: null,
  userLat: null,
  userLng: null,
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

const EFFORT_OPTIONS: { value: EffortLevel; label: string; icon: string }[] = [
  { value: 'chill', label: 'Chill', icon: '😌' },
  { value: 'actif', label: 'Actif', icon: '🚶' },
  { value: 'sportif', label: 'Sportif', icon: '🏃' },
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
      className={`text-[12px] px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
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
type FilterGroupKey = 'age' | 'price' | 'lieu' | 'effort' | 'quand'

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

  const hasAnyFilter = filters.categories.length > 0 || filters.ages.length > 0 ||
    filters.indoor !== null || filters.prices.length > 0 || filters.efforts.length > 0 ||
    filters.nearbyKm !== null || filters.dateFilter !== null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-4 pb-2 space-y-3">

            {/* Row 1 — Categories (always visible) */}
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <Pill
                  key={c.name}
                  active={filters.categories.includes(c.name)}
                  onClick={() => set({ categories: toggle(filters.categories, c.name) })}
                  color={c.color}
                >
                  <span>{c.icon}</span> {c.name}
                </Pill>
              ))}
            </div>

            {/* Row 2 — Filter group buttons */}
            <div className="flex flex-wrap gap-2 items-center">
              <FilterGroup label="Âge" activeCount={filters.ages.length} isOpen={openGroup === 'age'} onToggle={() => toggleGroup('age')} />
              <FilterGroup label="Prix" activeCount={filters.prices.length} isOpen={openGroup === 'price'} onToggle={() => toggleGroup('price')} />
              <FilterGroup label="Lieu" activeCount={filters.indoor !== null ? 1 : 0} isOpen={openGroup === 'lieu'} onToggle={() => toggleGroup('lieu')} />
              <FilterGroup label="Effort" activeCount={filters.efforts.length} isOpen={openGroup === 'effort'} onToggle={() => toggleGroup('effort')} />
              <FilterGroup label="Quand" activeCount={filters.dateFilter ? 1 : 0} isOpen={openGroup === 'quand'} onToggle={() => toggleGroup('quand')} />

              {/* Autour de moi (standalone pill) */}
              <Pill active={filters.nearbyKm !== null} onClick={handleNearby}>
                <MapPin size={12} />
                {locatingNearby ? 'Localisation…' : filters.nearbyKm !== null ? `≤ ${filters.nearbyKm} km` : 'Autour de moi'}
              </Pill>

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

            {/* Row 3 — Expanded filter options (inline) */}
            {openGroup && (
              <div className="flex flex-wrap gap-2 bg-elevated rounded-2xl border border-border p-3">
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

                {openGroup === 'lieu' && [
                  { v: null as boolean | null, l: 'Tous' },
                  { v: true, l: 'Intérieur' },
                  { v: false, l: 'Extérieur' },
                ].map(({ v, l }) => (
                  <Pill key={l} active={filters.indoor === v} onClick={() => set({ indoor: v })}>
                    {l}
                  </Pill>
                ))}

                {openGroup === 'effort' && EFFORT_OPTIONS.map(({ value, label, icon }) => (
                  <Pill key={value} active={filters.efforts.includes(value)} onClick={() => set({ efforts: toggle(filters.efforts, value) })}>
                    {icon} {label}
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
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Filter logic (unchanged) ──────────────────────────────────────────
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
  if (filters.efforts.length > 0)
    result = result.filter(a => filters.efforts.includes(a.effortLevel))
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
    filters.efforts.length > 0,
    filters.nearbyKm !== null,
    filters.dateFilter !== null,
  ].filter(Boolean).length
}
