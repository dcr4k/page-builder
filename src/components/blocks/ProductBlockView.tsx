import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { PageTheme, ProductBlockData, ProductItem } from '../../types';
import { getButtonClasses, getButtonStyle } from '../../utils/themeStyles';

interface ProductBlockViewProps {
  data: ProductBlockData;
  theme: PageTheme;
  isEditor?: boolean;
}

export const ProductBlockView: React.FC<ProductBlockViewProps> = ({ data, theme, isEditor }) => {
  const buttonStyle = getButtonStyle(theme);
  const buttonClasses = getButtonClasses(theme);

  const productList: ProductItem[] =
    data.items && data.items.length > 0
      ? data.items
      : [
          {
            id: 'p1',
            imageUrl: data.imageUrl || '',
            title: data.title || 'Nome do Produto',
            description: data.description || '',
            price: data.price || 'R$ 0,00',
            originalPrice: data.originalPrice,
            badge: data.badge,
            buttonText: data.buttonText || 'Comprar Agora',
            buttonUrl: data.buttonUrl || '#',
          },
        ];

  const layout = data.layout || '1-col';

  // Layout 1: 3 produtos por linha (Grid 3 colunas)
  if (layout === '3-col') {
    return (
      <div className="w-full grid grid-cols-3 gap-2">
        {productList.map((item, idx) => {
          const itemButton = (
            <div
              className={`w-full py-1 px-1 flex items-center justify-center text-center text-[10px] font-bold cursor-pointer ${buttonClasses}`}
              style={buttonStyle}
            >
              <span>{item.buttonText || 'Ver'}</span>
            </div>
          );

          return (
            <div
              key={item.id || idx}
              className="rounded-xl overflow-hidden shadow border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
            >
              <div>
                <div className="relative w-full aspect-square overflow-hidden bg-black/20">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  )}
                  {item.badge && (
                    <span className="absolute top-1 left-1 bg-black/85 backdrop-blur-xs text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full border border-white/20">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-1.5 flex flex-col gap-0.5">
                  <h4
                    className="font-bold text-[11px] leading-tight line-clamp-1"
                    style={{ color: theme.textColor }}
                    title={item.title}
                  >
                    {item.title || 'Produto'}
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-[11px] font-extrabold"
                      style={{ color: theme.primaryColor }}
                    >
                      {item.price || 'R$ 0,00'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-1.5 pt-0">
                {isEditor ? (
                  itemButton
                ) : (
                  <a
                    href={item.buttonUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline"
                  >
                    {itemButton}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Layout 2: 2 produtos por linha (Grid 2 colunas)
  if (layout === '2-col') {
    return (
      <div className="w-full grid grid-cols-2 gap-2.5">
        {productList.map((item, idx) => {
          const itemButton = (
            <div
              className={`w-full py-1.5 px-2 flex items-center justify-center gap-1 text-center text-xs font-bold cursor-pointer ${buttonClasses}`}
              style={buttonStyle}
            >
              <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{item.buttonText || 'Comprar'}</span>
            </div>
          );

          return (
            <div
              key={item.id || idx}
              className="rounded-2xl overflow-hidden shadow-md border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
            >
              <div>
                <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-black/20">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                  )}
                  {item.badge && (
                    <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-2.5 flex flex-col gap-1">
                  <h4
                    className="font-bold text-xs sm:text-sm leading-tight line-clamp-2"
                    style={{ color: theme.textColor }}
                    title={item.title}
                  >
                    {item.title || 'Nome do Produto'}
                  </h4>
                  <div className="flex items-baseline gap-1.5 pt-0.5">
                    <span
                      className="text-xs sm:text-sm font-extrabold"
                      style={{ color: theme.primaryColor }}
                    >
                      {item.price || 'R$ 0,00'}
                    </span>
                    {item.originalPrice && (
                      <span
                        className="text-[10px] line-through opacity-60"
                        style={{ color: theme.textSecondaryColor }}
                      >
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-2.5 pt-0">
                {isEditor ? (
                  itemButton
                ) : (
                  <a
                    href={item.buttonUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline"
                  >
                    {itemButton}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Layout 3: 1 produto por linha (Card completo ou lista)
  return (
    <div className="w-full flex flex-col gap-3">
      {productList.map((item, idx) => {
        const itemButton = (
          <div
            className={`w-full py-2.5 px-4 flex items-center justify-center gap-2 text-center text-sm font-semibold cursor-pointer ${buttonClasses}`}
            style={buttonStyle}
          >
            <ShoppingBag className="w-4 h-4 flex-shrink-0" />
            <span>{item.buttonText || 'Comprar Agora'}</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-80" />
          </div>
        );

        return (
          <div
            key={item.id || idx}
            className="w-full rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorderColor,
            }}
          >
            {item.imageUrl && (
              <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-black/20">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
                    {item.badge}
                  </span>
                )}
              </div>
            )}

            <div className="p-4 sm:p-5 flex flex-col gap-2">
              <h3
                className="font-bold text-base sm:text-lg leading-tight"
                style={{ color: theme.textColor }}
              >
                {item.title || 'Nome do Produto'}
              </h3>

              {item.description && (
                <p
                  className="text-xs sm:text-sm line-clamp-2 leading-relaxed"
                  style={{ color: theme.textSecondaryColor }}
                >
                  {item.description}
                </p>
              )}

              <div className="flex items-baseline gap-2 pt-1 pb-1">
                <span
                  className="text-lg sm:text-xl font-extrabold"
                  style={{ color: theme.primaryColor }}
                >
                  {item.price || 'R$ 0,00'}
                </span>
                {item.originalPrice && (
                  <span
                    className="text-xs sm:text-sm line-through opacity-60"
                    style={{ color: theme.textSecondaryColor }}
                  >
                    {item.originalPrice}
                  </span>
                )}
              </div>

              <div className="mt-1">
                {isEditor ? (
                  itemButton
                ) : (
                  <a
                    href={item.buttonUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline"
                  >
                    {itemButton}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
