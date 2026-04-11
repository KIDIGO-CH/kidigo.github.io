'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './MagneticButton'
import { collection, stats } from '@/lib/data'

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  const imgX = useTransform(springX, [-600, 600], [-18, 18])
  const imgY = useTransform(springY, [-400, 400], [-12, 12])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-canvas">
      {/* Mesh gradient ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 10% 15%, rgba(30, 58, 138, 0.16) 0%, transparent 65%),
            radial-gradient(ellipse 50% 35% at 85% 75%, rgba(17, 24, 39, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 35% 25% at 45% 0%, rgba(96, 165, 250, 0.04) 0%, transparent 45%)
          `,
        }}
      />

      {/* Horizontal accent line — top */}
      <div className="absolute top-[60px] left-0 right-0 h-px bg-white/[0.04]" />

      {/* Main grid */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 min-h-[100dvh] grid grid-cols-1 md:grid-cols-[55fr_45fr]">

        {/* Left — Text column */}
        <div className="flex flex-col justify-center py-24 md:py-0 md:pr-10">

          {/* Drop badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, type: 'spring', stiffness: 100, damping: 20 }}
          >
            <span
              className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.28em] text-text-secondary uppercase px-3 py-1.5 border border-white/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-80" />
              Drop {collection.number} — {collection.season}
            </span>
          </motion.div>

          {/* FREEZ — massive */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              className="font-medium leading-[0.88] tracking-[-0.02em] uppercase text-text-primary"
              style={{ fontSize: 'clamp(4.5rem, 13vw, 14rem)' }}
              initial={{ y: '102%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, type: 'spring', stiffness: 70, damping: 18 }}
            >
              FREEZ
            </motion.h1>
          </div>

          {/* ICE AGE 02 */}
          <div className="overflow-hidden mb-10">
            <motion.div
              className="flex items-baseline gap-3"
              initial={{ y: '102%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, type: 'spring', stiffness: 70, damping: 18 }}
            >
              <span
                className="font-medium leading-none text-text-secondary uppercase"
                style={{ fontSize: 'clamp(1.6rem, 5vw, 6rem)' }}
              >
                ICE AGE
              </span>
              <span
                className="font-medium leading-none text-accent uppercase"
                style={{ fontSize: 'clamp(1.6rem, 5vw, 6rem)' }}
              >
                {collection.number}
              </span>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            className="text-[14px] text-text-secondary mb-10 max-w-[280px] leading-[1.7]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.62, type: 'spring', stiffness: 100, damping: 20 }}
          >
            {collection.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-5 mb-16"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.74, type: 'spring', stiffness: 100, damping: 20 }}
          >
            <MagneticButton>
              <button className="group flex items-center gap-3 bg-text-primary text-canvas text-[11px] tracking-[0.18em] uppercase px-7 py-[14px] hover:bg-accent transition-colors duration-300">
                Voir la collection
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <button className="text-[11px] tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-300 border-b border-transparent hover:border-white/20 pb-px">
                Lookbook
              </button>
            </MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex items-center gap-8 pt-8 border-t border-white/[0.06]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-[20px] font-medium text-text-primary tracking-tight leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-[0.2em] text-text-secondary uppercase">{stat.label}</p>
              </div>
            ))}
            <div className="h-7 w-px bg-white/10 mx-2" />
            <span className="text-[10px] tracking-[0.15em] text-text-muted uppercase">Édition limitée</span>
          </motion.div>
        </div>

        {/* Right — Featured product */}
        <motion.div
          className="hidden md:flex items-center justify-end relative py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="relative w-full max-w-[440px] h-[76vh]"
            style={{ x: imgX, y: imgY }}
          >
            {/* Image frame */}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <img
                src="https://source.unsplash.com/600x900/?streetwear,model,fashion,dark,minimal"
                alt="Freez ICE AGE 02 — pièce vedette"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(12%) contrast(1.05)' }}
              />

              {/* Bottom info overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5"
                style={{
                  background: 'linear-gradient(to top, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.5) 55%, transparent 100%)',
                }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.22em] text-text-secondary uppercase mb-1">À la une</p>
                    <p className="text-[15px] font-medium text-text-primary">Frost Shell Jacket</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">Gore-Tex 3 couches</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] tracking-[0.15em] text-text-secondary uppercase mb-1">Prix</p>
                    <p className="text-[16px] font-medium text-accent">349€</p>
                  </div>
                </div>
              </div>

              {/* Top badge */}
              <div className="absolute top-4 right-4">
                <span
                  className="text-[9px] tracking-[0.28em] uppercase px-2.5 py-1"
                  style={{
                    backgroundColor: 'rgba(96, 165, 250, 0.08)',
                    border: '1px solid rgba(96, 165, 250, 0.25)',
                    color: '#60A5FA',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  ICE AGE 02
                </span>
              </div>
            </div>

            {/* Left accent line */}
            <div className="absolute -left-5 top-[18%] bottom-[18%] w-px bg-gradient-to-b from-transparent via-accent/35 to-transparent" />

            {/* Floating material tag */}
            <motion.div
              className="absolute -bottom-5 left-4 px-4 py-3"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(8,8,8,0.75)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-[9px] tracking-[0.2em] text-text-secondary uppercase mb-0.5">Matière</p>
              <p className="text-[12px] font-medium text-text-primary">Gore-Tex 3 couches</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <span className="text-[9px] tracking-[0.32em] text-text-muted uppercase">Scroll</span>
        <div className="w-px h-7 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-white/40 to-transparent"
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
