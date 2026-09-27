import React from 'react';
import { DividerBlockData, PageTheme } from '../../types';

interface DividerBlockViewProps {
  data: DividerBlockData;
  theme: PageTheme;
}

export const DividerBlockView: React.FC<DividerBlockViewProps> = ({ data, theme }) => {
  const spacingClass = {
    sm: 'py-2',
    md: 'py-4',
    lg: 'py-6',
    xl: 'py-8',
  }[data.spacing] || 'py-4';

  // Model 4: Espaçador Invisível (Respiro de Layout)
  if (data.style === 'space') {
    return <div className={`w-full ${spacingClass}`} />;
  }

  // Model 1: Divisor com Badge / Texto Decorativo no Centro
  if (data.style === 'badge') {
    return (
      <div className={`w-full flex items-center justify-center gap-3 ${spacingClass}`}>
        <div className="flex-1 h-[1px]" style={{ backgroundColor: theme.cardBorderColor }} />
        <span
          className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border shadow-xs"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorderColor,
            color: theme.primaryColor,
          }}
        >
          {data.badgeText || '✦ DESTAQUES ✦'}
        </span>
        <div className="flex-1 h-[1px]" style={{ backgroundColor: theme.cardBorderColor }} />
      </div>
    );
  }

  // Model 2: Três Pontos Decorativos (Dots)
  if (data.style === 'dots') {
    return (
      <div className={`w-full flex items-center justify-center gap-2.5 ${spacingClass}`}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.cardBorderColor }} />
        <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: theme.primaryColor }} />
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.cardBorderColor }} />
      </div>
    );
  }

  // Model 3: Linha Neon com Gradiente (Default moderno)
  return (
    <div className={`w-full flex items-center justify-center ${spacingClass}`}>
      <div
        className="w-full h-[1.5px]"
        style={{
          background: `linear-gradient(to right, transparent, ${theme.primaryColor}, transparent)`,
        }}
      />
    </div>
  );
};
