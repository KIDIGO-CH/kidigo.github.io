'use client'

import { cn } from '@/lib/utils'
import { motion, type HTMLMotionProps } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  fullWidth?: boolean
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white shadow-button hover:bg-accent-light',
  secondary: 'bg-text-primary text-canvas hover:bg-text-primary/85',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary',
  outline: 'bg-transparent border border-border-strong text-text-primary hover:border-accent hover:text-accent',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-[12px] px-4 py-2 gap-1.5',
  md: 'text-[13px] px-5 py-2.5 gap-2',
  lg: 'text-[14px] px-7 py-3.5 gap-2.5',
}

export function Button({ variant = 'primary', size = 'md', children, fullWidth, loading, className, disabled, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-medium transition-colors duration-200 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : children}
    </motion.button>
  )
}
