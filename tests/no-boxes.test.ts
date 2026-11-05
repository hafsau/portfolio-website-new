import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Case studies use type, hairline rules and captioned figures, not boxed cards.
 * A surface may frame an artifact (screenshot, video, diagram), never a paragraph.
 */
const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), 'utf-8');

const PAGES = ['medrec', 'fitstart', 'folio', 'immunization', 'equaltales', 'portfolio-website', 'ai-lab'];

describe('No boxed cards in case studies', () => {
  for (const page of PAGES) {
    describe(page, () => {
      const src = read(`src/pages/work/${page}.astro`);

      it('has no 3px accent side bars', () => {
        expect(src).not.toMatch(/border-left:\s*3px/);
      });

      it('has no hover lift', () => {
        expect(src).not.toMatch(/translateY\(-/);
      });

      it('has no decorative item numbers', () => {
        expect(src).not.toMatch(/0\{index \+ 1\}/);
      });

      it('has no boxed challenge, contribution or impact stacks', () => {
        expect(src).not.toMatch(/challenge-box|contribution-row|impact-row/);
      });
    });
  }

  it('keeps the shared layout chrome unboxed', () => {
    const layout = read('src/layouts/CaseStudyLayout.astro');
    const decisionCard = layout.match(/\.decision-card \{[^}]*\}/)![0];
    expect(decisionCard).not.toMatch(/border-radius|background/);
    const blockquote = layout.match(/\.case-content :global\(blockquote\) \{[^}]*\}/)![0];
    expect(blockquote).not.toMatch(/border-left:\s*3px/);
    expect(layout).not.toMatch(/\.next-project-feature:hover \{[^}]*translateY/);
  });

  it('ships the shared no-box components', () => {
    for (const c of ['RuledList', 'RuledRow', 'Figure', 'Lead', 'DisplayNumeral', 'MarginNote', 'ContributionList', 'ImpactList', 'CompareSlider']) {
      expect(fs.existsSync(path.join(process.cwd(), `src/components/case/${c}.astro`))).toBe(true);
    }
  });

  it('gives every ruled row a list parent for screen readers', () => {
    expect(read('src/components/case/RuledList.astro')).toContain('role="list"');
    expect(read('src/components/case/RuledRow.astro')).toContain('role="listitem"');
  });
});
