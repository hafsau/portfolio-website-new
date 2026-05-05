import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const backToTopContent = readFileSync(resolve(__dirname, '../src/components/BackToTop.astro'), 'utf-8');
const loadingScreenContent = readFileSync(resolve(__dirname, '../src/components/LoadingScreen.astro'), 'utf-8');
const gsapUtilsContent = readFileSync(resolve(__dirname, '../src/scripts/gsap-utils.ts'), 'utf-8');

describe('BackToTop Component', () => {
  it('should have accessible button with aria-label', () => {
    expect(backToTopContent).toContain('aria-label="Back to top"');
  });

  it('should have back-to-top class', () => {
    expect(backToTopContent).toContain('class="back-to-top"');
  });

  it('should have fixed positioning', () => {
    expect(backToTopContent).toContain('position: fixed');
  });

  it('should have scroll detection', () => {
    expect(backToTopContent).toContain('window.scrollY');
    expect(backToTopContent).toContain('threshold');
  });

  it('should scroll to top on click', () => {
    expect(backToTopContent).toContain('scrollTo');
    expect(backToTopContent).toContain('top: 0');
  });

  it('should use GSAP for animations', () => {
    expect(backToTopContent).toContain('gsap');
  });

  it('should respect reduced motion preference', () => {
    expect(backToTopContent).toContain('prefers-reduced-motion');
  });

  it('should have hover styles', () => {
    expect(backToTopContent).toContain(':hover');
  });

  it('should have focus-visible styles', () => {
    expect(backToTopContent).toContain(':focus-visible');
  });

  it('should handle visibility with class toggle', () => {
    expect(backToTopContent).toContain('.visible');
  });
});

describe('LoadingScreen Component', () => {
  it('should have loading screen container', () => {
    expect(loadingScreenContent).toContain('id="loading-screen"');
  });

  it('should have logo reveal animation', () => {
    expect(loadingScreenContent).toContain('logo-reveal');
    expect(loadingScreenContent).toContain('clip-path');
  });

  it('should track loading progress', () => {
    expect(loadingScreenContent).toContain('currentProgress');
    expect(loadingScreenContent).toContain('targetProgress');
  });

  it('should have fallback timeout', () => {
    expect(loadingScreenContent).toContain('fallbackTimeout');
  });

  it('should skip loading when returning from case study', () => {
    expect(loadingScreenContent).toContain('sessionStorage');
    expect(loadingScreenContent).toContain('scrollToSection');
  });

  it('should respect reduced motion preference', () => {
    expect(loadingScreenContent).toContain('prefers-reduced-motion');
  });

  it('should have exit animation', () => {
    expect(loadingScreenContent).toContain('completeLoading');
  });
});

describe('GSAP Utils', () => {
  it('should export initSmoothScroll function', () => {
    expect(gsapUtilsContent).toContain('export function initSmoothScroll');
  });

  it('should export initScrollReveals function', () => {
    expect(gsapUtilsContent).toContain('export function initScrollReveals');
  });

  it('should export initAnchorScroll function', () => {
    expect(gsapUtilsContent).toContain('export function initAnchorScroll');
  });

  it('should initialize Lenis smooth scroll', () => {
    expect(gsapUtilsContent).toContain('Lenis');
    expect(gsapUtilsContent).toContain('new Lenis');
  });

  it('should connect Lenis with ScrollTrigger', () => {
    expect(gsapUtilsContent).toContain('ScrollTrigger');
  });

  it('should prevent duplicate anchor scroll initialization', () => {
    expect(gsapUtilsContent).toContain('data-anchor-init');
  });

  it('should have fallback for native scroll', () => {
    expect(gsapUtilsContent).toContain("behavior: 'smooth'");
  });

  it('should handle anchor links with offset', () => {
    expect(gsapUtilsContent).toContain('offset');
    expect(gsapUtilsContent).toContain('targetPosition');
  });
});
