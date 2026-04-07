# Redesign Skill — Upgrade Existing Projects to Premium Quality
# Source: https://github.com/Leonxlnx/taste-skill/tree/main/skills/redesign-skill
# Note: Copie locale pour usage offline et contrôle des données

## Overview

Upgrades existing websites and applications to premium quality. Audits current design, identifies generic AI patterns, and applies high-end standards without breaking functionality. Works with any CSS framework or vanilla CSS.

## Core Process

1. **Scan** — Analyze the codebase to identify the framework, styling method (Tailwind, vanilla CSS, styled-components, etc.), and existing design patterns.
2. **Diagnose** — Execute a comprehensive audit listing every generic pattern, weak point, and missing state.
3. **Fix** — Apply targeted upgrades using the existing stack without complete rewrites.

## Design Audit Categories

### Typography Issues
- Generic browser defaults or overuse of Inter → replace with Geist, Outfit, Cabinet Grotesk, Satoshi
- Headlines lacking visual weight → increase size, tighten letter-spacing, reduce line-height
- Paragraphs > ~65 characters → limit width, increase line-height for readability
- Only Regular/Bold → introduce Medium (500) and SemiBold (600)
- Proportional figures in data-heavy interfaces → `font-variant-numeric: tabular-nums`
- No letter-spacing adjustments → negative tracking for large headers, positive for labels
- Excessive all-caps subheaders → try lowercase italics, sentence case, or small-caps
- Orphaned final words → `text-wrap: balance` or `text-wrap: pretty`

### Color and Surface Treatment
- Pure black (#000000) backgrounds → off-black, charcoal, or tinted dark (#0a0a0a, #121212)
- Oversaturated accent colors → keep saturation below 80%
- Multiple competing accent colors → consolidate to one
- Mixed warm and cool grays → maintain consistency in one gray family
- **Purple/blue "AI gradient" aesthetic** (the most recognizable AI fingerprint) → neutral bases + single considered accent
- Generic box-shadows → tint shadows to match background hue
- Flat design without texture → subtle noise, grain, or micro-patterns
- Empty flat sections → high-quality background imagery, patterns, or ambient gradients

### Layout Patterns
- Excessive centering and symmetry → offset margins, mixed aspect ratios
- **Three equal feature cards** (most generic AI layout) → 2-column zig-zag, asymmetric grid, masonry
- `height: 100vh` → `min-height: 100dvh` for mobile compatibility
- Complex flexbox percentage calculations → CSS Grid
- Missing max-width container constraints
- Equal-height forced cards → variable heights or masonry
- Uniform border-radius everywhere → vary by element type
- Flat elements with no layering → negative margins for depth
- Identical vertical padding → adjust optically

### Interactivity and States
- No hover states on buttons
- No active/pressed feedback
- Instant transitions without duration
- Missing focus rings (accessibility requirement)
- Generic circular spinners → skeleton loaders
- No empty states
- No error states
- Dead links to `#`
- No active page indication in navigation
- Animations on `top`, `left`, `width`, `height` → switch to `transform` and `opacity`

### Content Quality
- "John Doe", "Jane Smith" → diverse, realistic names
- Fake round numbers (99.99%, $100.00) → organic data (47.2%, $99.00)
- "Acme Corp", "Nexus" → contextual, believable names
- AI clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer"
- Exclamation marks in success messages
- Vague error messages like "Oops!"
- Lorem ipsum placeholder text
- Identical blog post dates

### Component Patterns
- Overuse of bordered cards → remove borders, rely on background or spacing
- Always 1 filled + 1 ghost button pair → explore other combinations
- Pill badges "New"/"Beta" → square badges, flags, or plain text
- Accordion FAQs → side-by-side lists or inline progressive disclosure
- 3-card carousel testimonials
- 3-tower pricing tables → more distinctive architectures
- Modals for simple actions → inline editing or slide-over panels
- Exclusively circular avatars → squircles, rounded squares

### Iconography
- Exclusively Lucide/Feather (default AI choice) → Phosphor, Heroicons, or custom sets
- Clichéd metaphors (rocketship = "Launch", shield = "Security")
- Inconsistent stroke widths across icon sets
- Missing favicon

### Code Quality
- Excessive divs without semantic HTML → use `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`
- Inline styles mixed with CSS classes
- Hardcoded pixel widths → relative units (`%`, `rem`, `em`, `max-width`)
- Missing alt text on images
- Arbitrary z-index values like `9999` → clean z-index scale
- Missing meta tags: title, description, og:image, social sharing

### Strategic Omissions (Frequently Forgotten)
- No legal links (privacy policy, terms of service)
- No back navigation
- No custom 404 page
- No form validation
- No "skip to content" link for keyboard users
- No cookie consent banner where required

## Implementation Priority

Apply in this sequence (max impact, min risk):
1. **Font swap** — biggest instant improvement, lowest risk
2. **Color palette cleanup** — remove clashing or oversaturated colors
3. **Hover + active states** — makes interface feel responsive
4. **Layout and spacing** — proper grid, max-width, consistent padding
5. **Replace generic components** — swap cliché patterns for modern alternatives
6. **Loading/empty/error states** — completion feeling
7. **Typography polish** — premium final touches

## Project Rules
- Maintain compatibility with existing tech stack — no framework migration
- Preserve all existing functionality; test after every change
- Verify new library dependencies in the project's dependency file first
- For Tailwind projects: confirm v3 vs v4 before modifying configuration
- Keep changes focused and reviewable; prefer targeted improvements over comprehensive rewrites
