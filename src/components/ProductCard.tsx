'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/lib/data'

type ProductCardProps = {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl bg-surface card-inner-border aspect-[3/4] mb-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-accent text-white rounded-full">
              New
            </span>
          )}
          {product.isSoldOut && (
            <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-elevated text-text-muted border border-border rounded-full">
              Épuisé
            </span>
          )}
        </div>

        {/* Image */}
        {imageError ? (
          /* Error state */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-elevated">
            <div className="w-8 h-8 rounded-full bg-border" />
            <p className="text-xs text-text-muted font-mono">Image indisponible</p>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`
              object-cover transition-transform duration-700
              ${hovered && !product.isSoldOut ? 'scale-105' : 'scale-100'}
              ${product.isSoldOut ? 'opacity-40 grayscale' : ''}
            `}
            onError={() => setImageError(true)}
          />
        )}

        {/* Hover overlay — size picker */}
        {!product.isSoldOut && (
          <div
            className={`
              absolute inset-x-0 bottom-0 p-4
              bg-gradient-to-t from-canvas/90 to-transparent
              transition-opacity duration-300
              ${hovered ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {product.size.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`
                    px-3 py-1.5 text-xs font-mono tracking-wide
                    rounded-full border transition-all duration-150
                    ${selectedSize === s
                      ? 'bg-accent border-accent text-white'
                      : 'border-border text-text-secondary hover:border-border-strong hover:text-text-primary bg-elevated/80 backdrop-blur-sm'
                    }
                  `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-text-muted font-mono tracking-widest uppercase mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-text-primary tracking-tight leading-snug group-hover:text-accent transition-colors duration-200">
            {product.name}
          </h3>
        </div>
        <p className="font-mono text-sm text-text-secondary whitespace-nowrap mt-0.5">
          {product.isSoldOut ? (
            <span className="line-through text-text-muted">{product.price} €</span>
          ) : (
            `${product.price} €`
          )}
        </p>
      </div>
    </article>
  )
}
