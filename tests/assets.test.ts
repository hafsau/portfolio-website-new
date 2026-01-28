import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

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
