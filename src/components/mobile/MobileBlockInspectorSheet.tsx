import React from 'react';
import { ArrowUp, ArrowDown, Copy, Trash2 } from 'lucide-react';
import type { Block, PageTheme } from '../../types';
import { ProfileInspector } from '../editor/inspector/ProfileInspector';
import { LinkInspector } from '../editor/inspector/LinkInspector';
import { SocialInspector } from '../editor/inspector/SocialInspector';
import { ProductInspector } from '../editor/inspector/ProductInspector';
import { ContactInspector } from '../editor/inspector/ContactInspector';
import { MediaInspector } from '../editor/inspector/MediaInspector';
import { TextInspector } from '../editor/inspector/TextInspector';
import { DividerInspector } from '../editor/inspector/DividerInspector';
import { FaqInspector } from '../editor/inspector/FaqInspector';

interface MobileBlockInspectorSheetProps {
  block: Block;
  theme: PageTheme;
  onUpdateBlock: (updated: Block) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
  onClose: () => void;
}

export const MobileBlockInspectorSheet: React.FC<MobileBlockInspectorSheetProps> = ({
  block,
  theme,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock,
  isFirst,
  isLast,
  onClose,
}) => {
  return (
    <div className="space-y-5 pb-6">
      {/* Top quick toolbar for the active block */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-studio-card border border-studio-border">
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-xs font-black text-brand-400 uppercase tracking-wider">
            {block.type}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => onMoveBlock(block.id, 'up')}
            className="p-1.5 rounded-lg bg-studio-panel hover:bg-studio-hover text-slate-300 border border-studio-border disabled:opacity-25"
            title="Mover para cima"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => onMoveBlock(block.id, 'down')}
            className="p-1.5 rounded-lg bg-studio-panel hover:bg-studio-hover text-slate-300 border border-studio-border disabled:opacity-25"
            title="Mover para baixo"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDuplicateBlock(block.id)}
            className="p-1.5 rounded-lg bg-studio-panel hover:bg-studio-hover text-slate-300 border border-studio-border"
            title="Duplicar bloco"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              onDeleteBlock(block.id);
              onClose();
            }}
            className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/20"
            title="Excluir bloco"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Specific Inspector */}
      {block.type === 'profile' && (
        <ProfileInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
          theme={theme}
        />
      )}
      {block.type === 'link' && (
        <LinkInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
          theme={theme}
        />
      )}
      {block.type === 'social' && (
        <SocialInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
        />
      )}
      {block.type === 'product' && (
        <ProductInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
        />
      )}
      {block.type === 'contact' && (
        <ContactInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
          theme={theme}
        />
      )}
      {block.type === 'media' && (
        <MediaInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
          theme={theme}
        />
      )}
      {block.type === 'text' && (
        <TextInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
          theme={theme}
        />
      )}
      {block.type === 'divider' && (
        <DividerInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
          theme={theme}
        />
      )}
      {block.type === 'faq' && (
        <FaqInspector
          data={block.data}
          onChange={(newData) => onUpdateBlock({ ...block, data: newData })}
          theme={theme}
        />
      )}

      {/* Done button */}
      <button
        type="button"
        onClick={onClose}
        className="w-full py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-500/25 active:scale-[0.98] transition-all"
      >
        Concluído
      </button>
    </div>
  );
};
