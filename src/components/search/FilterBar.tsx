'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, MapPin, ChevronDown, SlidersHorizontal,
  LayoutGrid, Baby, Coins, Clock, ShieldCheck,
  Accessibility, Sofa, Car, PawPrint,
} from 'lucide-react'
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

const AGE_OPTIONS: { value: AgeOption; label: string; emoji: string }[] = [
  { value: '0-3', label: '0 – 3 ans', emoji: '👶' },
  { value: '4-6', label: '4 – 6 ans', emoji: '🧒' },
  { value: '7-10', label: '7 – 10 ans', emoji: '👦' },
  { value: '11-14', label: '11 – 14 ans', emoji: '🧑' },
]

const PRICE_OPTIONS: { value: PriceOption; label: string; emoji: string }[] = [
  { value: 'free', label: 'Gratuit', emoji: '🎁' },
  { value: '<10', label: '< 10 CHF', emoji: '🪙' },
  { value: '10-30', label: '10 – 30 CHF', emoji: '💰' },
  { value: '30+', label: '30+ CHF', emoji: '💎' },
]

const ENCADRE_OPTIONS: { value: EncadreOption; label: string; emoji: string }[] = [
  { value: 'activite-encadree', label: 'Activité encadrée', emoji: '👩‍🏫' },
  { value: 'garde-ponctuelle', label: 'Garde ponctuelle', emoji: '🤱' },
  { value: 'atelier-animateur', label: 'Atelier avec animateur', emoji: '🎨' },
]

interface FilterBarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  open: boolean
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]
}

// ── Option Pill (inside expanded panels) ─────────────────────────────
function Pill({ active, onClick, children, color }: { active: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
  const c = color || '#FF6B52'
  return (
    <button
      onClick={onClick}
      className={`text-[12px] sm:text-[13px] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium ${
        active
          ? 'shadow-sm'
          : 'bg-canvas text-text-secondary hover:bg-border/20'
      }`}
      style={active ? { backgroundColor: `${c}15`, color: c } : undefined}
    >
      {children}
    </button>
  )
}

// ── Filter chip (top-level trigger) ──────────────────────────────────
function FilterChip({ label, icon, activeCount, isOpen, onToggle }: {
  label: string
  icon: React.ReactNode
  activeCount: number
  isOpen: boolean
  onToggle: () => void
}) {
  const isActive = isOpen || activeCount > 0
  return (
    <button
      onClick={onToggle}
      className={`text-[12px] sm:text-[13px] h-9 sm:h-10 px-3.5 sm:px-4 rounded-full border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium ${
        isActive
          ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
          : 'bg-white/80 backdrop-blur-sm border-border/60 text-text-primary hover:border-accent/40 hover:bg-white'
      }`}
    >
      {icon}
      {label}
      {activeCount > 0 && !isOpen && (
        <span className="w-[18px] h-[18px] rounded-full bg-white/30 text-[10px] font-bold flex items-center justify-center">
          {activeCount}
        </span>
      )}
      <ChevronDown size={11} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isActive ? 'opacity-80' : 'opacity-40'}`} />
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
          <div className="pt-3 sm:pt-4 pb-2 space-y-3">

            {/* Level 1 — Filter chips */}
            <div className="flex flex-wrap gap-2 items-center">
              <FilterChip icon={<LayoutGrid size={13} />} label="Catégorie" activeCount={filters.categories.length} isOpen={openGroup === 'category'} onToggle={() => toggleGroup('category')} />
              <FilterChip icon={<Baby size={13} />} label="Âge" activeCount={filters.ages.length} isOpen={openGroup === 'age'} onToggle={() => toggleGroup('age')} />
              <FilterChip icon={<Coins size={13} />} label="Prix" activeCount={filters.prices.length} isOpen={openGroup === 'price'} onToggle={() => toggleGroup('price')} />
              <FilterChip icon={<Clock size={13} />} label="Quand" activeCount={filters.dateFilter ? 1 : 0} isOpen={openGroup === 'quand'} onToggle={() => toggleGroup('quand')} />

              {/* Autour de moi */}
              <button
                onClick={handleNearby}
                className={`text-[12px] sm:text-[13px] h-9 sm:h-10 px-3.5 sm:px-4 rounded-full border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium ${
                  filters.nearbyKm !== null
                    ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                    : 'bg-white/80 backdrop-blur-sm border-border/60 text-text-primary hover:border-accent/40 hover:bg-white'
                }`}
              >
                <MapPin size={13} />
                {locatingNearby ? 'Localisation…' : filters.nearbyKm !== null ? `≤ ${filters.nearbyKm} km` : 'Autour de moi'}
              </button>

              <FilterChip icon={<ShieldCheck size={13} />} label="Encadré" activeCount={filters.encadre.length} isOpen={openGroup === 'encadre'} onToggle={() => toggleGroup('encadre')} />

              {/* Separator */}
              <div className="w-px h-5 bg-border/50 mx-0.5 hidden sm:block" />

              {/* Advanced toggle */}
              <button
                onClick={() => toggleGroup('advanced')}
                className={`text-[12px] sm:text-[13px] h-9 sm:h-10 px-3.5 sm:px-4 rounded-full border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium ${
                  openGroup === 'advanced' || advancedCount > 0
                    ? 'bg-text-primary text-white border-text-primary shadow-md'
                    : 'bg-white/80 backdrop-blur-sm border-border/60 text-text-primary hover:border-accent/40 hover:bg-white'
                }`}
              >
                <SlidersHorizontal size={13} />
                + Filtres
                {advancedCount > 0 && (
                  <span className="w-[18px] h-[18px] rounded-full bg-white/25 text-[10px] font-bold flex items-center justify-center">
                    {advancedCount}
                  </span>
                )}
              </button>

              {/* Clear all */}
              {hasAnyFilter && (
                <button
                  onClick={() => onChange({ ...defaultFilters })}
                  className="text-[12px] text-text-muted hover:text-red-500 flex items-center gap-1 ml-0.5 transition-colors"
                >
                  <X size={13} /> Effacer
                </button>
              )}
            </div>

            {/* Expanded filter options */}
            <AnimatePresence mode="wait">
              {openGroup && openGroup !== 'advanced' && (
                <motion.div
                  key={openGroup}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  <div className="flex flex-wrap gap-2 bg-white rounded-2xl border border-border/40 p-3 sm:p-4 shadow-lg shadow-black/[0.04]">
                    {openGroup === 'category' && categories.map(c => (
                      <Pill
                        key={c.name}
                        active={filters.categories.includes(c.name)}
                        onClick={() => set({ categories: toggle(filters.categories, c.name) })}
                        color={c.color}
                      >
                        <span className="text-[15px]">{c.icon}</span> {c.name}
                      </Pill>
                    ))}

                    {openGroup === 'age' && AGE_OPTIONS.map(({ value, label, emoji }) => (
                      <Pill key={value} active={filters.ages.includes(value)} onClick={() => set({ ages: toggle(filters.ages, value) })}>
                        <span className="text-[15px]">{emoji}</span> {label}
                      </Pill>
                    ))}

                    {openGroup === 'price' && PRICE_OPTIONS.map(({ value, label, emoji }) => (
                      <Pill key={value} active={filters.prices.includes(value)} onClick={() => set({ prices: toggle(filters.prices, value) })}>
                        <span className="text-[15px]">{emoji}</span> {label}
                      </Pill>
                    ))}

                    {openGroup === 'quand' && (
                      <>
                        <Pill
                          active={filters.dateFilter === 'today'}
                          onClick={() => set({ dateFilter: filters.dateFilter === 'today' ? null : 'today' })}
                        >
                          <span className="text-[15px]">📅</span> Aujourd&apos;hui
                        </Pill>
                        <Pill
                          active={filters.dateFilter === 'weekend'}
                          onClick={() => set({ dateFilter: filters.dateFilter === 'weekend' ? null : 'weekend' })}
                        >
                          <span className="text-[15px]">🌤️</span> Ce weekend
                        </Pill>
                        <label className="text-[12px] sm:text-[13px] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-canvas text-text-secondary hover:bg-border/20 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium cursor-pointer relative">
                          <span className="text-[15px]">🗓️</span>
                          {filters.dateFilter && filters.dateFilter !== 'today' && filters.dateFilter !== 'weekend' ? filters.dateFilter : 'Choisir une date'}
                          <input
                            type="date"
                            value={filters.dateFilter && filters.dateFilter !== 'today' && filters.dateFilter !== 'weekend' ? filters.dateFilter : ''}
                            onChange={(e) => set({ dateFilter: e.target.value || null })}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </label>
                      </>
                    )}

                    {openGroup === 'encadre' && ENCADRE_OPTIONS.map(({ value, label, emoji }) => (
                      <Pill key={value} active={filters.encadre.includes(value)} onClick={() => set({ encadre: toggle(filters.encadre, value) })}>
                        <span className="text-[15px]">{emoji}</span> {label}
                      </Pill>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Level 2 — Advanced filters */}
              {openGroup === 'advanced' && (
                <motion.div
                  key="advanced"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  <div className="bg-white rounded-2xl border border-border/40 p-4 sm:p-5 shadow-lg shadow-black/[0.04]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Accessibilité */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Accessibility size={13} className="text-accent" />
                          </div>
                          <p className="text-[13px] font-semibold text-text-primary">Accessibilité</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
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
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Sofa size={13} className="text-accent" />
                          </div>
                          <p className="text-[13px] font-semibold text-text-primary">Confort</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Pill active={filters.comfort.includes('toilettes')} onClick={() => set({ comfort: toggle(filters.comfort, 'toilettes' as ComfortOption) })}>
                            🚻 Toilettes
                          </Pill>
                          <Pill active={filters.comfort.includes('cafe')} onClick={() => set({ comfort: toggle(filters.comfort, 'cafe' as ComfortOption) })}>
                            ☕ Café sur place
                          </Pill>
                        </div>
                      </div>

                      {/* Accès */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Car size={13} className="text-accent" />
                          </div>
                          <p className="text-[13px] font-semibold text-text-primary">Accès</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
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
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                            <PawPrint size={13} className="text-accent" />
                          </div>
                          <p className="text-[13px] font-semibold text-text-primary">Animaux</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Pill active={filters.animals} onClick={() => set({ animals: !filters.animals })}>
                            🐾 Animaux autorisés
                          </Pill>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
