'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { stats } from '@/lib/data'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20

      el.style.setProperty('--mouse-x', `${x}px`)
      el.style.setProperty('--mouse-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col justify-end pb-16 px-4 md:px-8 pt-24"
    >
      {/* Ambient light spot */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          transform: 'translate(var(--mouse-x, 0px), var(--mouse-y, 0px))',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto w-full">
        {/* Drop indicator */}
        <div className="flex items-center gap-3 mb-10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">
            Drop actif — Ice Age 01
          </span>
        </div>

        {/* Main grid — asymétrique */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
          {/* Title block */}
          <div>
            <h1
              className="font-bold uppercase leading-[0.9] tracking-[-0.04em] mb-8"
              style={{ fontSize: 'clamp(4rem, 13vw, 14rem)' }}
            >
              <span
                className="block animate-fade-up"
                style={{ animationDelay: '0ms' }}
              >
                Never
              </span>
              <span
                className="block text-accent animate-fade-up"
                style={{ animationDelay: '80ms' }}
              >
                Warm.
              </span>
            </h1>

            <p
              className="text-text-secondary max-w-md text-lg leading-relaxed mb-10 animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              Collections capsule. Édition limitée.
              Jamais deux fois le même drop.
            </p>

            <div
              className="flex items-center gap-4 animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <a
                href="#collection"
                className="
                  group flex items-center gap-3 px-6 py-3
                  bg-accent text-white font-medium text-sm tracking-wide
                  rounded-full transition-all duration-200
                  hover:bg-blue-400 active:scale-[0.98]
                "
              >
                Voir la collection
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#about"
                className="px-6 py-3 text-sm text-text-secondary border border-border rounded-full hover:border-border-strong hover:text-text-primary transition-all duration-200"
              >
                Notre ADN
              </a>
            </div>
          </div>

          {/* Stats — colonne droite */}
          <div
            className="hidden md:flex flex-col gap-8 pb-2 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-right">
                <p className="text-4xl font-bold tracking-[-0.04em] text-text-primary font-mono">
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted tracking-widest uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex items-center gap-3 mt-16 text-text-muted animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="w-px h-8 bg-border-strong" />
          <span className="text-xs font-mono tracking-widest uppercase">Défiler</span>
        </div>
      </div>
    </section>
  )
}
