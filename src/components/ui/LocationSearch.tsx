'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, X } from 'lucide-react'
import { locations, type Location } from '@/lib/data'

interface LocationSearchProps {
  value: string
  onChange: (label: string, location: Location | null) => void
  className?: string
  compact?: boolean
}

const TYPE_LABELS: Record<Location['type'], string> = {
  ville: 'Ville',
  npa: 'NPA',
  canton: 'Canton',
}

export function LocationSearch({ value, onChange, className = '', compact = false }: LocationSearchProps) {
  const [input, setInput] = useState(value)
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { setInput(value) }, [value])

  const suggestions = input.length > 0
    ? locations.filter(l => l.label.toLowerCase().includes(input.toLowerCase())).slice(0, 8)
    : []

  const grouped = suggestions.reduce<Record<string, Location[]>>((acc, loc) => {
    (acc[loc.type] ??= []).push(loc)
    return acc
  }, {})

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const select = (loc: Location) => {
    setInput(loc.label)
    onChange(loc.label, loc)
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
          placeholder="Où ? (ville, NPA, canton)"
          className={`flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none ${compact ? 'text-[13px]' : 'text-[14px]'}`}
        />
        {input && (
          <button onClick={clear} className="flex-shrink-0">
            <X size={13} className="text-text-muted hover:text-text-primary" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-elevated rounded-xl border border-border shadow-card-hover z-50 overflow-hidden">
          {(['ville', 'npa', 'canton'] as const).map(type => {
            const items = grouped[type]
            if (!items?.length) return null
            return (
              <div key={type}>
                <div className="px-3 pt-2.5 pb-1">
                  <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{TYPE_LABELS[type]}</span>
                </div>
                {items.map((loc) => {
                  const idx = suggestions.indexOf(loc)
                  return (
                    <button
                      key={loc.label}
                      onClick={() => select(loc)}
                      className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${
                        idx === highlighted
                          ? 'bg-accent-subtle text-accent'
                          : 'text-text-primary hover:bg-surface'
                      }`}
                    >
                      {loc.label}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
