import React, { useEffect, useRef } from 'react';

interface ShaderCanvasProps {
  className?: string;
}

/**
 * Raw Canvas 2D animated shader-style background for TI-CYBER mode.
 * Renders animated: cyber grid, pulsing nodes, data streams.
 */
export const ShaderCanvas: React.FC<ShaderCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Node positions for neural net visualization
    const nodes: { x: number; y: number; vx: number; vy: number; pulse: number }[] = [];
    const NODE_COUNT = 40;

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();

    const drawFrame = (timestamp: number) => {
      timeRef.current = timestamp * 0.001;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // ── Background gradient ──────────────────────────────────────
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#080B14');
      bgGrad.addColorStop(0.5, '#060A13');
      bgGrad.addColorStop(1, '#040812');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Fine grid ────────────────────────────────────────────────
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ── Larger perspective grid ───────────────────────────────────
      const cx = width / 2;
      const perspLines = 16;
      for (let i = 0; i < perspLines; i++) {
        const alpha = 0.02 + 0.02 * Math.sin(t * 0.5 + i * 0.5);
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        const x = (i / (perspLines - 1)) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(cx, height);
        ctx.stroke();
      }

      // ── Horizontal scanlines ─────────────────────────────────────
      const scanLineY = ((t * 60) % height);
      const scanGrad = ctx.createLinearGradient(0, scanLineY - 40, 0, scanLineY + 40);
      scanGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
      scanGrad.addColorStop(0.5, 'rgba(0, 229, 255, 0.04)');
      scanGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanLineY - 40, width, 80);

      // ── Neural network nodes ────────────────────────────────────
      // Update positions
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      // Draw connections
      const maxDist = 160;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = (1 - dist / maxDist) * 1.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulseAlpha = 0.4 + 0.3 * Math.sin(n.pulse);
        const pulseSize = 2 + 1 * Math.sin(n.pulse);

        // Outer glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseSize * 6);
        glow.addColorStop(0, `rgba(0, 229, 255, ${pulseAlpha * 0.3})`);
        glow.addColorStop(1, 'rgba(0, 229, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseSize * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(0, 229, 255, ${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Data stream vertical lines ───────────────────────────────
      for (let col = 0; col < 8; col++) {
        const x = (col / 7) * width;
        const streamY = ((t * 120 + col * 200) % (height + 100)) - 50;
        const streamGrad = ctx.createLinearGradient(0, streamY, 0, streamY + 100);
        streamGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
        streamGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.08)');
        streamGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = streamGrad;
        ctx.fillRect(x - 1, streamY, 2, 100);
      }

      // ── Corner accent lines ──────────────────────────────────────
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
      ctx.lineWidth = 1;
      const cornerSize = 24;
      // Top-left
      ctx.beginPath(); ctx.moveTo(0, cornerSize); ctx.lineTo(0, 0); ctx.lineTo(cornerSize, 0); ctx.stroke();
      // Top-right
      ctx.beginPath(); ctx.moveTo(width - cornerSize, 0); ctx.lineTo(width, 0); ctx.lineTo(width, cornerSize); ctx.stroke();
      // Bottom-left
      ctx.beginPath(); ctx.moveTo(0, height - cornerSize); ctx.lineTo(0, height); ctx.lineTo(cornerSize, height); ctx.stroke();
      // Bottom-right
      ctx.beginPath(); ctx.moveTo(width - cornerSize, height); ctx.lineTo(width, height); ctx.lineTo(width, height - cornerSize); ctx.stroke();

      animRef.current = requestAnimationFrame(drawFrame);
    };

    animRef.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ''}`}
      style={{ display: 'block' }}
    />
  );
};
