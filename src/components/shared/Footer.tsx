'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Instagram, Youtube } from 'lucide-react'

const FOOTER_LINKS = {
  Explorer: [
    { label: 'Toutes les activités', href: '/recherche' },
    { label: 'Catégories', href: '/categories' },
    { label: 'Activités par âge', href: '/recherche?age=2-4' },
    { label: 'Stages vacances', href: '/recherche?categorie=Stages+vacances' },
    { label: 'Anniversaires', href: '/recherche?categorie=Anniversaires' },
  ],
  Informations: [
    { label: 'Comment ça marche', href: '/comment-ca-marche' },
    { label: 'Organisateurs', href: '/organisateurs' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  Légal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'CGU', href: '/cgu' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSubscribed(true)
    }
  }

  return (
    <footer className="bg-text-primary text-canvas/80">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-black text-[14px]">K</span>
              </div>
              <span className="font-display font-black text-[20px] text-white">KIDIGO</span>
            </div>
            <p className="text-[13px] leading-relaxed text-canvas/60 mb-6 max-w-[220px]">
              Le réflexe des parents pour découvrir les meilleures activités pour leurs enfants.
            </p>

            {/* Newsletter */}
            {subscribed ? (
              <p className="text-[13px] text-accent font-medium">Parfait ! On vous tient informé.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  aria-label="Email newsletter"
                  className="flex-1 bg-white/10 text-white placeholder:text-canvas/40 text-[13px] px-3 py-2 rounded-xl border border-white/15 outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  aria-label="S'abonner"
                  className="w-9 h-9 rounded-xl bg-accent hover:bg-accent-light flex items-center justify-center transition-colors"
                >
                  <ArrowRight size={14} className="text-white" />
                </button>
              </form>
            )}

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-accent/20 flex items-center justify-center transition-colors">
                <Instagram size={14} className="text-canvas/70" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-accent/20 flex items-center justify-center transition-colors">
                <Youtube size={14} className="text-canvas/70" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-[11px] font-semibold text-canvas/40 uppercase tracking-[0.12em] mb-4">{title}</p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-[13px] text-canvas/60 hover:text-white transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-white/10">
          <p className="text-[12px] text-canvas/40">© {new Date().getFullYear()} KIDIGO. Tous droits réservés.</p>
          <p className="text-[12px] text-canvas/40">Fait avec ❤️ pour les familles françaises</p>
        </div>
      </div>
    </footer>
  )
}
