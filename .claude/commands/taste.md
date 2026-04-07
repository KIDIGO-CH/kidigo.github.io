# High-Agency Frontend Skill — taste-skill
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill

Activate the **Taste Design System** for this task. Apply all rules below without exception.

---

## Core Configuration

- **DESIGN_VARIANCE** = 8 — layouts asymétriques par défaut (override possible)
- **MOTION_INTENSITY** = 6 — spring physics, micro-interactions perpétuelles
- **VISUAL_DENSITY** = 4 — aéré, spacieux, type gallery

---

## Mandates Architecturaux

**Vérification des dépendances obligatoire.** Avant tout import tiers, vérifier `package.json`. Si absent → fournir la commande d'installation.

- Framework par défaut : React/Next.js avec Server Components (RSC)
- État global : `useState` / `useReducer` uniquement en Client Components
- Styles : Tailwind CSS v3/v4 (90%), CSS Grid > flexbox
- **Viewport mobile** : `min-h-[100dvh]` — jamais `h-screen` (bug iOS Safari)
- **Anti-emoji absolu** : STRICTEMENT INTERDIT — remplacer par Phosphor ou Radix Icons

---

## 6 Règles Anti-Clichés IA

1. **Typographie** : Titres `text-4xl md:text-6xl`. Polices Premium : Geist, Outfit, Cabinet Grotesk, Satoshi. `Inter` BANNI.
2. **Couleurs** : Max 1 accent < 80% saturation. Esthétique "AI Purple/Blue" BANNIE. Jamais `#000000` pur.
3. **Layout** : Hero centré BANNI si variance > 4. Grid asymétrique obligatoire.
4. **Cards** : Overuse des cards INTERDIT — justification d'élévation requise. Préférer borders ou whitespace.
5. **États** : Loading + Empty + Error states OBLIGATOIRES sur chaque composant.
6. **Forms** : Label au-dessus de l'input, espacement cohérent.

---

## Arsenal Créatif

- **Liquid Glass** : refraction avec inner borders + inner shadows
- **Magnetic micro-physics** : boutons avec attraction physique au curseur
- **Perpetual micro-interactions** : animations spring infinies (`stiffness: 100, damping: 20`)
- **Layout transitions** : Framer Motion `layout` + `layoutId` pour réorganisations fluides
- **Bento Paradigm** : `#f9fafb` bg, cards `rounded-[2.5rem]`, animations perpétuelles isolées en Client Components dédiés

---

## Patterns Performants

- Animer UNIQUEMENT `transform` et `opacity` — jamais `top`, `left`, `width`, `height`
- Filtres grain : pseudo-éléments `fixed`, jamais sur éléments scrollables
- Animations CPU-intensive : isoler dans des micro Client Components pour maintenir 60fps
- `useEffect` : cleanup obligatoire

---

## Patterns INTERDITS

| Interdit | Remplaçant |
|----------|-----------|
| `Inter` comme police | Geist, Satoshi, Outfit, Cabinet Grotesk |
| Neon glow purple/blue | Accent unique, désaturé |
| `#000000` pur | Off-black, Zinc-950 |
| Hero centré (variance > 4) | Split-screen, asymétrie, bento |
| 3 cards identiques en rangée | Zig-zag, bento asymétrique, masonry |
| "Acme Corp", "John Doe" | Noms contextuels réalistes |
| "Seamless", "Unleash", "Next-Gen" | Copywriting direct et spécifique |
| Lorem ipsum | Contenu réel intentionnel |
| `h-screen` | `min-h-[100dvh]` |

---

## Checklist Pré-Livraison

Vérifier avant chaque output :
- [ ] Pas de global state inutile
- [ ] `min-h-[100dvh]` présent (jamais `h-screen`)
- [ ] Collapse mobile vérifié (< 768px)
- [ ] `useEffect` avec cleanup
- [ ] États loading/empty/error complets
- [ ] Cards évitées ou justifiées
- [ ] Animations CPU-heavy isolées en Client Components
- [ ] Aucune police Inter, aucun emoji
