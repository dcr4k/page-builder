import React from 'react';
import { Plus, Palette, Layers, Eye, Code2 } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenAddBlock: () => void;
  onOpenStyle: () => void;
  onOpenReorder: () => void;
  onOpenPreview: () => void;
  onOpenExport?: () => void;
  hasBlocks: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenAddBlock,
  onOpenStyle,
  onOpenReorder,
  onOpenPreview,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-studio-panel/95 backdrop-blur-xl border-t border-studio-border px-2 sm:px-6 py-2 safe-area-bottom select-none"
      style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center gap-1">
        {/* Adicionar Bloco (Main highlighted CTA in brand green) */}
        <button
          type="button"
          onClick={onOpenAddBlock}
          className="py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-brand-500 text-black flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform font-black">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-brand-400 group-hover:text-brand-300">Adicionar</span>
        </button>

        {/* Estilo Global */}
        <button
          type="button"
          onClick={onOpenStyle}
          className="py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-brand-400 transition-colors">
            <Palette className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white">Estilo</span>
        </button>

        {/* Camadas / Organizar */}
        <button
          type="button"
          onClick={onOpenReorder}
          className="py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-brand-400 transition-colors">
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white">Organizar</span>
        </button>

        {/* Preview ao vivo */}
        <button
          type="button"
          onClick={onOpenPreview}
          className="py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-brand-400 transition-colors">
            <Eye className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white">Preview</span>
        </button>
      </div>
    </nav>
  );
};
