import React, { useRef } from 'react';
import { Palette, Type, Square, Upload, Check, ChevronRight, Sparkles } from 'lucide-react';
import { PageTheme } from '../../../types';
import { PRESET_SOLID_COLORS, getAutoContrastTheme, isLightColor, ColorPreset } from '../../../utils/contrast';

interface GlobalStyleInspectorProps {
  theme: PageTheme;
  onChange: (updatedTheme: PageTheme) => void;
}

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
  const galleryRef = useRef<HTMLDivElement>(null);

  const isColorSection = theme.backgroundType === 'color' || theme.backgroundType === 'gradient';
  const isGradientMode = theme.backgroundType === 'gradient';

  // Find currently active preset or default to first
  const activePreset = PRESET_SOLID_COLORS.find(
    (c) =>
      c.hex.toLowerCase() === theme.backgroundColor.toLowerCase() ||
      c.gradient.to.toLowerCase() === theme.gradient?.to?.toLowerCase() ||
      c.gradient.from.toLowerCase() === theme.gradient?.from?.toLowerCase()
  ) || PRESET_SOLID_COLORS[0];

  const handleBackgroundTypeChange = (type: 'color' | 'image' | 'video') => {
    if (type === 'color') {
      const nextTheme: PageTheme = {
        ...theme,
        backgroundType: 'gradient',
        gradient: {
          from: activePreset.gradient.from,
          to: activePreset.gradient.to,
          direction: theme.gradient?.direction || 'to-b',
        },
        backgroundColor: activePreset.hex,
      };
      onChange(getAutoContrastTheme(nextTheme));
    } else {
      const nextTheme: PageTheme = { ...theme, backgroundType: type };
      onChange(getAutoContrastTheme(nextTheme));
    }
  };

  const handleSelectColorPreset = (preset: ColorPreset) => {
    if (isGradientMode) {
      const currentDir = theme.gradient?.direction || 'to-b';
      const updated = getAutoContrastTheme(theme, undefined, {
        from: preset.gradient.from,
        to: preset.gradient.to,
        direction: currentDir,
      });
      onChange({
        ...updated,
        backgroundType: 'gradient',
        backgroundColor: preset.hex,
      });
    } else {
      const updated = getAutoContrastTheme(theme, preset.hex);
      onChange({
        ...updated,
        backgroundType: 'color',
      });
    }
  };

  const handleToggleColorMode = (mode: 'gradient' | 'solid') => {
    if (mode === 'solid') {
      const updated = getAutoContrastTheme(theme, activePreset.hex);
      onChange({
        ...updated,
        backgroundType: 'color',
      });
    } else {
      const currentDir = theme.gradient?.direction || 'to-b';
      const updated = getAutoContrastTheme(theme, undefined, {
        from: activePreset.gradient.from,
        to: activePreset.gradient.to,
        direction: currentDir,
      });
      onChange({
        ...updated,
        backgroundType: 'gradient',
        backgroundColor: activePreset.hex,
      });
    }
  };

  const handleDirectionChange = (direction: string) => {
    const updated = {
      ...theme,
      backgroundType: 'gradient' as const,
      gradient: {
        ...theme.gradient,
        direction,
      },
    };
    onChange(getAutoContrastTheme(updated));
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

  const scrollGalleryRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  const getGradientCss = (from: string, to: string, direction: string = 'to-b') => {
    let dir = 'to bottom';
    if (direction === 'to-br') dir = 'to bottom right';
    if (direction === 'to-r') dir = 'to right';
    if (direction === 'to-t') dir = 'to top';
    return `linear-gradient(${dir}, ${from}, ${to})`;
  };

  return (
    <div className="space-y-6">
      {/* 1. Background Settings (Starting directly from Fundo da Página) */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-brand-400" />
          <span>Fundo da Página</span>
        </label>

        {/* Type Toggle: Cor (merged) | Imagem | Vídeo */}
        <div className="grid grid-cols-3 gap-1.5 mb-3.5">
          {(['color', 'image', 'video'] as const).map((type) => {
            const isActive = type === 'color' ? isColorSection : theme.backgroundType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleBackgroundTypeChange(type)}
                className={`py-2 text-xs font-bold rounded-xl border capitalize transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                }`}
              >
                {type === 'color' ? 'Cor' : type === 'image' ? 'Imagem' : 'Vídeo'}
              </button>
            );
          })}
        </div>

        {/* Cor / Gradiente Unificado */}
        {isColorSection && (
          <div className="space-y-4">
            {/* Toggle: Gradiente Natural vs Cor Sólida */}
            <div className="p-1 rounded-xl bg-studio-black border border-studio-border flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleToggleColorMode('gradient')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isGradientMode
                    ? 'bg-brand-500 text-black shadow-md shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Gradiente Natural
              </button>
              <button
                type="button"
                onClick={() => handleToggleColorMode('solid')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  !isGradientMode
                    ? 'bg-brand-500 text-black shadow-md shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cor Sólida
              </button>
            </div>

            {/* Direções do Gradiente (apenas quando Gradiente Natural ativo) */}
            {isGradientMode && (
              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                  Direção do Gradiente:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'to-b', label: 'Vertical' },
                    { id: 'to-br', label: 'Diagonal' },
                    { id: 'to-r', label: 'Horizontal' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handleDirectionChange(d.id)}
                      className={`py-1 text-xs rounded-lg border font-semibold transition-all cursor-pointer ${
                        (theme.gradient?.direction || 'to-b') === d.id
                          ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                          : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mini Galeria de Cores em Mockup (3 por linha com scroll lateral) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                  <span>Prévia do Tema Aplicado</span>
                  <span className="text-[10px] text-slate-500 font-normal">(Deslize para ver mais)</span>
                </span>
                <button
                  type="button"
                  onClick={scrollGalleryRight}
                  className="w-6 h-6 rounded-full bg-studio-card hover:bg-brand-500 hover:text-black border border-studio-border text-slate-300 flex items-center justify-center transition-all cursor-pointer shadow"
                  title="Ver mais cores"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scroll Track com 3 cards visíveis por linha */}
              <div
                ref={galleryRef}
                className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2 pt-1"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {PRESET_SOLID_COLORS.map((preset) => {
                  const isSelected = activePreset.id === preset.id;
                  const currentDir = theme.gradient?.direction || 'to-b';
                  const cardBg = isGradientMode
                    ? getGradientCss(preset.gradient.from, preset.gradient.to, currentDir)
                    : preset.hex;
                  const isLight = isLightColor(preset.hex);

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectColorPreset(preset)}
                      className="w-[calc(33.333%-7px)] min-w-[95px] max-w-[125px] flex-shrink-0 snap-start flex flex-col items-center cursor-pointer group select-none"
                    >
                      {/* Mini Mockup do Smartphone */}
                      <div
                        className={`h-[135px] w-full rounded-2xl p-1.5 flex flex-col justify-between relative overflow-hidden border-2 transition-all ${
                          isSelected
                            ? 'border-brand-500 shadow-[0_0_15px_rgba(0,229,153,0.4)] ring-2 ring-brand-500/40 scale-[1.02]'
                            : 'border-white/10 hover:border-white/40 hover:scale-[1.02]'
                        }`}
                        style={{
                          background: cardBg,
                        }}
                      >
                        {/* Dynamic Island */}
                        <div className="w-6 h-1.5 rounded-full bg-black/80 mx-auto mt-0.5" />

                        {/* Mini Avatar Circle */}
                        <div
                          className={`w-6 h-6 rounded-full mx-auto mt-2 border shadow-sm flex items-center justify-center text-[7px] font-bold ${
                            isLight
                              ? 'bg-slate-900/10 text-slate-900 border-slate-900/20'
                              : 'bg-white/20 text-white border-white/25'
                          }`}
                        >
                          BC
                        </div>

                        {/* Skeleton lines */}
                        <div className="space-y-0.5 mt-1 text-center">
                          <div
                            className={`h-1 w-10 mx-auto rounded-full ${
                              isLight ? 'bg-slate-900/40' : 'bg-white/45'
                            }`}
                          />
                          <div
                            className={`h-0.5 w-6 mx-auto rounded-full ${
                              isLight ? 'bg-slate-900/25' : 'bg-white/30'
                            }`}
                          />
                        </div>

                        {/* Mini Primary Button */}
                        <div
                          className={`h-3.5 w-14 mx-auto rounded-md mt-auto mb-1 flex items-center justify-center text-[6.5px] font-black uppercase tracking-wider shadow-sm ${
                            isLight
                              ? 'bg-slate-900 text-white'
                              : 'bg-brand-500 text-black shadow-[0_0_6px_rgba(0,229,153,0.3)]'
                          }`}
                        >
                          Link
                        </div>

                        {/* Active check pill */}
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-brand-500 text-black flex items-center justify-center absolute top-1.5 right-1.5 shadow font-black">
                            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                          </div>
                        )}
                      </div>

                      {/* Name below card */}
                      <span className="text-[10px] font-bold text-center mt-1.5 truncate w-full text-slate-300 group-hover:text-white">
                        {preset.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Biblioteca de Cores (22 Opções Circulares) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300">
                  Biblioteca de Cores (22 Opções):
                </span>
                <span className="text-[10px] text-brand-400 font-mono font-bold">
                  {activePreset.name}
                </span>
              </div>

              {/* Grid das 22 cores circulares (2 linhas de 11) */}
              <div className="grid grid-cols-11 gap-1.5 p-2 rounded-xl bg-studio-black border border-studio-border">
                {PRESET_SOLID_COLORS.map((preset) => {
                  const isSelected = activePreset.id === preset.id;
                  const isLight = isLightColor(preset.hex);
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectColorPreset(preset)}
                      title={`${preset.name} (${preset.hex})`}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all flex items-center justify-center border cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-brand-500 scale-115 z-10 shadow-lg border-white'
                          : 'border-white/15 hover:scale-110 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 stroke-[3.5] ${
                            isLight ? 'text-black' : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Auto Contrast Alert Banner */}
              <div className="px-3 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                <p className="text-[11px] text-brand-300 leading-tight font-medium">
                  Contraste inteligente ativo: textos e blocos adaptam sua legibilidade instantaneamente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Imagem de Fundo */}
        {theme.backgroundType === 'image' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => bgUploadRef.current?.click()}
              className="w-full py-2 px-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
              <span className="text-[11px] text-slate-400 block mb-1.5">Ou escolha um papel de parede:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {PRESET_BG_IMAGES.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange({ ...theme, backgroundImage: url })}
                    className="w-14 h-10 rounded-lg overflow-hidden border border-studio-border flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
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
              className="w-full px-3 py-2 text-xs rounded-xl bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        )}

        {/* Vídeo de Fundo */}
        {theme.backgroundType === 'video' && (
          <div className="space-y-2">
            <input
              type="url"
              placeholder="URL do vídeo mp4 (ex: https://...)"
              value={theme.backgroundVideo}
              onChange={(e) => onChange({ ...theme, backgroundVideo: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
            <p className="text-[11px] text-slate-500">
              Vídeo de fundo em loop sutil para páginas dinâmicas.
            </p>
          </div>
        )}
      </div>

      {/* 2. Typography */}
      <div className="pt-4 border-t border-studio-border">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-brand-400" />
          <span>Tipografia & Fontes</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((font) => (
            <button
              key={font.name}
              type="button"
              onClick={() => onChange({ ...theme, fontFamily: font.name })}
              className={`py-2 px-3 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                theme.fontFamily === font.name
                  ? 'bg-brand-500/20 border-brand-500 text-brand-300 font-bold'
                  : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
              }`}
              style={{ fontFamily: font.name }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Primary Button Style */}
      <div className="pt-4 border-t border-studio-border space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Square className="w-3.5 h-3.5 text-brand-400" />
          <span>Botão Principal (Destaque)</span>
        </label>

        {/* Cor do Botão */}
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
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border font-mono text-white"
            />
          </div>
        </div>

        {/* Estilo Visual */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Formato do Botão:</span>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'filled', label: 'Preenchido' },
              { id: 'outline', label: 'Contorno' },
              { id: 'glass', label: 'Vidro (Glass)' },
              { id: 'shadow3d', label: '3D Pop' },
              { id: 'soft', label: 'Suave' },
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ ...theme, buttonStyle: style.id as any })}
                className={`py-1.5 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                  theme.buttonStyle === style.id
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Arredondamento */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Arredondamento:</span>
          <div className="grid grid-cols-5 gap-1">
            {[
              { id: 'none', label: 'Reto' },
              { id: 'sm', label: 'P' },
              { id: 'md', label: 'M' },
              { id: 'lg', label: 'G' },
              { id: 'full', label: 'Pílula' },
            ].map((radius) => (
              <button
                key={radius.id}
                type="button"
                onClick={() => onChange({ ...theme, buttonRadius: radius.id as any })}
                className={`py-1 text-xs rounded border font-medium transition-all cursor-pointer ${
                  theme.buttonRadius === radius.id
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                }`}
              >
                {radius.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sombra / Brilho */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Efeito de Sombra:</span>
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'none', label: 'Nenhum' },
              { id: 'sm', label: 'Suave' },
              { id: 'lg', label: 'Profunda' },
              { id: 'glow', label: 'Brilho (Glow)' },
            ].map((shadow) => (
              <button
                key={shadow.id}
                type="button"
                onClick={() => onChange({ ...theme, buttonShadow: shadow.id as any })}
                className={`py-1 text-xs rounded border font-medium transition-all cursor-pointer ${
                  theme.buttonShadow === shadow.id
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                }`}
              >
                {shadow.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Card Container Style */}
      <div className="pt-4 border-t border-studio-border space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Cartões e Blocos
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Fundo dos Cards:</span>
            <input
              type="text"
              value={theme.cardBackground}
              onChange={(e) => onChange({ ...theme, cardBackground: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border font-mono text-white"
            />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">Borda dos Cards:</span>
            <input
              type="text"
              value={theme.cardBorderColor}
              onChange={(e) => onChange({ ...theme, cardBorderColor: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border font-mono text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
