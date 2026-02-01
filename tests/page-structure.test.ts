import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const indexContent = readFileSync(resolve(__dirname, '../src/pages/index.astro'), 'utf-8');
const layoutContent = readFileSync(resolve(__dirname, '../src/layouts/BaseLayout.astro'), 'utf-8');
const globalCss = readFileSync(resolve(__dirname, '../src/styles/global.css'), 'utf-8');

describe('Page Structure', () => {
  describe('Navigation', () => {
    it('should have navigation with correct sections', () => {
      expect(indexContent).toContain('href="#home"');
      expect(indexContent).toContain('href="#work"');
      expect(indexContent).toContain('href="#about"');
      expect(indexContent).toContain('href="#contact"');
    });

    it('should have scroll progress indicator', () => {
      expect(indexContent).toContain('scroll-progress');
    });
  });

  describe('Hero Section', () => {
    it('should have personal greeting', () => {
      // Text is now split into character spans for animation
      expect(indexContent).toContain('hero-text-split');
      expect(indexContent).toContain('<span class="char">H</span>');
    });

    it('should have rotating text with Designer, Builder, Maker', () => {
      expect(indexContent).toContain('<span>Designer</span>');
      expect(indexContent).toContain('<span>Builder</span>');
      expect(indexContent).toContain('<span>Maker</span>');
    });

    it('should have tagline about design meets data', () => {
      // Words are now in separate spans for reveal animation
      expect(indexContent).toContain('class="word">where</span>');
      expect(indexContent).toContain('class="word">design</span>');
      expect(indexContent).toContain('class="word">meets</span>');
      expect(indexContent).toContain('class="word">data.</span>');
    });

    it('should have CTA buttons', () => {
      expect(indexContent).toContain('See My Work');
      expect(indexContent).toContain("Let's Talk");
    });
  });

  describe('Sections', () => {
    it('should have all main sections', () => {
      expect(indexContent).toContain('id="home"');
      expect(indexContent).toContain('id="work"');
      expect(indexContent).toContain('id="about"');
      expect(indexContent).toContain('id="contact"');
    });

    it('should have horizontal scroll projects', () => {
      expect(indexContent).toContain('projects-horizontal');
    });

    it('should have tools marquee', () => {
      expect(indexContent).toContain('marquee');
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
  });

  describe('Footer', () => {
    it('should have copyright', () => {
      expect(indexContent).toContain('2026 Hafsa Usmani');
    });

    it('should have location', () => {
      expect(indexContent).toContain('San Francisco Bay Area');
    });
  });
});

describe('Logo SVG', () => {
  it('should have HU logo with H path', () => {
    // H is made of two vertical lines and one horizontal
    expect(indexContent).toContain('<!-- H -->');
  });

  it('should have U path (curved left, straight right)', () => {
    expect(indexContent).toContain('<!-- U');
  });

  it('should have blue dot', () => {
    expect(indexContent).toContain('sig-dot');
    expect(indexContent).toContain('<circle');
  });

  it('should use stroke-based rendering for letters', () => {
    expect(indexContent).toContain('sig-letter');
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
    expect(layoutContent).toContain('localStorage.getItem');
    expect(layoutContent).toContain('theme');
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

  it('should have signature animation', () => {
    expect(globalCss).toContain('sig-letter');
    expect(globalCss).toContain('sig-dot');
  });

  it('should have rotating text animation', () => {
    expect(globalCss).toContain('rotating-text');
  });

  it('should have marquee animation', () => {
    expect(globalCss).toContain('marquee');
  });
});
