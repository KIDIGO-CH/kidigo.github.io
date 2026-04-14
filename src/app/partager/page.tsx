'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, MapPin, Clock, Tag, Info, CheckCircle, Camera } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { categories } from '@/lib/data'

export default function PartagerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [photos, setPhotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setPhotos(prev => [...prev, ...files].slice(0, 5))
    const newPreviews = files.map(f => URL.createObjectURL(f))
    setPreviews(prev => [...prev, ...newPreviews].slice(0, 5))
  }

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx))
    setPreviews(prev => {
      URL.revokeObjectURL(prev[idx])
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-canvas pt-32 pb-20">
        <motion.div
          className="max-w-lg mx-auto px-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="font-display font-bold text-[28px] text-text-primary mb-4">Merci pour votre partage !</h1>
          <p className="text-text-secondary text-[15px] mb-2">
            Votre suggestion a bien été envoyée.
          </p>
          <p className="text-text-secondary text-[14px] mb-8">
            L'équipe Kidigo va vérifier les informations et publier le lieu sous 48h.
            Vous recevrez une notification par email.
          </p>
          <Button onClick={() => window.location.href = '/'} variant="primary">
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display font-bold text-[32px] text-text-primary mb-3">
            Partager un lieu ou une activité
          </h1>
          <p className="text-text-secondary text-[15px] max-w-lg">
            Vous connaissez un endroit kids friendly ou une activité géniale pour les enfants ?
            Partagez-le avec la communauté Kidigo. Chaque suggestion est vérifiée par notre équipe avant publication.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >

          {/* Nom */}
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-2">
              Nom du lieu ou de l'activité *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Le Petit Nid — Café Kids Friendly"
              className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-2">
              <Tag size={13} className="inline mr-1" />
              Catégorie *
            </label>
            <select
              required
              className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary outline-none focus:border-accent transition-colors cursor-pointer"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(c => (
                <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Décrivez le lieu, ce qui le rend génial pour les familles, les activités proposées…"
              className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          {/* Adresse */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-text-primary mb-2">
                <MapPin size={13} className="inline mr-1" />
                Adresse *
              </label>
              <input
                type="text"
                required
                placeholder="Rue et numéro"
                className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-primary mb-2">NPA et localité *</label>
              <input
                type="text"
                required
                placeholder="1470 Estavayer-le-Lac"
                className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Âge et prix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-text-primary mb-2">Âge minimum</label>
              <input
                type="number"
                min="0"
                max="18"
                placeholder="0"
                className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-primary mb-2">Âge maximum</label>
              <input
                type="number"
                min="0"
                max="18"
                placeholder="14"
                className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-primary mb-2">Prix indicatif (CHF)</label>
              <input
                type="text"
                placeholder="Gratuit, 15 CHF…"
                className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Horaires */}
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-2">
              <Clock size={13} className="inline mr-1" />
              Horaires / Disponibilités
            </label>
            <input
              type="text"
              placeholder="Ex: Lun-Ven 9h-17h, Sam 10h-16h"
              className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Site web */}
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-2">Site web ou réseau social</label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-2">
              <Camera size={13} className="inline mr-1" />
              Photos (max. 5)
            </label>
            <div className="flex flex-wrap gap-3">
              {previews.map((src, i) => (
                <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden group">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[18px]"
                  >
                    ×
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <label className="w-24 h-24 rounded-xl border-2 border-dashed border-border hover:border-accent/40 flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <Upload size={18} className="text-text-muted mb-1" />
                  <span className="text-[10px] text-text-muted">Ajouter</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotos}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-text-primary mb-2">Votre nom *</label>
              <input
                type="text"
                required
                placeholder="Prénom Nom"
                className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-primary mb-2">Votre email *</label>
              <input
                type="email"
                required
                placeholder="email@exemple.ch"
                className="w-full bg-elevated border border-border rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Info box */}
          <div className="flex gap-3 bg-accent-subtle rounded-2xl p-4">
            <Info size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Chaque lieu partagé est vérifié par l'équipe Kidigo avant publication.
              Nous vous contacterons si nous avons besoin d'informations complémentaires.
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Envoyer ma suggestion
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}
