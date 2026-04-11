'use client'

import { motion } from 'framer-motion'
import { InstagramLogo, TiktokLogo, ArrowUpRight } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] pt-16 pb-10 px-6 md:px-10 max-w-[1600px] mx-auto">

      {/* Giant FREEZ watermark */}
      <motion.div
        className="overflow-hidden mb-14 md:mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="font-medium leading-none uppercase select-none text-white/[0.035]"
          style={{ fontSize: 'clamp(4rem, 17vw, 19rem)' }}
        >
          FREEZ
        </p>
      </motion.div>

      {/* Footer links grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
        <div>
          <p className="text-[9px] tracking-[0.28em] text-text-muted uppercase mb-5">Navigation</p>
          <ul className="flex flex-col gap-3">
            {['Collection', 'Lookbook', 'À propos', 'Contact'].map((item) => (
              <li key={item}>
                <button className="text-[12px] text-text-secondary hover:text-text-primary transition-colors duration-200">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[9px] tracking-[0.28em] text-text-muted uppercase mb-5">Légal</p>
          <ul className="flex flex-col gap-3">
            {['Mentions légales', 'Confidentialité', 'CGV', 'FAQ'].map((item) => (
              <li key={item}>
                <button className="text-[12px] text-text-secondary hover:text-text-primary transition-colors duration-200">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[9px] tracking-[0.28em] text-text-muted uppercase mb-5">Suivre</p>
          <div className="flex flex-col gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[12px] text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <InstagramLogo size={14} />
              Instagram
              <ArrowUpRight size={11} className="text-text-muted" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[12px] text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <TiktokLogo size={14} />
              TikTok
              <ArrowUpRight size={11} className="text-text-muted" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-[9px] tracking-[0.28em] text-text-muted uppercase mb-5">Newsletter</p>
          <div className="flex border border-white/10 hover:border-white/20 transition-colors duration-300">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 bg-transparent text-[11px] text-text-primary px-3 py-2.5 outline-none placeholder:text-text-muted"
            />
            <button className="px-3 py-2.5 text-text-secondary hover:text-text-primary transition-colors duration-200 border-l border-white/10">
              <ArrowUpRight size={13} />
            </button>
          </div>
          <p className="text-[10px] text-text-muted mt-2">Drops en avant-première.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
        <p className="text-[10px] tracking-[0.15em] text-text-muted uppercase">
          © {new Date().getFullYear()} FREEZ. Tous droits réservés.
        </p>
        <p className="text-[10px] tracking-[0.15em] text-text-muted uppercase">
          ICE AGE 02 — Édition limitée — Printemps-Été 2025
        </p>
      </div>
    </footer>
  )
}
