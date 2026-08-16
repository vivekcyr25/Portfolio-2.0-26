import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface UserProfile {
  codename: string;
  displayName: string;
  photoURL?: string;
  timezone: string;
  language: string;
  notificationsEnabled: boolean;
}

export const defaultProfile: UserProfile = {
  codename: 'UNASSIGNED',
  displayName: 'ANONYMOUS',
  photoURL: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  language: 'EN-US',
  notificationsEnabled: true
};

export const getUserProfile = async (uid: string): Promise<UserProfile> => {
  if (!uid) return defaultProfile;
  
  if (uid.startsWith('guest_')) {
    const cached = localStorage.getItem(`profile_${uid}`);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return defaultProfile;
  }

  try {
    const profileRef = doc(db, 'users', uid, 'profile', 'data');
    const snap = await getDoc(profileRef);
    
    if (snap.exists()) {
      return snap.data() as UserProfile;
    } else {
      await setDoc(profileRef, defaultProfile);
      return defaultProfile;
    }
  } catch (error) {
    console.warn("Firestore getUserProfile fallback:", error);
    const cached = localStorage.getItem(`profile_${uid}`);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return defaultProfile;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  if (!uid) return;
  
  try {
    const cached = localStorage.getItem(`profile_${uid}`);
    const current = cached ? JSON.parse(cached) : defaultProfile;
    localStorage.setItem(`profile_${uid}`, JSON.stringify({ ...current, ...updates }));
  } catch (e) {}

  if (!uid.startsWith('guest_')) {
    try {
      const profileRef = doc(db, 'users', uid, 'profile', 'data');
      await updateDoc(profileRef, updates);
    } catch (e) {
      console.warn("Firestore updateUserProfile fallback:", e);
    }
  }
};
