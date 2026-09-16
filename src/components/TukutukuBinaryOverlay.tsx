import React, { useEffect, useRef } from 'react';

export const TukutukuBinaryOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 13;
    const columns = Math.floor(canvas.width / (fontSize * 2.2));
    const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -50));

    // Sacred Tukutuku symbols (Poutama steps, Niho Taniwha triangles, Kaokao chevrons)
    const tukutukuSymbols = ['▲', '▼', '◆', '◇', '◈', '0', '1', '1', '0', '⬡', '⬢', '::'];

    const render = () => {
      // Very faint clear to leave long ethereal trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = tukutukuSymbols[Math.floor(Math.random() * tukutukuSymbols.length)];
        const x = i * fontSize * 2.2;
        const y = drops[i] * fontSize;

        // Subtle alternating gold and luminous white
        if (char === '◆' || char === '▲' || char === '◈') {
          ctx.fillStyle = 'rgba(212, 160, 90, 0.22)';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
};
