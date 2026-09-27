import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Plus, Layers } from 'lucide-react';
import type { Block, PageTheme } from '../../types';
import { SortableBlockWrapper } from './SortableBlockWrapper';
import { getBackgroundStyle } from '../../utils/themeStyles';
import { isLightColor } from '../../utils/contrast';

interface CanvasAreaProps {
  blocks: Block[];
  theme: PageTheme;
  selectedBlockId: string | null;
  deletingBlockIds?: string[];
  onSelectBlock: (id: string | null) => void;
  onOpenEditBlock: (id: string) => void;
  onUpdateBlocks: (newBlocks: Block[]) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onOpenAddSheet: () => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  blocks,
  theme,
  selectedBlockId,
  deletingBlockIds = [],
  onSelectBlock,
  onOpenEditBlock,
  onUpdateBlocks,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock,
  onOpenAddSheet,
}) => {
  const bgStyle = getBackgroundStyle(theme);
  const [showDragHint, setShowDragHint] = useState(true);

  // Auto-hide drag hint after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDragHint(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 6, // 6px movement triggers drag with mouse on desktop
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 200ms press-and-hold triggers drag on smartphone touchscreens
        tolerance: 8, // 8px tolerance during press-and-hold
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setShowDragHint(false);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onUpdateBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  return (
    <div
      className="flex-1 min-h-0 w-full bg-studio-black flex flex-col items-center justify-start overflow-y-auto overscroll-contain px-2 sm:px-4 pt-3 pb-52 select-none"
      onClick={() => onSelectBlock(null)}
      style={{
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Mobile Smartphone Viewport Frame */}
      <div
        className="w-full max-w-[420px] rounded-[38px] p-2.5 sm:p-3 bg-[#0a0c0f] border-2 border-studio-border shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col relative transition-all duration-300"
      >
        {/* Dynamic Island / Notch */}
        <div className="w-full pt-1 pb-2 flex justify-center pointer-events-none">
          <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end pr-2.5">
            <div className="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-800" />
          </div>
        </div>

        {/* Screen Canvas Surface (Natural vertical growth and scroll) */}
        <div
          className="w-full flex-1 rounded-[28px] p-3 sm:p-4 flex flex-col transition-all duration-300 relative shadow-inner overflow-hidden"
          style={{
            ...(theme.backgroundType !== 'image' ? bgStyle : { backgroundColor: '#090b0e' }),
            fontFamily: theme.fontFamily,
            minHeight: '520px',
          }}
        >
          {/* Blurred Background Image layer if image type */}
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

          <div className="w-full flex-1 flex flex-col relative z-10">
          {blocks.length === 0 ? (
            <div className="py-20 px-4 text-center flex flex-col items-center justify-center my-auto">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-3 shadow-lg shadow-brand-500/10">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-white">
                Sua página está vazia
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Toque no botão abaixo para adicionar seu primeiro bloco.
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAddSheet();
                }}
                className="mt-5 px-5 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-brand-500/25 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Adicionar Primeiro Bloco</span>
              </button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3 py-1">
                  {blocks.map((block, index) => (
                    <SortableBlockWrapper
                      key={block.id}
                      block={block}
                      theme={theme}
                      isSelected={selectedBlockId === block.id}
                      isDeleting={deletingBlockIds.includes(block.id)}
                      showDragHint={showDragHint}
                      onDismissDragHint={() => setShowDragHint(false)}
                      onSelect={() => onSelectBlock(selectedBlockId === block.id ? null : block.id)}
                      onOpenEdit={() => onOpenEditBlock(block.id)}
                      onDelete={() => onDeleteBlock(block.id)}
                      onDuplicate={() => onDuplicateBlock(block.id)}
                      onMoveUp={() => onMoveBlock(block.id, 'up')}
                      onMoveDown={() => onMoveBlock(block.id, 'down')}
                      isFirst={index === 0}
                      isLast={index === blocks.length - 1}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {/* Prominent Add Block Button at the bottom of the list */}
          {blocks.length > 0 && (
            <div className="pt-6 pb-6 text-center flex flex-col items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAddSheet();
                }}
                className={`w-full py-3.5 px-4 rounded-2xl border-2 border-dashed active:scale-[0.98] text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all group ${
                  isLightColor(theme.backgroundColor)
                    ? 'border-brand-600/70 bg-zinc-950/90 text-white hover:bg-zinc-950'
                    : 'border-brand-500/50 hover:border-brand-500 bg-studio-panel/90 hover:bg-studio-card text-brand-400 hover:text-white'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-brand-500 text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow font-black">
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>+ Adicionar Novo Bloco Abaixo</span>
              </button>
              <span className={`text-[10px] mt-1.5 font-medium ${isLightColor(theme.backgroundColor) ? 'text-zinc-600' : 'text-slate-400'}`}>
                Toque para adicionar mais links, produtos ou seções
              </span>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};
