<!-- ============================================================ -->
<!-- SKILL     : /soft                                            -->
<!-- USE CASE  : Ethereal Glass — UI sombre, tech, OLED premium  -->
<!-- ARCHETYPE : Vibe Ethereal Glass + layout au choix            -->
<!-- ============================================================ -->

<!--
  COMMENT : Pour des interfaces sombres haut de gamme.
  Ambiance : OLED noir, mesh gradients ambiants, inner borders 1px lumineux,
  backdrop-filter blur sur éléments fixes. Idéal pour produits tech premium,
  apps crypto/finance, outils développeurs, portfolios sombres.
  Le layout archetype est à choisir parmi les 3 options.
-->

/soft

Vibe archetype : Ethereal Glass.
Layout archetype : [LAYOUT — Asymmetrical Bento | Z-Axis Cascade | Editorial Split].

Génère [TYPE_INTERFACE] pour [CONTEXTE_PRODUIT].

**Contenu & sections**
[LISTE_SECTIONS — ex:
  - Hero : [TITRE_HERO] / [SOUS_TITRE]
  - Features : [LISTE_FEATURES]
  - [SECTION_3?]
  - [SECTION_4?]
]

**Palette**
- Accent : [COULEUR_ACCENT — Emerald #10B981 | Blue #3B82F6 | Rose #E11D48 | Amber #F59E0B]
- Intensité du glow : [INTENSITE_GLOW — subtil | medium | prononcé]

**Motion**
- Micro-interactions : [MICRO_INTERACTIONS — ex: "magnetic hover sur les cards", "particules flottantes en fond", "typewriter sur le titre"]
- Spring physics : stiffness=100, damping=20 (fixe, non modifiable)

**Stack technique**
- Framework : [FRAMEWORK — ex: Next.js App Router]
- CSS : [CSS — ex: Tailwind v4]
- Animation : [ANIMATION? — ex: Framer Motion]

<!-- ============================================================ -->
<!-- TROUS OBLIGATOIRES :                                         -->
<!--   [LAYOUT]              choisir parmi les 3 archetypes      -->
<!--   [TYPE_INTERFACE]      ex: "landing page", "dashboard"     -->
<!--   [CONTEXTE_PRODUIT]    ex: "outil de monitoring DevOps"    -->
<!--   [LISTE_SECTIONS]      sections avec leur contenu          -->
<!--   [COULEUR_ACCENT]      choisir parmi les 4 options         -->
<!--   [FRAMEWORK]           ex: "Next.js 14"                    -->
<!--   [CSS]                 ex: "Tailwind v4"                   -->
<!--                                                              -->
<!-- TROUS OPTIONNELS :                                           -->
<!--   [INTENSITE_GLOW]      défaut : subtil                     -->
<!--   [MICRO_INTERACTIONS]  si omis, Claude choisit             -->
<!--   [ANIMATION]           si omis, Claude choisit             -->
<!-- ============================================================ -->
