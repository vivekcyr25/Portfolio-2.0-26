import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import OAuthButton from '../components/auth/OAuthButton';

const Login: React.FC = () => {
  const { loginWithGoogle, loginWithGithub, loginAsGuest, loginWithArchitectKey, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [internalState, setInternalState] = useState<'IDLE' | 'AUTH' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [loadingStep, setLoadingStep] = useState('');
  const [architectKey, setArchitectKey] = useState('');
  const [keyError, setKeyError] = useState('');

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
      }, 500);
      return () => clearInterval(interval);
    }
  }, [user, authLoading, navigate]);

  const handleOAuth = async (provider: 'google' | 'github') => {
    setInternalState('AUTH');
    setLoadingStep("Connecting to " + provider + "...");
    try {
      if (provider === 'google') await loginWithGoogle();
      else await loginWithGithub();
    } catch (err: any) {
      setInternalState('FAILED');
    }
  };

  const handleGuestEntry = async () => {
    setInternalState('AUTH');
    setLoadingStep("Initializing Guest Architect session...");
    await loginAsGuest();
  };

  const handleKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!architectKey.trim()) {
      setKeyError('Please enter a key or codename');
      return;
    }
    setInternalState('AUTH');
    setLoadingStep("Verifying Architect key...");
    await loginWithArchitectKey(architectKey.trim());
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
        subtitle={internalState === 'SUCCESS' ? 'Loading developer workspace' : 'Connect credentials or enter as guest architect'}
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

              {internalState === 'FAILED' && (
                <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/30 text-center space-y-2">
                  <p className="font-helix text-[10px] text-red-600 uppercase tracking-wider">
                    OAuth blocked or unauthorized domain
                  </p>
                  <button
                    onClick={handleGuestEntry}
                    className="w-full py-2 bg-[#C85C3B] text-white rounded-sm font-helix text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Continue as Guest Architect →
                  </button>
                </div>
              )}

              <div className="relative py-3 flex items-center justify-center gap-4">
                <div className="flex-1 h-[1px] bg-[#2A2A2A]" />
                <span className="font-helix text-[10px] uppercase tracking-wider text-[#706D66]">OR ACCESS VIA KEY</span>
                <div className="flex-1 h-[1px] bg-[#2A2A2A]" />
              </div>

              <form onSubmit={handleKeySubmit} className="space-y-3">
                <div className="relative">
                  <input 
                    type="text" 
                    value={architectKey}
                    onChange={(e) => { setArchitectKey(e.target.value); setKeyError(''); }}
                    placeholder="Enter Architect Key (e.g. ARCHITECT-2026)" 
                    className="w-full bg-[#181818] border border-[#2A2A2A] rounded-sm px-4 py-3 text-xs text-white placeholder:text-[#555555] focus:border-[#C85C3B] focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-sm bg-[#C85C3B] text-white font-helix text-[9px] font-bold uppercase tracking-wider hover:bg-[#B34D2E] transition-colors"
                  >
                    Unlock
                  </button>
                </div>

                {keyError && (
                  <p className="text-red-500 text-[10px] font-helix uppercase">{keyError}</p>
                )}

                <button
                  type="button"
                  onClick={handleGuestEntry}
                  className="w-full py-3 bg-[#181818] hover:bg-[#222222] border border-[#2A2A2A] hover:border-[#C85C3B]/50 text-white rounded-sm font-helix text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                  <span>Instant Guest Architect Access</span>
                </button>
                
                <p className="text-center font-helix text-[9px] text-[#706D66] uppercase tracking-wider">
                  Full Neural OS workspace features enabled
                </p>
              </form>
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
