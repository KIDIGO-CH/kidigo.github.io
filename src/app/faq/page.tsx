'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQ_ITEMS = [
  { q: 'KIDIGO est-il gratuit pour les parents ?', a: 'Oui, totalement. KIDIGO est gratuit pour les familles. Vous pouvez chercher, comparer et contacter des organisateurs sans aucun frais. Seuls les organisateurs paient un abonnement pour être référencés.' },
  { q: 'Comment sont vérifiés les organisateurs ?', a: 'Avant d\'apparaître sur KIDIGO, chaque organisateur passe par un processus de vérification : diplômes et qualifications professionnels, attestation d\'assurance responsabilité civile, vérification du registre du commerce, et contrôle des avis. Le badge "Vérifié KIDIGO" indique qu\'un organisateur a passé tous ces contrôles.' },
  { q: 'Puis-je annuler une réservation ?', a: 'Les conditions d\'annulation dépendent de chaque organisateur et sont clairement indiquées sur chaque fiche activité. En général, une annulation effectuée plus de 48h avant la séance est remboursée intégralement. KIDIGO intervient comme médiateur en cas de litige.' },
  { q: 'Comment fonctionne le paiement ?', a: 'Le paiement s\'effectue directement via la plateforme, de manière sécurisée. Nous acceptons les cartes bancaires, PayPal et les chèques vacances ANCV. Les fonds sont reversés à l\'organisateur uniquement après la tenue de l\'activité.' },
  { q: 'Comment laisser un avis ?', a: 'Après chaque activité, vous recevez un email vous invitant à laisser un avis. Seuls les parents ayant effectivement participé peuvent évaluer une activité — c\'est ainsi que nous garantissons l\'authenticité de tous les avis sur KIDIGO.' },
  { q: 'Proposez-vous des activités pendant les vacances scolaires ?', a: 'Absolument. Vous pouvez filtrer spécifiquement les stages et activités disponibles pendant les vacances. Entrez simplement la période souhaitée dans le moteur de recherche et cochez "Stages vacances" dans les catégories.' },
  { q: 'Mon enfant a des besoins spécifiques. Comment chercher ?', a: 'Vous pouvez préciser dans la barre de recherche des termes comme "handicap", "autisme", "dyspraxie"... Certains organisateurs proposent des activités adaptées et le mentionnent explicitement dans leur description. Notre équipe peut aussi vous aider à trouver manuellement des structures adaptées — contactez-nous.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">Questions fréquentes</p>
          <h1
            className="font-display font-black text-text-primary leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            FAQ
          </h1>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className="bg-elevated rounded-2xl border border-border overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-display font-bold text-[15px] text-text-primary">{item.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={18} className="text-text-muted" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[14px] text-text-secondary leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
