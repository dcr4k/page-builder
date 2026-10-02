import React from 'react';
import { DividerBlockData, PageTheme } from '../../../types';
import { Minus, Sparkles, Layers, Eye } from 'lucide-react';
import { TextColorSelector } from '../../common/TextColorSelector';

interface DividerInspectorProps {
  data: DividerBlockData;
  onChange: (updated: DividerBlockData) => void;
  theme?: PageTheme;
}

const BADGE_SUGGESTIONS = [
  '✦ DESTAQUES ✦',
  '✦ NOVIDADES ✦',
  '✦ SOBRE NÓS ✦',
  '✦ CONTATO ✦',
  '✦ BENEFÍCIOS ✦',
];

export const DividerInspector: React.FC<DividerInspectorProps> = ({ data, onChange, theme }) => {
  // Normalize style to one of the 4 official models
  const rawStyle = data.style;
  const currentStyle: 'badge' | 'dots' | 'gradient' | 'space' =
    rawStyle === 'badge' || rawStyle === 'dots' || rawStyle === 'gradient' || rawStyle === 'space'
      ? rawStyle
      : 'gradient';

  const primaryColor = theme?.primaryColor || '#6366f1';
  const cardBorderColor = theme?.cardBorderColor || 'rgba(255, 255, 255, 0.15)';
  const cardBackground = theme?.cardBackground || 'rgba(255, 255, 255, 0.05)';
  const textColor = theme?.textColor || '#ffffff';

  const handleStyleChange = (style: 'badge' | 'dots' | 'gradient' | 'space') => {
    const updated: DividerBlockData = {
      ...data,
      style,
    };
    if (style === 'badge' && !updated.badgeText) {
      updated.badgeText = '✦ DESTAQUES ✦';
    }
    onChange(updated);
  };

  return (
    <div className="space-y-4 pb-2">
      {/* 1. Divider Style Selector (Exactly 4 Official Options) */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Modelo do Divisor / Espaço</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              id: 'badge',
              label: 'Com Selo Central',
              desc: 'Texto estilizado no meio',
              preview: (
                <div className="w-full flex items-center justify-center gap-1.5 my-1">
                  <div className="flex-1 h-[1px] bg-studio-border" />
                  <span className="text-[8px] font-extrabold px-1.5 py-0.2 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    SEÇÃO
                  </span>
                  <div className="flex-1 h-[1px] bg-studio-border" />
                </div>
              ),
            },
            {
              id: 'dots',
              label: 'Três Pontos (Dots)',
              desc: '3 esferas minimalistas',
              preview: (
                <div className="w-full flex items-center justify-center gap-1.5 my-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                </div>
              ),
            },
            {
              id: 'gradient',
              label: 'Gradiente Neon',
              desc: 'Linha com degradê suave',
              preview: (
                <div className="w-full flex items-center justify-center my-2">
                  <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
                </div>
              ),
            },
            {
              id: 'space',
              label: 'Espaçador Invisível',
              desc: 'Respiro sem linha visível',
              preview: (
                <div className="w-full flex items-center justify-center my-1.5">
                  <span className="text-[9px] text-slate-500 border border-dashed border-studio-border px-2 py-0.5 rounded">
                    Respiro Vazio
                  </span>
                </div>
              ),
            },
          ].map((item) => {
            const isSelected = currentStyle === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleStyleChange(item.id as any)}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md ring-1 ring-brand-500/50 scale-[1.01]'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="text-xs font-bold leading-tight block">{item.label}</span>
                  <span className="text-[10px] opacity-60 font-normal leading-tight block mt-0.5">{item.desc}</span>
                </div>
                <div className="mt-2 pt-1 border-t border-studio-border w-full">
                  {item.preview}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Live Preview of Selected Divider */}
      <div className="p-3 rounded-2xl bg-studio-card border border-studio-border space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Prévia do Separador
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-bold">
            {currentStyle === 'badge'
              ? 'Com Selo'
              : currentStyle === 'dots'
              ? 'Três Pontos'
              : currentStyle === 'gradient'
              ? 'Gradiente'
              : 'Espaçador'}
          </span>
        </div>

        <div className="py-4 px-3 rounded-xl bg-studio-black border border-studio-border flex items-center justify-center">
          {currentStyle === 'badge' ? (
            <div className="w-full flex items-center justify-center gap-3">
              <div className="flex-1 h-[1px]" style={{ backgroundColor: cardBorderColor }} />
              <span
                className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border shadow-xs"
                style={{
                  backgroundColor: cardBackground,
                  borderColor: cardBorderColor,
                  color: data.textColor || primaryColor,
                }}
              >
                {data.badgeText || '✦ DESTAQUES ✦'}
              </span>
              <div className="flex-1 h-[1px]" style={{ backgroundColor: cardBorderColor }} />
            </div>
          ) : currentStyle === 'dots' ? (
            <div className="w-full flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cardBorderColor }} />
              <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: primaryColor }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cardBorderColor }} />
            </div>
          ) : currentStyle === 'gradient' ? (
            <div className="w-full flex items-center justify-center">
              <div
                className="w-full h-[1.5px]"
                style={{
                  background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
                }}
              />
            </div>
          ) : (
            <div className="w-full py-2 flex items-center justify-center">
              <span className="text-[10px] text-slate-500 italic">
                (Espaço em branco transparente para respiro)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Badge Text Input (Only if badge style) */}
      {currentStyle === 'badge' && (
        <div className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30 space-y-2.5">
          <label className="block text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Texto do Selo Central</span>
          </label>
          <input
            type="text"
            value={data.badgeText || ''}
            onChange={(e) => onChange({ ...data, badgeText: e.target.value })}
            placeholder="Ex: ✦ SEÇÃO ✦ ou VEJA TAMBÉM"
            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-bold tracking-wider uppercase"
          />

          {/* Quick Suggestions */}
          <div>
            <span className="text-[10px] text-slate-400 block mb-1">Sugestões rápidas:</span>
            <div className="flex flex-wrap gap-1">
              {BADGE_SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChange({ ...data, badgeText: sug })}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-studio-card hover:bg-brand-500/20 text-slate-300 hover:text-brand-300 border border-studio-border transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Cor da Fonte do Selo */}
          <TextColorSelector
            label="Cor da Fonte do Selo"
            value={data.textColor}
            defaultColor={primaryColor}
            onChange={(color) => onChange({ ...data, textColor: color })}
            allowColorful={true}
          />
        </div>
      )}

      {/* 4. Spacing Height */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          Espaçamento Vertical (Altura)
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'sm', label: 'Pequeno', px: '8px' },
            { id: 'md', label: 'Médio', px: '16px' },
            { id: 'lg', label: 'Grande', px: '24px' },
            { id: 'xl', label: 'Amplo', px: '32px' },
          ].map((sp) => {
            const isSelected = (data.spacing || 'md') === sp.id;
            return (
              <button
                key={sp.id}
                type="button"
                onClick={() => onChange({ ...data, spacing: sp.id as any })}
                className={`py-2 px-1 rounded-xl text-center border transition-all ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md ring-1 ring-brand-500/50'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-xs font-bold block">{sp.label}</span>
                <span className="text-[10px] opacity-60 block mt-0.5">{sp.px}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
