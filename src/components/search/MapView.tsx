'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Clock, Star, Locate } from 'lucide-react'
import { categories } from '@/lib/data'
import type { Activity } from '@/lib/types'

import 'leaflet/dist/leaflet.css'

const CATEGORY_COLORS: Record<string, string> = {}
const CATEGORY_ICONS: Record<string, string> = {}
categories.forEach(c => {
  CATEGORY_COLORS[c.name] = c.color
  CATEGORY_ICONS[c.name] = c.icon
})

function createCategoryIcon(category: string) {
  const color = CATEGORY_COLORS[category] || '#FF6B52'
  const emoji = CATEGORY_ICONS[category] || '📍'
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 38px;
      height: 38px;
      background: ${color};
      border: 3px solid #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 1;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      cursor: pointer;
    ">${emoji}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -22],
  })
}

function createUserIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 18px;
      height: 18px;
      background: #4285F4;
      border: 3px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 0 6px rgba(66,133,244,0.2), 0 2px 6px rgba(0,0,0,0.2);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

function FitBounds({ activities }: { activities: Activity[] }) {
  const map = useMap()

  useEffect(() => {
    if (activities.length === 0) return
    const bounds = L.latLngBounds(activities.map(a => [a.lat, a.lng]))
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 })
  }, [activities, map])

  return null
}

function GeolocateControl({ onLocate }: { onLocate: (lat: number, lng: number) => void }) {
  const map = useMap()

  const handleClick = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        map.flyTo([latitude, longitude], 12, { duration: 1.2 })
        onLocate(latitude, longitude)
      },
      () => {},
      { enableHighAccuracy: true }
    )
  }

  return (
    <button
      onClick={handleClick}
      className="absolute top-3 right-3 z-[1000] w-10 h-10 bg-white rounded-xl shadow-card-hover flex items-center justify-center hover:bg-surface transition-colors"
      title="Ma position"
    >
      <Locate size={18} className="text-text-primary" />
    </button>
  )
}

interface MapViewProps {
  activities: Activity[]
}

export function MapView({ activities }: MapViewProps) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null)

  const center = useMemo(() => {
    if (activities.length === 0) return [46.8, 6.6] as [number, number]
    const avgLat = activities.reduce((s, a) => s + a.lat, 0) / activities.length
    const avgLng = activities.reduce((s, a) => s + a.lng, 0) / activities.length
    return [avgLat, avgLng] as [number, number]
  }, [activities])

  return (
    <div className="relative w-full h-[calc(100dvh-200px)] rounded-3xl overflow-hidden border border-border shadow-card">
      <MapContainer
        center={center}
        zoom={6}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds activities={activities} />
        <GeolocateControl onLocate={(lat, lng) => setUserPos([lat, lng])} />
        {userPos && (
          <Marker position={userPos} icon={createUserIcon()} />
        )}
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            position={[activity.lat, activity.lng]}
            icon={createCategoryIcon(activity.category)}
          >
            <Popup closeButton={false} className="kidigo-popup">
              <Link
                href={`/activite/${activity.slug}`}
                className="block w-[260px] no-underline"
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-[130px] object-cover"
                  />
                  <div className="p-3">
                    <span
                      className="text-[10px] font-medium uppercase tracking-wide"
                      style={{ color: CATEGORY_COLORS[activity.category] }}
                    >
                      {activity.category}
                    </span>
                    <h3 className="font-bold text-[14px] text-[#1A1A18] leading-snug mt-1 mb-1.5">
                      {activity.name}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-[#71706C] mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} />
                        {activity.city} · {activity.district}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {activity.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-[12px] font-semibold text-[#1A1A18]">{activity.rating}</span>
                        <span className="text-[11px] text-[#71706C]">({activity.reviewCount})</span>
                      </div>
                      <span className="text-[12px] text-[#71706C]">{activity.ageLabel}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
