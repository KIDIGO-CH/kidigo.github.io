'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Calendar, Star, ChevronLeft, Heart, Share2, Shield, CheckCircle, Home, TreePine } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { ActivityCard } from '@/components/search/ActivityCard'
import { activities } from '@/lib/data'
import type { Activity } from '@/lib/types'

export function ActivityDetail({ activity }: { activity: Activity }) {
  const [liked, setLiked] = useState(false)
  const [reserved, setReserved] = useState(false)

  const related = activities.filter(a => a.id !== activity.id && a.category === activity.category).slice(0, 3)

  return (
    <div className="min-h-[100dvh] bg-canvas pt-16">

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 mb-6">
        <div className="flex items-center gap-2 text-[13px] text-text-muted">
          <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/recherche" className="hover:text-accent transition-colors">Activités</Link>
          <span>/</span>
          <Link href={`/recherche?categorie=${encodeURIComponent(activity.category)}`} className="hover:text-accent transition-colors">
            {activity.category}
          </Link>
          <span>/</span>
          <span className="text-text-secondary truncate max-w-[200px]">{activity.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">

          {/* Left */}
          <div>
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="subtle">{activity.category}</Badge>
                <Badge variant="outline">
                  {activity.isIndoor ? <><Home size={10} className="mr-1" />Intérieur</> : <><TreePine size={10} className="mr-1" />Extérieur</>}
                </Badge>
                {activity.isCoupDeCoeur && <Badge variant="accent">❤️ Coup de cœur</Badge>}
                {activity.availableSlots <= 5 && (
                  <Badge variant="warning">{activity.availableSlots} place{activity.availableSlots > 1 ? 's' : ''} restante{activity.availableSlots > 1 ? 's' : ''}</Badge>
                )}
              </div>

              <h1
                className="font-display font-black text-text-primary leading-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
              >
                {activity.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <StarRating rating={activity.rating} reviewCount={activity.reviewCount} size="md" />
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <MapPin size={14} />
                  <span className="text-[13px]">{activity.city} · {activity.district}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <Clock size={14} />
                  <span className="text-[13px]">{activity.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <Users size={14} />
                  <span className="text-[13px]">{activity.ageLabel}</span>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="rounded-3xl overflow-hidden mb-8"
              style={{ aspectRatio: '16/9' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.15 }}
            >
              <h2 className="font-display font-bold text-[20px] text-text-primary mb-4">Description</h2>
              <p className="text-[15px] text-text-secondary leading-relaxed">{activity.description}</p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              className="bg-elevated rounded-3xl p-7 border border-border mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <h2 className="font-display font-bold text-[18px] text-text-primary mb-5">Ce que votre enfant va développer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activity.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-accent flex-shrink-0" />
                    <span className="text-[14px] text-text-primary">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Practical info */}
            <motion.div
              className="bg-elevated rounded-3xl p-7 border border-border mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.25 }}
            >
              <h2 className="font-display font-bold text-[18px] text-text-primary mb-5">Infos pratiques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Adresse', value: activity.practical.address },
                  { label: 'Accès', value: activity.practical.transport },
                  { label: 'Matériel fourni', value: activity.practical.equipment },
                  { label: 'À prévoir', value: activity.practical.toProvide },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] mb-1">{label}</p>
                    <p className="text-[14px] text-text-primary">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Organizer */}
            <motion.div
              className="bg-elevated rounded-3xl p-7 border border-border mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
            >
              <h2 className="font-display font-bold text-[18px] text-text-primary mb-5">L'organisateur</h2>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={activity.organizer.logo}
                  alt={activity.organizer.name}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-bold text-[16px] text-text-primary">{activity.organizer.name}</p>
                    {activity.organizer.verified && (
                      <Shield size={14} className="text-accent" />
                    )}
                  </div>
                  <StarRating rating={activity.organizer.rating} reviewCount={activity.organizer.reviewCount} />
                </div>
              </div>
              <p className="text-[14px] text-text-secondary leading-relaxed">{activity.organizer.description}</p>
            </motion.div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-[20px] text-text-primary mb-6">Activités similaires</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map((a, i) => <ActivityCard key={a.id} activity={a} index={i} />)}
                </div>
              </div>
            )}
          </div>

          {/* Right — Booking card */}
          <div className="lg:sticky lg:top-28 h-fit">
            <motion.div
              className="bg-elevated rounded-3xl p-7 border border-border shadow-card-hover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="font-display font-black text-[28px] text-text-primary">{activity.price}€</span>
                  <span className="text-[13px] text-text-muted ml-2">/ séance</span>
                </div>
                <StarRating rating={activity.rating} size="sm" />
              </div>

              <div className="bg-canvas rounded-2xl p-4 border border-border mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-accent" />
                  <span className="text-[12px] font-medium text-text-primary">Prochaine disponibilité</span>
                </div>
                <p className="text-[15px] font-display font-bold text-text-primary">
                  {new Date(activity.nextDate).toLocaleDateString('fr-FR', {
                    weekday: 'long', day: 'numeric', month: 'long'
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Users size={14} className="text-text-muted" />
                <span className="text-[13px] text-text-secondary">Âge : {activity.ageMin}–{activity.ageMax} ans</span>
              </div>

              {reserved ? (
                <div className="bg-accent-subtle border border-accent/20 rounded-2xl p-4 text-center mb-4">
                  <CheckCircle size={22} className="text-accent mx-auto mb-2" />
                  <p className="font-display font-bold text-[15px] text-text-primary">Demande envoyée !</p>
                  <p className="text-[12px] text-text-secondary mt-1">L'organisateur vous contactera sous 24h.</p>
                </div>
              ) : (
                <Button
                  fullWidth
                  size="lg"
                  onClick={() => setReserved(true)}
                  className="mb-3"
                >
                  Réserver cette activité
                </Button>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border text-[13px] font-medium transition-all duration-200 ${
                    liked ? 'bg-red-50 border-red-200 text-red-500' : 'border-border text-text-secondary hover:border-accent/30 hover:text-accent'
                  }`}
                >
                  <Heart size={14} className={liked ? 'fill-red-500' : ''} />
                  {liked ? 'Sauvegardé' : 'Sauvegarder'}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-border text-[13px] font-medium text-text-secondary hover:border-accent/30 hover:text-accent transition-all duration-200">
                  <Share2 size={14} />
                  Partager
                </button>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-5 border-t border-border">
                <Shield size={14} className="text-accent" />
                <p className="text-[12px] text-text-muted">Organisateur vérifié KIDIGO · Paiement sécurisé</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
