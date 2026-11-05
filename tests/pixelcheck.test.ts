import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { contrastRatio } from '../src/lib/contrast';
import { caseStudySummaries } from '../src/data/caseStudySummaries';

const root = resolve(__dirname, '..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf-8');
const page = read('src/pages/work/pixelcheck.astro');
const strip = read('src/components/pixelcheck/PcWidthStrip.astro');
const breakdown = read('src/components/pixelcheck/PcScoreBreakdown.astro');
const stack = read('src/components/pixelcheck/PcStack.astro');
const all = [page, strip, breakdown, stack].join('\n');

describe('PixelCheck: page and registration', () => {
  it('states the role and timeline Hafsa confirmed', () => {
    expect(page).toContain('title="PixelCheck"');
    expect(page).toContain('role="Designer & builder (with Claude Code)"');
    expect(page).toContain('timeline="Sep – Oct 2026"');
  });

  it('is first on the home page and registered on the work index and pen transition', () => {
    const home = read('src/pages/index.astro');
    expect(home).toMatch(/number: '01',\s*category: 'AI Tooling',\s*title: 'PixelCheck'/);
    expect(home).toContain("href: '/work/pixelcheck'");
    expect(read('src/pages/work/index.astro')).toContain("href: '/work/pixelcheck'");
    expect(read('src/components/PenTransition.astro')).toContain("pixelcheck: '#B23A0C'");
  });

  it('has an At a glance summary and key decisions', () => {
    const s = caseStudySummaries.pixelcheck;
    expect(s).toBeDefined();
    expect(s.tldr.timeline).toBe('Sep – Oct 2026');
    expect(s.decisions.length).toBeGreaterThanOrEqual(3);
  });

  it('sits in the prev/next chain between Immunization and EqualTales', () => {
    expect(page).toContain("prevProject={{ title: 'Immunization', href: '/work/immunization' }}");
    expect(page).toMatch(/nextProject=\{\{\s*title: 'EqualTales'/);
    expect(read('src/pages/work/immunization.astro')).toMatch(/nextProject=\{\{\s*title: 'PixelCheck',\s*href: '\/work\/pixelcheck'/);
    expect(read('src/pages/work/equaltales.astro')).toContain("prevProject={{ title: 'PixelCheck', href: '/work/pixelcheck' }}");
  });
});

describe('PixelCheck: what the page must not say', () => {
  it('never mentions the hackathon or links its materials', () => {
    expect(all).not.toMatch(/hackathon|devpost|judges?\b|submission|youtu|github\.com\/hafsau\/pixel-check/i);
    expect(all).not.toMatch(/Nebius\s*[×x]\s*NVIDIA/i);
  });

  it('avoids overclaims', () => {
    expect(all).not.toMatch(/\bproves?\b|verified everywhere|pixel-perfect|byte-identical|first tool/i);
  });

  it('uses no emojis', () => {
    expect(all).not.toMatch(/\p{Extended_Pictographic}/u);
  });
});

describe('PixelCheck: technologies are named and highlighted', () => {
  it('fills the layout tools list', () => {
    expect(page).toMatch(/tools=\{tools\}/);
    expect(page).toContain("'Nebius Token Factory'");
    expect(page).toContain("'NVIDIA Nemotron 3 Super'");
  });

  it('has a tech section with each technology and its role', () => {
    expect(page).toContain('<PcStack />');
    ['Nebius Token Factory Sandboxes', 'NVIDIA Nemotron 3 Super', 'NVIDIA Nemotron 3 Ultra', 'Gemma 3 27B', 'Tesseract OCR',
      'Playwright', 'React + TypeScript + Vite', 'Tailwind CSS', 'Python + FastAPI', 'Claude Code']
      .forEach((t) => expect(stack, t).toContain(t));
  });
});

describe('PixelCheck: accessibility', () => {
  it('the fits/matches strip uses real buttons and announces changes', () => {
    expect(strip).toContain('type="button"');
    expect(strip).toContain('aria-pressed');
    expect(strip).toContain('aria-live="polite"');
    expect(strip).toContain('prefers-reduced-motion');
  });

  it('describes every screenshot', () => {
    const imgs = [...page.matchAll(/<img[^>]*>/g)];
    expect(imgs.length).toBeGreaterThanOrEqual(4);
    imgs.forEach((m) => expect(m[0]).toMatch(/alt="[^"]{20,}"/));
  });

  it('external links say they open a new tab', () => {
    const blanks = [...page.matchAll(/<a[^>]*target="_blank"[^>]*>[\s\S]*?<\/a>/g)];
    expect(blanks.length).toBeGreaterThan(0);
    blanks.forEach((m) => {
      expect(m[0]).toContain('rel="noopener noreferrer"');
      expect(m[0]).toContain('opens in a new tab');
    });
  });

  it('colours meet WCAG contrast on the dark background', () => {
    const bg = '#0D0D0D';
    expect(contrastRatio('#FF6A2B', bg)).toBeGreaterThanOrEqual(4.5); // accent text
    expect(contrastRatio('#E5480F', bg)).toBeGreaterThanOrEqual(3); // accent rules and bars
    expect(contrastRatio('#FFFFFF', '#B23A0C')).toBeGreaterThanOrEqual(4.5); // primary button, transition title
    expect(contrastRatio('#1F7A4D', '#141414')).toBeGreaterThanOrEqual(3); // "fits" cells
    ['#C8261B', '#A24A0C', '#1F7A4D'].forEach((c) => expect(contrastRatio('#FFFFFF', c), c).toBeGreaterThanOrEqual(4.5)); // scores on cells
  });
});

describe('PixelCheck: assets', () => {
  it('has its hero, card, screenshots and social image', () => {
    ['hero.png', 'hero.webp', 'card.webp', 'check-result.webp', 'why-overlay.webp', 'fix-brief.webp', 'audit.webp']
      .map((f) => `public/images/pixelcheck/${f}`)
      .concat('public/images/og/pixelcheck.jpg')
      .forEach((f) => expect(existsSync(resolve(root, f)), f).toBe(true));
  });
});
