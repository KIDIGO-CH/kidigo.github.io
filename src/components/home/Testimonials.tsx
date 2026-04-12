'use client'

import { motion } from 'framer-motion'
import { StarRating } from '@/components/ui/StarRating'

const TESTIMONIALS = [
  {
    name: 'Sophie M.',
    city: 'Paris',
    avatar: 'https://picsum.photos/seed/user-1/80/80',
    rating: 5,
    text: 'KIDIGO m\'a sauvé la mise pendant les vacances de printemps. En 5 minutes, j\'avais trouvé un stage de tennis pour mes deux garçons, avec des horaires compatibles. Le site est tellement clair et rassurant.',
    activity: 'Stage Multi-Sports Lyon',
  },
  {
    name: 'Julien R.',
    city: 'Lyon',
    avatar: 'https://picsum.photos/seed/user-2/80/80',
    rating: 5,
    text: 'Ma fille adore son atelier aquarelle, elle en parle tous les soirs ! J\'ai pu lire les avis d\'autres parents, vérifier que l\'organisatrice était diplômée, et réserver sans appeler personne. Parfait.',
    activity: 'Atelier Aquarelle Paris',
  },
  {
    name: 'Amina K.',
    city: 'Bordeaux',
    avatar: 'https://picsum.photos/seed/user-3/80/80',
    rating: 5,
    text: 'Enfin une plateforme qui prend en compte vraiment l\'âge et les disponibilités. Je cherchais quelque chose pour le mercredi avec mon fils de 4 ans — j\'ai trouvé l\'éveil musical en 2 minutes.',
    activity: 'Éveil Musical Bordeaux',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-surface overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Témoignages</p>
          <h2
            className="font-display font-black text-text-primary leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
          >
            Ce que les parents en disent
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-elevated rounded-3xl p-7 border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
            >
              <StarRating rating={t.rating} size="md" className="mb-5" />
              <p className="text-[14px] text-text-primary leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-display font-bold text-[14px] text-text-primary">{t.name}</p>
                  <p className="text-[12px] text-text-muted">{t.city} · {t.activity}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
