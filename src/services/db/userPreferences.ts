import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface SystemPreferences {
  theme: string;
  aiMode: string;
  glowIntensity: number;
  telemetryDensity: number;
  audioEnabled: boolean;
  responseLength: string;
  cinematicMode: boolean;
  masterVolume: number;
  hoverSound: boolean;
  startupSound: boolean;
  typingSound: boolean;
  cognitionDepth: string;
  realtimeProcessing: boolean;
  motionEnabled: boolean;
  transparencyEnabled: boolean;
}

export const defaultPreferences: SystemPreferences = {
  theme: 'CYAN_CORE',
  aiMode: 'GEMINI_1.5_PRO',
  glowIntensity: 50,
  telemetryDensity: 80,
  audioEnabled: true,
  responseLength: 'DYNAMIC',
  cinematicMode: true,
  masterVolume: 70,
  hoverSound: true,
  startupSound: true,
  typingSound: true,
  cognitionDepth: 'DEEP',
  realtimeProcessing: true,
  motionEnabled: true,
  transparencyEnabled: true
};

export const getUserPreferences = async (uid: string): Promise<SystemPreferences> => {
  if (!uid) return defaultPreferences;

  if (uid.startsWith('guest_')) {
    const cached = localStorage.getItem(`prefs_${uid}`);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return defaultPreferences;
  }

  try {
    const prefRef = doc(db, 'users', uid, 'preferences', 'system');
    const snap = await getDoc(prefRef);
    
    if (snap.exists()) {
      return snap.data() as SystemPreferences;
    } else {
      // Initialize default preferences
      await setDoc(prefRef, defaultPreferences);
      return defaultPreferences;
    }
  } catch (error) {
    console.warn("Firestore getUserPreferences fallback:", error);
    const cached = localStorage.getItem(`prefs_${uid}`);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return defaultPreferences;
  }
};

export const updateUserPreferences = async (uid: string, updates: Partial<SystemPreferences>) => {
  if (!uid) return;

  try {
    const cached = localStorage.getItem(`prefs_${uid}`);
    const current = cached ? JSON.parse(cached) : defaultPreferences;
    localStorage.setItem(`prefs_${uid}`, JSON.stringify({ ...current, ...updates }));
  } catch (e) {}

  if (!uid.startsWith('guest_')) {
    try {
      const prefRef = doc(db, 'users', uid, 'preferences', 'system');
      await updateDoc(prefRef, updates);
    } catch (e) {
      console.warn("Firestore updateUserPreferences fallback:", e);
    }
  }
};
