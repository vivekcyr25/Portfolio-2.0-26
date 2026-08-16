import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Terminal, CornerDownLeft, ArrowRight, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { useAIStream } from '../../hooks/useAIStream';
import { useAuth } from '../../context/AuthContext';
import { portfolioKnowledge } from '../../config/portfolioKnowledge';
import { getLocalAIResponse } from '../../data/chatData';
import { usePortfolioMode } from '../../context/PortfolioModeContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time?: string;
}

const starterPrompts = [
  'What are Vivek’s top projects?',
  'Tell me about his work experience',
  'What is his technical toolkit?',
  'How can I get in touch with Vivek?',
];

const NeuralConsole: React.FC<{ onClose: () => void; portfolioState?: string; portfolioData?: any }> = ({
  onClose,
  portfolioState,
  portfolioData,
}) => {
  const { mode } = usePortfolioMode();
  const isCyber = mode === 'cyber';

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: isCyber
        ? 'NEURAL CORE ACTIVE. I am Vivek Sharma’s AI Assistant powered by Groq Llama 3.3. Query system projects, research, or experience.'
        : 'Hello! I am Vivek Sharma’s AI Assistant. Ask me anything about his projects, experience, computer vision research, or skills.',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const { stream } = useAIStream();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isThinking]);

  const handleSendPrompt = (text: string) => {
    setInput(text);
    processMessage(text);
  };

  const processMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isThinking) return;

    setInput('');
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [...prev, { role: 'user', content: userMessage, time: timeStr }]);
    setIsThinking(true);

    try {
      let assistantResponse = '';
      let receivedAnyToken = false;

      await stream(
        userMessage,
        {
          path: location.pathname,
          timestamp: new Date().toISOString(),
          userId: user?.uid || 'guest_visitor',
          platform: isCyber ? 'TI_CYBER_MATRIX_V4' : 'EDITORIAL_PORTFOLIO_V5',
          knowledge: portfolioKnowledge,
          portfolioState: portfolioState,
          portfolioData: portfolioData,
        },
        {
          onToken: (token) => {
            receivedAnyToken = true;
            setIsThinking(false);
            assistantResponse += token;

            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.role === 'assistant') {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: assistantResponse,
                  time: timeStr,
                };
                return updated;
              } else {
                return [...prev, { role: 'assistant', content: assistantResponse, time: timeStr }];
              }
            });
          },
          onError: () => {
            fallbackLocalResponse(userMessage, timeStr);
          },
          onDone: () => {
            setIsThinking(false);
          },
        }
      );

      if (!receivedAnyToken) {
        fallbackLocalResponse(userMessage, timeStr);
      }
    } catch {
      fallbackLocalResponse(userMessage, timeStr);
    } finally {
      setIsThinking(false);
    }
  };

  const fallbackLocalResponse = (query: string, timeStr: string) => {
    setIsThinking(false);
    const localResp = getLocalAIResponse(query, 'en');

    let answer = localResp;
    if (!answer) {
      const q = query.toLowerCase();
      if (q.includes('project') || q.includes('built') || q.includes('work')) {
        answer = 'Vivek engineered 4 key systems: 1) AI Video Restoration Pipeline (PyTorch/OpenCV), 2) Portfolio Maker AI (React 19/Firebase), 3) AIPS Academic Intelligence, and 4) Space Portfolio (Three.js).';
      } else if (q.includes('experience') || q.includes('job') || q.includes('intern') || q.includes('flyrank')) {
        answer = 'Vivek is a Frontend Engineering Intern at FlyRank AI (2026—Present) building high-performance UIs and real-time AI streaming systems.';
      } else if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
        answer = 'Core stack: React 19, TypeScript, Tailwind, Python, PyTorch, OpenCV, Node.js, and Firebase.';
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
        answer = 'Contact Vivek at viveklpu008@gmail.com, LinkedIn (linkedin.com/in/vivek-sharma-2bba8b398/), or GitHub (github.com/vivekcyr25).';
      } else {
        answer = 'Vivek Sharma is a Computer Science student at LPU and Frontend/AI Engineer building intelligent web experiences.';
      }
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: answer, time: timeStr }]);
  };

  return (
    <div
      className={`flex flex-col h-full select-text transition-colors relative ${
        isCyber
          ? 'bg-[#04080F] text-[#E8F4FF] font-helix'
          : 'bg-[#FAF8F4] text-[#111111] font-body'
      }`}
    >
      {/* Cyber Grid Background FX */}
      {isCyber && (
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>
      )}

      {/* Header */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b z-10 transition-colors ${
          isCyber
            ? 'bg-[rgba(4,8,15,0.9)] border-[rgba(0,229,255,0.2)]'
            : 'bg-[#F3F0E8] border-[#D7D1C6]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-sm flex items-center justify-center transition-all ${
              isCyber
                ? 'bg-[rgba(0,229,255,0.12)] border border-[rgba(0,229,255,0.4)] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                : 'bg-[#111111] text-[#F3F0E8]'
            }`}
          >
            {isCyber ? <Terminal size={16} /> : <Sparkles size={16} className="text-[#C85C3B]" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`font-bold text-sm uppercase tracking-wide ${
                  isCyber ? 'text-[#00E5FF] font-display' : 'text-[#111111] font-display'
                }`}
              >
                {isCyber ? 'NEURAL CORE // VIVEK AI' : 'ASK VIVEK AI'}
              </h3>
              {isCyber && (
                <span className="flex items-center gap-1 text-[8px] font-helix tracking-widest text-[#00FF88] bg-[#00FF88]/10 border border-[#00FF88]/30 px-1.5 py-0.5 rounded-sm">
                  <span className="w-1 h-1 rounded-full bg-[#00FF88] animate-ping" />
                  LIVE
                </span>
              )}
            </div>
            <span
              className={`text-[10px] uppercase tracking-wider block font-helix ${
                isCyber ? 'text-[rgba(0,229,255,0.6)] text-[8px] tracking-[0.25em]' : 'text-[#706D66]'
              }`}
            >
              {isCyber ? 'LLAMA-3.3-70B · GROQ STREAMING' : 'PORTFOLIO ASSISTANT'}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className={`p-1.5 rounded-sm transition-colors ${
            isCyber
              ? 'text-[rgba(0,229,255,0.6)] hover:text-[#00E5FF] hover:bg-[rgba(0,229,255,0.1)]'
              : 'text-[#706D66] hover:text-[#111111] hover:bg-[#EBE6DC]'
          }`}
          aria-label="Close Assistant"
        >
          <X size={18} />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-sm p-4 text-xs md:text-sm leading-relaxed transition-all ${
                isCyber
                  ? msg.role === 'user'
                    ? 'bg-[rgba(0,229,255,0.14)] border border-[rgba(0,229,255,0.4)] text-[#E8F4FF] shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                    : 'bg-[rgba(10,18,36,0.85)] border border-[rgba(0,229,255,0.2)] text-[#A0D7FF] backdrop-blur-md'
                  : msg.role === 'user'
                  ? 'bg-[#111111] text-[#F3F0E8]'
                  : 'bg-[#F3F0E8] border border-[#D7D1C6] text-[#111111]'
              }`}
            >
              <div
                className={`flex items-center justify-between gap-4 mb-1.5 text-[10px] font-helix uppercase tracking-widest ${
                  isCyber
                    ? msg.role === 'user'
                      ? 'text-[#00E5FF]'
                      : 'text-[rgba(0,229,255,0.7)]'
                    : 'opacity-60'
                }`}
              >
                <span className="font-bold">{msg.role === 'user' ? (isCyber ? 'ARCHITECT' : 'YOU') : (isCyber ? 'CORE_AI' : 'VIVEK AI')}</span>
                {msg.time && <span className="opacity-70">{msg.time}</span>}
              </div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </motion.div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div
              className={`p-3 rounded-sm text-xs font-helix flex items-center gap-2 ${
                isCyber
                  ? 'bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.3)] text-[#00E5FF]'
                  : 'bg-[#F3F0E8] border border-[#D7D1C6] text-[#706D66]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isCyber ? 'bg-[#00E5FF]' : 'bg-[#C85C3B]'
                }`}
              />
              <span className="tracking-wider uppercase text-[10px]">
                {isCyber ? 'STREAMING NEURAL TENSORS...' : 'Thinking...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starters */}
      {messages.length <= 2 && (
        <div
          className={`px-6 py-2.5 border-t flex flex-wrap gap-1.5 z-10 transition-colors ${
            isCyber
              ? 'bg-[rgba(4,8,15,0.8)] border-[rgba(0,229,255,0.15)]'
              : 'bg-[#FAF8F4] border-[#EBE6DC]'
          }`}
        >
          {starterPrompts.map((prompt, idx) => (
            <button
              key={prompt}
              onClick={() => handleSendPrompt(prompt)}
              className={`text-[11px] font-helix px-2.5 py-1 rounded-sm transition-all flex items-center gap-1.5 ${
                isCyber
                  ? 'bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.2)] text-[rgba(0,229,255,0.8)] hover:text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[rgba(0,229,255,0.1)]'
                  : 'bg-[#F3F0E8] border border-[#D7D1C6] text-[#706D66] hover:text-[#111111] hover:border-[#111111]'
              }`}
            >
              {isCyber && <span className="text-[9px] text-[#00E5FF]/50 font-bold">[{idx + 1}]</span>}
              <span>{prompt}</span>
              <ArrowRight size={10} />
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div
        className={`p-4 border-t z-10 transition-colors ${
          isCyber
            ? 'bg-[rgba(4,8,15,0.95)] border-[rgba(0,229,255,0.2)]'
            : 'bg-[#F3F0E8] border-[#D7D1C6]'
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            processMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isCyber ? 'Input neural query [Projects, Stack, Systems]...' : 'Ask about Vivek, projects, experience, or skills...'}
            className={`flex-1 rounded-sm px-4 py-2.5 text-xs md:text-sm transition-all focus:outline-none ${
              isCyber
                ? 'bg-[rgba(2,6,18,0.9)] border border-[rgba(0,229,255,0.3)] text-[#00E5FF] placeholder:text-[rgba(0,229,255,0.35)] focus:border-[#00E5FF] focus:shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                : 'bg-[#FAF8F4] border border-[#D7D1C6] text-[#111111] placeholder:text-[#9E9A91] focus:border-[#111111]'
            }`}
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className={`p-2.5 rounded-sm transition-all ${
              isCyber
                ? 'bg-[#00E5FF] text-[#04080F] font-bold hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] disabled:opacity-30 disabled:hover:shadow-none'
                : 'bg-[#111111] text-[#F3F0E8] hover:bg-[#C85C3B] disabled:opacity-40'
            }`}
            aria-label="Send message"
          >
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NeuralConsole;
