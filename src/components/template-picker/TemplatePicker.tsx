import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Layers } from 'lucide-react';
import type { Template } from '../../types';
import { DeviceCardPreview } from './DeviceCardPreview';

interface TemplatePickerProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

export const TemplatePicker: React.FC<TemplatePickerProps> = ({ templates, onSelectTemplate }) => {
  // Start on 'lojinha-virtual' if present
  const defaultIndex = templates.findIndex((t) => t.id === 'lojinha-virtual');
  const [currentIndex, setCurrentIndex] = useState(defaultIndex !== -1 ? defaultIndex : 0);

  // Drag / Swipe interaction states
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingDeltaXRef = useRef<number>(0);

  // 3D Parallax tilt state for the center card
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRafIdRef = useRef<number | null>(null);

  // Schedule drag updates aligned to display V-Sync (60Hz / 120Hz)
  const scheduleDragUpdate = useCallback((delta: number) => {
    pendingDeltaXRef.current = delta;
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        setDragOffset(pendingDeltaXRef.current);
        rafIdRef.current = null;
      });
    }
  }, []);

  // Cleanup pending RAFs on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (tiltRafIdRef.current !== null) cancelAnimationFrame(tiltRafIdRef.current);
    };
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  }, [templates.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  }, [templates.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Enter') {
        onSelectTemplate(templates[currentIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, handleNext, handlePrev, onSelectTemplate, templates]);

  // Touch Handlers with 120Hz RAF throttling for silky-smooth iOS gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null || startYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startXRef.current;
    const deltaY = currentY - startYRef.current;

    // Detect gesture direction
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isHorizontalSwipeRef.current = Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
      }
    }

    if (isHorizontalSwipeRef.current) {
      scheduleDragUpdate(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    const finalOffset = pendingDeltaXRef.current;
    if (isHorizontalSwipeRef.current && Math.abs(finalOffset) > 40) {
      if (finalOffset < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setIsDragging(false);
    setDragOffset(0);
    pendingDeltaXRef.current = 0;
    startXRef.current = null;
    startYRef.current = null;
    isHorizontalSwipeRef.current = null;
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startXRef.current === null) {
      // Handle 3D Parallax Tilt when hovering on desktop with RAF throttle
      if (containerRef.current && tiltRafIdRef.current === null) {
        const clientX = e.clientX;
        const clientY = e.clientY;
        tiltRafIdRef.current = requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const x = (clientX - centerX) / (rect.width / 2);
            const y = (clientY - centerY) / (rect.height / 2);
            setMouseTilt({
              x: Math.max(-1, Math.min(1, x)),
              y: Math.max(-1, Math.min(1, y)),
            });
          }
          tiltRafIdRef.current = null;
        });
      }
      return;
    }
    const deltaX = e.clientX - startXRef.current;
    scheduleDragUpdate(deltaX);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      const finalOffset = pendingDeltaXRef.current;
      if (Math.abs(finalOffset) > 40) {
        if (finalOffset < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      setIsDragging(false);
      setDragOffset(0);
      pendingDeltaXRef.current = 0;
      startXRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    if (tiltRafIdRef.current !== null) {
      cancelAnimationFrame(tiltRafIdRef.current);
      tiltRafIdRef.current = null;
    }
    setMouseTilt({ x: 0, y: 0 });
  };

  const handleSelectClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    onSelectTemplate(templates[currentIndex]);
  };

  const currentTemplate = templates[currentIndex];

  return (
    <div
      className="fixed inset-0 h-full h-[100dvh] w-full bg-[#090b0e] text-slate-100 flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Spotlight Glow in brand green */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Section matching user's sketch */}
      <header className="text-center max-w-md mx-auto z-20 pt-1 sm:pt-2 flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Escolha seu layout
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5 px-4 leading-relaxed font-normal">
          Deslize para os lados para navegar entre os estilos pré-definidos.
        </p>

        {/* Layout Title ABOVE 3D Mockup */}
        <div className="mt-2 sm:mt-2.5 flex items-center justify-center">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight transition-all duration-300">
            {currentTemplate.name}
          </h2>
        </div>
      </header>

      {/* 3D Cover Flow Carousel Stage */}
      <div
        ref={containerRef}
        className="w-full flex-1 min-h-[300px] flex items-center justify-center relative z-10 touch-none my-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* Stage Container with 3D Perspective */}
        <div
          className="relative w-full max-w-4xl h-[330px] sm:h-[358px] md:h-[372px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1100px',
            WebkitPerspective: '1100px',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            isolation: 'isolate',
          }}
        >
          {/* Render All Templates in 3D Space */}
          {templates.map((tpl, idx) => {
            const total = templates.length;
            let diff = idx - currentIndex;
            while (diff > total / 2) diff -= total;
            while (diff < -total / 2) diff += total;

            // Include real-time drag interaction
            const dragFraction = dragOffset / 230;
            const effectiveDiff = diff + dragFraction;

            const isCenter = Math.abs(effectiveDiff) < 0.45;
            const isImmediateLeft = effectiveDiff <= -0.45 && effectiveDiff > -1.55;
            const isImmediateRight = effectiveDiff >= 0.45 && effectiveDiff < 1.55;
            const isFarLeft = effectiveDiff <= -1.55 && effectiveDiff >= -2.5;
            const isFarRight = effectiveDiff >= 1.55 && effectiveDiff <= 2.5;

            // Calculate 3D transforms based on position
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let rotateX = 0;
            let scale = 1;
            let opacity = 0;
            let zIndex = 1;
            let pointerEvents: 'auto' | 'none' = 'none';

            if (isCenter) {
              const progress = Math.abs(effectiveDiff);
              scale = 1.0 - progress * 0.12;
              rotateY = -effectiveDiff * 25 + mouseTilt.x * 7;
              rotateX = mouseTilt.y * -5;
              translateX = effectiveDiff * 145;
              translateZ = 60 - progress * 80;
              opacity = 1 - progress * 0.15;
              zIndex = 30;
              pointerEvents = 'auto';
            } else if (isImmediateLeft) {
              const progress = -effectiveDiff;
              translateX = -140 - (progress - 1) * 85;
              rotateY = 25 + (progress - 1) * 6;
              scale = Math.max(0.74, 0.83 - (progress - 1) * 0.08);
              translateZ = -20;
              opacity = Math.max(0.4, 0.7 - (progress - 1) * 0.3);
              zIndex = 20;
              pointerEvents = 'auto';
            } else if (isImmediateRight) {
              const progress = effectiveDiff;
              translateX = 140 + (progress - 1) * 85;
              rotateY = -25 - (progress - 1) * 6;
              scale = Math.max(0.74, 0.83 - (progress - 1) * 0.08);
              translateZ = -20;
              opacity = Math.max(0.4, 0.7 - (progress - 1) * 0.3);
              zIndex = 20;
              pointerEvents = 'auto';
            } else if (isFarLeft) {
              translateX = -235;
              translateZ = -80;
              rotateY = 35;
              scale = 0.68;
              opacity = 0.2;
              zIndex = 10;
              pointerEvents = 'auto';
            } else if (isFarRight) {
              translateX = 235;
              translateZ = -80;
              rotateY = -35;
              scale = 0.68;
              opacity = 0.2;
              zIndex = 10;
              pointerEvents = 'auto';
            } else {
              translateX = effectiveDiff > 0 ? 320 : -320;
              translateZ = -140;
              scale = 0.5;
              opacity = 0;
              zIndex = 1;
              pointerEvents = 'none';
            }

            // CRITICAL: calc(-50% + translateX) guarantees the card is mathematically DEAD CENTER
            const transform = `translate3d(calc(-50% + ${translateX}px), -50%, ${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
            const isVisible = Math.abs(effectiveDiff) <= 2.2;

            return (
              <div
                key={tpl.id}
                className="absolute top-1/2 left-1/2 will-change-transform"
                style={{
                  transform,
                  WebkitTransform: transform,
                  opacity,
                  zIndex,
                  pointerEvents,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                }}
              >
                {isVisible && (
                  <DeviceCardPreview
                    template={tpl}
                    isActive={isCenter && !isDragging}
                    onClick={() => {
                      if (Math.abs(dragOffset) < 10) {
                        if (diff === -1 || isImmediateLeft) handlePrev();
                        else if (diff === 1 || isImmediateRight) handleNext();
                      }
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Holographic Glowing Pedestal Stage Arc beneath the center phone */}
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center top-[calc(50%+142px)] sm:top-[calc(50%+156px)] md:top-[calc(50%+163px)]"
          >
            {/* Luminous Green Pedestal Arc Ring */}
            <div className="w-[200px] sm:w-[230px] md:w-[245px] h-[26px] sm:h-[30px] rounded-[100%] border-t-[2.5px] border-brand-500 shadow-[0_0_25px_#00e599,0_0_12px_#00e599,inset_0_0_10px_rgba(0,229,153,0.3)] bg-gradient-to-b from-brand-500/20 to-transparent blur-[0.5px] animate-pulse-subtle" />
            {/* Floor Radial Glow */}
            <div className="absolute top-1 w-[160px] sm:w-[190px] h-5 bg-brand-500/30 rounded-full blur-lg pointer-events-none" />
          </div>

          {/* Interactive Floating Arrow Navigation Buttons (Always in view on all screen sizes) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Layout anterior"
            className="flex absolute left-2 sm:left-4 md:left-6 z-40 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#12161f]/90 hover:bg-brand-500 text-white hover:text-black border border-zinc-700/80 hover:border-brand-500 shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(0,229,153,0.25)] backdrop-blur-md items-center justify-center transition-all duration-200 hover:scale-105 active:scale-90 cursor-pointer group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Próximo layout"
            className="flex absolute right-2 sm:right-4 md:right-6 z-40 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#12161f]/90 hover:bg-brand-500 text-white hover:text-black border border-zinc-700/80 hover:border-brand-500 shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(0,229,153,0.25)] backdrop-blur-md items-center justify-center transition-all duration-200 hover:scale-105 active:scale-90 cursor-pointer group"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Details, Dots & Primary Action Button (in flex flow, NEVER overlapping) */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center px-4 z-20 flex-shrink-0 pb-1">
        {/* Template Description */}
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 px-1 font-normal leading-relaxed max-w-xs sm:max-w-sm">
          {currentTemplate.description}
        </p>

        {/* Pagination Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2 mb-2">
          {templates.map((tpl, idx) => (
            <button
              key={tpl.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ver layout ${tpl.name}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-6 h-1 bg-brand-500 shadow-[0_0_8px_#00e599]'
                  : 'w-1.5 h-1 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        {/* Primary Action Button "SELECIONAR" matching user's sketch */}
        <button
          type="button"
          onClick={handleSelectClick}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-brand-500 to-teal-400 hover:brightness-110 active:scale-[0.98] text-black font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_6px_25px_rgba(0,229,153,0.35)] flex items-center justify-center gap-2 transition-all relative overflow-hidden group cursor-pointer"
        >
          {/* Shimmer light reflection sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          <span>SELECIONAR</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Start with blank page secondary option */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            const blankTemplate = templates.find((t) => t.id === 'comecar-do-zero') || templates[0];
            onSelectTemplate(blankTemplate);
          }}
          className="text-[11px] text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-1 py-1 mt-1 cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Ou começar com uma página em branco</span>
        </button>
      </div>
    </div>
  );
};
