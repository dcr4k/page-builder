import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { ContactBlockData, PageTheme } from '../../types';
import { getButtonClasses, getButtonStyle } from '../../utils/themeStyles';
import { WhatsAppIcon } from '../common/SocialIcons';

interface ContactBlockViewProps {
  data: ContactBlockData;
  theme: PageTheme;
  isEditor?: boolean;
}

export const ContactBlockView: React.FC<ContactBlockViewProps> = ({ data, theme, isEditor }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const buttonStyle = getButtonStyle(theme);
  const buttonClasses = getButtonClasses(theme);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditor) return;

    if (data.submitAction === 'whatsapp') {
      const cleanDest = (data.destination || '5511999999999').replace(/[^0-9]/g, '');
      const text = encodeURIComponent(
        `Olá! Mensagem de ${formData.name || 'Cliente'} (${formData.email || ''} / ${formData.phone || ''}):\n${formData.message || 'Gostaria de saber mais informações!'}`
      );
      window.open(`https://wa.me/${cleanDest}?text=${text}`, '_blank');
      setSubmitted(true);
    } else if (data.submitAction === 'email') {
      const subject = encodeURIComponent(`Contato de ${formData.name || 'Cliente'}`);
      const body = encodeURIComponent(
        `${formData.message || 'Inscrição na lista'}\n\nContato: ${formData.name} (${formData.email} / ${formData.phone})`
      );
      window.location.href = `mailto:${data.destination || 'contato@seusite.com'}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } else {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const layout = data.layout || (data.submitAction === 'whatsapp' && !data.showEmail && !data.showMessage ? 'whatsapp-direct' : 'full-form');

  // Model 1: Card Direto de WhatsApp com Atendente Online
  if (layout === 'whatsapp-direct') {
    const avatar = data.agentAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80';
    const status = data.agentStatus || 'Online agora no WhatsApp';

    return (
      <div
        className="w-full rounded-2xl p-4 sm:p-5 shadow-lg border relative overflow-hidden"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
      >
        <div className="flex items-center gap-3.5 mb-3.5">
          <div className="relative flex-shrink-0">
            <img
              src={avatar}
              alt="Atendente"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                {status}
              </span>
            </div>
            <h4
              className="font-bold text-sm sm:text-base leading-tight truncate"
              style={{ color: theme.textColor }}
            >
              {data.title || 'Fale Conosco Diretamente'}
            </h4>
            <p
              className="text-xs opacity-75 mt-0.5 line-clamp-1"
              style={{ color: theme.textSecondaryColor }}
            >
              {data.description || 'Tire dúvidas ou solicite um atendimento personalizado'}
            </p>
          </div>
        </div>

        {isEditor ? (
          <div
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>{data.buttonText || 'Iniciar Conversa no WhatsApp'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        ) : (
          <a
            href={`https://wa.me/${(data.destination || '5511999999999').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Olá! Vim através da sua página e gostaria de tirar uma dúvida.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md block text-center no-underline transition-all active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>{data.buttonText || 'Iniciar Conversa no WhatsApp'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
    );
  }

  // Model 2: Captura Rápida de E-mail / Newsletter Inline
  if (layout === 'inline-newsletter') {
    return (
      <div
        className="w-full rounded-2xl p-4 sm:p-5 shadow-lg border"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
      >
        <div className="text-center mb-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-2">
            <Mail className="w-5 h-5" />
          </div>
          <h3
            className="font-bold text-sm sm:text-base leading-tight"
            style={{ color: theme.textColor }}
          >
            {data.title || 'Receba Novidades & Descontos'}
          </h3>
          {data.description && (
            <p
              className="text-xs opacity-80 mt-1 max-w-xs mx-auto"
              style={{ color: theme.textSecondaryColor }}
            >
              {data.description}
            </p>
          )}
        </div>

        {submitted ? (
          <div className="py-2 text-center text-xs text-emerald-400 font-bold flex items-center justify-center gap-1.5 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>Inscrição realizada com sucesso!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Digite seu melhor e-mail..."
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className={`py-2.5 px-4 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all ${buttonClasses}`}
              style={buttonStyle}
            >
              <span>{data.buttonText || 'Cadastrar'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    );
  }

  // Model 3: Formulário Completo de Lead (Default)
  return (
    <div
      className="w-full rounded-2xl p-5 shadow-lg border"
      style={{
        backgroundColor: theme.cardBackground,
        borderColor: theme.cardBorderColor,
      }}
    >
      <div className="text-center mb-4">
        <h3
          className="font-bold text-base sm:text-lg"
          style={{ color: theme.textColor }}
        >
          {data.title || 'Fale Conosco'}
        </h3>
        {data.description && (
          <p
            className="text-xs sm:text-sm mt-1 leading-relaxed"
            style={{ color: theme.textSecondaryColor }}
          >
            {data.description}
          </p>
        )}
      </div>

      {submitted ? (
        <div className="py-6 flex flex-col items-center justify-center text-center gap-2 animate-fade-in">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
          <h4 className="font-bold text-sm" style={{ color: theme.textColor }}>
            Mensagem Enviada!
          </h4>
          <p className="text-xs opacity-80" style={{ color: theme.textSecondaryColor }}>
            Obrigado pelo contato. Responderemos o mais breve possível.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs underline opacity-70 hover:opacity-100"
            style={{ color: theme.primaryColor }}
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          {data.showName && (
            <input
              type="text"
              placeholder="Seu nome"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
          )}

          {data.showEmail && (
            <input
              type="email"
              placeholder="Seu e-mail"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
          )}

          {data.showPhone && (
            <input
              type="tel"
              placeholder="Seu WhatsApp ou Telefone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
          )}

          {data.showMessage && (
            <textarea
              placeholder="Sua mensagem ou dúvida..."
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 mt-1 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all ${buttonClasses}`}
            style={buttonStyle}
          >
            <span>{data.buttonText || 'Enviar Mensagem'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};
