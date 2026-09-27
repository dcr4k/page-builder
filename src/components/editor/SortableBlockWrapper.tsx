import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Copy, ArrowUp, ArrowDown, Edit3, ArrowUpDown, X } from 'lucide-react';
import type { Block, PageTheme } from '../../types';
import { BlockRenderer } from '../blocks/BlockRenderer';

interface SortableBlockWrapperProps {
  block: Block;
  theme: PageTheme;
  isSelected: boolean;
  isDeleting?: boolean;
  showDragHint?: boolean;
  onDismissDragHint?: () => void;
  onSelect: () => void;
  onOpenEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const SortableBlockWrapper: React.FC<SortableBlockWrapperProps> = ({
  block,
  theme,
  isSelected,
  isDeleting = false,
  showDragHint = false,
  onDismissDragHint,
  onSelect,
  onOpenEdit,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: block.id });

  const isTargetGuide = isOver && !isDragging;

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    zIndex: isDragging ? 50 : isTargetGuide ? 30 : undefined,
    opacity: isDragging ? 0.8 : undefined,
    touchAction: isDragging ? 'none' : 'pan-y',
  };

  const getBlockName = (type: Block['type']) => {
    switch (type) {
      case 'profile': return 'Perfil';
      case 'link': return 'Link';
      case 'social': return 'Redes';
      case 'product': return 'Produto';
      case 'contact': return 'Contato';
      case 'media': return 'Mídia';
      case 'text': return 'Texto';
      case 'divider': return 'Divisor';
      case 'faq': return 'FAQ';
      default: return 'Bloco';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
        if (showDragHint && onDismissDragHint) {
          onDismissDragHint();
        }
      }}
      className={`relative rounded-2xl transition-all duration-200 select-none cursor-grab active:cursor-grabbing ${
        isDeleting ? 'block-exit-anim' : 'block-enter-anim'
      } ${
        isDragging
          ? 'scale-[1.025] shadow-2xl ring-2 ring-brand-500 z-50'
          : isTargetGuide
          ? 'guide-target-block ring-2 ring-brand-400 bg-brand-500/10'
          : isSelected
          ? 'ring-2 ring-brand-500 shadow-[0_0_25px_rgba(0,229,153,0.35)]'
          : showDragHint && isFirst
          ? 'ring-2 ring-brand-400/80 shadow-[0_0_20px_rgba(0,229,153,0.3)]'
          : 'hover:ring-1 hover:ring-brand-400/50'
      }`}
    >
      {/* Drop Target Guide Indicator: Appears on the block being hovered over */}
      {isTargetGuide && (
        <>
          {/* Glowing guide insertion line */}
          <div className="absolute -top-1.5 left-2 right-2 h-1.5 bg-gradient-to-r from-emerald-500 via-brand-500 to-teal-400 rounded-full shadow-[0_0_15px_rgba(0,229,153,0.9)] z-40 animate-pulse pointer-events-none" />
          
          {/* Target Position Pill Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-emerald-500 to-brand-600 text-black text-[10px] font-black px-3 py-0.5 rounded-full shadow-lg border border-brand-300/50 flex items-center gap-1.5 pointer-events-none animate-pulse whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            <span>Mover para o lado deste bloco</span>
          </div>
        </>
      )}

      {/* Visual onboarding hint directly centered on the first block */}
      {showDragHint && isFirst && !isDeleting && !isTargetGuide && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 max-w-[92%] bg-studio-panel/95 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.8)] border border-brand-500/50 flex items-center justify-center gap-1.5 transition-all animate-pulse"
        >
          <div className="w-4 h-4 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
            <ArrowUpDown className="w-2.5 h-2.5 text-brand-400" />
          </div>
          <span className="truncate">Segure e arraste este bloco para reordenar</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismissDragHint?.();
            }}
            className="w-4 h-4 rounded-full hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors ml-0.5 flex-shrink-0"
            title="Fechar dica"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Bar when selected */}
      {isSelected && !isDeleting && !isTargetGuide && (
        <div
          className="absolute -top-3.5 right-2 z-30 flex items-center gap-1 bg-studio-panel border border-studio-border rounded-xl p-1 shadow-2xl animate-fade-in backdrop-blur-md"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Open Inspector Sheet */}
          <button
            type="button"
            onClick={onOpenEdit}
            className="px-2.5 py-1 rounded-lg bg-brand-500 hover:bg-brand-400 text-black text-[11px] font-black flex items-center gap-1 shadow-md shadow-brand-500/20 active:scale-95 transition-all"
            title="Editar conteúdo"
          >
            <Edit3 className="w-3 h-3 stroke-[2.5]" />
            <span>Editar</span>
          </button>

          {/* Quick Grip Icon (visual indicator) */}
          <div
            className="p-1 rounded text-slate-300 hover:text-brand-400 cursor-grab active:cursor-grabbing"
            title="Você pode arrastar clicando em qualquer lugar do bloco"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          {/* Move Up */}
          <button
            type="button"
            disabled={isFirst}
            onClick={onMoveUp}
            className="p-1 rounded hover:bg-studio-hover text-slate-300 hover:text-white disabled:opacity-20 active:scale-90 transition-colors"
            title="Mover para cima"
          >
            <ArrowUp className="w-3 h-3" />
          </button>

          {/* Move Down */}
          <button
            type="button"
            disabled={isLast}
            onClick={onMoveDown}
            className="p-1 rounded hover:bg-studio-hover text-slate-300 hover:text-white disabled:opacity-20 active:scale-90 transition-colors"
            title="Mover para baixo"
          >
            <ArrowDown className="w-3 h-3" />
          </button>

          {/* Duplicate */}
          <button
            type="button"
            onClick={onDuplicate}
            className="p-1 rounded hover:bg-studio-hover text-slate-300 hover:text-white active:scale-90 transition-colors"
            title="Duplicar"
          >
            <Copy className="w-3 h-3" />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={onDelete}
            className="p-1 rounded hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 active:scale-90 transition-colors"
            title="Excluir"
          >
            <Trash2 className="w-3 h-3" />
          </button>

          {/* Deselect / Close Selection */}
          <button
            type="button"
            onClick={onSelect}
            className="p-1 rounded hover:bg-studio-hover text-slate-300 hover:text-white active:scale-90 transition-colors"
            title="Desmarcar bloco"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Block Type Badge when selected */}
      {isSelected && !isDeleting && !isTargetGuide && (
        <div className="absolute -top-3 left-2.5 z-30 px-2.5 py-0.5 bg-brand-500 text-black text-[10px] font-black rounded-md uppercase tracking-wider shadow-md pointer-events-none">
          {getBlockName(block.type)}
        </div>
      )}

      {/* Render the block content */}
      <div className="p-1 pointer-events-none">
        <BlockRenderer block={block} theme={theme} isEditor={true} />
      </div>
    </div>
  );
};
