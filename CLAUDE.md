# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (port 4321)
npm run build      # Build for production
npm test           # Run all Vitest tests
npm run test:watch # Run tests in watch mode
```

To run a single test file:
```bash
npx vitest run tests/page-structure.test.ts
```

## Architecture

### Tech Stack
- **Framework**: Astro 5.16 (static site generator)
- **Styling**: Custom CSS in `src/styles/global.css` with CSS variables; Tailwind CSS 4.1 available but components use custom CSS
- **Testing**: Vitest with jsdom environment

### Layout Hierarchy
```
BaseLayout.astro          # Base HTML, meta tags, fonts, JSON-LD, analytics
  └── CaseStudyLayout.astro   # Case study wrapper with hero, metrics, nav
        └── [case-study].astro    # Individual case study content
```

- `BaseLayout`: Provides `<head>`, Open Graph meta, theme initialization, skip link
- `CaseStudyLayout`: Handles case study chrome (header, scroll progress, metrics counters, project navigation, cursor follower)

### Case Study Pattern
Each case study page (`src/pages/work/*.astro`) follows this structure:
1. Import `CaseStudyLayout`
2. Define data objects: `metrics`, `contributions`, `personas`, etc.
3. Pass props to layout: `title`, `subtitle`, `heroImage`, `industry`, `role`, `timeline`, `tools`, `metrics`
4. Content goes in `<slot />` with semantic HTML (h2, h3, p, ul)

**Exception**: `ai-lab.astro` uses a multi-project template (see AI Lab section below).

### CSS Architecture
Global styles in `src/styles/global.css` use `@theme` block for CSS variables:
- `--color-bg`, `--color-fg`, `--color-muted`, `--color-border`, `--color-accent`
- Light mode overrides in `.light` class
- Animation easing: `--ease-out`, `--ease-in-out`

Case study pages can override `--color-accent` for per-project accent colors.

### Animation Classes
- `.reveal` - Fade up on scroll (handled by IntersectionObserver in layouts)
- `.words-reveal` - Word-by-word reveal animation
- `.counter` - Animated number counter (requires `data-target` attribute)
- Respects `prefers-reduced-motion`

### BeforeAfterSlider Component (`src/components/BeforeAfterSlider.astro`)

**Critical implementation details - DO NOT CHANGE without understanding these:**

1. **Structure**: Single container with two images (after first, before second), handle, and labels
2. **Image alignment**:
   - After image: `display: block; width: 100%; height: auto;` - sets container size
   - Before image: `position: absolute; top: 0; left: 0; width: 100%; height: 100%;` with `clip-path`
3. **Labels**: Positioned absolutely outside container using `right: calc(100% + 1.5rem)` and `left: calc(100% + 1.5rem)` with `overflow: visible` on parent
4. **IMPORTANT - CSS Overrides needed**: Must use `!important` on slider images to override `.case-section img` styles in medrec.astro that apply `margin: 1rem auto` and `max-height: 400px`
5. **IMPORTANT - CaseStudyLayout**: Do NOT add `.evolution-slider-container` or `.before-after-slider` to the "breakout" rule in CaseStudyLayout.astro - this overrides container max-width settings

**Container sizing in medrec.astro:**
- Mobile: `max-width: 180px`
- Web (`.wide`): `max-width: 100%`
- Watch: `max-width: 280px`

## Project Order (Homepage)
1. AI Lab (#01) - Orange accent (#f97316)
2. MedRec (#02) - Blue accent (#4a5ee4)
3. FitStart (#03) - Purple accent (#8b5cf6)
4. Folio (#04) - Cyan accent (#0891b2)
5. Immunization (#05) - Blue accent (#4a5ee4)

## Image Organization
Images are stored in `/public/images/[project-name]/`:
- `hero-*.png` - Hero images for case studies
- Persona avatars, mockups, screenshots in respective project folders

## Testing Notes
Tests in `/tests/` check:
- `page-structure.test.ts` - Navigation, sections, content presence
- `assets.test.ts` - Required asset files exist
- `portfolio-data.test.ts` - Data consistency

Tests read `.astro` files directly and check for expected strings. When adding new content, update tests if they verify specific text.

## AI Lab (`src/pages/work/ai-lab.astro`)

"Creative Playground" page showcasing AI-assisted projects with emphasis on process and decision-making.

### Page Sections
1. **CodeTerminal** - Animated typing terminal (700px max-width, shorter prompts)
2. **Philosophy** - Three numbered pillars (01, 02, 03) with left-aligned cards, NO emojis
3. **Featured Projects** (EqualTales + HafsaUsmani.com) - Both have deep-dive with "what worked/didn't work" narrative
4. **Other Experiments** - Compact cards for Interview Sage and HeadshotAI only
5. **AI Toolbox** - Tool cards WITHOUT emoji icons
6. **What I've Learned** - Reflections with before/after prompt examples (extra 5rem spacing above)
7. **Currently Exploring** - WIP experiments with vertically stacked status badges

### Data Structure (Updated March 2026)
```javascript
// Two featured projects with full narrative
const featuredProjects = [
  {
    id, title, tags, image, url,
    question,           // Framing question
    tool: { name },     // NO buildTime - removed per user request
    challenge,
    triedAndFailed: [], // What didn't work
    whatWorked: [],     // What succeeded
    keyTradeoff,
    outcome: { award, reach } // or { result, tech }
  }
];

// Other experiments (compact) - NO buildTime
const labProjects = [{
  id, title, tags, image, url,
  question, tool, keyLearning
}];

// Philosophy - numbered, NO emojis
const philosophy = [
  { number: '01', title: 'Intent First', description: '...' }
];

// AI Tools - NO icon field
const aiTools = [
  { name, bestFor, usedIn: [], learning }
];
```

### Components
- `CodeTerminal.astro` - Animated terminal with typing effect (700px max-width)

**Current Projects (NO build times displayed):**
| Project | Type | Tool | Live URL |
|---------|------|------|----------|
| EqualTales | Featured | Claude + DALL-E | equaltales.vercel.app |
| HafsaUsmani.com | Featured | Claude Code + Cursor | hafsausmani.com |
| Interview Sage | Other | Replit Agent | interview-sage--hafsausmani.replit.app |
| HeadshotAI | Other | Lovable | heatshot-ai.lovable.app |

**Metrics displayed:** "4 Projects Shipped", "1 Hackathon Won" (NO build time metric)

**Images:** `/public/images/ai-lab/*.png`
**Accent color:** Orange (#f97316)

### Key CSS Classes
- `.philosophy-number` - Styled number labels (01, 02, 03)
- `.reflections-section` - Extra 5rem margin-top, border-top
- `.exploring-header` - Vertical flex (badge above title)
- `.experiment-content` - Has `min-width: 0` for text wrapping

## User Preferences
- **No emojis in content** - Do not use emojis anywhere in the portfolio. Use text, numbers, or SVG icons instead.
- **Verify stats** - Always confirm metrics/timelines with user before publishing. Do not improvise or make up statistics.

## Key Implementation Details
- `tools={[]}` hides the tools section in CaseStudyLayout
- Theme stored in localStorage, initialized inline in `<head>` to prevent flash
- Custom cursor hidden on mobile (768px breakpoint)
- Vercel Analytics integrated via `@vercel/analytics/astro`

---

## Current Work Context (March 2026)

### Recently Completed: AI Lab Page Redesign

**Goal:** Transform AI Lab from standard project list into "Creative Playground" that positions Hafsa as AI-literate designer who builds.

**Issues Fixed (from user feedback):**
1. CodeTerminal text cutoff → Increased width to 700px, shortened prompts
2. Emojis unprofessional → Removed ALL emojis (philosophy, tools, awards)
3. Timeline inaccuracies → Removed build time metrics entirely (user requested)
4. Text cutoff in Other Experiments → Fixed grid layout, added word-wrap
5. Spacing too tight → Added 5rem margin before "What I've Learned"
6. Currently Exploring alignment → Changed to vertical badge+title layout

**Key Changes Made:**
- `featuredProjects` array now has TWO projects (EqualTales + HafsaUsmani.com)
- `labProjects` now only has Interview Sage and HeadshotAI
- `philosophy` uses `number` field ('01', '02', '03') instead of `icon` emoji
- `aiTools` removed `icon` field entirely
- Metrics: Only "4 Projects Shipped" and "1 Hackathon Won" (no build time)
- CodeTerminal max-width: 700px (was 500px)

**Files Modified:**
- `CLAUDE.md` - Added user preferences, updated AI Lab docs
- `src/components/CodeTerminal.astro` - Increased max-width
- `src/pages/work/ai-lab.astro` - Major restructure (~1050 lines)

**What User Liked (keep these):**
- CodeTerminal animation concept
- "What worked / didn't work" decision cards
- Stats display (hackathon win, project count)

**Pending:** Commit and push to deploy changes to production

---

## Portfolio Revamp (April 2026)

### Goal
Transform portfolio from "nice template" to "blow people away" with premium, award-winning animations.

### Inspiration Sites

| Site | Key Patterns |
|------|--------------|
| [dennissnellenberg.com](https://dennissnellenberg.com/) | Multilingual greeting animations, card-based projects with year badges |
| [peter-gould.com](https://www.peter-gould.com/) | Word-by-word GSAP scroll reveals with SplitType, scrub-based animations |
| [osmo.supply](https://www.osmo.supply/) | Radial marquee, 3D carousels, magnetic cursor, glass-morphism, animated odometers |
| [daveholloway.uk](https://daveholloway.uk/) | View Transitions API, canvas effects, pixel distortion, loading sequences |
| [mynrd.co.uk](https://mynrd.co.uk/) | Warm cream palette, character stagger reveals, cursor with image previews |
| [enter-support.de](https://enter-support.de/) | Bounce-in cascades, waypoint triggers, ticker marquee, LED effects |
| [motionsites.ai](https://motionsites.ai/) | Premium hero prompts and animation templates |
| [unsection.com/category/hero-section-design](https://www.unsection.com/category/hero-section-design) | Hero section design gallery |

### MotionSites Animation Patterns

These patterns are extracted from MotionSites prompts for reference:

**1. Liquid Glass Effect**
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
}
.liquid-glass::before {
  /* Gradient border via mask-composite */
  background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.45) 100%);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

**2. Blur-Fade-Up Animation**
```css
@keyframes blurFadeUp {
  from { opacity: 0; filter: blur(20px); transform: translateY(40px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
}
```

**3. Magnetic Component**
- Mouse-following hover effect
- Props: padding (150px), strength (3), activeTransition, inactiveTransition
- Applies translate3d based on cursor distance from element center

**4. Character Scroll Reveal**
- Per-character opacity tied to scroll progress
- Each character: invisible placeholder + absolute positioned animated span
- Opacity: 0.2 → 1 based on scroll offset ['start 0.8', 'end 0.2']

**5. Sticky Card Stacking**
- Cards scale down on scroll: `targetScale = 1 - (totalCards - 1 - index) * 0.03`
- Creates depth illusion with sticky positioning

**6. Scroll-Driven Marquee**
- Horizontal translate based on vertical scroll position
- `offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3`

### New Animation Components

| Component | Purpose |
|-----------|---------|
| `Magnet.astro` | Mouse-following magnetic hover effect |
| `AnimatedText.astro` | Character-by-character scroll reveal |
| `BlurFadeIn.astro` | Blur + fade + translate entrance animation |
| `CursorPreview.astro` | Project preview image on cursor hover |

### Tech Stack for Animations
- **GSAP + ScrollTrigger** - Scroll-based animations, timeline control
- **SplitType** - Text splitting for character/word animations
- **Lenis** - Smooth scroll (already installed)
- **Astro View Transitions** - Page transitions

### Animation Timing Guidelines
- Hero entrance stagger: 0ms, 150ms, 350ms, 500ms, 600ms
- Bounce-in delays: 0.2-0.4s increments
- Scroll scrub: value of 1-2 for smooth binding
- Reduced motion: disable all via `prefers-reduced-motion`
