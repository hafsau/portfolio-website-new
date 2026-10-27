import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Extract data from index.astro
const indexContent = readFileSync(resolve(__dirname, '../src/pages/index.astro'), 'utf-8');

// Helper to extract JS array from astro file
function extractArray(content: string, varName: string): any[] {
  const regex = new RegExp(`const ${varName} = \\[([\\s\\S]*?)\\];`, 'm');
  const match = content.match(regex);
  if (!match) return [];

  // Clean and parse the array
  const arrayStr = `[${match[1]}]`;
  // Use Function constructor to safely evaluate the array literal
  return eval(arrayStr);
}

describe('Portfolio Data', () => {
  describe('Projects', () => {
    const projects = extractArray(indexContent, 'projects');

    it('should have at least 3 projects', () => {
      expect(projects.length).toBeGreaterThanOrEqual(3);
    });

    it('each project should have required fields', () => {
      projects.forEach((project: any) => {
        expect(project).toHaveProperty('number');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('category');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('href');
        expect(project).toHaveProperty('image');
        expect(project).toHaveProperty('color');
      });
    });

    it('project numbers should be sequential', () => {
      projects.forEach((project: any, index: number) => {
        const expectedNumber = String(index + 1).padStart(2, '0');
        expect(project.number).toBe(expectedNumber);
      });
    });

    it('project colors should be valid hex codes', () => {
      projects.forEach((project: any) => {
        expect(project.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('project images should be valid paths', () => {
      projects.forEach((project: any) => {
        expect(project.image).toMatch(/^\/images\/.+\.(png|jpg|jpeg|svg|webp)$/);
      });
    });
  });

  describe('How I work', () => {
    const principles = extractArray(indexContent, 'principles');

    it('should have three principles', () => {
      expect(principles.length).toBe(3);
    });

    it('each principle should have a word, title, sentence and action', () => {
      principles.forEach((p: any) => {
        expect(p.word).toBeTruthy();
        expect(p.title).toBeTruthy();
        expect(p.sentence).toBeTruthy();
        expect(['ask', 'sketch', 'link']).toContain(p.action);
      });
    });
  });
});
