import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
  className?: string
}

export function StarRating({ rating, reviewCount, size = 'sm', className }: StarRatingProps) {
  const starSize = size === 'sm' ? 12 : 14

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={starSize}
            className={star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-text-muted'}
          />
        ))}
      </div>
      <span className={cn('font-medium text-text-primary', size === 'sm' ? 'text-[12px]' : 'text-[13px]')}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className={cn('text-text-secondary', size === 'sm' ? 'text-[11px]' : 'text-[12px]')}>
          ({reviewCount} avis)
        </span>
      )}
    </div>
  )
}
