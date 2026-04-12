'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type NavLink = { label: string; href: string; soon?: boolean }

const NAV_LINKS: NavLink[] = [
  { label: 'Collection', href: '#collection' },
  { label: 'Lookbook', href: '#lookbook', soon: true },
  { label: 'À propos', href: '#a-propos' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(8,8,8,0.82)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          transition: 'background-color 0.35s, border-color 0.35s',
        }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">
          <button
            onClick={() => scrollTo('#hero')}
            className="text-[12px] tracking-[0.32em] font-medium text-text-primary uppercase select-none"
          >
            FREEZ
          </button>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href, soon }) => (
              <button
                key={label}
                onClick={() => !soon && scrollTo(href)}
                disabled={soon}
                className="relative text-[11px] tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors duration-300 uppercase disabled:cursor-default disabled:opacity-50"
              >
                {label}
                {soon && (
                  <span className="absolute -top-2 -right-7 text-[8px] tracking-[0.1em] text-accent/70 uppercase">
                    bientôt
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-[10px] tracking-[0.22em] text-text-muted uppercase">ICE AGE 02</span>
            <button
              onClick={() => scrollTo('#collection')}
              className="text-[11px] tracking-[0.18em] border border-white/10 hover:border-accent/40 hover:text-accent px-5 py-2 transition-colors duration-300 uppercase text-text-secondary"
            >
              Shop
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <motion.span
              className="block w-[22px] h-px bg-text-primary origin-center"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
            <motion.span
              className="block w-[22px] h-px bg-text-primary"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
            <motion.span
              className="block w-[22px] h-px bg-text-primary origin-center"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-canvas flex flex-col justify-center px-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <nav className="flex flex-col gap-8 mt-16">
              {[...NAV_LINKS, { label: 'Shop', href: '#collection' }].map(({ label, href, soon }, i) => (
                <motion.button
                  key={label}
                  onClick={() => !soon && scrollTo(href)}
                  disabled={soon}
                  className="text-left text-[2.5rem] font-medium tracking-tight uppercase text-text-primary hover:text-accent transition-colors duration-200 disabled:opacity-40 disabled:cursor-default"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 100, damping: 20 }}
                >
                  {label}
                  {soon && (
                    <span className="ml-3 text-[1rem] text-accent/60 tracking-[0.15em] align-middle">
                      bientôt
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>
            <div className="absolute bottom-10 left-8">
              <span className="text-[10px] tracking-[0.28em] text-text-muted uppercase">ICE AGE 02 — 2025</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
