import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

const skillCategories = [
  {
    number: '01',
    category: 'FRONTEND ENGINEERING',
    summary: 'Building performant, accessible and design-accurate interfaces',
    items: ['React 19', 'TypeScript', 'JavaScript (ESNext)', 'Tailwind CSS v4', 'Framer Motion', 'HTML5 / Semantic Web', 'CSS3 / Modern Layouts', 'Vite & Build Tooling', 'Responsive Design'],
  },
  {
    number: '02',
    category: 'AI & MACHINE LEARNING',
    summary: 'Computer vision pipelines and large language model integrations',
    items: ['Python', 'PyTorch', 'OpenCV', 'Real-ESRGAN', 'Computer Vision', 'Google Gemini API', 'Image Processing', 'Model Inference'],
  },
  {
    number: '03',
    category: 'BACKEND & SERVICES',
    summary: 'Cloud backends, persistent storage, and streaming APIs',
    items: ['Node.js', 'Express', 'Firebase Auth & Firestore', 'REST APIs', 'Server-Sent Events (SSE)', 'JSON Web Tokens', 'Supabase'],
  },
  {
    number: '04',
    category: 'DEV TOOLS & INFRASTRUCTURE',
    summary: 'Version control, deployment pipelines, and media utilities',
    items: ['Git & GitHub', 'FFmpeg', 'Linux / Bash', 'Vercel & CI/CD', 'Docker Basics', 'Chrome DevTools', 'Postman'],
  },
];

export const Toolkit: React.FC = () => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  return (
    <section
      id="skills"
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
              {isCyber ? '// 05_TECHNICAL_TOOLKIT' : '[ 05 / TECHNICAL TOOLKIT ]'}
            </span>
            <h2
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              SKILLS &{' '}<br />
              <span style={{ color: 'var(--text-muted)' }}>EXPERTISE</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Technologies and frameworks actively used to build production applications, computer vision tools, and AI integrations.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-sm relative overflow-hidden transition-all duration-300"
              style={{
                background: 'var(--card-bg)',
                border: `1px solid var(--card-border)`,
                backdropFilter: isCyber ? 'blur(20px)' : 'none',
                padding: '1.5rem 2rem',
              }}
            >
              {/* Cyber accent glow corner */}
              {isCyber && (
                <div
                  className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(0, 229, 255, 0.08), transparent 70%)',
                  }}
                />
              )}

              <div>
                <div
                  className="flex items-center justify-between border-b pb-4 mb-6"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-primary)' }}>
                    {cat.number}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: 'var(--text-primary)',
                      boxShadow: isCyber ? '0 0 6px rgba(0, 229, 255, 0.5)' : 'none',
                    }}
                  />
                </div>

                <h3 className="font-display text-lg font-bold mb-2 uppercase" style={{ color: 'var(--text-primary)' }}>
                  {cat.category}
                </h3>

                <p className="text-xs leading-relaxed mb-6 font-normal" style={{ color: 'var(--text-muted)' }}>
                  {cat.summary}
                </p>

                <ul className="space-y-2 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs flex items-center gap-2 group"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span
                        className="font-bold opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        {isCyber ? '▶' : '→'}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="mt-8 pt-4 border-t text-[10px] font-mono uppercase tracking-wider flex justify-between"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
              >
                <span>{cat.items.length} TECHNOLOGIES</span>
                <span style={{ color: isCyber ? 'var(--accent-primary)' : 'inherit' }}>PRODUCTION</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
