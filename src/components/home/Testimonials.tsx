'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'

const TESTIMONIALS = [
  {
    name: 'Sophie M.',
    city: 'Genève',
    rating: 5,
    text: 'KIDIGO m\'a sauvé la mise pendant les vacances de printemps. En 5 minutes, j\'avais trouvé un stage de tennis pour mes deux garçons, avec des horaires compatibles. Le site est tellement clair et rassurant.',
    activity: 'Stage Multi-Sports Lausanne',
  },
  {
    name: 'Julien R.',
    city: 'Lausanne',
    rating: 5,
    text: 'Ma fille adore son atelier aquarelle, elle en parle tous les soirs ! J\'ai pu lire les avis d\'autres parents, vérifier que l\'organisatrice était diplômée, et réserver sans appeler personne. Parfait.',
    activity: 'Atelier Aquarelle Genève',
  },
  {
    name: 'Amina K.',
    city: 'Fribourg',
    rating: 5,
    text: 'Enfin une plateforme qui prend en compte vraiment l\'âge et les disponibilités. Je cherchais quelque chose pour le mercredi avec mon fils de 4 ans — j\'ai trouvé l\'éveil musical en 2 minutes.',
    activity: 'Éveil Musical Fribourg',
  },
  {
    name: 'Marc D.',
    city: 'Estavayer-le-Lac',
    rating: 5,
    text: 'En tant que grand-père, je cherchais une sortie pour mes petits-enfants. La recherche par âge et par proximité m\'a permis de trouver la ferme pédagogique idéale en quelques clics.',
    activity: 'Ferme pédagogique Fétigny',
  },
  {
    name: 'Céline B.',
    city: 'Montreux',
    rating: 5,
    text: 'J\'ai partagé notre café kids friendly préféré sur KIDIGO et j\'ai reçu plein de mercis d\'autres parents ! J\'adore l\'idée que la communauté s\'entraide comme ça.',
    activity: 'Café Le Petit Nid',
  },
  {
    name: 'David L.',
    city: 'Neuchâtel',
    rating: 4,
    text: 'Les filtres sont vraiment bien pensés. Budget, intérieur/extérieur, encadrement… On sent que c\'est fait par des parents qui comprennent nos besoins. Bravo !',
    activity: 'Cours de Judo Neuchâtel',
  },
  {
    name: 'Nadia S.',
    city: 'Payerne',
    rating: 5,
    text: 'Le mercredi après-midi était toujours un casse-tête. Depuis KIDIGO, mes enfants ont chacun leur activité et moi j\'ai 2h de tranquillité. Merci !',
    activity: 'Atelier Théâtre Payerne',
  },
  {
    name: 'Pierre G.',
    city: 'Sion',
    rating: 5,
    text: 'Super plateforme ! J\'ai trouvé un stage de ski pour mes deux enfants pendant les vacances. Tout était clair : prix, horaires, niveau requis. On reviendra.',
    activity: 'Stage Ski Crans-Montana',
  },
]

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

const COLORS = ['#3B82F6', '#6366F1', '#EC4899', '#0EA5E9', '#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444']

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  // Items per view: 1 on mobile, 3 on desktop
  const [perView, setPerView] = useState(3)

  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 768 ? 1 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, TESTIMONIALS.length - perView)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(i => Math.min(i + 1, maxIndex))
  }, [maxIndex])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(i => Math.max(i - 1, 0))
  }, [])

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => {
        if (i >= maxIndex) {
          setDirection(-1)
          return 0
        }
        setDirection(1)
        return i + 1
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [maxIndex])

  const visibleTestimonials = TESTIMONIALS.slice(current, current + perView)

  return (
    <section className="py-20 md:py-28 bg-surface overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <motion.div
          className="flex items-end justify-between mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div>
            <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Témoignages</p>
            <h2
              className="font-display font-black text-text-primary leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
            >
              Ce que les parents en disent
            </h2>
          </div>

          {/* Navigation arrows — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} className="text-text-primary" />
            </button>
            <button
              onClick={next}
              disabled={current >= maxIndex}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} className="text-text-primary" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ type: 'spring', stiffness: 200, damping: 28 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {visibleTestimonials.map((t, i) => {
                const globalIndex = current + i
                return (
                  <div
                    key={`${t.name}-${globalIndex}`}
                    className="bg-elevated rounded-3xl p-6 sm:p-7 border border-border"
                  >
                    <StarRating rating={t.rating} size="md" className="mb-5" />
                    <p className="text-[13px] sm:text-[14px] text-text-primary leading-relaxed mb-6 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-5 border-t border-border">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: COLORS[globalIndex % COLORS.length] }}
                      >
                        <span className="text-[12px] font-bold text-white">{getInitials(t.name)}</span>
                      </div>
                      <div>
                        <p className="font-display font-bold text-[14px] text-text-primary">{t.name}</p>
                        <p className="text-[12px] text-text-muted">{t.city} · {t.activity}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? 'w-6 h-2 bg-accent'
                  : 'w-2 h-2 bg-border hover:bg-text-muted'
              }`}
            />
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-4">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} className="text-text-primary" />
          </button>
          <button
            onClick={next}
            disabled={current >= maxIndex}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} className="text-text-primary" />
          </button>
        </div>
      </div>
    </section>
  )
}
