import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Zap, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'WORK', href: '#work' },
  { name: 'CERTIFICATES', href: '#certificates' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROCESS', href: '#process' },
  { name: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mode, toggleMode, isTransitioning } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? isCyber
              ? 'backdrop-blur-xl border-b py-4 shadow-lg'
              : 'bg-[#F3F0E8]/90 backdrop-blur-md border-b border-[#D7D1C6] py-4 shadow-sm'
            : 'bg-transparent py-6 md:py-8'
        }`}
        style={isScrolled && isCyber ? {
          background: 'rgba(8, 11, 20, 0.85)',
          borderColor: 'rgba(0, 229, 255, 0.15)',
          boxShadow: '0 4px 30px rgba(0, 229, 255, 0.05)',
        } : undefined}
      >
        <div className="editorial-container flex items-center justify-between">
          {/* Brand */}
          <a href="#hero" className="group flex flex-col items-start focus:outline-none">
            <span
              className="font-display font-bold text-lg md:text-xl tracking-tight transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {isCyber ? (
                <span style={{ color: 'var(--accent-primary)' }} className="cyber-text-glow">
                  VIVEK<span style={{ color: 'var(--accent-secondary, #F59E0B)' }}>_</span>SHARMA
                </span>
              ) : (
                <span className="group-hover:text-[#C85C3B] transition-colors text-[#111111]">VIVEK SHARMA</span>
              )}
            </span>
            <span
              className="font-helix text-[10px] tracking-wider uppercase hidden sm:inline-block"
              style={{ color: 'var(--text-muted)' }}
            >
              {isCyber ? '// FRONTEND.ENG · AI.BUILDER' : 'Frontend Engineer · AI Builder'}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-helix font-semibold tracking-widest"
            style={{ color: 'var(--text-muted)' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover-editorial-line transition-colors uppercase font-helix"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {isCyber ? `/${link.name}` : link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* TI-CYBER MODE TOGGLE */}
            <motion.button
              onClick={toggleMode}
              disabled={isTransitioning}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded-sm overflow-hidden"
              style={{
                border: isCyber
                  ? '1px solid var(--border-subtle)'
                  : '1px solid rgba(17, 17, 17, 0.3)',
                background: isCyber
                  ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.08)'
                  : 'transparent',
                color: isCyber ? 'var(--accent-primary)' : '#706D66',
                boxShadow: isCyber ? '0 0 15px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.15)' : 'none',
                minWidth: '120px',
              }}
              aria-label="Toggle TI-CYBER mode"
            >
              {/* Animated shimmer in cyber mode */}
              {isCyber && (
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(var(--theme-primary-rgb, 0, 229, 255), 0.12), transparent)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <AnimatePresence mode="wait">
                {isCyber ? (
                  <motion.span
                    key="cyber"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-1.5 relative z-10"
                  >
                    <Zap size={11} className="shrink-0" style={{ color: 'var(--accent-primary)' }} />
                    TI-CYBER ON
                  </motion.span>
                ) : (
                  <motion.span
                    key="editorial"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-1.5 relative z-10"
                  >
                    <Sun size={11} className="shrink-0" />
                    TI-CYBER
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Dashboard / Login entry — always visible */}
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="font-helix font-semibold text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm flex items-center gap-1.5 transition-all group"
                style={{
                  background: isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.12)' : '#111111',
                  color: isCyber ? 'var(--accent-primary)' : '#F3F0E8',
                  border: isCyber ? '1px solid var(--border-subtle)' : '1px solid transparent',
                  boxShadow: isCyber ? '0 0 12px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.15)' : 'none',
                }}
              >
                <span>DASHBOARD</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="font-helix font-semibold text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm flex items-center gap-1.5 transition-all group"
                style={{
                  background: isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.08)' : 'transparent',
                  color: isCyber ? 'var(--accent-primary)' : 'var(--text-muted)',
                  border: isCyber ? '1px solid var(--border-subtle)' : '1px solid var(--border-subtle)',
                }}
              >
                <span>LOGIN</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}

            {/* LET'S TALK CTA — always visible */}
            <a
              href="#contact"
              className="font-helix font-bold text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm flex items-center gap-1.5 group transition-all"
              style={{
                border: `1px solid var(--text-primary)`,
                color: 'var(--text-primary)',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--text-primary)';
                (e.currentTarget as HTMLElement).style.color = 'var(--bg-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
            >
              LET'S TALK
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 focus:outline-none transition-colors"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-28 px-6 pb-12 flex flex-col justify-between lg:hidden"
            style={{
              background: isCyber ? 'rgba(8, 11, 20, 0.97)' : '#F3F0E8',
              backdropFilter: isCyber ? 'blur(24px)' : 'none',
            }}
          >
            {/* Cyber grid in mobile menu */}
            {isCyber && <div className="absolute inset-0 cyber-grid-overlay pointer-events-none" />}

            <div className="flex flex-col gap-6 relative z-10">
              <span
                className="font-mono text-xs uppercase tracking-widest border-b pb-2"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }}
              >
                {isCyber ? '// NAVIGATION_MATRIX' : 'Navigation'}
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                >
                  {isCyber ? `/${link.name}` : link.name}
                </a>
              ))}
            </div>

            <div className="border-t pt-6 flex flex-col gap-4 relative z-10" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex justify-between items-center text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                <span>BASED IN INDIA</span>
                <span>AVAILABLE 2026</span>
              </div>

              {/* Mobile TI-CYBER toggle */}
              <button
                onClick={() => { toggleMode(); setMobileMenuOpen(false); }}
                disabled={isTransitioning}
                className="w-full py-3 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm border transition-all"
                style={{
                  borderColor: isCyber ? 'var(--border-subtle)' : 'var(--border-subtle)',
                  color: isCyber ? 'var(--accent-primary)' : 'var(--text-muted)',
                  background: isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.08)' : 'transparent',
                }}
              >
                <Zap size={13} style={{ color: isCyber ? 'var(--accent-primary)' : 'inherit' }} />
                {isCyber ? 'EXIT TI-CYBER MODE' : 'ENTER TI-CYBER MODE'}
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 text-center font-helix font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm"
                style={{
                  background: 'var(--accent-primary)',
                  color: isCyber ? '#080B14' : '#F3F0E8',
                }}
              >
                LET'S TALK
                <ArrowUpRight size={16} />
              </a>

              {/* Mobile Dashboard / Login */}
              {user ? (
                <button
                  onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
                  className="w-full py-3 font-helix font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm border transition-all"
                  style={{
                    borderColor: isCyber ? 'var(--border-subtle)' : 'var(--border-subtle)',
                    color: isCyber ? 'var(--accent-primary)' : 'var(--text-muted)',
                    background: isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.08)' : 'transparent',
                  }}
                >
                  DASHBOARD
                  <ArrowUpRight size={13} />
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  className="w-full py-3 font-helix font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm border transition-all"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    color: isCyber ? 'var(--accent-primary)' : 'var(--text-muted)',
                    background: 'transparent',
                  }}
                >
                  LOGIN TO DASHBOARD
                  <ArrowUpRight size={13} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
