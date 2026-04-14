'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Target, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function AProposPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Notre histoire</p>
            <h1
              className="font-display font-black text-text-primary leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              KIDIGO, né d'une frustration de parent
            </h1>
            <div className="space-y-4 text-[15px] text-text-secondary leading-relaxed">
              <p>
                KIDIGO est né en 2024 d'une conviction simple : trouver une bonne activité pour son enfant ne devrait pas ressembler à une chasse au trésor.
              </p>
              <p>
                Ses fondateurs, parents eux-mêmes, se sont retrouvés à passer des heures à comparer des sites peu clairs, appeler des structures non réactives et finir souvent déçus. Ils ont décidé de créer la solution qu'ils auraient aimé avoir.
              </p>
              <p>
                Aujourd'hui, KIDIGO connecte des milliers de familles avec des organisateurs vérifiés et passionnés dans toute la France.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{ aspectRatio: '4/3' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <img
              src="https://picsum.photos/seed/about-kidigo/800/600"
              alt="L'équipe KIDIGO"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-transparent" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {[
            { icon: Heart, title: 'Notre mission', text: 'Permettre à chaque enfant d\'accéder à des activités de qualité qui l\'épanouissent, partout en Suisse romande.', color: '#E11D48', bg: '#FEF2F2' },
            { icon: Target, title: 'Notre vision', text: 'Devenir le partenaire de confiance de toutes les familles pour l\'épanouissement de leurs enfants.', color: '#FF6B52', bg: '#FFF0ED' },
            { icon: Users, title: 'Notre équipe', text: 'Une équipe de 12 personnes passionnées, parents pour la plupart, basée à Genève et Lausanne.', color: '#7C3AED', bg: '#EDE9FE' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-elevated rounded-3xl p-8 border border-border"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: item.bg }}>
                <item.icon size={22} style={{ color: item.color }} />
              </div>
              <h2 className="font-display font-bold text-[18px] text-text-primary mb-3">{item.title}</h2>
              <p className="text-[14px] text-text-secondary leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="font-display font-black text-[28px] text-text-primary mb-4">Rejoignez l'aventure KIDIGO</h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">Parents ou organisateurs, vous avez votre place dans notre communauté.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/recherche"><Button size="lg">Explorer les activités <ArrowRight size={16} /></Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">Nous contacter</Button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
