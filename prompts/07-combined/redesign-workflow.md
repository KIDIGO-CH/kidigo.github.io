<!-- ============================================================ -->
<!-- SKILLS    : /redesign + /output                              -->
<!-- USE CASE  : Redesign end-to-end garanti sans raccourcis      -->
<!-- QUAND     : Upgrade d'un projet existant avec beaucoup de    -->
<!--             composants ou de fichiers à modifier             -->
<!-- ============================================================ -->

<!--
  COMMENT : Ce template combine /redesign et /output pour garantir
  un audit et une correction complets — chaque fichier modifié est
  livré en entier, sans "// le reste reste identique".

  SANS /output, /redesign peut produire :
  - Un diagnostic complet mais des corrections partielles
  - Des exemples de fix sans appliquer à tous les composants

  AVEC /output, chaque correction est produite intégralement.

  Pour les très gros projets : Claude pausera avec un marqueur clair
  pour reprendre section par section.
-->

/output
/redesign

Audite et corrige intégralement ce projet [TYPE_PROJET].

**Stack existant**
- Framework : [FRAMEWORK_EXISTANT]
- CSS : [CSS_EXISTANT]
- Librairies : [LIBRAIRIES?]

**Codebase à upgrader**
[SOURCE_CODE — coller les fichiers ou indiquer les chemins]

**Objectifs du redesign**
[OBJECTIFS — ex:
  1. Passer de Inter → Geist + typographie premium
  2. Remplacer les 3 cards identiques par un bento asymétrique
  3. Ajouter loading/empty/error states sur tous les composants
  4. Nettoyer la palette : trop saturée, accents multiples
  5. [OBJECTIF_SUPPLEMENTAIRE?]
]

**Périmètre de l'audit**
[PERIMETRE — ex:
  Fichiers à auditer :
  - src/app/page.tsx
  - src/components/Hero.tsx
  - src/components/Features.tsx
  - [AUTRES_FICHIERS]
]

**Contraintes à respecter**
- Fonctionnalités à préserver : [FONCTIONNALITES_A_PRESERVER — ex: "logique de routing", "API calls"]
- Pas de changement sur : [HORS_PERIMETRE? — ex: "le fichier auth.ts", "la structure de la DB"]

**Priorité d'exécution**
[PRIORITE? — ex: "Typo et couleurs en premier, layout ensuite, états en dernier"]

<!-- ============================================================ -->
<!-- TROUS OBLIGATOIRES :                                         -->
<!--   [TYPE_PROJET]              ex: "landing page SaaS"        -->
<!--   [FRAMEWORK_EXISTANT]       ex: "Next.js 14"               -->
<!--   [CSS_EXISTANT]             ex: "Tailwind v3"              -->
<!--   [SOURCE_CODE]              code ou chemins des fichiers   -->
<!--   [OBJECTIFS]                liste précise des corrections  -->
<!--   [PERIMETRE]                fichiers concernés             -->
<!--   [FONCTIONNALITES_A_PRESERVER] ce qui ne doit pas changer  -->
<!--                                                              -->
<!-- TROUS OPTIONNELS :                                           -->
<!--   [LIBRAIRIES]               si omis, Claude détecte        -->
<!--   [OBJECTIF_SUPPLEMENTAIRE]  objectif additionnel           -->
<!--   [HORS_PERIMETRE]           si omis, pas de restriction    -->
<!--   [PRIORITE]                 si omis, ordre standard        -->
<!-- ============================================================ -->
