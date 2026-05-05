import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const indexContent = readFileSync(resolve(__dirname, '../src/pages/index.astro'), 'utf-8');
const layoutContent = readFileSync(resolve(__dirname, '../src/layouts/BaseLayout.astro'), 'utf-8');
const globalCss = readFileSync(resolve(__dirname, '../src/styles/global.css'), 'utf-8');

describe('Page Structure', () => {
  describe('Navigation', () => {
    it('should have navigation with correct sections', () => {
      // Hero nav links
      expect(indexContent).toContain('href="#work"');
      expect(indexContent).toContain('href="#about"');
      expect(indexContent).toContain('href="#contact"');
    });

    it('should have nav links styled', () => {
      expect(indexContent).toContain('nav-link');
    });

    it('should have hamburger menu for scroll navigation', () => {
      expect(indexContent).toContain('HamburgerMenu');
      expect(indexContent).toContain('navItems');
    });
  });

  describe('Hero Section', () => {
    it('should have multilingual greeting component', () => {
      expect(indexContent).toContain('MultilingualGreeting');
      expect(indexContent).toContain("'Hello', 'Bonjour', 'Hola'");
    });

    it('should have massive name display with HAFSA and USMANI', () => {
      expect(indexContent).toContain('hero-name');
      expect(indexContent).toContain('SplitTextReveal');
      expect(indexContent).toContain('text="HAFSA"');
      expect(indexContent).toContain('text="USMANI"');
    });

    it('should have hero subtitle with role', () => {
      expect(indexContent).toContain('hero-subtitle');
      expect(indexContent).toContain('Product Designer');
    });

    it('should have see work CTA', () => {
      expect(indexContent).toContain('See my work');
      expect(indexContent).toContain('hero-cta');
    });

    it('should have magnetic portrait component', () => {
      expect(indexContent).toContain('hero-portrait');
      expect(indexContent).toContain('Magnet');
    });

    it('should use BlurFadeIn for animations', () => {
      expect(indexContent).toContain('BlurFadeIn');
    });

    it('should have floating orbs background', () => {
      expect(indexContent).toContain('FloatingOrbs');
    });
  });

  describe('Sections', () => {
    it('should have main sections with proper IDs', () => {
      expect(indexContent).toContain('id="work"');
      expect(indexContent).toContain('id="about"');
      expect(indexContent).toContain('id="contact"');
    });

    it('should have wave dividers between sections', () => {
      expect(indexContent).toContain('WaveDivider');
      expect(indexContent).toContain('wave-to-dark');
      expect(indexContent).toContain('wave-to-warm');
    });

    it('should have draggable projects carousel', () => {
      expect(indexContent).toContain('projects-carousel');
      expect(indexContent).toContain('projects-scroll-track');
    });

    it('should have 3D tilt cards for projects', () => {
      expect(indexContent).toContain('TiltCard');
      expect(indexContent).toContain('project-card');
    });

    it('should have stats section with animated counters', () => {
      expect(indexContent).toContain('stats-section');
      expect(indexContent).toContain('stat-number');
      expect(indexContent).toContain('data-count');
    });
  });

  describe('About Section', () => {
    it('should have about section with title', () => {
      expect(indexContent).toContain('about-section');
      expect(indexContent).toContain('About Me');
    });

    it('should mention relevant background', () => {
      expect(indexContent).toContain('MS in Computer Science');
    });
  });

  describe('Contact Section', () => {
    it('should have email link', () => {
      expect(indexContent).toContain('mailto:');
      expect(indexContent).toContain('hafsa.usmani2@gmail.com');
    });

    it('should have LinkedIn link', () => {
      expect(indexContent).toContain('linkedin.com');
    });

    it('should have GitHub link', () => {
      expect(indexContent).toContain('github.com');
    });

    it('should have contact links styled', () => {
      expect(indexContent).toContain('contact-link');
    });
  });

  describe('Footer', () => {
    it('should have copyright', () => {
      expect(indexContent).toContain('2026 Hafsa Usmani');
    });
  });
});

describe('Visual Design', () => {
  it('should have warm and dark color variables', () => {
    expect(indexContent).toContain('--warm-bg: #FFF4E4');
    expect(indexContent).toContain('--dark-bg: #0C0C0C');
  });

  it('should have gradient text for stats', () => {
    expect(indexContent).toContain('linear-gradient(135deg, #667eea');
  });

  it('should have alternating section backgrounds', () => {
    expect(indexContent).toContain('background: var(--warm-bg)');
    expect(indexContent).toContain('background: var(--dark-bg)');
  });
});

describe('Layout', () => {
  it('should have proper meta tags', () => {
    expect(layoutContent).toContain('meta charset="UTF-8"');
    expect(layoutContent).toContain('meta name="viewport"');
    expect(layoutContent).toContain('meta name="description"');
  });

  it('should have Open Graph tags', () => {
    expect(layoutContent).toContain('og:title');
    expect(layoutContent).toContain('og:description');
  });

  it('should load Space Grotesk font', () => {
    expect(layoutContent).toContain('Space+Grotesk');
  });

  it('should have theme initialization script', () => {
    expect(layoutContent).toContain('data-theme');
    expect(layoutContent).toContain('dark');
  });

  it('should have View Transitions', () => {
    expect(layoutContent).toContain('ViewTransitions');
  });
});

describe('Styling', () => {
  it('should have accent color defined', () => {
    expect(globalCss).toContain('--color-accent: #4a5ee4');
  });

  it('should have dark mode colors', () => {
    expect(globalCss).toContain('--color-bg:');
    expect(globalCss).toContain('--color-fg:');
  });

  it('should have light mode styles', () => {
    expect(globalCss).toContain('.light {');
  });

  it('should have cursor dot styles', () => {
    expect(globalCss).toContain('.cursor-dot');
  });

  it('should have liquid glass effect', () => {
    expect(globalCss).toContain('.liquid-glass');
  });

  it('should have blur fade up animation', () => {
    expect(globalCss).toContain('blurFadeUp');
  });

  it('should have marquee animation', () => {
    expect(globalCss).toContain('marquee');
  });
});

describe('Animations', () => {
  it('should have animated counters script', () => {
    expect(indexContent).toContain('animateCounters');
    expect(indexContent).toContain('IntersectionObserver');
  });

  it('should support View Transitions', () => {
    expect(indexContent).toContain('astro:after-swap');
  });
});

describe('Back to Top Button', () => {
  it('should have BackToTop component imported', () => {
    expect(layoutContent).toContain('BackToTop');
  });

  it('should include BackToTop in layout', () => {
    expect(layoutContent).toContain('<BackToTop />');
  });
});

describe('Responsive Design', () => {
  it('should have ultra-wide screen constraint', () => {
    expect(globalCss).toContain('@media (min-width: 1920px)');
    expect(globalCss).toContain('max-width: 1920px');
  });

  it('should have tablet breakpoint', () => {
    expect(globalCss).toContain('@media (min-width: 769px) and (max-width: 1024px)');
  });

  it('should have mobile breakpoint', () => {
    expect(globalCss).toContain('@media (max-width: 768px)');
  });

  it('should use clamp for responsive typography', () => {
    expect(globalCss).toContain('clamp(');
  });

  it('should hide cursor on mobile', () => {
    expect(globalCss).toContain('.cursor-dot');
    expect(globalCss).toContain('display: none');
  });
});

describe('Image Optimization', () => {
  it('should have lazy loading on project images', () => {
    expect(indexContent).toContain('loading="lazy"');
  });

  it('should have async decoding on images', () => {
    expect(indexContent).toContain('decoding="async"');
  });

  it('should have fetchpriority on hero image', () => {
    expect(indexContent).toContain('fetchpriority="high"');
  });

  it('should have sizes attribute on hero image', () => {
    expect(indexContent).toContain('sizes="');
  });
});

describe('Anchor Scroll', () => {
  it('should initialize anchor scroll in layout', () => {
    expect(layoutContent).toContain('initAnchorScroll');
  });

  it('should have anchor links to sections', () => {
    expect(indexContent).toContain('href="#work"');
    expect(indexContent).toContain('href="#about"');
    expect(indexContent).toContain('href="#contact"');
  });
});
