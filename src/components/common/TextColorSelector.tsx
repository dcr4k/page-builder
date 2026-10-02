import React from 'react';
import { RotateCcw } from 'lucide-react';

interface TextColorSelectorProps {
  label: string;
  value?: string;
  defaultColor?: string;
  onChange: (color?: string) => void;
  allowColorful?: boolean;
}

const PRESET_COLORFUL_SWATCHES = [
  '#ffffff',
  '#090a0f',
  '#10b981',
  '#3b82f6',
  '#6366f1',
  '#ec4899',
  '#f59e0b',
];

const PRESET_MONO_CHOICES = [
  { id: 'white', label: 'Branco', hex: '#ffffff', dotBorder: 'border-slate-300' },
  { id: 'gray', label: 'Cinza', hex: '#94a3b8', dotBorder: 'border-slate-500' },
  { id: 'black', label: 'Preto', hex: '#090a0f', dotBorder: 'border-slate-700' },
];

export const TextColorSelector: React.FC<TextColorSelectorProps> = ({
  label,
  value,
  defaultColor = '#ffffff',
  onChange,
  allowColorful = false,
}) => {
  const isCustom = Boolean(value);

  return (
    <div className="space-y-1.5 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">{label}:</span>
        {isCustom && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-[11px] text-slate-400 hover:text-brand-300 flex items-center gap-1 transition-colors cursor-pointer"
            title="Restaurar cor padrão do tema"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Padrão do tema</span>
          </button>
        )}
      </div>

      {allowColorful ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value || (defaultColor.startsWith('#') ? defaultColor : '#ffffff')}
              onChange={(e) => onChange(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={defaultColor || 'Padrão do tema'}
              className="flex-1 px-2.5 py-1 text-xs rounded bg-studio-input border border-studio-border text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Quick Swatches for colorful title */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {PRESET_COLORFUL_SWATCHES.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => onChange(hex)}
                className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 flex-shrink-0 cursor-pointer ${
                  value === hex ? 'border-white ring-2 ring-brand-500 scale-105' : 'border-studio-border'
                }`}
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>
        </div>
      ) : (
        /* 3 Standard Options: Branco, Cinza, Preto */
        <div className="grid grid-cols-3 gap-2">
          {PRESET_MONO_CHOICES.map((choice) => {
            const isSelected = value ? value.toLowerCase() === choice.hex.toLowerCase() : false;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => onChange(choice.hex)}
                className={`py-1.5 px-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300 ring-1 ring-brand-500/40 shadow-sm'
                    : 'bg-studio-card border-studio-border text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full border ${choice.dotBorder} flex-shrink-0`}
                  style={{ backgroundColor: choice.hex }}
                />
                <span>{choice.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
