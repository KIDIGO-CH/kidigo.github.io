# Stitch Design Taste — stitch-skill
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/stitch-skill

Activer le **Stitch Skill** : générer un fichier `DESIGN.md` pour Google Stitch qui encode les règles de design premium en langage sémantique. Ce fichier est interprété par l'agent IA de Stitch pour générer des écrans conformes aux standards Taste.

---

## Configuration — Régler les Dials

Ajuster ces valeurs avant utilisation :

| Dial | Valeur | Description |
|------|--------|-------------|
| **Creativity** | `8` | 1 = Ultra-minimal suisse. 5 = Équilibré avec personnalité. 10 = Editorial audacieux, asymétrie forte. |
| **Density** | `4` | 1 = Gallery airy, whitespace massif. 5 = Équilibré. 10 = Cockpit dense, data-heavy. |
| **Variance** | `8` | 1 = Symétrique prévisible. 5 = Offsets subtils. 10 = Artsy chaotique, pas deux sections pareilles. |
| **Motion Intent** | `6` | 1 = Statique. 5 = Hover/entrance subtils. 10 = Orchestration cinématique sur chaque composant. |

---

## Structure du DESIGN.md à Générer

Le fichier produit doit couvrir ces 9 sections :

### 1. Visual Theme & Atmosphere
- Décrire l'ambiance générale (dense ou aéré, clinique ou chaud)
- Préciser le niveau de density, variance, et motion

### 2. Color Palette & Roles
- Canvas White `#F9FAFB` — surface principale
- Pure White `#FFFFFF` — fill cards et containers
- Charcoal Ink `#18181B` — texte principal (Zinc-950)
- Steel Secondary `#71717A` — body, descriptions, metadata
- Whisper Border `rgba(226,232,240,0.5)` — bordures 1px
- Diffused Shadow `rgba(0,0,0,0.05)` — élévation large, 40px blur
- **1 seul accent** au choix : Emerald `#10B981`, Blue `#3B82F6`, Rose `#E11D48`, Amber `#F59E0B`
- Couleurs BANNIES : Purple/Violet neon, `#000000` pur, accents > 80% saturation

### 3. Typography Rules
- Display : Geist, Satoshi, Cabinet Grotesk, ou Outfit — tracking `-0.025em`, scale fluid `clamp(2.25rem, 5vw, 3.75rem)`
- Body : même famille, weight 400, leading 1.65, max-width 65ch
- Mono : Geist Mono ou JetBrains Mono pour code, metadata, timestamps
- Inter BANNI. Serif BANNI dans dashboards/software UIs

### 4. Component Stylings
- Boutons : plat, no glow, pressed = `-1px translateY` ou `scale(0.98)`
- Cards : `border-radius: 2.5rem`, white fill, whisper border 1px, shadow diffuse `0 20px 40px -15px rgba(0,0,0,0.05)`
- Inputs : label au-dessus, focus ring accent 2px offset, pas de floating labels
- Navigation : sticky, icons scale au hover, pas de hamburger sur desktop
- Loaders : skeleton shimmer dimensionnel — jamais spinner circulaire
- Empty States : illustration composée + texte de guidance
- Error States : inline, contextuel, action de recovery claire

### 5. Hero Section
- **Inline Image Typography** : petites photos contextuelle inline entre les mots du titre
- Pas de superposition texte/image — séparation spatiale absolue
- Hero centré BANNI si Variance > 4 → Split Screen, Asymétrie, Whitespace agressif
- Max 1 CTA primary, pas de "Learn more" secondaire
- Pas de "Scroll to explore", flèches rebondissantes, chrome instructionnel

### 6. Layout Principles
- CSS Grid pour toute structure — jamais flexbox avec % (`calc(33% - 1rem)` BANNI)
- Pas de superposition d'éléments — séparation spatiale nette
- 3 cards égales BANNIES → bento asymétrique (2fr 1fr 1fr) ou zig-zag
- Max-width : 1400px centré, padding `1rem` mobile, `2rem` tablet, `4rem` desktop
- `min-height: 100dvh` — jamais `height: 100vh`
- Bento : Row 1 = 3 colonnes, Row 2 = 2 colonnes (70/30), chaque tile avec micro-animation

### 7. Responsive Rules
- Mobile-first collapse < 768px → single column, `width: 100%`, `padding: 1rem`
- Pas de scroll horizontal (failure critique)
- Headlines : `clamp()` — body text minimum 1rem / 14px
- Touch targets minimum 44px
- Images inline typographiques → stack sous le titre sur mobile
- Tester : 375px, 390px, 768px, 1024px, 1440px

### 8. Motion & Interaction Intent
*(Stitch génère des écrans statiques — cette section documente l'intent pour le coding agent)*
- Spring physics : `stiffness: 100, damping: 20`
- Micro-loops perpétuelles : Pulse, Typewriter, Float, Shimmer
- Staggered orchestration : `animation-delay: calc(var(--index) * 100ms)`
- Hardware rules : animer UNIQUEMENT `transform` et `opacity`
- 60fps minimum — animations CPU-heavy isolées en leaf components

### 9. Anti-Patterns (Banned List)
- Emojis anywhere
- `Inter` font
- Serif générique (Times, Georgia, Garamond)
- `#000000` pur
- Neon outer glows
- Accents > 80% saturation
- Gradient text sur grands headers
- Custom mouse cursors
- Superposition d'éléments
- 3 cards égales pour features
- Hero centré (si Variance > 4)
- Filler UI : "Scroll to explore", "Swipe down", chevrons rebondissants
- Noms génériques : "John Doe", "Acme Corp"
- Chiffres ronds : `99.99%`, `$100.00`
- Clichés IA : "Elevate", "Seamless", "Unleash", "Revolutionize"
- Liens Unsplash cassés → `picsum.photos/seed/{id}/800/600`
- `shadcn/ui` defaults non-customisés
- `z-index` spam
- `h-screen` → toujours `min-h-[100dvh]`
- Spinners circulaires → skeleton shimmer uniquement
