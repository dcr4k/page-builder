import React, { useRef } from 'react';
import { Sparkles, Palette, Type, Square, Upload, Check } from 'lucide-react';
import { PageTheme } from '../../../types';
import { PRESET_SOLID_COLORS, getAutoContrastTheme, isLightColor } from '../../../utils/contrast';

interface GlobalStyleInspectorProps {
  theme: PageTheme;
  onChange: (updatedTheme: PageTheme) => void;
}

const THEME_PRESETS: Array<{ name: string; theme: Partial<PageTheme> }> = [
  {
    name: 'Midnight Dark',
    theme: {
      backgroundType: 'color',
      backgroundColor: '#090a0f',
      textColor: '#ffffff',
      textSecondaryColor: '#94a3b8',
      primaryColor: '#6366f1',
      primaryTextColor: '#ffffff',
      cardBackground: 'rgba(255, 255, 255, 0.04)',
      cardBorderColor: 'rgba(255, 255, 255, 0.1)',
      buttonStyle: 'filled',
      buttonRadius: 'md',
    },
  },
  {
    name: 'Neon Cyber',
    theme: {
      backgroundType: 'gradient',
      gradient: { from: '#3b0764', to: '#0f172a', direction: 'to-br' },
      textColor: '#ffffff',
      textSecondaryColor: '#f0abfc',
      primaryColor: '#d946ef',
      primaryTextColor: '#ffffff',
      cardBackground: 'rgba(217, 70, 239, 0.1)',
      cardBorderColor: 'rgba(217, 70, 239, 0.3)',
      buttonStyle: 'glass',
      buttonRadius: 'full',
    },
  },
  {
    name: 'Emerald Forest',
    theme: {
      backgroundType: 'gradient',
      gradient: { from: '#064e3b', to: '#022c22', direction: 'to-b' },
      textColor: '#ffffff',
      textSecondaryColor: '#a7f3d0',
      primaryColor: '#10b981',
      primaryTextColor: '#ffffff',
      cardBackground: 'rgba(6, 78, 59, 0.35)',
      cardBorderColor: 'rgba(16, 185, 129, 0.25)',
      buttonStyle: 'filled',
      buttonRadius: 'lg',
    },
  },
  {
    name: 'Sunset Pastel',
    theme: {
      backgroundType: 'gradient',
      gradient: { from: '#be185d', to: '#fb923c', direction: 'to-r' },
      textColor: '#ffffff',
      textSecondaryColor: '#ffedd5',
      primaryColor: '#ffffff',
      primaryTextColor: '#be185d',
      cardBackground: 'rgba(255, 255, 255, 0.12)',
      cardBorderColor: 'rgba(255, 255, 255, 0.25)',
      buttonStyle: 'filled',
      buttonRadius: 'full',
    },
  },
  {
    name: 'Clean White / Light',
    theme: {
      backgroundType: 'color',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      textSecondaryColor: '#64748b',
      primaryColor: '#0f172a',
      primaryTextColor: '#ffffff',
      cardBackground: 'rgba(255, 255, 255, 0.85)',
      cardBorderColor: 'rgba(226, 232, 240, 1)',
      buttonStyle: 'filled',
      buttonRadius: 'md',
    },
  },
];

const PRESET_BG_IMAGES = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
];

const FONTS = [
  { name: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Moderno)' },
  { name: 'Inter', label: 'Inter (Clean & Neutro)' },
  { name: 'Outfit', label: 'Outfit (Geométrico & Jovem)' },
  { name: 'Poppins', label: 'Poppins (Arredondado)' },
  { name: 'Playfair Display', label: 'Playfair Display (Serif Luxo)' },
  { name: 'Space Grotesk', label: 'Space Grotesk (Tech & Code)' },
];

export const GlobalStyleInspector: React.FC<GlobalStyleInspectorProps> = ({ theme, onChange }) => {
  const bgUploadRef = useRef<HTMLInputElement>(null);

  const handleApplyPreset = (presetTheme: Partial<PageTheme>) => {
    const merged = {
      ...theme,
      ...presetTheme,
      gradient: presetTheme.gradient ? { ...theme.gradient, ...presetTheme.gradient } : theme.gradient,
    };
    onChange(getAutoContrastTheme(merged));
  };

  const handleBackgroundTypeChange = (type: 'color' | 'gradient' | 'image' | 'video') => {
    const nextTheme: PageTheme = { ...theme, backgroundType: type };
    onChange(getAutoContrastTheme(nextTheme));
  };

  const handleBgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({
          ...theme,
          backgroundType: 'image',
          backgroundImage: result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* 1. Quick Presets */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Paletas Prontas (1-Clique)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleApplyPreset(preset.theme)}
              className="py-2 px-3 text-left rounded-xl bg-studio-card border border-studio-border hover:border-brand-500 hover:bg-studio-panel transition-all text-xs font-medium text-slate-200"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: preset.theme.primaryColor || '#fff' }}
                />
                <span className="truncate">{preset.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Background Settings */}
      <div className="pt-4 border-t border-studio-border">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-brand-400" />
          <span>Fundo da Página</span>
        </label>

        {/* Type toggle */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {(['color', 'gradient', 'image', 'video'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleBackgroundTypeChange(type)}
              className={`py-1.5 text-xs font-bold rounded-lg border capitalize ${
                theme.backgroundType === type
                  ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                  : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
              }`}
            >
              {type === 'color' ? 'Cor' : type === 'gradient' ? 'Gradiente' : type === 'image' ? 'Imagem' : 'Vídeo'}
            </button>
          ))}
        </div>

        {/* Sub-controls based on backgroundType: STRICTLY 20 PREDEFINED COLORS */}
        {theme.backgroundType === 'color' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">
                Cores Predefinidas (20 Opções):
              </span>
              <span className="text-[10px] text-brand-400 font-mono font-bold">
                {PRESET_SOLID_COLORS.find(c => c.hex.toLowerCase() === theme.backgroundColor.toLowerCase())?.name || 'Cor Personalizada'}
              </span>
            </div>

            {/* 20 Predefined colors grid */}
            <div className="grid grid-cols-5 gap-2 p-2.5 rounded-xl bg-studio-black border border-studio-border">
              {PRESET_SOLID_COLORS.map((preset) => {
                const isSelected = theme.backgroundColor.toLowerCase() === preset.hex.toLowerCase();
                const isLight = isLightColor(preset.hex);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onChange(getAutoContrastTheme(theme, preset.hex))}
                    title={`${preset.name} (${preset.hex})`}
                    className={`group relative h-10 rounded-lg transition-all flex items-center justify-center border ${
                      isSelected
                        ? 'ring-2 ring-brand-500 scale-105 z-10 shadow-lg border-white'
                        : 'border-white/10 hover:scale-105 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: preset.hex }}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 stroke-[3] ${
                          isLight ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                    <span className="sr-only">{preset.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Auto Contrast Alert Banner */}
            <div className="px-3 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
              <p className="text-[11px] text-brand-300 leading-tight font-medium">
                Contraste inteligente ativo: textos e blocos adaptam sua legibilidade instantaneamente.
              </p>
            </div>
          </div>
        )}

        {theme.backgroundType === 'gradient' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Cor Inicial:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.gradient.from}
                    onChange={(e) =>
                      onChange(
                        getAutoContrastTheme(theme, undefined, {
                          from: e.target.value,
                          to: theme.gradient.to,
                        })
                      )
                    }
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={theme.gradient.from}
                    onChange={(e) =>
                      onChange(
                        getAutoContrastTheme(theme, undefined, {
                          from: e.target.value,
                          to: theme.gradient.to,
                        })
                      )
                    }
                    className="w-full px-2 py-1 text-xs rounded bg-studio-input border border-studio-border font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Cor Final:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.gradient.to}
                    onChange={(e) =>
                      onChange(
                        getAutoContrastTheme(theme, undefined, {
                          from: theme.gradient.from,
                          to: e.target.value,
                        })
                      )
                    }
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={theme.gradient.to}
                    onChange={(e) =>
                      onChange(
                        getAutoContrastTheme(theme, undefined, {
                          from: theme.gradient.from,
                          to: e.target.value,
                        })
                      )
                    }
                    className="w-full px-2 py-1 text-xs rounded bg-studio-input border border-studio-border font-mono text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Direção do Gradiente:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'to-b', label: 'Vertical' },
                  { id: 'to-br', label: 'Diagonal' },
                  { id: 'to-r', label: 'Horizontal' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...theme,
                        gradient: { ...theme.gradient, direction: d.id },
                      })
                    }
                    className={`py-1 text-xs rounded border font-medium ${
                      theme.gradient.direction === d.id
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                        : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {theme.backgroundType === 'image' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => bgUploadRef.current?.click()}
              className="w-full py-1.5 px-3 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Enviar foto de fundo do PC</span>
            </button>
            <input
              type="file"
              ref={bgUploadRef}
              accept="image/*"
              onChange={handleBgFileUpload}
              className="hidden"
            />

            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Ou escolha um papel de parede:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {PRESET_BG_IMAGES.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange({ ...theme, backgroundImage: url })}
                    className="w-14 h-10 rounded-lg overflow-hidden border border-studio-border flex-shrink-0 hover:scale-105 transition-transform"
                  >
                    <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <input
              type="url"
              placeholder="Cole a URL da imagem de fundo"
              value={theme.backgroundImage}
              onChange={(e) => onChange({ ...theme, backgroundImage: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        )}

        {theme.backgroundType === 'video' && (
          <div className="space-y-2">
            <input
              type="url"
              placeholder="URL do vídeo mp4 (ex: https://...)"
              value={theme.backgroundVideo}
              onChange={(e) => onChange({ ...theme, backgroundVideo: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
            <p className="text-[11px] text-slate-500">
              Vídeo de fundo em loop sutil para páginas dinâmicas.
            </p>
          </div>
        )}
      </div>

      {/* 3. Typography */}
      <div className="pt-4 border-t border-studio-border">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-brand-400" />
          <span>Tipografia & Fontes</span>
        </label>
        <select
          value={theme.fontFamily}
          onChange={(e) => onChange({ ...theme, fontFamily: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
        >
          {FONTS.map((f) => (
            <option key={f.name} value={f.name}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Button Styles & Radius */}
      <div className="pt-4 border-t border-studio-border space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Square className="w-3.5 h-3.5 text-brand-400" />
          <span>Estilo dos Botões Globais</span>
        </label>

        {/* Button Style */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Aparência:</span>
          <div className="grid grid-cols-3 gap-2">
            {(['filled', 'outline', 'glass', 'shadow3d', 'soft'] as const).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => onChange({ ...theme, buttonStyle: style })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border capitalize ${
                  theme.buttonStyle === style
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                }`}
              >
                {style === 'filled'
                  ? 'Sólido'
                  : style === 'outline'
                  ? 'Contorno'
                  : style === 'glass'
                  ? 'Vidro (Glass)'
                  : style === 'shadow3d'
                  ? '3D Pop'
                  : 'Suave'}
              </button>
            ))}
          </div>
        </div>

        {/* Button Radius */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Arredondamento:</span>
          <div className="grid grid-cols-5 gap-1.5">
            {(['none', 'sm', 'md', 'lg', 'full'] as const).map((rad) => (
              <button
                key={rad}
                type="button"
                onClick={() => onChange({ ...theme, buttonRadius: rad })}
                className={`py-1 text-xs font-medium rounded border uppercase ${
                  theme.buttonRadius === rad
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                }`}
              >
                {rad === 'none' ? '0' : rad}
              </button>
            ))}
          </div>
        </div>

        {/* Button Accent Color */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Cor do Botão:</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => onChange({ ...theme, primaryColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => onChange({ ...theme, primaryColor: e.target.value })}
                className="w-full px-2 py-1 text-xs rounded bg-studio-input border border-studio-border font-mono text-white"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Texto do Botão:</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.primaryTextColor}
                onChange={(e) => onChange({ ...theme, primaryTextColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={theme.primaryTextColor}
                onChange={(e) => onChange({ ...theme, primaryTextColor: e.target.value })}
                className="w-full px-2 py-1 text-xs rounded bg-studio-input border border-studio-border font-mono text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Typography Colors */}
      <div className="pt-4 border-t border-studio-border space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Cores dos Textos da Página
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Texto Principal / Títulos:</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.textColor}
                onChange={(e) => onChange({ ...theme, textColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={theme.textColor}
                onChange={(e) => onChange({ ...theme, textColor: e.target.value })}
                className="w-full px-2 py-1 text-xs rounded bg-studio-input border border-studio-border font-mono text-white"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Texto Secundário / Bio:</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.textSecondaryColor}
                onChange={(e) => onChange({ ...theme, textSecondaryColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={theme.textSecondaryColor}
                onChange={(e) => onChange({ ...theme, textSecondaryColor: e.target.value })}
                className="w-full px-2 py-1 text-xs rounded bg-studio-input border border-studio-border font-mono text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
