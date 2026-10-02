import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { FaqBlockData, PageTheme } from '../../types';
import { getButtonClasses, getButtonStyle } from '../../utils/themeStyles';

interface FaqBlockViewProps {
  data: FaqBlockData;
  theme: PageTheme;
}

export const FaqBlockView: React.FC<FaqBlockViewProps> = ({ data, theme }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '1': true });

  const toggle = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const layout = data.layout || 'accordion';
  const buttonStyle = getButtonStyle(theme);
  const buttonClasses = getButtonClasses(theme);

  // Model 1: Cartões de Dúvidas Abertos (Perguntas e respostas sempre visíveis)
  if (layout === 'cards') {
    return (
      <div className="w-full py-2 space-y-2.5">
        {data.title && (
          <h3
            className="font-bold text-sm sm:text-base text-center mb-3"
            style={{ color: data.titleColor || theme.textColor }}
          >
            {data.title}
          </h3>
        )}

        <div className="grid grid-cols-1 gap-2.5">
          {(data.items || []).map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
            >
              <div className="flex items-start gap-2 mb-1.5">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme.primaryColor }} />
                <h4
                  className="font-bold text-xs sm:text-sm leading-snug"
                  style={{ color: data.questionColor || theme.textColor }}
                >
                  {item.question}
                </h4>
              </div>
              <p
                className="text-xs sm:text-sm pl-6 leading-relaxed opacity-85"
                style={{ color: data.answerColor || theme.textSecondaryColor }}
              >
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Model 2: Acordeão com Banner de Suporte no Rodapé
  if (layout === 'support') {
    return (
      <div className="w-full py-2 space-y-3">
        {data.title && (
          <h3
            className="font-bold text-sm sm:text-base text-center mb-2"
            style={{ color: data.titleColor || theme.textColor }}
          >
            {data.title}
          </h3>
        )}

        <div className="flex flex-col gap-2">
          {(data.items || []).map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div
                key={item.id}
                className="rounded-xl border overflow-hidden transition-all duration-200"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.cardBorderColor,
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full py-3 px-4 flex items-center justify-between text-left gap-3 focus:outline-none"
                >
                  <span
                    className="font-medium text-xs sm:text-sm"
                    style={{ color: data.questionColor || theme.textColor }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : 'opacity-60'
                    }`}
                    style={{ color: isOpen ? theme.primaryColor : theme.textSecondaryColor }}
                  />
                </button>

                {isOpen && (
                  <div
                    className="px-4 pb-3.5 pt-1 text-xs sm:text-sm leading-relaxed border-t"
                    style={{
                      borderColor: theme.cardBorderColor,
                      color: data.answerColor || theme.textSecondaryColor,
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support CTA Banner */}
        <div
          className="p-3 rounded-2xl border flex items-center justify-between gap-3 shadow-md"
          style={{
            backgroundColor: `${theme.primaryColor}15`,
            borderColor: `${theme.primaryColor}40`,
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primaryColor, color: '#fff' }}>
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold truncate" style={{ color: theme.textColor }}>
                Ainda tem alguma dúvida?
              </h5>
              <span className="text-[10px] opacity-75 block truncate" style={{ color: theme.textSecondaryColor }}>
                Fale agora com nosso suporte
              </span>
            </div>
          </div>
          <a
            href={data.supportButtonUrl || 'https://wa.me/5511999999999'}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow flex-shrink-0 no-underline ${buttonClasses}`}
            style={buttonStyle}
          >
            <span>{data.supportButtonText || 'Atendimento'}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // Model 3: Acordeão Clássico (Default)
  return (
    <div className="w-full py-2">
      {data.title && (
        <h3
          className="font-bold text-sm sm:text-base text-center mb-3"
          style={{ color: data.titleColor || theme.textColor }}
        >
          {data.title}
        </h3>
      )}

      <div className="flex flex-col gap-2">
        {(data.items || []).map((item) => {
          const isOpen = !!openItems[item.id];
          return (
            <div
              key={item.id}
              className="rounded-xl border overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full py-3 px-4 flex items-center justify-between text-left gap-3 focus:outline-none"
              >
                <span
                  className="font-medium text-xs sm:text-sm"
                  style={{ color: data.questionColor || theme.textColor }}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-primary' : 'opacity-60'
                  }`}
                  style={{ color: isOpen ? theme.primaryColor : theme.textSecondaryColor }}
                />
              </button>

              {isOpen && (
                <div
                  className="px-4 pb-3.5 pt-1 text-xs sm:text-sm leading-relaxed border-t"
                  style={{
                    borderColor: theme.cardBorderColor,
                    color: data.answerColor || theme.textSecondaryColor,
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
