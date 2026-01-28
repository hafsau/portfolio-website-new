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
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('metric');
        expect(project).toHaveProperty('year');
      });
    });

    it('project numbers should be sequential', () => {
      projects.forEach((project: any, index: number) => {
        const expectedNumber = String(index + 1).padStart(2, '0');
        expect(project.number).toBe(expectedNumber);
      });
    });

    it('project metrics should contain percentage or quantifiable data', () => {
      projects.forEach((project: any) => {
        expect(project.metric).toMatch(/\d+%|\d+[MK]?\+?/);
      });
    });
  });

  describe('Skill Categories', () => {
    const skillCategories = extractArray(indexContent, 'skillCategories');

    it('should have at least 4 skill categories', () => {
      expect(skillCategories.length).toBeGreaterThanOrEqual(4);
    });

    it('should include Design, Research, Technical, and AI & Automation categories', () => {
      const categoryNames = skillCategories.map((cat: any) => cat.category);
      expect(categoryNames).toContain('Design');
      expect(categoryNames).toContain('Research');
      expect(categoryNames).toContain('Technical');
      expect(categoryNames).toContain('AI & Automation');
    });

    it('each category should have at least 5 skills', () => {
      skillCategories.forEach((cat: any) => {
        expect(cat.skills.length).toBeGreaterThanOrEqual(5);
      });
    });
  });

  describe('Tools', () => {
    const tools = extractArray(indexContent, 'tools');

    it('should have at least 10 tools', () => {
      expect(tools.length).toBeGreaterThanOrEqual(10);
    });

    it('each tool should have name and icon properties', () => {
      tools.forEach((tool: any) => {
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('icon');
        expect(tool.name).toBeTruthy();
        expect(tool.icon).toBeTruthy();
      });
    });

    it('should include essential design tools', () => {
      const toolNames = tools.map((t: any) => t.name);
      expect(toolNames).toContain('Figma');
    });

    it('should include Claude AI tool', () => {
      const toolNames = tools.map((t: any) => t.name);
      expect(toolNames).toContain('Claude AI');
    });
  });
});
