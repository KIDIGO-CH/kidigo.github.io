import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedActivities } from '@/components/home/FeaturedActivities'
import { WhyKidigo } from '@/components/home/WhyKidigo'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABanner } from '@/components/home/CTABanner'

export const metadata: Metadata = {
  title: 'KIDIGO — Trouvez les meilleures activités pour vos enfants',
  description: 'Découvrez plus de 2 400 activités vérifiées pour enfants en France. Sport, art, musique, stages vacances. Réservez simplement en ligne.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedActivities />
      <WhyKidigo />
      <Testimonials />
      <CTABanner />
    </>
  )
}
