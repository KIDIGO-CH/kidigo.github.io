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

## Skills Disponibles

Ces skills sont installés localement dans `.claude/commands/` et `skills/`.  
Invoquer avec `/nom-du-skill` dans Claude Code.

| Slash Command | Rôle |
|---------------|------|
| `/taste` | Design premium React/Next.js + Tailwind. Anti-clichés IA, spring physics, bento grids. |
| `/redesign` | Audit + upgrade d'interface existante sans casser les fonctionnalités. |
| `/soft` | Expériences agency-level Awwwards. Persona Vanguard_UI_Architect. |
| `/minimalist` | Interfaces éditoriales Notion/Linear. Monochrome chaud, typo contrastée. |
| `/brutalist` | Esthétique industrielle brutaliste. Swiss print ou terminal militaire. (Beta) |
| `/stitch` | Génère un DESIGN.md pour Google Stitch. |
| `/output` | Active l'enforcement d'output complet (toujours actif ici). |

---

## Standards Design par Défaut

Quand on développe une interface pour ce projet :

### Typographie
- Polices premium : Geist, Outfit, Cabinet Grotesk, Satoshi
- `Inter` BANNI
- Serif BANNI sur dashboards et UIs logicielles

### Couleurs
- Max 1 accent, saturation < 80%
- Jamais `#000000` pur → Off-black ou Zinc-950
- Esthétique "AI Purple/Blue" BANNIE

### Layout
- CSS Grid > flexbox
- `min-h-[100dvh]` — jamais `h-screen`
- Hero centré BANNI (variance élevée)
- 3 cards identiques en rangée BANNIES

### Composants
- États complets : loading + empty + error obligatoires
- Icônes : Phosphor ou Radix Icons
- Pas d'emojis dans le code ou le contenu

### Performance
- Animer UNIQUEMENT `transform` et `opacity`
- `useEffect` avec cleanup obligatoire
- Animations CPU-heavy isolées en Client Components dédiés

---

## Source des Skills

Ces skills sont une copie locale de :
**https://github.com/Leonxlnx/taste-skill**

Stockés dans `skills/*/SKILL.md` pour :
- Fonctionnement 100% offline
- Contrôle total des données (aucune dépendance externe au runtime)
- Personnalisation et évolution selon les besoins du projet
- Attribution et traçabilité via git

Pour mettre à jour : refetcher les fichiers sources depuis le repo GitHub et remplacer les copies locales.
