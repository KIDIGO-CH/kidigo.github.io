'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Clock, Star } from 'lucide-react'
import type { Activity } from '@/lib/types'

import 'leaflet/dist/leaflet.css'

function createPriceIcon(price: number, isCoupDeCoeur: boolean) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background: ${isCoupDeCoeur ? '#FF6B52' : '#fff'};
      color: ${isCoupDeCoeur ? '#fff' : '#1A1A18'};
      border: 2px solid ${isCoupDeCoeur ? '#FF6B52' : '#d1d5db'};
      border-radius: 9999px;
      padding: 4px 10px;
      font-size: 13px;
      font-weight: 700;
      font-family: var(--font-display), system-ui, sans-serif;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      cursor: pointer;
      transition: transform 0.15s ease;
    ">${price} CHF</div>`,
    iconSize: [0, 0],
    iconAnchor: [28, 16],
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

interface MapViewProps {
  activities: Activity[]
}

export function MapView({ activities }: MapViewProps) {
  const center = useMemo(() => {
    if (activities.length === 0) return [46.8, 2.3] as [number, number]
    const avgLat = activities.reduce((s, a) => s + a.lat, 0) / activities.length
    const avgLng = activities.reduce((s, a) => s + a.lng, 0) / activities.length
    return [avgLat, avgLng] as [number, number]
  }, [activities])

  return (
    <div className="w-full h-[calc(100dvh-200px)] rounded-3xl overflow-hidden border border-border shadow-card">
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
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            position={[activity.lat, activity.lng]}
            icon={createPriceIcon(activity.price, activity.isCoupDeCoeur)}
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
                    <span className="text-[10px] font-medium text-[#FF6B52] uppercase tracking-wide">
                      {activity.category}
                    </span>
                    <h3 className="font-bold text-[14px] text-[#1A1A18] leading-snug mt-1 mb-1.5">
                      {activity.name}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-[#6B7280] mb-2">
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
                        <span className="text-[11px] text-[#6B7280]">({activity.reviewCount})</span>
                      </div>
                      <span className="text-[14px] font-bold text-[#1A1A18]">{activity.price} CHF</span>
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
