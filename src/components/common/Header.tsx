import React from 'react';
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Eye,
  Check,
  Save,
  FileDown,
} from 'lucide-react';
import type { AppView } from '../../types';
import logoImg from '../../assets/logo.png';

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  isSaved: boolean;
  onOpenExportModal: () => void;
  onOpenBackupModal: () => void;
  onBackToPicker: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  isSaved,
  onOpenBackupModal,
  onBackToPicker,
}) => {
  return (
    <header className="h-14 border-b border-studio-border bg-studio-panel/95 backdrop-blur-md px-2.5 sm:px-4 flex items-center justify-between z-30 select-none flex-shrink-0">
      {/* Left: Back to Templates & BioCraft Logo */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBackToPicker}
          className="p-1.5 sm:p-2 rounded-xl bg-studio-card hover:bg-studio-hover text-slate-200 hover:text-white border border-studio-border flex items-center gap-1.5 transition-colors active:scale-95 shadow-sm"
          title="Trocar de layout"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline text-xs font-semibold">Layouts</span>
        </button>

        <div className="flex items-center gap-1.5">
          <img
            src={logoImg}
            alt="BioCraft Studio"
            className="w-7 h-7 rounded-full object-contain shadow-md border border-brand-500/40"
          />
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="font-extrabold text-sm text-white tracking-tight">
              BioCraft
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-500/15 text-brand-400 border border-brand-500/30 uppercase tracking-wider">
              Studio
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Undo / Redo */}
      <div className="flex items-center gap-0.5 sm:gap-1 bg-studio-card p-0.5 rounded-xl border border-studio-border shadow-sm">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-studio-hover disabled:opacity-20 transition-colors active:scale-90"
          title="Desfazer (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-studio-hover disabled:opacity-20 transition-colors active:scale-90"
          title="Refazer (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Preview mode, save status, backup */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Backup button (visible on larger screens or as secondary) */}
        <button
          type="button"
          onClick={onOpenBackupModal}
          className="hidden sm:flex p-1.5 sm:p-2 rounded-xl bg-studio-card hover:bg-studio-hover border border-studio-border text-slate-300 hover:text-white transition-colors active:scale-95 shadow-sm"
          title="Backup JSON (Importar/Exportar)"
        >
          <FileDown className="w-4 h-4" />
        </button>

        {/* Save button */}
        <button
          type="button"
          onClick={onSave}
          className={`py-1.5 px-2 sm:px-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 shadow-sm ${
            isSaved
              ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
              : 'bg-studio-card border-studio-border text-slate-200 hover:border-slate-600 hover:text-white'
          }`}
          title="Salvar alterações"
        >
          {isSaved ? <Check className="w-3.5 h-3.5 text-brand-400 stroke-[2.5]" /> : <Save className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isSaved ? 'Salvo' : 'Salvar'}</span>
        </button>

        {/* Toggle Live Preview */}
        <button
          type="button"
          onClick={() => onViewChange(currentView === 'preview' ? 'editor' : 'preview')}
          className="py-1.5 px-2.5 sm:px-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black text-xs font-black shadow-md shadow-brand-500/20 flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Ver</span>
        </button>
      </div>
    </header>
  );
};
