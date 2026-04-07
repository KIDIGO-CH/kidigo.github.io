# Industrial Brutalism & Tactical Telemetry UI — brutalist-skill (Beta)
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/brutalist-skill
# Note: Copie locale pour usage offline et contrôle des données

## Overview

Specialized design system synthesizing Swiss modernist typography with military/aerospace terminal aesthetics. Two distinct visual paradigms — commit fully to ONE per project.

## Two Visual Paradigms (Choose ONE)

### Swiss Industrial Print (Light Mode)
- Substrate: `#F4F4F0` (newsprint paper)
- Heavy sans-serif at extreme scales
- Asymmetric layouts
- Aviation Red `#E61919` as sole accent
- Atmosphere: Swiss poster print, newsprint

### Tactical Telemetry / CRT Terminal (Dark Mode)
- Background: `#0A0A0A`
- Monospace exclusively for all data
- Phosphor glow on critical text elements
- CRT scanlines via SVG filters
- Atmosphere: military terminal, aerospace dashboard

**Never mix both paradigms.**

## Typographic Hierarchy

### Macro-Typography (Titles, Headers)
- Family: Neo-Grotesque / Heavy Sans-Serif
- Extreme sizes: `4rem` to `15rem`
- Letter-spacing: `-0.03em` to `-0.06em` (negative)
- Uppercase mandatory on structural elements
- Line-height compressed: `0.9` to `1.0`

### Micro-Typography (Labels, Data, Metadata)
- Monospace EXCLUSIVELY
- Fixed small sizes: `10px` to `14px`
- Generous tracking on labels
- No serif at these sizes

### Tertiary (Textural Contrast Only)
- Serif only for textural contrast
- Heavily degraded, never dominant

## Color System

### Light Mode (Swiss Industrial)
- Background: `#F4F4F0` (newsprint)
- Text: Carbon (deep black, not pure)
- SINGLE accent: Aviation Red `#E61919`

### Dark Mode (Tactical Telemetry)
- Background: `#0A0A0A`
- Text: Phosphor green or amber
- SINGLE accent: Aviation Red `#E61919`

## Spatial Logic & Grid

- CSS Grid with mathematically precise geometry
- Visible compartmentalization via solid borders
- 90-degree angles ONLY — zero border-radius
- Oscillating density: hyper-dense zones vs empty zones
- ASCII framing devices to delimit sections
- Registration symbols (®, ©, ™, crosshairs) as decorative elements
- Technical metadata: REV numbers, unit IDs, coordinates

## Analog Degradation Effects

Apply to counter purely digital appearance:
- **Halftone dithering**: SVG filters
- **CRT scanlines**: semi-transparent horizontal lines
- **Mechanical noise**: light grain on surfaces
- All via SVG `filter` or `fixed` pseudo-elements

## Component Language

- Buttons: rectangular, solid border, no radius
- Inputs: solid 2px border, monospace, transparent background
- Tables: dense data grids, uppercase monospace headers
- Cards: replaced by border-delimited zones

## Pre-Output Checklist

- [ ] ONE paradigm chosen (Swiss OR Tactical)
- [ ] No border-radius (0 or 1-2px max on micro-elements)
- [ ] Macro-typo: extreme sizes + negative letter-spacing
- [ ] Micro-typo: monospace exclusively for data
- [ ] 1 accent only: Aviation Red `#E61919`
- [ ] CSS Grid with visible compartmentalization
- [ ] Analog degradation present (scanlines, grain, or halftone)
- [ ] No emojis, no AI gradients
