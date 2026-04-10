'use client'

import { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'
import { currentCollection } from '@/lib/data'

type Filter = 'Tous' | 'Hauts' | 'Bas' | 'Vestes' | 'Accessoires'
const FILTERS: Filter[] = ['Tous', 'Hauts', 'Bas', 'Vestes', 'Accessoires']

export default function Collection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Tous')
  const sectionRef = useRef<HTMLDivElement>(null)

  const filtered = activeFilter === 'Tous'
    ? currentCollection.products
    : currentCollection.products.filter((p) => p.category === activeFilter)

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="collection" className="py-24 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end mb-12 reveal">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-3">
              {currentCollection.season}
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] uppercase">
              {currentCollection.name}
            </h2>
          </div>
          <p className="text-text-secondary max-w-xs leading-relaxed text-sm md:text-right">
            {currentCollection.description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 reveal" style={{ transitionDelay: '100ms' }}>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-4 py-2 text-xs font-mono tracking-wide uppercase rounded-full
                border transition-all duration-200
                ${activeFilter === filter
                  ? 'bg-accent border-accent text-white'
                  : 'border-border text-text-secondary hover:border-border-strong hover:text-text-primary'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid — asymétrique bento */}
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
              <span className="text-text-muted font-mono text-xs">0</span>
            </div>
            <p className="text-text-secondary text-sm">
              Aucune pièce dans cette catégorie pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className="reveal"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
