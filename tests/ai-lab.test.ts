import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { labProjects, linkLabel, awards, councilReplay, askAiExchange, auditSnapshot } from '../src/data/aiLab';
import { caseStudySummaries } from '../src/data/caseStudySummaries';

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), 'utf-8');

describe('AI Lab page', () => {
  let page: string;
  let data: string;
  let components: string;

  beforeAll(() => {
    page = read('src/pages/work/ai-lab.astro');
    data = read('src/data/aiLab.ts');
    components = ['CouncilReplay', 'AskAiTranscript', 'ExperimentIndex']
      .map((c) => read(`src/components/ai-lab/${c}.astro`))
      .join('\n');
  });

  describe('Accuracy', () => {
    it('names no retired or dropped tools', () => {
      for (const text of [page, data, components]) {
        expect(text).not.toMatch(/DALL-?E|Bard\b|Goose/i);
      }
    });

    it('labels each link by where it goes', () => {
      for (const p of labProjects) {
        if (p.url.includes('devpost.com')) expect(p.status).toBe('writeup');
        if (p.url.startsWith('/work/')) expect(p.status).toBe('case-study');
        if (p.status === 'live') expect(p.url).toMatch(/^https:\/\//);
        expect(linkLabel[p.status]).toBeTruthy();
      }
    });

    it('backs the awards metric with named awards', () => {
      expect(awards.map((a) => a.id).sort()).toEqual(['carbonlint', 'equaltales']);
      expect(page).toContain('String(awards.length)');
      expect(caseStudySummaries['ai-lab'].tldr.outcome).toContain(`${awards.length} Hackathon Awards`);
      for (const a of awards) expect(caseStudySummaries['ai-lab'].tldr.outcome).toContain(a.title);
    });

    it('describes Interview Sage as the question generator it is', () => {
      const sage = labProjects.find((p) => p.id === 'interview-sage')!;
      expect(sage.summary).toMatch(/interview questions/);
      expect(sage.summary).not.toMatch(/coach|practice/i);
    });

    it('uses only real captured assistant answers and the real follow-up order', () => {
      const askAi = read('src/components/AskAI.astro');
      const followUps = [...askAi.matchAll(/\{ q: '([^']+)'/g)].map((m) => m[1].replace(/’/g, '’'));
      for (const turn of askAiExchange.turns) {
        for (const q of turn.followUps ?? []) expect(followUps).toContain(q);
      }
      expect(askAiExchange.model).toBe('Claude Haiku 5.5');
      expect(read('src/pages/api/ask.ts')).toContain("claude-haiku-5-5");
    });

    it('keeps the audit numbers consistent with its findings', () => {
      expect(auditSnapshot.scanner.found).toBe(0);
      expect(auditSnapshot.byHand).toHaveLength(2);
      expect(page).toContain('auditSnapshot.byHand.length');
      expect(fs.existsSync(path.join(process.cwd(), 'scripts/a11y-audit.mjs'))).toBe(true);
      expect(read('package.json')).toContain('"audit:a11y"');
    });

    it('replays a council with three reviewers and her decision', () => {
      expect(councilReplay.lenses.map((l) => l.role)).toEqual(['Hiring manager', 'Art director', 'Engineer']);
      expect(councilReplay.decision.choice).toBeTruthy();
      expect(councilReplay.prompt.startsWith('claude:')).toBe(true);
      for (const img of [councilReplay.before.src, councilReplay.after.src]) {
        expect(fs.existsSync(path.join(process.cwd(), 'public', img))).toBe(true);
      }
    });
  });

  describe('Design rules', () => {
    it('retires the orange accent on this page', () => {
      expect(page).not.toMatch(/#f97316/i);
      expect(components).not.toMatch(/#f97316/i);
    });

    it('has no boxed cards or leftover featured-project CSS', () => {
      expect(page).not.toMatch(/-card\b|\.featured-|border-left:\s*3px|translateY\(-/);
    });

    it('contains no emojis', () => {
      const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
      for (const text of [page, data, components]) expect(text).not.toMatch(emoji);
    });

    it('renders the council as an ordered list that reads without JavaScript', () => {
      const council = read('src/components/ai-lab/CouncilReplay.astro');
      expect(council).toContain('<ol class="cr-steps">');
      expect(council).toContain('<del>');
      expect(council).toContain('prefers-reduced-motion');
    });

    it('opens the live assistant from the page, with a no-JS fallback', () => {
      expect(page).toMatch(/<a href="\/contact" data-ask-ai/);
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
