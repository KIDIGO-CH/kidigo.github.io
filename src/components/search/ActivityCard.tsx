'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Heart, Wifi, WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import type { Activity } from '@/lib/types'

interface ActivityCardProps {
  activity: Activity
  index?: number
}

export function ActivityCard({ activity, index = 0 }: ActivityCardProps) {
  const [liked, setLiked] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: index * 0.05 }}
    >
      <Link href={`/activite/${activity.slug}`} className="group block">
        <div className="bg-elevated rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">

          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/3]">
            {imgError ? (
              <div className="absolute inset-0 bg-surface flex items-center justify-center">
                <span className="text-text-muted text-[13px]">Image indisponible</span>
              </div>
            ) : (
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            )}

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {activity.isCoupDeCoeur && (
                <Badge variant="accent" size="sm">❤️ Coup de cœur</Badge>
              )}
              {activity.isNew && (
                <Badge variant="accent" size="sm">Nouveau</Badge>
              )}
            </div>

            {/* Favorite */}
            <motion.button
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
              onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Heart
                size={14}
                className={liked ? 'text-red-500 fill-red-500' : 'text-text-secondary'}
              />
            </motion.button>

            {/* Indoor/outdoor */}
            <div className="absolute bottom-3 right-3">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                {activity.isIndoor ? (
                  <Wifi size={11} className="text-accent" />
                ) : (
                  <WifiOff size={11} className="text-accent" />
                )}
                <span className="text-[10px] font-medium text-text-primary">
                  {activity.isIndoor ? 'Intérieur' : 'Extérieur'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category + age */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-accent tracking-wide uppercase">
                {activity.category}
              </span>
              <div className="flex items-center gap-1 text-text-secondary">
                <Users size={11} />
                <span className="text-[11px]">{activity.ageLabel}</span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-display font-bold text-[15px] text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
              {activity.name}
            </h3>

            {/* Location + duration */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1 text-text-secondary">
                <MapPin size={11} />
                <span className="text-[12px]">{activity.city} · {activity.district}</span>
              </div>
              <div className="flex items-center gap-1 text-text-secondary">
                <Clock size={11} />
                <span className="text-[12px]">{activity.duration}</span>
              </div>
            </div>

            {/* Rating */}
            <StarRating rating={activity.rating} reviewCount={activity.reviewCount} className="mb-3" />

            {/* Price + slots */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <span className="text-[16px] font-bold text-text-primary font-display">{activity.price}€</span>
                <span className="text-[11px] text-text-secondary ml-1">/ séance</span>
              </div>
              {activity.availableSlots <= 5 && (
                <span className="text-[11px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                  {activity.availableSlots} place{activity.availableSlots > 1 ? 's' : ''} restante{activity.availableSlots > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
