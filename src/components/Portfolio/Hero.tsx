import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Sparkles, Terminal } from 'lucide-react';
import profilePhotoNobg from '../../assets/profile-photo-nobg.png';
import { usePortfolioMode } from '../../context/PortfolioModeContext';
import { ShaderCanvas } from './ShaderCanvas';

export const Hero: React.FC = () => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const lastClickTimeRef = useRef<number>(0);

  const handleFirstPortfolioRedirect = () => {
    window.open('https://vivekcyr25.github.io/First-Portfolio/', '_blank', 'noopener,noreferrer');
  };

  const handlePortfolioClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 450 && now - lastClickTimeRef.current > 0) {
      lastClickTimeRef.current = 0;
      handleFirstPortfolioRedirect();
    } else {
      lastClickTimeRef.current = now;
    }
  };

  // Animated telemetry numbers for Cyber Mode
  const [telemetry, setTelemetry] = useState({ ping: 14, cpu: 32, ram: 4.8 });
  useEffect(() => {
    if (!isCyber) return;
    const interval = setInterval(() => {
      setTelemetry({
        ping: Math.floor(10 + Math.random() * 8),
        cpu: Math.floor(28 + Math.random() * 15),
        ram: Number((4.6 + Math.random() * 0.4).toFixed(1)),
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isCyber]);

  return (
    <div id="hero" className="relative">
      {/* TI-CYBER global shader background */}
      {isCyber && <ShaderCanvas className="fixed inset-0 pointer-events-none opacity-40 z-0" />}

      {/* ══════════════════════════════════════════════════════════════════
          FRAME 1 (100vh): "HELLO, I'M VIVEK SHARMA"
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="min-h-screen flex flex-col justify-between pt-28 pb-12 border-b relative z-10 overflow-hidden"
        style={{
          background: 'var(--bg-primary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="editorial-container flex-1 flex flex-col justify-between">
          {/* Top metadata */}
          <div
            className="flex justify-between items-center py-2 border-b text-[11px] font-mono uppercase tracking-widest"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={13} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ color: 'var(--text-primary)' }} className="font-semibold">
                {isCyber ? '// SYS_ID: VIVEK_SHARMA' : 'FRONTEND ENGINEER & AI BUILDER'}
              </span>
            </div>
            <span>{isCyber ? 'TI-CYBER // 2026' : '2026 EDITION'}</span>
          </div>

          {/* Centerpiece: HELLO, I'M VIVEK SHARMA */}
          <div className="my-auto py-12 flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-sm sm:text-base tracking-[0.4em] uppercase mb-4 font-semibold"
              style={{ color: 'var(--accent-primary)' }}
            >
              {isCyber ? '// INITIALIZE_ENTITY' : "HELLO, I'M"}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black tracking-tight uppercase leading-[0.88] text-center"
              style={{
                fontSize: 'clamp(3.8rem, 13vw, 11rem)',
                color: 'var(--text-primary)',
              }}
            >
              VIVEK{' '}
              <br />
              <span style={{ color: isCyber ? 'var(--accent-primary)' : 'var(--text-muted)' }} className={isCyber ? 'cyber-text-glow' : ''}>
                SHARMA
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mt-6"
              style={{ color: 'var(--text-muted)' }}
            >
              {isCyber
                ? '[ PROTOCOL: NEURAL_ENGINEER & INTERFACE_ARCHITECT ]'
                : 'FRONTEND ENGINEER & DIGITAL CREATIVE · INDIA'}
            </motion.p>
          </div>

          {/* Scroll Down Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-4 border-t flex justify-between items-center text-xs font-mono"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <span>{isCyber ? 'LOC: INDIA // LATENCY 12ms' : 'BASED IN INDIA (UTC+5:30)'}</span>
            <div className="flex items-center gap-2 animate-bounce" style={{ color: 'var(--accent-primary)' }}>
              <span className="uppercase tracking-widest font-semibold">
                {isCyber ? 'SCROLL TO ENGAGE' : 'SCROLL TO DISCOVER'}
              </span>
              <ArrowDown size={14} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FRAME 2 (100vh): EDITORIAL MANIFESTO & PARAGRAPH
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="min-h-screen flex flex-col justify-between py-24 border-b relative z-10"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="editorial-container flex-1 flex flex-col justify-between">
          <div
            className="border-b pb-4 text-[11px] font-mono uppercase tracking-widest flex justify-between"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <span>{isCyber ? '// CORE_MANIFESTO_01' : '[ 01 / MANIFESTO ]'}</span>
            <span>ENGINEERING × DESIGN × AI</span>
          </div>

          {/* Statement Paragraph */}
          <div className="my-auto py-8 max-w-5xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-widest font-semibold block mb-6"
              style={{ color: 'var(--accent-primary)' }}
            >
              {isCyber ? '// MISSION_STATEMENT' : 'ABOUT THE WORK'}
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold leading-tight uppercase"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              I craft clean, modern, and user-focused web applications and AI-powered systems that turn complex ideas into usable, high-impact digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 pt-10"
            >
              <a
                href="#work"
                className="px-7 py-4 font-mono text-xs uppercase tracking-widest rounded-sm flex items-center gap-2 group shadow-sm transition-all"
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  boxShadow: isCyber ? '0 0 25px rgba(0, 229, 255, 0.35)' : undefined,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--text-primary)')}
              >
                <span>{isCyber ? 'EXECUTE // VIEW_BUILDS' : 'VIEW SELECTED WORK'}</span>
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/vivekcyr25"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 font-mono text-xs uppercase tracking-widest rounded-sm flex items-center gap-2 group transition-all"
                style={{
                  border: `1px solid var(--border-subtle)`,
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  backdropFilter: isCyber ? 'blur(12px)' : 'none',
                }}
              >
                <i className="fab fa-github text-sm" />
                <span>{isCyber ? 'GITHUB_REPOSITORIES' : 'EXPLORE GITHUB'}</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          <div
            className="pt-4 border-t flex justify-between items-center text-xs font-mono"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <span>{isCyber ? '// NEXT_MODULE: NEURAL_PORTFOLIO' : 'NEXT: PORTFOLIO SHOWCASE'}</span>
            <span className="uppercase">SCROLL DOWN ↓</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FRAME 3 (100vh): "PORTFOLIO" BILLBOARD
          - Clean Title on Top
          - Below: Animated Cyber HUD (in Cyber Mode) OR Portrait (in Editorial)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="min-h-screen flex flex-col justify-between py-16 border-b relative z-10 overflow-hidden"
        style={{
          background: 'var(--bg-primary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="editorial-container flex-1 flex flex-col justify-between">
          <div
            className="flex justify-between items-center py-2 border-b text-[11px] font-mono uppercase tracking-widest"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <span style={{ color: 'var(--accent-primary)' }} className="font-semibold">
              {isCyber ? '// ACTIVE_INTERFACE: TI-CYBER v2.6' : 'FEATURED PORTFOLIO EDITION'}
            </span>
            <a
              href="#contact"
              className="hover-editorial-line transition-colors flex items-center gap-1"
              style={{ color: 'var(--text-primary)' }}
            >
              <span>{isCyber ? 'ESTABLISH_UPLINK' : 'AVAILABLE FOR HIRE'}</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* ═══ BILLBOARD: PORTFOLIO text + photo overlap (Matching Reference) ═══ */}
          <div className="my-auto relative select-none py-4 w-full flex flex-col items-center justify-center">

            {/* Relative Stage for Layered Text + Portrait */}
            <div className="relative w-full max-w-7xl flex flex-col items-center justify-end pt-20 sm:pt-28 md:pt-36 pb-2 min-h-[320px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[540px]">

              {/* Layer 1: Giant "PORTFOLIO" Typography (moves to front z-30 on hover) */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsTitleHovered(true)}
                onMouseLeave={() => setIsTitleHovered(false)}
                onClick={handlePortfolioClick}
                onDoubleClick={handleFirstPortfolioRedirect}
                title="Double-click to open First Portfolio"
                className="font-display font-black tracking-tighter uppercase leading-[0.80] w-full text-center cursor-pointer transition-all duration-500 select-none pointer-events-auto mt-auto translate-y-3 sm:translate-y-6 md:translate-y-8"
                style={{
                  fontSize: 'clamp(4.8rem, 19vw, 19rem)',
                  letterSpacing: '-0.03em',
                  zIndex: isTitleHovered ? 30 : 10,
                  position: 'relative',
                  color: isCyber
                    ? isTitleHovered ? 'var(--accent-primary)' : 'transparent'
                    : isTitleHovered ? 'var(--accent-primary)' : 'var(--text-primary)',
                  WebkitTextStroke: isCyber
                    ? isTitleHovered ? '0px transparent' : '2.5px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.85)'
                    : '0px transparent',
                  opacity: isCyber ? 1 : 0.92,
                  textShadow: isTitleHovered && isCyber
                    ? '0 0 35px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.9), 0 0 70px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.4)'
                    : isTitleHovered && !isCyber
                    ? '0 10px 30px rgba(200, 92, 59, 0.25)'
                    : !isTitleHovered && isCyber
                    ? '0 0 20px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.3)'
                    : 'none',
                }}
              >
                PORTFOLIO
              </motion.h2>

              {/* Layer 2 (Editorial Mode): Cutout Portrait (Face clearly above text, letters cross chest) */}
              {!isCyber && (
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none -top-12 sm:-top-16 md:-top-24"
                >
                  <div
                    className="relative w-64 sm:w-80 md:w-96 lg:w-[440px] xl:w-[480px] max-w-[75%] h-full flex items-end justify-center pointer-events-auto group cursor-pointer"
                    onMouseEnter={() => {
                      setIsPhotoHovered(true);
                      setIsTitleHovered(false);
                    }}
                    onMouseLeave={() => setIsPhotoHovered(false)}
                    onClick={handlePortfolioClick}
                    onDoubleClick={handleFirstPortfolioRedirect}
                    title="Double-click to open First Portfolio"
                    style={{
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                    }}
                  >
                    <img
                      src={profilePhotoNobg}
                      alt="Vivek Sharma"
                      className="w-auto h-full max-h-[420px] sm:max-h-[500px] md:max-h-[580px] object-contain object-bottom transition-all duration-700 select-none drop-shadow-2xl"
                      style={{
                        filter: isPhotoHovered
                          ? 'grayscale(0%) contrast(1.12) brightness(1.04) drop-shadow(0 25px 50px rgba(200, 92, 59, 0.35))'
                          : 'grayscale(100%) contrast(1.08) brightness(1.0) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
                        transform: isPhotoHovered ? 'scale(1.02)' : 'scale(1)',
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Layer 2 (Cyber Mode): Holographic HUD Console */}
              {isCyber && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="mt-6 md:mt-8 z-20 w-full max-w-2xl p-5 md:p-6 rounded-lg cyber-glass cyber-border-glow select-none"
                  style={{
                    background: 'rgba(8, 11, 20, 0.92)',
                    border: '1px solid rgba(var(--theme-primary-rgb, 0, 229, 255), 0.4)',
                    boxShadow: '0 0 40px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.2), inset 0 0 20px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.05)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent-primary)' }} />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent-primary)' }} />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent-primary)' }} />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent-primary)' }} />
                  <div className="flex justify-between items-center pb-3 border-b text-[11px] font-mono" style={{ borderColor: 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.2)', color: 'var(--accent-primary)' }}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)' }} />
                      <span className="font-bold tracking-wider">// NEURAL_ENGINE.CORE</span>
                    </div>
                    <span className="text-white/60">STATUS: ACTIVE // 60 FPS</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
                    {[
                      { label: 'COGNITION', val: '99.8%', color: 'text-emerald-400' },
                      { label: 'QUANTUM_STATE', val: 'COHERENT', color: 'text-theme-primary' },
                      { label: 'NEURAL_LOAD', val: '42.1 GFLOPS', color: 'text-theme-secondary' },
                      { label: 'UPTIME', val: '99.99%', color: 'text-purple-400' },
                    ].map((stat, i) => (
                      <div key={i} className="p-2 bg-black/50 rounded border border-white/5 font-mono text-center">
                        <p className="text-[8px] text-white/40 uppercase">{stat.label}</p>
                        <p className={`text-xs font-bold ${stat.color}`}>{stat.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end justify-between gap-1 h-8 bg-black/40 p-1.5 rounded border border-white/5 mb-4">
                    {Array.from({ length: 24 }).map((_, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ height: ['15%', `${Math.random() * 85 + 15}%`, '25%'] }}
                        transition={{ duration: 0.8 + Math.random() * 0.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.04 }}
                        className="flex-1 rounded-t-sm"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      />
                    ))}
                  </div>
                  <div className="text-[11px] font-mono text-white/70 space-y-1 bg-black/40 p-2.5 rounded border border-white/5">
                    <div className="flex items-center gap-2" style={{ color: 'var(--accent-primary)' }}>
                      <Terminal size={12} />
                      <span>&gt; VIVEK_SHARMA.init(mode=&quot;TI-CYBER&quot;)</span>
                    </div>
                    <p className="text-white/50 pl-4">→ Systems: Computer Vision, Fullstack React, AI Assistants</p>
                    <p className="text-emerald-400 pl-4">✔ All protocols nominal. Interactive matrix ready.</p>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Hand-drawn Callout — directly UNDER the ending 'O' of PORTFOLIO */}
            {!isCyber && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="self-end flex flex-col items-center select-none pointer-events-none z-30 mt-1 sm:mt-2 md:mt-3 mr-3 sm:mr-6 md:mr-10 lg:mr-14"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 70 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ml-2"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  <path
                    d="M 18 14 L 6 9 L 10 21"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 8 10 C 32 8, 48 20, 40 38 C 30 52, 14 42, 20 30 C 26 20, 48 30, 56 60"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 46 58 L 57 62 L 55 50"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  className="leading-[1.1] tracking-tight rotate-[-3deg] text-[12px] sm:text-[13px] md:text-sm font-bold whitespace-nowrap text-center"
                  style={{
                    fontFamily: "'Caveat', cursive, sans-serif",
                    color: 'var(--text-primary)',
                  }}
                >
                  <span className="block">Let's build</span>
                  <span className="block">something amazing!</span>
                </div>
              </motion.div>
            )}

          </div>

          <div
            className="pt-4 border-t flex justify-between items-center text-xs font-mono"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <span>{isCyber ? '// CORE_TELEMETRY: STABLE' : 'ENGINEERING × DESIGN × AI'}</span>
            <a href="#about" className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--accent-primary)' }}>
              <span>{isCyber ? 'EXPLORE_ABOUT ↓' : 'EXPLORE ABOUT BELOW'}</span>
              <ArrowDown size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
