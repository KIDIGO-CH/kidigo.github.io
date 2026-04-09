import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Freez — Streetwear Premium',
  description: 'Collections capsule. Édition limitée. Jamais deux fois le même drop.',
  openGraph: {
    title: 'Freez — Streetwear Premium',
    description: 'Collections capsule. Édition limitée. Jamais deux fois le même drop.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-canvas text-text-primary antialiased">
        <div className="mesh-gradient" aria-hidden="true" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
