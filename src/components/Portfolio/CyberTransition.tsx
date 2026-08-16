import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

/**
 * CyberTransition — full-screen overlay animation that plays when
 * switching between Editorial and TI-CYBER modes.
 *
 * Phase 1: Scan-line sweeps top→bottom
 * Phase 2: Glitch flicker + binary rain
 * Phase 3: Overlay dissolves to reveal new theme
 */
export const CyberTransition: React.FC = () => {
  const { isTransitioning, mode } = usePortfolioMode();
  const isToCyber = mode === 'cyber';

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          {/* Base overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: isToCyber
                ? 'linear-gradient(180deg, #080B14 0%, #00E5FF08 50%, #080B14 100%)'
                : 'linear-gradient(180deg, #F3F0E8 0%, #C85C3B08 50%, #F3F0E8 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.6, 0.95, 0.4] }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          {/* Primary scan line */}
          <motion.div
            className="absolute inset-x-0 h-1"
            style={{
              background: isToCyber
                ? 'linear-gradient(90deg, transparent 0%, #00E5FF 20%, #FFFFFF 50%, #00E5FF 80%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, #C85C3B 20%, #FFFFFF 50%, #C85C3B 80%, transparent 100%)',
              boxShadow: isToCyber
                ? '0 0 30px 8px rgba(0, 229, 255, 0.8), 0 0 60px 20px rgba(0, 229, 255, 0.3)'
                : '0 0 30px 8px rgba(200, 92, 59, 0.8), 0 0 60px 20px rgba(200, 92, 59, 0.3)',
            }}
            initial={{ top: '-4px' }}
            animate={{ top: '105%' }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Secondary trailing scan line */}
          <motion.div
            className="absolute inset-x-0 h-px opacity-60"
            style={{
              background: isToCyber
                ? 'linear-gradient(90deg, transparent, #00E5FF, transparent)'
                : 'linear-gradient(90deg, transparent, #C85C3B, transparent)',
            }}
            initial={{ top: '-2px' }}
            animate={{ top: '108%' }}
            transition={{ duration: 1.0, delay: 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Horizontal glitch bars */}
          {[0.2, 0.4, 0.6, 0.75].map((frac, i) => (
            <motion.div
              key={i}
              className="absolute inset-x-0 h-px"
              style={{
                top: `${frac * 100}%`,
                background: isToCyber
                  ? 'rgba(0, 229, 255, 0.3)'
                  : 'rgba(200, 92, 59, 0.3)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 0.6, 1, 0],
                opacity: [0, 0.8, 0.3, 0.8, 0],
              }}
              transition={{
                duration: 0.4,
                delay: 0.3 + i * 0.12,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Mode label flash */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.95] }}
            transition={{ duration: 1.2, delay: 0.2, times: [0, 0.2, 0.7, 1] }}
          >
            <div className="text-center px-8 py-6 border" style={{
              borderColor: isToCyber ? 'rgba(0, 229, 255, 0.4)' : 'rgba(200, 92, 59, 0.4)',
              background: isToCyber ? 'rgba(8, 11, 20, 0.85)' : 'rgba(243, 240, 232, 0.85)',
              backdropFilter: 'blur(12px)',
            }}>
              <motion.p
                className="font-mono text-xs tracking-[0.4em] uppercase mb-2"
                style={{ color: isToCyber ? '#00E5FF80' : '#C85C3B80' }}
                animate={{ opacity: [0.5, 1, 0.5, 1] }}
                transition={{ duration: 0.3, repeat: 3 }}
              >
                {isToCyber ? '// ACTIVATING' : '// DEACTIVATING'}
              </motion.p>
              <p
                className="font-mono font-bold tracking-[0.3em] uppercase"
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                  color: isToCyber ? '#00E5FF' : '#C85C3B',
                  textShadow: isToCyber
                    ? '0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.4)'
                    : '0 0 20px rgba(200, 92, 59, 0.6)',
                }}
              >
                {isToCyber ? 'TI-CYBER MODE' : 'EDITORIAL MODE'}
              </p>
              <motion.div
                className="mt-3 h-px w-full"
                style={{
                  background: isToCyber
                    ? 'linear-gradient(90deg, transparent, #00E5FF, transparent)'
                    : 'linear-gradient(90deg, transparent, #C85C3B, transparent)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
          </motion.div>

          {/* Corner brackets */}
          {[
            { top: '8px', left: '8px', rotate: '0deg' },
            { top: '8px', right: '8px', rotate: '90deg' },
            { bottom: '8px', left: '8px', rotate: '270deg' },
            { bottom: '8px', right: '8px', rotate: '180deg' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8"
              style={{
                ...pos,
                borderTop: `2px solid ${isToCyber ? '#00E5FF' : '#C85C3B'}`,
                borderLeft: `2px solid ${isToCyber ? '#00E5FF' : '#C85C3B'}`,
                transform: `rotate(${pos.rotate})`,
                opacity: 0,
              }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
