'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/recherche', label: 'Explorer' },
  { href: '/categories', label: 'Catégories' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/organisateurs', label: 'Organisateurs' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-elevated/95 backdrop-blur-md shadow-card border-b border-border' : 'bg-transparent'
        )}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-black text-[14px]">K</span>
            </div>
            <span className="font-display font-black text-[20px] text-text-primary tracking-tight">
              KIDIGO
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-[13px] font-medium transition-colors duration-200',
                  pathname === href ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/recherche">
              <button className="w-9 h-9 rounded-xl hover:bg-surface flex items-center justify-center transition-colors duration-200">
                <Search size={16} className="text-text-secondary" />
              </button>
            </Link>
            <Link href="/connexion">
              <Button variant="ghost" size="sm">Connexion</Button>
            </Link>
            <Link href="/inscription">
              <Button size="sm">S'inscrire gratuitement</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-xl hover:bg-surface flex items-center justify-center transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {menuOpen ? <X size={20} className="text-text-primary" /> : <Menu size={20} className="text-text-primary" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-elevated flex flex-col pt-20 px-6 pb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <nav className="flex flex-col gap-2 mb-8">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 100, damping: 20 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[20px] font-display font-bold text-text-primary py-3 border-b border-border hover:text-accent transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-auto">
              <Link href="/connexion" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" size="lg" fullWidth>Connexion</Button>
              </Link>
              <Link href="/inscription" onClick={() => setMenuOpen(false)}>
                <Button size="lg" fullWidth>S'inscrire gratuitement</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
