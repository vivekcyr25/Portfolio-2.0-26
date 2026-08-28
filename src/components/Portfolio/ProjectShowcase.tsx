import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Layers, Cpu, Code2, Database } from 'lucide-react';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

export interface ProjectItem {
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  problem: string;
  impact: string;
  image: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

const BASE = import.meta.env.BASE_URL;

const projects: ProjectItem[] = [
  {
    number: '01',
    title: 'AI VIDEO RESTORATION PIPELINE',
    category: 'Computer Vision & Deep Learning',
    tagline: 'End-to-end multi-stage neural video enhancement & reconstruction',
    description: 'An automated computer vision pipeline that performs 4x super-resolution, face restoration, frame interpolation, and noise reduction on degraded archival and low-bitrate video footage.',
    tech: ['Python', 'PyTorch', 'Real-ESRGAN', 'OpenCV', 'FFmpeg', 'CUDA'],
    problem: 'Standard upscaling algorithms introduce severe blur and artifacts when processing low-resolution, noisy archival media.',
    impact: 'Achieves high perceptual PSNR/SSIM scores and restores facial micro-details while maintaining temporal consistency across frames.',
    image: `${BASE}projects/ai-video-restoration.jpg`,
    github: 'https://github.com/vivekcyr25/AI-Video-Restoration-Pipeline',
    featured: true,
  },
  {
    number: '02',
    title: 'PORTFOLIO MAKER AI & PERSONAL PORTFOLIO',
    category: 'Fullstack AI Application',
    tagline: 'Dynamic portfolio architect with live AI assistance & cloud sync',
    description: 'A comprehensive web platform that empowers developers to create, customize, and deploy bespoke portfolios powered by real-time AI contextual assistance, theme generation, and Firebase identity management.',
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Firebase Auth', 'Firestore', 'Gemini API'],
    problem: 'Developers spend dozens of hours wrestling with boilerplate setups instead of showcasing their actual achievements.',
    impact: 'Reduces portfolio creation time to under 5 minutes with modular section wizards and live editable previews.',
    image: `${BASE}projects/project-high-tech.png`,
    github: 'https://github.com/vivekcyr25/Personal-website',
    live: 'https://vivekcyr25.github.io/Personal-website/',
    featured: true,
  },
  {
    number: '03',
    title: 'AIPS — ACADEMIC INTELLIGENCE SYSTEM',
    category: 'Web System & Analytics',
    tagline: 'Intelligent curriculum tracking and academic performance prediction',
    description: 'An academic dashboard and predictive analysis platform engineered for higher education students to monitor course progression, calculate target GPAs, and visualize syllabus coverage with local persistence.',
    tech: ['React', 'TypeScript', 'Node.js', 'Chart.js', 'Tailwind CSS', 'REST APIs'],
    problem: 'Fragmented university portals fail to provide actionable performance trajectory insights to students.',
    impact: 'Provides unified visual analytics, attendance contingency alerts, and automated grade milestone calculators.',
    image: `${BASE}projects/student-portal.png`,
    github: 'https://github.com/vivekcyr25/APIS-Academic-Intelligence-System',
    live: 'https://vivekcyr25.github.io/APIS-Academic-Intelligence-System/',
    featured: true,
  },
  {
    number: '04',
    title: 'SPACE PORTFOLIO EXPERIENCE',
    category: 'Creative Frontend Engineering',
    tagline: 'Immersive interactive 3D audio-visual web experience',
    description: 'An experimental creative development project exploring custom shaders, interactive physics particle fields, WebGL canvases, and spatial audio feedback in the browser.',
    tech: ['React', 'Three.js / WebGL', 'Framer Motion', 'Web Audio API', 'CSS Grid'],
    problem: 'Standard static portfolios lack tactile interactivity and memorable creative direction.',
    impact: 'Showcases advanced client-side render optimizations, 60fps canvas performance, and high-engagement user interactions.',
    image: `${BASE}projects/project-3.png`,
    github: 'https://github.com/vivekcyr25/First-Portfolio',
    live: 'https://vivekcyr25.github.io/First-Portfolio/',
    featured: false,
  },
  {
    number: '05',
    title: 'MODULAR LIBRARY MANAGEMENT SYSTEM',
    category: 'Python OOP & Databases',
    tagline: 'Modular inventory architecture for cataloging & automated records',
    description: 'A modular Python-based database and inventory architecture designed for cataloging, book issuance tracking, member records, and automated query management.',
    tech: ['Python', 'Tkinter', 'SQLite3', 'OOP Architecture', 'Data Structures'],
    problem: 'Manual book and inventory logging leads to bookkeeping discrepancies and slow record lookups.',
    impact: 'Automates issuance workflows, tracks transaction histories, and eliminates physical log overhead.',
    image: `${BASE}projects/library-management.svg`,
    github: 'https://github.com/vivekcyr25/Python-small-project-LMS-',
    featured: false,
  },
];

export const ProjectShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  const categories = ['ALL', 'AI & CV', 'FULLSTACK WEB', 'SYSTEMS & APPS'];

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter(p => {
        if (activeCategory === 'AI & CV') return p.category.includes('Vision') || p.category.includes('AI');
        if (activeCategory === 'FULLSTACK WEB') return p.category.includes('Fullstack') || p.category.includes('Analytics') || p.category.includes('Web');
        if (activeCategory === 'SYSTEMS & APPS') return p.category.includes('System') || p.category.includes('Creative') || p.category.includes('Python');
        return true;
      });

  return (
    <section
      id="work"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{
        background: isCyber
          ? '#060D1A'
          : 'linear-gradient(180deg, #FAF8F4 0%, #302C28 5%, #181818 12%, #111111 50%, #181818 88%, #302C28 95%, #F3F0E8 100%)',
        borderColor: isCyber ? 'var(--border-dark)' : 'transparent',
        color: isCyber ? '#E8F4FF' : '#F3F0E8',
      }}
    >
      {/* Backgrounds */}
      {isCyber ? (
        <>
          <div className="absolute inset-0 cyber-grid-overlay" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }} />
        </>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85C3B]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FAF8F4]/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="editorial-container relative z-10">
        {/* Section Header */}
        <div
          className="border-b pb-10 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
          style={{ borderColor: isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.1)' : '#2A2A2A' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="font-mono text-xs uppercase tracking-widest font-semibold"
                style={{ color: 'var(--accent-primary)' }}
              >
                {isCyber ? '// 02_SELECTED_WORK' : '[ 02 / SELECTED WORK ]'}
              </span>
            </div>
            <h2
              className="font-display font-bold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight"
              style={{
                color: isCyber ? '#E8F4FF' : '#F3F0E8',
                textShadow: isCyber ? '0 0 40px rgba(0, 229, 255, 0.15)' : 'none',
              }}
            >
              THINGS I'VE{' '}<br />
              <span style={{ color: isCyber ? '#7090B0' : '#706D66' }}>BUILT & SHIPPED</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: isCyber ? '#7090B0' : '#9E9A91' }}>
              A curated selection of machine learning pipelines, fullstack tools, and digital platforms built with focus on engineering rigor and usability.
            </p>
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="font-mono text-[11px] px-3.5 py-1.5 rounded-sm uppercase tracking-wider transition-all"
                  style={activeCategory === cat
                    ? {
                        background: 'var(--accent-primary)',
                        color: isCyber ? '#080B14' : 'white',
                        boxShadow: isCyber ? '0 0 12px rgba(0, 229, 255, 0.4)' : 'none',
                      }
                    : {
                        border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.2)' : '#333333'}`,
                        color: isCyber ? '#7090B0' : '#9E9A91',
                      }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-16 md:space-y-24">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.article
                key={project.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group border-t pt-12"
                style={{ borderColor: isCyber ? 'rgba(0, 229, 255, 0.1)' : '#262626' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                  {/* Left: Info */}
                  <div className={`lg:col-span-6 flex flex-col justify-between ${!isEven ? 'lg:order-2' : ''}`}>
                    <div>
                      <div
                        className="flex items-center justify-between border-b pb-4 mb-6"
                        style={{ borderColor: isCyber ? 'rgba(0, 229, 255, 0.1)' : '#262626' }}
                      >
                        <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                          {isCyber ? `${project.number}_` : project.number}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: isCyber ? '#7090B0' : '#9E9A91' }}>
                          {project.category}
                        </span>
                      </div>

                      <h3
                        className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 uppercase transition-colors"
                        style={{ color: isCyber ? '#E8F4FF' : '#F3F0E8' }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-sm md:text-base font-medium mb-6" style={{ color: 'var(--accent-primary)' }}>
                        {project.tagline}
                      </p>

                      <p className="text-sm md:text-base leading-relaxed mb-6 font-normal" style={{ color: isCyber ? '#7090B0' : '#9E9A91' }}>
                        {project.description}
                      </p>

                      {/* Problem/Impact */}
                      <div
                        className="p-5 rounded-sm space-y-4 mb-8"
                        style={{
                          background: isCyber ? 'rgba(0, 229, 255, 0.04)' : '#181818',
                          border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.12)' : '#2A2A2A'}`,
                          backdropFilter: isCyber ? 'blur(10px)' : 'none',
                        }}
                      >
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest block mb-1" style={{ color: isCyber ? '#7090B0' : '#706D66' }}>
                            THE CHALLENGE
                          </span>
                          <p className="text-xs leading-relaxed" style={{ color: isCyber ? '#C0D8F0' : '#E5E2DA' }}>{project.problem}</p>
                        </div>
                        <div className="border-t pt-3" style={{ borderColor: isCyber ? 'rgba(0, 229, 255, 0.08)' : '#262626' }}>
                          <span className="font-mono text-[10px] uppercase tracking-widest block mb-1" style={{ color: 'var(--accent-primary)' }}>
                            ENGINEERING OUTCOME
                          </span>
                          <p className="text-xs leading-relaxed" style={{ color: isCyber ? '#C0D8F0' : '#E5E2DA' }}>{project.impact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tech & Buttons */}
                    <div>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm"
                            style={{
                              background: isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.06)' : '#1F1F1F',
                              color: isCyber ? 'var(--accent-primary)' : '#D7D1C6',
                              border: `1px solid ${isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.18)' : '#333333'}`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-sm group/btn transition-all"
                            style={{
                              background: isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.1)' : '#FAF8F4',
                              color: isCyber ? 'var(--accent-primary)' : '#111111',
                              border: isCyber ? '1px solid rgba(var(--theme-primary-rgb, 0, 229, 255), 0.3)' : 'none',
                            }}
                          >
                            <i className="fab fa-github text-xs" />
                            <span>GITHUB REPO</span>
                            <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-sm group/btn transition-all"
                            style={{
                              border: `1px solid ${isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.25)' : '#3A3A3A'}`,
                              color: isCyber ? '#E8F4FF' : '#F3F0E8',
                            }}
                          >
                            <ExternalLink size={14} />
                            <span>LIVE DEMO</span>
                            <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Visual Card with Real Project Screenshot Thumbnail */}
                  <div className={`lg:col-span-6 ${!isEven ? 'lg:order-1' : ''}`}>
                    <div
                      className="aspect-[16/11] w-full rounded-sm overflow-hidden p-6 md:p-8 flex flex-col justify-between relative group/canvas transition-all"
                      style={{
                        background: isCyber ? 'rgba(0, 14, 30, 0.75)' : '#181818',
                        border: `1px solid ${isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.25)' : '#2A2A2A'}`,
                        backdropFilter: isCyber ? 'blur(20px)' : 'none',
                        boxShadow: isCyber ? '0 0 40px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.12)' : 'none',
                      }}
                    >
                      {/* Background Project Image Thumbnail with Blur & Overlay */}
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover filter brightness-[0.4] group-hover/canvas:brightness-[0.7] group-hover/canvas:scale-105 transition-all duration-700 select-none"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: isCyber
                              ? 'linear-gradient(180deg, rgba(6, 13, 26, 0.85) 0%, rgba(6, 13, 26, 0.4) 50%, rgba(6, 13, 26, 0.95) 100%)'
                              : 'linear-gradient(180deg, rgba(24, 24, 24, 0.85) 0%, rgba(24, 24, 24, 0.4) 50%, rgba(24, 24, 24, 0.95) 100%)',
                          }}
                        />
                      </div>

                      {/* Cyber grid in card */}
                      {isCyber && <div className="absolute inset-0 cyber-grid-overlay opacity-40 z-[1] pointer-events-none" />}

                      {/* Header bar on top of image */}
                      <div
                        className="flex justify-between items-center text-xs font-mono border-b pb-3 relative z-10"
                        style={{ borderColor: isCyber ? 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.2)' : '#333333', color: isCyber ? '#7090B0' : '#706D66' }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)', boxShadow: isCyber ? '0 0 8px var(--accent-primary)' : 'none' }} />
                          <span className="font-bold text-[11px]" style={{ color: isCyber ? 'var(--accent-primary)' : '#FAF8F4' }}>
                            {isCyber ? `NODE_${project.number} // SPEC` : `DEPLOYED BUILD // ${project.number}`}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm" style={{ background: isCyber ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)', color: isCyber ? 'var(--accent-primary)' : '#FAF8F4' }}>
                          VERIFIED
                        </span>
                      </div>

                      {/* Center Content */}
                      <div className="my-auto py-6 flex flex-col items-center justify-center text-center relative z-10">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-500 group-hover/canvas:scale-110 backdrop-blur-md"
                          style={{
                            background: isCyber ? 'rgba(0, 229, 255, 0.15)' : 'rgba(34, 34, 34, 0.85)',
                            border: `1px solid ${isCyber ? 'rgba(0, 229, 255, 0.4)' : '#444444'}`,
                            boxShadow: isCyber ? '0 0 25px rgba(0, 229, 255, 0.3)' : 'none',
                          }}
                        >
                          {project.category.includes('Vision') ? (
                            <Cpu size={24} style={{ color: 'var(--accent-primary)' }} />
                          ) : project.category.includes('Fullstack') ? (
                            <Sparkles size={24} style={{ color: 'var(--accent-primary)' }} />
                          ) : project.category.includes('Python') ? (
                            <Database size={24} style={{ color: 'var(--accent-primary)' }} />
                          ) : (
                            <Layers size={24} style={{ color: 'var(--accent-primary)' }} />
                          )}
                        </div>
                        <span className="font-display font-bold text-xl sm:text-2xl mb-1 text-white drop-shadow-md">
                          {project.title}
                        </span>
                        <span className="font-mono text-xs tracking-wider uppercase drop-shadow-sm font-semibold" style={{ color: isCyber ? 'var(--accent-primary)' : '#D7D1C6' }}>
                          {project.tech.slice(0, 3).join(' · ')}
                        </span>
                      </div>

                      {/* Bottom Footer Info */}
                      <div
                        className="pt-3 border-t grid grid-cols-2 gap-4 text-xs font-mono relative z-10"
                        style={{ borderColor: isCyber ? 'rgba(0, 229, 255, 0.15)' : '#333333', color: isCyber ? '#7090B0' : '#706D66' }}
                      >
                        <div>
                          <span className="block text-[9px] uppercase tracking-widest" style={{ color: isCyber ? '#7090B0' : '#9E9A91' }}>SYSTEM TYPE</span>
                          <span style={{ color: isCyber ? '#E8F4FF' : '#F3F0E8' }} className="font-medium text-[11px]">{project.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[9px] uppercase tracking-widest" style={{ color: isCyber ? '#7090B0' : '#9E9A91' }}>ACCESS REPO</span>
                          <span className="font-medium text-[11px]" style={{ color: 'var(--accent-primary)' }}>
                            {project.live ? 'LIVE + OPEN SOURCE' : 'OPEN SOURCE'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
