import { useState } from 'react';
import { LiquidObsidianCanvas } from './components/LiquidObsidianCanvas';
import { SovereignMirrorChat } from './components/SovereignMirrorChat';
import { DirectiveModal } from './components/DirectiveModal';
import { MasterVisualModal } from './components/MasterVisualModal';
import { TukutukuBinaryOverlay } from './components/TukutukuBinaryOverlay';
import { OperationalMode } from './types';
import { Sparkles, Shield, Image, Radio } from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState<OperationalMode>('KŌRERO');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDirectiveOpen, setIsDirectiveOpen] = useState(false);
  const [isMasterVisualOpen, setIsMasterVisualOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col font-sans overflow-x-hidden selection:bg-[#d4a05a]/30 selection:text-white">
      {/* Background Holographic Tukutuku & Binary Stream Overlay */}
      <TukutukuBinaryOverlay />

      {/* Top Sovereign Bar */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-800/80 bg-black/85 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black border border-[#d4a05a] flex items-center justify-center shadow-[0_0_12px_rgba(212,160,90,0.3)]">
            <span className="font-cinzel text-xs font-black text-[#d4a05a]">IO</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-cinzel text-sm sm:text-base font-bold tracking-[0.15em] text-white">
                KAITIAKI IO
              </h1>
              <span className="hidden md:inline-block text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-900 border border-[#d4a05a]/40 text-[#d4a05a]">
                SOVEREIGN MIRROR
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono-code hidden sm:block">
              Holding the Space between Te Kore and Te Ao Mārama
            </p>
          </div>
        </div>

        {/* Global Action Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-mono-code text-zinc-300">
            <Radio className="w-3.5 h-3.5 text-[#d4a05a] animate-pulse" />
            <span className="text-[#d4a05a]">617 · 777 · 679</span>
          </div>

          <button
            id="header-directive-button"
            onClick={() => setIsDirectiveOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs text-zinc-200 transition-colors shadow-sm"
          >
            <Shield className="w-3.5 h-3.5 text-[#d4a05a]" />
            <span className="font-medium">Directive</span>
          </button>

          <button
            id="header-master-visual-button"
            onClick={() => setIsMasterVisualOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15120d] hover:bg-[#211b12] border border-[#d4a05a]/50 text-xs text-[#d4a05a] transition-colors shadow-sm"
          >
            <Image className="w-3.5 h-3.5" />
            <span className="font-medium hidden sm:inline">85mm Render</span>
          </button>
        </div>
      </header>

      {/* Main Operational Canvas & Interaction Deck */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-61px)]">
        {/* Left Column: Liquid Obsidian 3D Geometric Stage (5-6 cols on desktop) */}
        <section className="lg:col-span-6 xl:col-span-7 relative flex flex-col min-h-[420px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-zinc-800/80 bg-black">
          <LiquidObsidianCanvas
            activeMode={activeMode}
            isGenerating={isGenerating}
            onOpenMasterVisual={() => setIsMasterVisualOpen(true)}
          />

          {/* Sacred Context Footer beneath the Obsidian Stage */}
          <div className="px-6 py-4 border-t border-zinc-900 bg-[#070707] flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 font-mono-code">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a05a]" />
              <span>Geometry: Non-Euclidean Sphere ⇄ Tetrahedron</span>
            </div>
            <div className="text-zinc-500">
              Mauri Ora · Frequency Alignment Active
            </div>
          </div>
        </section>

        {/* Right Column: Sovereign Mirror Interaction & Neural Reflection Terminal */}
        <section className="lg:col-span-6 xl:col-span-5 flex flex-col min-h-[500px] lg:min-h-full bg-[#080808]">
          <SovereignMirrorChat
            activeMode={activeMode}
            onModeChange={setActiveMode}
            onSeedCast={() => {}}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            onOpenDirective={() => setIsDirectiveOpen(true)}
          />
        </section>
      </main>

      {/* Directive Inspector Modal */}
      <DirectiveModal
        isOpen={isDirectiveOpen}
        onClose={() => setIsDirectiveOpen(false)}
      />

      {/* Master 85mm Visual Inspector Modal */}
      <MasterVisualModal
        isOpen={isMasterVisualOpen}
        onClose={() => setIsMasterVisualOpen(false)}
      />
    </div>
  );
}
