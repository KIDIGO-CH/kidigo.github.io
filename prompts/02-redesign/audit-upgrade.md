<!-- ============================================================ -->
<!-- SKILL     : /redesign                                        -->
<!-- USE CASE  : Audit complet + upgrade d'interface existante    -->
<!-- PROCESS   : Scan → Diagnose → Fix (séquentiel, ciblé)        -->
<!-- ============================================================ -->

<!--
  COMMENT : Template pour upgrader un projet existant.
  Le skill analyse en 3 étapes : scan du code, diagnostic, corrections.
  Ne pas demander une réécriture complète — /redesign travaille
  dans le stack existant sans casser les fonctionnalités.
  Plus vous décrivez précisément les problèmes, plus les corrections
  seront ciblées et efficaces.
-->

/redesign

Audite et upgradie ce projet [TYPE_PROJET] vers un niveau de qualité premium.

**Stack existant**
- Framework : [FRAMEWORK_EXISTANT — ex: React, Vue, HTML/CSS vanilla]
- CSS : [CSS_EXISTANT — ex: Tailwind v3, CSS modules, styled-components]
- Librairies UI : [LIBRAIRIES? — ex: shadcn/ui, MUI, Radix]

**Description du projet**
[DESCRIPTION_PROJET — ex: "Landing page pour une agence web, actuellement générique et peu différenciée"]

**Accès au code**
[SOURCE_CODE — ex: "Voici les fichiers concernés :" suivi du code, ou chemin vers les fichiers]

**Problèmes identifiés** *(optionnel — le skill diagnostique lui-même, mais l'aider accélère)*
[PROBLEMES_IDENTIFIES? — ex:
  - Polices génériques (Inter partout)
  - Palette trop saturée, trop de couleurs
  - Layout 3 cards identiques en rangée
  - Pas d'états loading/empty/error
  - Icônes Lucide trop génériques
]

**Priorités** *(dans quel ordre intervenir)*
[PRIORITES? — ex: "Typo en premier, ensuite layout, puis états manquants"]

**Contraintes**
- À préserver absolument : [CONTRAINTES — ex: "L'ordre des sections doit rester identique", "Pas de changement de framework"]
- À éviter : [EVITER? — ex: "Ne pas ajouter de dépendances lourdes"]

<!-- ============================================================ -->
<!-- TROUS OBLIGATOIRES :                                         -->
<!--   [TYPE_PROJET]          ex: "landing page", "dashboard"    -->
<!--   [FRAMEWORK_EXISTANT]   ex: "React 18"                     -->
<!--   [CSS_EXISTANT]         ex: "Tailwind v3"                  -->
<!--   [DESCRIPTION_PROJET]   description honnête de l'existant  -->
<!--   [SOURCE_CODE]          coller le code ou indiquer chemin  -->
<!--   [CONTRAINTES]          ce qui ne doit pas changer         -->
<!--                                                              -->
<!-- TROUS OPTIONNELS :                                           -->
<!--   [LIBRAIRIES]           si omis, Claude détecte            -->
<!--   [PROBLEMES_IDENTIFIES] si omis, Claude diagnostique seul  -->
<!--   [PRIORITES]            si omis, ordre standard du skill   -->
<!--   [EVITER]               si omis, pas de restriction        -->
<!-- ============================================================ -->
