/**
 * GSAP Animation Utilities
 *
 * Initializes GSAP with ScrollTrigger and Lenis smooth scroll.
 * Provides reusable animation presets for the portfolio revamp.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll instance
let lenis: Lenis | null = null;

/**
 * Initialize Lenis smooth scroll and connect with ScrollTrigger
 */
export function initSmoothScroll(): Lenis {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Connect Lenis scroll to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Sync GSAP ticker with Lenis
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  // Disable GSAP's default lag smoothing for smoother animations
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/**
 * Get the Lenis instance
 */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Initialize smooth anchor link scrolling with offset
 * Handles clicks on anchor links and scrolls smoothly to the target
 */
export function initAnchorScroll(offset: number = 100): void {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    // Skip if already initialized
    if (link.hasAttribute('data-anchor-init')) return;
    link.setAttribute('data-anchor-init', 'true');

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Calculate scroll position with offset
      const targetRect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = targetRect.top + scrollTop - offset;

      // Use Lenis if available, otherwise fallback to native scroll
      if (lenis) {
        lenis.scrollTo(targetPosition, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}

/**
 * Animation presets
 */
export const animationPresets = {
  // Blur fade up - MotionSites signature animation
  blurFadeUp: {
    from: {
      opacity: 0,
      filter: 'blur(20px)',
      y: 40,
    },
    to: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 1,
      ease: 'power3.out',
    },
  },

  // Standard fade up
  fadeUp: {
    from: {
      opacity: 0,
      y: 30,
    },
    to: {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    },
  },

  // Character reveal with rotation
  charReveal: {
    from: {
      opacity: 0,
      y: '100%',
      rotateX: -90,
    },
    to: {
      opacity: 1,
      y: '0%',
      rotateX: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
    },
  },

  // Scale in
  scaleIn: {
    from: {
      opacity: 0,
      scale: 0.9,
    },
    to: {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    },
  },

  // Slide from left
  slideLeft: {
    from: {
      opacity: 0,
      x: -80,
    },
    to: {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
    },
  },

  // Slide from right
  slideRight: {
    from: {
      opacity: 0,
      x: 80,
    },
    to: {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
    },
  },
};

/**
 * Create a scroll-triggered animation
 */
export function createScrollAnimation(
  element: string | Element,
  animation: keyof typeof animationPresets | gsap.TweenVars,
  options: ScrollTrigger.Vars = {}
): gsap.core.Tween {
  const preset = typeof animation === 'string' ? animationPresets[animation] : null;

  const defaultTrigger: ScrollTrigger.Vars = {
    trigger: element,
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    ...options,
  };

  if (preset) {
    return gsap.fromTo(
      element,
      preset.from,
      {
        ...preset.to,
        scrollTrigger: defaultTrigger,
      }
    );
  }

  return gsap.to(element, {
    ...(animation as gsap.TweenVars),
    scrollTrigger: defaultTrigger,
  });
}

/**
 * Create staggered scroll animations for multiple elements
 */
export function createStaggeredAnimation(
  elements: string | Element[],
  animation: keyof typeof animationPresets,
  stagger: number = 0.1,
  options: ScrollTrigger.Vars = {}
): gsap.core.Tween {
  const preset = animationPresets[animation];

  return gsap.fromTo(
    elements,
    preset.from,
    {
      ...preset.to,
      stagger,
      scrollTrigger: {
        trigger: typeof elements === 'string' ? elements : elements[0],
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  );
}

/**
 * Initialize all GSAP-based reveal animations
 * Replaces the IntersectionObserver-based .reveal class
 */
export function initScrollReveals(): void {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show all elements immediately without animation
    gsap.set('.reveal, .gsap-reveal', { opacity: 1, y: 0, filter: 'blur(0px)' });
    return;
  }

  // Convert all .reveal elements to GSAP-based animations
  gsap.utils.toArray<Element>('.gsap-reveal').forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Blur fade up animations
  gsap.utils.toArray<Element>('.blur-fade-up').forEach((element, index) => {
    const delay = element.getAttribute('data-delay') || index * 0.1;

    gsap.fromTo(
      element,
      animationPresets.blurFadeUp.from,
      {
        ...animationPresets.blurFadeUp.to,
        delay: Number(delay),
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/**
 * Create a horizontal scroll section with ScrollTrigger
 */
export function createHorizontalScroll(
  container: string | Element,
  track: string | Element,
  options: Partial<ScrollTrigger.Vars> = {}
): gsap.core.Tween {
  const trackElement = typeof track === 'string' ? document.querySelector(track) : track;

  if (!trackElement) {
    console.warn('Horizontal scroll track not found');
    return gsap.to({}, {});
  }

  const scrollWidth = (trackElement as HTMLElement).scrollWidth - window.innerWidth;

  return gsap.to(track, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${scrollWidth}`,
      invalidateOnRefresh: true,
      ...options,
    },
  });
}

/**
 * Export GSAP and ScrollTrigger for direct use
 */
export { gsap, ScrollTrigger };
