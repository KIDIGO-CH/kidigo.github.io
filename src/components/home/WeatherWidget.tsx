'use client'

import { useState, useEffect } from 'react'
import { CloudSun } from 'lucide-react'

type WeatherData = {
  temperature: number
  weatherCode: number
  description: string
  icon: string
}

const WMO_CODES: Record<number, { desc: string; icon: string }> = {
  0: { desc: 'Ciel dégagé', icon: '☀️' },
  1: { desc: 'Peu nuageux', icon: '🌤️' },
  2: { desc: 'Partiellement nuageux', icon: '⛅' },
  3: { desc: 'Couvert', icon: '☁️' },
  45: { desc: 'Brouillard', icon: '🌫️' },
  48: { desc: 'Brouillard givrant', icon: '🌫️' },
  51: { desc: 'Bruine légère', icon: '🌦️' },
  53: { desc: 'Bruine', icon: '🌦️' },
  55: { desc: 'Bruine dense', icon: '🌧️' },
  61: { desc: 'Pluie légère', icon: '🌦️' },
  63: { desc: 'Pluie', icon: '🌧️' },
  65: { desc: 'Forte pluie', icon: '🌧️' },
  71: { desc: 'Neige légère', icon: '🌨️' },
  73: { desc: 'Neige', icon: '❄️' },
  75: { desc: 'Forte neige', icon: '❄️' },
  80: { desc: 'Averses', icon: '🌦️' },
  81: { desc: 'Fortes averses', icon: '🌧️' },
  82: { desc: 'Averses violentes', icon: '⛈️' },
  95: { desc: 'Orage', icon: '⛈️' },
}

function getWeatherInfo(code: number) {
  return WMO_CODES[code] || { desc: 'Inconnu', icon: '🌡️' }
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Europe/Zurich`
          )
          const data = await res.json()
          const cw = data.current_weather
          const info = getWeatherInfo(cw.weathercode)
          setWeather({
            temperature: Math.round(cw.temperature),
            weatherCode: cw.weathercode,
            description: info.desc,
            icon: info.icon,
          })

          // Reverse geocode for city name
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10&accept-language=fr`
            )
            const geoData = await geoRes.json()
            setCity(geoData.address?.city || geoData.address?.town || geoData.address?.village || '')
          } catch { /* ignore */ }
        } catch { /* ignore */ }
        setLoading(false)
      },
      () => setLoading(false),
      { enableHighAccuracy: false, timeout: 6000 }
    )
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-elevated/60 rounded-2xl px-4 py-2.5 border border-border animate-pulse">
        <CloudSun size={16} className="text-text-muted" />
        <span className="text-[12px] text-text-muted">Chargement météo…</span>
      </div>
    )
  }

  if (!weather) return null

  return (
    <div className="flex items-center gap-2.5 bg-elevated/80 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-border">
      <span className="text-xl leading-none">{weather.icon}</span>
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-text-primary leading-tight">
          {weather.temperature}°C · {weather.description}
        </span>
        {city && <span className="text-[11px] text-text-muted leading-tight">{city}</span>}
      </div>
    </div>
  )
}
