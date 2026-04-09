<!-- ============================================================ -->
<!-- SKILLS    : /taste + /output                                 -->
<!-- USE CASE  : Site complet multi-pages sans troncature         -->
<!-- QUAND     : Projets ambitieux avec plusieurs pages/composants -->
<!-- ============================================================ -->

<!--
  COMMENT : Ce template combine deux skills pour garantir
  un output de qualité premium ET complet sur des projets larges.
  /taste active le design system premium.
  /output garantit qu'aucune page, section ou composant ne sera
  raccourci, résumé ou remplacé par "...le reste suit le même schéma".

  RÈGLE D'OR : Plus le projet est grand (3+ pages, 5+ composants),
  plus /output est indispensable. Sans lui, Claude tronque naturellement.

  Si le projet est très long → Claude pausera proprement avec le marqueur :
  "[PAUSED — X/Y complet. Écrire 'continuer' pour la suite]"
-->

/output
/taste

Génère un site [TYPE_SITE] complet pour [NOM_PROJET].

**Configuration des dials**
- DESIGN_VARIANCE : [VARIANCE — défaut 8]
- MOTION_INTENSITY : [MOTION — défaut 6]
- VISUAL_DENSITY : [DENSITY — défaut 4]

**Contexte**
- Secteur : [SECTEUR]
- Public cible : [PUBLIC_CIBLE]
- Proposition de valeur : [VALEUR]
- Ton : [TON]

**Liste exhaustive des pages / sections à générer**
<!--
  IMPORTANT : Lister TOUT ce qui doit être livré.
  /output va s'assurer que chaque élément est produit en entier.
-->
[LISTE_COMPLETE — ex:
  Pages :
  1. Home — sections : Hero, Features (bento 6 tiles), Testimonials, Pricing, CTA, Footer
  2. À propos — sections : Manifeste, Équipe, Valeurs, Timeline
  3. Contact — formulaire complet + carte
  
  Composants partagés :
  - Navigation (desktop + mobile)
  - Footer
  - [COMPOSANT_SUPPLEMENTAIRE?]
]

**Palette**
- Accent : [ACCENT — Emerald #10B981 | Blue #3B82F6 | Rose #E11D48 | Amber #F59E0B]

**Stack technique**
- Framework : [FRAMEWORK — ex: Next.js App Router]
- CSS : [CSS — ex: Tailwind v4]
- Animation : [ANIMATION? — ex: Framer Motion]

<!-- ============================================================ -->
<!-- TROUS OBLIGATOIRES :                                         -->
<!--   [TYPE_SITE]           ex: "SaaS B2B", "portfolio agence"  -->
<!--   [NOM_PROJET]          ex: "Parlons Visuel"                -->
<!--   [SECTEUR]             ex: "communication visuelle"        -->
<!--   [PUBLIC_CIBLE]        ex: "entreprises et agences"        -->
<!--   [VALEUR]              proposition de valeur               -->
<!--   [TON]                 ex: "professionnel et créatif"      -->
<!--   [LISTE_COMPLETE]      TOUT ce qui doit être livré         -->
<!--   [ACCENT]              choisir parmi les 4 options         -->
<!--   [FRAMEWORK]           ex: "Next.js 14"                    -->
<!--   [CSS]                 ex: "Tailwind v4"                   -->
<!--                                                              -->
<!-- TROUS OPTIONNELS :                                           -->
<!--   [VARIANCE]            défaut : 8                          -->
<!--   [MOTION]              défaut : 6                          -->
<!--   [DENSITY]             défaut : 4                          -->
<!--   [ANIMATION]           si omis, Claude choisit             -->
<!--   [COMPOSANT_SUP]       composants additionnels si besoin   -->
<!-- ============================================================ -->
