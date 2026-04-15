'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { categories } from '@/lib/data'

const MOBILE_INITIAL_COUNT = 4

export function CategoryGrid() {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="py-20 md:py-28 bg-canvas">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Explorer par thème</p>
          <h2
            className="font-display font-black text-text-primary leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
          >
            Toutes les catégories
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              onClick={() => router.push(`/recherche?categorie=${encodeURIComponent(cat.name)}`)}
              className={`group flex items-center gap-2 bg-elevated rounded-full pl-1.5 pr-3.5 py-1.5 border border-border hover:border-accent/30 hover:shadow-card-hover transition-all duration-200 ${
                i >= MOBILE_INITIAL_COUNT && !expanded ? 'hidden sm:flex' : 'flex'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[16px] flex-shrink-0"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                {cat.icon}
              </div>
              <span className="font-display font-semibold text-[13px] text-text-primary group-hover:text-accent transition-colors whitespace-nowrap">
                {cat.name}
              </span>
              <span className="text-[11px] text-text-muted">{cat.count}</span>
            </motion.button>
          ))}
        </div>

        {/* Mobile expand/collapse toggle */}
        {categories.length > MOBILE_INITIAL_COUNT && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="sm:hidden flex items-center gap-1.5 mx-auto mt-4 text-[13px] font-medium text-accent hover:text-accent-light transition-colors"
          >
            {expanded ? 'Voir moins' : `+${categories.length - MOBILE_INITIAL_COUNT} catégories`}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
    </section>
  )
}
