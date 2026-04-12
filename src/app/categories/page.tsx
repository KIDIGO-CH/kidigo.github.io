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
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Toutes les catégories</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Explorez par thème
          </h1>
          <p className="text-[16px] text-text-secondary max-w-xl">
            Du sport à la science, de la danse à la nature — trouvez l'activité qui éveillera la curiosité de votre enfant.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.06 }}
            >
              <Link href={`/recherche?categorie=${encodeURIComponent(cat.name)}`}>
                <div className="group bg-elevated rounded-3xl p-8 border border-border hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                    style={{ backgroundColor: `${cat.color}18` }}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="font-display font-bold text-[20px] text-text-primary mb-1 group-hover:text-accent transition-colors duration-200">
                        {cat.name}
                      </h2>
                      <p className="text-[13px] text-text-muted">{cat.count} activités disponibles</p>
                    </div>
                    <ArrowRight size={18} className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
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
