import React from 'react';
import { SocialBlockData, SocialLinkItem } from '../../../types';
import { Layers, Share2, Grid, Sparkles, Smartphone } from 'lucide-react';

interface SocialInspectorProps {
  data: SocialBlockData;
  onChange: (updated: SocialBlockData) => void;
}

const AVAILABLE_PLATFORMS: Array<{ id: SocialLinkItem['platform']; label: string; placeholder: string }> = [
  { id: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/seunome' },
  { id: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/5511999999999' },
  { id: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@seucanal' },
  { id: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@seunome' },
  { id: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/seunome' },
  { id: 'twitter', label: 'Twitter / X', placeholder: 'https://x.com/seunome' },
  { id: 'github', label: 'GitHub', placeholder: 'https://github.com/seunome' },
  { id: 'spotify', label: 'Spotify', placeholder: 'https://open.spotify.com/artist/...' },
  { id: 'email', label: 'E-mail', placeholder: 'mailto:contato@seusite.com' },
  { id: 'website', label: 'Website', placeholder: 'https://seusite.com' },
];

export const SocialInspector: React.FC<SocialInspectorProps> = ({ data, onChange }) => {
  const links = data.links || [];
  const currentLayout = data.layoutStyle || 'row';

  const handleLayoutChange = (newLayout: 'row' | 'grid' | 'pills' | 'dock') => {
    onChange({
      ...data,
      layoutStyle: newLayout,
    });
  };

  const handleToggle = (platformId: SocialLinkItem['platform']) => {
    const existing = links.find((l) => l.platform === platformId);
    if (existing) {
      onChange({
        ...data,
        links: links.map((l) =>
          l.platform === platformId ? { ...l, active: !l.active } : l
        ),
      });
    } else {
      const def = AVAILABLE_PLATFORMS.find((p) => p.id === platformId);
      const newLink: SocialLinkItem = {
        id: 's_' + Math.random().toString(36).substring(2, 7),
        platform: platformId,
        url: def?.placeholder || 'https://',
        active: true,
        label: def?.label || platformId,
      };
      onChange({
        ...data,
        links: [...links, newLink],
      });
    }
  };

  const handleUrlChange = (platformId: string, newUrl: string) => {
    onChange({
      ...data,
      links: links.map((l) => (l.platform === platformId ? { ...l, url: newUrl } : l)),
    });
  };

  const handleLabelChange = (platformId: string, newLabel: string) => {
    onChange({
      ...data,
      links: links.map((l) => (l.platform === platformId ? { ...l, label: newLabel } : l)),
    });
  };

  return (
    <div className="space-y-4 pb-2">
      {/* 1. Layout Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Modelo de Exibição das Redes</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'row', label: 'Ícones em Linha', desc: 'Círculos clássicos', icon: Share2 },
            { id: 'grid', label: 'Grade de Cards', desc: '2 colunas com nomes', icon: Grid },
            { id: 'pills', label: 'Pílulas Largas', desc: 'Botões horizontais', icon: Smartphone },
            { id: 'dock', label: 'Dock Flutuante', desc: 'Vidro estilo iOS', icon: Sparkles },
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

      {/* 2. Active Networks */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Redes Sociais Ativas
        </label>
        <p className="text-[11px] text-slate-400 mb-3">
          Ative as plataformas que você utiliza e personalize seus links diretos:
        </p>

        <div className="space-y-3">
          {AVAILABLE_PLATFORMS.map((platform) => {
            const currentItem = links.find((l) => l.platform === platform.id);
            const isActive = currentItem ? currentItem.active : false;

            return (
              <div
                key={platform.id}
                className={`p-3 rounded-xl border transition-colors ${
                  isActive
                    ? 'bg-studio-card border-brand-500/50 shadow-sm'
                    : 'bg-studio-black border-studio-border opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-200">
                    {platform.label}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => handleToggle(platform.id)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-studio-panel border border-studio-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-500"></div>
                  </label>
                </div>

                {isActive && (
                  <div className="mt-2 space-y-2">
                    <input
                      type="text"
                      value={currentItem?.url || ''}
                      onChange={(e) => handleUrlChange(platform.id, e.target.value)}
                      placeholder={platform.placeholder}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                    />

                    {(currentLayout === 'grid' || currentLayout === 'pills') && (
                      <input
                        type="text"
                        value={currentItem?.label || ''}
                        onChange={(e) => handleLabelChange(platform.id, e.target.value)}
                        placeholder={`Rótulo (Padrão: ${platform.label})`}
                        className="w-full px-2.5 py-1.5 text-[11px] rounded-lg bg-studio-input border border-studio-border text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
