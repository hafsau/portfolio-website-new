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
Source of truth: the `projects` array in `src/pages/index.astro` (numbers must run 01, 02, … in order; tested).
1. PixelCheck (#01) - Burnt orange (#E5480F; text #FF6A2B; transition #B23A0C)
2. EqualTales (#02) - Purple (#7B5EA7)
3. Philly Truce (#03) - Cream (#FFF4DA; transition navy #002768)
4. HafsaUsmani.com (#04) - Teal (#14b8a6)
5. AI Lab (#05) - Acid lime (#C4F04A, echoes CarbonLint; orange retired)
6. MedRec (#06) - Blue (#4a5ee4)
7. FitStart (#07) - Purple (#8b5cf6)
8. Folio (#08) - Cyan (#0891b2)
9. Immunization (#09) - Blue (#4a5ee4)

Prev/next chain: PixelCheck → EqualTales → Philly Truce → HafsaUsmani.com → AI Lab → MedRec → FitStart → Folio → Immunization → PixelCheck.

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

Rebuilt November 2026. The page is about the AI Lab builds only: no portfolio-site material (no hero photo review, no Ask my AI, no site audit).

### Page Sections
1. **Intro**: one line, then `CodeTerminal` (title "ai-lab") with one prompt per build, prefixed by the tool that built it (`duo:`, `zerve:`, `replit:`, `lovable:`).
2. **01 CarbonLint** and **02 ClimateHaven** (deep chapters): the question as the h2, tool and event, screenshot, what it does, how it's built, then CarbonLint's "What broke / What fixed it" compare list or ClimateHaven's findings (one display numeral) and hard parts, then "The lesson" and a "Read the writeup" link. All facts come from their Devpost writeups.
3. **Quick builds**: Interview Sage (Replit Agent) and HeadshotAI (Lovable), screenshot beside a short note and the one-line learning from the earlier page.
4. **More AI work**: links to EqualTales and PixelCheck, which have their own case studies.

### Data
All content lives in `src/data/aiLab.ts` (`terminalPrompts`, `deepBuilds`, `quickBuilds`, `moreWork`, `awards`). The awards metric is `awards.length`. `scripts/build-knowledge.mjs` reads this file so Ask my AI stays accurate. Key Decisions for ai-lab are empty on purpose.

### Rules
- No orange (#f97316) on the page or its homepage card (the card is acid lime, #C4F04A); the terminal prompt uses `--terminal-accent`. All the lab builds were solo projects.
- No DALL-E (API shut down May 2026), no Goose, no build times. Devpost links read "Read the writeup", never "View Live".
- The two awards are CarbonLint (Sustainable Design Bonus, GitLab AI Hackathon) and EqualTales (Best AI/ML, #75HER Hackathon). Don't mention a hackathon for PixelCheck.
- Interview Sage generates interview questions from a job description; it is not a practice coach.

## No-box vocabulary (`src/components/case/`)

Case studies use type, hairline rules and captioned figures, not cards. A surface may frame an artifact (screenshot, video, diagram, transcript), never a paragraph. `tests/no-boxes.test.ts` enforces it.

| Component | Use for |
|---|---|
| `RuledList` + `RuledRow` | Any list of prose items (label column, title, body; `compare` for two columns) |
| `Figure` | Artifacts with a "Fig. N" caption; `wide` breaks out to 1000px |
| `Lead` | The problem/goal statement or a key trade-off, set large under a mono label |
| `DisplayNumeral` | One real, sourced number per section at most |
| `MarginNote` | Short asides; right margin at 1240px+, inline below |
| `ContributionList`, `ImpactList` | The shared "My Contributions" and "How I Made an Impact" sections |
| `CompareSlider` | Generic before/after with a native range input |

Avoid: rounded text boxes, 3px left accent borders, "01" numbers on items, hover lift or glow, pill badges, tinted fills, uppercase bold item titles. Component `label`/`title` attributes are not read by the knowledge build, so keep page text in frontmatter arrays or template text.

## User Preferences
- **No emojis in content** - Do not use emojis anywhere in the portfolio. Use text, numbers, or SVG icons instead.
- **Verify stats** - Always confirm metrics/timelines with user before publishing. Do not improvise or make up statistics.

## Key Implementation Details
- `tools={[]}` hides the tools section in CaseStudyLayout
- Theme stored in localStorage, initialized inline in `<head>` to prevent flash
- Custom cursor hidden on mobile (768px breakpoint)
- Vercel Analytics integrated via `@vercel/analytics/astro`

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

## PixelCheck (`src/pages/work/pixelcheck.astro`)
Tool Hafsa designed and built solo with Claude Code (Sep – Oct 2026): measures any build against the designer's phone, tablet and desktop frames, explains each size's score, and has NVIDIA Nemotron 3 Super write a fix brief checked by a rule-based verifier.
- **Do not mention the hackathon** it was made for (no "hackathon", "Devpost", "judges", "submission"); `tests/pixelcheck.test.ts` checks this.
- Link only the live app and the Lovable replay. Do not link the GitHub repo or the YouTube demo (both show the hackathon).
- Page components: `src/components/pixelcheck/` (PcWidthStrip toggle, PcScoreBreakdown, PcStack tech section).
- Confirmed facts: Lovable build of FitStart scored 38 / 61 / 65 while all 8 widths fit; text 11–15% smaller, spacing ~20% tighter, Roboto vs Lato; ~1 min and ~5 cents per check (cached example only); Interview Sage loses 7 texts on phones; hafsausmani.com rebuild 87.4 (fonts normalised to Inter).
- Source repo (local): `~/Nebius/pixel-check`; assets came from its `docs/devpost/` screenshots and `docs/video/thumbnail.html`.
