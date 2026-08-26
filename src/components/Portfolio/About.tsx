import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal, Sparkles, Code2, BookOpen } from 'lucide-react';
import profilePhoto from '../../assets/profile-photo.png';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

export const About: React.FC = () => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  return (
    <section
      id="about"
      className="editorial-section border-b"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
      <div className="editorial-container">
        {/* Header */}
        <div
          className="border-b pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <span
              className="font-mono text-xs uppercase tracking-widest font-semibold block mb-2"
              style={{ color: 'var(--accent-primary)' }}
            >
              {isCyber ? '// 01_ABOUT & FOCUS' : '[ 01 / ABOUT & FOCUS ]'}
            </span>
            <h2
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              HELLO,{' '}<br />
              <span style={{ color: 'var(--text-muted)' }}>I'M VIVEK.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            A developer who sits at the intersection of creative frontend engineering, modern design systems, and applied artificial intelligence.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
            style={{ color: 'var(--text-primary)' }}
          >
            <p className="text-xl sm:text-2xl font-normal leading-snug">
              I am a Computer Science student and Frontend Engineer based in India, dedicated to turning abstract engineering ideas into tangible, elegant digital products.
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              My work spans from building accessible, responsive React & TypeScript web applications to constructing multi-stage computer vision pipelines for video enhancement in Python. I believe the best software is built when strong technical foundations meet art-directed visual precision.
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Currently interning at <strong style={{ color: 'var(--text-primary)' }}>FlyRank AI</strong>, I collaborate on deploying AI-integrated UI workflows, reducing frontend latency, and building scalable component libraries. When I am not writing code, I am analyzing new deep learning research, exploring Swiss typography, or shipping open-source experiments.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono">
              <a
                href="https://github.com/vivekcyr25"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm uppercase tracking-wider transition-all"
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
                <span>EXPLORE MY GITHUB</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://www.linkedin.com/in/vivek-sharma-2bba8b398/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm uppercase tracking-wider transition-all"
                style={{
                  border: `1px solid var(--border-subtle)`,
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-primary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                }}
              >
                <span>CONNECT ON LINKEDIN</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* Right: Current Focus Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 rounded-sm space-y-6 relative overflow-hidden"
            style={{
              background: 'var(--card-bg)',
              border: `1px solid var(--card-border)`,
              backdropFilter: isCyber ? 'blur(20px)' : 'none',
              padding: '1.5rem 2rem',
              boxShadow: isCyber ? '0 0 40px rgba(0, 229, 255, 0.08)' : 'none',
            }}
          >
            {/* Cyber ambient glow */}
            {isCyber && (
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(0, 229, 255, 0.1), transparent 70%)' }}
              />
            )}

            <div
              className="flex items-center justify-between border-b pb-4 relative z-10"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: 'var(--accent-primary)',
                    boxShadow: isCyber ? '0 0 8px rgba(0, 229, 255, 0.8)' : 'none',
                  }}
                />
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
                  {isCyber ? 'CURRENT_FOCUS // 2026' : 'CURRENT FOCUS // 2026'}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>
                ACTIVE
              </span>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                { icon: Code2,    text: 'Building AI-powered web tools & responsive web applications in React + TS' },
                { icon: Sparkles, text: 'Exploring computer vision, Real-ESRGAN super-resolution & frame interpolation' },
                { icon: Terminal, text: 'Working as a Frontend Engineering Intern at FlyRank AI' },
                { icon: BookOpen, text: 'Deepening foundations in Data Structures, Algorithms & Distributed Web Systems' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm" style={{ color: 'var(--text-primary)' }}>
                  <item.icon
                    size={16}
                    className="mt-0.5 flex-shrink-0"
                    style={{
                      color: 'var(--accent-primary)',
                      filter: isCyber ? 'drop-shadow(0 0 4px rgba(0, 229, 255, 0.6))' : 'none',
                    }}
                  />
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Profile stamp */}
            <div
              className="border-t pt-5 flex items-center gap-4 relative z-10"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div
                className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0"
                style={{
                  border: `1px solid var(--card-border)`,
                  boxShadow: isCyber ? '0 0 12px rgba(0, 229, 255, 0.2)' : 'none',
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Vivek Sharma thumbnail"
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
              <div>
                <span className="font-display text-sm font-bold block" style={{ color: 'var(--text-primary)' }}>
                  Vivek Sharma
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                  Lovely Professional University
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
