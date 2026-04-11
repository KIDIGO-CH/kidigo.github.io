'use client'

import { motion } from 'framer-motion'

export default function BrandStory() {
  return (
    <section className="border-t border-white/[0.05] py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        <motion.p
          className="text-[10px] tracking-[0.3em] text-text-secondary uppercase mb-20 md:mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Manifeste
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-28 items-center">

          {/* Left — editorial text */}
          <div className="relative">
            {/* Ghost number */}
            <motion.div
              className="absolute -top-8 -left-2 select-none pointer-events-none"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 60, damping: 20 }}
            >
              <span
                className="font-medium leading-none text-white/[0.03]"
                style={{ fontSize: 'clamp(7rem, 20vw, 22rem)' }}
              >
                01
              </span>
            </motion.div>

            <div className="relative z-10">
              <motion.h2
                className="font-medium text-text-primary uppercase leading-[1.05] mb-10"
                style={{ fontSize: 'clamp(1.8rem, 4.5vw, 5rem)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.08 }}
              >
                Conçu pour<br />
                <span className="text-accent">résister</span><br />
                au banal.
              </motion.h2>

              <motion.div
                className="space-y-5 text-text-secondary text-[14px] leading-[1.8] max-w-[380px] mb-12"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16, duration: 0.5 }}
              >
                <p>
                  Freez ne fait pas de compromis. Chaque pièce naît d'une obsession — la coupe, la matière, la durabilité sous contrainte.
                </p>
                <p>
                  Six pièces par drop. Jamais plus. L'édition limitée n'est pas un argument marketing — c'est une promesse de qualité irréductible.
                </p>
                <p>
                  ICE AGE 02. Printemps-Été 2025. Six pièces techniques pour ceux qui savent exactement pourquoi.
                </p>
              </motion.div>

              {/* Metrics */}
              <motion.div
                className="flex items-start gap-10 pt-8 border-t border-white/[0.07]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                {[
                  { value: '2', label: 'Ans de R&D' },
                  { value: '4', label: 'Drops / an' },
                  { value: '100%', label: 'Limitées' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[22px] font-medium text-text-primary tracking-tight mb-1">{item.value}</p>
                    <p className="text-[10px] tracking-[0.18em] text-text-secondary uppercase">{item.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right — visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.1 }}
          >
            <div
              className="relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '4/5' }}
            >
              <img
                src="https://source.unsplash.com/700x875/?fashion,editorial,dark,minimal,style"
                alt="Freez — esprit de marque"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(18%) contrast(1.04)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(96,165,250,0.04) 0%, transparent 55%)',
                }}
              />
            </div>

            {/* Floating tag */}
            <motion.div
              className="absolute -bottom-5 -left-5 px-4 py-3"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(8,8,8,0.78)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-[9px] tracking-[0.22em] text-text-secondary uppercase mb-0.5">Collection</p>
              <p className="text-[13px] font-medium text-text-primary">ICE AGE 02 — 2025</p>
            </motion.div>

            {/* Accent line */}
            <div className="absolute -right-5 top-[22%] bottom-[22%] w-px bg-gradient-to-b from-transparent via-accent/28 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
