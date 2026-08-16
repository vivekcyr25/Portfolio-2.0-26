import React, { useState, useEffect } from 'react';
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

          {/* Centered Billboard Area */}
          <div className="my-auto relative flex flex-col items-center justify-center select-none py-6">
            {/* Giant "PORTFOLIO" Title */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setIsTitleHovered(true)}
              onMouseLeave={() => setIsTitleHovered(false)}
              className="font-display font-black tracking-tighter uppercase leading-[0.80] w-full text-center cursor-default transition-all duration-500"
              style={{
                fontSize: 'clamp(4.5rem, 18vw, 18rem)',
                letterSpacing: '-0.02em',
                color: isTitleHovered
                  ? isCyber
                    ? 'var(--accent-primary)'
                    : '#111111'
                  : 'transparent',
                WebkitTextStroke: isTitleHovered
                  ? '0px transparent'
                  : isCyber
                  ? '2.5px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.85)'
                  : '2.5px #111111',
                textShadow: isTitleHovered && isCyber
                  ? '0 0 35px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.9), 0 0 70px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.4)'
                  : !isTitleHovered && isCyber
                  ? '0 0 20px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.3)'
                  : 'none',
              }}
            >
              PORTFOLIO
            </motion.h2>

            {/* Hand-drawn Callout — sits to the RIGHT and BELOW the ending O, outside the letters */}
            {!isCyber && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="self-end flex flex-col items-start select-none pointer-events-none z-30"
                style={{ marginTop: '-1.5rem', marginRight: '-1rem' }}
              >
                {/* Curly Terracotta Arrow */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 70 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 ml-1"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {/* Top Arrowhead pointing left towards O */}
                  <path
                    d="M 18 14 L 6 9 L 10 21"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Curly Loop Body */}
                  <path
                    d="M 8 10 C 32 8, 48 20, 40 38 C 30 52, 14 42, 20 30 C 26 20, 48 30, 56 60"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Bottom Arrowhead */}
                  <path
                    d="M 46 58 L 57 62 L 55 50"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* 2-line Cursive Note */}
                <div
                  className="leading-[1.1] tracking-tight rotate-[-3deg] text-[13px] sm:text-sm md:text-base font-bold whitespace-nowrap"
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

            {/* ─── DUAL MODE DISPLAY BELOW PORTFOLIO TITLE ─── */}
            {isCyber ? (
              /* TI-CYBER MODE: Animated Holographic Neural Terminal HUD BELOW the Title */
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
                {/* Cyber Corner Brackets */}
                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent-primary)' }} />
                <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent-primary)' }} />
                <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent-primary)' }} />
                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent-primary)' }} />

                {/* Terminal Header */}
                <div
                  className="flex justify-between items-center pb-3 border-b text-[11px] font-mono"
                  style={{
                    borderColor: 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.2)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)' }} />
                    <span className="font-bold tracking-wider">// NEURAL_ENGINE.CORE</span>
                  </div>
                  <span className="text-white/60">STATUS: ACTIVE // 60 FPS</span>
                </div>

                {/* Telemetry Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
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

                {/* Equalizer Frequency Bars */}
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

                {/* Live Console Output */}
                <div className="text-[11px] font-mono text-white/70 space-y-1 bg-black/40 p-2.5 rounded border border-white/5">
                  <div className="flex items-center gap-2" style={{ color: 'var(--accent-primary)' }}>
                    <Terminal size={12} />
                    <span>&gt; VIVEK_SHARMA.init(mode=&quot;TI-CYBER&quot;)</span>
                  </div>
                  <p className="text-white/50 pl-4">→ Systems: Computer Vision, Fullstack React, AI Assistants</p>
                  <p className="text-emerald-400 pl-4">✔ All protocols nominal. Interactive matrix ready.</p>
                </div>
              </motion.div>
            ) : (
              /* EDITORIAL MODE: Clean Centered Transparent Cutout Portrait Below/Overlapping */
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative -mt-14 sm:-mt-20 md:-mt-28 lg:-mt-36 z-20 flex items-end justify-center group cursor-pointer"
                onMouseEnter={() => setIsPhotoHovered(true)}
                onMouseLeave={() => setIsPhotoHovered(false)}
              >
                <div
                  className="w-64 sm:w-80 md:w-96 max-w-full overflow-hidden"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)',
                  }}
                >
                  <img
                    src={profilePhotoNobg}
                    alt="Vivek Sharma"
                    className="w-full h-auto max-h-[460px] object-contain object-bottom transition-all duration-700 select-none"
                    style={{
                      filter: isPhotoHovered
                        ? 'grayscale(0%) contrast(1.1) brightness(1.03) drop-shadow(0 20px 35px rgba(200, 92, 59, 0.25))'
                        : 'grayscale(100%) contrast(1.08) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.18))',
                      transform: isPhotoHovered ? 'scale(1.04)' : 'scale(1)',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          <div
            className="pt-4 border-t flex justify-between items-center text-xs font-mono"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            <span>{isCyber ? '// CORE_TELEMETRY: STABLE' : 'ENGINEERING × DESIGN × AI'}</span>
            <a href="#work" className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--accent-primary)' }}>
              <span>{isCyber ? 'ACCESS_PROJECTS ↓' : 'EXPLORE PROJECTS BELOW'}</span>
              <ArrowDown size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
