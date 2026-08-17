import React, { Suspense, lazy } from 'react';
import { Navbar } from '../components/Portfolio/Navbar';
import { Hero } from '../components/Portfolio/Hero';
import { Stats } from '../components/Portfolio/Stats';
import { ProjectShowcase } from '../components/Portfolio/ProjectShowcase';
import { Experience } from '../components/Portfolio/Experience';
import { Toolkit } from '../components/Portfolio/Toolkit';
import { BuildProcess } from '../components/Portfolio/BuildProcess';
import { About } from '../components/Portfolio/About';
import { Contact } from '../components/Portfolio/Contact';
import { CyberTransition } from '../components/Portfolio/CyberTransition';
import { DocumentHead } from '../components/Portfolio/DocumentHead';
import { PortfolioModeProvider, usePortfolioMode } from '../context/PortfolioModeContext';
import { useScrollTextStretch } from '../hooks/useScrollTextStretch';

// Lazy load AI Assistant
const NeuralAssistant = lazy(() => import('../components/AI/NeuralAssistant'));

const HomeContent: React.FC = () => {
  const { mode } = usePortfolioMode();
  useScrollTextStretch();

  return (
    <div
      className="min-h-screen overflow-x-hidden selection:text-white relative"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        '--tw-selection-color': 'var(--accent-primary)',
      } as React.CSSProperties}
    >
      {/* Dynamic <head> management — fonts, favicon, title, theme-color */}
      <DocumentHead />

      {/* Dramatic mode-switch overlay animation */}
      <CyberTransition />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <Stats />
        <ProjectShowcase />
        <Experience />
        <Toolkit />
        <BuildProcess />
        <About />
      </main>

      {/* Contact & Footer */}
      <Contact />

      {/* AI Assistant */}
      <Suspense fallback={null}>
        <NeuralAssistant />
      </Suspense>
    </div>
  );
};

const Home: React.FC = () => {
  return <HomeContent />;
};

export default Home;
