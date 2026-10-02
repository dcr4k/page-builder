import React, { useRef } from 'react';
import { Upload, Video, Image as ImageIcon, Layers, Camera, Columns, Palette } from 'lucide-react';
import { MediaBlockData, PageTheme } from '../../../types';
import { TextColorSelector } from '../../common/TextColorSelector';

interface MediaInspectorProps {
  data: MediaBlockData;
  onChange: (updated: MediaBlockData) => void;
  theme?: PageTheme;
}

const PRESET_MEDIA_1 = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
];

const PRESET_MEDIA_2 = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
];

export const MediaInspector: React.FC<MediaInspectorProps> = ({ data, onChange, theme }) => {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const currentLayout = data.layout || (data.mediaType === 'video' ? 'video' : 'single');

  const handleLayoutChange = (newLayout: 'single' | 'polaroid' | 'duo-gallery' | 'video') => {
    const updated: MediaBlockData = {
      ...data,
      layout: newLayout,
    };
    if (newLayout === 'video') {
      updated.mediaType = 'video';
      if (!updated.mediaUrl || !updated.mediaUrl.includes('youtube')) {
        updated.mediaUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      }
    } else {
      updated.mediaType = 'image';
      if (newLayout === 'duo-gallery') {
        if (!updated.secondaryMediaUrl) updated.secondaryMediaUrl = PRESET_MEDIA_2[0];
        if (!updated.caption) updated.caption = 'Foto 1';
        if (!updated.secondaryCaption) updated.secondaryCaption = 'Foto 2';
      } else if (newLayout === 'polaroid') {
        if (!updated.caption) updated.caption = 'Momentos especiais & bastidores ✨';
      }
    }
    onChange(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isSecond = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        if (isSecond) {
          onChange({ ...data, secondaryMediaUrl: result });
        } else {
          onChange({ ...data, mediaType: 'image', mediaUrl: result });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 pb-2">
      {/* 1. Layout / Model Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Modelo de Mídia</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'single', label: 'Imagem Padrão', desc: 'Banner com proporções', icon: ImageIcon },
            { id: 'polaroid', label: 'Card Polaroid', desc: 'Moldura retrô com legenda', icon: Camera },
            { id: 'duo-gallery', label: 'Galeria Duo', desc: '2 fotos lado a lado', icon: Columns },
            { id: 'video', label: 'Vídeo YouTube', desc: 'Player incorporado', icon: Video },
          ].map((m) => {
            const isSelected = currentLayout === m.id;
            const IconComp = m.icon;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleLayoutChange(m.id as any)}
                className={`py-2 px-2.5 rounded-xl border text-left flex flex-col transition-all ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md ring-1 ring-brand-500/50'
                    : 'bg-studio-card border-studio-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-300' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold leading-tight">{m.label}</span>
                </div>
                <span className="text-[10px] opacity-60 font-normal leading-tight">{m.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SPECIFIC FIELDS PER MODEL */}

      {/* A. DUO GALLERY */}
      {currentLayout === 'duo-gallery' ? (
        <div className="space-y-3.5">
          {/* Foto 1 */}
          <div className="p-3 rounded-2xl bg-studio-card border border-studio-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Foto 1 (Esquerda)
              </span>
            </div>

            <div className="w-full h-20 rounded-xl overflow-hidden bg-black/30 border border-studio-border">
              <img src={data.mediaUrl} alt="Foto 1" className="w-full h-full object-cover" />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef1.current?.click()}
              className="w-full py-1.5 px-3 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Enviar Foto 1</span>
            </button>
            <input
              type="file"
              ref={fileInputRef1}
              accept="image/*"
              onChange={(e) => handleFileUpload(e, false)}
              className="hidden"
            />

            <input
              type="text"
              value={data.mediaUrl}
              onChange={(e) => onChange({ ...data, mediaUrl: e.target.value })}
              placeholder="URL da Foto 1"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white"
            />

            <input
              type="text"
              value={data.caption || ''}
              onChange={(e) => onChange({ ...data, caption: e.target.value })}
              placeholder="Legenda da Foto 1 (opcional)"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white"
            />
          </div>

          {/* Foto 2 */}
          <div className="p-3 rounded-2xl bg-studio-card border border-studio-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Foto 2 (Direita)
              </span>
            </div>

            <div className="w-full h-20 rounded-xl overflow-hidden bg-black/30 border border-studio-border">
              <img src={data.secondaryMediaUrl || PRESET_MEDIA_2[0]} alt="Foto 2" className="w-full h-full object-cover" />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef2.current?.click()}
              className="w-full py-1.5 px-3 rounded-lg bg-studio-panel hover:bg-studio-black text-slate-300 border border-studio-border text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Enviar Foto 2</span>
            </button>
            <input
              type="file"
              ref={fileInputRef2}
              accept="image/*"
              onChange={(e) => handleFileUpload(e, true)}
              className="hidden"
            />

            <input
              type="text"
              value={data.secondaryMediaUrl || ''}
              onChange={(e) => onChange({ ...data, secondaryMediaUrl: e.target.value })}
              placeholder="URL da Foto 2"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white"
            />

            <input
              type="text"
              value={data.secondaryCaption || ''}
              onChange={(e) => onChange({ ...data, secondaryCaption: e.target.value })}
              placeholder="Legenda da Foto 2 (opcional)"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white"
            />
          </div>
        </div>
      ) : (
        /* Single, Polaroid, or Video */
        <div className="space-y-3.5">
          {/* Media URL / Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {currentLayout === 'video' ? 'Link do Vídeo (YouTube Embed)' : 'Arquivo de Imagem ou URL'}
            </label>

            {currentLayout !== 'video' && (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef1.current?.click()}
                  className="w-full mb-2 py-1.5 px-3 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Enviar foto do dispositivo</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef1}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="hidden"
                />

                <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-2">
                  {PRESET_MEDIA_1.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onChange({ ...data, mediaUrl: url })}
                      className="w-14 h-10 rounded-lg overflow-hidden border border-studio-border flex-shrink-0 hover:scale-105 transition-transform"
                    >
                      <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}

            <input
              type="url"
              value={data.mediaUrl}
              onChange={(e) => onChange({ ...data, mediaUrl: e.target.value })}
              placeholder={
                currentLayout === 'video'
                  ? 'https://www.youtube.com/embed/...'
                  : 'https://images.unsplash.com/...'
              }
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
            {currentLayout === 'video' && (
              <p className="text-[11px] text-slate-500 mt-1">
                Dica: Para YouTube, use o link do formato /embed/ (ex: https://www.youtube.com/embed/dQw4w9WgXcQ).
              </p>
            )}
          </div>

          {/* Aspect Ratio (for Single or Video) */}
          {currentLayout !== 'polaroid' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Proporção da Mídia
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['16:9', '1:1', '4:5', 'wide'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => onChange({ ...data, aspectRatio: ratio })}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border ${
                      data.aspectRatio === ratio
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                        : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              {currentLayout === 'polaroid' ? 'Legenda da Polaroid (Estilo Manuscrita)' : 'Legenda da Mídia'}
            </label>
            <input
              type="text"
              value={data.caption || ''}
              onChange={(e) => onChange({ ...data, caption: e.target.value })}
              placeholder={currentLayout === 'polaroid' ? 'Ex: Momentos especiais & bastidores ✨' : 'Ex: Foto tirada no lançamento'}
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      )}

      {/* Font Colors Section */}
      <div className="pt-3 border-t border-studio-border space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-brand-400" />
          <span>Cores das Fontes</span>
        </label>

        {/* Caption Font Color (restricted to white, gray, black) */}
        <TextColorSelector
          label="Cor da Legenda"
          value={data.captionColor}
          defaultColor={currentLayout === 'polaroid' ? '#334155' : (theme?.textSecondaryColor || '#94a3b8')}
          onChange={(color) => onChange({ ...data, captionColor: color })}
          allowColorful={false}
        />
      </div>
    </div>
  );
};
