'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronDown, ChevronRight,
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
  resultCount?: number
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

// ── Filter chip (top-level trigger — desktop) ───────────────────────
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

// ── Mobile accordion row ────────────────────────────────────────────
function AccordionRow({ label, count, isOpen, onToggle, children }: {
  label: string
  count: number
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border/40">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-1"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[15px] font-medium text-text-primary">{label}</span>
          {count > 0 && (
            <span className="min-w-[22px] h-[22px] rounded-full bg-accent/10 text-accent text-[12px] font-semibold flex items-center justify-center px-1.5">
              {count}
            </span>
          )}
        </div>
        <ChevronRight size={16} className={`text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Active filter tag (removable pill in mobile sheet) ──────────────
function ActiveTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-primary border border-border rounded-full px-3 py-1.5">
      {label}
      <button onClick={onRemove} className="text-text-muted hover:text-text-primary">
        <X size={13} />
      </button>
    </span>
  )
}

// ── Main FilterBar ────────────────────────────────────────────────────
type FilterGroupKey = 'category' | 'age' | 'price' | 'quand' | 'encadre' | 'advanced' | 'accessibility' | 'comfort' | 'access' | 'animals'

export function FilterBar({ filters, onChange, open, resultCount }: FilterBarProps) {
  const [openGroup, setOpenGroup] = useState<FilterGroupKey | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<FilterGroupKey | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const set = (partial: Partial<Filters>) => onChange({ ...filters, ...partial })

  const toggleGroup = (key: FilterGroupKey) => setOpenGroup(prev => prev === key ? null : key)
  const toggleMobileSection = (key: FilterGroupKey) => setMobileSection(prev => prev === key ? null : key)

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [mobileOpen])

  const advancedCount = filters.accessibility.length + filters.comfort.length + filters.access.length + (filters.animals ? 1 : 0)

  const hasAnyFilter = filters.categories.length > 0 || filters.ages.length > 0 ||
    filters.indoor !== null || filters.prices.length > 0 ||
    filters.nearbyKm !== null || filters.dateFilter !== null ||
    filters.encadre.length > 0 || advancedCount > 0

  const totalActive = countActiveFilters(filters)

  // Build active filter tags for mobile sheet
  const activeTags: { label: string; onRemove: () => void }[] = []
  filters.categories.forEach(cat => activeTags.push({ label: cat, onRemove: () => set({ categories: filters.categories.filter(c => c !== cat) }) }))
  filters.ages.forEach(age => activeTags.push({ label: age + ' ans', onRemove: () => set({ ages: filters.ages.filter(a => a !== age) }) }))
  filters.prices.forEach(p => {
    const label = p === 'free' ? 'Gratuit' : p === '<10' ? '< 10 CHF' : p === '10-30' ? '10-30 CHF' : '30+ CHF'
    activeTags.push({ label, onRemove: () => set({ prices: filters.prices.filter(x => x !== p) }) })
  })
  if (filters.dateFilter) {
    const label = filters.dateFilter === 'today' ? "Aujourd'hui" : filters.dateFilter === 'weekend' ? 'Ce weekend' : filters.dateFilter
    activeTags.push({ label, onRemove: () => set({ dateFilter: null }) })
  }
  if (filters.nearbyKm !== null) {
    activeTags.push({ label: `≤ ${filters.nearbyKm} km`, onRemove: () => set({ nearbyKm: null, userLat: null, userLng: null }) })
  }
  filters.encadre.forEach(e => {
    const opt = ENCADRE_OPTIONS.find(o => o.value === e)
    activeTags.push({ label: opt?.label || e, onRemove: () => set({ encadre: filters.encadre.filter(x => x !== e) }) })
  })
  filters.accessibility.forEach(a => activeTags.push({ label: a === 'pmr' ? 'PMR' : 'Poussette', onRemove: () => set({ accessibility: filters.accessibility.filter(x => x !== a) }) }))
  filters.comfort.forEach(c => activeTags.push({ label: c === 'toilettes' ? 'Toilettes' : 'Café', onRemove: () => set({ comfort: filters.comfort.filter(x => x !== c) }) }))
  filters.access.forEach(a => activeTags.push({ label: a === 'parking' ? 'Parking' : 'Transports', onRemove: () => set({ access: filters.access.filter(x => x !== a) }) }))
  if (filters.animals) activeTags.push({ label: 'Animaux', onRemove: () => set({ animals: false }) })

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* ═══════════════════════════════════════════════════════════
              MOBILE — Trigger button + Bottom sheet
             ═══════════════════════════════════════════════════════════ */}
          <div className="sm:hidden pt-3 pb-1">
            <button
              onClick={() => setMobileOpen(true)}
              className={`h-10 px-4 rounded-full border transition-all duration-200 flex items-center gap-2 whitespace-nowrap font-medium text-[13px] ${
                totalActive > 0
                  ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                  : 'bg-white/80 backdrop-blur-sm border-border/60 text-text-primary'
              }`}
            >
              <span className="text-[14px]">⚙️</span>
              Filtrer et trier
              {totalActive > 0 && (
                <span className="w-[20px] h-[20px] rounded-full bg-white/25 text-[11px] font-bold flex items-center justify-center">
                  {totalActive}
                </span>
              )}
            </button>
          </div>

          {/* Mobile bottom sheet — rendered via portal to escape sticky container */}
          {mounted && createPortal(
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  className="fixed inset-0 z-[100] sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />

                  {/* Sheet */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl flex flex-col"
                    style={{ maxHeight: '92dvh' }}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                  >
                    {/* Handle */}
                    <div className="flex justify-center pt-3 pb-1">
                      <div className="w-10 h-1 rounded-full bg-border" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 pb-4 pt-1">
                      <h2 className="text-[20px] font-display font-bold text-text-primary">Filtrer et trier</h2>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Active filter tags */}
                    {activeTags.length > 0 && (
                      <div className="px-5 pb-3">
                        <div className="flex flex-wrap gap-2">
                          {activeTags.map((tag, i) => (
                            <ActiveTag key={i} label={tag.label} onRemove={tag.onRemove} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-accent/20 mx-5" />

                    {/* Scrollable accordion sections */}
                    <div className="flex-1 overflow-y-auto px-5 overscroll-contain">

                      <AccordionRow label="Catégorie" count={filters.categories.length} isOpen={mobileSection === 'category'} onToggle={() => toggleMobileSection('category')}>
                        <div className="flex flex-wrap gap-2">
                          {categories.map(c => (
                            <Pill key={c.name} active={filters.categories.includes(c.name)} onClick={() => set({ categories: toggle(filters.categories, c.name) })} color={c.color}>
                              <span className="text-[15px]">{c.icon}</span> {c.name}
                            </Pill>
                          ))}
                        </div>
                      </AccordionRow>

                      <AccordionRow label="Âge" count={filters.ages.length} isOpen={mobileSection === 'age'} onToggle={() => toggleMobileSection('age')}>
                        <div className="flex flex-wrap gap-2">
                          {AGE_OPTIONS.map(({ value, label, emoji }) => (
                            <Pill key={value} active={filters.ages.includes(value)} onClick={() => set({ ages: toggle(filters.ages, value) })}>
                              <span className="text-[15px]">{emoji}</span> {label}
                            </Pill>
                          ))}
                        </div>
                      </AccordionRow>

                      <AccordionRow label="Prix" count={filters.prices.length} isOpen={mobileSection === 'price'} onToggle={() => toggleMobileSection('price')}>
                        <div className="flex flex-wrap gap-2">
                          {PRICE_OPTIONS.map(({ value, label, emoji }) => (
                            <Pill key={value} active={filters.prices.includes(value)} onClick={() => set({ prices: toggle(filters.prices, value) })}>
                              <span className="text-[15px]">{emoji}</span> {label}
                            </Pill>
                          ))}
                        </div>
                      </AccordionRow>

                      <AccordionRow label="Quand" count={filters.dateFilter ? 1 : 0} isOpen={mobileSection === 'quand'} onToggle={() => toggleMobileSection('quand')}>
                        <div className="flex flex-wrap gap-2">
                          <Pill active={filters.dateFilter === 'today'} onClick={() => set({ dateFilter: filters.dateFilter === 'today' ? null : 'today' })}>
                            <span className="text-[15px]">📅</span> Aujourd&apos;hui
                          </Pill>
                          <Pill active={filters.dateFilter === 'weekend'} onClick={() => set({ dateFilter: filters.dateFilter === 'weekend' ? null : 'weekend' })}>
                            <span className="text-[15px]">🌤️</span> Ce weekend
                          </Pill>
                          <label className="text-[12px] px-3 py-2 rounded-full bg-canvas text-text-secondary hover:bg-border/20 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium cursor-pointer relative">
                            <span className="text-[15px]">🗓️</span>
                            {filters.dateFilter && filters.dateFilter !== 'today' && filters.dateFilter !== 'weekend' ? filters.dateFilter : 'Choisir une date'}
                            <input
                              type="date"
                              value={filters.dateFilter && filters.dateFilter !== 'today' && filters.dateFilter !== 'weekend' ? filters.dateFilter : ''}
                              onChange={(e) => set({ dateFilter: e.target.value || null })}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </label>
                        </div>
                      </AccordionRow>

                      <AccordionRow label="Encadrement" count={filters.encadre.length} isOpen={mobileSection === 'encadre'} onToggle={() => toggleMobileSection('encadre')}>
                        <div className="flex flex-wrap gap-2">
                          {ENCADRE_OPTIONS.map(({ value, label, emoji }) => (
                            <Pill key={value} active={filters.encadre.includes(value)} onClick={() => set({ encadre: toggle(filters.encadre, value) })}>
                              <span className="text-[15px]">{emoji}</span> {label}
                            </Pill>
                          ))}
                        </div>
                      </AccordionRow>

                      <AccordionRow label="Accessibilité" count={filters.accessibility.length} isOpen={mobileSection === 'accessibility'} onToggle={() => toggleMobileSection('accessibility')}>
                        <div className="flex flex-wrap gap-2">
                          <Pill active={filters.accessibility.includes('pmr')} onClick={() => set({ accessibility: toggle(filters.accessibility, 'pmr' as AccessibilityOption) })}>
                            ♿ PMR
                          </Pill>
                          <Pill active={filters.accessibility.includes('poussette')} onClick={() => set({ accessibility: toggle(filters.accessibility, 'poussette' as AccessibilityOption) })}>
                            🍼 Poussette
                          </Pill>
                        </div>
                      </AccordionRow>

                      <AccordionRow label="Confort" count={filters.comfort.length} isOpen={mobileSection === 'comfort'} onToggle={() => toggleMobileSection('comfort')}>
                        <div className="flex flex-wrap gap-2">
                          <Pill active={filters.comfort.includes('toilettes')} onClick={() => set({ comfort: toggle(filters.comfort, 'toilettes' as ComfortOption) })}>
                            🚻 Toilettes
                          </Pill>
                          <Pill active={filters.comfort.includes('cafe')} onClick={() => set({ comfort: toggle(filters.comfort, 'cafe' as ComfortOption) })}>
                            ☕ Café sur place
                          </Pill>
                        </div>
                      </AccordionRow>

                      <AccordionRow label="Accès" count={filters.access.length} isOpen={mobileSection === 'access'} onToggle={() => toggleMobileSection('access')}>
                        <div className="flex flex-wrap gap-2">
                          <Pill active={filters.access.includes('parking')} onClick={() => set({ access: toggle(filters.access, 'parking' as AccessOption) })}>
                            🅿️ Parking
                          </Pill>
                          <Pill active={filters.access.includes('transports')} onClick={() => set({ access: toggle(filters.access, 'transports' as AccessOption) })}>
                            🚌 Transports publics
                          </Pill>
                        </div>
                      </AccordionRow>

                      <AccordionRow label="Animaux" count={filters.animals ? 1 : 0} isOpen={mobileSection === 'animals'} onToggle={() => toggleMobileSection('animals')}>
                        <div className="flex flex-wrap gap-2">
                          <Pill active={filters.animals} onClick={() => set({ animals: !filters.animals })}>
                            🐾 Animaux autorisés
                          </Pill>
                        </div>
                      </AccordionRow>

                      {/* Bottom spacer for sticky bar */}
                      <div className="h-4" />
                    </div>

                    {/* Sticky bottom bar */}
                    <div className="border-t border-border px-5 py-4 flex gap-3 bg-white">
                      <button
                        onClick={() => { onChange({ ...defaultFilters }); setMobileOpen(false) }}
                        className="flex-1 h-12 rounded-full border border-border text-[15px] font-semibold text-text-primary hover:bg-canvas transition-colors"
                      >
                        Supprimer
                      </button>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 h-12 rounded-full bg-text-primary text-white text-[15px] font-semibold hover:bg-text-primary/90 transition-colors"
                      >
                        Voir{resultCount !== undefined ? ` (${resultCount})` : ''}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}

          {/* ═══════════════════════════════════════════════════════════
              DESKTOP — Horizontal chip layout (unchanged)
             ═══════════════════════════════════════════════════════════ */}
          <div className="hidden sm:block pt-3 sm:pt-4 pb-2 space-y-3">

            {/* Level 1 — Filter chips */}
            <div className="flex flex-wrap gap-2 items-center">
              <FilterChip icon={<span className="text-[14px]">🏷️</span>} label="Catégorie" activeCount={filters.categories.length} isOpen={openGroup === 'category'} onToggle={() => toggleGroup('category')} />
              <FilterChip icon={<span className="text-[14px]">👶</span>} label="Âge" activeCount={filters.ages.length} isOpen={openGroup === 'age'} onToggle={() => toggleGroup('age')} />
              <FilterChip icon={<span className="text-[14px]">💰</span>} label="Prix" activeCount={filters.prices.length} isOpen={openGroup === 'price'} onToggle={() => toggleGroup('price')} />
              <FilterChip icon={<span className="text-[14px]">📅</span>} label="Quand" activeCount={filters.dateFilter ? 1 : 0} isOpen={openGroup === 'quand'} onToggle={() => toggleGroup('quand')} />

              <FilterChip icon={<span className="text-[14px]">🛡️</span>} label="Encadré" activeCount={filters.encadre.length} isOpen={openGroup === 'encadre'} onToggle={() => toggleGroup('encadre')} />

              {/* Advanced toggle */}
              <button
                onClick={() => toggleGroup('advanced')}
                className={`text-[12px] sm:text-[13px] h-9 sm:h-10 px-3.5 sm:px-4 rounded-full border transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap font-medium ${
                  openGroup === 'advanced' || advancedCount > 0
                    ? 'bg-text-primary text-white border-text-primary shadow-md'
                    : 'bg-white/80 backdrop-blur-sm border-border/60 text-text-primary hover:border-accent/40 hover:bg-white'
                }`}
              >
                <span className="text-[14px]">⚙️</span>
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
