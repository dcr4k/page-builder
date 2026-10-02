import React from 'react';
import { Sliders, Palette, Trash2, Copy, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { Block, PageTheme } from '../../types';
import { ProfileInspector } from './inspector/ProfileInspector';
import { LinkInspector } from './inspector/LinkInspector';
import { SocialInspector } from './inspector/SocialInspector';
import { ProductInspector } from './inspector/ProductInspector';
import { ContactInspector } from './inspector/ContactInspector';
import { MediaInspector } from './inspector/MediaInspector';
import { TextInspector } from './inspector/TextInspector';
import { DividerInspector } from './inspector/DividerInspector';
import { FaqInspector } from './inspector/FaqInspector';
import { GlobalStyleInspector } from './inspector/GlobalStyleInspector';

interface RightSidebarProps {
  activeTab: 'block' | 'style';
  onTabChange: (tab: 'block' | 'style') => void;
  selectedBlock: Block | null;
  onUpdateBlock: (updated: Block) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  theme: PageTheme;
  onUpdateTheme: (theme: PageTheme) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  activeTab,
  onTabChange,
  selectedBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock,
  theme,
  onUpdateTheme,
}) => {
  const getBlockTypeLabel = (type: Block['type']) => {
    const map = {
      profile: 'Perfil & Identidade',
      link: 'Botão de Link',
      social: 'Redes Sociais',
      product: 'Catálogo / Produto',
      contact: 'Formulário de Contato',
      media: 'Mídia / Imagem / Vídeo',
      text: 'Texto / Citação',
      divider: 'Divisor / Espaço',
      faq: 'Perguntas Frequentes',
    };
    return map[type] || 'Bloco';
  };

  const renderBlockInspector = () => {
    if (!selectedBlock) {
      return (
        <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-studio-card border border-studio-border flex items-center justify-center text-slate-400 mb-3">
            <Sliders className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">
            Nenhum bloco selecionado
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
            Clique em qualquer bloco na tela central para personalizar seus textos, imagens, links ou valores.
          </p>
          <button
            type="button"
            onClick={() => onTabChange('style')}
            className="mt-4 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/30 text-xs font-bold hover:bg-brand-500/20 transition-colors flex items-center gap-1.5"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Editar Estilo da Página</span>
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Selected block header bar with quick actions */}
        <div className="flex items-center justify-between pb-3 border-b border-studio-border">
          <div>
            <span className="text-[10px] uppercase font-black text-brand-400 tracking-wider">
              Editando Bloco
            </span>
            <h3 className="text-sm font-bold text-white">
              {getBlockTypeLabel(selectedBlock.type)}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onMoveBlock(selectedBlock.id, 'up')}
              className="p-1.5 rounded-lg bg-studio-card hover:bg-studio-border text-slate-300 hover:text-white transition-colors"
              title="Mover para cima"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onMoveBlock(selectedBlock.id, 'down')}
              className="p-1.5 rounded-lg bg-studio-card hover:bg-studio-border text-slate-300 hover:text-white transition-colors"
              title="Mover para baixo"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDuplicateBlock(selectedBlock.id)}
              className="p-1.5 rounded-lg bg-studio-card hover:bg-studio-border text-slate-300 hover:text-white transition-colors"
              title="Duplicar bloco"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDeleteBlock(selectedBlock.id)}
              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
              title="Excluir bloco"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Specific Inspector Component */}
        {selectedBlock.type === 'profile' && (
          <ProfileInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
            theme={theme}
          />
        )}
        {selectedBlock.type === 'link' && (
          <LinkInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
            theme={theme}
          />
        )}
        {selectedBlock.type === 'social' && (
          <SocialInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
          />
        )}
        {selectedBlock.type === 'product' && (
          <ProductInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
          />
        )}
        {selectedBlock.type === 'contact' && (
          <ContactInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
            theme={theme}
          />
        )}
        {selectedBlock.type === 'media' && (
          <MediaInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
            theme={theme}
          />
        )}
        {selectedBlock.type === 'text' && (
          <TextInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
            theme={theme}
          />
        )}
        {selectedBlock.type === 'divider' && (
          <DividerInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
            theme={theme}
          />
        )}
        {selectedBlock.type === 'faq' && (
          <FaqInspector
            data={selectedBlock.data as any}
            onChange={(newData) => onUpdateBlock({ ...selectedBlock, data: newData as any })}
            theme={theme}
          />
        )}
      </div>
    );
  };

  return (
    <aside className="w-84 sm:w-96 h-full bg-studio-panel border-l border-studio-border flex flex-col flex-shrink-0 select-none z-10">
      {/* Tabs Switcher */}
      <div className="grid grid-cols-2 p-2 border-b border-studio-border bg-studio-black">
        <button
          type="button"
          onClick={() => onTabChange('block')}
          className={`py-2 px-3 rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'block'
              ? 'bg-brand-500 text-black shadow-md shadow-brand-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-studio-card'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Bloco Selecionado</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('style')}
          className={`py-2 px-3 rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'style'
              ? 'bg-brand-500 text-black shadow-md shadow-brand-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-studio-card'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Estilo da Página</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'block' ? renderBlockInspector() : (
          <GlobalStyleInspector theme={theme} onChange={onUpdateTheme} />
        )}
      </div>
    </aside>
  );
};
