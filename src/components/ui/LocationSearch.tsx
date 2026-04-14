'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { MapPin, X } from 'lucide-react'
import { locations, type Location } from '@/lib/data'

interface LocationSearchProps {
  value: string
  onChange: (label: string, location: Location | null) => void
  className?: string
  compact?: boolean
}

function getLabel(loc: Location) {
  if (loc.type === 'canton') return loc.locality
  return `${loc.npa} ${loc.locality}`
}

function getTypeLabel(loc: Location, isMainCity: boolean) {
  if (loc.type === 'canton') return 'Canton'
  if (isMainCity) return `Ville - ${loc.canton}`
  return `Commune - ${loc.canton}`
}

export function LocationSearch({ value, onChange, className = '', compact = false }: LocationSearchProps) {
  const [input, setInput] = useState(value)
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { setInput(value) }, [value])

  const suggestions = useMemo(() => {
    if (input.length === 0) return []
    const q = input.toLowerCase().trim()
    const isNumeric = /^\d+/.test(q)

    const matches = locations.filter(l => {
      if (isNumeric) {
        // Only match NPA entries when typing numbers
        return l.type === 'npa' && l.npa.startsWith(q)
      }
      // Text search: match locality name for both NPA and canton entries
      return l.locality.toLowerCase().includes(q)
    })

    // Sort: main cities first, then cantons, then communes, alphabetically
    matches.sort((a, b) => {
      // When searching by text, prioritize: main city > canton > commune
      if (!isNumeric) {
        // Main NPA entries (main cities) first
        if (a.type === 'npa' && a.isMain && !(b.type === 'npa' && b.isMain)) return -1
        if (b.type === 'npa' && b.isMain && !(a.type === 'npa' && a.isMain)) return 1
        // Cantons next
        if (a.type === 'canton' && b.type !== 'canton') return -1
        if (b.type === 'canton' && a.type !== 'canton') return 1
      }
      // Within same NPA, main first
      if (a.npa === b.npa && a.type === 'npa' && b.type === 'npa') {
        if (a.isMain && !b.isMain) return -1
        if (!a.isMain && b.isMain) return 1
        return a.locality.localeCompare(b.locality)
      }
      return a.npa.localeCompare(b.npa)
    })

    return matches.slice(0, 12)
  }, [input])

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const select = (loc: Location) => {
    const label = getLabel(loc)
    setInput(label)
    onChange(label, loc)
    setOpen(false)
    setHighlighted(-1)
  }

  const clear = () => {
    setInput('')
    onChange('', null)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); return }
    if (!open || suggestions.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)) }
    if (e.key === 'Enter' && highlighted >= 0) { e.preventDefault(); select(suggestions[highlighted]) }
  }

  // Determine which localities are "main cities" (have isMain flag for their primary NPA)
  const mainCityNames = useMemo(() => {
    const names = new Set<string>()
    locations.forEach(l => {
      if (l.type === 'npa' && l.isMain) names.add(l.locality)
    })
    return names
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className={`flex items-center gap-2 bg-canvas rounded-2xl border border-border ${compact ? 'px-3 py-2.5' : 'px-4 py-3'}`}>
        <MapPin size={compact ? 14 : 16} className="text-text-muted flex-shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setOpen(true); setHighlighted(-1) }}
          onFocus={() => input.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="NPA, localité, canton…"
          className={`flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none ${compact ? 'text-[13px]' : 'text-[14px]'}`}
        />
        {input && (
          <button onClick={clear} className="flex-shrink-0">
            <X size={13} className="text-text-muted hover:text-text-primary" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-elevated rounded-xl border border-border shadow-card-hover z-50 overflow-hidden max-h-[320px] overflow-y-auto">
          {suggestions.map((loc, idx) => {
            const isMainCity = loc.type === 'npa' && mainCityNames.has(loc.locality)
            const isBold = (loc.type === 'npa' && loc.isMain) || loc.type === 'canton'
            return (
              <button
                key={`${loc.type}-${loc.npa}-${loc.locality}`}
                onClick={() => select(loc)}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-4 transition-colors ${
                  idx === highlighted
                    ? 'bg-accent-subtle text-accent'
                    : 'text-text-primary hover:bg-surface'
                }`}
              >
                <span className={`text-[13px] ${isBold ? 'font-semibold' : ''}`}>
                  {loc.type === 'canton' ? loc.locality : `${loc.npa} ${loc.locality}`}
                </span>
                <span className="text-[12px] text-text-muted whitespace-nowrap">
                  {getTypeLabel(loc, isMainCity)}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
