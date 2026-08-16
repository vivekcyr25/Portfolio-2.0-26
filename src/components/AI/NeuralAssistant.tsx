import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Zap } from 'lucide-react';
import NeuralConsole from './NeuralConsole';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

const NeuralAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  // Close console on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Floating Mode-Aware Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full font-helix text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-xl ${
              isCyber
                ? 'border border-[rgba(0,229,255,0.45)] text-[#00E5FF] bg-[rgba(4,8,15,0.9)] backdrop-blur-md shadow-[0_0_25px_rgba(0,229,255,0.25)] hover:border-[#00E5FF] hover:bg-[rgba(0,229,255,0.12)]'
                : 'bg-[#111111] text-[#F3F0E8] border border-[#2A2A2A] hover:bg-[#C85C3B] hover:border-[#C85C3B]'
            }`}
            aria-label="Open Vivek AI Assistant"
          >
            {isCyber ? (
              <Terminal size={14} className="text-[#00E5FF] animate-pulse" />
            ) : (
              <Sparkles size={14} className="text-[#C85C3B] group-hover:text-white transition-colors" />
            )}
            <span className="font-bold tracking-widest">{isCyber ? 'NEURAL CORE AI' : 'ASK VIVEK AI'}</span>
            <span className={`text-[10px] ${isCyber ? 'text-[#00E5FF]/70' : 'opacity-60'}`}>↗</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main AI Assistant Dialog Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className={`absolute inset-0 backdrop-blur-md transition-colors ${
                isCyber ? 'bg-[#020612]/80' : 'bg-[#111111]/70'
              }`}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full max-w-2xl h-[78vh] max-h-[680px] rounded-md shadow-2xl relative z-10 flex flex-col overflow-hidden transition-all ${
                isCyber
                  ? 'bg-[rgba(4,8,15,0.96)] border border-[rgba(0,229,255,0.35)] shadow-[0_0_50px_rgba(0,229,255,0.2)]'
                  : 'bg-[#FAF8F4] border border-[#D7D1C6]'
              }`}
            >
              <NeuralConsole onClose={() => setIsOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NeuralAssistant;
