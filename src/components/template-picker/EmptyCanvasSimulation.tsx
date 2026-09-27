import React from 'react';
import { Plus, Sparkles, Layers, MousePointer2, CheckCircle2 } from 'lucide-react';

export const EmptyCanvasSimulation: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between py-2 px-1 relative overflow-hidden select-none">
      {/* Background Subtle Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#00e599 0.75px, transparent 0.75px)',
          backgroundSize: '12px 12px',
        }}
      />

      {/* Ambient Neon Glow Corner */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/20 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-teal-500/15 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />

      {/* Top Banner: Modo Livre */}
      <div className="text-center pt-1 z-10">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-500/15 border border-brand-500/40 text-[9px] font-bold text-brand-400 shadow-[0_0_12px_rgba(0,229,153,0.3)] animate-pulse-subtle mb-1">
          <Sparkles className="w-2.5 h-2.5" />
          <span>MODO LIVRE</span>
        </div>
        <h3 className="text-xs font-black text-white tracking-tight leading-tight">
          Crie do Seu Jeito
        </h3>
        <p className="text-[9px] text-slate-400">
          Monte bloco a bloco com liberdade total
        </p>
      </div>

      {/* Animated Blocks Assembly Stage */}
      <div className="flex flex-col gap-2 my-auto z-10 px-1 py-1">
        
        {/* Simulating Block 1: Profile insertion */}
        <div className="relative group animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="p-2 rounded-xl bg-studio-card/80 border border-brand-500/30 backdrop-blur-sm shadow-md flex items-center gap-2">
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-500 to-emerald-400 p-[1.5px] shadow-[0_0_8px_rgba(0,229,153,0.4)]">
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-white">
                  VC
                </div>
              </div>
              <CheckCircle2 className="w-2.5 h-2.5 text-brand-400 fill-zinc-950 absolute -bottom-0.5 -right-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-2 w-16 bg-slate-200/90 rounded-full mb-1" />
              <div className="h-1.5 w-24 bg-slate-400/60 rounded-full" />
            </div>
            <span className="text-[8px] font-mono text-brand-400/80 bg-brand-500/10 px-1.5 py-0.5 rounded border border-brand-500/20">
              #perfil
            </span>
          </div>
        </div>

        {/* Simulating Block 2: Button Link with animated click & glow */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="p-2 rounded-xl bg-gradient-to-r from-brand-500/20 via-brand-500/30 to-brand-500/10 border-2 border-brand-500/60 shadow-[0_0_15px_rgba(0,229,153,0.25)] flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
              <span className="text-[10px] font-bold text-white tracking-wide">
                🔗 Meu Botão Interativo
              </span>
            </div>
            <span className="text-[8px] font-mono text-brand-300 bg-black/40 px-1.5 py-0.5 rounded">
              Destaque
            </span>

            {/* Simulated Animated Cursor */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none animate-bounce">
              <MousePointer2 className="w-3.5 h-3.5 text-white fill-brand-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
            </div>
          </div>
        </div>

        {/* Simulating Block 3: Duo Mini Cards */}
        <div className="grid grid-cols-2 gap-1.5 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="p-1.5 rounded-lg bg-studio-card/70 border border-slate-700/60 flex flex-col items-center text-center">
            <div className="w-5 h-5 rounded bg-brand-500/15 text-brand-400 flex items-center justify-center text-[10px] mb-1">
              🛍️
            </div>
            <div className="h-1.5 w-10 bg-slate-300/80 rounded-full mb-0.5" />
            <div className="h-1 w-7 bg-brand-400/80 rounded-full" />
          </div>
          <div className="p-1.5 rounded-lg bg-studio-card/70 border border-slate-700/60 flex flex-col items-center text-center">
            <div className="w-5 h-5 rounded bg-purple-500/15 text-purple-400 flex items-center justify-center text-[10px] mb-1">
              🎬
            </div>
            <div className="h-1.5 w-10 bg-slate-300/80 rounded-full mb-0.5" />
            <div className="h-1 w-7 bg-purple-400/80 rounded-full" />
          </div>
        </div>

        {/* Simulating Active Drag & Drop Inserter Slot */}
        <div className="p-2 rounded-xl border-2 border-dashed border-brand-500/50 bg-brand-500/5 flex flex-col items-center justify-center text-center gap-1 relative overflow-hidden animate-pulse">
          <div className="w-5 h-5 rounded-full bg-brand-500 text-black flex items-center justify-center shadow-[0_0_10px_#00e599]">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[9px] font-extrabold text-brand-400 tracking-wide uppercase">
            Solte ou Adicione Qualquer Bloco
          </span>
        </div>

      </div>

      {/* Floating Chips at bottom transmitting variety */}
      <div className="z-10 pt-1 pb-1">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <span className="text-[7.5px] px-1.5 py-0.5 rounded-md bg-zinc-800/90 text-slate-300 border border-zinc-700/60">
            ⚡ 9 Tipos de Blocos
          </span>
          <span className="text-[7.5px] px-1.5 py-0.5 rounded-md bg-zinc-800/90 text-brand-300 border border-brand-500/30">
            🎨 Cores Livres
          </span>
          <span className="text-[7.5px] px-1.5 py-0.5 rounded-md bg-zinc-800/90 text-slate-300 border border-zinc-700/60">
            📱 100% Responsivo
          </span>
        </div>
      </div>
    </div>
  );
};
