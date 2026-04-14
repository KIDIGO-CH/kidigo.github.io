'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Heart, Calendar, Baby, Cake, Settings, ChevronRight,
  Plus, X, Star, MapPin, Clock, Trash2, LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { activities } from '@/lib/data'

// ── Types ────────────────────────────────────────────────────────────
type Child = { id: string; name: string; age: number }
type Birthday = { id: string; childName: string; date: string; notes: string }
type PlannedActivity = { activityId: string; date: string }
type Tab = 'favoris' | 'planning' | 'enfants' | 'anniversaires' | 'parametres'

const TABS: { key: Tab; label: string; icon: typeof Heart }[] = [
  { key: 'favoris', label: 'Mes favoris', icon: Heart },
  { key: 'planning', label: 'Mes idées', icon: Calendar },
  { key: 'enfants', label: 'Mes enfants', icon: Baby },
  { key: 'anniversaires', label: 'Anniversaires', icon: Cake },
  { key: 'parametres', label: 'Paramètres', icon: Settings },
]

// ── Mock data ────────────────────────────────────────────────────────
const MOCK_FAVORITES = activities.slice(0, 4).map(a => a.id)

const MOCK_CHILDREN: Child[] = [
  { id: 'c1', name: 'Léo', age: 7 },
  { id: 'c2', name: 'Emma', age: 3 },
]

const MOCK_BIRTHDAYS: Birthday[] = [
  { id: 'b1', childName: 'Léo', date: '2026-09-15', notes: 'Fête au parc ou atelier créatif' },
]

const MOCK_PLANNED: PlannedActivity[] = [
  { activityId: activities[0]?.id, date: '2026-04-19' },
  { activityId: activities[2]?.id, date: '2026-04-26' },
]

// ── Helpers ──────────────────────────────────────────────────────────
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })
}

export default function ComptePage() {
  const [activeTab, setActiveTab] = useState<Tab>('favoris')
  const [favorites, setFavorites] = useState(MOCK_FAVORITES)
  const [children, setChildren] = useState(MOCK_CHILDREN)
  const [birthdays, setBirthdays] = useState(MOCK_BIRTHDAYS)
  const [planned, setPlanned] = useState(MOCK_PLANNED)

  return (
    <div className="min-h-[100dvh] bg-canvas pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10">

        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <h1 className="font-display font-black text-[24px] sm:text-[28px] text-text-primary mb-1">Mon compte</h1>
          <p className="text-[14px] text-text-secondary">Gérez vos favoris, vos enfants et vos idées de sorties.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">

          {/* Sidebar / Tabs */}
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeTab === key
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
            <div className="hidden lg:block mt-auto pt-4 border-t border-border">
              <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-[13px] font-medium text-red-500 hover:bg-red-50 transition-all duration-200 w-full">
                <LogOut size={16} />
                Déconnexion
              </button>
            </div>
          </nav>

          {/* Content */}
          <div className="min-h-[400px]">
            {activeTab === 'favoris' && <FavorisTab favorites={favorites} onRemove={(id) => setFavorites(f => f.filter(x => x !== id))} />}
            {activeTab === 'planning' && <PlanningTab planned={planned} onRemove={(id) => setPlanned(p => p.filter(x => x.activityId !== id))} />}
            {activeTab === 'enfants' && <EnfantsTab children={children} onChange={setChildren} />}
            {activeTab === 'anniversaires' && <AnniversairesTab birthdays={birthdays} onChange={setBirthdays} children={children} />}
            {activeTab === 'parametres' && <ParametresTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Favoris ──────────────────────────────────────────────────────────
function FavorisTab({ favorites, onRemove }: { favorites: string[]; onRemove: (id: string) => void }) {
  const favActivities = activities.filter(a => favorites.includes(a.id))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="font-display font-bold text-[18px] text-text-primary mb-5">Mes favoris</h2>
      {favActivities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favActivities.map(a => (
            <div key={a.id} className="bg-elevated rounded-2xl border border-border p-4 flex gap-4 group">
              <img src={a.image} alt={a.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Link href={`/activite/${a.slug}`} className="font-display font-bold text-[14px] text-text-primary hover:text-accent transition-colors line-clamp-1">
                  {a.name}
                </Link>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[12px] text-text-secondary">{a.rating}</span>
                  <span className="text-[12px] text-text-muted">·</span>
                  <MapPin size={11} className="text-text-muted" />
                  <span className="text-[12px] text-text-muted">{a.city}</span>
                </div>
                <p className="text-[13px] font-medium text-text-primary mt-1">{a.price} CHF</p>
              </div>
              <button
                onClick={() => onRemove(a.id)}
                className="self-start p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState emoji="❤️" title="Aucun favori" text="Sauvegardez des activités pour les retrouver ici." cta="Explorer les activités" href="/recherche" />
      )}
    </motion.div>
  )
}

// ── Planning / Idées ─────────────────────────────────────────────────
function PlanningTab({ planned, onRemove }: { planned: PlannedActivity[]; onRemove: (id: string) => void }) {
  const sorted = [...planned].sort((a, b) => a.date.localeCompare(b.date))
  const today = new Date().toISOString().split('T')[0]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="font-display font-bold text-[18px] text-text-primary mb-1">Mes idées de sorties</h2>
      <p className="text-[13px] text-text-secondary mb-5">Vos activités sauvegardées par date.</p>

      {sorted.length > 0 ? (
        <div className="space-y-3">
          {sorted.map(({ activityId, date }) => {
            const a = activities.find(x => x.id === activityId)
            if (!a) return null
            const isPast = date < today
            return (
              <div key={activityId} className={`bg-elevated rounded-2xl border border-border p-4 flex items-center gap-4 ${isPast ? 'opacity-50' : ''}`}>
                <div className="w-14 text-center flex-shrink-0">
                  <p className="text-[10px] font-semibold text-accent uppercase">
                    {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </p>
                  <p className="font-display font-black text-[22px] text-text-primary leading-none">
                    {new Date(date).getDate()}
                  </p>
                  <p className="text-[10px] text-text-muted">
                    {new Date(date).toLocaleDateString('fr-FR', { month: 'short' })}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/activite/${a.slug}`} className="font-display font-bold text-[14px] text-text-primary hover:text-accent transition-colors line-clamp-1">
                    {a.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-0.5">
                    <MapPin size={11} className="text-text-muted" />
                    <span className="text-[12px] text-text-muted">{a.city}</span>
                    <Clock size={11} className="text-text-muted" />
                    <span className="text-[12px] text-text-muted">{a.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(activityId)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState emoji="📅" title="Aucune idée planifiée" text="Sauvegardez des activités avec une date pour organiser vos prochaines sorties." cta="Trouver des activités" href="/recherche" />
      )}
    </motion.div>
  )
}

// ── Enfants ──────────────────────────────────────────────────────────
function EnfantsTab({ children, onChange }: { children: Child[]; onChange: (c: Child[]) => void }) {
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState('')

  const handleAdd = () => {
    if (!newName.trim() || !newAge) return
    onChange([...children, { id: `c-${Date.now()}`, name: newName.trim(), age: parseInt(newAge) }])
    setNewName('')
    setNewAge('')
    setShowAdd(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-bold text-[18px] text-text-primary">Mes enfants</h2>
          <p className="text-[13px] text-text-secondary">Pour personnaliser les recommandations.</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)} className="gap-1.5">
          <Plus size={14} /> Ajouter
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-elevated rounded-2xl border border-border p-4 mb-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Prénom"
            className="flex-1 bg-canvas border border-border rounded-xl px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent/40"
            autoFocus
          />
          <select
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
            className="bg-canvas border border-border rounded-xl px-3 py-2 text-[14px] text-text-primary outline-none cursor-pointer"
          >
            <option value="">Âge</option>
            {Array.from({ length: 15 }, (_, i) => (
              <option key={i} value={i}>{i} an{i > 1 ? 's' : ''}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd}>Ajouter</Button>
            <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {/* Children list */}
      {children.length > 0 ? (
        <div className="space-y-3">
          {children.map(child => (
            <div key={child.id} className="bg-elevated rounded-2xl border border-border p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-subtle flex items-center justify-center">
                <span className="font-display font-bold text-[18px] text-accent">{child.name[0]}</span>
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-[15px] text-text-primary">{child.name}</p>
                <p className="text-[13px] text-text-secondary">{child.age} an{child.age > 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => onChange(children.filter(c => c.id !== child.id))}
                className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !showAdd && <EmptyState emoji="👶" title="Aucun enfant ajouté" text="Ajoutez vos enfants pour des recommandations adaptées à leur âge." />
      )}
    </motion.div>
  )
}

// ── Anniversaires ────────────────────────────────────────────────────
function AnniversairesTab({ birthdays, onChange, children }: { birthdays: Birthday[]; onChange: (b: Birthday[]) => void; children: Child[] }) {
  const [showAdd, setShowAdd] = useState(false)
  const [newChild, setNewChild] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newNotes, setNewNotes] = useState('')

  const handleAdd = () => {
    if (!newChild || !newDate) return
    onChange([...birthdays, { id: `b-${Date.now()}`, childName: newChild, date: newDate, notes: newNotes }])
    setNewChild('')
    setNewDate('')
    setNewNotes('')
    setShowAdd(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-bold text-[18px] text-text-primary">Anniversaires</h2>
          <p className="text-[13px] text-text-secondary">Préparez les fêtes de vos enfants sereinement.</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)} className="gap-1.5">
          <Plus size={14} /> Ajouter
        </Button>
      </div>

      {showAdd && (
        <div className="bg-elevated rounded-2xl border border-border p-4 mb-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={newChild}
              onChange={(e) => setNewChild(e.target.value)}
              className="flex-1 bg-canvas border border-border rounded-xl px-3 py-2 text-[14px] text-text-primary outline-none cursor-pointer"
            >
              <option value="">Enfant</option>
              {children.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              <option value="Autre">Autre</option>
            </select>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-canvas border border-border rounded-xl px-3 py-2 text-[14px] text-text-primary outline-none cursor-pointer"
            />
          </div>
          <input
            type="text"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="Notes ou idées (optionnel)"
            className="w-full bg-canvas border border-border rounded-xl px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted outline-none focus:border-accent/40"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd}>Ajouter</Button>
            <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {birthdays.length > 0 ? (
        <div className="space-y-3">
          {birthdays.map(b => (
            <div key={b.id} className="bg-elevated rounded-2xl border border-border p-4 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-50 to-accent-subtle flex items-center justify-center flex-shrink-0">
                <Cake size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-[15px] text-text-primary">{b.childName}</p>
                <p className="text-[13px] text-accent font-medium">{formatDate(b.date)}</p>
                {b.notes && <p className="text-[12px] text-text-secondary mt-1">{b.notes}</p>}
              </div>
              <div className="flex items-center gap-2">
                <Link href="/recherche?categorie=Anniversaires">
                  <button className="text-[12px] text-accent font-medium hover:underline whitespace-nowrap">Trouver des idées</button>
                </Link>
                <button
                  onClick={() => onChange(birthdays.filter(x => x.id !== b.id))}
                  className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !showAdd && <EmptyState emoji="🎂" title="Aucun anniversaire planifié" text="Ajoutez la date d'anniversaire de vos enfants pour recevoir des idées d'activités." />
      )}
    </motion.div>
  )
}

// ── Paramètres ───────────────────────────────────────────────────────
function ParametresTab() {
  const [email] = useState('parent@exemple.ch')
  const [notifications, setNotifications] = useState(true)
  const [newsletter, setNewsletter] = useState(true)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="font-display font-bold text-[18px] text-text-primary mb-5">Paramètres du compte</h2>

      <div className="space-y-4">
        {/* Email */}
        <div className="bg-elevated rounded-2xl border border-border p-4">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] mb-1">Adresse e-mail</p>
          <p className="text-[15px] text-text-primary font-medium">{email}</p>
        </div>

        {/* Notifications */}
        <div className="bg-elevated rounded-2xl border border-border p-4 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium text-text-primary">Notifications</p>
            <p className="text-[12px] text-text-secondary">Rappels d'activités et anniversaires</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-colors duration-200 ${notifications ? 'bg-accent' : 'bg-border'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${notifications ? 'translate-x-5.5 ml-[22px]' : 'translate-x-0.5 ml-[2px]'}`} />
          </button>
        </div>

        {/* Newsletter */}
        <div className="bg-elevated rounded-2xl border border-border p-4 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium text-text-primary">Newsletter</p>
            <p className="text-[12px] text-text-secondary">Sélections et bons plans hebdomadaires</p>
          </div>
          <button
            onClick={() => setNewsletter(!newsletter)}
            className={`w-11 h-6 rounded-full transition-colors duration-200 ${newsletter ? 'bg-accent' : 'bg-border'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${newsletter ? 'translate-x-5.5 ml-[22px]' : 'translate-x-0.5 ml-[2px]'}`} />
          </button>
        </div>

        {/* Danger zone */}
        <div className="pt-4 border-t border-border">
          <button className="text-[13px] text-red-500 hover:text-red-600 font-medium">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Empty state ──────────────────────────────────────────────────────
function EmptyState({ emoji, title, text, cta, href }: { emoji: string; title: string; text: string; cta?: string; href?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-4xl mb-4">{emoji}</span>
      <p className="font-display font-bold text-[16px] text-text-primary mb-2">{title}</p>
      <p className="text-[13px] text-text-secondary max-w-xs mb-6">{text}</p>
      {cta && href && (
        <Link href={href}><Button variant="outline" size="sm">{cta}</Button></Link>
      )}
    </div>
  )
}
