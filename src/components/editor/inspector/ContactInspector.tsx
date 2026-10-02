import React, { useRef } from 'react';
import { ContactBlockData, PageTheme } from '../../../types';
import { MessageSquare, Mail, Layers, Upload, User, CheckCircle2, Palette } from 'lucide-react';
import { WhatsAppIcon } from '../../common/SocialIcons';
import { TextColorSelector } from '../../common/TextColorSelector';

interface ContactInspectorProps {
  data: ContactBlockData;
  onChange: (updated: ContactBlockData) => void;
  theme?: PageTheme;
}

const PRESET_AGENT_AVATARS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
];

const STATUS_SUGGESTIONS = [
  'Online agora no WhatsApp',
  'Plantão 24 Horas',
  'Atendimento Imediato',
  'Responde em minutos',
];

export const ContactInspector: React.FC<ContactInspectorProps> = ({ data, onChange, theme }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const layout = data.layout || (data.submitAction === 'whatsapp' && !data.showEmail && !data.showMessage ? 'whatsapp-direct' : 'full-form');

  const handleLayoutChange = (newLayout: 'whatsapp-direct' | 'inline-newsletter' | 'full-form') => {
    const updated: ContactBlockData = {
      ...data,
      layout: newLayout,
    };

    if (newLayout === 'whatsapp-direct') {
      updated.submitAction = 'whatsapp';
      if (!updated.title || updated.title === 'Fale Conosco') updated.title = 'Falar Diretamente Comigo';
      if (!updated.buttonText || updated.buttonText === 'Enviar Mensagem') updated.buttonText = 'Iniciar Conversa no WhatsApp';
      if (!updated.agentStatus) updated.agentStatus = 'Online agora no WhatsApp';
      if (!updated.agentAvatar) updated.agentAvatar = PRESET_AGENT_AVATARS[0];
      if (!updated.destination) updated.destination = '5511999999999';
    } else if (newLayout === 'inline-newsletter') {
      updated.submitAction = 'email';
      if (!updated.title || updated.title === 'Fale Conosco') updated.title = 'Receba Novidades & Cupons Exclusivos';
      if (!updated.description) updated.description = 'Cadastre seu e-mail e fique por dentro das melhores ofertas.';
      if (!updated.buttonText || updated.buttonText === 'Enviar Mensagem') updated.buttonText = 'Cadastrar';
      if (!updated.destination) updated.destination = 'contato@seusite.com.br';
    } else {
      if (!updated.title) updated.title = 'Fale Conosco';
      if (!updated.buttonText) updated.buttonText = 'Enviar Mensagem';
      // Ensure defaults for full form
      if (updated.showName === undefined) updated.showName = true;
      if (updated.showEmail === undefined) updated.showEmail = true;
      if (updated.showPhone === undefined) updated.showPhone = true;
      if (updated.showMessage === undefined) updated.showMessage = true;
    }

    onChange(updated);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({ ...data, agentAvatar: result });
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
          <span>Modelo de Captação / Contato</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'whatsapp-direct', label: 'Direto WhatsApp', desc: 'Com atendente' },
            { id: 'inline-newsletter', label: 'Captura E-mail', desc: 'Newsletter inline' },
            { id: 'full-form', label: 'Formulário', desc: 'Campos múltiplos' },
          ].map((m) => {
            const isSelected = layout === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleLayoutChange(m.id as any)}
                className={`py-2 px-2 rounded-xl border text-left flex flex-col transition-all ${
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

      {/* 2. SPECIFIC FIELDS PER MODEL */}

      {/* A. MODEL: WHATSAPP DIRECT */}
      {layout === 'whatsapp-direct' && (
        <div className="space-y-3.5 p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30">
          <div className="flex items-center gap-2 border-b border-brand-500/20 pb-2">
            <WhatsAppIcon className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
              Configurações do Card WhatsApp
            </span>
          </div>

          {/* Agent Avatar */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Foto do Atendente / Perfil
            </label>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <img
                  src={data.agentAvatar || PRESET_AGENT_AVATARS[0]}
                  alt="Avatar Atendente"
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500 shadow"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-brand-500 border-2 border-studio-black" />
              </div>

              <div className="flex-1 space-y-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-1.5 px-3 rounded-lg bg-brand-500/15 hover:bg-brand-500/25 text-brand-300 border border-brand-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Enviar foto</span>
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

            {/* Presets */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-2">
              {PRESET_AGENT_AVATARS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChange({ ...data, agentAvatar: url })}
                  className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 transition-transform hover:scale-110 ${
                    data.agentAvatar === url ? 'border-brand-400 scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={url} alt={`Atendente ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <input
              type="text"
              value={data.agentAvatar || ''}
              onChange={(e) => onChange({ ...data, agentAvatar: e.target.value })}
              placeholder="Ou URL da foto (https://...)"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Agent Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Status de Atendimento
            </label>
            <input
              type="text"
              value={data.agentStatus || 'Online agora no WhatsApp'}
              onChange={(e) => onChange({ ...data, agentStatus: e.target.value })}
              placeholder="Ex: Online agora no WhatsApp"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 mb-1.5"
            />
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1">
              {STATUS_SUGGESTIONS.map((st, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChange({ ...data, agentStatus: st })}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-studio-card hover:bg-brand-500/20 text-slate-300 hover:text-brand-300 border border-studio-border transition-colors"
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Título / Chamada
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Ex: Falar Diretamente Comigo"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Descrição / Subtítulo
            </label>
            <textarea
              rows={2}
              value={data.description}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              placeholder="Ex: Tire dúvidas ou solicite um atendimento personalizado."
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none"
            />
          </div>

          {/* WhatsApp Destination */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Número WhatsApp (com DDI e DDD)
            </label>
            <input
              type="text"
              value={data.destination || ''}
              onChange={(e) => onChange({ ...data, destination: e.target.value })}
              placeholder="Ex: 5511999999999"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Formato: 55 + DDD + número (somente números)
            </span>
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Texto do Botão
            </label>
            <input
              type="text"
              value={data.buttonText || 'Iniciar Conversa no WhatsApp'}
              onChange={(e) => onChange({ ...data, buttonText: e.target.value })}
              placeholder="Ex: Iniciar Conversa no WhatsApp"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      )}

      {/* B. MODEL: INLINE NEWSLETTER */}
      {layout === 'inline-newsletter' && (
        <div className="space-y-3.5 p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30">
          <div className="flex items-center gap-2 border-b border-brand-500/20 pb-2">
            <Mail className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
              Configurações da Captura de E-mail
            </span>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Título da Newsletter
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Ex: Receba Novidades & Cupons Exclusivos"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Subtítulo / Promessa de Valor
            </label>
            <textarea
              rows={2}
              value={data.description}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              placeholder="Ex: Cadastre seu e-mail e receba nossas melhores ofertas em primeira mão."
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none"
            />
          </div>

          {/* Email Destination */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              E-mail de Notificação / Destino
            </label>
            <input
              type="email"
              value={data.destination || ''}
              onChange={(e) => onChange({ ...data, destination: e.target.value })}
              placeholder="Ex: leads@seusite.com.br"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Texto do Botão de Inscrição
            </label>
            <input
              type="text"
              value={data.buttonText || 'Cadastrar'}
              onChange={(e) => onChange({ ...data, buttonText: e.target.value })}
              placeholder="Ex: Cadastrar / Quero Desconto"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      )}

      {/* C. MODEL: FULL FORM */}
      {layout === 'full-form' && (
        <div className="space-y-3.5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Título do Formulário
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Ex: Fale Conosco"
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Texto Auxiliar / Instruções
            </label>
            <textarea
              rows={2}
              value={data.description}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              placeholder="Ex: Preencha os campos abaixo para entrar em contato."
              className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500 resize-none"
            />
          </div>

          {/* Fields Toggle (ONLY in Full Form!) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Campos Visíveis no Formulário
            </label>
            <div className="space-y-2 bg-studio-card p-3 rounded-xl border border-studio-border">
              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>Campo de Nome</span>
                <input
                  type="checkbox"
                  checked={data.showName ?? true}
                  onChange={(e) => onChange({ ...data, showName: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-studio-black border-studio-border accent-emerald-400"
                />
              </label>
              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>Campo de E-mail</span>
                <input
                  type="checkbox"
                  checked={data.showEmail ?? true}
                  onChange={(e) => onChange({ ...data, showEmail: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-studio-black border-studio-border accent-emerald-400"
                />
              </label>
              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>Campo de Telefone / WhatsApp</span>
                <input
                  type="checkbox"
                  checked={data.showPhone ?? true}
                  onChange={(e) => onChange({ ...data, showPhone: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-studio-black border-studio-border accent-emerald-400"
                />
              </label>
              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>Campo de Mensagem (Texto Livre)</span>
                <input
                  type="checkbox"
                  checked={data.showMessage ?? true}
                  onChange={(e) => onChange({ ...data, showMessage: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 bg-studio-black border-studio-border accent-emerald-400"
                />
              </label>
            </div>
          </div>

          {/* Action / Destination */}
          <div className="pt-2 border-t border-studio-border space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Ao Enviar Formulário:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...data, submitAction: 'whatsapp' })}
                  className={`py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 ${
                    data.submitAction === 'whatsapp'
                      ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                      : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                  }`}
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Abrir WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, submitAction: 'email' })}
                  className={`py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 ${
                    data.submitAction === 'email'
                      ? 'bg-sky-600/30 border-sky-500 text-sky-200'
                      : 'bg-studio-card border-studio-border text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Abrir E-mail</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                {data.submitAction === 'whatsapp' ? 'Número WhatsApp com DDD' : 'E-mail de Destino'}
              </label>
              <input
                type="text"
                value={data.destination || ''}
                onChange={(e) => onChange({ ...data, destination: e.target.value })}
                placeholder={data.submitAction === 'whatsapp' ? '5511999999999' : 'contato@seusite.com'}
                className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Texto do Botão
              </label>
              <input
                type="text"
                value={data.buttonText || 'Enviar Mensagem'}
                onChange={(e) => onChange({ ...data, buttonText: e.target.value })}
                placeholder="Ex: Enviar Mensagem"
                className="w-full px-3 py-2 text-sm rounded-lg bg-studio-input border border-studio-border text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Cores dos Textos do Formulário */}
      <div className="pt-2 border-t border-studio-border space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-brand-400" />
          <span>Cores das Fontes</span>
        </label>

        {/* Título do formulário (titular -> colorido permitido) */}
        <TextColorSelector
          label="Cor do Título"
          value={data.titleColor}
          defaultColor={theme?.textColor || '#ffffff'}
          onChange={(color) => onChange({ ...data, titleColor: color })}
          allowColorful={true}
        />

        {/* Descrição / subtítulo (3 opções: branco, cinza, preto) */}
        <TextColorSelector
          label="Cor da Descrição / Subtítulo"
          value={data.descriptionColor}
          defaultColor={theme?.textSecondaryColor || '#94a3b8'}
          onChange={(color) => onChange({ ...data, descriptionColor: color })}
          allowColorful={false}
        />

        {/* Botão de envio (3 opções: branco, cinza, preto) */}
        <TextColorSelector
          label="Cor do Texto do Botão"
          value={data.buttonTextColor}
          defaultColor="#ffffff"
          onChange={(color) => onChange({ ...data, buttonTextColor: color })}
          allowColorful={false}
        />
      </div>
    </div>
  );
};
