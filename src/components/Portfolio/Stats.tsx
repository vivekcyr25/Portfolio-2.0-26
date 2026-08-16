import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

const stats = [
  { number: '1000+', label: 'GITHUB CONTRIBUTIONS', detail: 'Continuous open-source code & active commits' },
  { number: '04+',   label: 'FEATURED BUILDS & PROJECTS', detail: 'Fullstack web applications, AI tools & pipelines' },
];

export const Stats: React.FC = () => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  return (
    <section
      className="border-b"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
      <div className="editorial-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-8 sm:gap-0 sm:divide-x"
          style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex flex-col ${i > 0 ? 'sm:pl-12' : 'sm:pr-12'}`}
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className="font-display text-4xl sm:text-5xl font-bold tracking-tight"
                  style={{
                    color: isCyber ? 'var(--accent-primary)' : '#111111',
                    textShadow: isCyber ? '0 0 20px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.4)' : 'none',
                  }}
                >
                  {stat.number}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'var(--accent-primary)',
                    boxShadow: isCyber ? '0 0 8px var(--accent-primary)' : 'none',
                  }}
                />
              </div>
              <span
                className="font-mono text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {stat.label}
              </span>
              <p className="text-xs font-normal leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
