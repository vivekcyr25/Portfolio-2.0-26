import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

const experiences = [
  {
    period: '2026 — PRESENT',
    role: 'Frontend Engineering Intern',
    organization: 'FlyRank AI',
    location: 'Remote',
    type: 'experience' as const,
    highlights: [
      'Architecting responsive, high-performance UI components using React, TypeScript, and modern state management.',
      'Integrating streaming AI APIs and real-time backend microservices with client-side optimistic UI updates.',
      'Refactoring legacy component trees for improved accessibility, core web vitals, and rendering benchmarks.',
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'REST / Streaming APIs', 'Performance Optimization'],
  },
  {
    period: '2025 — PRESENT',
    role: 'B.Tech in Computer Science & Engineering',
    organization: 'Lovely Professional University',
    location: 'India',
    type: 'education' as const,
    highlights: [
      'Comprehensive study in Computer Science fundamentals: Data Structures, Algorithms, Computer Vision, and Software Engineering.',
      'Built multiple real-world capstones focusing on AI applications, automated data processing, and client-server architectures.',
      'Active open-source contributor and technical mentor for peer developer communities.',
    ],
    skills: ['Data Structures & Algorithms', 'Python', 'Computer Vision', 'System Design', 'Web Systems'],
  },
];

export const Experience: React.FC = () => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  return (
    <section
      id="experience"
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
              {isCyber ? '// 03_BACKGROUND & TRAJECTORY' : '[ 03 / BACKGROUND & TRAJECTORY ]'}
            </span>
            <h2
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              EXPERIENCE &{' '}<br />
              <span style={{ color: 'var(--text-muted)' }}>EDUCATION</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Practical engineering experience combined with a solid academic foundation in Computer Science and systems engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {experiences.map((item, index) => (
            <motion.div
              key={item.organization + item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b pb-12 items-start"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {/* Left */}
              <div className="lg:col-span-4 flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  {item.type === 'experience' ? (
                    <Briefcase size={16} style={{ color: 'var(--accent-primary)' }} />
                  ) : (
                    <GraduationCap size={16} style={{ color: 'var(--accent-primary)' }} />
                  )}
                  <span
                    className="font-mono text-xs font-semibold tracking-widest uppercase"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {item.type === 'experience' ? 'PROFESSIONAL' : 'ACADEMIC'}
                  </span>
                </div>
                <span
                  className="font-display text-2xl font-bold"
                  style={{
                    color: 'var(--text-primary)',
                    textShadow: isCyber ? '0 0 15px rgba(0, 229, 255, 0.2)' : 'none',
                  }}
                >
                  {item.period}
                </span>
                <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {item.role}
                  </h3>
                  <p className="font-mono text-sm font-medium tracking-wide uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
                    {item.organization}
                  </p>
                </div>

                <ul className="space-y-2.5">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-sm md:text-base leading-relaxed flex items-start gap-3" style={{ color: 'var(--text-primary)' }}>
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{
                          background: 'var(--accent-primary)',
                          boxShadow: isCyber ? '0 0 6px rgba(0, 229, 255, 0.6)' : 'none',
                        }}
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] px-3 py-1 rounded-sm uppercase tracking-wider"
                      style={{
                        background: 'var(--card-bg)',
                        color: 'var(--text-primary)',
                        border: `1px solid var(--card-border)`,
                        backdropFilter: isCyber ? 'blur(10px)' : 'none',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
