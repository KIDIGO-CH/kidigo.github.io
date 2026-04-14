'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'

export default function CategoriesPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Explorer par thème</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Toutes les catégories
          </h1>
          <p className="text-[16px] text-text-secondary max-w-xl">
            Du sport à la science, de la danse aux balades — trouvez l'activité qui éveillera la curiosité de votre enfant.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.04 }}
            >
              <Link href={`/recherche?categorie=${encodeURIComponent(cat.name)}`}>
                <div
                  className="group relative bg-elevated rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Subtle colored gradient on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
                    style={{ background: `linear-gradient(135deg, ${cat.color}08 0%, ${cat.color}15 100%)` }}
                  />
                  <div
                    className="absolute top-0 left-0 w-full h-[3px] rounded-t-2xl sm:rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: cat.color }}
                  />

                  <div className="relative">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${cat.color}15` }}
                    >
                      {cat.icon}
                    </div>

                    <h2 className="font-display font-bold text-[14px] sm:text-[16px] text-text-primary mb-0.5 leading-snug group-hover:text-accent transition-colors duration-200">
                      {cat.name}
                    </h2>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] sm:text-[12px] text-text-muted">{cat.count} activités</p>
                      <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
