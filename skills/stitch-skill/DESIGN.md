# Design System: Taste Standard
**Skill:** stitch-design-taste
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/stitch-skill
# Note: Copie locale pour usage offline et contrôle des données

---

## Configuration — Set Your Style

| Dial | Level | Description |
|------|-------|-------------|
| **Creativity** | `8` | 1 = Ultra-minimal, Swiss, silent. 5 = Balanced with personality. 10 = Expressive, editorial, bold typography experiments, strong asymmetry. Default: `8` |
| **Density** | `4` | 1 = Gallery-airy, massive whitespace. 5 = Balanced. 10 = Cockpit-dense, data-heavy. Default: `4` |
| **Variance** | `8` | 1 = Predictable, symmetric grids. 5 = Subtle offsets. 10 = Artsy chaotic, no two sections alike. Default: `8` |
| **Motion Intent** | `6` | 1 = Static, no animation. 5 = Subtle hover/entrance cues. 10 = Cinematic orchestration in every component. Default: `6` |

> **How to use:** Change the numbers above to match your project's vibe. At **Creativity 1–3**, the system produces clean, quiet, Notion-like interfaces. At **Creativity 7–10**, expect inline image typography, dramatic scale contrast, and strong editorial layouts.

---

## 1. Visual Theme & Atmosphere

A restrained, gallery-airy interface with confident asymmetric layouts and fluid spring-physics motion. The atmosphere is clinical yet warm — like a well-lit architecture studio where every element earns its place through function. Density is balanced (Level 4), variance runs high (Level 8) to prevent symmetrical boredom, and motion is fluid but never theatrical (Level 6). The overall impression: expensive, intentional, alive.

## 2. Color Palette & Roles

- **Canvas White** (`#F9FAFB`) — Primary background surface. Warm-neutral, never clinical blue-white
- **Pure Surface** (`#FFFFFF`) — Card and container fill. Used with whisper shadow for elevation
- **Charcoal Ink** (`#18181B`) — Primary text. Zinc-950 depth — never pure black
- **Steel Secondary** (`#71717A`) — Body text, descriptions, metadata. Zinc-500 warmth
- **Muted Slate** (`#94A3B8`) — Tertiary text, timestamps, disabled states
- **Whisper Border** (`rgba(226,232,240,0.5)`) — Card borders, structural 1px lines
- **Diffused Shadow** (`rgba(0,0,0,0.05)`) — Card elevation. 40px blur, -15px offset. Never harsh

### Accent Selection (Pick ONE per project)
- **Emerald Signal** (`#10B981`) — Growth, success, positive data dashboards
- **Electric Blue** (`#3B82F6`) — Productivity, SaaS, developer tools
- **Deep Rose** (`#E11D48`) — Creative, editorial, fashion-adjacent
- **Amber Warmth** (`#F59E0B`) — Community, social, warm-toned products

### Banned Colors
- Purple/Violet neon gradients — the "AI Purple" aesthetic
- Pure Black (`#000000`) — always Off-Black or Zinc-950
- Oversaturated accents above 80% saturation
- Mixed warm/cool gray systems within one project

## 3. Typography Rules

- **Display:** `Geist`, `Satoshi`, `Cabinet Grotesk`, or `Outfit` — Tracking: `-0.025em`, fluid scale `clamp(2.25rem, 5vw, 3.75rem)`, weight 700–900. `Inter` BANNED.
- **Body:** Same family, weight 400, leading 1.65, max-width 65ch, Steel Secondary `#71717A`
- **Mono:** `Geist Mono` or `JetBrains Mono` — For code blocks, metadata, timestamps
- **Scale:** Display at `clamp(2.25rem, 5vw, 3.75rem)`. Body at `1rem/1.125rem`. Mono metadata at `0.8125rem`

### Banned Fonts
- `Inter` — banned everywhere in premium/creative contexts
- `Times New Roman`, `Georgia`, `Garamond`, `Palatino` — BANNED
- If serif needed: `Fraunces`, `Gambarino`, `Editorial New`, or `Instrument Serif` ONLY
- Serif always BANNED in dashboards or software UIs

## 4. Component Stylings

- **Buttons:** Flat surface, no outer glow. Primary: accent fill + white text. Active: `-1px translateY` or `scale(0.98)`. Hover: subtle background shift, never glow.
- **Cards:** `border-radius: 2.5rem`. Pure white fill. Whisper border 1px semi-transparent. Shadow: `0 20px 40px -15px rgba(0,0,0,0.05)`. Padding `2rem–2.5rem`.
- **Inputs/Forms:** Label above input. Error text below in Deep Rose. Focus ring in accent, 2px offset. No floating labels.
- **Navigation:** Sticky. Icons scale on hover. No hamburger on desktop.
- **Loaders:** Skeletal shimmer matching exact layout dimensions. Never circular spinners.
- **Empty States:** Composed illustration or icon + guidance text. Never "No data found."
- **Error States:** Inline, contextual. Red accent underline or border. Clear recovery action.

## 5. Hero Section

- **Inline Image Typography:** Embed small contextual photos directly between words in the headline. Images sit inline at type-height, rounded, as visual punctuation.
- **No Overlapping Elements:** Text must never overlap images. Every element has its own spatial zone.
- **No Filler Text:** "Scroll to explore", scroll arrows, bouncing chevrons — ALL BANNED.
- **Asymmetric Structure:** Centered Hero BANNED at this variance level. Use Split Screen (50/50), Left-Aligned text / Right visual, or Asymmetric Whitespace.
- **CTA Restraint:** Maximum 1 primary CTA button. No secondary "Learn more" links.

## 6. Layout Principles

- **Grid-First:** CSS Grid for all structural layouts. `calc(33% - 1rem)` is BANNED.
- **No Overlapping:** Every element occupies its own grid cell or flow position.
- **Feature Sections:** "3 equal cards in a row" BANNED → 2-column Zig-Zag, asymmetric Bento (2fr 1fr 1fr), or horizontal scroll galleries.
- **Containment:** `max-width: 1400px`, centered. Padding: `1rem` mobile, `2rem` tablet, `4rem` desktop.
- **Full-Height:** `min-height: 100dvh` — never `height: 100vh`.
- **Bento Architecture:** Row 1: 3 columns | Row 2: 2 columns (70/30 split). Each tile with perpetual micro-animation.

## 7. Responsive Rules

- **Mobile-First (< 768px):** All multi-column layouts → single column. `width: 100%`, `padding: 1rem`, `gap: 1.5rem`.
- **No Horizontal Scroll:** Critical failure. All elements must fit viewport width.
- **Typography:** Headlines scale via `clamp()`. Body text minimum `1rem` / `14px`.
- **Touch Targets:** All interactive elements minimum `44px`.
- **Inline images:** Stack below headline on mobile.
- **Testing viewports:** `375px`, `390px`, `768px`, `1024px`, `1440px`

## 8. Motion & Interaction Intent

*(Stitch generates static screens — this section documents intended motion behavior for the coding agent)*

- **Physics Engine:** Spring-based exclusively. `stiffness: 100, damping: 20`. No linear easing.
- **Perpetual Micro-Loops:** Pulse on status dots, Typewriter on search bars, Float on feature icons, Shimmer on loading states.
- **Staggered Orchestration:** `animation-delay: calc(var(--index) * 100ms)`. Waterfall reveals.
- **Hardware Rules:** Animate ONLY `transform` and `opacity`. Grain filters on `fixed` pseudo-elements only.
- **Performance:** 60fps minimum. CPU-heavy animations isolated in leaf components.

## 9. Anti-Patterns (Banned)

- No emojis — anywhere
- No `Inter` font
- No generic serif fonts (`Times New Roman`, `Georgia`, `Garamond`)
- No pure black (`#000000`)
- No neon outer glows
- No oversaturated accents above 80%
- No excessive gradient text on large headers
- No custom mouse cursors
- No overlapping elements
- No 3-column equal card layouts for features
- No centered Hero sections (at this variance level)
- No filler UI: "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons
- No generic names: "John Doe", "Sarah Chan", "Acme", "Nexus"
- No fake round numbers: `99.99%`, `50%`, `1234567` → use organic: `47.2%`, `+1 (312) 847-1928`
- No AI clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize"
- No broken Unsplash links → use `picsum.photos/seed/{id}/800/600`
- No `shadcn/ui` defaults non-customized
- No `z-index` spam
- No `h-screen` → always `min-h-[100dvh]`
- No circular loading spinners → skeleton shimmer only
