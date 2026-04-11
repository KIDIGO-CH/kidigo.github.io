'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({ children, className = '', strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 100, damping: 20 })
  const y = useSpring(0, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      x.set((e.clientX - rect.left - rect.width / 2) * strength)
      y.set((e.clientY - rect.top - rect.height / 2) * strength)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, y, strength])

  return (
    <motion.div ref={ref} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}
