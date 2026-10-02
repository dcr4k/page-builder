import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxHeight = 'max-h-[84vh]',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm fade-backdrop transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div
        className={`relative z-10 w-full max-w-lg mx-auto bg-studio-panel border-t border-studio-border rounded-t-[28px] shadow-[0_-15px_40px_rgba(0,0,0,0.95)] flex flex-col ${maxHeight} slide-in-up overflow-hidden`}
      >
        {/* Top Drag Pill */}
        <div
          className="w-full pt-3 pb-1 flex justify-center cursor-pointer"
          onClick={onClose}
        >
          <div className="w-10 h-1.5 rounded-full bg-brand-500/30 hover:bg-brand-500/50 transition-colors" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 border-b border-studio-border flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{title}</span>
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-studio-card hover:bg-studio-hover text-slate-300 hover:text-white border border-studio-border flex items-center justify-center transition-colors active:scale-95"
            aria-label="Fechar gaveta"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-5 no-scrollbar overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
