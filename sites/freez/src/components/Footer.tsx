import Link from 'next/link'
import { InstagramLogo, TiktokLogo, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-4 md:px-8 py-12 mt-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-2xl font-bold tracking-[-0.04em] uppercase text-text-primary mb-3">
              Freez
            </p>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Streetwear capsule. Drops limités à 100 unités. Pas de restocks.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-text-muted mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {['Collection', 'À propos', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-').replace('à-', '')}`}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-text-muted mb-4">
              Légal
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Mentions légales', href: '/mentions-legales' },
                { label: 'Politique de confidentialité', href: '/confidentialite' },
                { label: 'CGV', href: '/cgv' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-text-muted mb-4">
              Suivre
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <InstagramLogo size={16} weight="regular" />
                Instagram
                <ArrowUpRight size={12} className="text-text-muted" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <TiktokLogo size={16} weight="regular" />
                TikTok
                <ArrowUpRight size={12} className="text-text-muted" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
          <p className="text-xs font-mono text-text-muted">
            © {year} Freez. Tous droits réservés.
          </p>
          <p className="text-xs font-mono text-text-muted">
            REV-2024.4 — ICE AGE 01 — OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  )
}
