import React from 'react';
import { Quote, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PageTheme, TextBlockData } from '../../types';

interface TextBlockViewProps {
  data: TextBlockData;
  theme: PageTheme;
}

export const TextBlockView: React.FC<TextBlockViewProps> = ({ data, theme }) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[data.align] || 'text-center';

  // Model 1: Citação Inspiradora / Depoimento (Quote Card)
  if (data.style === 'quote') {
    return (
      <div
        className="w-full p-4 sm:p-5 rounded-2xl border shadow-md relative overflow-hidden"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
      >
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 flex-shrink-0 opacity-40 -mt-1" style={{ color: theme.primaryColor }} />
          <div className="flex-1 min-w-0">
            <p
              className="italic text-sm sm:text-base leading-relaxed font-serif"
              style={{ color: theme.textColor }}
            >
              "{data.content}"
            </p>
            {(data.quoteAuthor || data.title) && (
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs" style={{ color: theme.textColor }}>
                    {data.quoteAuthor || data.title}
                  </h5>
                  {data.quoteRole && (
                    <span className="text-[10px] opacity-70 block" style={{ color: theme.textSecondaryColor }}>
                      {data.quoteRole}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Model 2: Caixa de Aviso / Comunicado (Callout Box)
  if (data.style === 'callout') {
    return (
      <div
        className="w-full p-3.5 sm:p-4 rounded-2xl border shadow-sm flex items-start gap-3"
        style={{
          backgroundColor: `${theme.primaryColor}15`,
          borderColor: `${theme.primaryColor}50`,
          borderLeftWidth: '4px',
          borderLeftColor: theme.primaryColor,
        }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${theme.primaryColor}25` }}>
          <AlertCircle className="w-4 h-4" style={{ color: theme.primaryColor }} />
        </div>
        <div className="flex-1 min-w-0">
          {data.title && (
            <h4
              className="font-bold text-xs sm:text-sm mb-0.5"
              style={{ color: theme.textColor }}
            >
              {data.title}
            </h4>
          )}
          <p
            className="text-xs leading-relaxed"
            style={{ color: theme.textSecondaryColor }}
          >
            {data.content}
          </p>
        </div>
      </div>
    );
  }

  // Model 3: Lista de Tópicos / Benefícios (Checklist)
  if (data.style === 'checklist') {
    const items = data.bulletItems && data.bulletItems.length > 0 ? data.bulletItems : [
      'Garantia incondicional de 7 dias',
      'Acesso imediato e vitalício',
      'Suporte direto para dúvidas',
      'Certificado de conclusão incluído',
    ];

    return (
      <div
        className="w-full p-4 rounded-2xl border shadow-sm space-y-2.5"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
      >
        {data.title && (
          <h4
            className="font-bold text-xs sm:text-sm mb-2"
            style={{ color: theme.textColor }}
          >
            {data.title}
          </h4>
        )}
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium" style={{ color: theme.textColor }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Model 4: Título & Parágrafo Editorial (Default)
  return (
    <div className={`w-full py-2 px-1 ${alignClass}`}>
      {data.title && (
        <h3
          className="font-bold text-base sm:text-lg mb-1.5"
          style={{ color: theme.textColor }}
        >
          {data.title}
        </h3>
      )}
      <p
        className="text-xs sm:text-sm leading-relaxed whitespace-pre-line"
        style={{ color: theme.textSecondaryColor }}
      >
        {data.content}
      </p>
    </div>
  );
};
