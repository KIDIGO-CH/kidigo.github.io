'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-canvas">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          className="relative bg-accent rounded-4xl p-10 md:p-16 overflow-hidden text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* Background shapes */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10" />

          <div className="relative z-10">
            <h2
              className="font-display font-black text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
            >
              Prêt à trouver l&apos;activité&nbsp;parfaite&nbsp;?
            </h2>
            <p className="text-white/80 text-[16px] max-w-lg mx-auto mb-10">
              Plus de 2 400 activités vous attendent. Entrez votre ville et laissez-vous guider.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/recherche">
                <Button variant="secondary" size="lg">
                  Explorer les activités <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/partager">
                <Button
                  size="lg"
                  className="bg-white/15 text-white hover:bg-white/25 border-0 shadow-none"
                >
                  Partager une activité
                </Button>
              </Link>
              <Link href="/organisateurs">
                <Button
                  size="lg"
                  className="bg-white/15 text-white hover:bg-white/25 border-0 shadow-none"
                >
                  Je suis organisateur
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
