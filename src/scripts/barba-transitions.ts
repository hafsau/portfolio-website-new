/**
 * Barba.js Page Transitions with GSAP
 * Smooth, fluid transitions between pages
 */

import barba from '@barba/core';
import gsap from 'gsap';

// Transition overlay element
let overlay: HTMLElement | null = null;

// Create transition overlay with curved SVG
function createOverlay() {
  if (document.getElementById('page-transition-overlay')) return;

  overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';
  // Ensure it starts hidden
  overlay.style.display = 'none';
  overlay.style.visibility = 'hidden';
  overlay.style.opacity = '0';
  overlay.innerHTML = `
    <div class="transition-curve">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,100 L0,10 Q50,0 100,10 L100,100 Z" />
      </svg>
    </div>
    <div class="transition-logo">HU</div>
  `;
  document.body.appendChild(overlay);
}

// Initialize Barba with GSAP transitions
export function initBarbaTransitions() {
  // Check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('Barba: Reduced motion preferred, using simple transitions');
  }

  createOverlay();
  overlay = document.getElementById('page-transition-overlay');

  barba.init({
    // Prevent Barba from handling /v2/ routes (those use Astro View Transitions)
    prevent: ({ el }) => {
      return el.href?.includes('/v2/') || el.href?.includes('/v2');
    },

    transitions: [
      {
        name: 'default-transition',

        // Before leave: Prepare for transition
        async beforeLeave() {
          // Disable scroll during transition
          document.body.style.overflow = 'hidden';
        },

        // Leave animation
        async leave(data) {
          const done = this.async();

          if (prefersReducedMotion) {
            // Simple fade for reduced motion
            gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.2,
              onComplete: done
            });
          } else {
            // Full transition animation with curve
            const tl = gsap.timeline({
              onComplete: done
            });

            // Animate curved overlay sliding up
            overlay?.classList.add('active');
            tl
              .to(overlay?.querySelector('.transition-curve'), {
                y: '-10%',
                duration: 0.8,
                ease: 'power3.inOut'
              })
              .to(overlay?.querySelector('.transition-logo'), {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
              }, '-=0.4')
              .to(data.current.container, {
                opacity: 0,
                y: -30,
                duration: 0.3,
                ease: 'power2.in'
              }, '-=0.3');
          }
        },

        // After leave: Clean up old page
        async afterLeave(data) {
          // Remove old container
          data.current.container.remove();

          // Scroll to top
          window.scrollTo(0, 0);
        },

        // Before enter: Prepare new page
        async beforeEnter(data) {
          // Set initial state for new container
          gsap.set(data.next.container, { opacity: 0, y: 30 });
        },

        // Enter animation
        async enter(data) {
          const done = this.async();

          if (prefersReducedMotion) {
            // Simple fade for reduced motion
            gsap.to(data.next.container, {
              opacity: 1,
              duration: 0.2,
              onComplete: done
            });
          } else {
            const tl = gsap.timeline({
              onComplete: done
            });

            // Animate curved overlay sliding up and out
            tl.to(overlay?.querySelector('.transition-logo'), {
              opacity: 0,
              scale: 0.8,
              duration: 0.2,
              ease: 'power2.in'
            })
            .to(overlay?.querySelector('.transition-curve'), {
              y: '-120%',
              duration: 0.8,
              ease: 'power3.inOut'
            })
            .call(() => {
              overlay?.classList.remove('active');
              if (overlay) {
                overlay.style.display = 'none';
                overlay.style.visibility = 'hidden';
                overlay.style.opacity = '0';
              }
            })
            .set(overlay?.querySelector('.transition-curve'), { y: '100%' })
            .to(data.next.container, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            }, '-=0.4');
          }
        },

        // After enter: Re-initialize page scripts
        async afterEnter() {
          // Re-enable scroll
          document.body.style.overflow = '';

          // Trigger custom event for re-initialization
          window.dispatchEvent(new CustomEvent('barba:afterEnter'));
        }
      },

      // Special transition for project pages
      {
        name: 'project-transition',
        to: { namespace: ['work'] },

        async leave(data) {
          const done = this.async();

          if (prefersReducedMotion) {
            gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.2,
              onComplete: done
            });
            return;
          }

          const tl = gsap.timeline({ onComplete: done });

          // Curved overlay slides up
          overlay?.classList.add('active');
          tl.to(overlay?.querySelector('.transition-curve'), {
              y: '-10%',
              duration: 0.7,
              ease: 'power3.inOut'
            })
            .to(data.current.container, {
              opacity: 0,
              y: -30,
              duration: 0.3,
              ease: 'power2.in'
            }, '-=0.3');
        },

        async enter(data) {
          const done = this.async();

          gsap.set(data.next.container, { opacity: 0, y: 30 });

          if (prefersReducedMotion) {
            gsap.to(data.next.container, {
              opacity: 1,
              y: 0,
              duration: 0.2,
              onComplete: done
            });
            return;
          }

          const tl = gsap.timeline({ onComplete: done });

          // Curved overlay slides up and out
          tl.to(overlay?.querySelector('.transition-curve'), {
            y: '-120%',
            duration: 0.7,
            ease: 'power3.inOut'
          })
          .call(() => {
            overlay?.classList.remove('active');
            if (overlay) {
              overlay.style.display = 'none';
              overlay.style.visibility = 'hidden';
              overlay.style.opacity = '0';
            }
          })
          .set(overlay?.querySelector('.transition-curve'), { y: '100%' })
          .to(data.next.container, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          }, '-=0.3');
        }
      }
    ]
  });

  console.log('Barba.js initialized with GSAP transitions');
}

// Reinitialize page-specific scripts after transition
export function setupBarbaHooks(callbacks: {
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  window.addEventListener('barba:afterEnter', () => {
    callbacks.onEnter?.();
  });
}
