# Portfolio Project - Hafsa Usmani

## Overview
Personal portfolio website for Hafsa Usmani, a Product Designer. Built with Astro 5.16 and custom CSS (no Tailwind classes in components).

## Tech Stack
- **Framework**: Astro 5.16.11
- **Styling**: Custom CSS with CSS variables (in `src/styles/global.css`), Tailwind CSS 4.1 available
- **Fonts**: Space Grotesk (Google Fonts)
- **Testing**: Vitest 4.0, Testing Library, jsdom

## Project Structure
```
src/
├── components/
│   ├── AmbientBackground.astro  # Floating orb animations
│   ├── BeforeAfterSlider.astro  # Image comparison slider
│   ├── Footer.astro             # Site footer with social links
│   ├── Header.astro             # Site header with navigation
│   ├── Lightbox.astro           # Image lightbox with keyboard nav
│   ├── MetricCard.astro         # Animated metric/stat display
│   ├── MobileNav.astro          # Hamburger menu for mobile
│   ├── ProjectCard.astro        # Project card with 3D tilt effect
│   └── ThemeToggle.astro        # Dark/light theme switcher
├── layouts/
│   ├── BaseLayout.astro         # Base HTML structure
│   └── CaseStudyLayout.astro    # Layout for case study pages
├── pages/
│   ├── index.astro              # Homepage with hero, work, about, contact
│   ├── about.astro              # About page
│   └── work/
│       ├── index.astro          # Work listing page
│       ├── ai-lab.astro         # AI Lab (multi-project showcase)
│       ├── medrec.astro         # MedRec case study (diabetes app)
│       ├── fitstart.astro       # FitStart case study (fitness app)
│       ├── folio.astro          # Folio case study (freelancer portal)
│       └── immunization.astro   # Immunization case study
└── styles/
    └── global.css               # All global styles and CSS variables
```

## Key Features Implemented
- Custom cursor follower with glow effects
- Ambient background with floating orbs
- 3D card tilt with shine gradient on project cards
- Before/After slider for design evolution
- Lightbox gallery with keyboard navigation
- Scroll reveal animations (fade, slide, scale)
- Mobile hamburger navigation
- Dark/light theme toggle
- Animated counters for metrics
- Text reveal animations (words-reveal class)
- Button press micro-interactions
- `prefers-reduced-motion` accessibility support

## CSS Variables (in global.css)
```css
--color-bg: #0a0a0f
--color-fg: #f5f5f7
--color-muted: #8a8a8e
--color-border: #1a1a24
--color-accent: #4a5ee4
```

## Project Order (Homepage)
1. **AI Lab** (#01) - Multi-project showcase of Claude Code experiments
2. **MedRec** (#02) - Diabetes management app
3. **FitStart** (#03) - Beginner fitness app
4. **Folio** (#04) - Freelancer client portal
5. **Immunization Tracker** (#05) - Medical officer tracking system

## AI Lab Case Study (New)
The AI Lab (`src/pages/work/ai-lab.astro`) is a **multi-project template** showcasing work built with Claude Code.

### Key Differences from Other Case Studies
- Contains multiple projects in one page (card grid + detail sections)
- Uses `labProjects` array instead of single project data
- Each project has: id, title, tags, image, problem, solution, insight
- Orange accent color (#f97316)
- Scoped CSS for project cards and detail sections

### Images Location
All AI Lab images are in `/public/images/ai-lab/`:
- `hero-image.svg` - Neural network + Claude Code terminal visualization
- `quickthink.svg` - Phone mockup with voice waveform
- `project-2.svg`, `project-3.svg`, `project-4.svg` - Placeholder mockups

### Data Structure
```javascript
const labProjects = [
  {
    id: 'quickthink',
    number: '01',
    title: 'QuickThink',
    tags: ['iOS App', 'Voice UI', 'Claude Code'],
    image: '/images/ai-lab/quickthink.svg',
    problem: '...',
    solution: '...',
    insight: '...',
    screenshots: []
  },
  // ... more projects
];
```

## MedRec Case Study
The MedRec case study (`src/pages/work/medrec.astro`) is the most developed:

### Content Synced from Framer Template
- Industry: "Health Tech"
- Subtitle about clarity, calm, and control
- Challenge section with business metrics
- Updated skills list
- Personas with avatar images (sarah.png, davis.png, zack.png)
- Key Learnings from Wireframing section
- Usability testing with 6 users
- Updated conclusion

### Images Location
All MedRec images are in `/public/images/medrec/`:
- `hero-medrec.png` - Main hero image
- `hero-image-1.png` - Phone mockups
- `hero-image-2.png` - Smartwatch mockup
- `sarah.png`, `davis.png`, `zack.png` - Persona avatars

### Current Image Styling (in medrec.astro)
```css
/* Hero images grid - phones vs watch sizing */
.hero-image-item.phones img {
  width: 180%;
  max-width: none;
}
.hero-image-item.watch img {
  width: 75%;
}

/* Persona avatars - face positioning */
.persona-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.persona-avatar img {
  width: 100%;
  height: 130%;
  object-fit: cover;
  object-position: center bottom;
  transform: translateY(-40%);
}
```

## Commands
```bash
npm run dev      # Start dev server (usually port 4321-4323)
npm run build    # Build for production
npm test         # Run Vitest tests
```

## Testing
Tests are in `/tests/`:
- `page-structure.test.ts` - Checks page content
- `assets.test.ts` - Checks required assets
- `portfolio-data.test.ts` - Checks portfolio data

## Notes
- Tools section removed from MedRec case study (pass empty array `tools={[]}`)
- CaseStudyLayout conditionally hides tools when array is empty
- Persona avatars use images instead of initial letters
- Image scaling for hero-image-1 (phones) and hero-image-2 (watch) needs balancing

## Case Study Accent Colors
- **AI Lab**: Orange (#f97316)
- **MedRec**: Blue (#4a5ee4) - default
- **FitStart**: Purple (#8b5cf6)
- **Folio**: Cyan (#0891b2)
- **Immunization**: Blue (#4a5ee4) - default

## Pending Improvements
- AI Lab: Add more projects with real screenshots (currently using placeholder SVGs)
- AI Lab: Fill in detailed problem/solution/insight content for projects
- Consider cropping persona source images to headshots for simpler styling
