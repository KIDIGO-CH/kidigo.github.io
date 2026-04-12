import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Collection from '@/components/Collection'
import BrandStory from '@/components/BrandStory'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-canvas overflow-x-hidden">
      <Navigation />
      <Hero />
      <Collection />
      <BrandStory />
      <Footer />
    </main>
  )
}
