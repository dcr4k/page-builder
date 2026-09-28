import React, { useRef } from 'react';
import { Upload, Sparkles, User, Check, AlignCenter, AlignLeft, Layers, Plus, Trash2, Award, Image, Palette, RotateCcw } from 'lucide-react';
import { ProfileBlockData, PageTheme } from '../../../types';

interface ProfileInspectorProps {
  data: ProfileBlockData;
  onChange: (updated: ProfileBlockData) => void;
  theme?: PageTheme;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
];

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
];

export const ProfileInspector: React.FC<ProfileInspectorProps> = ({ data, onChange, theme }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const currentLayout = data.layout || 'center';

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({ ...data, avatarUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({ ...data, coverUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLayoutChange = (newLayout: 'center' | 'hero-cover' | 'card' | 'badge') => {
    const updated: ProfileBlockData = {
      ...data,
      layout: newLayout,
    };
    if (newLayout === 'hero-cover' && !updated.coverUrl) {
      updated.coverUrl = PRESET_COVERS[0];
    }
    if (newLayout === 'badge' && (!updated.badges || updated.badges.length === 0)) {
      updated.badges = ['🏆 Criador Oficial', '⭐ 5.0 (500+ avaliações)', '🚀 +10k Alunos'];
    }
    onChange(updated);
  };

  const badges = data.badges || [];

  const handleAddBadge = () => {
    const updated = [...badges, '⭐ Novo Selo de Destaque'];
    onChange({ ...data, badges: updated });
  };

  const handleUpdateBadge = (index: number, val: string) => {
    const updated = [...badges];
    updated[index] = val;
    onChange({ ...data, badges: updated });
  };

  const handleDeleteBadge = (index: number) => {
    const updated = badges.filter((_, idx) => idx !== index);
    onChange({ ...data, badges: updated });
  };

  return (
    <div className="space-y-4 pb-2">
      {/* 1. Layout / Model Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Modelo de Perfil</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'center', label: 'Centralizado', desc: 'Clássico com avatar' },
            { id: 'hero-cover', label: 'Banner de Capa', desc: 'Capa panorâmica topo' },
            { id: 'card', label: 'Cartão Lateral', desc: 'Avatar à esquerda' },
            { id: 'badge', label: 'Com Selos', desc: 'Badges de autoridade' },
          ].map((m) => {
            const isSelected = currentLayout === m.id || (m.id === 'card' && currentLayout === 'left');
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
                <span className="text-xs font-bold leading-tight">{m.label}</span>
                <span className="text-[10px] opacity-60 font-normal leading-tight mt-0.5">{m.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Cover Banner Upload (if hero-cover layout) */}
      {currentLayout === 'hero-cover' && (
        <div className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30 space-y-2.5">
          <label className="block text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5" />
            <span>Imagem de Capa (Banner Superior)</span>
          </label>

          <div className="w-full h-16 rounded-xl overflow-hidden bg-studio-black border border-studio-border relative">
            <img
              src={data.coverUrl || PRESET_COVERS[0]}
              alt="Capa preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="flex-1 py-1.5 px-3 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Enviar imagem de capa</span>
            </button>
            <input
              type="file"
              ref={coverInputRef}
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {PRESET_COVERS.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange({ ...data, coverUrl: url })}
                className={`w-14 h-8 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-transform hover:scale-105 ${
                  data.coverUrl === url ? 'border-brand-500 scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={url} alt={`Cover ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Ou cole a URL da capa (https://...)"
            value={data.coverUrl || ''}
            onChange={(e) => onChange({ ...data, coverUrl: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      )}

      {/* Badges of Authority Editor (if badge layout) */}
      {currentLayout === 'badge' && (
        <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Selos / Badges de Autoridade ({badges.length})</span>
            </label>
            <button
              type="button"
              onClick={handleAddBadge}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Selo</span>
            </button>
          </div>

          <div className="space-y-2">
            {badges.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => handleUpdateBadge(idx, e.target.value)}
                  placeholder="Ex: 🏆 Criador Oficial"
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-amber-500 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteBadge(idx)}
                  className="text-rose-400 hover:text-rose-300 p-1 opacity-70 hover:opacity-100"
                  title="Remover selo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avatar Section */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Foto de Perfil / Avatar
        </label>
        
        <div className="flex items-center gap-3 mb-3">
          {data.avatarUrl ? (
            <img
              src={data.avatarUrl}
              alt="Avatar preview"
              className={`w-14 h-14 object-cover border-2 border-brand-500 shadow-md ${
                data.avatarShape === 'circle' ? 'rounded-full' : data.avatarShape === 'rounded' ? 'rounded-2xl' : 'rounded-lg'
              }`}
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-studio-card border border-studio-border flex items-center justify-center text-slate-400">
              <User className="w-6 h-6" />
            </div>
          )}

          <div className="flex-1 space-y-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-1.5 px-3 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Enviar foto do dispositivo</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Preset quick selection */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1.5">Ou escolha uma foto de demonstração:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {PRESET_AVATARS.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange({ ...data, avatarUrl: url })}
                className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 transition-transform hover:scale-110 ${
                  data.avatarUrl === url ? 'border-brand-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom image URL input */}
        <div className="mt-2">
          <input
            type="text"
            placeholder="Ou cole a URL da imagem (https://...)"
            value={data.avatarUrl}
            onChange={(e) => onChange({ ...data, avatarUrl: e.target.value })}
            className="w-full px-3 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Avatar Shape */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Formato do Avatar
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['circle', 'rounded', 'square'] as const).map((shape) => (
            <button
              key={shape}
              type="button"
              onClick={() => onChange({ ...data, avatarShape: shape })}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold border capitalize flex items-center justify-center gap-1.5 transition-all ${
                data.avatarShape === shape
                  ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                  : 'bg-studio-card border-studio-border text-slate-400 hover:text-slate-200'
              }`}
            >
              {data.avatarShape === shape && <Check className="w-3 h-3 text-brand-400" />}
              <span>{shape === 'circle' ? 'Círculo' : shape === 'rounded' ? 'Arredondado' : 'Quadrado'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Name Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Nome Principal
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="Ex: Seu Nome ou Empresa"
          className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-bold"
        />
      </div>

      {/* Tagline / Subtitle */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Tagline ou Arroba (@)
        </label>
        <input
          type="text"
          value={data.tagline || ''}
          onChange={(e) => onChange({ ...data, tagline: e.target.value })}
          placeholder="Ex: @seuperfil ou Loja Oficial"
          className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
        />
      </div>

      {/* Bio / Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Biografia / Descrição Curta
        </label>
        <textarea
          rows={3}
          value={data.bio}
          onChange={(e) => onChange({ ...data, bio: e.target.value })}
          placeholder="Conte um pouco sobre você ou seu trabalho..."
          className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none leading-relaxed"
        />
      </div>

      {/* Text Colors: Title and Subtitle */}
      <div className="pt-2 border-t border-studio-border space-y-3.5">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-brand-400" />
          <span>Cores do Texto (Título & Subtítulo)</span>
        </label>

        {/* 1. Cor do Título */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Cor do Título (Nome):</span>
            {data.nameColor && (
              <button
                type="button"
                onClick={() => {
                  const updated = { ...data };
                  delete updated.nameColor;
                  onChange(updated);
                }}
                className="text-[11px] text-slate-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
                title="Restaurar cor padrão do tema"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Usar cor do tema</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.nameColor || (theme?.textColor?.startsWith('#') ? theme.textColor : '#ffffff')}
              onChange={(e) => onChange({ ...data, nameColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={data.nameColor || ''}
              onChange={(e) => onChange({ ...data, nameColor: e.target.value })}
              placeholder={theme?.textColor || 'Padrão do tema'}
              className="flex-1 px-2.5 py-1 text-xs rounded bg-studio-input border border-studio-border text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Quick Swatches for Title */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['#ffffff', '#090a0f', '#10b981', '#3b82f6', '#6366f1', '#ec4899', '#f59e0b'].map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => onChange({ ...data, nameColor: hex })}
                className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 flex-shrink-0 ${
                  data.nameColor === hex ? 'border-white ring-2 ring-brand-500 scale-105' : 'border-studio-border'
                }`}
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>
        </div>

        {/* 2. Cor do Subtítulo (3 opções obrigatórias: branco, cinza ou preto) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Cor do Subtítulo (Bio / Descrição):</span>
            {data.bioColorChoice && (
              <button
                type="button"
                onClick={() => {
                  const updated = { ...data };
                  delete updated.bioColorChoice;
                  delete updated.bioColor;
                  onChange(updated);
                }}
                className="text-[11px] text-slate-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
                title="Restaurar cor padrão do tema"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Padrão do tema</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'white', label: 'Branco', hex: '#ffffff', dotBorder: 'border-slate-300' },
              { id: 'gray', label: 'Cinza', hex: '#94a3b8', dotBorder: 'border-slate-500' },
              { id: 'black', label: 'Preto', hex: '#090a0f', dotBorder: 'border-slate-700' },
            ].map((option) => {
              const isSelected = data.bioColorChoice === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onChange({ ...data, bioColorChoice: option.id as any })}
                  className={`py-2 px-2 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-md ring-2 ring-brand-500/50 font-bold'
                      : 'bg-studio-card border-studio-border text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border shadow-sm flex-shrink-0 ${option.dotBorder}`}
                    style={{ backgroundColor: option.hex }}
                  />
                  <span className="text-xs">{option.label}</span>
                </button>
              );
            })}
          </div>
          <span className="text-[10px] text-slate-400 block">
            Escolha entre branco, cinza ou preto para garantir a leitura perfeita em qualquer cor de fundo.
          </span>
        </div>
      </div>

      {/* Verified Badge Toggle */}
      <div className="pt-2 border-t border-studio-border">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Selo de Verificado</span>
          </span>
          <input
            type="checkbox"
            checked={data.verified}
            onChange={(e) => onChange({ ...data, verified: e.target.checked })}
            className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-studio-black border-studio-border cursor-pointer accent-emerald-400"
          />
        </label>
      </div>
    </div>
  );
};
