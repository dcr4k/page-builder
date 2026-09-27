import React from 'react';
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
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowUp, ArrowDown, Trash2, Copy } from 'lucide-react';
import type { Block } from '../../types';

interface MobileReorderSheetProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onUpdateBlocks: (newBlocks: Block[]) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onDuplicateBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
}

const getBlockTitle = (block: Block): string => {
  switch (block.type) {
    case 'profile': return `Perfil: ${block.data.name || 'Sem nome'}`;
    case 'link': return `Link: ${block.data.title || 'Sem título'}`;
    case 'social': return 'Ícones de Redes Sociais';
    case 'product': return `Produto: ${block.data.title || 'Sem título'}`;
    case 'contact': return `Contato: ${block.data.title || 'Formulário'}`;
    case 'media': return `Mídia: ${block.data.caption || block.data.mediaType}`;
    case 'text': return `Texto: ${block.data.title || block.data.content.substring(0, 20)}...`;
    case 'divider': return `Divisor (${block.data.style})`;
    case 'faq': return `FAQ (${block.data.items?.length || 0} perguntas)`;
    default: return 'Bloco';
  }
};

interface SortableItemProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({
  block,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
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
  } = useSortable({ id: block.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`p-3 rounded-2xl border flex items-center justify-between gap-2.5 transition-all select-none ${
        isSelected
          ? 'bg-brand-500/15 border-brand-500 shadow-md ring-1 ring-brand-500/50'
          : 'bg-studio-card border-studio-border hover:border-brand-500/30'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="p-1 rounded text-slate-500 hover:text-brand-400 cursor-grab active:cursor-grabbing flex-shrink-0"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-black text-brand-400 uppercase block tracking-wider">
            {block.type}
          </span>
          <p className="text-xs font-semibold text-slate-200 truncate">
            {getBlockTitle(block)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          disabled={isFirst}
          onClick={onMoveUp}
          className="p-1.5 rounded-lg bg-studio-panel hover:bg-studio-hover text-slate-400 hover:text-white border border-studio-border disabled:opacity-25"
          title="Subir"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={onMoveDown}
          className="p-1.5 rounded-lg bg-studio-panel hover:bg-studio-hover text-slate-400 hover:text-white border border-studio-border disabled:opacity-25"
          title="Descer"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="p-1.5 rounded-lg bg-studio-panel hover:bg-studio-hover text-slate-400 hover:text-white border border-studio-border"
          title="Duplicar"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
          title="Excluir"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export const MobileReorderSheet: React.FC<MobileReorderSheetProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlocks,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onUpdateBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400 mb-2">
        Arraste pelo ícone de pontinhos ou use as setas para alterar a ordem dos blocos na página:
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {blocks.map((block, index) => (
              <SortableItem
                key={block.id}
                block={block}
                isSelected={selectedBlockId === block.id}
                onSelect={() => onSelectBlock(block.id)}
                onMoveUp={() => onMoveBlock(block.id, 'up')}
                onMoveDown={() => onMoveBlock(block.id, 'down')}
                onDuplicate={() => onDuplicateBlock(block.id)}
                onDelete={() => onDeleteBlock(block.id)}
                isFirst={index === 0}
                isLast={index === blocks.length - 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
