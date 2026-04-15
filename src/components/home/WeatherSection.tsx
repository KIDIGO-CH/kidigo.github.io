'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, ChevronDown, CloudSun } from 'lucide-react'

type HourForecast = {
  hour: string
  temp: number
  icon: string
  isCurrent?: boolean
}

type WeatherData = {
  temperature: number
  description: string
  icon: string
  tempMin: number
  tempMax: number
  dayName: string
  dateStr: string
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

    const hourly: HourForecast[] = []
    if (data.hourly) {
      for (let h = 0; h < 24; h += 3) {
        const hInfo = getWeatherInfo(data.hourly.weathercode[h])
        hourly.push({
          hour: `${String(h).padStart(2, '0')}:00`,
          temp: Math.round(data.hourly.temperature_2m[h]),
          icon: hInfo.icon,
          isCurrent: h <= currentHour && currentHour < h + 3,
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
      dateStr: now.toLocaleDateString('fr-CH', { day: 'numeric', month: 'long' }),
      hourly,
    }
  } catch {
    return null
  }
}

export function WeatherSection() {
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
      () => loadWeatherForCoords(46.849, 6.846, 'Estavayer-le-Lac'),
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
    if (c.geo) loadGeo()
    else loadWeatherForCoords(c.lat, c.lng, c.name)
  }

  if (loading) return null

  if (!weather) return null

  return (
    <section className="hidden lg:block py-6 bg-canvas">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div
          className="rounded-3xl relative overflow-hidden border border-white/40 shadow-card"
          style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(147, 197, 253, 0.06) 40%, rgba(255, 255, 255, 0.30) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)',
            }}
          />

          <div className="relative z-10 flex items-center gap-8 px-8 py-5">
            {/* Left: current weather */}
            <div className="flex items-center gap-5 flex-shrink-0">
              <span className="text-[48px] leading-none drop-shadow-sm">{weather.icon}</span>
              <div>
                <div className="flex items-baseline gap-3 mb-0.5">
                  <p className="font-display font-bold text-[32px] text-text-primary leading-none">{weather.temperature}°C</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-sky-600/80 font-semibold bg-white/30 rounded-full px-2 py-0.5">↓ {weather.tempMin}°</span>
                    <span className="text-[12px] text-rose-500/80 font-semibold bg-white/30 rounded-full px-2 py-0.5">↑ {weather.tempMax}°</span>
                  </div>
                </div>
                <p className="text-[13px] text-text-secondary/80 font-medium">{weather.description}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-14 bg-white/30 flex-shrink-0" />

            {/* Center: day + city */}
            <div className="flex flex-col gap-1 flex-shrink-0">
              <p className="text-[12px] font-semibold text-sky-600/80 uppercase tracking-wide">{weather.dayName} {weather.dateStr}</p>
              <div className="relative" ref={pickerRef}>
                <button
                  onClick={() => setShowPicker(!showPicker)}
                  className="flex items-center gap-1.5 text-[13px] text-sky-700/70 hover:text-sky-800 font-medium backdrop-blur-sm bg-white/30 rounded-full px-3 py-1 border border-white/40 transition-colors"
                >
                  <MapPin size={12} />
                  <span>{city || 'Localiser'}</span>
                  <ChevronDown size={12} />
                </button>
                {showPicker && (
                  <div className="absolute top-full left-0 mt-1 rounded-xl border border-white/50 shadow-card-hover z-50 py-1 min-w-[180px] max-h-[240px] overflow-y-auto"
                    style={{
                      background: 'rgba(255,255,255,0.90)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                  >
                    {CITIES.map(c => (
                      <button
                        key={c.name}
                        onClick={() => selectCity(c)}
                        className={`w-full text-left px-3 py-2 text-[13px] hover:bg-sky-100/50 transition-colors ${
                          city === c.name ? 'text-sky-600 font-medium' : 'text-text-primary'
                        }`}
                      >
                        {c.geo && <MapPin size={11} className="inline mr-1.5" />}
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-14 bg-white/30 flex-shrink-0" />

            {/* Right: hourly forecast */}
            <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {weather.hourly.map(h => (
                <div
                  key={h.hour}
                  className={`flex flex-col items-center flex-shrink-0 w-[52px] py-2 rounded-xl transition-colors ${
                    h.isCurrent
                      ? 'bg-white/50 shadow-sm ring-1 ring-sky-300/50'
                      : 'hover:bg-white/20'
                  }`}
                >
                  <span className={`text-[11px] leading-none mb-1 ${h.isCurrent ? 'text-sky-700 font-semibold' : 'text-text-muted'}`}>
                    {h.hour.replace(':00', 'h')}
                  </span>
                  <span className="text-[18px] leading-none my-0.5">{h.icon}</span>
                  <span className={`text-[12px] leading-none font-semibold mt-1 ${h.isCurrent ? 'text-sky-700' : 'text-text-primary'}`}>{h.temp}°</span>
                </div>
              ))}
            </div>

            {/* Kidigo tip */}
            <div className="flex-shrink-0 bg-white/30 rounded-2xl px-4 py-3 border border-white/30 max-w-[180px]">
              <div className="flex items-center gap-1.5 mb-1">
                <CloudSun size={14} className="text-sky-600" />
                <span className="text-[11px] font-semibold text-sky-700">Conseil Kidigo</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-snug">
                {weather.temperature >= 20
                  ? 'Idéal pour les activités en plein air !'
                  : weather.temperature >= 10
                  ? 'Pensez à prévoir une petite veste pour les enfants.'
                  : 'Parfait pour les activités en intérieur !'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
