# Industrial Brutalism & Tactical Telemetry — brutalist-skill (Beta)
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/brutalist-skill

Activer le **Brutalist Skill** : interfaces industrielles inspirées du print suisse et des terminaux militaires. Géométrie rigide, typographie massive, dégradation analogique.

> **Beta** : skill expérimental — adapter au contexte projet.

---

## Choisir UN Paradigme (pas les deux)

### Option A : Swiss Industrial Print
- Substrat clair `#F4F4F0`
- Heavy sans-serif massif
- Layouts asymétriques
- Accent rouge aviation `#E61919` uniquement
- Ambiance : poster print suisse, newsprint

### Option B : Tactical Telemetry / CRT Terminal
- Fond dark `#0A0A0A`
- Monospace exclusif pour les données
- Phosphor glow sur les textes critiques
- Scanlines CRT via SVG filters
- Ambiance : terminal militaire, dashboard aérospatial

**Jamais mixer les deux.**

---

## Typographie

### Macro-Typographie (Titres, Headers)
- Famille : Neo-Grotesque / Heavy Sans-Serif
- Tailles extrêmes : `4rem` à `15rem`
- Letter-spacing négatif : `-0.03em` à `-0.06em`
- Uppercase obligatoire sur les éléments structurants
- Line-height compressé : `0.9` à `1.0`

### Micro-Typographie (Labels, Data, Metadata)
- Monospace exclusif
- Tailles fixes petites : `10px` à `14px`
- Tracking généreux sur labels
- Pas de serif à ces tailles

### Tertiary (Texture, Contraste)
- Serif uniquement pour contraste textural
- Fortement dégradé, jamais dominant

---

## Système Couleurs

### Light Mode (Swiss Industrial)
- Background : `#F4F4F0` (papier newsprint)
- Texte : Carbon (noir profond, pas pur)
- Accent UNIQUE : Aviation Red `#E61919`

### Dark Mode (Tactical Telemetry)
- Background : `#0A0A0A`
- Texte : Phosphor green ou amber
- Accent UNIQUE : Aviation Red `#E61919`

---

## Grilles & Layout

- CSS Grid avec géométrie mathématiquement précise
- Compartimentalisation visible via bordures solides
- Angles 90° uniquement — zéro border-radius
- Oscillation de densité : zones hyper-denses vs zones vides
- ASCII framing devices pour délimiter les sections
- Symboles d'enregistrement (®, ©, ™, crosshairs) comme éléments décoratifs
- Metadata technique : numéros REV, IDs d'unités, coordonnées

---

## Dégradation Analogique

Effets à appliquer pour contrecarrer l'aspect purement digital :
- **Halftone dithering** via SVG filters
- **CRT scanlines** : lignes horizontales semi-transparentes
- **Bruit mécanique** : grain léger sur surfaces
- Tous ces effets via `filter` SVG ou pseudo-éléments `fixed`

---

## Composants Language

- Boutons : rectangulaires, border plein, pas de radius
- Inputs : border solide 2px, monospace, fond transparent
- Tables : grilles de données denses, headers en uppercase monospace
- Cards : remplacées par des zones délimitées par des bordures

---

## Checklist Pré-Output

- [ ] UN seul paradigme choisi (Swiss OU Tactical)
- [ ] Pas de border-radius (0 ou 1-2px max sur micro-éléments)
- [ ] Macro-typo : tailles extrêmes + letter-spacing négatif
- [ ] Micro-typo : monospace exclusif pour données
- [ ] 1 seul accent : Aviation Red `#E61919`
- [ ] Grille CSS Grid avec compartimentalisation visible
- [ ] Dégradation analogique présente (scanlines, grain, ou halftone)
- [ ] Aucun emoji, aucun gradient IA
