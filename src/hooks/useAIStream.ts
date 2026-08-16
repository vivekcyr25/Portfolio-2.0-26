import { useState, useCallback, useRef } from 'react';
import { aiMonitor } from '../services/ai/AIConnectionMonitor';

export type StreamState = 'IDLE' | 'CONNECTING' | 'STREAMING' | 'COMPLETE' | 'ERROR' | 'ABORTED' | 'DISCONNECTED';

interface UseAIStreamOptions {
  onToken?: (token: string) => void;
  onDone?: () => void;
  onError?: (error: string, details?: string) => void;
}

const SYSTEM_INSTRUCTION = `You are Vivek Sharma's Portfolio AI Assistant.
Vivek Sharma is a Computer Science Engineering student at LPU, Frontend Engineer, and AI Builder (Intern at FlyRank AI).

Key Projects:
1. AI Video Restoration Pipeline (PyTorch, Real-ESRGAN, OpenCV, FFmpeg)
2. Portfolio Maker AI (React 19, TypeScript, Firebase, AI generation)
3. AIPS - Academic Intelligence System (React, TypeScript, Node.js, Chart.js)
4. Space Portfolio (Three.js, WebGL, 3D audio-visual)

Skills: React, TypeScript, Tailwind, Node.js, Python, PyTorch, OpenCV, Firebase.
Contact: viveklpu008@gmail.com | github.com/vivekcyr25 | linkedin.com/in/vivek-sharma-2bba8b398/

CRITICAL INSTRUCTIONS:
- Keep answers ultra-concise, direct, and strictly to the point (MAXIMUM 2 to 3 SHORT SENTENCES or 2-3 short bullets).
- NEVER output long essay paragraphs, repetitive explanations, or filler words.
- If asked a general concept (e.g., 'what is clock'), answer in ONE single clear sentence.
- Always be fast, crisp, and save tokens.`;

export const useAIStream = () => {
  const [state, setState] = useState<StreamState>('IDLE');
  const abortControllerRef = useRef<AbortController | null>(null);
  const rawApiUrl = import.meta.env.VITE_API_URL;
  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY ?? '';
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const API_URL = (!rawApiUrl || rawApiUrl.includes('localhost')) 
    ? (isLocalhost ? 'http://localhost:5000' : 'https://personal-websiteneural-os-api.onrender.com')
    : rawApiUrl;

  const streamFromGroqDirect = async (message: string, context: any, options: UseAIStreamOptions, controller: AbortController) => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { 
            role: 'user', 
            content: `User query: ${message}` 
          }
        ],
        temperature: 0.5,
        max_tokens: 220,
        stream: true
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Groq API Error: ${response.status}`);
    }

    if (!response.body) throw new Error('STREAM_SIGNAL_LOST');

    setState('STREAMING');
    aiMonitor.trackStreamStart();

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const jsonStr = trimmed.replace(/^data: /, '').trim();
        if (jsonStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const token = parsed.choices?.[0]?.delta?.content;
          if (token) {
            options.onToken?.(token);
          }
        } catch {
          // ignore parse errors on partial chunks
        }
      }
    }

    setState('COMPLETE');
    aiMonitor.setState('CONNECTED');
    aiMonitor.trackStreamEnd();
    options.onDone?.();
  };

  const stream = useCallback(async (message: string, context: any, options: UseAIStreamOptions = {}) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    setState('CONNECTING');
    aiMonitor.setState('CONNECTING');

    try {
      // First try backend server if reachable
      let streamedViaBackend = false;
      try {
        const response = await fetch(`${API_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, context }),
          signal: controller.signal
        });

        if (response.ok && response.body) {
          streamedViaBackend = true;
          setState('STREAMING');
          aiMonitor.trackStreamStart();

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const blocks = buffer.split('\n\n');
            buffer = blocks.pop() || '';

            for (const block of blocks) {
              if (!block.trim()) continue;
              const lines = block.split('\n');
              const eventLine = lines.find(l => l.startsWith('event: '));
              const dataLine = lines.find(l => l.startsWith('data: '));

              if (!eventLine || !dataLine) continue;
              const event = eventLine.slice(7).trim();
              let data;
              try {
                data = JSON.parse(dataLine.slice(6).trim());
              } catch {
                continue;
              }

              if (event === 'token') {
                options.onToken?.(data.token);
              } else if (event === 'error') {
                throw new Error(data.details || data.error || 'COGNITION_ERROR');
              }
            }
          }

          setState('COMPLETE');
          aiMonitor.setState('CONNECTED');
          aiMonitor.trackStreamEnd();
          options.onDone?.();
        }
      } catch (backendErr: any) {
        if (backendErr.name === 'AbortError') throw backendErr;
        // Backend offline — fall through to direct Groq API stream
      }

      // If backend was not used, stream directly with Groq API
      if (!streamedViaBackend) {
        await streamFromGroqDirect(message, context, options, controller);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setState('ABORTED');
        aiMonitor.setState('ABORTED');
      } else {
        console.error('[STREAM_FAILURE]', error);
        setState('ERROR');
        aiMonitor.setState('FAILED');
        options.onError?.(error.message);
      }
    } finally {
      abortControllerRef.current = null;
    }
  }, [API_URL, groqApiKey]);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return { stream, abort, state };
};
