'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function InscriptionPage() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Veuillez entrer un e-mail valide.')
      return
    }
    setDone(true)
  }

  const handleGoogle = () => {
    setDone(true)
  }

  return (
    <div className="min-h-[100dvh] bg-canvas flex items-center justify-center px-5 sm:px-6">
      <motion.div
        className="w-full max-w-[420px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-10">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
            <span className="text-white font-display font-black text-[18px]">K</span>
          </div>
          <span className="font-display font-black text-[24px] text-text-primary tracking-tight">KIDIGO</span>
        </Link>

        <div className="bg-elevated rounded-3xl border border-border p-7 sm:p-8 shadow-card">

          {!done ? (
            <>
              <h1 className="font-display font-bold text-[22px] text-text-primary mb-2 text-center">Créer un compte</h1>
              <p className="text-[14px] text-text-secondary text-center mb-8">
                Rejoignez des milliers de familles. C'est gratuit et ça prend 10 secondes.
              </p>

              {/* Google */}
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 bg-canvas border border-border rounded-2xl px-4 py-3 text-[14px] font-medium text-text-primary hover:border-accent/30 hover:shadow-card transition-all duration-200 mb-4"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuer avec Google
              </button>

              {/* Separator */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[12px] text-text-muted">ou</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Email */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 bg-canvas border border-border rounded-2xl px-4 py-3 focus-within:border-accent/40 transition-colors">
                    <Mail size={16} className="text-text-muted flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.ch"
                      className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-muted outline-none"
                    />
                  </div>
                </div>

                {error && <p className="text-[13px] text-red-500">{error}</p>}

                <Button type="submit" fullWidth size="lg" className="gap-2">
                  S'inscrire avec l'e-mail <ArrowRight size={16} />
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-[13px] text-text-muted">
                  Déjà un compte ?{' '}
                  <Link href="/connexion" className="text-accent font-medium hover:underline">Se connecter</Link>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-accent-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-accent" />
              </div>
              <h1 className="font-display font-bold text-[22px] text-text-primary mb-2">Bienvenue sur KIDIGO !</h1>
              <p className="text-[14px] text-text-secondary mb-6">Votre compte a été créé avec succès.</p>
              <Link href="/compte">
                <Button fullWidth size="lg">Configurer mon profil</Button>
              </Link>
            </div>
          )}
        </div>

        <p className="text-[12px] text-text-muted text-center mt-6">
          En créant un compte, vous acceptez nos{' '}
          <Link href="/cgu" className="underline hover:text-accent">CGU</Link> et notre{' '}
          <Link href="/confidentialite" className="underline hover:text-accent">politique de confidentialité</Link>.
        </p>
      </motion.div>
    </div>
  )
}
