import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Globe, ArrowUp, FileDown, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

const BASE = import.meta.env.BASE_URL;

export const Contact: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  return (
    <footer
      id="contact"
      className="pt-24 md:pt-36 pb-12 relative overflow-hidden"
      style={{
        background: isCyber
          ? '#04080F'
          : 'linear-gradient(180deg, #FAF8F4 0%, #302C28 6%, #181818 14%, #111111 100%)',
        color: isCyber ? '#E8F4FF' : '#F3F0E8',
        borderColor: isCyber ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
      }}
    >
      {/* Backgrounds */}
      {isCyber ? (
        <>
          <div className="absolute inset-0 cyber-grid-overlay opacity-60" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top, rgba(0, 229, 255, 0.06), transparent 70%)' }}
          />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(ellipse at bottom, rgba(200, 92, 59, 0.06), transparent 70%)' }}
        />
      )}

      <div className="editorial-container relative z-10">
        {/* Main CTA */}
        <div
          className="border-b pb-20 md:pb-28"
          style={{ borderColor: isCyber ? 'rgba(0, 229, 255, 0.08)' : '#2A2A2A' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: 'var(--accent-primary)',
                boxShadow: isCyber ? '0 0 10px rgba(0, 229, 255, 1)' : 'none',
              }}
            />
            <span className="font-helix text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--accent-primary)' }}>
              {isCyber ? '// 07_GET_IN_TOUCH' : '[ 07 / GET IN TOUCH ]'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end justify-between">
            <div className="lg:col-span-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] uppercase tracking-tight"
                style={{
                  color: isCyber ? '#E8F4FF' : '#F3F0E8',
                  textShadow: isCyber ? '0 0 60px rgba(0, 229, 255, 0.1)' : 'none',
                }}
              >
                HAVE AN IDEA?{' '}<br />
                <span style={{ color: 'var(--accent-primary)', textShadow: isCyber ? '0 0 30px rgba(0, 229, 255, 0.4)' : 'none' }}>
                  LET'S BUILD IT.
                </span>
              </motion.h2>
              <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: isCyber ? '#7090B0' : '#9E9A91' }}>
                Whether you have an upcoming project, an internship opportunity, an AI idea, or just want to connect — my inbox is always open.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=viveklpu008@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-5 font-helix text-xs uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-3 group shadow-md transition-all"
                style={{
                  background: 'var(--accent-primary)',
                  color: isCyber ? '#080B14' : 'white',
                  boxShadow: isCyber ? '0 0 30px rgba(0, 229, 255, 0.3)' : 'none',
                }}
              >
                <Mail size={16} />
                <span>VIVEKLPU008@GMAIL.COM</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* DOWNLOAD CV PRIMARY BUTTON */}
              <a
                href={`${BASE}Vivek_Sharma_CV.pdf`}
                download="Vivek_Sharma_CV.pdf"
                className="w-full sm:w-auto px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-3 group transition-all"
                style={{
                  border: isCyber ? '1px solid rgba(0, 229, 255, 0.4)' : '1px solid #FAF8F4',
                  background: isCyber ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 255, 255, 0.06)',
                  color: isCyber ? 'var(--accent-primary)' : '#FAF8F4',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isCyber ? '0 0 20px rgba(0, 229, 255, 0.15)' : 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = isCyber ? 'var(--accent-primary)' : '#FAF8F4';
                  (e.currentTarget as HTMLElement).style.color = isCyber ? '#080B14' : '#111111';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = isCyber ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 255, 255, 0.06)';
                  (e.currentTarget as HTMLElement).style.color = isCyber ? 'var(--accent-primary)' : '#FAF8F4';
                }}
              >
                <FileDown size={16} />
                <span>DOWNLOAD CV (PDF)</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="font-helix text-[11px] font-semibold uppercase tracking-wider" style={{ color: isCyber ? '#4A6080' : '#706D66' }}>
                RESPONSE TIME: WITHIN 24 HOURS
              </span>
            </div>
          </div>

          {/* CV & RESUME ARCHIVE VAULT BANNER */}
          <div
            className="mt-16 p-6 sm:p-8 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
            style={{
              background: isCyber ? 'rgba(0, 229, 255, 0.03)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.15)' : '#262626'}`,
              backdropFilter: 'blur(16px)',
            }}
          >
            {isCyber && (
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)' }}
              />
            )}

            <div className="space-y-2 max-w-2xl relative z-10">
              <div className="flex items-center gap-2">
                <FileText size={15} style={{ color: 'var(--accent-primary)' }} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent-primary)' }}>
                  CURRICULUM VITAE // 2026 EDITION
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-white/5 text-gray-400">
                  OFFICIAL PDF
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                VIVEK SHARMA — ENGINEERING RESUME
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
                Full Stack Development Intern @ Flyrank AI · Computer Science & Engineering (B.Tech) · AI/ML, Python & React Specialization.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10 w-full sm:w-auto">
              <a
                href={`${BASE}Vivek_Sharma_CV.pdf`}
                download="Vivek_Sharma_CV.pdf"
                className="flex-1 sm:flex-initial px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                style={{
                  background: 'var(--accent-primary)',
                  color: isCyber ? '#080B14' : '#111111',
                }}
              >
                <FileDown size={15} />
                <span>DOWNLOAD PDF</span>
              </a>

              <a
                href={`${BASE}Vivek_Sharma_CV.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-5 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 border transition-all"
                style={{
                  borderColor: isCyber ? 'rgba(0, 229, 255, 0.3)' : '#3A3A3A',
                  color: isCyber ? '#E8F4FF' : '#F3F0E8',
                  background: 'transparent',
                }}
              >
                <ExternalLink size={14} />
                <span>PREVIEW ONLINE</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-12 border-t"
            style={{ borderColor: isCyber ? 'rgba(0, 229, 255, 0.08)' : '#262626' }}
          >
            {[
              { label: 'GITHUB',          href: 'https://github.com/vivekcyr25',                                     icon: <i className="fab fa-github text-lg" />,      sub: '@vivekcyr25' },
              { label: 'LINKEDIN',        href: 'https://www.linkedin.com/in/vivek-sharma-2bba8b398/',               icon: <i className="fab fa-linkedin-in text-lg" />, sub: 'Vivek Sharma' },
              { label: 'SPACE PORTFOLIO', href: 'https://vivekcyr25.github.io/First-Portfolio/',                     icon: <Globe size={18} />,                          sub: 'Interactive 3D' },
              { label: 'APIS PLATFORM',   href: 'https://vivekcyr25.github.io/APIS-Academic-Intelligence-System/',  icon: <Globe size={18} />,                          sub: 'Academic AI' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-sm flex flex-col justify-between group transition-all"
                style={{
                  background: isCyber ? 'rgba(0, 229, 255, 0.03)' : '#181818',
                  border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.1)' : '#2A2A2A'}`,
                  backdropFilter: isCyber ? 'blur(10px)' : 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)';
                  (e.currentTarget as HTMLElement).style.background = isCyber ? 'rgba(0, 229, 255, 0.06)' : '#1E1E1E';
                  (e.currentTarget as HTMLElement).style.boxShadow = isCyber ? '0 0 20px rgba(0, 229, 255, 0.1)' : 'none';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = isCyber ? 'rgba(0, 229, 255, 0.1)' : '#2A2A2A';
                  (e.currentTarget as HTMLElement).style.background = isCyber ? 'rgba(0, 229, 255, 0.03)' : '#181818';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span style={{ color: isCyber ? '#7090B0' : '#9E9A91' }}>{link.icon}</span>
                  <ArrowUpRight size={14} style={{ color: isCyber ? '#4A6080' : '#706D66' }} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <span
                    className="font-helix font-bold text-sm block uppercase tracking-wider"
                    style={{ color: isCyber ? '#E8F4FF' : '#F3F0E8' }}
                  >
                    {link.label}
                  </span>
                  <span className="font-helix text-[11px] font-medium uppercase tracking-wide" style={{ color: isCyber ? '#4A6080' : '#706D66' }}>
                    {link.sub}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-helix" style={{ color: isCyber ? '#4A6080' : '#706D66' }}>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="font-helix font-bold text-sm tracking-widest uppercase" style={{ color: isCyber ? '#E8F4FF' : '#F3F0E8' }}>
              VIVEK SHARMA
            </span>
            <span className="hidden sm:inline">/</span>
            <span className="font-helix uppercase tracking-wider">Frontend Engineer · AI Builder</span>
          </div>

          <div className="flex items-center gap-6 font-helix font-medium tracking-widest uppercase">
            <Link to="/legal/privacy" className="hover-editorial-line transition-colors" style={{ color: 'inherit' }}
              onMouseEnter={e => (e.currentTarget.style.color = isCyber ? '#E8F4FF' : '#F3F0E8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}>
              Privacy
            </Link>
            <Link to="/legal/terms" className="hover-editorial-line transition-colors" style={{ color: 'inherit' }}
              onMouseEnter={e => (e.currentTarget.style.color = isCyber ? '#E8F4FF' : '#F3F0E8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}>
              Terms
            </Link>
            <Link to="/legal/ai-governance" className="hover-editorial-line transition-colors" style={{ color: 'inherit' }}
              onMouseEnter={e => (e.currentTarget.style.color = isCyber ? '#E8F4FF' : '#F3F0E8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}>
              AI Governance
            </Link>
          </div>

          <div className="flex items-center gap-4 font-helix font-semibold tracking-widest uppercase">
            <span>© 2026 VIVEK SHARMA</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-sm border transition-all"
              style={{
                border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.2)' : '#2A2A2A'}`,
                background: isCyber ? 'rgba(0, 229, 255, 0.04)' : '#181818',
                color: isCyber ? '#E8F4FF' : '#F3F0E8',
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
