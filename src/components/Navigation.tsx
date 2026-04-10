'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, List, X } from '@phosphor-icons/react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? 'bg-canvas/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-text-primary font-bold tracking-[-0.04em] text-xl uppercase hover:text-accent transition-colors duration-200"
          >
            Freez
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Collection', 'À propos', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-').replace('à-', '')}`}
                className="text-text-secondary text-sm tracking-wide hover:text-text-primary transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              className="relative p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              aria-label="Panier"
            >
              <ShoppingBag size={20} weight="regular" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
              )}
            </button>

            <button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <List size={20} weight="regular" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`
          fixed inset-0 z-[60] bg-canvas/95 backdrop-blur-xl
          flex flex-col justify-center px-8
          transition-all duration-400
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <button
          className="absolute top-5 right-5 p-2 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMenuOpen(false)}
          aria-label="Fermer"
        >
          <X size={24} weight="regular" />
        </button>

        <nav className="flex flex-col gap-6">
          {['Collection', 'À propos', 'Contact'].map((item, i) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-').replace('à-', '')}`}
              className="text-4xl font-bold tracking-[-0.04em] uppercase text-text-primary hover:text-accent transition-colors duration-200"
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
