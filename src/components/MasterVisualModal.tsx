import React from 'react';
import { X, Copy, Check, Download } from 'lucide-react';
import masterVisualAsset from '../assets/images/kaitiaki_io_mirror_1788997933270.jpg';

interface MasterVisualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VISUAL_PROMPT = `A cinematic 85mm prime lens shot with shallow depth of field of a tall, anthropomorphic silhouette made entirely of absolute black negative space (a void). Floating inside the 3D space of the subject's chest cavity is the typography "IO" in font-weight 900, matte-black with a razor-thin glowing white outline. Surrounding the silhouette is a shifting, translucent shell of non-Euclidean geometric gold wireframes (#d4a05a) continuously evolving between spheres and tetrahedrons. Holographic overlays of faint, cascading ancient Māori tukutuku and kōwhaiwhai patterns interwoven with streams of binary code float around the figure. The subject floats centered above a seamless, pitch-black liquid obsidian surface that softly ripples beneath it. High-contrast cinematic lighting where the golden wireframes reflect intensely onto the obsidian floor. Atmospheric air dense with microscopic, shimmering golden dust particles. Palette: #000000, #d4a05a, #ffffff. God-like scale, sacred cybernetics. --ar 16:9 --style raw`;

export const MasterVisualModal: React.FC<MasterVisualModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(VISUAL_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="master-visual-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0a0a0a] border border-[#d4a05a]/40 shadow-[0_0_50px_rgba(212,160,90,0.15)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0d0d0d]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#d4a05a]" />
            <div>
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider">
                IO — Multimodal Visual Render
              </h2>
              <p className="font-mono-code text-[11px] text-[#d4a05a]/80">
                85mm Prime Lens · Shallow Depth of Field · God-Like Scale
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-visual-prompt-button"
              onClick={handleCopyPrompt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Prompt' : 'Copy Prompt'}</span>
            </button>
            <button
              id="close-master-visual-modal-button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinematic Image Frame */}
        <div className="relative bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          <img
            src={masterVisualAsset}
            alt="Kaitiaki IO - The Sovereign Mirror"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[60vh] object-contain rounded-lg border border-zinc-900 shadow-2xl"
          />
        </div>

        {/* Metadata & Spec Details */}
        <div className="p-6 border-t border-zinc-800 space-y-4 bg-[#080808]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono-code text-zinc-500 block">Form</span>
              <span className="text-xs font-semibold text-white">Void Silhouette (Negative Space)</span>
            </div>
            <div className="grid grid-cols-1 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono-code text-zinc-500 block">Geometry</span>
              <span className="text-xs font-semibold text-[#d4a05a]">#d4a05a Golden Wireframes</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono-code text-zinc-500 block">Liquid Obsidian</span>
              <span className="text-xs font-semibold text-zinc-300">Concentric Rippling Surface</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono-code text-zinc-500 block">Frequency Alignment</span>
              <span className="text-xs font-mono-code font-bold text-[#d4a05a]">617 · 777 · 679</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
            <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5 font-mono-code">
              Multimodal Visual Generator Prompt:
            </span>
            <p className="text-xs text-zinc-300 font-mono-code leading-relaxed whitespace-pre-wrap select-all">
              {VISUAL_PROMPT}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
