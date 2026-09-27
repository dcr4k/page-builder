import React, { useState } from 'react';
import {
  User,
  Link as LinkIcon,
  Share2,
  ShoppingBag,
  Mail,
  Image as ImageIcon,
  Type,
  Minus,
  HelpCircle,
  Plus,
  Search,
} from 'lucide-react';
import { BlockType } from '../../types';

interface LeftSidebarProps {
  onAddBlock: (type: BlockType) => void;
}

interface BlockDefinition {
  type: BlockType;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
}

const BLOCK_LIBRARY: BlockDefinition[] = [
  {
    type: 'profile',
    title: 'Perfil & Cabeçalho',
    category: 'Identidade',
    description: 'Foto de perfil, nome em destaque, bio, arroba e selo de verificação.',
    icon: User,
    badge: 'Essencial',
  },
  {
    type: 'link',
    title: 'Link Único & Botão',
    category: 'Conversão',
    description: 'Botão de clique com ícone, subtítulo explicativo e badge de destaque.',
    icon: LinkIcon,
    badge: 'Mais Usado',
  },
  {
    type: 'social',
    title: 'Redes Sociais',
    category: 'Conexões',
    description: 'Fileira de ícones circulares com links diretos para Instagram, WhatsApp, etc.',
    icon: Share2,
  },
  {
    type: 'product',
    title: 'Catálogo / Produto',
    category: 'Vendas',
    description: 'Card com foto, título, descrição, preço em reais e botão de compra/WhatsApp.',
    icon: ShoppingBag,
    badge: 'Vendas 🔥',
  },
  {
    type: 'contact',
    title: 'Formulário de Contato',
    category: 'Leads',
    description: 'Campos de Nome, E-mail, Telefone e Mensagem com envio para WhatsApp.',
    icon: Mail,
  },
  {
    type: 'media',
    title: 'Mídia & Vídeo',
    category: 'Conteúdo',
    description: 'Banner de imagem em alta definição ou vídeo incorporado do YouTube.',
    icon: ImageIcon,
  },
  {
    type: 'text',
    title: 'Texto & Citação',
    category: 'Conteúdo',
    description: 'Bloco de texto livre, parágrafo explicativo ou citação elegante com autor.',
    icon: Type,
  },
  {
    type: 'faq',
    title: 'Perguntas Frequentes',
    category: 'Suporte',
    description: 'Acordeão interativo para responder as dúvidas mais comuns dos clientes.',
    icon: HelpCircle,
  },
  {
    type: 'divider',
    title: 'Divisor & Espaço',
    category: 'Layout',
    description: 'Separador com selo de texto, três pontos, gradiente neon ou espaçador transparente.',
    icon: Minus,
  },
];

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ onAddBlock }) => {
  const [search, setSearch] = useState('');

  const filteredBlocks = BLOCK_LIBRARY.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-80 h-full bg-studio-panel/95 border-r border-studio-border flex flex-col flex-shrink-0 select-none z-10">
      {/* Header */}
      <div className="p-4 border-b border-studio-border">
        <h2 className="text-sm font-bold text-white tracking-wide flex items-center justify-between">
          <span>Biblioteca de Blocos</span>
          <span className="text-[11px] font-bold text-brand-400 bg-brand-500/15 border border-brand-500/30 px-2 py-0.5 rounded-full">
            {BLOCK_LIBRARY.length} tipos
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Clique em qualquer bloco para adicionar à sua página.
        </p>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar blocos..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
      </div>

      {/* Block List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredBlocks.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.type}
              onClick={() => onAddBlock(item.type)}
              className="p-3 rounded-2xl bg-studio-card hover:bg-studio-hover border border-studio-border hover:border-brand-500/50 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md flex items-start gap-3 relative"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-black flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-sm">
                <IconComp className="w-5 h-5 stroke-[2]" />
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-brand-500/15 text-brand-400 border border-brand-500/30 font-bold flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Add + Icon on hover */}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-studio-input border border-studio-border group-hover:bg-brand-500 text-slate-400 group-hover:text-black flex items-center justify-center transition-all duration-200 shadow"
                title="Adicionar à página"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          );
        })}

        {filteredBlocks.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-xs">
            Nenhum bloco encontrado com o termo "{search}".
          </div>
        )}
      </div>
    </aside>
  );
};
