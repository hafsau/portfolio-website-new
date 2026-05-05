import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const globalCss = readFileSync(resolve(__dirname, '../src/styles/global.css'), 'utf-8');
const indexContent = readFileSync(resolve(__dirname, '../src/pages/index.astro'), 'utf-8');
const caseStudyLayout = readFileSync(resolve(__dirname, '../src/layouts/CaseStudyLayout.astro'), 'utf-8');

describe('Responsive Breakpoints', () => {
  describe('Mobile (max-width: 768px)', () => {
    it('should have mobile styles', () => {
      expect(globalCss).toContain('@media (max-width: 768px)');
    });

    it('should hide cursor on mobile', () => {
      expect(globalCss).toMatch(/@media.*768px[\s\S]*\.cursor-dot[\s\S]*display:\s*none/);
    });

    it('should adjust container padding on mobile', () => {
      expect(globalCss).toContain('padding-left: 1.5rem');
    });
  });

  describe('Tablet (769px - 1024px)', () => {
    it('should have tablet-specific styles', () => {
      expect(globalCss).toContain('@media (min-width: 769px) and (max-width: 1024px)');
    });

    it('should adjust container padding for tablet', () => {
      expect(globalCss).toContain('padding-left: 2rem');
    });

    it('should have tablet-optimized project card width', () => {
      expect(globalCss).toContain('width: 420px');
    });
  });

  describe('Ultra-wide (min-width: 1920px)', () => {
    it('should constrain body width on ultra-wide screens', () => {
      expect(globalCss).toContain('@media (min-width: 1920px)');
      expect(globalCss).toContain('max-width: 1920px');
    });

    it('should center content on ultra-wide screens', () => {
      expect(globalCss).toContain('margin-left: auto');
      expect(globalCss).toContain('margin-right: auto');
    });
  });
});

describe('Responsive Typography', () => {
  it('should use clamp for hero text', () => {
    expect(globalCss).toContain('clamp(3rem');
  });

  it('should use clamp for display text', () => {
    expect(globalCss).toContain('clamp(2rem');
  });

  it('should use vw units for fluid sizing', () => {
    expect(globalCss).toMatch(/clamp\([^)]*vw[^)]*\)/);
  });
});

describe('Image Responsiveness', () => {
  it('should have lazy loading for below-fold images', () => {
    expect(indexContent).toContain('loading="lazy"');
  });

  it('should have async decoding', () => {
    expect(indexContent).toContain('decoding="async"');
  });

  it('should have proper sizes attribute for responsive images', () => {
    expect(indexContent).toContain('sizes="');
  });

  it('should prioritize hero images', () => {
    expect(indexContent).toContain('fetchpriority="high"');
  });

  it('should have sizes attribute in case study layout', () => {
    expect(caseStudyLayout).toContain('sizes="');
  });
});

describe('Touch & Mobile UX', () => {
  it('should have touch-friendly scrolling', () => {
    expect(globalCss).toContain('-webkit-overflow-scrolling: touch');
  });

  it('should hide scrollbar but maintain functionality', () => {
    expect(globalCss).toContain('scrollbar-width: none');
    expect(globalCss).toContain('-webkit-scrollbar');
  });
});

describe('Reduced Motion Support', () => {
  it('should respect reduced motion preference in global CSS', () => {
    expect(globalCss).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('should disable animations for reduced motion', () => {
    expect(globalCss).toContain('animation: none');
  });
});
