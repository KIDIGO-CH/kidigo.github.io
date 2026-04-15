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
          <div className="p-3 sm:p-4">
            {/* Category + age */}
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-medium text-accent tracking-wide uppercase truncate">
                {activity.category}
              </span>
              <div className="flex items-center gap-1 text-text-secondary flex-shrink-0 ml-1">
                <Users size={10} className="sm:w-[11px] sm:h-[11px]" />
                <span className="text-[10px] sm:text-[11px]">{activity.ageLabel}</span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-display font-bold text-[13px] sm:text-[15px] text-text-primary leading-snug mb-1.5 sm:mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
              {activity.name}
            </h3>

            {/* Location + duration */}
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex items-center gap-1 text-text-secondary min-w-0">
                <MapPin size={10} className="flex-shrink-0 sm:w-[11px] sm:h-[11px]" />
                <span className="text-[11px] sm:text-[12px] truncate">{activity.city}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-text-secondary">
                <Clock size={11} />
                <span className="text-[12px]">{activity.duration}</span>
              </div>
            </div>

            {/* Rating */}
            <StarRating rating={activity.rating} reviewCount={activity.reviewCount} className="mb-2 sm:mb-3" />

            {/* Price + slots */}
            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border">
              <div>
                <span className="text-[14px] sm:text-[16px] font-bold text-text-primary font-display">{activity.price} CHF</span>
                <span className="hidden sm:inline text-[11px] text-text-secondary ml-1">/ séance</span>
              </div>
              {activity.availableSlots <= 5 && (
                <span className="text-[10px] sm:text-[11px] text-amber-600 font-medium bg-amber-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                  {activity.availableSlots} place{activity.availableSlots > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
