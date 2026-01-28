# Portfolio Project - Hafsa Usmani

## Overview
Personal portfolio website for Hafsa Usmani, a Product Designer. Built with Astro 5.16 and custom CSS (no Tailwind classes in components).

## Tech Stack
- **Framework**: Astro 5.16.11
- **Styling**: Custom CSS with CSS variables (in `src/styles/global.css`)
- **Fonts**: Space Grotesk (Google Fonts)
- **Testing**: Vitest

## Project Structure
```
src/
├── components/
│   ├── AmbientBackground.astro  # Floating orb animations
│   ├── BeforeAfterSlider.astro  # Image comparison slider
│   ├── Lightbox.astro           # Image lightbox with keyboard nav
│   └── MobileNav.astro          # Hamburger menu for mobile
├── layouts/
│   ├── BaseLayout.astro         # Base HTML structure
│   └── CaseStudyLayout.astro    # Layout for case study pages
├── pages/
│   ├── index.astro              # Homepage with hero, work, about, contact
│   ├── about.astro              # About page
│   └── work/
│       ├── medrec.astro         # MedRec case study (diabetes app)
│       ├── fitstart.astro       # FitStart case study (fitness app)
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

## Current Work - MedRec Case Study
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

## Pending Improvements
- Hero images (phones vs watch) may need further visual balance adjustments
- Consider cropping persona source images to headshots for simpler styling in future
