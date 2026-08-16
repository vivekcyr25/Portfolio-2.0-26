import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[420px] relative"
    >
      <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-sm p-8 shadow-xl overflow-hidden">
        
        {/* Content */}
        <div className="relative z-10 text-[#F3F0E8]">
          <div className="flex flex-col items-center mb-8 text-center">
            
            {/* Minimal Logo Stamp */}
            <div className="mb-4 w-10 h-10 bg-[#FAF8F4] rounded-sm flex items-center justify-center border border-[#D7D1C6]">
              <span className="font-display font-bold text-sm text-[#111111]">VS</span>
            </div>
            
            <h1 className="text-2xl font-bold font-display text-[#F3F0E8] tracking-tight mb-2 uppercase">
              {title}
            </h1>
            <p className="text-xs font-mono text-[#9E9A91] uppercase tracking-wider">
              {subtitle}
            </p>
          </div>

          {children}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#262626] text-center">
            <p className="text-[10px] font-mono text-[#706D66] leading-relaxed uppercase tracking-widest">
              By continuing, you agree to our <br />
              <Link to="/legal/terms" className="text-[#9E9A91] hover:text-[#C85C3B] transition-colors underline">Terms</Link>, 
              <Link to="/legal/privacy" className="mx-1.5 text-[#9E9A91] hover:text-[#C85C3B] transition-colors underline">Privacy</Link>
              & <Link to="/legal/ai-governance" className="text-[#9E9A91] hover:text-[#C85C3B] transition-colors underline">AI Gov</Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer Meta */}
      <div className="mt-6 flex justify-center items-center gap-4 px-2 opacity-60">
        <span className="text-[9px] font-mono text-[#706D66] tracking-wider uppercase">AUTHORIZED SESSION</span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#C85C3B]" />
        <span className="text-[9px] font-mono text-[#706D66] tracking-wider uppercase">2026 EDITION</span>
      </div>
    </motion.div>
  );
};

export default AuthCard;
