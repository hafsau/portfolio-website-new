import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('AI Lab Page Quality Checks', () => {
  let aiLabContent: string;
  let codeTerminalContent: string;

  beforeAll(() => {
    aiLabContent = fs.readFileSync(
      path.join(process.cwd(), 'src/pages/work/ai-lab.astro'),
      'utf-8'
    );
    codeTerminalContent = fs.readFileSync(
      path.join(process.cwd(), 'src/components/CodeTerminal.astro'),
      'utf-8'
    );
  });

  describe('No Emojis Policy', () => {
    it('should not contain emoji icons in philosophy data', () => {
      // Check that philosophy uses 'number' not 'icon' with emojis
      expect(aiLabContent).toContain("number: '01'");
      expect(aiLabContent).toContain("number: '02'");
      expect(aiLabContent).toContain("number: '03'");
      expect(aiLabContent).not.toMatch(/icon:\s*['"][^'"]*[🎯🔄🚀🤖✨⚡💜🏆]/);
    });

    it('should not contain emoji icons in aiTools data', () => {
      // aiTools should not have icon field with emojis
      const aiToolsSection = aiLabContent.match(/const aiTools = \[[\s\S]*?\];/);
      expect(aiToolsSection).toBeTruthy();
      if (aiToolsSection) {
        expect(aiToolsSection[0]).not.toMatch(/icon:\s*['"][🤖✨⚡💜]/);
      }
    });

    it('should have 6 tools in aiTools including DALL-E and v0', () => {
      expect(aiLabContent).toContain("name: 'Claude Code'");
      expect(aiLabContent).toContain("name: 'Cursor'");
      expect(aiLabContent).toContain("name: 'Replit Agent'");
      expect(aiLabContent).toContain("name: 'Lovable'");
      expect(aiLabContent).toContain("name: 'DALL-E'");
      expect(aiLabContent).toContain("name: 'v0 by Vercel'");
    });

    it('should not contain emoji in text', () => {
      // Featured projects moved to their own pages, no award text in AI Lab anymore
      expect(aiLabContent).not.toContain('🏆');
    });

    it('should use philosophy-number class not philosophy-icon', () => {
      expect(aiLabContent).toContain('philosophy-number');
      expect(aiLabContent).toContain('.philosophy-number');
    });
  });

  describe('No Build Time Metrics', () => {
    it('should not display build time in metrics', () => {
      const metricsSection = aiLabContent.match(/const metrics = \[[\s\S]*?\];/);
      expect(metricsSection).toBeTruthy();
      if (metricsSection) {
        expect(metricsSection[0]).not.toContain('48hrs');
        expect(metricsSection[0]).not.toContain('Build Time');
        expect(metricsSection[0]).not.toContain('Avg Build');
      }
    });

    it('should only have 2 metrics: Experiments Shipped and Hackathons Won', () => {
      expect(aiLabContent).toContain("{ value: '4', label: 'Experiments Shipped' }");
      expect(aiLabContent).toContain("{ value: '2', label: 'Hackathons Won' }");
    });

    it('should not have buildTime in labProjects', () => {
      const labSection = aiLabContent.match(/const labProjects = \[[\s\S]*?\];/);
      expect(labSection).toBeTruthy();
      if (labSection) {
        expect(labSection[0]).not.toContain('buildTime:');
      }
    });

    it('should not display Build Time in featured meta', () => {
      expect(aiLabContent).not.toContain("<span class=\"meta-label\">Build Time</span>");
    });
  });

  describe('Featured Projects Moved to Own Pages', () => {
    it('should NOT have featuredProjects array (moved to separate pages)', () => {
      expect(aiLabContent).not.toContain('const featuredProjects = [');
    });

    it('should NOT have EqualTales in AI Lab (has own page)', () => {
      expect(aiLabContent).not.toContain("id: 'equaltales'");
    });

    it('should NOT have HafsaUsmani.com as a project in AI Lab (has own page)', () => {
      expect(aiLabContent).not.toContain("id: 'portfolio'");
      // Note: HafsaUsmani.com still appears in prevProject nav and tool usedIn arrays, which is expected
    });
  });

  describe('Other Experiments (Only 2 projects)', () => {
    it('should only have Interview Sage and HeadshotAI in labProjects', () => {
      const labSection = aiLabContent.match(/const labProjects = \[[\s\S]*?\];/);
      expect(labSection).toBeTruthy();
      if (labSection) {
        expect(labSection[0]).toContain("id: 'interview-sage'");
        expect(labSection[0]).toContain("id: 'headshot-ai'");
        // Portfolio should NOT be in labProjects (it's in featuredProjects)
        expect(labSection[0]).not.toContain("id: 'portfolio'");
      }
    });
  });

  describe('CodeTerminal Component', () => {
    it('should have max-width of 700px', () => {
      expect(codeTerminalContent).toContain('max-width: 700px');
      expect(codeTerminalContent).not.toContain('max-width: 500px');
    });

    it('should use short prompts with claude: prefix in ai-lab.astro', () => {
      // Check that prompts have claude: prefix and are reasonably short
      expect(aiLabContent).toContain('"claude: Build my portfolio with Astro"');
      expect(aiLabContent).toContain('"claude: Predict climate gentrification hotspots"');
      expect(aiLabContent).not.toContain('claude: Help me build a');
    });
  });

  describe('CSS Layout Fixes', () => {
    it('should have experiments-section with extra spacing', () => {
      expect(aiLabContent).toContain('class="case-section experiments-section"');
      expect(aiLabContent).toContain('.experiments-section');
      expect(aiLabContent).toMatch(/\.experiments-section[\s\S]*?margin-top:\s*4rem/);
    });

    it('should have toolbox-section with extra spacing', () => {
      expect(aiLabContent).toContain('class="case-section toolbox-section"');
      expect(aiLabContent).toContain('.toolbox-section');
      expect(aiLabContent).toMatch(/\.toolbox-section[\s\S]*?margin-top:\s*4rem/);
    });

    it('should have reflections-section with extra spacing', () => {
      expect(aiLabContent).toContain('.reflections-section');
      expect(aiLabContent).toContain('margin-top: 5rem');
    });

    it('should have vertical exploring-header layout', () => {
      expect(aiLabContent).toContain('.exploring-header');
      expect(aiLabContent).toMatch(/\.exploring-header[\s\S]*?flex-direction:\s*column/);
    });

    it('should have philosophy cards with left alignment', () => {
      expect(aiLabContent).toMatch(/\.philosophy-card[\s\S]*?text-align:\s*left/);
    });

    it('should have experiment-content with min-width: 0 for text wrapping', () => {
      expect(aiLabContent).toMatch(/\.experiment-content[\s\S]*?min-width:\s*0/);
    });

    it('should not have tool-icon class definition', () => {
      expect(aiLabContent).not.toContain('.tool-icon {');
    });
  });

  describe('Section Structure', () => {
    it('should have Philosophy section with numbered pillars', () => {
      expect(aiLabContent).toContain('<h2>My Approach</h2>');
      expect(aiLabContent).toContain('philosophy-number');
    });

    it('should have Experiments section (not Featured Projects in content)', () => {
      expect(aiLabContent).toContain('<h2>Experiments</h2>');
      // CSS comments may still contain "Featured" but HTML content should not
      expect(aiLabContent).not.toContain('<span class="featured-badge">');
    });

    it('should have AI Toolbox section', () => {
      expect(aiLabContent).toContain('<h2>AI Toolbox</h2>');
    });

    it('should have What I\'ve Learned section with reflections-section class', () => {
      expect(aiLabContent).toContain('<h2>What I\'ve Learned</h2>');
      expect(aiLabContent).toContain('class="case-section reflections-section"');
    });

    it('should have Currently Exploring section', () => {
      expect(aiLabContent).toContain('<h2>Currently Exploring</h2>');
    });
  });

  describe('Accessibility', () => {
    it('should have prefers-reduced-motion support', () => {
      expect(aiLabContent).toContain('prefers-reduced-motion');
    });

    it('should have proper alt text for images', () => {
      expect(aiLabContent).toContain('alt={`${project.title}');
    });
  });
});

describe('CLAUDE.md Documentation', () => {
  let claudeMdContent: string;

  beforeAll(() => {
    claudeMdContent = fs.readFileSync(
      path.join(process.cwd(), 'CLAUDE.md'),
      'utf-8'
    );
  });

  it('should have no-emojis user preference documented', () => {
    expect(claudeMdContent).toContain('No emojis in content');
  });

  it('should have verify-stats user preference documented', () => {
    expect(claudeMdContent).toContain('Verify stats');
  });

  it('should document two featured projects', () => {
    expect(claudeMdContent).toContain('EqualTales + HafsaUsmani.com');
  });

  it('should document no build time metrics', () => {
    expect(claudeMdContent).toContain('NO buildTime');
  });

  it('should have current work context section', () => {
    expect(claudeMdContent).toContain('Current Work Context');
  });
});
