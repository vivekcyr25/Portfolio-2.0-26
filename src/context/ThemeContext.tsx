import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SystemPreferences, defaultPreferences } from '../services/db/userPreferences';
import { MotionConfig } from 'framer-motion';

// Theme map defined outside component — never recreated
export const THEME_MAP: Record<string, {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  border: string;
}> = {
  'CYAN_CORE': {
    name: 'Cyan Core',
    primary: '#00E5FF',
    secondary: '#8B5CF6',
    accent: '#FF3D8B',
    bg: '#04080F',
    surface: '#08101E',
    text: '#E8F4FF',
    border: 'rgba(0, 229, 255, 0.2)'
  },
  'EMERALD_MATRIX': {
    name: 'Emerald Matrix',
    primary: '#00FF9D',
    secondary: '#00E5FF',
    accent: '#FBBF24',
    bg: '#020C08',
    surface: '#051810',
    text: '#E0FFF0',
    border: 'rgba(0, 255, 157, 0.2)'
  },
  'MAGENTA_SYNTH': {
    name: 'Magenta Synth',
    primary: '#FF006E',
    secondary: '#8B5CF6',
    accent: '#00E5FF',
    bg: '#0C0308',
    surface: '#180610',
    text: '#FFF0F5',
    border: 'rgba(255, 0, 110, 0.2)'
  },
  'VIOLET_NEURAL': {
    name: 'Violet Neural',
    primary: '#9D00FF',
    secondary: '#FF006E',
    accent: '#00FF9D',
    bg: '#08030F',
    surface: '#120620',
    text: '#F5F0FF',
    border: 'rgba(157, 0, 255, 0.2)'
  },
  'SILVER_GLASS': {
    name: 'Silver Glass',
    primary: '#E2E8F0',
    secondary: '#00E5FF',
    accent: '#8B5CF6',
    bg: '#0B1020',
    surface: '#141D32',
    text: '#FFFFFF',
    border: 'rgba(226, 232, 240, 0.2)'
  }
};

function applyThemeVars(prefs: SystemPreferences) {
  const root = document.documentElement;
  const t = THEME_MAP[prefs.theme] ?? THEME_MAP['CYAN_CORE'];

  // Helper to convert hex to RGB for dynamic opacity
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.slice(0, 2), 16) || 0;
    const g = parseInt(cleanHex.slice(2, 4), 16) || 0;
    const b = parseInt(cleanHex.slice(4, 6), 16) || 0;
    return `${r}, ${g}, ${b}`;
  };

  const primaryRgb = hexToRgb(t.primary);
  const secondaryRgb = hexToRgb(t.secondary);
  const accentRgb = hexToRgb(t.accent);

  // Always set --theme-* variables so [data-mode="cyber"] CSS can pick them up dynamically
  root.style.setProperty('--theme-primary', t.primary);
  root.style.setProperty('--theme-secondary', t.secondary);
  root.style.setProperty('--theme-accent', t.accent);
  root.style.setProperty('--theme-bg', t.bg);
  root.style.setProperty('--theme-text', t.text);
  root.style.setProperty('--theme-border', t.border);
  root.style.setProperty('--theme-primary-rgb', primaryRgb);
  root.style.setProperty('--theme-secondary-rgb', secondaryRgb);
  root.style.setProperty('--theme-accent-rgb', accentRgb);

  // Clean up any inline overrides so tokens.css controls editorial vs cyber mode naturally
  root.style.removeProperty('--accent-primary');
  root.style.removeProperty('--accent-terracotta');
  root.style.removeProperty('--accent-primary-hover');
  root.style.removeProperty('--accent-terracotta-hover');
  root.style.removeProperty('--border-subtle');
  root.style.removeProperty('--glow-primary');
  root.style.removeProperty('--glow-accent');

  // Glow intensity
  const g = prefs.glowIntensity / 100;
  root.style.setProperty('--glow-opacity', (g * 0.5).toString());
  root.style.setProperty('--glow-blur', `${g * 30}px`);
  root.style.setProperty('--glow-spread', `${g * 10}px`);

  // Glass
  if (prefs.transparencyEnabled) {
    root.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.4)');
    root.style.setProperty('--glass-blur', '24px');
    root.style.setProperty('--glass-border', `rgba(${primaryRgb}, 0.15)`);
  } else {
    root.style.setProperty('--glass-bg', `${t.bg}F0`);
    root.style.setProperty('--glass-blur', '0px');
    root.style.setProperty('--glass-border', `rgba(${primaryRgb}, 0.08)`);
  }
}

interface ThemeContextType {
  prefs: SystemPreferences;
  applyLocalPref: (field: keyof SystemPreferences, value: any) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [prefs, setPrefs] = useState<SystemPreferences>(() => {
    const saved = localStorage.getItem('os-system-prefs');
    const p = saved ? (JSON.parse(saved) as SystemPreferences) : defaultPreferences;
    // Apply immediately before first paint
    applyThemeVars(p);
    return p;
  });

  // Subscribe to Firestore live updates
  useEffect(() => {
    if (!user) return;

    const prefRef = doc(db, 'users', user.uid, 'preferences', 'system');
    const unsub = onSnapshot(prefRef, (snap) => {
      if (snap.exists()) {
        const newPrefs = { ...defaultPreferences, ...(snap.data() as SystemPreferences) };
        setPrefs(newPrefs);
        localStorage.setItem('os-system-prefs', JSON.stringify(newPrefs));
        applyThemeVars(newPrefs);
      }
    }, (err) => {
      console.warn("NEURAL_SYNC_OFFLINE: Handshake restricted by firewall.", err.message);
    });

    return () => unsub();
  }, [user]);

  // Allow Config.tsx to apply local changes optimistically (before Firestore write)
  const applyLocalPref = useCallback((field: keyof SystemPreferences, value: any) => {
    setPrefs(prev => {
      const next = { ...prev, [field]: value };
      applyThemeVars(next);
      localStorage.setItem('os-system-prefs', JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ prefs, applyLocalPref }}>
      <MotionConfig transition={{ duration: prefs.motionEnabled ? undefined : 0 }}>
        {children}
      </MotionConfig>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
