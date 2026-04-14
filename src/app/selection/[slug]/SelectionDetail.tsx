'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowLeft, LocateFixed, ChevronDown } from 'lucide-react'
import { ActivityCard } from '@/components/search/ActivityCard'
import { activities } from '@/lib/data'
import type { Activity } from '@/lib/types'

const CITY_COORDS = [
  { name: 'Ma position', lat: 0, lng: 0, geo: true },
  { name: 'Estavayer-le-Lac', lat: 46.849, lng: 6.846 },
  { name: 'Fribourg', lat: 46.806, lng: 7.162 },
  { name: 'Lausanne', lat: 46.519, lng: 6.632 },
  { name: 'Genève', lat: 46.204, lng: 6.143 },
  { name: 'Neuchâtel', lat: 46.992, lng: 6.931 },
  { name: 'Montreux', lat: 46.431, lng: 6.911 },
  { name: 'Sion', lat: 46.233, lng: 7.360 },
  { name: 'Yverdon', lat: 46.778, lng: 6.641 },
  { name: 'Payerne', lat: 46.820, lng: 6.934 },
  { name: 'Moudon', lat: 46.669, lng: 6.798 },
]

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

interface SelectionInfo {
  title: string
  description: string
  filterFn: (a: Activity) => boolean
  limit: number
}

export const SELECTIONS: Record<string, SelectionInfo> = {
  'meilleurs-brunchs-kids-friendly': {
    title: 'Top 10 des meilleurs brunchs kids friendly',
    description: 'Les adresses testées et approuvées par les familles pour bruncher en toute tranquillité.',
    filterFn: (a) => a.category === 'Cafés-Restaurants kids friendly',
    limit: 10,
  },
  'fermes-pedagogiques': {
    title: 'Fermes pédagogiques à découvrir',
    description: 'Les plus belles fermes de Suisse romande où vos enfants peuvent nourrir les animaux et découvrir la vie agricole.',
    filterFn: (a) => a.category === 'Animaux' || a.tags.some(t => t.toLowerCase().includes('ferme') || t.toLowerCase().includes('animaux')),
    limit: 10,
  },
  'vide-greniers-brocantes-enfants': {
    title: 'Les meilleurs vide-greniers et brocantes pour enfants',
    description: 'Jouets, vêtements, livres — les brocantes dédiées à l\'enfant pour faire de bonnes affaires.',
    filterFn: (a) => a.category === 'Sorties famille' || a.tags.some(t => t.toLowerCase().includes('brocante') || t.toLowerCase().includes('marché')),
    limit: 10,
  },
  'plus-belles-places-de-jeux': {
    title: 'Les plus belles places de jeux de la région',
    description: 'Des aires de jeux originales, sécurisées et gratuites pour laisser vos enfants s\'amuser en plein air.',
    filterFn: (a) => a.category === 'Parcs / Places de jeux' || a.tags.some(t => t.toLowerCase().includes('parc') || t.toLowerCase().includes('jeux')),
    limit: 10,
  },
  'piscines-parcs-aquatiques-enfants': {
    title: 'Piscines et parcs aquatiques pour enfants',
    description: 'Les meilleures piscines avec pataugeoires, toboggans et espaces bébés de Suisse romande.',
    filterFn: (a) => a.category === 'Piscine' || a.tags.some(t => t.toLowerCase().includes('piscine') || t.toLowerCase().includes('aqua')),
    limit: 10,
  },
  'musees-gratuits-familles': {
    title: 'Musées gratuits ou à petit prix pour les familles',
    description: 'Culture et découvertes sans se ruiner — notre sélection de musées accessibles avec des enfants.',
    filterFn: (a) => a.category === 'Musées enfants' || a.category === 'Science',
    limit: 10,
  },
  'balades-faciles-poussette': {
    title: 'Balades faciles avec poussette',
    description: 'Des itinéraires accessibles et agréables pour se promener en famille, même avec les tout-petits.',
    filterFn: (a) => a.category === 'Balades kids friendly' || a.tags.some(t => t.toLowerCase().includes('balade') || t.toLowerCase().includes('randonnée')),
    limit: 10,
  },
  'anniversaires-originaux': {
    title: 'Anniversaires originaux : nos meilleures idées',
    description: 'Des lieux et activités pour organiser un anniversaire mémorable sans stress.',
    filterFn: (a) => a.category === 'Anniversaires',
    limit: 10,
  },
  'stages-vacances-incontournables': {
    title: 'Stages vacances incontournables',
    description: 'Les stages créatifs, sportifs et nature les mieux notés pour occuper vos enfants pendant les vacances.',
    filterFn: (a) => a.category === 'Stages vacances',
    limit: 10,
  },
}

export function SelectionDetail({ slug }: { slug: string }) {
  const selection = SELECTIONS[slug]

  const [userLat, setUserLat] = useState<number | null>(null)
  const [userLng, setUserLng] = useState<number | null>(null)
  const [locationName, setLocationName] = useState<string | null>(null)
  const [locating, setLocating] = useState(false)
  const [showCityPicker, setShowCityPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const selectCity = (city: typeof CITY_COORDS[0]) => {
    setShowCityPicker(false)
    if (city.geo) {
      locateUser()
    } else {
      setUserLat(city.lat)
      setUserLng(city.lng)
      setLocationName(city.name)
    }
  }

  const locateUser = () => {
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setUserLat(pos.coords.latitude)
        setUserLng(pos.coords.longitude)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&zoom=10&accept-language=fr`
          )
          const data = await res.json()
          setLocationName(data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'votre région')
        } catch {
          setLocationName('votre région')
        }
        setLocating(false)
      },
      () => {
        setUserLat(46.849)
        setUserLng(6.846)
        setLocationName('Estavayer-le-Lac')
        setLocating(false)
      },
      { enableHighAccuracy: false, timeout: 6000 }
    )
  }

  useEffect(() => { locateUser() }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setShowCityPicker(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayActivities = useMemo(() => {
    if (!selection) return []

    let result = activities.filter(selection.filterFn)

    if (userLat !== null && userLng !== null) {
      result.sort((a, b) =>
        haversineKm(userLat, userLng, a.lat, a.lng) - haversineKm(userLat, userLng, b.lat, b.lng)
      )
    } else {
      result.sort((a, b) => b.rating - a.rating)
    }

    // If few matches, pad with top-rated nearby activities
    if (result.length < 4) {
      const topRated = [...activities]
        .filter(a => !result.find(f => f.id === a.id))
      if (userLat !== null && userLng !== null) {
        topRated.sort((a, b) =>
          haversineKm(userLat!, userLng!, a.lat, a.lng) - haversineKm(userLat!, userLng!, b.lat, b.lng)
        )
      } else {
        topRated.sort((a, b) => b.rating - a.rating)
      }
      result = [...result, ...topRated]
    }

    return result.slice(0, selection.limit)
  }, [selection, userLat, userLng])

  if (!selection) {
    return (
      <div className="min-h-[100dvh] bg-canvas pt-28 flex flex-col items-center justify-center text-center px-6">
        <p className="text-5xl mb-6">🔍</p>
        <h1 className="font-display font-bold text-[22px] text-text-primary mb-3">Sélection introuvable</h1>
        <Link href="/selection" className="text-accent text-[14px] font-medium hover:underline">← Retour aux sélections</Link>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-canvas pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10">

        <Link href="/selection" className="inline-flex items-center gap-1.5 text-[13px] text-text-muted hover:text-accent transition-colors mb-6">
          <ArrowLeft size={14} /> Toutes les sélections
        </Link>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <h1
            className="font-display font-black text-text-primary leading-tight mb-3"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
          >
            {selection.title}
          </h1>
          <p className="text-[15px] text-text-secondary max-w-xl mb-4">{selection.description}</p>

          <div className="flex items-center gap-3">
            <div className="relative" ref={pickerRef}>
              <button
                onClick={() => setShowCityPicker(!showCityPicker)}
                className="flex items-center gap-1.5 text-[13px] text-accent font-medium hover:text-accent-dark transition-colors"
              >
                <MapPin size={14} />
                {locating ? (
                  <span className="text-text-muted">Localisation en cours…</span>
                ) : locationName ? (
                  <span>Résultats près de {locationName}</span>
                ) : (
                  <span className="text-text-muted">Choisir un lieu</span>
                )}
                <ChevronDown size={12} />
              </button>
              {showCityPicker && (
                <div className="absolute top-full left-0 mt-1 bg-elevated rounded-xl border border-border shadow-card-hover z-50 py-1 min-w-[200px] max-h-[240px] overflow-y-auto">
                  {CITY_COORDS.map(c => (
                    <button
                      key={c.name}
                      onClick={() => selectCity(c)}
                      className={`w-full text-left px-3 py-2 text-[13px] hover:bg-accent-subtle transition-colors flex items-center gap-2 ${
                        locationName === c.name ? 'text-accent font-medium' : 'text-text-primary'
                      }`}
                    >
                      {c.geo && <LocateFixed size={12} className="text-accent" />}
                      {!c.geo && <MapPin size={12} className="text-text-muted" />}
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {displayActivities.map((activity, i) => (
            <ActivityCard key={activity.id} activity={activity} index={i} />
          ))}
        </div>

        {displayActivities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-4xl mb-4">📍</p>
            <p className="font-display font-bold text-[18px] text-text-primary mb-2">Aucun résultat pour le moment</p>
            <p className="text-[14px] text-text-secondary">Nous enrichissons cette sélection régulièrement. Revenez bientôt !</p>
          </div>
        )}
      </div>
    </div>
  )
}
