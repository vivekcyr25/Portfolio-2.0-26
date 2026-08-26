import { useEffect } from 'react';

/**
 * Hook to apply visible blur-in and kinetic stretch-pop animation to text & headings
 * across the site, with a snappy 0.5s unblur duration on scroll.
 */
export const useScrollTextStretch = () => {
  useEffect(() => {
    const textSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p',
      '.font-display',
      '.font-mono',
      '.font-helix',
      'span.font-mono',
      'span.font-display',
      'span.tracking-wider',
      'span.tracking-widest',
      'article',
      '.editorial-section p',
      '.editorial-section h2',
      '.editorial-section h3',
    ];

    const elements = document.querySelectorAll<HTMLElement>(textSelectors.join(', '));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add('kinetic-text-in');
            target.classList.remove('kinetic-text-ready');
          } else {
            // Re-arm when scrolled well out of view so re-scrolling triggers the 0.5s blur-pop
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight + 80 || rect.bottom < -80) {
              target.classList.remove('kinetic-text-in');
              target.classList.add('kinetic-text-ready');
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.08,
      }
    );

    elements.forEach((el) => {
      if (
        !el.closest('button') &&
        !el.closest('svg') &&
        !el.closest('input') &&
        !el.closest('textarea') &&
        !el.closest('nav')
      ) {
        const rect = el.getBoundingClientRect();
        // Immediately reveal elements already visible at top on initial mount
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('kinetic-text-in');
        } else {
          el.classList.add('kinetic-text-ready');
        }
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};
