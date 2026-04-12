'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import type { Product } from '@/lib/data'

interface ProductCardProps {
  product: Product
  index: number
  aspectRatio?: string
}

export default function ProductCard({ product, index, aspectRatio = '3/4' }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [7, -7]), {
    stiffness: 100,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-7, 7]), {
    stiffness: 100,
    damping: 20,
  })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    },
    [mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden w-full h-full cursor-pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        border: '1px solid rgba(255,255,255,0.06)',
        aspectRatio,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 80, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      {imgError ? (
        <div className="absolute inset-0 bg-surface flex items-center justify-center">
          <p className="text-[11px] tracking-[0.2em] text-text-muted uppercase">Image indisponible</p>
        </div>
      ) : (
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            filter: product.isSoldOut ? 'grayscale(75%) brightness(0.7)' : 'grayscale(12%) contrast(1.03)',
          }}
          onError={() => setImgError(true)}
        />
      )}

      {/* Base gradient — always visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.18) 45%, transparent 70%)',
        }}
      />

      {/* Hover inner glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: hovered
            ? 'inset 0 0 0 1px rgba(96,165,250,0.22)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.0)',
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span
            className="text-[9px] tracking-[0.22em] uppercase px-2 py-[3px]"
            style={{
              background: 'rgba(96,165,250,0.12)',
              border: '1px solid rgba(96,165,250,0.38)',
              color: '#60A5FA',
            }}
          >
            Nouveau
          </span>
        )}
        {product.isSoldOut && (
          <span
            className="text-[9px] tracking-[0.22em] uppercase px-2 py-[3px]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Épuisé
          </span>
        )}
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <div className="flex items-end justify-between mb-2.5">
          <div>
            <p className="text-[10px] tracking-[0.18em] text-text-secondary uppercase mb-0.5">
              {product.category}
            </p>
            <p className="text-[13px] font-medium text-text-primary leading-snug">{product.name}</p>
          </div>
          <p className="text-[14px] font-medium text-text-primary">
            {product.isSoldOut ? (
              <span className="line-through text-text-muted">{product.price}€</span>
            ) : (
              `${product.price}€`
            )}
          </p>
        </div>

        {/* Size picker — reveal on hover */}
        <motion.div
          className="overflow-hidden"
          animate={{
            height: (hovered || isMobile) && !product.isSoldOut ? 'auto' : 0,
            opacity: (hovered || isMobile) && !product.isSoldOut ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-white/10">
            <span className="text-[9px] tracking-[0.18em] text-text-secondary uppercase mr-1">Taille</span>
            {product.sizes.map((size) => (
              <button
                key={size}
                className="text-[9px] tracking-wide border border-white/12 hover:border-accent/50 hover:text-accent px-3 py-2.5 min-h-[44px] transition-all duration-200 text-text-secondary"
              >
                {size}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sold out message */}
        {product.isSoldOut && (
          <div className="pt-2.5 border-t border-white/10">
            <p className="text-[9px] tracking-[0.18em] text-text-secondary uppercase">
              Rupture — Drop 03 à venir
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
