'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ActivityCard } from '@/components/search/ActivityCard'
import { featuredActivities, popularActivities } from '@/lib/data'

interface SectionProps {
  title: string
  subtitle: string
  label: string
  activities: typeof featuredActivities
  href: string
}

function ActivitySection({ title, subtitle, label, activities, href }: SectionProps) {
  return (
    <div className="mb-20 md:mb-28">
      <motion.div
        className="flex items-end justify-between mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div>
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">{label}</p>
          <h2
            className="font-display font-black text-text-primary leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
          >
            {title}
          </h2>
          <p className="text-text-secondary mt-2 max-w-md text-[15px]">{subtitle}</p>
        </div>
        <Link
          href={href}
          className="hidden md:flex items-center gap-2 text-[13px] font-medium text-accent hover:gap-3 transition-all duration-200"
        >
          Voir tout <ArrowRight size={14} />
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {activities.slice(0, 4).map((activity, i) => (
          <ActivityCard key={activity.id} activity={activity} index={i} />
        ))}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Link
          href={href}
          className="flex items-center gap-2 text-[13px] font-medium text-accent border border-accent/30 px-5 py-2.5 rounded-full hover:bg-accent-subtle transition-all duration-200"
        >
          Voir tout <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export function FeaturedActivities() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <ActivitySection
          label="Sélection du moment"
          title="Nos coups de cœur"
          subtitle="Des activités exceptionnelles, choisies par notre équipe pour leur qualité et leur originalité."
          activities={featuredActivities}
          href="/recherche?tri=coups-de-coeur"
        />
        <ActivitySection
          label="Tendances"
          title="Ce que les familles adorent"
          subtitle="Les activités les plus likées par les familles, près de chez vous."
          activities={popularActivities.slice(0, 4)}
          href="/recherche?tri=popular"
        />
      </div>
    </section>
  )
}
