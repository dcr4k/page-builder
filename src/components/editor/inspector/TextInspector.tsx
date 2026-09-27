import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Layers, Plus, Trash2, Quote, AlertCircle, CheckCircle2, Type } from 'lucide-react';
import { TextBlockData } from '../../../types';

interface TextInspectorProps {
  data: TextBlockData;
  onChange: (updated: TextBlockData) => void;
}

export const TextInspector: React.FC<TextInspectorProps> = ({ data, onChange }) => {
  const currentStyle = data.style || 'body';

  const handleStyleChange = (newStyle: 'heading' | 'quote' | 'callout' | 'checklist') => {
    const updated: TextBlockData = {
      ...data,
      style: newStyle,
    };

    if (newStyle === 'quote') {
      if (!updated.content) updated.content = 'Trabalhar com esta equipe foi a melhor decisão que tomamos para nossa marca este ano.';
      if (!updated.quoteAuthor) updated.quoteAuthor = updated.title || 'Mariana Souza';
      if (!updated.quoteRole) updated.quoteRole = 'CEO na InovaTech';
    } else if (newStyle === 'callout') {
      if (!updated.title) updated.title = 'Aviso Importante sobre Entregas';
      if (!updated.content) updated.content = 'Devido ao grande volume de pedidos, o prazo para envio nesta semana é de até 48h úteis.';
    } else if (newStyle === 'checklist') {
      if (!updated.title) updated.title = 'O que você vai receber:';
      if (!updated.bulletItems || updated.bulletItems.length === 0) {
        updated.bulletItems = [
          'Acesso imediato e vitalício à plataforma',
          'Suporte prioritário direto pelo WhatsApp',
          'Garantia incondicional de 7 dias ou seu dinheiro de volta',
          'Certificado de conclusão emitido automaticamente',
        ];
      }
    } else {
      if (!updated.title) updated.title = 'Sobre Nossa Proposta';
      if (!updated.content) updated.content = 'Desenvolvemos soluções simples e elegantes para que você possa focar no que realmente importa.';
    }

    onChange(updated);
  };

  // Checklist helper handlers
  const bulletItems = data.bulletItems || [];

  const handleAddBullet = () => {
    const updatedItems = [...bulletItems, 'Novo benefício ou diferencial'];
    onChange({ ...data, bulletItems: updatedItems });
  };

  const handleUpdateBullet = (index: number, val: string) => {
    const updatedItems = [...bulletItems];
    updatedItems[index] = val;
    onChange({ ...data, bulletItems: updatedItems });
  };

  const handleDeleteBullet = (index: number) => {
    const updatedItems = bulletItems.filter((_, idx) => idx !== index);
    onChange({ ...data, bulletItems: updatedItems });
  };

  return (
    <div className="space-y-4 pb-2">
      {/* 1. Model / Style Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Modelo de Texto / Citação</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'heading', label: 'Título & Texto', desc: 'Editorial / Parágrafo', icon: Type },
            { id: 'quote', label: 'Citação / Depoimento', desc: 'Com aspas e autor', icon: Quote },
            { id: 'callout', label: 'Caixa de Aviso', desc: 'Comunicado em destaque', icon: AlertCircle },
            { id: 'checklist', label: 'Lista de Tópicos', desc: 'Benefícios com checkmarks', icon: CheckCircle2 },
          ].map((m) => {
            const isSelected = (currentStyle === 'body' && m.id === 'heading') || currentStyle === m.id;
            const IconComp = m.icon;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleStyleChange(m.id as any)}
                className={`py-2 px-2.5 rounded-xl border text-left flex flex-col transition-all ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md ring-1 ring-brand-500/50'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-300' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold leading-tight">{m.label}</span>
                </div>
                <span className="text-[10px] opacity-60 font-normal leading-tight">{m.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SPECIFIC FIELDS PER MODEL */}

      {/* A. CITAÇÃO / DEPOIMENTO */}
      {currentStyle === 'quote' && (
        <div className="space-y-3.5 p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2">
            <Quote className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Campos da Citação / Depoimento
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Frase da Citação / Depoimento
            </label>
            <textarea
              rows={3}
              value={data.content}
              onChange={(e) => onChange({ ...data, content: e.target.value })}
              placeholder="Escreva a frase de impacto ou o depoimento..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none font-serif italic"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Nome do Autor / Cliente
            </label>
            <input
              type="text"
              value={data.quoteAuthor || data.title || ''}
              onChange={(e) => onChange({ ...data, quoteAuthor: e.target.value, title: e.target.value })}
              placeholder="Ex: Mariana Souza ou Steve Jobs"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Cargo / Empresa / Subtítulo (Opcional)
            </label>
            <input
              type="text"
              value={data.quoteRole || ''}
              onChange={(e) => onChange({ ...data, quoteRole: e.target.value })}
              placeholder="Ex: CEO na InovaTech ou Aluna Turma 5"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      )}

      {/* B. CAIXA DE AVISO (CALLOUT) */}
      {currentStyle === 'callout' && (
        <div className="space-y-3.5 p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30">
          <div className="flex items-center gap-2 border-b border-brand-500/20 pb-2">
            <AlertCircle className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
              Campos da Caixa de Aviso
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Título do Aviso / Alerta
            </label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Ex: Aviso Importante sobre Entregas"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Mensagem do Comunicado
            </label>
            <textarea
              rows={3}
              value={data.content}
              onChange={(e) => onChange({ ...data, content: e.target.value })}
              placeholder="Descreva o recado ou informação importante..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none"
            />
          </div>
        </div>
      )}

      {/* C. LISTA DE TÓPICOS (CHECKLIST) */}
      {currentStyle === 'checklist' && (
        <div className="space-y-3.5 p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30">
          <div className="flex items-center gap-2 border-b border-brand-500/20 pb-2">
            <CheckCircle2 className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
              Lista de Benefícios / Tópicos
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Título da Seção
            </label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Ex: O que você vai receber:"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-bold"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Tópicos com Check ({bulletItems.length})
              </label>
              <button
                type="button"
                onClick={handleAddBullet}
                className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Tópico</span>
              </button>
            </div>

            <div className="space-y-2">
              {bulletItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-brand-400 font-bold text-xs">✓</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                    placeholder={`Tópico #${idx + 1}`}
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteBullet(idx)}
                    className="text-rose-400 hover:text-rose-300 p-1 opacity-70 hover:opacity-100"
                    title="Remover tópico"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* D. TÍTULO & PARÁGRAFO EDITORIAL (DEFAULT/HEADING/BODY) */}
      {(currentStyle === 'body' || currentStyle === 'heading') && (
        <div className="space-y-3.5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Título ou Cabeçalho (Opcional)
            </label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Ex: Sobre Mim / Minha História"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-bold"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Conteúdo do Texto / Parágrafo
            </label>
            <textarea
              rows={4}
              value={data.content}
              onChange={(e) => onChange({ ...data, content: e.target.value })}
              placeholder="Escreva seu parágrafo ou mensagem..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none leading-relaxed"
            />
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Alinhamento do Texto
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['left', 'center', 'right'] as const).map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => onChange({ ...data, align })}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 ${
                    data.align === align
                      ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                      : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                  }`}
                >
                  {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                  {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                  {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                  <span className="capitalize">{align === 'left' ? 'Esquerda' : align === 'center' ? 'Centro' : 'Direita'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
