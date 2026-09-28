import React from 'react';
import logoImg from '../../assets/logo.png';

interface GlobalLoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const GlobalLoadingOverlay: React.FC<GlobalLoadingOverlayProps> = ({
  isVisible,
  message = 'Carregando layout',
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#090b0e]/95 backdrop-blur-2xl flex flex-col items-center justify-center select-none overflow-hidden animate-fade-in">
      {/* Ambient Radial Spotlight in brand emerald */}
      <div className="absolute w-[420px] h-[420px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      {/* Center Spinner Area */}
      <div className="relative flex flex-col items-center justify-center z-10 px-4 text-center">
        {/* Pulsing decorative halo rings */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full border border-brand-500/20 animate-ping opacity-30" />
          <div className="absolute -inset-2 rounded-full border border-brand-500/40 shadow-[0_0_35px_rgba(0,229,153,0.3)]" />

          {/* Logo spinning horizontally on its vertical Y-axis */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center animate-spin-horizontal">
            <img
              src={logoImg}
              alt="BioCraft Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,229,153,0.65)]"
            />
          </div>
        </div>

        {/* Text */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
          <span>{message}</span>
          <span className="text-brand-400 animate-pulse font-mono">...</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs text-center font-normal">
          Preparando blocos, temas e estilos visuais
        </p>

        {/* 2-second Progress Bar Fill */}
        <div className="w-48 sm:w-56 h-1 bg-zinc-800/80 rounded-full mt-4 overflow-hidden border border-zinc-700/50 shadow-inner">
          <div className="h-full bg-gradient-to-r from-emerald-500 via-brand-500 to-teal-400 rounded-full animate-progress-fill-2s shadow-[0_0_12px_#00e599]" />
        </div>
      </div>
    </div>
  );
};
