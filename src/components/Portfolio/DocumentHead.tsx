import React, { useEffect } from 'react';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

/**
 * DocumentHead — manages <head> content dynamically from React.
 * Handles: Google Fonts loading (Barlow Condensed, Helix/Plus Jakarta Sans, IBM Plex Mono, Inter),
 * meta theme-color, favicon color, document title.
 */
export const DocumentHead: React.FC = () => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  // ── Google Fonts: inject once ─────────────────────────────────────
  useEffect(() => {
    const FONT_ID = 'galgo-condensed-fonts';
    if (document.getElementById(FONT_ID)) return;

    // Preconnect
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach((href, i) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      if (i === 1) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Font stylesheet:
    // - Barlow Condensed (Display / Galgo Condensed style)
    // - Plus Jakarta Sans & Space Grotesk (Helix Neo-Grotesque style for small headings & nav)
    // - IBM Plex Mono (code/mono labels)
    // - Inter (body copy)
    const fontLink = document.createElement('link');
    fontLink.id = FONT_ID;
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Caveat:wght@600;700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap';
    document.head.appendChild(fontLink);
  }, []);

  // ── Dynamic meta theme-color ──────────────────────────────────────
  useEffect(() => {
    let metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = isCyber ? '#080B14' : '#F3F0E8';
  }, [isCyber]);

  // ── Dynamic favicon color ─────────────────────────────────────────
  useEffect(() => {
    let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/svg+xml';
      document.head.appendChild(favicon);
    }
    const fg = isCyber
      ? (getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#00E5FF')
      : '#C85C3B';
    const bg = isCyber ? '#080B14' : '#F3F0E8';
    favicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='${encodeURIComponent(bg)}'/><text y='.9em' font-size='72' font-family='sans-serif' font-weight='bold' fill='${encodeURIComponent(fg)}'>VS</text></svg>`;
  }, [isCyber]);

  // ── Document title ────────────────────────────────────────────────
  useEffect(() => {
    document.title = isCyber
      ? 'VIVEK_SHARMA // TI-CYBER — Frontend Engineer & AI Builder'
      : 'Vivek Sharma — Frontend Engineer & AI Builder';
  }, [isCyber]);

  // ── Body background sync ──────────────────────────────────────────
  useEffect(() => {
    document.body.style.backgroundColor = isCyber ? '#080B14' : '#F3F0E8';
    document.body.style.color = isCyber ? '#E8F4FF' : '#111111';
  }, [isCyber]);

  return null;
};
