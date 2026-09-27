import React, { useRef } from 'react';
import {
  Sparkles,
  Globe,
  Download,
  Calendar,
  Mail,
  MessageSquare,
  Briefcase,
  Camera,
  Radio,
  Palette,
  RotateCcw,
  Zap,
  Eye,
  ExternalLink,
  Layers,
  Upload,
  ArrowRight,
} from 'lucide-react';
import type { LinkBlockData, LinkHighlightEffect, PageTheme } from '../../../types';
import { getButtonClasses, getButtonStyle } from '../../../utils/themeStyles';
import { isLightColor } from '../../../utils/contrast';

const getEffectAnimationClass = (effect: LinkHighlightEffect): string => {
  switch (effect) {
    case 'pulse':
      return 'ring-2 ring-white/50 animate-pulse-subtle';
    case 'shimmer':
      return 'animate-shimmer shadow-lg';
    case 'wobble':
      return 'animate-wobble shadow-lg';
    case 'glow':
      return 'animate-glow-aura ring-2 ring-purple-400/80';
    case 'none':
    default:
      return '';
  }
};

const DEFAULT_FALLBACK_THEME: PageTheme = {
  backgroundType: 'color',
  backgroundColor: '#090a0f',
  gradient: { from: '#0f172a', to: '#020617', direction: 'to-b' },
  backgroundImage: '',
  backgroundVideo: '',
  backgroundOverlayOpacity: 0.2,
  backgroundBlur: 0,
  fontFamily: 'Plus Jakarta Sans',
  primaryColor: '#6366f1',
  primaryTextColor: '#ffffff',
  textColor: '#ffffff',
  textSecondaryColor: '#94a3b8',
  cardBackground: 'rgba(255, 255, 255, 0.04)',
  cardBorderColor: 'rgba(255, 255, 255, 0.1)',
  buttonRadius: 'md',
  buttonStyle: 'filled',
  buttonShadow: 'sm',
  pageWidth: 'medium',
};

interface LinkInspectorProps {
  data: LinkBlockData;
  onChange: (updated: LinkBlockData) => void;
  theme?: PageTheme;
}

const ICONS = [
  { id: 'globe', label: 'Globo', icon: Globe },
  { id: 'sparkles', label: 'Estrela', icon: Sparkles },
  { id: 'download', label: 'Baixar', icon: Download },
  { id: 'calendar', label: 'Agenda', icon: Calendar },
  { id: 'mail', label: 'Email', icon: Mail },
  { id: 'message-square', label: 'Mensagem', icon: MessageSquare },
  { id: 'briefcase', label: 'Trabalho', icon: Briefcase },
  { id: 'camera', label: 'Foto', icon: Camera },
  { id: 'radio', label: 'Podcast', icon: Radio },
];

const BUTTON_COLOR_SWATCHES = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#f59e0b', // Amber
  '#18181b', // Dark Zinc
  '#ffffff', // White
];

const HIGHLIGHT_EFFECTS: Array<{ id: LinkHighlightEffect; label: string; desc: string; icon: string }> = [
  { id: 'none', label: 'Nenhum', desc: 'Aparência estática padrão', icon: '⚪' },
  { id: 'pulse', label: 'Pulsar / Zoom', desc: 'Pulsação contínua suave', icon: '💓' },
  { id: 'shimmer', label: 'Brilho Shimmer', desc: 'Raio de luz passando pelo botão', icon: '✨' },
  { id: 'wobble', label: 'Balanço / Shake', desc: 'Leve balanço periódico divertido', icon: '🔔' },
  { id: 'glow', label: 'Aura Neon Glow', desc: 'Halo luminoso pulsante ao redor', icon: '💡' },
];

const PRESET_THUMBNAILS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80',
];

export const LinkInspector: React.FC<LinkInspectorProps> = ({ data, onChange, theme = DEFAULT_FALLBACK_THEME }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentLayout = data.layout || 'classic';
  const currentEffect = data.highlightEffect || (data.highlight ? 'pulse' : 'none');
  const hasCustomColors = Boolean(data.customBgColor || data.customTextColor || data.styleOverride !== 'default');

  const baseButtonStyle = getButtonStyle(theme, data.styleOverride);
  const buttonClasses = getButtonClasses(theme, data.styleOverride);

  // Apply custom colors if specified with contrast safeguard
  const previewStyle: React.CSSProperties = {
    ...baseButtonStyle,
  };

  if (data.customBgColor) {
    previewStyle.backgroundColor = data.customBgColor;
    if (data.customTextColor) {
      previewStyle.color = data.customTextColor;
    } else {
      previewStyle.color = isLightColor(data.customBgColor) ? '#0f172a' : '#ffffff';
    }
  } else if (data.customTextColor) {
    previewStyle.color = data.customTextColor;
  }

  if (data.customBorderColor) {
    previewStyle.borderColor = data.customBorderColor;
    previewStyle.borderWidth = '2px';
    previewStyle.borderStyle = 'solid';
  }

  const handleLayoutChange = (newLayout: 'classic' | 'featured' | 'card-thumb' | 'duo') => {
    const updated: LinkBlockData = {
      ...data,
      layout: newLayout,
    };
    if (newLayout === 'duo') {
      if (!updated.secondaryTitle) updated.secondaryTitle = 'Catálogo / Opção 2';
      if (!updated.secondaryUrl) updated.secondaryUrl = 'https://';
    }
    if (newLayout === 'card-thumb' && !updated.imageUrl) {
      updated.imageUrl = PRESET_THUMBNAILS[0];
    }
    onChange(updated);
  };

  const handleStyleOverrideChange = (styleId: 'default' | 'primary' | 'outline' | 'glass') => {
    const updated = {
      ...data,
      styleOverride: styleId,
    };
    delete updated.customBgColor;
    delete updated.customTextColor;
    delete updated.customBorderColor;
    onChange(updated);
  };

  const handleResetColors = () => {
    const updated = { ...data };
    delete updated.customBgColor;
    delete updated.customTextColor;
    delete updated.customBorderColor;
    updated.styleOverride = 'default';
    onChange(updated);
  };

  const handleThumbUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({ ...data, imageUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const renderPreviewIcon = (iconName?: string) => {
    switch (iconName) {
      case 'globe': return <Globe className="w-4 h-4 flex-shrink-0" />;
      case 'sparkles': return <Sparkles className="w-4 h-4 flex-shrink-0" />;
      case 'download': return <Download className="w-4 h-4 flex-shrink-0" />;
      case 'calendar': return <Calendar className="w-4 h-4 flex-shrink-0" />;
      case 'mail': return <Mail className="w-4 h-4 flex-shrink-0" />;
      case 'message-square': return <MessageSquare className="w-4 h-4 flex-shrink-0" />;
      case 'briefcase': return <Briefcase className="w-4 h-4 flex-shrink-0" />;
      case 'camera': return <Camera className="w-4 h-4 flex-shrink-0" />;
      case 'radio': return <Radio className="w-4 h-4 flex-shrink-0" />;
      default: return <Globe className="w-4 h-4 flex-shrink-0 opacity-40" />;
    }
  };

  return (
    <div className="space-y-4 pb-2">
      {/* 1. Layout / Model Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Modelo de Exibição do Link</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'classic', label: 'Clássico', desc: 'Botão único padrão' },
            { id: 'duo', label: 'Duo (2 Botões)', desc: '2 links lado a lado' },
            { id: 'card-thumb', label: 'Com Foto', desc: 'Vitrine com imagem' },
            { id: 'featured', label: 'Destaque', desc: 'Botão com banner/glow' },
          ].map((m) => {
            const isSelected = currentLayout === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleLayoutChange(m.id as any)}
                className={`py-2 px-2.5 rounded-xl border text-left flex flex-col transition-all ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md ring-1 ring-brand-500/50'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold leading-tight">{m.label}</span>
                <span className="text-[10px] opacity-60 font-normal leading-tight mt-0.5">{m.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Fields for DUO Layout (2 Buttons Independently Editable) */}
      {currentLayout === 'duo' ? (
        <div className="space-y-3.5 p-3 rounded-2xl bg-studio-panel border border-studio-border">
          <div className="border-b border-studio-border pb-2">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block">
              Configuração dos Dois Botões
            </span>
            <span className="text-[11px] text-slate-400">
              Edite individualmente o texto e a URL de cada botão lado a lado:
            </span>
          </div>

          {/* Button 1 */}
          <div className="p-2.5 rounded-xl bg-studio-black border border-brand-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider">
                Botão 1 (Esquerda / Principal)
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 font-medium">
                Link Principal
              </span>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Título do Botão 1:</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => onChange({ ...data, title: e.target.value })}
                placeholder="Ex: Site Oficial"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">URL de Destino 1:</label>
              <input
                type="url"
                value={data.url}
                onChange={(e) => onChange({ ...data, url: e.target.value })}
                placeholder="https://seusite.com.br"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Button 2 */}
          <div className="p-2.5 rounded-xl bg-studio-black border border-studio-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Botão 2 (Direita / Secundário)
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-studio-card text-slate-400 font-medium">
                Link Secundário
              </span>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Título do Botão 2:</label>
              <input
                type="text"
                value={data.secondaryTitle || ''}
                onChange={(e) => onChange({ ...data, secondaryTitle: e.target.value })}
                placeholder="Ex: Catálogo PDF / Portfólio"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">URL de Destino 2:</label>
              <input
                type="url"
                value={data.secondaryUrl || ''}
                onChange={(e) => onChange({ ...data, secondaryUrl: e.target.value })}
                placeholder="https://seusite.com.br/catalogo"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Standard Single Link Fields (Classic, Featured, Card-Thumb) */
        <div className="space-y-3.5">
          {/* Thumbnail image if card-thumb */}
          {currentLayout === 'card-thumb' && (
            <div className="p-3 rounded-2xl bg-studio-card border border-studio-border space-y-2.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Foto / Miniatura do Card
              </label>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-studio-black border border-studio-border flex-shrink-0">
                  <img
                    src={data.imageUrl || PRESET_THUMBNAILS[0]}
                    alt="Miniatura"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-1.5 px-3 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Enviar foto do dispositivo</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleThumbUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Presets */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Ou selecione uma foto de exemplo:</span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {PRESET_THUMBNAILS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onChange({ ...data, imageUrl: url })}
                      className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-transform hover:scale-105 ${
                        data.imageUrl === url ? 'border-brand-500 scale-105' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={data.imageUrl || ''}
                  onChange={(e) => onChange({ ...data, imageUrl: e.target.value })}
                  placeholder="Ou cole a URL da imagem (https://...)"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Título do Link
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Ex: Meu Site Oficial"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Subtítulo (Opcional)
            </label>
            <input
              type="text"
              value={data.subtitle || ''}
              onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
              placeholder="Ex: Veja meus artigos e cases recentes"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Endereço URL de Destino
            </label>
            <input
              type="url"
              value={data.url}
              onChange={(e) => onChange({ ...data, url: e.target.value })}
              placeholder="https://exemplo.com.br"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Badge Tag */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Selo / Badge em Destaque
            </label>
            <input
              type="text"
              value={data.badgeText || ''}
              onChange={(e) => onChange({ ...data, badgeText: e.target.value })}
              placeholder="Ex: NOVO, OFERTA, GRÁTIS, EXCLUSIVO..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      )}

      {/* Style & Colors */}
      <div className="pt-2 border-t border-studio-border space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-brand-400" />
            <span>Cores & Estilo do Botão</span>
          </label>
          {hasCustomColors && (
            <button
              type="button"
              onClick={handleResetColors}
              className="text-[11px] text-slate-400 hover:text-brand-300 flex items-center gap-1"
              title="Restaurar cores padrão do tema"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Usar cor do tema</span>
            </button>
          )}
        </div>

        {/* Style Preset Override */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Variação de Estilo:</span>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'default', label: 'Padrão', desc: 'Tema' },
              { id: 'primary', label: 'Destaque', desc: 'Contraste' },
              { id: 'outline', label: 'Contorno', desc: 'Borda' },
              { id: 'glass', label: 'Vidro', desc: 'Glass' },
            ].map((v) => {
              const isSelected = (data.styleOverride || 'default') === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleStyleOverrideChange(v.id as any)}
                  className={`py-2 px-1 text-xs font-semibold rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all ${
                    isSelected
                      ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md ring-2 ring-brand-500/50 scale-[1.02]'
                      : 'bg-studio-card border-studio-border text-slate-300 hover:border-slate-700 hover:bg-studio-panel'
                  }`}
                >
                  <span>{v.label}</span>
                  <span className="text-[9px] opacity-60 font-normal">{v.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Color */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Cor de Fundo do Botão:</span>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={data.customBgColor || (typeof previewStyle.backgroundColor === 'string' && previewStyle.backgroundColor.startsWith('#') ? previewStyle.backgroundColor : '#6366f1')}
              onChange={(e) => onChange({ ...data, customBgColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={data.customBgColor || ''}
              onChange={(e) => onChange({ ...data, customBgColor: e.target.value })}
              placeholder={typeof previewStyle.backgroundColor === 'string' ? previewStyle.backgroundColor : 'Padrão do tema'}
              className="flex-1 px-2.5 py-1 text-xs rounded bg-studio-input border border-studio-border text-white font-mono placeholder:text-slate-500"
            />
          </div>

          {/* Quick Swatches for Background */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {BUTTON_COLOR_SWATCHES.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => onChange({ ...data, customBgColor: hex })}
                className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 flex-shrink-0 ${
                  data.customBgColor === hex ? 'border-white ring-2 ring-brand-500 scale-105' : 'border-studio-border'
                }`}
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>
        </div>

        {/* Text Color */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1">Cor do Texto do Botão:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.customTextColor || (typeof previewStyle.color === 'string' && previewStyle.color.startsWith('#') ? previewStyle.color : '#ffffff')}
              onChange={(e) => onChange({ ...data, customTextColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={data.customTextColor || ''}
              onChange={(e) => onChange({ ...data, customTextColor: e.target.value })}
              placeholder={typeof previewStyle.color === 'string' ? previewStyle.color : 'Padrão do tema'}
              className="flex-1 px-2.5 py-1 text-xs rounded bg-studio-input border border-studio-border text-white font-mono placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Highlight Attention Effects with Dedicated Live Previews */}
      <div className="pt-2 border-t border-studio-border space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Efeito de Destaque / Atenção</span>
          </label>
          <span className="text-[10px] text-amber-300/90 font-medium bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Prévia ao vivo
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          Escolha uma animação para destacar este link. Veja a prévia em tempo real no modelo selecionado:
        </p>

        {/* Selected Effect Live Preview Box */}
        <div className="p-3.5 rounded-2xl bg-studio-card border border-brand-500/30 shadow-lg space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <div className="flex items-center gap-1.5 text-brand-400">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
                Prévia ({currentLayout === 'duo' ? 'Duo de Links' : currentLayout === 'card-thumb' ? 'Card com Foto' : currentLayout === 'featured' ? 'Destaque' : 'Clássico'})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {data.styleOverride === 'primary' ? 'Destaque' : data.styleOverride === 'outline' ? 'Contorno' : data.styleOverride === 'glass' ? 'Vidro' : 'Padrão'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {HIGHLIGHT_EFFECTS.find((e) => e.id === currentEffect)?.label}
              </span>
            </div>
          </div>

          {/* Real-time animated button preview with active model layout */}
          <div
            className="py-3 px-3 flex items-center justify-center rounded-xl border border-studio-border transition-colors shadow-inner"
            style={{
              backgroundColor: theme.backgroundType === 'color' ? theme.backgroundColor : undefined,
              background: theme.backgroundType === 'gradient'
                ? `linear-gradient(${theme.gradient.direction === 'to-r' ? 'to right' : 'to bottom'}, ${theme.gradient.from}, ${theme.gradient.to})`
                : undefined,
            }}
          >
            {/* Live Model 1: Duo (2 buttons side by side) */}
            {currentLayout === 'duo' ? (
              <div className="w-full grid grid-cols-2 gap-2">
                <div
                  className={`w-full py-2.5 px-2 flex items-center justify-center gap-1 text-center text-xs font-bold ${buttonClasses} ${getEffectAnimationClass(currentEffect)}`}
                  style={previewStyle}
                >
                  {renderPreviewIcon(data.icon)}
                  <span className="truncate">{data.title || 'Botão 1'}</span>
                </div>
                <div
                  className={`w-full py-2.5 px-2 flex items-center justify-center gap-1 text-center text-xs font-bold ${buttonClasses}`}
                  style={{
                    ...previewStyle,
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.cardBorderColor,
                    color: theme.textColor,
                  }}
                >
                  <ExternalLink className="w-3 h-3 opacity-70" />
                  <span className="truncate">{data.secondaryTitle || 'Botão 2'}</span>
                </div>
              </div>
            ) : currentLayout === 'card-thumb' ? (
              /* Live Model 2: Card with Thumbnail */
              <div
                className="w-full p-2 rounded-xl border flex items-center gap-2.5 shadow-sm"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.cardBorderColor,
                }}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/20 flex-shrink-0">
                  <img
                    src={data.imageUrl || PRESET_THUMBNAILS[0]}
                    alt="Preview thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs truncate" style={{ color: theme.textColor }}>
                      {data.title || 'Meu Link com Foto'}
                    </span>
                    {data.badgeText && (
                      <span className="text-[8px] uppercase font-bold px-1 rounded bg-brand-500/20 text-brand-300">
                        {data.badgeText}
                      </span>
                    )}
                  </div>
                  {data.subtitle && (
                    <p className="text-[10px] opacity-80 truncate" style={{ color: theme.textSecondaryColor }}>
                      {data.subtitle}
                    </p>
                  )}
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={previewStyle}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ) : (
              /* Live Model 3 & 4: Classic or Featured Button */
              <div
                className={`w-full max-w-sm py-3 px-4 font-semibold text-xs sm:text-sm flex items-center justify-between gap-2.5 transition-all duration-300 ${buttonClasses} ${getEffectAnimationClass(
                  currentEffect
                )}`}
                style={previewStyle}
              >
                <div className="w-5 flex items-center justify-start opacity-80">
                  {renderPreviewIcon(data.icon)}
                </div>

                <div className="flex-1 min-w-0 text-center">
                  <div className="flex items-center justify-center gap-1.5 truncate">
                    <span className="truncate">{data.title || 'Meu Link em Destaque'}</span>
                    {data.badgeText && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-black/30 text-inherit border border-current/20 flex-shrink-0">
                        {data.badgeText}
                      </span>
                    )}
                  </div>
                  {data.subtitle && (
                    <p className="text-[10px] opacity-80 font-normal truncate mt-0.5">
                      {data.subtitle}
                    </p>
                  )}
                </div>

                <div className="w-5 flex items-center justify-end opacity-60">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* List of Effects with Individual Live Previews */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-medium text-slate-400 block mb-1">
            Opções de Animação com Prévia:
          </span>
          <div className="grid grid-cols-1 gap-2">
            {HIGHLIGHT_EFFECTS.map((eff) => {
              const isSelected = currentEffect === eff.id;
              return (
                <button
                  key={eff.id}
                  type="button"
                  onClick={() => {
                    onChange({
                      ...data,
                      highlightEffect: eff.id,
                      highlight: eff.id !== 'none',
                    });
                  }}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                    isSelected
                      ? 'bg-brand-500/15 border-brand-500 text-brand-300 shadow-md ring-2 ring-brand-500/40'
                      : 'bg-studio-card border-studio-border text-slate-300 hover:border-slate-700 hover:bg-studio-panel'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-xl flex-shrink-0">{eff.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold block truncate">{eff.label}</span>
                        {isSelected && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider bg-brand-500 text-black">
                            Ativo
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">{eff.desc}</span>
                    </div>
                  </div>

                  {/* Individual mini-preview pill for this effect */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-transform ${getEffectAnimationClass(
                        eff.id
                      )}`}
                      style={{
                        backgroundColor: previewStyle.backgroundColor,
                        color: previewStyle.color,
                        border: previewStyle.border || (previewStyle.borderColor ? `1px solid ${previewStyle.borderColor}` : undefined),
                      }}
                    >
                      <span>Prévia</span>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-brand-400 bg-brand-500' : 'border-studio-border'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Icon Picker (Available for Classic and Duo) */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Ícone do Botão {currentLayout === 'duo' ? 'Principal' : ''}
        </label>
        <div className="grid grid-cols-5 gap-2">
          {ICONS.map((item) => {
            const IconComp = item.icon;
            const isSelected = data.icon === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ ...data, icon: isSelected ? undefined : item.id })}
                className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-slate-200'
                }`}
                title={item.label}
              >
                <IconComp className="w-4 h-4" />
                <span className="text-[10px] truncate max-w-full">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
