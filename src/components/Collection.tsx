'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { products, collection } from '@/lib/data'
import ProductCard from './ProductCard'

type Category = 'Tous' | 'Hauts' | 'Bas' | 'Vestes' | 'Accessoires'
const CATEGORIES: Category[] = ['Tous', 'Hauts', 'Bas', 'Vestes', 'Accessoires']

// Bento layout: col-span sur 12 colonnes + ratio pour chaque produit dans l'ordre du tableau
const BENTO: Record<string, { col: string; aspect: string }> = {
  'frz-001': { col: 'md:col-span-7', aspect: '3/4' },   // Arctic Cargo — tall, gauche
  'frz-002': { col: 'md:col-span-5', aspect: '3/4' },   // Subzero Hoodie — tall, droite
  'frz-003': { col: 'md:col-span-4', aspect: '5/4' },   // Cold Wave Tee — court, gauche
  'frz-004': { col: 'md:col-span-8', aspect: '5/4' },   // Frost Shell — court, droite
  'frz-005': { col: 'md:col-span-5', aspect: '4/3' },   // Glacier Cap — court, gauche
  'frz-006': { col: 'md:col-span-7', aspect: '4/3' },   // Permafrost Shorts — court, droite
}

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous')

  const filtered = useMemo(
    () =>
      activeCategory === 'Tous'
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <section id="collection" className="py-24 md:py-32 px-6 md:px-10 max-w-[1600px] mx-auto">

      {/* Section header */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-8 mb-14">
        <div>
          <motion.p
            className="text-[10px] tracking-[0.3em] text-text-secondary uppercase mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Collection
          </motion.p>
          <motion.div
            className="flex items-baseline gap-4 overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.05 }}
          >
            <h2
              className="font-medium text-text-primary uppercase leading-none"
              style={{ fontSize: 'clamp(2.2rem, 7vw, 8rem)' }}
            >
              {collection.name}
            </h2>
            <span
              className="font-medium text-accent uppercase leading-none"
              style={{ fontSize: 'clamp(2.2rem, 7vw, 8rem)' }}
            >
              {collection.number}
            </span>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-[0.18em] uppercase px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-accent/50 text-accent bg-accent/[0.06]'
                  : 'border-white/10 text-text-secondary hover:border-white/22 hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Bento grid */}
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-[10px]"
              layout
            >
              {filtered.map((product, i) => {
                const layout = BENTO[product.id] ?? { col: 'md:col-span-6', aspect: '4/3' }
                return (
                  <motion.div
                    key={product.id}
                    layout
                    className={`w-full ${layout.col}`}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  >
                    <ProductCard product={product} index={i} aspectRatio={layout.aspect} />
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              className="flex flex-col items-center justify-center py-28 border border-white/[0.06]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-[12px] tracking-[0.22em] text-text-secondary uppercase mb-2">
                Aucune pièce
              </p>
              <p className="text-[11px] text-text-muted">dans cette catégorie</p>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  )
}
