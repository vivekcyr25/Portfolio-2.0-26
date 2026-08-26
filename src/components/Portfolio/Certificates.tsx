import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ExternalLink, X, ZoomIn, ShieldCheck, Sparkles } from 'lucide-react';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

export interface CertificateItem {
  id: string;
  title: string;
  provider: string;
  image: string;
  focus: string;
  badge: string;
  issueDate?: string;
  credentialUrl?: string;
}

const BASE = import.meta.env.BASE_URL;

const certificatesData: CertificateItem[] = [
  {
    id: 'walmart',
    title: 'Walmart Global Tech',
    provider: 'Advanced Software Engineering Job Simulation',
    image: `${BASE}certificates/cert-walmart-forage.jpg`,
    focus: 'Data structures, backend processing & architecture systems',
    badge: 'Architect',
    issueDate: 'April 2026',
  },
  {
    id: 'tata',
    title: 'TATA Forage',
    provider: 'Data Visualisation: Empowering Business Insights',
    image: `${BASE}certificates/cert-tata-forage.jpg`,
    focus: 'Executive analytics, dashboard design & business intelligence',
    badge: 'Data Intelligence',
    issueDate: 'April 2026',
  },
  {
    id: 'infosys-react',
    title: 'Infosys Springboard',
    provider: 'Learning Full Stack React Development',
    image: `${BASE}certificates/cert-infosys-react.jpg`,
    focus: 'Component architecture, state management & performance',
    badge: 'Frontend Systems',
    issueDate: 'April 2026',
  },
  {
    id: 'infosys-devops',
    title: 'Infosys Springboard',
    provider: 'Mastering DevOps & Modern CI/CD',
    image: `${BASE}certificates/cert-infosys-devops.jpg`,
    focus: 'Deployment pipelines, containerization & infrastructure ops',
    badge: 'Infrastructure Ops',
    issueDate: 'April 2026',
  },
  {
    id: 'india-ai',
    title: 'India AI Mission',
    provider: 'India-AI Impact Summit Explorer & Neural Innovation',
    image: `${BASE}certificates/cert-india-ai.jpg`,
    focus: 'National AI ecosystem, responsible compute & ML frameworks',
    badge: 'AI Explorer',
    issueDate: 'April 2026',
  },
  {
    id: 'hp-life',
    title: 'HP LIFE Foundation',
    provider: 'Strategic Professional Communications & Collaboration',
    image: `${BASE}certificates/cert-hp-life.jpg`,
    focus: 'Engineering leadership, cross-functional sync & networking',
    badge: 'Leadership Systems',
    issueDate: 'April 2026',
  },
];

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  return (
    <section
      id="certificates"
      className="editorial-section border-b relative overflow-hidden"
      style={{
        background: isCyber ? 'var(--bg-surface)' : 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Cyber Ambient Glows */}
      {isCyber && (
        <>
          <div
            className="absolute top-0 right-1/4 w-96 h-96 pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-96 h-96 pointer-events-none opacity-15"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
          />
        </>
      )}

      <div className="editorial-container relative z-10">
        {/* Section Header */}
        <div
          className="border-b pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={14} style={{ color: 'var(--accent-primary)' }} />
              <span
                className="font-mono text-xs uppercase tracking-widest font-semibold block"
                style={{ color: 'var(--accent-primary)' }}
              >
                {isCyber ? '// 03_ACHIEVEMENT_VAULT' : '[ 03 / CERTIFICATES & CREDENTIALS ]'}
              </span>
            </div>
            <h2
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              VERIFIED{' '}<br />
              <span style={{ color: 'var(--text-muted)' }}>CREDENTIALS & NODES.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            A verified archive of professional engineering simulations, fullstack specializations, and corporate technical milestones.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {certificatesData.map((cert, idx) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 relative"
              style={{
                background: 'var(--card-bg)',
                border: `1px solid var(--card-border)`,
                boxShadow: isCyber ? '0 0 25px rgba(0, 229, 255, 0.04)' : '0 2px 8px rgba(0,0,0,0.03)',
              }}
              onMouseEnter={e => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = 'var(--accent-primary)';
                if (isCyber) target.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.18)';
              }}
              onMouseLeave={e => {
                const target = e.currentTarget as HTMLElement;
                target.style.borderColor = 'var(--card-border)';
                if (isCyber) target.style.boxShadow = '0 0 25px rgba(0, 229, 255, 0.04)';
              }}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[25%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded-sm backdrop-blur-md"
                    style={{
                      background: isCyber ? 'rgba(0, 229, 255, 0.15)' : 'rgba(17, 17, 17, 0.85)',
                      color: isCyber ? 'var(--accent-primary)' : '#FAF8F4',
                      border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                    }}
                  >
                    {cert.badge}
                  </span>
                </div>

                {/* Hover Quick Zoom Cue */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                  <span
                    className="px-3.5 py-2 rounded-sm font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-2"
                    style={{
                      background: 'var(--accent-primary)',
                      color: isCyber ? '#080B14' : '#FFFFFF',
                    }}
                  >
                    <ZoomIn size={14} />
                    <span>VIEW CREDENTIAL</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider block mb-1 font-semibold" style={{ color: 'var(--text-muted)' }}>
                    {cert.provider}
                  </span>
                  <h3
                    className="font-display font-bold text-xl sm:text-2xl leading-tight uppercase transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {cert.title}
                  </h3>
                </div>

                <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-primary)' }}>
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--accent-primary)' }} />
                    <span className="leading-snug text-xs font-normal" style={{ color: 'var(--text-muted)' }}>
                      {cert.focus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-[11px] font-mono">
                    <span style={{ color: 'var(--accent-primary)' }} className="font-bold flex items-center gap-1.5">
                      <span>VERIFIED VAULT</span>
                      <Sparkles size={11} />
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {cert.issueDate || 'ACTIVE'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Milestone Statistics Bar */}
        <div
          className="mt-16 pt-10 border-t grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {[
            { value: '06', label: 'ACHIEVEMENT NODES', sub: 'Verified Simulations & Tracks' },
            { value: '100%', label: 'CREDENTIAL INTEGRITY', sub: 'Authorized Institutional Proof' },
            { value: '12+', label: 'DOMAIN COMPETENCIES', sub: 'From Algorithms to DevOps' },
            { value: '2026', label: 'ACTIVE EDITION', sub: 'Continuous Skill Validation' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div
                className="font-display text-3xl sm:text-4xl font-black tracking-tight"
                style={{
                  color: isCyber ? 'var(--accent-primary)' : 'var(--text-primary)',
                  textShadow: isCyber ? '0 0 15px rgba(0, 229, 255, 0.4)' : 'none',
                }}
              >
                {stat.value}
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                {stat.label}
              </div>
              <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Certificate Inspection Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm flex flex-col z-10"
              style={{
                background: isCyber ? '#080E1C' : '#FAF8F4',
                border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.3)' : '#2A2A2A'}`,
                boxShadow: isCyber ? '0 0 60px rgba(0, 229, 255, 0.25)' : '0 25px 60px rgba(0,0,0,0.4)',
                color: isCyber ? '#E8F4FF' : '#111111',
              }}
            >
              {/* Modal Top Bar */}
              <div
                className="flex items-center justify-between p-5 sm:p-6 border-b sticky top-0 z-20 backdrop-blur-md"
                style={{
                  background: isCyber ? 'rgba(8, 14, 28, 0.95)' : 'rgba(250, 248, 244, 0.95)',
                  borderColor: isCyber ? 'rgba(0, 229, 255, 0.15)' : '#E0DCD3',
                }}
              >
                <div className="flex items-center gap-3">
                  <Award size={20} style={{ color: 'var(--accent-primary)' }} />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold block" style={{ color: 'var(--accent-primary)' }}>
                      {selectedCert.badge} // VERIFIED CREDENTIAL
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase leading-tight">
                      {selectedCert.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2.5 rounded-sm transition-all focus:outline-none"
                  style={{
                    border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.25)' : '#D7D1C6'}`,
                    background: isCyber ? 'rgba(0, 229, 255, 0.08)' : '#F3F0E8',
                    color: isCyber ? 'var(--accent-primary)' : '#111111',
                  }}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="p-4 sm:p-8 flex items-center justify-center bg-black/5 dark:bg-black/40">
                <div
                  className="w-full max-w-3xl rounded-sm overflow-hidden border shadow-2xl"
                  style={{ borderColor: isCyber ? 'rgba(0, 229, 255, 0.2)' : '#D7D1C6' }}
                >
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-auto object-contain select-none"
                  />
                </div>
              </div>

              {/* Modal Bottom Metadata */}
              <div
                className="p-5 sm:p-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                style={{ borderColor: isCyber ? 'rgba(0, 229, 255, 0.15)' : '#E0DCD3' }}
              >
                <div className="space-y-1 max-w-lg">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold block" style={{ color: 'var(--text-muted)' }}>
                    PROGRAM & DOMAIN
                  </span>
                  <p className="font-medium text-sm sm:text-base leading-snug">
                    {selectedCert.provider}
                  </p>
                  <p className="text-xs pt-1" style={{ color: 'var(--text-muted)' }}>
                    Core Domain: {selectedCert.focus}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="flex-1 sm:flex-initial px-6 py-3 font-mono text-xs uppercase tracking-widest rounded-sm font-bold transition-all"
                    style={{
                      background: 'var(--accent-primary)',
                      color: isCyber ? '#080B14' : '#FFFFFF',
                    }}
                  >
                    CLOSE VIEWER
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
