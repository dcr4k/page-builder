import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { Block, PageTheme } from '../../types';
import { generateCleanHtml } from '../../utils/htmlExporter';

interface ExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: PageTheme;
  blocks: Block[];
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({
  isOpen,
  onClose,
  theme,
  blocks,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlCode = generateCleanHtml(theme, blocks);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-studio-panel border border-studio-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-studio-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Exportar Código HTML & CSS Limpo</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  Pronto para Produção
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Arquivo HTML único, responsivo e sem dependências pesadas. Pode hospedar em qualquer servidor.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-studio-card hover:bg-studio-border text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Code Preview Area */}
        <div className="flex-1 overflow-hidden p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">index.html ({htmlCode.length} caracteres)</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenInNewTab}
                className="hover:text-brand-300 flex items-center gap-1 transition-colors text-xs font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Testar em Nova Aba</span>
              </button>
            </div>
          </div>

          <div className="flex-1 bg-studio-black rounded-xl border border-studio-border overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed max-h-[480px]">
            <pre>
              <code>{htmlCode}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 border-t border-studio-border bg-studio-black flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0" />
            <span>Inclui fontes do Google Fonts, ícones SVG embutidos e scripts interativos.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className={`flex-1 sm:flex-none py-2 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                copied
                  ? 'bg-brand-500 text-black border-brand-500 shadow-lg shadow-brand-500/20'
                  : 'bg-studio-card hover:bg-studio-border text-white border-studio-border'
              }`}
            >
              {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Código Copiado!' : 'Copiar Código'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 sm:flex-none py-2 px-5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black text-xs font-black shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Baixar index.html</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
