import React, { useState } from 'react';
import {
  X,
  Plus,
  ArrowUpDown,
  Edit3,
  Trash2,
  Copy,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';

interface MiniGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddSheet?: () => void;
  onOpenReorderSheet?: () => void;
}

export const MiniGuideModal: React.FC<MiniGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenAddSheet,
  onOpenReorderSheet,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [demoSwapped, setDemoSwapped] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('digit4l_guide_dismissed', 'true');
      } catch (e) {
        // Ignore localStorage quota errors
      }
    }
    onClose();
  };

  const steps = [
    {
      id: 'add',
      stepNumber: '1',
      badge: 'Passo 1 de 3',
      title: 'Adicionar Novos Blocos',
      subtitle: 'Monte sua página com links, catálogo de produtos, galeria de fotos e mais.',
      icon: Plus,
      color: 'from-emerald-500 to-brand-500',
    },
    {
      id: 'move',
      stepNumber: '2',
      badge: 'Passo 2 de 3',
      title: 'Mover e Reordenar Blocos',
      subtitle: 'Organize a ordem dos elementos como preferir para destacar o mais importante.',
      icon: ArrowUpDown,
      color: 'from-brand-500 to-teal-400',
    },
    {
      id: 'edit-remove',
      stepNumber: '3',
      badge: 'Passo 3 de 3',
      title: 'Editar e Remover Blocos',
      subtitle: 'Clique em qualquer bloco para personalizar textos, cores ou excluir.',
      icon: Edit3,
      color: 'from-teal-400 to-indigo-500',
    },
  ];

  const current = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-fade-in">
      {/* Modal Dialog Container */}
      <div className="bg-studio-panel border border-studio-border rounded-3xl w-full max-w-md sm:max-w-lg shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden relative">
        {/* Ambient Top Glow in brand green */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-studio-border flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 shadow-md shadow-brand-500/10">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  Guia Rápido de Criação
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-400 border border-brand-500/30">
                  {current.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                3 passos simples para dominar o Digit4l Builder
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-studio-card hover:bg-studio-border text-slate-400 hover:text-white flex items-center justify-center transition-colors active:scale-95 border border-studio-border/60"
            aria-label="Fechar guia"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Step Content Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 relative z-10">
          {/* Step 1: Adicionar Bloco */}
          {currentStep === 0 && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-studio-card/80 border border-studio-border flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                  Como adicionar:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Toque no botão <strong className="text-brand-400 font-extrabold">+ Adicionar</strong> no menu inferior para abrir nossa lista com mais de <strong>9 tipos de blocos prontos</strong>:
                </p>

                {/* Visual Block Pills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                  {[
                    { label: '🔗 Links & Botões', sub: 'Clássico ou duo' },
                    { label: '🛍️ Vitrine Produtos', sub: 'Com preço e foto' },
                    { label: '📸 Galeria / Mídia', sub: 'Duo ou polaroid' },
                    { label: '💬 WhatsApp Direto', sub: 'Com atendente' },
                    { label: '👤 Perfil & Bio', sub: 'Avatar e redes' },
                    { label: '❓ FAQ Dúvidas', sub: 'Acordeão dinâmico' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-studio-black/70 border border-studio-border/80 flex flex-col"
                    >
                      <span className="text-[11px] font-bold text-white truncate">{item.label}</span>
                      <span className="text-[9px] text-slate-400 truncate">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Simulation Button */}
              <div className="flex items-center justify-center pt-1">
                <div className="p-2 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center gap-3 shadow-md">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-brand-500 text-black flex items-center justify-center font-black shadow-md shadow-brand-500/30 animate-pulse">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-left pr-2">
                    <div className="text-xs font-bold text-white">Botão "Adicionar"</div>
                    <div className="text-[10px] text-brand-400 font-medium">Sempre acessível no rodapé</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Mover e Reordenar */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-studio-card/80 border border-studio-border flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                  Duas formas práticas de reordenar:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  • <strong>Arrastar diretamente</strong>: segure o dedo sobre qualquer bloco na tela e arraste para cima ou para baixo.<br />
                  • <strong>Menu Organizar</strong>: clique no ícone <strong className="text-brand-400">Organizar</strong> na barra inferior para mover blocos com botões de subir e descer.
                </p>

                {/* Interactive Demo Simulation */}
                <div className="flex flex-col gap-2 pt-1">
                  <div
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                      demoSwapped
                        ? 'bg-brand-500/15 border-brand-500/50 text-brand-300 translate-y-1'
                        : 'bg-studio-black/80 border-studio-border text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-zinc-800 text-brand-400 font-bold text-[10px] flex items-center justify-center">
                        {demoSwapped ? '2' : '1'}
                      </div>
                      <span className="text-xs font-bold">
                        {demoSwapped ? '🛍️ Bloco de Produtos' : '🔗 Bloco de Links'}
                      </span>
                    </div>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-50" />
                  </div>

                  <div
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                      demoSwapped
                        ? 'bg-studio-black/80 border-studio-border text-white -translate-y-1'
                        : 'bg-brand-500/15 border-brand-500/50 text-brand-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-zinc-800 text-brand-400 font-bold text-[10px] flex items-center justify-center">
                        {demoSwapped ? '1' : '2'}
                      </div>
                      <span className="text-xs font-bold">
                        {demoSwapped ? '🔗 Bloco de Links' : '🛍️ Bloco de Produtos'}
                      </span>
                    </div>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-50" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDemoSwapped(!demoSwapped)}
                  className="w-full py-1.5 px-3 rounded-xl bg-studio-panel hover:bg-studio-border border border-studio-border text-xs text-brand-400 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Testar alternar posições</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Editar e Remover */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-studio-card/80 border border-studio-border flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                  Personalize ou exclua com um toque:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Toque sobre <strong>qualquer bloco</strong> para selecioná-lo. Uma barra de ações rápidas surgirá no topo do bloco:
                </p>

                {/* Mockup of Selected Block with Action Bar */}
                <div className="p-3.5 rounded-2xl bg-studio-black border-2 border-brand-500/60 shadow-[0_0_20px_rgba(0,229,153,0.25)] relative mt-2">
                  {/* Floating Action Pill */}
                  <div className="absolute -top-3.5 right-3 flex items-center gap-1 bg-studio-panel border border-studio-border rounded-xl p-1 shadow-xl">
                    <span className="px-2 py-0.5 rounded-lg bg-brand-500 text-black text-[10px] font-black flex items-center gap-1">
                      <Edit3 className="w-3 h-3 stroke-[2.5]" />
                      Editar
                    </span>
                    <span className="p-1 rounded text-slate-300 hover:text-white">
                      <Copy className="w-3 h-3" />
                    </span>
                    <span className="p-1 rounded text-rose-400 hover:text-rose-300">
                      <Trash2 className="w-3 h-3" />
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                    <span className="font-bold text-white">✨ Bloco Selecionado</span>
                    <span className="text-[10px] text-brand-400 font-bold">Borda verde ativa</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  • <strong>Editar</strong>: abre o painel lateral para mudar títulos, links, fotos e cores.<br />
                  • <strong>Duplicar</strong>: clona o bloco com todas as suas configurações.<br />
                  • <strong>Lixeira</strong>: remove o bloco da sua página imediatamente.
                </div>
              </div>
            </div>
          )}

          {/* Stepper Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-1">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentStep
                    ? 'w-8 bg-brand-500 shadow-[0_0_10px_#00e599]'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
                aria-label={`Ir para ${s.title}`}
              />
            ))}
          </div>

          {/* Don't show again checkbox */}
          <label className="flex items-center justify-center gap-2 cursor-pointer pt-1 text-slate-400 hover:text-slate-300">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded bg-studio-card border-studio-border text-brand-500 focus:ring-brand-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-[11px]">Não exibir este guia automaticamente</span>
          </label>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-studio-border bg-studio-black/60 flex items-center justify-between gap-3 relative z-10">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="py-2.5 px-4 rounded-xl bg-studio-card hover:bg-studio-border border border-studio-border text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Pular Guia
            </button>
          )}

          {currentStep < 2 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="py-2.5 px-5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-brand-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Próximo Passo</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-brand-500 to-teal-400 hover:opacity-95 text-black font-black text-xs flex items-center gap-2 shadow-lg shadow-brand-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Começar a Criar!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
