import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Code2 } from 'lucide-react';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

interface TechCategory {
  number: string;
  category: string;
  summary: string;
  items: string[];
}

interface SoftSkillItem {
  number: string;
  category: string;
  tag: string;
  headline: string;
  summary: string;
  traits: string[];
}

const technicalCategories: TechCategory[] = [
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

const softSkillsData: SoftSkillItem[] = [
  {
    number: '01',
    category: 'PROBLEM SOLVING',
    tag: 'ROOT-CAUSE RESOLUTION',
    headline: 'Relentless Troubleshooting & Root-Cause Elimination',
    summary: 'Refuses to walk away from broken code, failing builds, or cryptic runtime bugs. Systematically isolates faults, debugs execution traces, and iterates persistently until an optimal, production-grade solution is deployed.',
    traits: ['Root-Cause Analysis', 'Deep Trace Debugging', 'Edge-Case Resolution', 'Syntax & Logic Repair', 'Resilient Architecture'],
  },
  {
    number: '02',
    category: 'PERSISTENCE & DETERMINATION',
    tag: 'HIGH-STAMINA GRIT',
    headline: 'Unyielding Tenacity Through High-Friction Challenges',
    summary: 'Demonstrates exceptional endurance and mental resilience when facing tough blockers and frustrating debugging cycles. Converts friction into relentless forward momentum to ship robust, polished deliverables.',
    traits: ['High Frustration Tolerance', 'Tenacious Iteration Cycle', 'Unbroken Focus', 'Sprint Endurance', 'Flawless Delivery Drive'],
  },
  {
    number: '03',
    category: 'CURIOSITY & LEARNING MINDSET',
    tag: 'MULTI-DISCIPLINARY EXPLORER',
    headline: 'Expansive Intellectual Range & Rapid Stack Mastery',
    summary: 'Refuses to stay siloed in a single domain. Continuously dives deep and explores across C++, Python, DBMS, DevOps pipelines, AI/ML models, GitHub workflows, Modern Web Engineering, and UI/UX design.',
    traits: ['C++ & Python', 'DBMS & Data Models', 'DevOps & Automation', 'Applied AI & ML', 'Web Engineering', 'UI/UX Precision'],
  },
];

export const Toolkit: React.FC = () => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'soft'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="editorial-section border-b transition-colors duration-500"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
      <div className="editorial-container">
        {/* Header */}
        <div
          className="border-b pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <span
              className="font-mono text-xs uppercase tracking-widest font-semibold block mb-2"
              style={{ color: 'var(--accent-primary)' }}
            >
              {isCyber ? '// 05_TECHNICAL_&_COGNITIVE_TOOLKIT' : '[ 05 / TECHNICAL & COGNITIVE TOOLKIT ]'}
            </span>
            <h2
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              SKILLS &{' '}<br />
              <span style={{ color: 'var(--text-muted)' }}>ENGINEERING ARSENAL</span>
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Comprehensive inventory of technical stacks, engineering paradigms, and high-stamina problem-solving attributes.
            </p>

            {/* Filter Tabs */}
            <div
              className="inline-flex p-1 rounded-sm border gap-1 self-start md:self-end backdrop-blur-md"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
            >
              {[
                { id: 'all', label: 'ALL SKILLS', count: technicalCategories.length + softSkillsData.length },
                { id: 'technical', label: 'TECHNICAL STACK', count: technicalCategories.length },
                { id: 'soft', label: 'SOFT & COGNITIVE SKILLS', count: softSkillsData.length },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 rounded-xs flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'font-bold shadow-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      background: isActive ? 'var(--accent-primary)' : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                      border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.2 rounded-full"
                      style={{
                        background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--border-subtle)',
                        color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── SECTION 1: SOFT & COGNITIVE SKILLS HIGHLIGHT ─── */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'soft') && (
            <motion.div
              key="soft-skills-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center"
                    style={{
                      background: 'rgba(var(--accent-primary-rgb, 200, 92, 59), 0.12)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--accent-primary)',
                    }}
                  >
                    <Brain size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      CORE COGNITIVE & SOFT SKILLS
                    </h3>
                    <p className="font-mono text-[11px] tracking-wider uppercase" style={{ color: 'var(--accent-primary)' }}>
                      {isCyber ? '// PROBLEM-SOLVING & EXECUTION TRAITS' : 'Problem-Solving & Execution Traits'}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  3 CORE ATTRIBUTES
                </div>
              </div>

              {/* Clean Soft Skills Cards Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {softSkillsData.map((skill, i) => {
                  const isHovered = hoveredSkill === skill.category;

                  return (
                    <motion.div
                      key={skill.category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      onMouseEnter={() => setHoveredSkill(skill.category)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="group flex flex-col justify-between rounded-sm relative overflow-hidden transition-all duration-300 cursor-pointer"
                      style={{
                        background: 'var(--card-bg)',
                        border: isHovered ? `1px solid var(--accent-primary)` : `1px solid var(--card-border)`,
                        backdropFilter: isCyber ? 'blur(20px)' : 'none',
                        padding: '1.6rem 1.75rem',
                        boxShadow: isHovered
                          ? (isCyber ? '0 8px 24px rgba(0, 229, 255, 0.15)' : '0 8px 20px rgba(0, 0, 0, 0.06)')
                          : 'none',
                      }}
                    >
                      {/* Subtle hover accent corner */}
                      {isCyber && (
                        <div
                          className="absolute top-0 right-0 w-20 h-20 pointer-events-none transition-opacity duration-300"
                          style={{
                            opacity: isHovered ? 1 : 0.1,
                            background: 'radial-gradient(circle at top right, rgba(0, 229, 255, 0.15), transparent 70%)',
                          }}
                        />
                      )}

                      <div>
                        {/* Header with Number and clean dot indicator matching technical cards */}
                        <div
                          className="flex items-center justify-between border-b pb-4 mb-4"
                          style={{ borderColor: 'var(--border-subtle)' }}
                        >
                          <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-primary)' }}>
                            {skill.number}
                          </span>
                          <span
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                              background: isHovered ? 'var(--accent-primary)' : 'var(--text-primary)',
                              boxShadow: isCyber && isHovered ? '0 0 8px rgba(0, 229, 255, 0.8)' : (isCyber ? '0 0 6px rgba(0, 229, 255, 0.5)' : 'none'),
                            }}
                          />
                        </div>

                        {/* Category Title */}
                        <h4 className="font-display text-lg font-bold mb-2 uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                          {skill.category}
                        </h4>

                        {/* Clean Summary */}
                        <p className="text-xs leading-relaxed mb-6 font-normal" style={{ color: 'var(--text-muted)' }}>
                          {skill.summary}
                        </p>

                        {/* Clean List of Traits */}
                        <ul className="space-y-2 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
                          {skill.traits.map((trait) => (
                            <li
                              key={trait}
                              className="font-mono text-xs flex items-center gap-2 group/item"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              <span
                                className="font-bold opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all"
                                style={{ color: 'var(--accent-primary)' }}
                              >
                                {isCyber ? '▶' : '→'}
                              </span>
                              <span className="group-hover/item:text-[var(--accent-primary)] transition-colors">{trait}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Clean Footer without rating numbers */}
                      <div
                        className="mt-8 pt-4 border-t text-[10px] font-mono uppercase tracking-wider flex justify-between"
                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                      >
                        <span>{skill.traits.length} CORE ATTRIBUTES</span>
                        <span style={{ color: isHovered ? 'var(--accent-primary)' : 'inherit' }}>CORE STRENGTH</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── SECTION 2: TECHNICAL STACK ─── */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'technical') && (
            <motion.div
              key="technical-skills-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center"
                    style={{
                      background: 'rgba(var(--accent-primary-rgb, 200, 92, 59), 0.12)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--accent-primary)',
                    }}
                  >
                    <Code2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      TECHNICAL STACK & FRAMEWORKS
                    </h3>
                    <p className="font-mono text-[11px] tracking-wider uppercase" style={{ color: 'var(--accent-primary)' }}>
                      {isCyber ? '// PRODUCTION-GRADE TOOLS & LIBRARIES' : 'Production-Grade Tools & Libraries'}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  4 CORE DOMAINS
                </div>
              </div>

              {/* 4-Column Technical Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {technicalCategories.map((cat, i) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="flex flex-col justify-between rounded-sm relative overflow-hidden transition-all duration-300 group hover:border-[var(--accent-primary)] cursor-pointer"
                    style={{
                      background: 'var(--card-bg)',
                      border: `1px solid var(--card-border)`,
                      backdropFilter: isCyber ? 'blur(20px)' : 'none',
                      padding: '1.6rem 1.75rem',
                    }}
                  >
                    {/* Cyber accent glow corner */}
                    {isCyber && (
                      <div
                        className="absolute top-0 right-0 w-20 h-20 pointer-events-none group-hover:opacity-100 opacity-20 transition-opacity"
                        style={{
                          background: 'radial-gradient(circle at top right, rgba(0, 229, 255, 0.15), transparent 70%)',
                        }}
                      />
                    )}

                    <div>
                      <div
                        className="flex items-center justify-between border-b pb-4 mb-4"
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

                      <h4 className="font-display text-lg font-bold mb-2 uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {cat.category}
                      </h4>

                      <p className="text-xs leading-relaxed mb-6 font-normal" style={{ color: 'var(--text-muted)' }}>
                        {cat.summary}
                      </p>

                      <ul className="space-y-2 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
                        {cat.items.map((item) => (
                          <li
                            key={item}
                            className="font-mono text-xs flex items-center gap-2 group/item"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            <span
                              className="font-bold opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all"
                              style={{ color: 'var(--accent-primary)' }}
                            >
                              {isCyber ? '▶' : '→'}
                            </span>
                            <span className="group-hover/item:text-[var(--accent-primary)] transition-colors">{item}</span>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

