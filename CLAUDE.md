# CLAUDE.md — Contexte Global pour parlonsvisuel.com

## Projet

Site web `parlonsvisuel.com` — GitHub Pages. Développement web front-end premium.

---

## Règle Globale : Output Complet

> "Treat every task as production-critical. A partial output is a broken output."

**Toujours actif sur ce projet :**

- Ne jamais utiliser `// ...`, `// TODO`, `/* ... */` comme placeholders
- Ne jamais écrire "pour des raisons de brièveté" ou "le reste suit le même schéma"
- Produire chaque composant, fichier, et fonction en entier
- Si la limite de tokens approche : s'arrêter à une limite propre + marqueur `[PAUSED — X/Y complet. Écrire "continuer" pour la suite]`

---

## Protocole de Clarification

Quand une demande de génération d'interface est vague (pas de style, palette ou sections précisées), poser ces 3 questions avant de générer :

1. **Style visuel ?** — Sombre/Ethereal Glass · Éditorial/Luxe · Minimaliste/Structuré · Brutal/Industriel
2. **Couleur accent ?** — ex: `#E11D48 Deep Rose`, `#10B981 Emerald`, `#3B82F6 Electric Blue`
3. **Sections souhaitées ?** — ex: Hero / Produits / À propos / Newsletter

Si le contexte est suffisamment clair, générer directement sans demander.

---

## Protocole d'Exécution

Pour toute génération d'interface :

1. **Silence** — Décider du vibe et du layout avant d'écrire une ligne
2. **Analyse** — Identifier le contexte, les contraintes, le public cible
3. **Architecture** — Définir la grille, la typographie, la palette
4. **Build** — Construire composant par composant
5. **Polish** — Micro-interactions, spring physics, états complets

---

## Standards Design — Toujours Actifs

### Typographie

- Polices premium : Geist, Outfit, Cabinet Grotesk, Satoshi
- `Inter` BANNI
- Serif BANNI sur dashboards et UIs logicielles
- Titres : `clamp()` pour fluidité responsive — jamais tailles fixes

### Couleurs

- Max 1 accent, saturation < 80%
- Jamais `#000000` pur → Off-black ou Zinc-950
- Esthétique "AI Purple/Blue" BANNIE

### Layout

- CSS Grid > flexbox
- `min-h-[100dvh]` — jamais `h-screen` (bug iOS Safari)
- Hero centré BANNI — layouts asymétriques par défaut

### Composants

- Cards : overuse INTERDIT — justification d'élévation requise. Préférer borders ou whitespace
- États complets : loading + empty + error OBLIGATOIRES sur chaque composant
- Icônes : Phosphor ou Radix Icons — jamais d'emojis

### Motion

- Animer UNIQUEMENT `transform` et `opacity` — jamais `top`, `left`, `width`, `height`
- **Spring physics sur toutes les interactions** : `stiffness: 100, damping: 20`
- `backdrop-filter: blur()` sur éléments `fixed` uniquement — jamais scrollables
- Animations CPU-intensive : isoler dans des micro Client Components dédiés (60fps)
- `useEffect` : cleanup obligatoire

### Bento Paradigm

Quand la densité visuelle le justifie :
- CSS Grid masonry, tuiles de tailles variées (`2fr 1fr`, `1fr 2fr`)
- Cards `rounded-[2.5rem]`, animations perpétuelles isolées
- Chaque tuile avec micro-animation distincte

---

## Anti-Patterns Absolus

| Interdit | Remplaçant |
|----------|-----------|
| `Inter` | Geist, Satoshi, Outfit, Cabinet Grotesk |
| Neon glow purple/blue | Accent unique, désaturé |
| `#000000` pur | Off-black, Zinc-950 |
| Hero centré | Split-screen, asymétrie, bento |
| 3 cards identiques en rangée | Zig-zag, bento asymétrique, masonry |
| "Acme Corp", "John Doe" | Noms contextuels réalistes |
| "Seamless", "Unleash", "Next-Gen" | Copywriting direct et spécifique |
| Lorem ipsum | Contenu réel intentionnel |
| `h-screen` | `min-h-[100dvh]` |
| Transitions `linear` / `ease-in-out` | Spring physics uniquement |

---

## Vérification Pré-Livraison

- [ ] `min-h-[100dvh]` présent — jamais `h-screen`
- [ ] Mobile collapse < 768px vérifié
- [ ] `useEffect` avec cleanup
- [ ] États loading / empty / error complets
- [ ] Cards évitées ou justifiées
- [ ] Animations GPU-safe (`transform` + `opacity` uniquement)
- [ ] Animations CPU-heavy isolées en Client Components
- [ ] Aucune police Inter, aucun emoji
- [ ] Dépendances tierces vérifiées dans `package.json` avant import

---

## Skills Disponibles

Les standards ci-dessus sont le **baseline toujours actif**.
Les skills `/slash` amplifient avec des archetypes spécialisés et le contrôle des dials.

| Slash Command | Surcouche spécialisée |
|---------------|-----------------------|
| `/taste` | Dials DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY. Arsenal : Liquid Glass, Magnetic physics, Bento complet. |
| `/soft` | Persona Vanguard_UI_Architect. Archetypes : Ethereal Glass · Editorial Luxury · Soft Structuralism. |
| `/redesign` | Audit + upgrade. Process Scan → Diagnose → Fix. |
| `/minimalist` | Interfaces éditoriales Notion/Linear. Monochrome chaud. |
| `/brutalist` | Swiss Industrial Print ou Tactical Terminal. (Beta) |
| `/stitch` | Génère un DESIGN.md complet pour Google Stitch. |
| `/output` | Enforcement output complet (déjà actif via règle globale). |

---

## Source des Skills

Copie locale de : **https://github.com/Leonxlnx/taste-skill**
Stockés dans `skills/*/SKILL.md` et `.claude/commands/*.md`.

- Fonctionnement 100% offline
- Contrôle total des données
- Personnalisation et évolution selon les besoins du projet
