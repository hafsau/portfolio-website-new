import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { deepBuilds, quickBuilds, moreWork, awards, terminalPrompts } from '../src/data/aiLab';
import { caseStudySummaries } from '../src/data/caseStudySummaries';

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), 'utf-8');
const builds = [...deepBuilds, ...quickBuilds];

describe('AI Lab page', () => {
  let page: string;
  let data: string;

  beforeAll(() => {
    page = read('src/pages/work/ai-lab.astro');
    data = read('src/data/aiLab.ts');
  });

  describe('Scope: AI Lab work only', () => {
    it('covers the four lab builds and links the two with their own case studies', () => {
      expect(deepBuilds.map((b) => b.id)).toEqual(['carbonlint', 'climatehaven']);
      expect(quickBuilds.map((b) => b.id)).toEqual(['interview-sage', 'headshot-ai']);
      expect(moreWork.map((w) => w.href)).toEqual(['/work/equaltales', '/work/pixelcheck']);
    });

    it('shows no portfolio-site material', () => {
      for (const text of [page, data]) {
        expect(text).not.toMatch(/council|hero photo|Ask my AI|a11y-audit|council-hero/i);
      }
    });
  });

  describe('Accuracy', () => {
    it('names no retired or dropped tools', () => {
      for (const text of [page, data]) expect(text).not.toMatch(/DALL-?E|Bard\b|Goose/i);
    });

    it('labels writeups as writeups, never as live products', () => {
      for (const b of builds) {
        if (b.link.href.includes('devpost.com')) expect(b.link.label).toBe('Read the writeup');
        else expect(b.link.label).toBe('Try it');
      }
    });

    it('prefixes each terminal prompt with the tool that built it', () => {
      expect(terminalPrompts.map((p) => p.split(':')[0])).toEqual(['duo', 'zerve', 'replit', 'lovable']);
      expect(builds.map((b) => b.tool)).toEqual(['GitLab Duo', 'Zerve', 'Replit Agent', 'Lovable']);
    });

    it('backs the awards metric with named awards', () => {
      expect(awards.map((a) => a.project)).toEqual(['CarbonLint', 'EqualTales']);
      expect(page).toContain('String(awards.length)');
      const outcome = caseStudySummaries['ai-lab'].tldr.outcome;
      expect(outcome).toContain(`${awards.length} Hackathon Awards`);
      for (const a of awards) expect(outcome).toContain(a.project);
      expect(deepBuilds[0].award).toBe('Sustainable Design Bonus');
      expect(moreWork[0].note).toContain('#75HER');
    });

    it('describes Interview Sage as the question generator it is', () => {
      const sage = quickBuilds.find((b) => b.id === 'interview-sage')!;
      expect(sage.summary).toMatch(/interview questions/);
      expect(sage.summary).not.toMatch(/coach|practice/i);
    });

    it('pairs every CarbonLint problem with the fix from its writeup', () => {
      const carbon = deepBuilds[0];
      expect(carbon.fixes).toHaveLength(3);
      for (const f of carbon.fixes!) expect(f.problem && f.fix).toBeTruthy();
    });
  });

  describe('Design rules', () => {
    it('retires the orange accent on this page', () => {
      expect(page).not.toMatch(/#f97316/i);
      expect(page).toContain('--terminal-accent');
    });

    it('has no boxed cards or leftover featured-project CSS', () => {
      expect(page).not.toMatch(/-card\b|\.featured-|border-left:\s*3px|translateY\(-/);
    });

    it('contains no emojis', () => {
      const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
      for (const text of [page, data]) expect(text).not.toMatch(emoji);
    });

    it('gives every screenshot alt text and dimensions', () => {
      for (const b of builds) {
        expect(b.image.alt.length).toBeGreaterThan(20);
        expect(b.image.width).toBeGreaterThan(0);
        expect(fs.existsSync(path.join(process.cwd(), 'public', b.image.src))).toBe(true);
      }
    });
  });

  describe('Assets', () => {
    it('has the hero, card and social images', () => {
      for (const f of ['public/images/ai-lab/hero.png', 'public/images/ai-lab/hero.webp', 'public/images/ai-lab/card.webp', 'public/images/og/ai-lab.jpg']) {
        expect(fs.existsSync(path.join(process.cwd(), f))).toBe(true);
      }
      expect(page).toContain('heroImage="/images/ai-lab/hero.png"');
    });
  });
});
