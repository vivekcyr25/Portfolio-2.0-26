import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Settings, 
  Activity, 
  LogOut,
  User as UserIcon,
  Home as HomeIcon,
  Zap,
  Layout,
  Grid,
  Server
} from 'lucide-react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import SecurityBadge from '../components/SecurityBadge';

const navLinks = [
  { icon: LayoutDashboard, label: 'Workspace',   path: 'workspace' },
  { icon: Grid,            label: 'Portfolios',  path: 'portfolios' },
  { icon: Server,          label: 'Deployments', path: 'deployments' },
  { icon: Activity,        label: 'Analytics',   path: 'analytics' },
  { icon: Settings,        label: 'Config',      path: 'config' },
];

const topLinks = [
  { icon: HomeIcon, label: 'Home',      path: '/' },
  { icon: Zap,      label: 'Systems',   path: '/#systems' },
  { icon: Layout,   label: 'Workspace', path: '/dashboard/workspace' },
];

const Dashboard: React.FC = () => {
  const { user, logout, hasIdentity } = useAuth();

  return (
    <div
      className="min-h-screen flex overflow-hidden relative"
      data-mode="cyber"
      style={{
        background: 'var(--theme-bg, #04080F)',
        color: 'var(--theme-text, #E8F4FF)',
        fontFamily: "'Helix', 'Plus Jakarta Sans', 'Space Grotesk', sans-serif"
      }}
    >
      {/* ── Cyber Grid Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(var(--theme-primary-rgb, 0, 229, 255), 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--theme-primary-rgb, 0, 229, 255), 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(var(--theme-primary-rgb, 0, 229, 255), 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--theme-primary-rgb, 0, 229, 255), 0.02) 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />
        {/* Ambient glow blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse"
          style={{ background: 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.04)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse"
          style={{ background: 'rgba(var(--theme-secondary-rgb, 139, 92, 246), 0.03)', animationDelay: '2s' }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SIDEBAR
      ═══════════════════════════════════════════════════════════ */}
      <aside
        className="w-56 flex flex-col z-20 border-r"
        style={{
          background: 'rgba(4, 8, 15, 0.88)',
          backdropFilter: 'blur(24px)',
          borderColor: 'var(--theme-border, rgba(var(--theme-primary-rgb, 0, 229, 255), 0.15))',
        }}
      >
        {/* Brand */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--theme-border, rgba(var(--theme-primary-rgb, 0, 229, 255), 0.15))' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center font-display font-black text-sm"
              style={{
                background: 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.12)',
                border: '1px solid rgba(var(--theme-primary-rgb, 0, 229, 255), 0.4)',
                color: 'var(--theme-primary, #00E5FF)',
                boxShadow: '0 0 15px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.2)',
              }}
            >
              VS
            </div>
            <div>
              <span className="block font-display font-black text-[13px] tracking-[0.15em] text-white">NEURAL_OS</span>
              <span
                className="block font-helix text-[8px] tracking-[0.3em] uppercase"
                style={{ color: 'var(--theme-primary, #00E5FF)', opacity: 0.7 }}
              >
                VERSION_4.2.0
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group border font-helix text-[10px] tracking-widest uppercase ${
                  isActive
                    ? 'text-[var(--theme-primary,#00E5FF)] border-[rgba(var(--theme-primary-rgb,0,229,255),0.35)] bg-[rgba(var(--theme-primary-rgb,0,229,255),0.08)] shadow-[0_0_15px_rgba(var(--theme-primary-rgb,0,229,255),0.15)]'
                    : 'text-white/40 border-transparent hover:text-white hover:bg-[rgba(var(--theme-primary-rgb,0,229,255),0.05)] hover:border-[rgba(var(--theme-primary-rgb,0,229,255),0.2)]'
                }`
              }
            >
              <item.icon size={17} className="transition-transform group-hover:scale-110 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom area */}
        <div className="p-4 border-t space-y-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {/* Social links */}
          <div className="flex justify-around pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <a
              href="https://github.com/vivekcyr25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/vivek-sharma-2bba8b398/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-lg" />
            </a>
          </div>

          {/* Security badges */}
          <div className="space-y-2">
            <SecurityBadge type="FIREBASE" status="ACTIVE" />
            <SecurityBadge type="GEMINI" status="CONNECTED" />
            <SecurityBadge type="SYNC" status="SECURE" />
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-helix text-[10px] tracking-widest uppercase text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all group border border-transparent hover:border-red-500/20"
          >
            <LogOut size={17} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header */}
        <header
          className="h-14 px-6 flex items-center justify-between sticky top-0 z-30 border-b"
          style={{
            background: 'rgba(4, 8, 15, 0.78)',
            backdropFilter: 'blur(16px)',
            borderColor: 'var(--theme-border, rgba(var(--theme-primary-rgb, 0, 229, 255), 0.15))',
          }}
        >
          {/* Centre nav pill */}
          <div
            className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 p-1 rounded-full border"
            style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.07)' }}
          >
            {topLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-helix text-[9px] uppercase tracking-[0.2em] text-white/60 hover:text-white border border-transparent hover:bg-[rgba(var(--theme-primary-rgb,0,229,255),0.1)] hover:border-[rgba(var(--theme-primary-rgb,0,229,255),0.3)] transition-all"
              >
                <link.icon size={11} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right user info */}
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-display font-black text-[11px] text-white leading-none mb-0.5 whitespace-nowrap tracking-wider">
                {user?.displayName?.toUpperCase() || 'ANONYMOUS'}
              </p>
              <p
                className="font-helix text-[9px] leading-none tracking-[0.25em] uppercase"
                style={{ color: 'var(--theme-primary, #00E5FF)' }}
              >
                {hasIdentity ? 'ARCHITECT_V4' : 'GUEST_ARCHITECT'}
              </p>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden shrink-0 border-2"
              style={{
                background: 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.08)',
                borderColor: 'rgba(var(--theme-primary-rgb, 0, 229, 255), 0.35)',
                boxShadow: '0 0 12px rgba(var(--theme-primary-rgb, 0, 229, 255), 0.2)',
              }}
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={18} className="text-white/30" />
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 pb-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
