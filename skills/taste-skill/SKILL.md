# High-Agency Frontend Skill — taste-skill
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill
# Note: Copie locale pour usage offline et contrôle des données

## Core Configuration

- **DESIGN_VARIANCE** = 8 — asymmetric layouts by default (user-overridable)
- **MOTION_INTENSITY** = 6 — spring physics, perpetual micro-interactions
- **VISUAL_DENSITY** = 4 — gallery-airy, spacious

## Key Architectural Mandates

**Dependency verification is mandatory.** Before importing any third-party library, check `package.json` and output installation commands if packages are missing.

- Default framework: React/Next.js with Server Components (RSC)
- Global state: `useState`/`useReducer` in Client Components only
- Styling: Tailwind CSS v3/v4 for 90% of styles; CSS Grid over complex flexbox
- **Mobile viewport**: `min-h-[100dvh]` — never `h-screen` (iOS Safari address bar jump)
- **Anti-emoji policy is absolute**: ALL emojis banned in code, markup, and content — replace with Phosphor or Radix Icons

## Design Bias Correction: 6 Deterministic Rules

1. **Typography**: Headlines `text-4xl md:text-6xl`. Premium fonts: Geist, Outfit, Cabinet Grotesk, Satoshi. `Inter` BANNED.
2. **Color**: Max 1 accent < 80% saturation. "AI Purple/Blue" aesthetic BANNED. Never `#000000` pure black.
3. **Layout**: Centered Hero BANNED when variance > 4. Asymmetric grid mandatory.
4. **Cards**: Overuse PROHIBITED — functional elevation justification required. Prefer borders or whitespace.
5. **States**: Loading + Empty + Error states MANDATORY on every component.
6. **Forms**: Label above input, consistent spacing.

## Creative Arsenal

Advanced interaction patterns:
- **Liquid Glass**: refraction with inner borders + inner shadows
- **Magnetic micro-physics**: buttons with cursor attraction physics
- **Perpetual micro-interactions**: spring physics infinite animations (`stiffness: 100, damping: 20`)
- **Layout transitions**: Framer Motion `layout` + `layoutId` for fluid reorganizations
- **Bento Paradigm**: `#f9fafb` background, `rounded-[2.5rem]` cards, perpetual micro-animations isolated in dedicated Client Components

## Performance Guardrails

- Animate ONLY `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Grain filters: fixed pseudo-elements ONLY, never on scrollable elements
- CPU-intensive animations: isolate in micro Client Components to maintain 60fps
- `useEffect`: cleanup functions MANDATORY

## Forbidden Patterns

| Forbidden | Replacement |
|-----------|-------------|
| `Inter` font | Geist, Satoshi, Outfit, Cabinet Grotesk |
| Neon glow purple/blue | Single desaturated accent |
| `#000000` pure black | Off-black, Zinc-950 |
| Centered Hero (variance > 4) | Split-screen, asymmetry, bento |
| 3 identical feature cards | Zig-zag, asymmetric bento, masonry |
| "Acme Corp", "John Doe" | Contextual realistic names |
| "Seamless", "Unleash", "Next-Gen" | Direct, specific copywriting |
| Lorem ipsum | Intentional real content |
| `h-screen` | `min-h-[100dvh]` |
| Emojis | High-quality icon libraries |
| Lucide/Feather (default choice) | Phosphor, Heroicons, custom sets |

## Pre-Flight Checklist

- [ ] No unnecessary global state
- [ ] `min-h-[100dvh]` (never `h-screen`)
- [ ] Mobile collapse verified (< 768px)
- [ ] `useEffect` with cleanup functions
- [ ] Complete loading/empty/error states
- [ ] Cards avoided or justified
- [ ] CPU-heavy animations isolated in Client Components
- [ ] No Inter font, no emojis
