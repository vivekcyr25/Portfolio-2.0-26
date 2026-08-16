import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioModeProvider } from './context/PortfolioModeContext';
import ProtectedRoute from './components/ProtectedRoute';
import GlobalErrorBoundary from './components/common/GlobalErrorBoundary';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Dashboard Sub-pages
const Workspace = lazy(() => import('./pages/dashboard/Workspace'));
const Portfolios = lazy(() => import('./pages/dashboard/Portfolios'));
const Deployments = lazy(() => import('./pages/dashboard/Deployments'));
const Analytics = lazy(() => import('./pages/dashboard/Analytics'));
const Config = lazy(() => import('./pages/dashboard/Config'));
const Preview = lazy(() => import('./pages/Preview'));

// Legal Pages
const Terms = lazy(() => import('./pages/legal/Terms'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const AIGovernance = lazy(() => import('./pages/legal/AIGovernance'));

const LoadingScreen = () => (
  <div className="min-h-screen bg-[#F3F0E8] flex flex-col items-center justify-center font-display">
    <div className="relative">
      <div className="w-12 h-12 border-2 border-[#D7D1C6] rounded-full absolute inset-0" />
      <div className="w-12 h-12 border-2 border-[#C85C3B] border-t-transparent rounded-full animate-spin" />
    </div>
    <div className="mt-8 space-y-1.5 text-center">
      <p className="text-[#111111] font-bold text-sm tracking-wider uppercase">VIVEK SHARMA</p>
      <p className="text-[#706D66] text-xs font-mono uppercase tracking-widest">Loading Portfolio...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <PortfolioModeProvider>
            <Router basename={import.meta.env.BASE_URL}>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  >
                    <Route index element={<Navigate to="workspace" replace />} />
                    <Route path="workspace" element={<Workspace />} />
                    <Route path="portfolios" element={<Portfolios />} />
                    <Route path="deployments" element={<Deployments />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="config" element={<Config />} />
                  </Route>
                  <Route path="/preview/:portfolioId" element={<Preview />} />
                  
                  {/* Legal Routes */}
                  <Route path="/legal/terms" element={<Terms />} />
                  <Route path="/legal/privacy" element={<Privacy />} />
                  <Route path="/legal/ai-governance" element={<AIGovernance />} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </Router>
          </PortfolioModeProvider>
        </ThemeProvider>
      </AuthProvider>
    </GlobalErrorBoundary>
  );
};

export default App;
