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
        canvas: '#FAFAF7',
        surface: '#F0EFEC',
        elevated: '#FFFFFF',
        accent: '#FF6B52',
        'accent-light': '#FF8570',
        'accent-subtle': '#FFF0ED',
        'text-primary': '#1A1A18',
        'text-secondary': '#71706C',
        'text-muted': '#ADACA7',
        border: 'rgba(26,26,24,0.08)',
        'border-strong': 'rgba(26,26,24,0.14)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(26,26,24,0.06), 0 4px 16px rgba(26,26,24,0.04)',
        'card-hover': '0 4px 8px rgba(26,26,24,0.08), 0 12px 32px rgba(26,26,24,0.08)',
        'button': '0 1px 2px rgba(255,107,82,0.2), 0 2px 8px rgba(255,107,82,0.12)',
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
