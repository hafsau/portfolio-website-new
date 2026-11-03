import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { contrastRatio, formatRatio, textLevel } from '../src/lib/contrast';
import { pairings, typeScale, vocabulary } from '../src/data/philly-truce-tokens';

const root = resolve(__dirname, '..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf-8');
const page = read('src/pages/work/philly-truce.astro');
const states = read('src/components/philly-truce/PtStates.astro');
const beforeAfter = read('src/components/philly-truce/PtBeforeAfter.astro');
const anatomy = read('src/components/philly-truce/PtAnatomy.astro');

describe('Philly Truce: contrast math', () => {
  it('matches the audit numbers', () => {
    expect(formatRatio(contrastRatio('#D35400', '#FDF6E3'))).toBe('3.86'); // draft orange link on cream
    expect(formatRatio(contrastRatio('#1E7A8C', '#E8EDF7'))).toBe('4.24'); // link teal on pale
    expect(contrastRatio('#F4B942', '#FFFFFF')).toBeLessThan(3); // gold ring on white
    expect(contrastRatio('#F4B942', '#FFF4DA')).toBeLessThan(3); // gold ring on cream
    expect(contrastRatio('#002768', '#FFFFFF')).toBeGreaterThanOrEqual(3); // navy inner ring (the fix)
    expect(contrastRatio('#0F4C5C', '#E8EDF7')).toBeGreaterThanOrEqual(4.5); // fixed link on pale
  });

  it('rounds down so borderline values never pass', () => {
    expect(textLevel(4.499)).toBe('Fail');
    expect(formatRatio(4.499)).toBe('4.49');
  });

  it('every approved pairing passes AAA', () => {
    pairings.forEach((p) => expect(textLevel(contrastRatio(p.fg, p.bg))).toBe('AAA'));
  });
});

describe('Philly Truce: system data', () => {
  it('has nine type steps that map to Wix text themes', () => {
    expect(typeScale.map((s) => s.step)).toEqual(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P1', 'P2', 'P3']);
    typeScale.forEach((s) => expect(s.wix).toMatch(/^(Heading [1-6]|Paragraph [1-3])$/));
  });

  it('has a vocabulary guide', () => {
    expect(vocabulary.length).toBeGreaterThanOrEqual(4);
    vocabulary.forEach((v) => expect(v.not).toBeTruthy()); // only rows the guide backs with a "not" term
  });
});

describe('Philly Truce: accessible interactives', () => {
  it('uses native controls and announces changes politely', () => {
    expect(beforeAfter).toContain('type="range"');
    expect(beforeAfter).toContain('aria-pressed');
    expect(states).toContain('role="switch"');
    expect(states).toContain('aria-live="polite"');
    expect(anatomy).toContain('type="button"');
  });

  it('describes every screenshot', () => {
    const imgs = [...page.matchAll(/<img[^>]*>/g), ...beforeAfter.matchAll(/<img[^>]*>/g), ...anatomy.matchAll(/<img[^>]*>/g)];
    expect(imgs.length).toBeGreaterThan(4);
    imgs.forEach((m) => expect(m[0]).toMatch(/alt=/));
  });
});

describe('Philly Truce: page and registration', () => {
  it('states the role, timeline and launch status honestly', () => {
    expect(page).toContain('title="Philly Truce"');
    expect(page).toContain('timeline="Mar – Nov 2026"');
    expect(page).toContain('not yet launched');
    expect(page).toContain('role="Product Designer"');
    expect(page).not.toContain('Maya Robinson'); // placeholder quote, not for use
  });

  it('is registered on the home page, work index and pen transition', () => {
    expect(read('src/pages/index.astro')).toContain("href: '/work/philly-truce'");
    expect(read('src/pages/work/index.astro')).toContain("href: '/work/philly-truce'");
    expect(read('src/components/PenTransition.astro')).toContain("'philly-truce'");
  });

  it('has its images and self-hosted fonts', () => {
    ['public/images/philly-truce/hero.png', 'public/images/philly-truce/hero.webp', 'public/images/philly-truce/card.webp', 'public/images/og/philly-truce.jpg',
      'public/fonts/philly-truce/dm-serif-display.woff2', 'public/fonts/philly-truce/inter-var.woff2', 'public/fonts/philly-truce/sacramento.woff2']
      .forEach((f) => expect(existsSync(resolve(root, f)), f).toBe(true));
  });
});
