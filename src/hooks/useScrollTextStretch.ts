import { useEffect } from 'react';

/**
 * Hook to apply dynamic pop & stretch-up animation to text strings
 * when scrolling down into the viewport.
 */
export const useScrollTextStretch = () => {
  useEffect(() => {
    // Target text elements across the page
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

    const elements = document.querySelectorAll(textSelectors.join(', '));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-pop-in');
            entry.target.classList.remove('scroll-pop-ready');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => {
      // Avoid breaking layout for flex inline or buttons/icons
      if (!el.classList.contains('scroll-pop-in') && !el.closest('button') && !el.closest('svg')) {
        el.classList.add('scroll-pop-ready');
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};
