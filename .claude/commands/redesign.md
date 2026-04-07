# Redesign Skill — Upgrade d'Interface Premium
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/redesign-skill

Activer le **Redesign Skill**. Auditer l'interface existante, diagnostiquer les patterns génériques, appliquer des améliorations premium sans casser les fonctionnalités.

---

## Processus en 3 Étapes

1. **Scan** — Analyser le codebase : framework, méthode de styling (Tailwind, CSS vanilla, styled-components), patterns existants
2. **Diagnose** — Audit complet listant chaque pattern générique, point faible, état manquant
3. **Fix** — Appliquer des améliorations ciblées avec le stack existant (pas de réécriture complète)

---

## Audit Typographie

Problèmes à corriger :
- Police générique (Inter, Arial, Roboto) → Geist, Outfit, Cabinet Grotesk, Satoshi
- Headlines sans poids visuel → augmenter taille, réduire letter-spacing, compression line-height
- Paragraphes > 65ch → limiter la largeur, augmenter line-height
- Seulement Regular/Bold → introduire Medium (500) et SemiBold (600)
- Données chiffrées en proportionnel → `font-variant-numeric: tabular-nums`
- Pas de letter-spacing → négatif sur grands titres, positif sur labels
- Tout en majuscules → essayer italique lowercase, sentence case, ou small-caps
- Veuves (derniers mots orphelins) → `text-wrap: balance` ou `text-wrap: pretty`

---

## Audit Couleurs & Surfaces

- `#000000` pur → off-black (#0a0a0a, #121212)
- Accents oversaturés → saturation < 80%
- Plusieurs accents concurrents → consolider en 1 seul
- Mélange gris chauds/froids → cohérence dans une seule famille
- **Esthétique "AI Purple/Blue gradient"** (signature IA la plus reconnaissable) → base neutre + accent unique réfléchi
- Ombres génériques → teinter les ombres à la couleur du fond
- Design plat sans texture → bruit subtil, grain, micro-patterns
- Sections sombres incohérentes dans pages claires → cohérence ou dark mode complet

---

## Audit Layout

- Centrage excessif → marges décalées, aspect ratios mixtes
- **3 cards égales en rangée** (layout IA le plus générique) → zig-zag 2 colonnes, grille asymétrique, masonry
- `height: 100vh` → `min-height: 100dvh`
- Flexbox avec % complexes → CSS Grid
- Manque de contrainte max-width
- Cards toutes à même hauteur forcée par flexbox → hauteurs variables
- Border-radius uniforme partout → varier selon le type d'élément
- Éléments plats sans superposition → marges négatives pour la profondeur

---

## Audit Interactivité & États

Manques fréquents à corriger :
- Pas de hover states sur les boutons
- Pas de feedback active/pressed
- Transitions instantanées sans durée
- Focus rings manquants (accessibilité obligatoire)
- Spinners circulaires génériques → skeleton loaders
- Pas d'empty states
- Pas d'error states
- Liens morts vers `#`
- Pas d'indication de page active dans la navigation
- Animations sur `top`/`left`/`width` → `transform` et `opacity` uniquement

---

## Audit Contenu

Patterns génériques à éliminer :
- "John Doe", "Jane Smith" → noms diversifiés et réalistes
- Chiffres ronds (99.99%, $100.00) → données organiques (47.2%, $99.00)
- "Acme Corp", "Nexus", "SmartFlow" → noms contextuels crédibles
- Clichés IA : "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer"
- Points d'exclamation dans les messages de succès
- Messages d'erreur vagues type "Oops!"
- Lorem ipsum → contenu réel intentionnel
- Dates de blog identiques → dates organiques variées

---

## Audit Composants

- Cards bordées partout → supprimer les bordures ou n'utiliser que fond/espacement
- Toujours 1 bouton filled + 1 ghost → explorer d'autres combinaisons
- Badges pill "New"/"Beta" → badges carrés, flags, texte simple
- FAQ en accordéon → listes côte-à-côte ou disclosure progressive inline
- Carrousel testimonials 3 cards → alternatives créatives
- 3 colonnes pricing identiques → architectures plus distinctives
- Modals pour actions simples → édition inline ou slide-over panels
- Avatars circulaires exclusivement → squircles, carrés arrondis

---

## Audit Iconographie

- Lucide/Feather exclusivement (choix IA par défaut) → Phosphor, Heroicons, ou sets personnalisés
- Métaphores clichées (fusée = "Launch", bouclier = "Security")
- Stroke widths incohérents entre icon sets
- Favicon manquant
- Photos "diverse team" stock → vraies photos ou illustrations cohérentes

---

## Omissions Stratégiques Fréquentes

Éléments oubliés à vérifier :
- Liens légaux (politique de confidentialité, CGU)
- Navigation retour (pas de dead ends dans les flows)
- Page 404 personnalisée
- Validation des formulaires
- Lien "skip to content" pour accessibilité clavier
- Cookie consent si requis

---

## Priorité d'Implémentation

Ordre optimal pour impact maximal, risque minimal :

1. **Font swap** — amélioration visuelle instantanée, risque zéro
2. **Palette couleurs** — supprimer les clashes et oversaturation
3. **Hover + active states** — rend l'interface réactive
4. **Layout + espacement** — grid propre, max-width, padding cohérent
5. **Composants génériques** — remplacer les patterns clichés
6. **États loading/empty/error** — sentiment de complétude
7. **Polish typographique** — touches finales premium

---

## Règles Projet

- Maintenir compatibilité avec le stack existant (pas de migration de framework)
- Préserver toutes les fonctionnalités existantes, tester après chaque changement
- Vérifier les dépendances nouvelles dans le fichier de dépendances du projet
- Pour Tailwind : confirmer v3 vs v4 avant de modifier la configuration
- Préférer des améliorations ciblées aux réécritures globales
