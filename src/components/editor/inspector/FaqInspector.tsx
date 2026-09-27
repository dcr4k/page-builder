import React from 'react';
import { Plus, Trash2, Layers, MessageCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { FaqBlockData, FaqItem } from '../../../types';

interface FaqInspectorProps {
  data: FaqBlockData;
  onChange: (updated: FaqBlockData) => void;
}

export const FaqInspector: React.FC<FaqInspectorProps> = ({ data, onChange }) => {
  const items = data.items || [];
  const currentLayout = data.layout || 'accordion';

  const handleLayoutChange = (newLayout: 'accordion' | 'cards' | 'support') => {
    const updated: FaqBlockData = {
      ...data,
      layout: newLayout,
    };
    if (newLayout === 'support') {
      if (!updated.supportButtonText) updated.supportButtonText = 'Falar no WhatsApp';
      if (!updated.supportButtonUrl) updated.supportButtonUrl = 'https://wa.me/5511999999999';
    }
    onChange(updated);
  };

  const handleAddItem = () => {
    const newItem: FaqItem = {
      id: 'faq_' + Math.random().toString(36).substring(2, 7),
      question: 'Nova pergunta frequente?',
      answer: 'Escreva a resposta detalhada aqui para esclarecer a dúvida dos seus visitantes.',
    };
    onChange({
      ...data,
      items: [...items, newItem],
    });
  };

  const handleUpdateItem = (id: string, field: 'question' | 'answer', value: string) => {
    onChange({
      ...data,
      items: items.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    });
  };

  const handleDeleteItem = (id: string) => {
    onChange({
      ...data,
      items: items.filter((it) => it.id !== id),
    });
  };

  return (
    <div className="space-y-4 pb-2">
      {/* 1. Layout / Model Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Modelo de Perguntas Frequentes</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'accordion', label: 'Acordeão', desc: 'Abre ao clicar', icon: ChevronDown },
            { id: 'cards', label: 'Cards Abertos', desc: 'Respostas visíveis', icon: HelpCircle },
            { id: 'support', label: 'Com Suporte', desc: 'Banner no rodapé', icon: MessageCircle },
          ].map((m) => {
            const isSelected = currentLayout === m.id;
            const IconComp = m.icon;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleLayoutChange(m.id as any)}
                className={`py-2 px-2 rounded-xl border text-left flex flex-col transition-all ${
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

      {/* Support Banner settings if layout === 'support' */}
      {currentLayout === 'support' && (
        <div className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30 space-y-2.5">
          <label className="block text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Banner de Suporte no Rodapé</span>
          </label>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Texto do Botão de Suporte:</label>
            <input
              type="text"
              value={data.supportButtonText || ''}
              onChange={(e) => onChange({ ...data, supportButtonText: e.target.value })}
              placeholder="Ex: Falar no WhatsApp"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Link do Suporte (WhatsApp / URL):</label>
            <input
              type="text"
              value={data.supportButtonUrl || ''}
              onChange={(e) => onChange({ ...data, supportButtonUrl: e.target.value })}
              placeholder="https://wa.me/5511999999999"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Título da Seção de Dúvidas
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Ex: Perguntas Frequentes"
          className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-bold"
        />
      </div>

      {/* FAQ Items */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Perguntas & Respostas ({items.length})
          </label>
          <button
            type="button"
            onClick={handleAddItem}
            className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-studio-card border border-studio-border space-y-2 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">
                  Item #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-rose-400 hover:text-rose-300 opacity-60 hover:opacity-100 p-1"
                  title="Remover pergunta"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                type="text"
                value={item.question}
                onChange={(e) => handleUpdateItem(item.id, 'question', e.target.value)}
                placeholder="Qual é a pergunta?"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-medium"
              />

              <textarea
                rows={2}
                value={item.answer}
                onChange={(e) => handleUpdateItem(item.id, 'answer', e.target.value)}
                placeholder="Resposta explicativa..."
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none text-slate-300 leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
