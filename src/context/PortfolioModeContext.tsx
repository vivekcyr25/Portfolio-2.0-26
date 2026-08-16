import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type PortfolioMode = 'editorial' | 'cyber';

interface PortfolioModeContextType {
  mode: PortfolioMode;
  isTransitioning: boolean;
  toggleMode: () => void;
}

const PortfolioModeContext = createContext<PortfolioModeContextType | undefined>(undefined);

export const PortfolioModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PortfolioMode>(() => {
    try {
      const saved = localStorage.getItem('portfolio-mode');
      return (saved === 'cyber' ? 'cyber' : 'editorial') as PortfolioMode;
    } catch {
      return 'editorial';
    }
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply data-mode attribute on document root for CSS var swapping
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    document.body.setAttribute('data-mode', mode);
    localStorage.setItem('portfolio-mode', mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Delay actual mode swap to let transition overlay begin
    setTimeout(() => {
      setMode(prev => prev === 'editorial' ? 'cyber' : 'editorial');
    }, 400);
    // End transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  }, [isTransitioning]);

  return (
    <PortfolioModeContext.Provider value={{ mode, isTransitioning, toggleMode }}>
      {children}
    </PortfolioModeContext.Provider>
  );
};

export const usePortfolioMode = () => {
  const ctx = useContext(PortfolioModeContext);
  if (!ctx) {
    // Safe fallback if called outside provider
    return {
      mode: 'editorial' as PortfolioMode,
      isTransitioning: false,
      toggleMode: () => {},
    };
  }
  return ctx;
};
