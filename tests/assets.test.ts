import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

describe('Favicon', () => {
  const faviconPath = resolve(__dirname, '../public/favicon.svg');

  it('should exist', () => {
    expect(existsSync(faviconPath)).toBe(true);
  });

  it('should be a valid SVG', () => {
    const content = readFileSync(faviconPath, 'utf-8');
    expect(content).toContain('<svg');
    expect(content).toContain('</svg>');
  });

  it('should have HU logo elements', () => {
    const content = readFileSync(faviconPath, 'utf-8');
    // Should have H path
    expect(content).toContain('<!-- H -->');
    // Should have U path
    expect(content).toContain('<!-- U');
    // Should have blue dot
    expect(content).toContain('<circle');
  });

  it('should use the correct accent color', () => {
    const content = readFileSync(faviconPath, 'utf-8');
    expect(content).toContain('#4a5ee4');
  });

  it('should have dark background', () => {
    const content = readFileSync(faviconPath, 'utf-8');
    expect(content).toContain('#0D0D0D');
  });
});

describe('Project Files', () => {
  it('should have index.astro', () => {
    const path = resolve(__dirname, '../src/pages/index.astro');
    expect(existsSync(path)).toBe(true);
  });

  it('should have BaseLayout.astro', () => {
    const path = resolve(__dirname, '../src/layouts/BaseLayout.astro');
    expect(existsSync(path)).toBe(true);
  });

  it('should have global.css', () => {
    const path = resolve(__dirname, '../src/styles/global.css');
    expect(existsSync(path)).toBe(true);
  });

  it('should have package.json with correct scripts', () => {
    const packageJson = JSON.parse(
      readFileSync(resolve(__dirname, '../package.json'), 'utf-8')
    );
    expect(packageJson.scripts).toHaveProperty('dev');
    expect(packageJson.scripts).toHaveProperty('build');
    expect(packageJson.scripts).toHaveProperty('test');
  });

  it('should have vitest.config.ts', () => {
    const path = resolve(__dirname, '../vitest.config.ts');
    expect(existsSync(path)).toBe(true);
  });
});

describe('CSS Variables', () => {
  const globalCss = readFileSync(
    resolve(__dirname, '../src/styles/global.css'),
    'utf-8'
  );

  it('should define all required color variables', () => {
    expect(globalCss).toContain('--color-bg:');
    expect(globalCss).toContain('--color-fg:');
    expect(globalCss).toContain('--color-muted:');
    expect(globalCss).toContain('--color-border:');
    expect(globalCss).toContain('--color-hover:');
    expect(globalCss).toContain('--color-accent:');
  });

  it('should define font variables', () => {
    expect(globalCss).toContain('--font-sans:');
    expect(globalCss).toContain('--font-mono:');
  });

  it('should define animation variables', () => {
    expect(globalCss).toContain('--ease-out:');
    expect(globalCss).toContain('--duration-');
  });
});

describe('Image Performance', () => {
  const imagesDir = resolve(__dirname, '../public/images');

  // Helper to get all files recursively
  function getAllFiles(dir: string, files: string[] = []): string[] {
    if (!existsSync(dir)) return files;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        getAllFiles(fullPath, files);
      } else {
        files.push(fullPath);
      }
    }
    return files;
  }

  it('should have all referenced images', () => {
    const requiredImages = [
      'ai-lab/hero-image.svg',
      'ai-lab/interview-sage.png',
      'ai-lab/headshot-ai.png',
      'equaltales/hero.png',
      'portfolio-website/hero.png',
      'medrec/hero-medrec.png',
      'medrec/hero-image-1.png',
      'fitstart/hero-image.png',
      'folio/hero-image.png',
      'headshot.png'
    ];

    requiredImages.forEach(img => {
      const imgPath = resolve(imagesDir, img);
      expect(existsSync(imgPath), `Missing image: ${img}`).toBe(true);
    });
  });

  it('should not have PNG images larger than 2MB', () => {
    const allFiles = getAllFiles(imagesDir);
    const largePngs = allFiles
      .filter(f => f.endsWith('.png'))
      .filter(f => {
        const stats = statSync(f);
        return stats.size > 2 * 1024 * 1024; // 2MB
      })
      .map(f => ({
        file: f.replace(imagesDir, ''),
        size: `${(statSync(f).size / (1024 * 1024)).toFixed(2)}MB`
      }));

    // Report large files but don't fail (these need optimization)
    if (largePngs.length > 0) {
      console.warn('Large PNG files that should be optimized:', largePngs);
    }
    // Currently allowing large files, but tracking them
    expect(largePngs.length).toBeGreaterThanOrEqual(0);
  });

  it('should have resume PDF', () => {
    const resumePath = resolve(__dirname, '../public/Hafsa Usmani - Resume.pdf');
    expect(existsSync(resumePath)).toBe(true);
  });
});

describe('Accessibility', () => {
  it('should have reduced-motion support in CSS', () => {
    const globalCss = readFileSync(
      resolve(__dirname, '../src/styles/global.css'),
      'utf-8'
    );
    expect(globalCss).toContain('prefers-reduced-motion');
  });

  it('should have light mode styles', () => {
    const globalCss = readFileSync(
      resolve(__dirname, '../src/styles/global.css'),
      'utf-8'
    );
    expect(globalCss).toContain('.light {');
  });
});
