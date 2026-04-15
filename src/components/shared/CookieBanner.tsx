'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const COOKIE_KEY = 'kidigo-cookies-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  const refuse = () => {
    localStorage.setItem(COOKIE_KEY, 'refused')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-5"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="max-w-[720px] mx-auto bg-elevated rounded-2xl shadow-card-hover border border-border p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="font-display font-bold text-[15px] text-text-primary mb-1.5">
                  🍪 Ce site utilise des cookies
                </p>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.{' '}
                  <Link href="/cookies" className="text-accent underline underline-offset-2 hover:text-accent/80">
                    En savoir plus
                  </Link>
                </p>
              </div>
              <button onClick={refuse} className="text-text-muted hover:text-text-primary flex-shrink-0 mt-0.5">
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={accept}
                className="h-10 px-5 rounded-full bg-accent text-white text-[13px] font-semibold hover:bg-accent/90 transition-colors"
              >
                Tout accepter
              </button>
              <button
                onClick={refuse}
                className="h-10 px-5 rounded-full border border-border text-[13px] font-semibold text-text-primary hover:bg-canvas transition-colors"
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
