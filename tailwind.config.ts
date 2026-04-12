import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-cabinet)', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#F3F6F1',
        surface: '#EAEFE7',
        elevated: '#FFFFFF',
        accent: '#16A34A',
        'accent-light': '#22C55E',
        'accent-subtle': '#DCFCE7',
        'text-primary': '#111814',
        'text-secondary': '#6B7369',
        'text-muted': '#A8B5A5',
        border: 'rgba(17,24,20,0.08)',
        'border-strong': 'rgba(17,24,20,0.14)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(17,24,20,0.06), 0 4px 16px rgba(17,24,20,0.04)',
        'card-hover': '0 4px 8px rgba(17,24,20,0.08), 0 12px 32px rgba(17,24,20,0.08)',
        'button': '0 1px 2px rgba(22,163,74,0.2), 0 2px 8px rgba(22,163,74,0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out forwards',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
