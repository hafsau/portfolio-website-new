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
1. **CodeTerminal** - Animated typing terminal showing Claude prompts
2. **Philosophy** - Three pillars: Intent First, Fast Loops, Ship & Learn
3. **Featured Project** (EqualTales) - Deep dive with "what worked/didn't work" narrative
4. **Other Experiments** - Compact cards for other projects
5. **AI Toolbox** - Interactive tool cards (Claude Code, Cursor, Replit Agent, Lovable)
6. **What I've Learned** - Reflections with before/after prompt examples
7. **Currently Exploring** - WIP experiments with status badges

### Data Structure
```javascript
// Featured project (detailed)
const featuredProject = {
  id, title, tags, image, url,
  question,        // Framing question
  buildTime,       // e.g., "24 hours"
  tool: { name, why },
  challenge,
  triedAndFailed: [], // What didn't work
  whatWorked: [],     // What succeeded
  keyTradeoff,
  outcome: { award, reach }
};

// Other experiments (compact)
const labProjects = [{
  id, title, tags, image, url,
  question, buildTime, tool, keyLearning
}];
```

### Components
- `CodeTerminal.astro` - Animated terminal with typing effect

**Current Projects:**
| Project | Build Time | Tool | Live URL |
|---------|------------|------|----------|
| EqualTales (Featured) | 24 hours | Claude + DALL-E | equaltales.vercel.app |
| HafsaUsmani.com | 1 week | Claude Code + Cursor | hafsausmani.com |
| Interview Sage | 4 hours | Replit Agent | interview-sage--hafsausmani.replit.app |
| HeadshotAI | 1 weekend | Lovable | heatshot-ai.lovable.app |

**Images:** `/public/images/ai-lab/*.png`
**Accent color:** Orange (#f97316)

## Key Implementation Details
- `tools={[]}` hides the tools section in CaseStudyLayout
- Theme stored in localStorage, initialized inline in `<head>` to prevent flash
- Custom cursor hidden on mobile (768px breakpoint)
- Vercel Analytics integrated via `@vercel/analytics/astro`
