import React from 'react';
import { ExternalLink, Globe, Sparkles, Download, Calendar, Mail, MessageSquare, Briefcase, Camera, Radio, ArrowRight } from 'lucide-react';
import type { LinkBlockData, PageTheme } from '../../types';
import { getButtonClasses, getButtonStyle } from '../../utils/themeStyles';
import { isLightColor } from '../../utils/contrast';

interface LinkBlockViewProps {
  data: LinkBlockData;
  theme: PageTheme;
  isEditor?: boolean;
}

export const LinkBlockView: React.FC<LinkBlockViewProps> = ({ data, theme, isEditor }) => {
  const baseButtonStyle = getButtonStyle(theme, data.styleOverride);
  const buttonClasses = getButtonClasses(theme, data.styleOverride);

  // Apply custom colors if specified with contrast safeguard
  const finalStyle: React.CSSProperties = {
    ...baseButtonStyle,
  };

  if (data.customBgColor) {
    finalStyle.backgroundColor = data.customBgColor;
    if (data.customTextColor) {
      finalStyle.color = data.customTextColor;
    } else {
      finalStyle.color = isLightColor(data.customBgColor) ? '#0f172a' : '#ffffff';
    }
  } else if (data.customTextColor) {
    finalStyle.color = data.customTextColor;
  }

  if (data.customBorderColor) {
    finalStyle.borderColor = data.customBorderColor;
    finalStyle.borderWidth = '2px';
    finalStyle.borderStyle = 'solid';
  }

  // Determine highlight animation
  const effect = data.highlightEffect || (data.highlight ? 'pulse' : 'none');
  let animationClass = '';
  if (effect === 'pulse') {
    animationClass = 'ring-2 ring-white/50 animate-pulse-subtle shadow-lg';
  } else if (effect === 'shimmer') {
    animationClass = 'animate-shimmer shadow-lg';
  } else if (effect === 'wobble') {
    animationClass = 'animate-wobble shadow-lg';
  } else if (effect === 'glow') {
    animationClass = 'animate-glow-aura ring-2 ring-purple-400/80 shadow-xl';
  }

  const renderIcon = (iconName?: string) => {
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
      default: return null;
    }
  };

  const layout = data.layout || 'classic';

  // Model 1: Card com Thumbnail à Esquerda (Estilo Vitrine / Artigo)
  if (layout === 'card-thumb') {
    const thumbContent = (
      <div
        className="w-full p-2.5 rounded-2xl border flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 shadow-md group cursor-pointer"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
      >
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/20 flex-shrink-0 relative">
          <img
            src={data.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80'}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <h4
              className="font-bold text-xs sm:text-sm leading-tight truncate"
              style={{ color: theme.textColor }}
            >
              {data.title || 'Acesse o Conteúdo'}
            </h4>
            {data.badgeText && (
              <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex-shrink-0">
                {data.badgeText}
              </span>
            )}
          </div>
          {data.subtitle && (
            <p
              className="text-[11px] opacity-80 mt-0.5 line-clamp-1"
              style={{ color: theme.textSecondaryColor }}
            >
              {data.subtitle}
            </p>
          )}
        </div>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-0.5 shadow-sm"
          style={finalStyle}
        >
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    );

    if (isEditor) {
      return <div className="w-full">{thumbContent}</div>;
    }
    return (
      <a href={data.url || '#'} target="_blank" rel="noopener noreferrer" className="block w-full no-underline">
        {thumbContent}
      </a>
    );
  }

  // Model 2: Duo de Links (2 Botões Lado a Lado)
  if (layout === 'duo') {
    const btn1 = (
      <div
        className={`w-full py-3 px-2 flex items-center justify-center gap-1.5 text-center text-xs font-bold ${buttonClasses} shadow`}
        style={finalStyle}
      >
        {renderIcon(data.icon)}
        <span className="truncate">{data.title || 'Opção 1'}</span>
      </div>
    );

    const btn2 = (
      <div
        className={`w-full py-3 px-2 flex items-center justify-center gap-1.5 text-center text-xs font-bold ${buttonClasses} shadow`}
        style={{
          ...finalStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
          color: theme.textColor,
        }}
      >
        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        <span className="truncate">{data.secondaryTitle || 'Opção 2'}</span>
      </div>
    );

    if (isEditor) {
      return (
        <div className="w-full grid grid-cols-2 gap-2 cursor-pointer">
          {btn1}
          {btn2}
        </div>
      );
    }

    return (
      <div className="w-full grid grid-cols-2 gap-2">
        <a href={data.url || '#'} target="_blank" rel="noopener noreferrer" className="block no-underline">
          {btn1}
        </a>
        <a href={data.secondaryUrl || '#'} target="_blank" rel="noopener noreferrer" className="block no-underline">
          {btn2}
        </a>
      </div>
    );
  }

  // Model 3: Link Destaque / Destaque Pulsar com Banner
  if (layout === 'featured') {
    const featuredContent = (
      <div
        className={`w-full py-4 px-4 flex items-center justify-between gap-3 text-center ${buttonClasses} ${animationClass} border-2 relative overflow-hidden`}
        style={{
          ...finalStyle,
          boxShadow: '0 8px 25px -4px rgba(99, 102, 241, 0.4)',
        }}
      >
        <div className="w-7 flex items-center justify-start">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-extrabold text-sm sm:text-base tracking-tight truncate">
              {data.title || 'Link em Destaque'}
            </span>
            <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex-shrink-0 animate-bounce">
              {data.badgeText || 'EXCLUSIVO 🔥'}
            </span>
          </div>
          {data.subtitle && (
            <p className="text-xs opacity-90 mt-0.5 font-medium truncate">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="w-7 flex items-center justify-end">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    );

    if (isEditor) {
      return <div className="w-full cursor-pointer">{featuredContent}</div>;
    }
    return (
      <a href={data.url || '#'} target="_blank" rel="noopener noreferrer" className="block w-full no-underline">
        {featuredContent}
      </a>
    );
  }

  // Model 4: Link Clássico (Padrão e Outline)
  const classicContent = (
    <div
      className={`w-full py-3.5 px-4 flex items-center justify-between gap-3 text-center ${buttonClasses} ${animationClass}`}
      style={finalStyle}
    >
      <div className="w-6 flex items-center justify-start opacity-70">
        {renderIcon(data.icon)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-center gap-2">
          <span className="font-semibold text-sm md:text-base truncate">
            {data.title || 'Novo Link'}
          </span>
          {data.badgeText && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/20 text-inherit flex-shrink-0 border border-current/20">
              {data.badgeText}
            </span>
          )}
        </div>
        {data.subtitle && (
          <p className="text-xs opacity-80 mt-0.5 font-normal truncate">
            {data.subtitle}
          </p>
        )}
      </div>

      <div className="w-6 flex items-center justify-end opacity-60">
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </div>
  );

  if (isEditor) {
    return <div className="w-full cursor-pointer">{classicContent}</div>;
  }

  return (
    <a
      href={data.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full no-underline"
    >
      {classicContent}
    </a>
  );
};
