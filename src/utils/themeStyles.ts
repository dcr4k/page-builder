import type { CSSProperties } from 'react';
import type { PageTheme } from '../types';
import { isLightColor } from './contrast';

export const getButtonClasses = (theme: PageTheme, _styleOverride?: string): string => {
  const radiusMap = {
    none: 'rounded-none',
    sm: 'rounded-md',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  };

  const shadowMap = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg hover:shadow-xl',
    glow: 'shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]',
  };

  const currentRadius = radiusMap[theme.buttonRadius] || 'rounded-xl';
  const currentShadow = shadowMap[theme.buttonShadow] || 'shadow-sm';

  return `transition-all duration-200 active:scale-[0.98] ${currentRadius} ${currentShadow}`;
};

export const getButtonStyle = (theme: PageTheme, styleOverride?: string): CSSProperties => {
  const styleType = styleOverride && styleOverride !== 'default' ? styleOverride : theme.buttonStyle;
  const isPageLight = isLightColor(theme.backgroundColor);
  const isPrimaryLight = isLightColor(theme.primaryColor);

  switch (styleType) {
    case 'primary': {
      // Variação DESTAQUE: Contraste padronizado e garantido
      return {
        backgroundColor: theme.primaryColor,
        color: isPrimaryLight ? '#0f172a' : '#ffffff',
        border: '1px solid transparent',
        boxShadow: isPrimaryLight
          ? '0 4px 14px -2px rgba(0, 0, 0, 0.15)'
          : '0 4px 16px -2px rgba(99, 102, 241, 0.35)',
      };
    }
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: isPageLight ? '#0f172a' : '#ffffff',
        border: `2px solid ${theme.primaryColor}`,
      };
    case 'glass':
      return {
        backgroundColor: isPageLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
        color: isPageLight ? '#0f172a' : '#ffffff',
        border: isPageLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      };
    case 'shadow3d':
      return {
        backgroundColor: theme.primaryColor,
        color: isPrimaryLight ? '#0f172a' : '#ffffff',
        boxShadow: `0 5px 0px 0px rgba(0, 0, 0, 0.35)`,
        transform: 'translateY(-2px)',
      };
    case 'soft':
      return {
        backgroundColor: `${theme.primaryColor}25`,
        color: isPageLight ? (isPrimaryLight ? '#0f172a' : theme.primaryColor) : theme.primaryColor,
        border: `1px solid ${theme.primaryColor}40`,
      };
    case 'filled':
    default:
      return {
        backgroundColor: theme.primaryColor,
        color: isPrimaryLight ? '#0f172a' : '#ffffff',
      };
  }
};

export const getBackgroundStyle = (theme: PageTheme): CSSProperties => {
  if (theme.backgroundType === 'gradient') {
    const viaPart = theme.gradient.via ? `, ${theme.gradient.via}` : '';
    let dir = 'to bottom';
    if (theme.gradient.direction === 'to-br') dir = 'to bottom right';
    if (theme.gradient.direction === 'to-r') dir = 'to right';
    if (theme.gradient.direction === 'to-t') dir = 'to top';

    return {
      background: `linear-gradient(${dir}, ${theme.gradient.from}${viaPart}, ${theme.gradient.to})`,
    };
  }

  if (theme.backgroundType === 'image' && theme.backgroundImage) {
    return {
      backgroundImage: `url(${theme.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return {
    backgroundColor: theme.backgroundColor,
  };
};
