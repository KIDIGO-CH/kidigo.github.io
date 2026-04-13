import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://parlonsvisuel.github.io'),
  title: {
    default: 'KIDIGO — Activités & Loisirs pour Enfants',
    template: '%s | KIDIGO',
  },
  description: 'Trouvez les meilleures activités et loisirs pour vos enfants. Sport, art, musique, danse, science — plus de 2 400 activités vérifiées en Suisse romande.',
  keywords: ['activités enfants', 'loisirs enfants', 'sport enfants', 'atelier enfants', 'cours enfants Suisse romande'],
  openGraph: {
    title: 'KIDIGO — Activités & Loisirs pour Enfants',
    description: 'Trouvez les meilleures activités et loisirs pour vos enfants.',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'KIDIGO — Activités pour enfants' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KIDIGO — Activités & Loisirs pour Enfants',
    description: 'Trouvez les meilleures activités et loisirs pour vos enfants.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} bg-canvas text-text-primary antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
