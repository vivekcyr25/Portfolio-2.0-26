import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  User
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, db } from '../lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  userData: any | null;
  loading: boolean;
  hasIdentity: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginAsGuest: (displayName?: string, email?: string) => Promise<void>;
  loginWithArchitectKey: (key: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshIdentity: () => Promise<void>;
  showToast: (message: string, type?: 'error' | 'success') => void;
}

const GUEST_STORAGE_KEY = 'neural_guest_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasIdentity, setHasIdentity] = useState(false);
  
  const [toast, setToast] = useState<{message: string, type: 'error' | 'success'} | null>(null);

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => {
    // Check for existing guest session first
    const savedGuest = localStorage.getItem(GUEST_STORAGE_KEY);
    if (savedGuest) {
      try {
        const parsed = JSON.parse(savedGuest);
        setUser(parsed as any);
        setUserData({
          uid: parsed.uid,
          email: parsed.email,
          displayName: parsed.displayName,
          photoURL: parsed.photoURL || '',
          hasIdentity: true
        });
        setHasIdentity(true);
        setLoading(false);
      } catch (e) {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        localStorage.removeItem(GUEST_STORAGE_KEY);
        setUser(currentUser);
        await syncUserToFirestore(currentUser);
      } else {
        const currentSavedGuest = localStorage.getItem(GUEST_STORAGE_KEY);
        if (currentSavedGuest) {
          try {
            const parsed = JSON.parse(currentSavedGuest);
            setUser(parsed as any);
            setUserData({ ...parsed, hasIdentity: true });
            setHasIdentity(true);
          } catch (e) {
            setUser(null);
            setUserData(null);
            setHasIdentity(false);
          }
        } else {
          setUser(null);
          setUserData(null);
          setHasIdentity(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const syncUserToFirestore = async (currentUser: User) => {
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const initialData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || 'ANONYMOUS',
          photoURL: currentUser.photoURL || '',
          createdAt: serverTimestamp(),
          hasIdentity: true
        };
        await setDoc(userRef, initialData);
        setUserData(initialData);
        setHasIdentity(true);
      } else {
        const data = userSnap.data();
        await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
        setUserData(data);
        setHasIdentity(data.hasIdentity !== false);
      }
    } catch (error: any) {
      console.warn("Firestore sync notice (continuing in local mode):", error);
      setUserData({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || 'ANONYMOUS',
        photoURL: currentUser.photoURL || '',
        hasIdentity: true
      });
      setHasIdentity(true);
    }
  };

  const refreshIdentity = async () => {
    if (user) {
      try {
        if (user.uid?.startsWith('guest_')) {
          setHasIdentity(true);
          return;
        }
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          setHasIdentity(!!data.hasIdentity);
        }
      } catch (error: any) {
        console.warn('Identity refresh fallback');
        setHasIdentity(true);
      }
    }
  };

  const loginAsGuest = async (displayName: string = 'GUEST ARCHITECT', email: string = 'architect@neural-os.io') => {
    const guestUser: any = {
      uid: 'guest_architect_' + Math.random().toString(36).slice(2, 9),
      displayName: displayName.toUpperCase(),
      email,
      photoURL: '',
      isAnonymous: true,
      providerData: [{ providerId: 'guest.access' }]
    };
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestUser));
    setUser(guestUser);
    setUserData({
      uid: guestUser.uid,
      email: guestUser.email,
      displayName: guestUser.displayName,
      photoURL: '',
      hasIdentity: true
    });
    setHasIdentity(true);
    setLoading(false);
    showToast('ARCHITECT ACCESS GRANTED: Session Initialized', 'success');
  };

  const loginWithArchitectKey = async (key: string): Promise<boolean> => {
    const cleanKey = key.trim().toUpperCase();
    if (!cleanKey) return false;
    await loginAsGuest(`ARCHITECT [${cleanKey}]`, `${cleanKey.toLowerCase()}@neural-os.io`);
    return true;
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      showToast('OAUTH SUCCESS: Handshake accepted', 'success');
    } catch (error: any) {
      console.warn('OAuth Google notice:', error);
      showToast('OAUTH FAILED: ' + (error.message || 'Connecting in Guest Mode'), 'error');
      throw error;
    }
  };

  const loginWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      showToast('OAUTH SUCCESS: Handshake accepted', 'success');
    } catch (error: any) {
      console.warn('OAuth Github notice:', error);
      showToast('OAUTH FAILED: ' + (error.message || 'Connecting in Guest Mode'), 'error');
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem(GUEST_STORAGE_KEY);
    try {
      await signOut(auth);
    } catch (error: any) {
      console.warn('Sign out notice:', error);
    }
    setUser(null);
    setUserData(null);
    setHasIdentity(false);
    showToast('SESSION TERMINATED', 'success');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      loading, 
      hasIdentity, 
      loginWithGoogle, 
      loginWithGithub,
      loginAsGuest,
      loginWithArchitectKey,
      logout,
      refreshIdentity,
      showToast
    }}>
      {children}
      
      {/* Cinematic Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-[9999] px-6 py-4 rounded-xl border flex items-center gap-4 backdrop-blur-xl shadow-2xl ${
              toast.type === 'error' 
                ? 'bg-theme-accent/10 border-theme-accent/50 text-theme-accent shadow-[0_0_30px_rgba(var(--theme-accent-rgb),0.3)]' 
                : 'bg-theme-secondary/10 border-theme-secondary/50 text-theme-secondary shadow-[0_0_30px_rgba(var(--theme-secondary-rgb),0.3)]'
            }`}
          >
            {toast.type === 'error' ? <ShieldAlert size={20} className="animate-pulse" /> : <CheckCircle size={20} />}
            <div>
              <p className="font-orbitron font-bold text-[10px] tracking-widest uppercase">
                {toast.type === 'error' ? 'SYSTEM_ALERT' : 'SYSTEM_NOTICE'}
              </p>
              <p className="font-space-mono text-[10px] tracking-wider opacity-80 mt-1">
                {toast.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
