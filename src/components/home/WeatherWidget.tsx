'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'

type HourForecast = {
  hour: string
  temp: number
  icon: string
}

type WeatherData = {
  temperature: number
  description: string
  icon: string
  tempMin: number
  tempMax: number
  dayName: string
  hourly: HourForecast[]
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

const CITIES = [
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

const DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

function getWeatherInfo(code: number) {
  return WMO_CODES[code] || { desc: 'Inconnu', icon: '🌡️' }
}

async function fetchWeather(lat: number, lng: number): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Zurich&forecast_days=1`
    )
    const data = await res.json()
    const cw = data.current_weather
    const info = getWeatherInfo(cw.weathercode)

    const now = new Date()
    const currentHour = now.getHours()

    // Build hourly forecast: every 3h from now through end of day
    const hourly: HourForecast[] = []
    if (data.hourly) {
      for (let h = currentHour; h < 24; h += 3) {
        const hInfo = getWeatherInfo(data.hourly.weathercode[h])
        hourly.push({
          hour: `${h}h`,
          temp: Math.round(data.hourly.temperature_2m[h]),
          icon: hInfo.icon,
        })
      }
    }

    return {
      temperature: Math.round(cw.temperature),
      description: info.desc,
      icon: info.icon,
      tempMin: data.daily ? Math.round(data.daily.temperature_2m_min[0]) : Math.round(cw.temperature) - 3,
      tempMax: data.daily ? Math.round(data.daily.temperature_2m_max[0]) : Math.round(cw.temperature) + 3,
      dayName: DAY_NAMES[now.getDay()],
      hourly,
    }
  } catch {
    return null
  }
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const loadWeatherForCoords = async (lat: number, lng: number, cityName?: string) => {
    setLoading(true)
    const data = await fetchWeather(lat, lng)
    if (data) setWeather(data)
    if (cityName) setCity(cityName)
    setLoading(false)
  }

  const loadGeo = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        await loadWeatherForCoords(latitude, longitude)
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10&accept-language=fr`
          )
          const geoData = await geoRes.json()
          setCity(geoData.address?.city || geoData.address?.town || geoData.address?.village || 'Ma position')
        } catch {
          setCity('Ma position')
        }
      },
      () => {
        loadWeatherForCoords(46.849, 6.846, 'Estavayer-le-Lac')
      },
      { enableHighAccuracy: false, timeout: 6000 }
    )
  }

  useEffect(() => { loadGeo() }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setShowPicker(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectCity = (c: typeof CITIES[0]) => {
    setShowPicker(false)
    if (c.geo) {
      loadGeo()
    } else {
      loadWeatherForCoords(c.lat, c.lng, c.name)
    }
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 flex flex-col p-4 sm:p-5 shadow-card relative overflow-hidden h-full">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-3xl">🌤️</div>
        </div>
      ) : weather ? (
        <>
          {/* Header: day + city picker */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-sky-500 uppercase tracking-wide">{weather.dayName}</p>
            <div className="relative" ref={pickerRef}>
              <button
                onClick={() => setShowPicker(!showPicker)}
                className="flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-700 font-medium"
              >
                <MapPin size={10} />
                {city || 'Localiser'}
                <ChevronDown size={10} />
              </button>
              {showPicker && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-xl border border-border shadow-card-hover z-50 py-1 min-w-[160px] max-h-[200px] overflow-y-auto">
                  {CITIES.map(c => (
                    <button
                      key={c.name}
                      onClick={() => selectCity(c)}
                      className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-sky-50 transition-colors ${
                        city === c.name ? 'text-sky-600 font-medium' : 'text-text-primary'
                      }`}
                    >
                      {c.geo && <MapPin size={10} className="inline mr-1" />}
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Current weather */}
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl leading-none">{weather.icon}</span>
            <div>
              <p className="font-display font-bold text-[24px] text-text-primary leading-none">{weather.temperature}°C</p>
              <p className="text-[11px] text-text-secondary mt-0.5">{weather.description}</p>
            </div>
          </div>

          {/* Min / Max */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] text-sky-600 font-medium">↓ {weather.tempMin}°</span>
            <span className="text-[11px] text-red-400 font-medium">↑ {weather.tempMax}°</span>
          </div>

          {/* Hourly forecast */}
          {weather.hourly.length > 0 && (
            <div className="flex gap-1 mt-auto overflow-x-auto">
              {weather.hourly.map(h => (
                <div key={h.hour} className="flex flex-col items-center min-w-[40px] py-1.5 px-1 rounded-xl bg-white/50">
                  <span className="text-[10px] text-text-muted">{h.hour}</span>
                  <span className="text-sm leading-none my-0.5">{h.icon}</span>
                  <span className="text-[10px] font-medium text-text-primary">{h.temp}°</span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
