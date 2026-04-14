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
  return `${loc.npa} ${loc.locality}`
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
        return l.npa.startsWith(q)
      }
      return l.locality.toLowerCase().includes(q)
    })

    // Sort: main localities first, then alphabetically by locality
    matches.sort((a, b) => {
      if (a.npa === b.npa) {
        if (a.isMain && !b.isMain) return -1
        if (!a.isMain && b.isMain) return 1
        return a.locality.localeCompare(b.locality)
      }
      return a.npa.localeCompare(b.npa)
    })

    return matches.slice(0, 10)
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
          placeholder="NPA, localité…"
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
          {suggestions.map((loc, idx) => (
            <button
              key={`${loc.npa}-${loc.locality}`}
              onClick={() => select(loc)}
              className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-4 transition-colors ${
                idx === highlighted
                  ? 'bg-accent-subtle text-accent'
                  : 'text-text-primary hover:bg-surface'
              }`}
            >
              <span className={`text-[13px] ${loc.isMain ? 'font-semibold' : ''}`}>
                {loc.npa} {loc.locality}
              </span>
              <span className="text-[12px] text-text-muted whitespace-nowrap">
                Ville - {loc.canton}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
