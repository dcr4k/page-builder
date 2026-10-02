import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Code2, QrCode, X } from 'lucide-react';
import { Block, PageTheme } from '../../types';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { getBackgroundStyle } from '../../utils/themeStyles';

interface LivePreviewScreenProps {
  theme: PageTheme;
  blocks: Block[];
  onBackToEditor: () => void;
  onOpenExportModal?: () => void;
}

export const LivePreviewScreen: React.FC<LivePreviewScreenProps> = ({
  theme,
  blocks,
  onBackToEditor,
}) => {
  const [showQrCode, setShowQrCode] = useState(false);

  const bgStyle = getBackgroundStyle(theme);

  return (
    <div
      className="fixed inset-0 h-full w-full flex flex-col overflow-y-auto overflow-x-hidden bg-[#090b0e] select-text"
      style={{
        ...(theme.backgroundType !== 'image' ? bgStyle : undefined),
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorY: 'contain',
      }}
    >
      {/* Blurred Background Image layer if image type */}
      {theme.backgroundType === 'image' && theme.backgroundImage && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${theme.backgroundImage})`,
              filter: theme.backgroundBlur ? `blur(${theme.backgroundBlur}px)` : undefined,
              transform: theme.backgroundBlur ? 'scale(1.15)' : undefined,
            }}
          />
          {theme.backgroundOverlayOpacity > 0 && (
            <div
              className="absolute inset-0 bg-black pointer-events-none"
              style={{ opacity: theme.backgroundOverlayOpacity }}
            />
          )}
        </div>
      )}

      {/* Floating Top Control Bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-studio-panel/95 backdrop-blur-xl border border-studio-border rounded-2xl shadow-2xl px-3 py-2 flex items-center gap-2 sm:gap-4 select-none">
        <button
          type="button"
          onClick={onBackToEditor}
          className="py-1.5 px-3 rounded-xl bg-studio-card hover:bg-studio-border border border-studio-border/60 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Editor</span>
        </button>

        <div className="h-4 w-[1px] bg-studio-border" />

        {/* Mobile View Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile</span>
        </div>

        <div className="h-4 w-[1px] bg-studio-border" />

        <button
          type="button"
          onClick={() => setShowQrCode(!showQrCode)}
          className="p-2 rounded-xl bg-studio-card hover:bg-studio-border border border-studio-border/60 text-zinc-300 hover:text-white transition-colors"
          title="Ver QR Code para celular"
        >
          <QrCode className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* QR Code Modal Overlay */}
      {showQrCode && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-studio-panel border border-studio-border rounded-2xl p-6 max-w-sm w-full text-center flex flex-col items-center shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowQrCode(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-base text-white">
              Escanear no Smartphone
            </h3>
            <p className="text-xs text-zinc-400 mt-1 mb-4">
              Aponte a câmera do seu celular para testar a experiência mobile ao vivo.
            </p>

            {/* Generated QR Code preview mockup */}
            <div className="p-4 bg-white rounded-2xl shadow-inner mb-3">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.href
                )}`}
                alt="QR Code"
                className="w-44 h-44"
              />
            </div>

            <span className="text-[11px] text-zinc-500">
              Funciona com qualquer leitor de QR Code padrão.
            </span>
          </div>
        </div>
      )}

      {/* Live Content Container (Exclusively Smartphone View) */}
      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-16 px-4 relative z-10">
        <div
          className="w-full max-w-[420px] mx-auto flex flex-col gap-3.5 transition-all duration-300"
          style={{ fontFamily: theme.fontFamily }}
        >
          {blocks.map((block) => (
            <div key={block.id} className="w-full">
              <BlockRenderer block={block} theme={theme} isEditor={false} />
            </div>
          ))}

          {/* Footer branding */}
          <footer className="mt-8 text-center text-xs opacity-60 font-sans" style={{ color: theme.textSecondaryColor }}>
            <p>Criado com <strong>Digit4l Builder</strong></p>
          </footer>
        </div>
      </main>
    </div>
  );
};
