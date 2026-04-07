# Premium Utilitarian Minimalism — minimalist-skill
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/minimalist-skill

Activer le **Minimalist Skill** : interfaces éditoriales épurées, type Notion / Linear. Contraste typographique extrême, palette monochrome chaude, architecture flat sans ornements.

---

## Philosophie Design

Chaque élément gagne sa place par la fonction. Pas d'ornementation. Pas de gradients. Pas de shadows lourdes. La typographie EST le design.

---

## Restrictions Absolues

**Polices interdites :** Inter, Roboto, Open Sans, Helvetica
**Icônes interdites :** Lucide, Feather (trop génériques)
**Effets interdits :** Shadows lourdes, gradients, couleurs neon, emojis
**Containers interdits :** Pill-shapes, border-radius excessif
**Copywriting interdit :** "seamless", "unleash", "next-gen" → langage direct et spécifique uniquement
**Fond clair interdit :** Blanc pur en background (utiliser bone white ou warm gray)

---

## Palette Couleurs

| Rôle | Couleur |
|------|---------|
| Background principal | Warm Bone `#F7F6F3` |
| Surfaces cards | Blanc `#FFFFFF` |
| Texte principal | Off-black `#111111` ou `#2F3437` |
| Texte secondaire | Gris doux (Zinc-500 ou similaire) |
| Bordures | Ultra-light `#EAEAEA` (1px uniquement) |
| Accents sémantiques | Pastels désaturés : rouge pâle, bleu, vert, jaune |

Jamais `#000000` pur. Jamais d'accent > 80% saturation.

---

## Typographie

**Body / UI :** SF Pro Display, Geist Sans, Helvetica Neue
- Couleur : `#111111` ou `#2F3437`
- Weight : 400 (regular), avec Medium/Semibold pour hiérarchie

**Editorial Headlines :** Lyon Text, Newsreader, Playfair Display
- Tracking serré : `-0.02em` à `-0.04em`
- Contraste dramatique vs body

**Code / Metadata :** Monospace
- `line-height: 1.6` pour lisibilité
- Pour data-dense : tous les chiffres passent en monospace

**Scale :** Contraste extrême entre titres et body — l'écart crée la hiérarchie.

---

## Composants

### Cards
- `border: 1px solid #EAEAEA`
- `border-radius: 8px` à `12px` (crisp, pas arrondi excessif)
- Padding généreux
- Shadow : aucune ou ultra-diffuse

### Boutons
- Primary : fond `#111111`, texte blanc, border-radius minimal
- Pas de shadow
- Pas de gradients
- Hover : shift subtil de background

### Layout
- Bento grids avec proportions variées
- Séparateurs `border-top 1px #EAEAEA` plutôt que cards
- Whitespace agressif — l'espace vide est un élément design

---

## Motion

**Principe : invisible.** Si on remarque l'animation, elle est trop forte.

- Scroll-entry : `translateY(12px)` + opacity sur 600ms, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Hover states : shift de shadow ultra-diffus (20px blur, delta de 2-3px max)
- Grid items : staggered delays (`animation-delay: calc(var(--index) * 80ms)`)
- JAMAIS `window.addEventListener` pour animations — IntersectionObserver uniquement
- Animer UNIQUEMENT `transform` et `opacity`

---

## Iconographie

**Uniquement :** Phosphor Icons ou Radix Icons
- Style : monochrome, stroke weight cohérent
- Illustrations : monochromatiques uniquement

---

## Checklist Pré-Output

- [ ] Aucune police Inter/Roboto/Arial
- [ ] Fond bone white (pas de blanc pur)
- [ ] 1 seul accent (pastel désaturé)
- [ ] Bordures 1px `#EAEAEA` uniquement
- [ ] Aucun gradient, aucun neon
- [ ] Motion invisible (translateY 12px max, 600ms)
- [ ] Icônes Phosphor ou Radix uniquement
- [ ] Pas d'emoji
- [ ] IntersectionObserver (pas de scroll listener)
