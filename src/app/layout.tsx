import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'FREEZ — ICE AGE 02',
  description: 'Streetwear technique. Six pièces. Zéro compromis. Édition limitée.',
  openGraph: {
    title: 'FREEZ — ICE AGE 02',
    description: 'Drop Printemps-Été 2025. Six pièces. Édition limitée.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FREEZ — ICE AGE 02 — Streetwear technique, édition limitée',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FREEZ — ICE AGE 02',
    description: 'Drop Printemps-Été 2025. Six pièces. Édition limitée.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-canvas text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
