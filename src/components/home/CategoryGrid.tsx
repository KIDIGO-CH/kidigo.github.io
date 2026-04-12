'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { categories } from '@/lib/data'

export function CategoryGrid() {
  const router = useRouter()

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              onClick={() => router.push(`/recherche?categorie=${encodeURIComponent(cat.name)}`)}
              className="group bg-elevated rounded-3xl p-5 text-left border border-border hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl mb-4"
                style={{ backgroundColor: `${cat.color}18` }}
              >
                {cat.icon}
              </div>
              <p className="font-display font-bold text-[14px] text-text-primary leading-tight mb-1 group-hover:text-accent transition-colors duration-200">
                {cat.name}
              </p>
              <p className="text-[12px] text-text-muted">{cat.count} activités</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
