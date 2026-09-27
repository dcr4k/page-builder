import React, { useRef, useState } from 'react';
import { Upload, Plus, Trash2, LayoutGrid, Columns, Square } from 'lucide-react';
import { ProductBlockData, ProductItem } from '../../../types';

interface ProductInspectorProps {
  data: ProductBlockData;
  onChange: (updated: ProductBlockData) => void;
}

const PRESET_PRODUCTS = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
];

export const ProductInspector: React.FC<ProductInspectorProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ensure items array is always valid
  const items: ProductItem[] =
    data.items && data.items.length > 0
      ? data.items
      : [
          {
            id: 'p1',
            imageUrl: data.imageUrl || PRESET_PRODUCTS[0],
            title: data.title || 'Smartwatch Pro Series 9',
            description: data.description || 'Design premium em titânio, bateria de 72h e monitoramento avançado.',
            price: data.price || 'R$ 289,90',
            originalPrice: data.originalPrice || 'R$ 449,00',
            badge: data.badge || 'Mais Vendido 🔥',
            buttonText: data.buttonText || 'Comprar',
            buttonUrl: data.buttonUrl || 'https://wa.me/5511999999999',
          },
        ];

  const currentLayout = data.layout || '1-col';
  const safeActiveIndex = Math.min(activeIndex, items.length - 1);
  const currentItem = items[safeActiveIndex] || items[0];

  const updateCurrentItem = (updates: Partial<ProductItem>) => {
    const updatedItems = items.map((item, idx) =>
      idx === safeActiveIndex ? { ...item, ...updates } : item
    );
    
    // Also sync top-level fields with item 0 for backwards compatibility
    const syncItem = updatedItems[0];
    onChange({
      ...data,
      items: updatedItems,
      imageUrl: syncItem.imageUrl,
      title: syncItem.title,
      description: syncItem.description || '',
      price: syncItem.price,
      originalPrice: syncItem.originalPrice,
      badge: syncItem.badge,
      buttonText: syncItem.buttonText,
      buttonUrl: syncItem.buttonUrl,
    });
  };

  const handleLayoutChange = (newLayout: '1-col' | '2-col' | '3-col') => {
    let targetItems = [...items];
    // If switching to 2-col and only 1 item exists, add a second item preset
    if (newLayout === '2-col' && targetItems.length < 2) {
      targetItems.push({
        id: 'p2',
        imageUrl: PRESET_PRODUCTS[2],
        title: 'Fone Noise Cancelling',
        price: 'R$ 349,90',
        originalPrice: 'R$ 499,00',
        badge: 'Novo',
        buttonText: 'Comprar',
        buttonUrl: 'https://wa.me/5511999999999',
      });
    }
    // If switching to 3-col and fewer than 3 items exist, add up to 3 items
    if (newLayout === '3-col' && targetItems.length < 3) {
      while (targetItems.length < 3) {
        const nextIdx = targetItems.length;
        targetItems.push({
          id: `p${nextIdx + 1}`,
          imageUrl: PRESET_PRODUCTS[nextIdx % PRESET_PRODUCTS.length],
          title: nextIdx === 1 ? 'Fone Noise Cancelling' : 'Tênis Runner Speed',
          price: nextIdx === 1 ? 'R$ 349,90' : 'R$ 199,90',
          badge: nextIdx === 1 ? 'Novo' : 'Oferta',
          buttonText: 'Ver',
          buttonUrl: 'https://wa.me/5511999999999',
        });
      }
    }

    onChange({
      ...data,
      layout: newLayout,
      items: targetItems,
    });
  };

  const handleAddItem = () => {
    const nextIdx = items.length + 1;
    const newItem: ProductItem = {
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      imageUrl: PRESET_PRODUCTS[(nextIdx - 1) % PRESET_PRODUCTS.length],
      title: `Produto ${nextIdx}`,
      price: 'R$ 99,90',
      buttonText: 'Comprar',
      buttonUrl: 'https://wa.me/5511999999999',
    };
    const updatedItems = [...items, newItem];
    onChange({
      ...data,
      items: updatedItems,
    });
    setActiveIndex(updatedItems.length - 1);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    if (items.length <= 1) return;
    const updatedItems = items.filter((_, idx) => idx !== indexToRemove);
    const newIdx = Math.max(0, safeActiveIndex - 1);
    setActiveIndex(newIdx);
    onChange({
      ...data,
      items: updatedItems,
      imageUrl: updatedItems[0].imageUrl,
      title: updatedItems[0].title,
      price: updatedItems[0].price,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateCurrentItem({ imageUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Layout selector (1, 2 or 3 products per line) */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Disposição na Página
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleLayoutChange('1-col')}
            className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
              currentLayout === '1-col'
                ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm ring-1 ring-brand-500/50'
                : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
            }`}
          >
            <Square className="w-4 h-4 text-brand-400" />
            <span>1 por linha</span>
          </button>

          <button
            type="button"
            onClick={() => handleLayoutChange('2-col')}
            className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
              currentLayout === '2-col'
                ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm ring-1 ring-brand-500/50'
                : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-4 h-4 text-brand-400" />
            <span>2 por linha</span>
          </button>

          <button
            type="button"
            onClick={() => handleLayoutChange('3-col')}
            className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
              currentLayout === '3-col'
                ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm ring-1 ring-brand-500/50'
                : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-brand-400" />
            <span>3 por linha</span>
          </button>
        </div>
      </div>

      {/* Multi-product Item Tabs (when 2-col, 3-col or multiple items exist) */}
      <div className="pt-2 border-t border-studio-border">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Itens do Catálogo ({items.length})
          </label>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-2 py-1 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-[11px] font-bold flex items-center gap-1 active:scale-95"
          >
            <Plus className="w-3 h-3" />
            <span>Adicionar Item</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {items.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 flex-shrink-0 transition-all ${
                safeActiveIndex === idx
                  ? 'bg-brand-500 text-black font-black border-brand-500 shadow-md shadow-brand-500/20'
                  : 'bg-studio-card border-studio-border text-slate-300 hover:text-white'
              }`}
            >
              <span>{idx + 1}. {item.title ? item.title.substring(0, 10) + '...' : `Item ${idx + 1}`}</span>
              {items.length > 1 && safeActiveIndex === idx && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveItem(idx);
                  }}
                  className="p-0.5 hover:bg-rose-500/30 text-black/70 hover:text-rose-900 rounded ml-1"
                  title="Remover produto"
                >
                  <Trash2 className="w-3 h-3" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Image */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Foto do Produto {items.length > 1 ? `#${safeActiveIndex + 1}` : ''}
        </label>
        
        {currentItem.imageUrl && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden mb-2 border border-studio-border bg-studio-black">
            <img src={currentItem.imageUrl} alt={currentItem.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 py-1.5 px-3 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Enviar foto local</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Preset images */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-2">
          {PRESET_PRODUCTS.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => updateCurrentItem({ imageUrl: url })}
              className="w-12 h-10 rounded-lg overflow-hidden border border-studio-border flex-shrink-0 hover:scale-105 transition-transform"
            >
              <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <input
          type="url"
          placeholder="Ou cole a URL da imagem do produto"
          value={currentItem.imageUrl}
          onChange={(e) => updateCurrentItem({ imageUrl: e.target.value })}
          className="w-full px-3 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Título do Produto
        </label>
        <input
          type="text"
          value={currentItem.title}
          onChange={(e) => updateCurrentItem({ title: e.target.value })}
          placeholder="Ex: Tênis Air Max Special Edition"
          className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-bold"
        />
      </div>

      {/* Description (only shown for 1-col or optional for others) */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Descrição Curta
        </label>
        <textarea
          rows={2}
          value={currentItem.description || ''}
          onChange={(e) => updateCurrentItem({ description: e.target.value })}
          placeholder="Descreva detalhes, benefícios ou especificações..."
          className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none"
        />
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Preço Atual
          </label>
          <input
            type="text"
            value={currentItem.price}
            onChange={(e) => updateCurrentItem({ price: e.target.value })}
            placeholder="Ex: R$ 199,90"
            className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Preço Anterior (Riscado)
          </label>
          <input
            type="text"
            value={currentItem.originalPrice || ''}
            onChange={(e) => updateCurrentItem({ originalPrice: e.target.value })}
            placeholder="Ex: R$ 299,00"
            className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Badge / Tag */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Selo / Destaque do Card
        </label>
        <input
          type="text"
          value={currentItem.badge || ''}
          onChange={(e) => updateCurrentItem({ badge: e.target.value })}
          placeholder="Ex: Mais Vendido 🔥, 50% OFF, Lançamento"
          className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
        />
      </div>

      {/* CTA Button */}
      <div className="pt-2 border-t border-studio-border space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Texto do Botão
          </label>
          <input
            type="text"
            value={currentItem.buttonText}
            onChange={(e) => updateCurrentItem({ buttonText: e.target.value })}
            placeholder="Ex: Comprar pelo WhatsApp"
            className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Link de Compra / WhatsApp
          </label>
          <input
            type="url"
            value={currentItem.buttonUrl}
            onChange={(e) => updateCurrentItem({ buttonUrl: e.target.value })}
            placeholder="https://wa.me/5511999999999 ou checkout"
            className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>
    </div>
  );
};
