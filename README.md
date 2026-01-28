# Hafsa Usmani - Portfolio

A personal portfolio website showcasing UX/Product Design case studies. Built with Astro and deployed on Vercel.

**Live Site:** [portfolio-website.vercel.app](https://portfolio-website.vercel.app)

## Tech Stack

- **Framework:** [Astro 5.16](https://astro.build/) - Static site generator
- **Styling:** [Tailwind CSS 4.1](https://tailwindcss.com/) + Custom CSS
- **Fonts:** Space Grotesk (Google Fonts)
- **Hosting:** [Vercel](https://vercel.com/)

## Features

- Responsive design (mobile, tablet, desktop)
- Dark/light theme toggle
- Custom cursor with glow effects
- Scroll-triggered animations
- Before/After image comparison sliders
- Lightbox gallery with keyboard navigation
- Animated SVG diagrams
- Accessible (WCAG considerations)

## Case Studies

1. **MedRec** - Diabetes management app with cross-platform experience
2. **FitStart** - Beginner-friendly fitness app focused on habit-building
3. **Folio** - B2B client portal for freelancers
4. **Immunization Tracker** - Mobile monitoring system for medical officers

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hafsau/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests |

## Project Structure

```
portfolio/
├── public/
│   ├── images/          # All images organized by case study
│   │   ├── medrec/
│   │   ├── fitstart/
│   │   ├── folio/
│   │   └── immunization/
│   ├── resume.pdf
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable Astro components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   │   ├── index.astro  # Homepage
│   │   ├── about.astro
│   │   └── work/        # Case study pages
│   └── styles/
│       └── global.css   # Global styles & CSS variables
└── tests/               # Vitest tests
```

## Deployment

This site is configured for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Astro and deploys

For other platforms, run `npm run build` and deploy the `dist/` folder.

## Customization

### Colors

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --color-bg: #0D0D0D;
  --color-fg: #F5F5F0;
  --color-muted: #666666;
  --color-border: #1A1A1A;
  --color-accent: #4a5ee4;
}
```

### Adding a Case Study

1. Create a new file in `src/pages/work/`
2. Use `CaseStudyLayout` component
3. Add images to `public/images/[project-name]/`
4. Update navigation links

## License

This project is for personal portfolio use. Design and code structure may be referenced for learning purposes.

---

Designed & Built by Hafsa Usmani
