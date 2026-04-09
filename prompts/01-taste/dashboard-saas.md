<!-- ============================================================ -->
<!-- SKILL     : /taste                                           -->
<!-- USE CASE  : Dashboard SaaS — interface dense et fonctionnelle-->
<!-- DIALS     : VARIANCE=6, MOTION=5, DENSITY=7                  -->
<!-- ============================================================ -->

<!--
  COMMENT : Template pour un dashboard applicatif.
  VISUAL_DENSITY est volontairement élevé (7) pour les dashboards.
  DESIGN_VARIANCE réduit (6) pour maintenir la lisibilité des données.
  Préciser les métriques et modules avec exactitude pour un output utile.
-->

/taste

Génère un dashboard [TYPE_DASHBOARD] pour [NOM_PRODUIT].

**Configuration des dials**
- DESIGN_VARIANCE : [VARIANCE — défaut 6 pour dashboard]
- MOTION_INTENSITY : [MOTION — défaut 5]
- VISUAL_DENSITY : [DENSITY — défaut 7 pour interface dense]

**Contexte applicatif**
- Type de dashboard : [TYPE_DASHBOARD — ex: analytics, CRM, finance, monitoring]
- Utilisateur type : [UTILISATEUR — ex: "manager marketing", "développeur DevOps"]
- Données principales affichées : [DONNEES_PRINCIPALES]

**Métriques KPI (rangée haute)**
[LISTE_KPI — ex: "Revenus MRR, Nouveaux clients, Churn rate, NPS"]

**Modules / Widgets**
[LISTE_MODULES — ex: "Graphe évolution revenus, Table top clients, Carte géographique, Feed activité récente"]

**Navigation**
- Items de menu : [ITEMS_MENU — ex: "Overview, Clients, Revenus, Rapports, Paramètres"]
- Position nav : [POSITION_NAV — sidebar gauche | top bar]

**Palette**
- Accent : [COULEUR_ACCENT — Emerald #10B981 | Blue #3B82F6 | Rose #E11D48 | Amber #F59E0B]

**Stack technique**
- Framework : [FRAMEWORK — ex: Next.js App Router]
- CSS : [CSS — ex: Tailwind v4]
- Librairie graphes : [GRAPHES? — ex: Recharts, Chart.js — laisser vide si pas de préférence]

<!-- ============================================================ -->
<!-- TROUS OBLIGATOIRES :                                         -->
<!--   [TYPE_DASHBOARD]       ex: "analytics e-commerce"         -->
<!--   [NOM_PRODUIT]          ex: "Shopmetrics"                  -->
<!--   [UTILISATEUR]          ex: "directeur commercial"         -->
<!--   [DONNEES_PRINCIPALES]  ex: "commandes, revenus, stocks"   -->
<!--   [LISTE_KPI]            ex: "MRR, ARR, Churn, LTV"        -->
<!--   [LISTE_MODULES]        ex: "Courbe revenue, Top produits" -->
<!--   [ITEMS_MENU]           ex: "Tableau de bord, Produits..." -->
<!--   [POSITION_NAV]         sidebar gauche | top bar           -->
<!--   [COULEUR_ACCENT]       choisir parmi les 4 options        -->
<!--   [FRAMEWORK]            ex: "Next.js 14"                   -->
<!--   [CSS]                  ex: "Tailwind v4"                  -->
<!--                                                              -->
<!-- TROUS OPTIONNELS :                                           -->
<!--   [VARIANCE]             défaut : 6                         -->
<!--   [MOTION]               défaut : 5                         -->
<!--   [DENSITY]              défaut : 7                         -->
<!--   [GRAPHES]              si omis, Claude choisit            -->
<!-- ============================================================ -->
