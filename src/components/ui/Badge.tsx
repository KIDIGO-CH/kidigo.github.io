import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'accent' | 'subtle' | 'outline' | 'warning' | 'error'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-text-primary/8 text-text-primary',
  accent: 'bg-accent text-white',
  subtle: 'bg-accent-subtle text-accent',
  outline: 'border border-border text-text-secondary',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  error: 'bg-red-50 text-red-600',
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-[12px] px-3 py-1',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
