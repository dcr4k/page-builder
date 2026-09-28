import React from 'react';
import type { Template } from '../../types';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { getBackgroundStyle } from '../../utils/themeStyles';
import { Wifi, Battery, Signal } from 'lucide-react';
import { EmptyCanvasSimulation } from './EmptyCanvasSimulation';

interface DeviceCardPreviewProps {
  template: Template;
  isActive: boolean;
  onClick?: () => void;
}

export const DeviceCardPreview: React.FC<DeviceCardPreviewProps> = ({
  template,
  isActive,
  onClick,
}) => {
  const bgStyle = getBackgroundStyle(template.theme);
  const isBlankTemplate = template.id === 'comecar-do-zero';

  return (
    <div
      onClick={onClick}
      className={`relative mx-auto select-none transition-all duration-300 w-[195px] sm:w-[218px] md:w-[230px] h-[330px] sm:h-[358px] md:h-[372px] ${
        isActive
          ? 'cursor-default'
          : 'cursor-pointer hover:brightness-110'
      }`}
    >
      {/* Phone Outer Shell with Neon Glow on Active */}
      <div
        className={`w-full h-full rounded-[32px] sm:rounded-[36px] p-1.5 sm:p-2 bg-[#0a0c0f] flex flex-col relative overflow-hidden transition-all duration-300 ${
          isActive
            ? 'border-2 border-brand-500 shadow-[0_0_28px_rgba(0,229,153,0.55),0_20px_50px_rgba(0,0,0,0.95)]'
            : 'border-2 border-zinc-800/80 shadow-[0_15px_35px_rgba(0,0,0,0.85)]'
        }`}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 z-30 w-14 sm:w-16 h-3 bg-black rounded-full flex items-center justify-end pr-1.5 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-800" />
        </div>

        {/* Screen Bezel */}
        <div
          className="w-full h-full rounded-[25px] sm:rounded-[28px] overflow-hidden flex flex-col relative bg-[#090b0e]"
          style={template.theme.backgroundType !== 'image' ? bgStyle : undefined}
        >
          {/* Blurred Background Image layer if image type */}
          {template.theme.backgroundType === 'image' && template.theme.backgroundImage && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${template.theme.backgroundImage})`,
                  filter: template.theme.backgroundBlur ? `blur(${Math.min(template.theme.backgroundBlur, 8)}px)` : undefined,
                  transform: template.theme.backgroundBlur ? 'scale(1.2)' : undefined,
                }}
              />
              {template.theme.backgroundOverlayOpacity > 0 && (
                <div
                  className="absolute inset-0 bg-black pointer-events-none"
                  style={{ opacity: template.theme.backgroundOverlayOpacity }}
                />
              )}
            </div>
          )}

          {/* Inactive Dim Overlay for Depth Effect */}
          {!isActive && (
            <div className="absolute inset-0 bg-black/45 z-25 pointer-events-none transition-opacity duration-300" />
          )}

          {/* Status Bar */}
          <div className="w-full h-5 sm:h-6 px-3 sm:px-3.5 flex items-center justify-between text-[8px] sm:text-[9px] font-semibold text-white/90 z-20 pt-0.5 pointer-events-none">
            <span>9:41</span>
            <div className="flex items-center gap-1 opacity-80">
              <Signal className="w-2.5 h-2.5" />
              <Wifi className="w-2.5 h-2.5" />
              <Battery className="w-3 h-3" />
            </div>
          </div>

          {/* Screen Content Preview */}
          <div
            className="flex-1 overflow-y-auto no-scrollbar px-2 sm:px-2.5 py-1 sm:py-1.5 flex flex-col gap-1.5 pointer-events-none relative z-10"
            style={{
              fontFamily: template.theme.fontFamily,
            }}
          >
            {isBlankTemplate ? (
              <EmptyCanvasSimulation />
            ) : (
              template.blocks.slice(0, 5).map((block) => (
                <div key={block.id} className="w-full transform scale-[0.74] sm:scale-[0.78] origin-top">
                  <BlockRenderer block={block} theme={template.theme} isEditor={false} />
                </div>
              ))
            )}
          </div>

          {/* Home Indicator Bar */}
          <div className="w-full h-3 sm:h-3.5 flex items-center justify-center pointer-events-none z-20 pb-0.5">
            <div className="w-16 sm:w-20 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
