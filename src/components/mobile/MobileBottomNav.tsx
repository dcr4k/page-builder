import React from 'react';
import { Plus, Palette, Layers, Eye, Code2 } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenAddBlock: () => void;
  onOpenStyle: () => void;
  onOpenReorder: () => void;
  onOpenPreview: () => void;
  onOpenExport: () => void;
  hasBlocks: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenAddBlock,
  onOpenStyle,
  onOpenReorder,
  onOpenPreview,
  onOpenExport,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-studio-panel/95 backdrop-blur-xl border-t border-studio-border px-3 py-2 sm:px-6 safe-area-bottom select-none">
      <div className="max-w-md mx-auto flex items-center justify-between gap-1">
        {/* Adicionar Bloco (Main highlighted CTA in brand green) */}
        <button
          type="button"
          onClick={onOpenAddBlock}
          className="flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
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
          className="flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
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
          className="flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
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
          className="flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-brand-400 transition-colors">
            <Eye className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white">Preview</span>
        </button>

        {/* Exportar Código */}
        <button
          type="button"
          onClick={onOpenExport}
          className="flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-brand-400 transition-colors">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white">Exportar</span>
        </button>
      </div>
    </nav>
  );
};
