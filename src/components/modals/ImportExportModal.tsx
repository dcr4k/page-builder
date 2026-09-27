import React, { useState } from 'react';
import { X, Download, Upload, Copy, Check, FileJson, AlertCircle } from 'lucide-react';
import { Block, PageTheme } from '../../types';
import { exportProjectToJson, importProjectFromJson } from '../../utils/storage';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: PageTheme;
  blocks: Block[];
  onImport: (theme: PageTheme, blocks: Block[]) => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  theme,
  blocks,
  onImport,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const exportedJson = exportProjectToJson(theme, blocks);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([exportedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'biocraft-projeto.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (!jsonInput.trim()) {
      setErrorMessage('Cole o conteúdo JSON do projeto.');
      return;
    }

    const result = importProjectFromJson(jsonInput);
    if (!result) {
      setErrorMessage('Arquivo JSON inválido ou formato incompatível.');
      return;
    }

    onImport(result.theme, result.blocks);
    setSuccessMessage('Projeto restaurado com sucesso!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setJsonInput(text);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-studio-panel border border-studio-border rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-studio-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Backup do Projeto (.JSON)
              </h2>
              <p className="text-xs text-slate-400">
                Guarde uma cópia do seu design ou transfira para outro computador.
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

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-2 border-b border-studio-border bg-studio-black">
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-brand-500 text-black font-black shadow-md shadow-brand-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-studio-card'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Backup</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'import'
                ? 'bg-brand-500 text-black font-black shadow-md shadow-brand-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-studio-card'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Restaurar / Importar</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Baixe o arquivo JSON ou copie o código abaixo para salvar todas as configurações de blocos, cores e estilos deste projeto:
              </p>

              <div className="bg-studio-black rounded-xl border border-studio-border p-3 max-h-56 overflow-auto font-mono text-[11px] text-slate-300">
                <pre>{exportedJson}</pre>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 py-2 px-4 rounded-xl border border-studio-border bg-studio-card hover:bg-studio-border text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-brand-400 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copiado!' : 'Copiar JSON'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="flex-1 py-2 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-black text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-colors"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Baixar Arquivo .json</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Cole o conteúdo JSON do projeto ou selecione um arquivo salvo:
              </p>

              <label className="block">
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-brand-500 file:text-black hover:file:bg-brand-600 file:cursor-pointer cursor-pointer"
                />
              </label>

              <textarea
                rows={6}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Cole o código JSON aqui..."
                className="w-full p-3 text-xs rounded-xl bg-studio-input border border-studio-border text-white font-mono focus:outline-none focus:border-brand-500 resize-none"
              />

              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-lg bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0 stroke-[3]" />
                  <span>{successMessage}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleImportSubmit}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-black text-xs font-black shadow-lg shadow-brand-500/20 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Carregar Projeto</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
