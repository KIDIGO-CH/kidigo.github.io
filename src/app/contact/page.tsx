'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-[12px] font-medium text-accent uppercase tracking-[0.15em] mb-3">On vous répond vite</p>
          <h1
            className="font-display font-black text-text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Contactez-nous
          </h1>
          <p className="text-[16px] text-text-secondary">Une question ? Un problème ? Une suggestion ? Notre équipe est là.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-10">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            {sent ? (
              <div className="bg-accent-subtle border border-accent/20 rounded-3xl p-12 text-center">
                <CheckCircle size={40} className="text-accent mx-auto mb-4" />
                <h2 className="font-display font-bold text-[22px] text-text-primary mb-2">Message envoyé !</h2>
                <p className="text-text-secondary">Nous vous répondrons dans les 24 heures ouvrées.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: 'name', label: 'Votre nom', type: 'text', placeholder: 'Marie Dupont' },
                  { id: 'email', label: 'Votre email', type: 'email', placeholder: 'marie@exemple.fr' },
                  { id: 'subject', label: 'Sujet', type: 'text', placeholder: 'Question sur une réservation' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-[13px] font-medium text-text-primary mb-2">{label}</label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={form[id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                      required
                      className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-[13px] font-medium text-text-primary mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Décrivez votre demande…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                <Button type="submit" size="lg" fullWidth>Envoyer le message</Button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          >
            {[
              { icon: Mail, title: 'Email', value: 'bonjour@kidigo.fr' },
              { icon: MapPin, title: 'Siège social', value: '12 rue de la Paix\n75001 Paris' },
              { icon: Clock, title: 'Horaires', value: 'Lun–Ven, 9h–18h\nRéponse sous 24h' },
            ].map(({ icon: Icon, title, value }) => (
              <div key={title} className="bg-elevated rounded-3xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent-subtle flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-[14px] text-text-primary mb-1">{title}</p>
                    <p className="text-[13px] text-text-secondary whitespace-pre-line">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
