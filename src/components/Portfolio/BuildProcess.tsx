import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

const steps = [
  {
    step: '01',
    title: 'UNDERSTAND',
    subtitle: 'Deconstruct the problem & define boundaries',
    details: 'Identify core technical constraints, user needs, and architectural tradeoffs before writing code.',
    deliverables: 'Problem specification · System flow · Data contracts',
  },
  {
    step: '02',
    title: 'DESIGN',
    subtitle: 'Turn the idea into an interface',
    details: 'Establish strong typographic hierarchy, grid systems, and interaction states that guide user focus without unnecessary visual noise.',
    deliverables: 'Component schemas · Responsive layouts · UX states',
  },
  {
    step: '03',
    title: 'BUILD',
    subtitle: 'TypeScript, React & Python engineering',
    details: 'Develop modular, type-safe components and optimized model inference pipelines with high readability and zero dead code.',
    deliverables: 'Clean codebase · Typed architecture · Unit tests',
  },
  {
    step: '04',
    title: 'INTEGRATE',
    subtitle: 'APIs, AI models & cloud backend',
    details: 'Connect LLMs, computer vision models, auth layers, and databases with resilient error boundaries and fast optimistic UI updates.',
    deliverables: 'Streaming SSE endpoints · Auth hooks · DB schemas',
  },
  {
    step: '05',
    title: 'SHIP & POLISH',
    subtitle: 'Deploy, benchmark & continuously refine',
    details: 'Verify responsiveness across viewport sizes, ensure sub-second interaction speed, and release to production.',
    deliverables: 'Production deployment · Lighthouse audits · Fast iterations',
  },
];

export const BuildProcess: React.FC = () => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  return (
    <section
      id="process"
      className="editorial-section border-b"
      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}
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
              {isCyber ? '// 05_ENGINEERING_METHODOLOGY' : '[ 05 / ENGINEERING METHODOLOGY ]'}
            </span>
            <h2
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              HOW I{' '}<br />
              <span style={{ color: 'var(--text-muted)' }}>BUILD SYSTEMS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            A structured, 5-stage engineering philosophy focused on clarity, performance, and delivering real value.
          </p>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-sm relative group overflow-hidden transition-all duration-300"
              style={{
                background: 'var(--card-bg)',
                border: `1px solid var(--card-border)`,
                backdropFilter: isCyber ? 'blur(16px)' : 'none',
                padding: '1.5rem',
              }}
            >
              {/* Hover glow accent */}
              {isCyber && (
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.04), transparent 70%)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    borderRadius: 'inherit',
                  }}
                />
              )}

              <div>
                <div
                  className="flex items-center justify-between border-b pb-3 mb-6"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-primary)' }}>
                    {isCyber ? `STAGE_${step.step}` : `STAGE ${step.step}`}
                  </span>
                  <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--text-muted)' }}>
                    0{index + 1}/05
                  </span>
                </div>

                <h3
                  className="font-display text-2xl font-bold mb-2 uppercase"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h3>

                <p className="font-mono text-xs font-medium leading-snug mb-4" style={{ color: 'var(--accent-primary)' }}>
                  {step.subtitle}
                </p>

                <p className="text-xs leading-relaxed mb-6 font-normal" style={{ color: 'var(--text-muted)' }}>
                  {step.details}
                </p>
              </div>

              <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--border-subtle)' }}>
                <span
                  className="block font-mono text-[9px] uppercase tracking-widest mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  KEY FOCUS:
                </span>
                <span
                  className="font-mono text-[11px] leading-tight block"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.deliverables}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
