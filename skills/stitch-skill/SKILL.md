# Stitch Design Taste — stitch-skill
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/stitch-skill
# Note: Copie locale pour usage offline et contrôle des données

## Overview

Generates `DESIGN.md` files for Google Stitch that enforce premium UI standards through semantic design language. Translates anti-generic frontend directives into natural-language rules paired with precise values.

## Visual Atmosphere Spectrum

| Dimension | Scale | Description |
|-----------|-------|-------------|
| Density | 1–3 | Art Gallery Airy |
| Density | 4–7 | Daily App Balanced |
| Density | 8–10 | Cockpit Dense |
| Variance | 1–3 | Predictable Symmetric |
| Variance | 4–7 | Offset Asymmetric |
| Variance | 8–10 | Artsy Chaotic |
| Motion | 1–3 | Static Restrained |
| Motion | 4–7 | Fluid CSS |
| Motion | 8–10 | Cinematic Choreography |

## Critical Design Constraints

**Color:**
- Maximum 1 accent color. Saturation below 80%
- "AI Purple/Blue Neon" aesthetic STRICTLY BANNED
- Never pure black — Off-Black, Zinc-950, or Charcoal only

**Typography:**
- Inter BANNED for premium contexts → Geist, Outfit, Cabinet Grotesk, Satoshi
- Generic serifs (Times, Georgia, Garamond) BANNED
- Serif ALWAYS BANNED in dashboards or software UIs
- Dashboard constraint: Sans-serif pairings exclusively

**Hero Section:**
- Inline image typography (small photos embedded between words) as visual punctuation
- No overlapping text or images
- Centered Hero BANNED when variance > 4
- Maximum 1 primary CTA

**Layout:**
- No overlapping elements — clean spatial separation mandatory
- Generic 3-column equal card layouts BANNED
- Mobile-first collapse below 768px; no horizontal scroll
- CSS Grid over Flexbox; `clamp()` for responsive typography
- Touch targets minimum 44px

**Motion:**
- Spring physics default: `stiffness: 100, damping: 20`
- Animate only via `transform` and `opacity`

## Explicit Anti-Patterns

- No emojis
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash")
- No filler UI ("Scroll to explore", bouncing chevrons)
- No custom cursors
- No broken image links → use `picsum.photos/seed/{id}/800/600`

## Usage

When invoked, generate a complete `DESIGN.md` file covering all 9 system components:
1. Visual theme & atmosphere
2. Color palette with hex codes & functional roles
3. Typography rules with font stacks
4. Component stylings (buttons, cards, inputs, loaders)
5. Layout principles (grid-first, responsive)
6. Hero section rules
7. Responsive rules (mobile collapse, touch targets, viewports)
8. Motion philosophy (spring physics, perpetual loops, staggered reveals)
9. Anti-patterns (explicit banned list)
