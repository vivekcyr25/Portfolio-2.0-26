import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import OAuthButton from '../components/auth/OAuthButton';

const Login: React.FC = () => {
  const { loginWithGoogle, loginWithGithub, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [internalState, setInternalState] = useState<'IDLE' | 'AUTH' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [loadingStep, setLoadingStep] = useState('');

  const loadingSteps = [
    "Establishing handshake...",
    "Authenticating credentials...",
    "Verifying security clearances...",
    "Synchronizing workspace..."
  ];

  useEffect(() => {
    if (user && !authLoading) {
      setInternalState('SUCCESS');
      let step = 0;
      const interval = setInterval(() => {
        if (step < loadingSteps.length) {
          setLoadingStep(loadingSteps[step]);
          step++;
        } else {
          clearInterval(interval);
          navigate('/dashboard');
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [user, authLoading, navigate]);

  const handleOAuth = async (provider: 'google' | 'github') => {
    setInternalState('AUTH');
    setLoadingStep("Connecting to " + provider + "...");
    try {
      if (provider === 'google') await loginWithGoogle();
      else await loginWithGithub();
    } catch (err) {
      setInternalState('FAILED');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F0E8] text-[#111111] font-body flex items-center justify-center relative overflow-hidden px-6">
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 inset-x-0 h-[1px] bg-[#D7D1C6]" />
        <div className="absolute bottom-1/4 inset-x-0 h-[1px] bg-[#D7D1C6]" />
        <div className="absolute left-1/3 inset-y-0 w-[1px] bg-[#D7D1C6]" />
        <div className="absolute right-1/3 inset-y-0 w-[1px] bg-[#D7D1C6]" />
      </div>

      {/* Main Content */}
      <AuthCard 
        title={internalState === 'SUCCESS' ? 'Uplink Synced' : 'Authorized Access'}
        subtitle={internalState === 'SUCCESS' ? 'Loading developer workspace' : 'Connect credentials to access workspace dashboard'}
      >
        <AnimatePresence mode="wait">
          {internalState === 'AUTH' || internalState === 'SUCCESS' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="flex flex-col items-center py-12"
            >
              <div className="relative mb-8">
                <div className="w-12 h-12 border-2 border-[#2A2A2A] rounded-full absolute inset-0" />
                <div className="w-12 h-12 border-2 border-[#C85C3B] border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="font-helix text-xs text-[#C85C3B] tracking-wider uppercase animate-pulse">
                {loadingStep}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="space-y-2.5">
                <OAuthButton 
                  provider="google" 
                  onClick={() => handleOAuth('google')} 
                  isLoading={authLoading}
                />
                <OAuthButton 
                  provider="github" 
                  onClick={() => handleOAuth('github')} 
                  isLoading={authLoading}
                />
              </div>

              <div className="relative py-4 flex items-center justify-center gap-4">
                <div className="flex-1 h-[1px] bg-[#2A2A2A]" />
                <span className="font-helix text-[10px] uppercase tracking-wider text-[#706D66]">OR</span>
                <div className="flex-1 h-[1px] bg-[#2A2A2A]" />
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <input 
                    disabled
                    type="text" 
                    placeholder="Architect Key Access" 
                    className="w-full bg-[#181818] border border-[#2A2A2A] rounded-sm px-4 py-3 text-xs text-[#706D66] placeholder:text-[#3D3D3D] focus:outline-none transition-all cursor-not-allowed"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C85C3B]/60 animate-pulse" />
                    <span className="font-helix text-[8px] text-[#C85C3B] uppercase tracking-widest">Locked</span>
                  </div>
                </div>
                
                <p className="text-center font-helix text-[9px] text-[#706D66] uppercase tracking-wider">
                  Uplink token verification active
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AuthCard>

      {/* Background Micro-details */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="flex items-center gap-4 opacity-50 font-helix text-xs text-[#706D66] tracking-widest uppercase">
          <div className="h-[1px] w-12 bg-[#706D66]" />
          <span>VIVEK SHARMA · SECURE LINK</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
