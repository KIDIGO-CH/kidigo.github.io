'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

type Step = 'email' | 'code' | 'done'

export default function ConnexionPage() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Veuillez entrer un e-mail valide.')
      return
    }
    setStep('code')
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (code.length < 4) {
      setError('Le code doit contenir au moins 4 chiffres.')
      return
    }
    setStep('done')
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

          {step === 'email' && (
            <>
              <h1 className="font-display font-bold text-[22px] text-text-primary mb-2 text-center">Connexion</h1>
              <p className="text-[14px] text-text-secondary text-center mb-8">
                Entrez votre e-mail, nous vous envoyons un code de connexion. Simple et sécurisé.
              </p>

              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Adresse e-mail</label>
                  <div className="flex items-center gap-3 bg-canvas border border-border rounded-2xl px-4 py-3 focus-within:border-accent/40 transition-colors">
                    <Mail size={16} className="text-text-muted flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.ch"
                      className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-muted outline-none"
                      autoFocus
                    />
                  </div>
                </div>

                {error && <p className="text-[13px] text-red-500">{error}</p>}

                <Button type="submit" fullWidth size="lg" className="gap-2">
                  Recevoir mon code <ArrowRight size={16} />
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-[13px] text-text-muted mb-3">Pas encore de compte ?</p>
                <Link href="/inscription">
                  <Button variant="outline" fullWidth size="sm">S'inscrire gratuitement</Button>
                </Link>
              </div>
            </>
          )}

          {step === 'code' && (
            <>
              <button onClick={() => setStep('email')} className="flex items-center gap-1 text-[13px] text-text-muted hover:text-accent transition-colors mb-4">
                <ArrowLeft size={14} /> Retour
              </button>
              <h1 className="font-display font-bold text-[22px] text-text-primary mb-2 text-center">Vérification</h1>
              <p className="text-[14px] text-text-secondary text-center mb-2">
                Un code a été envoyé à
              </p>
              <p className="text-[14px] font-medium text-text-primary text-center mb-8">{email}</p>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Code de vérification</label>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={code[i] || ''}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '')
                          const newCode = code.split('')
                          newCode[i] = val
                          setCode(newCode.join(''))
                          if (val && e.target.nextElementSibling) {
                            (e.target.nextElementSibling as HTMLInputElement).focus()
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !code[i] && e.currentTarget.previousElementSibling) {
                            (e.currentTarget.previousElementSibling as HTMLInputElement).focus()
                          }
                        }}
                        className="w-11 h-12 bg-canvas border border-border rounded-xl text-center text-[18px] font-display font-bold text-text-primary outline-none focus:border-accent transition-colors"
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                </div>

                {error && <p className="text-[13px] text-red-500 text-center">{error}</p>}

                <Button type="submit" fullWidth size="lg" className="gap-2">
                  Vérifier <ArrowRight size={16} />
                </Button>
              </form>

              <p className="text-[12px] text-text-muted text-center mt-4">
                Vous n'avez pas reçu le code ?{' '}
                <button onClick={() => {}} className="text-accent font-medium hover:underline">Renvoyer</button>
              </p>
            </>
          )}

          {step === 'done' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-accent-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-accent" />
              </div>
              <h1 className="font-display font-bold text-[22px] text-text-primary mb-2">Vous êtes connecté !</h1>
              <p className="text-[14px] text-text-secondary mb-6">Bienvenue sur KIDIGO.</p>
              <Link href="/compte">
                <Button fullWidth size="lg">Accéder à mon compte</Button>
              </Link>
            </div>
          )}
        </div>

        <p className="text-[12px] text-text-muted text-center mt-6">
          En vous connectant, vous acceptez nos{' '}
          <Link href="/cgu" className="underline hover:text-accent">CGU</Link> et notre{' '}
          <Link href="/confidentialite" className="underline hover:text-accent">politique de confidentialité</Link>.
        </p>
      </motion.div>
    </div>
  )
}
