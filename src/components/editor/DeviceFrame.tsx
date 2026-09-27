import React from 'react';
import { Wifi, Battery, Signal, Globe, Lock } from 'lucide-react';
import { PageTheme, ViewportMode } from '../../types';
import { getBackgroundStyle } from '../../utils/themeStyles';

interface DeviceFrameProps {
  mode: ViewportMode;
  theme: PageTheme;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ mode, theme, children }) => {
  const bgStyle = getBackgroundStyle(theme);

  if (mode === 'desktop') {
    return (
      <div
        className="w-full max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden my-4"
        style={{ minHeight: '680px' }}
      >
        {/* Browser Top Bar */}
        <div className="h-10 bg-slate-800/90 border-b border-slate-700/80 px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs text-slate-400 font-mono w-72 justify-center">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>minhapagina.bio</span>
          </div>

          <div className="w-12" />
        </div>

        {/* Content Area */}
        <div
          className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-10 flex flex-col items-center relative overflow-hidden bg-[#090b0e]"
          style={theme.backgroundType !== 'image' ? bgStyle : undefined}
        >
          {theme.backgroundType === 'image' && theme.backgroundImage && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
          <div className="w-full max-w-xl mx-auto flex flex-col gap-4 relative z-10">
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'tablet') {
    return (
      <div
        className="w-full max-w-[540px] mx-auto rounded-[36px] p-3 bg-slate-900 border-[3px] border-slate-700 shadow-2xl flex flex-col overflow-hidden my-4"
        style={{ height: '780px' }}
      >
        <div
          className="w-full h-full rounded-[28px] overflow-hidden flex flex-col relative bg-[#090b0e]"
          style={theme.backgroundType !== 'image' ? bgStyle : undefined}
        >
          {theme.backgroundType === 'image' && theme.backgroundImage && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

          {/* Status Bar */}
          <div className="w-full h-8 px-6 flex items-center justify-between text-[11px] font-semibold text-white/80 z-20 pt-1 pointer-events-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-4 relative z-10">
            {children}
          </div>

          {/* Home Bar */}
          <div className="w-full h-5 flex items-center justify-center pointer-events-none pb-1">
            <div className="w-32 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    );
  }

  // Smartphone (Default)
  return (
    <div
      className="relative mx-auto rounded-[46px] p-3 bg-slate-900 border-[3px] border-slate-700 shadow-2xl flex flex-col overflow-hidden my-4 select-none"
      style={{
        width: '375px',
        height: '760px',
      }}
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-28 h-6 bg-black rounded-full flex items-center justify-end pr-3">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
      </div>

      {/* Screen Body */}
      <div
        className="w-full h-full rounded-[38px] overflow-hidden flex flex-col relative bg-[#090b0e]"
        style={theme.backgroundType !== 'image' ? bgStyle : undefined}
      >
        {theme.backgroundType === 'image' && theme.backgroundImage && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

        {/* Status Bar */}
        <div className="w-full h-10 px-7 flex items-center justify-between text-[11px] font-semibold text-white/90 z-20 pt-1 pointer-events-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Scrollable Block List */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-3.5 relative z-10">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="w-full h-5 flex items-center justify-center pointer-events-none z-20 pb-1">
          <div className="w-28 h-1 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
};
