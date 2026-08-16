import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface PortfolioData {
  id?: string;
  userId: string;
  name: string;
  theme: string;
  heroTitle: string;
  heroSub: string;
  aboutText: string;
  createdAt: any;
  updatedAt: any;
}

const DEFAULT_DEMO_PORTFOLIOS: PortfolioData[] = [
  {
    id: 'node_alpha_01',
    userId: 'demo',
    name: 'NEURAL_UNIT_ALPHA',
    theme: 'MASTER_OS',
    heroTitle: 'Frontend & AI Systems Architect',
    heroSub: 'Autonomous Agent Interface',
    aboutText: 'Specialized in high-performance web applications and neural interfaces.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'node_beta_02',
    userId: 'demo',
    name: 'SPACE_ODYSSEY_3D',
    theme: 'SPACE_CYBER',
    heroTitle: '3D Spatial Computing',
    heroSub: 'Three.js & WebGL Engine',
    aboutText: 'Interactive 3D cosmic explorer and celestial asset visualizer.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const getUserPortfolios = async (userId: string): Promise<PortfolioData[]> => {
  if (!userId || userId.startsWith('guest_')) {
    const cached = localStorage.getItem(`portfolios_${userId}`);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return DEFAULT_DEMO_PORTFOLIOS;
  }

  try {
    const q = query(collection(db, 'portfolios'), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioData));
    return list.length > 0 ? list : DEFAULT_DEMO_PORTFOLIOS;
  } catch (error) {
    console.warn("Firestore getUserPortfolios fallback:", error);
    const cached = localStorage.getItem(`portfolios_${userId}`);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return DEFAULT_DEMO_PORTFOLIOS;
  }
};

export const createPortfolio = async (userId: string, data: Partial<PortfolioData>) => {
  const newPortfolio: PortfolioData = {
    id: 'node_' + Math.random().toString(36).slice(2, 9),
    userId,
    name: data.name || 'New Portfolio',
    theme: data.theme || 'cyberpunk',
    heroTitle: data.heroTitle || 'AI Systems Architect',
    heroSub: data.heroSub || 'Neural OS Environment',
    aboutText: data.aboutText || 'Autonomous agent interface...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const cached = localStorage.getItem(`portfolios_${userId}`);
    const currentList: PortfolioData[] = cached ? JSON.parse(cached) : [...DEFAULT_DEMO_PORTFOLIOS];
    currentList.unshift(newPortfolio);
    localStorage.setItem(`portfolios_${userId}`, JSON.stringify(currentList));
  } catch (e) {}

  if (!userId.startsWith('guest_')) {
    try {
      const docRef = await addDoc(collection(db, 'portfolios'), {
        ...newPortfolio,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (e) {
      console.warn("Firestore createPortfolio fallback:", e);
    }
  }
  return newPortfolio.id;
};

export const updatePortfolio = async (portfolioId: string, data: Partial<PortfolioData>) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('portfolios_')) {
      try {
        const list: PortfolioData[] = JSON.parse(localStorage.getItem(key) || '[]');
        const updated = list.map(p => p.id === portfolioId ? { ...p, ...data, updatedAt: new Date().toISOString() } : p);
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {}
    }
  }

  try {
    const docRef = doc(db, 'portfolios', portfolioId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.warn("Firestore updatePortfolio fallback:", error);
  }
};

export const deletePortfolio = async (portfolioId: string) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('portfolios_')) {
      try {
        const list: PortfolioData[] = JSON.parse(localStorage.getItem(key) || '[]');
        const filtered = list.filter(p => p.id !== portfolioId);
        localStorage.setItem(key, JSON.stringify(filtered));
      } catch (e) {}
    }
  }

  try {
    const docRef = doc(db, 'portfolios', portfolioId);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn("Firestore deletePortfolio fallback:", error);
  }
};

export const getPortfolioById = async (id: string) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('portfolios_')) {
      try {
        const list: PortfolioData[] = JSON.parse(localStorage.getItem(key) || '[]');
        const match = list.find(p => p.id === id);
        if (match) return match;
      } catch (e) {}
    }
  }
  const demoMatch = DEFAULT_DEMO_PORTFOLIOS.find(p => p.id === id);
  if (demoMatch) return demoMatch;

  try {
    const docRef = doc(db, 'portfolios', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PortfolioData;
    }
  } catch (error) {
    console.warn("Firestore getPortfolioById fallback:", error);
  }
  return null;
};

export const duplicatePortfolio = async (userId: string, portfolio: PortfolioData) => {
  const { id, createdAt, updatedAt, ...rest } = portfolio;
  return await createPortfolio(userId, {
    ...rest,
    name: `${rest.name}_CLONE`
  });
};
