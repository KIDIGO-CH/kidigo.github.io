# Bibliothèque de Prompts — parlonsvisuel.com

Prompts "textes à trous" optimisés pour les 7 skills taste-skill installés dans `.claude/commands/`.  
Copier-coller le prompt dans Claude Code, remplir les `[TROUS]`, envoyer.

---

## Convention de notation

| Notation | Signification |
|----------|---------------|
| `[TROU_OBLIGATOIRE]` | À remplir — le prompt échouera sans cette info |
| `[TROU_OPTIONNEL?]` | Facultatif — une valeur par défaut s'applique si omis |
| `[CHOIX_A \| CHOIX_B]` | Choisir une option parmi la liste |

---

## Index des prompts

### /taste — Design premium React/Next.js

| Fichier | Use case |
|---------|----------|
| `01-taste/landing-page.md` | Landing page tous secteurs |
| `01-taste/dashboard-saas.md` | Dashboard SaaS dense |
| `01-taste/portfolio.md` | Portfolio créatif/professionnel |
| `01-taste/hero-component.md` | Composant Hero isolé |

### /redesign — Audit + upgrade d'interface existante

| Fichier | Use case |
|---------|----------|
| `02-redesign/audit-upgrade.md` | Audit complet + corrections ciblées |

### /soft — Expériences agency-level Awwwards

| Fichier | Use case |
|---------|----------|
| `03-soft/ethereal-glass.md` | UI sombre, tech, premium — OLED + mesh gradients |
| `03-soft/editorial-luxury.md` | Marque luxe, magazine, editorial |
| `03-soft/soft-structuralism.md` | App productivité, SaaS structuré |

### /minimalist — Interfaces éditoriales Notion/Linear

| Fichier | Use case |
|---------|----------|
| `04-minimalist/editorial-site.md` | Site éditorial, blog premium |
| `04-minimalist/app-productivity.md` | App productivité, dashboard épuré |

### /brutalist — Esthétique industrielle (Beta)

| Fichier | Use case |
|---------|----------|
| `05-brutalist/swiss-industrial.md` | Print suisse, poster typographique |
| `05-brutalist/tactical-terminal.md` | Terminal militaire, dashboard CRT |

### /stitch — Génération DESIGN.md pour Google Stitch

| Fichier | Use case |
|---------|----------|
| `06-stitch/design-system.md` | Système de design complet |
| `06-stitch/startup-landing.md` | Landing page startup |

### /combined — Workflows multi-skills

| Fichier | Skills combinés | Use case |
|---------|----------------|----------|
| `07-combined/taste-output-fullsite.md` | /taste + /output | Site complet sans troncature |
| `07-combined/redesign-workflow.md` | /redesign + /output | Redesign end-to-end garanti complet |

---

## Les 3 dials du skill /taste

Ajustables dans chaque prompt selon l'intensité souhaitée :

| Dial | Valeur basse | Valeur par défaut | Valeur haute |
|------|-------------|-------------------|--------------|
| `DESIGN_VARIANCE` | Symétrique, prévisible (1) | **8** | Asymétrique, chaotique (10) |
| `MOTION_INTENSITY` | Statique (1) | **6** | Spring physics cinématique (10) |
| `VISUAL_DENSITY` | Gallery airy (1) | **4** | Cockpit dense (10) |

## Les 4 dials du skill /stitch

| Dial | Valeur basse | Valeur par défaut | Valeur haute |
|------|-------------|-------------------|--------------|
| `Creativity` | Ultra-minimal suisse (1) | **8** | Editorial audacieux (10) |
| `Density` | Gallery airy (1) | **4** | Cockpit dense (10) |
| `Variance` | Symétrique (1) | **8** | Artsy chaotique (10) |
| `Motion Intent` | Statique (1) | **6** | Orchestration cinématique (10) |

---

## Combiner /output avec tout autre skill

`/output` peut (et devrait) être combiné avec n'importe quel skill pour garantir des livrables complets sur des projets ambitieux. Il suffit d'activer les deux dans le même prompt :

```
/output
/taste

[votre prompt]
```
