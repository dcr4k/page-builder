import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { PageTheme, SocialBlockData, SocialLinkItem } from '../../types';
import {
  InstagramIcon,
  WhatsAppIcon,
  YoutubeIcon,
  TikTokIcon,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  SpotifyIcon,
  FacebookIcon,
  EmailIcon,
  WebsiteIcon,
} from '../common/SocialIcons';

interface SocialBlockViewProps {
  data: SocialBlockData;
  theme: PageTheme;
  isEditor?: boolean;
}

export const SocialBlockView: React.FC<SocialBlockViewProps> = ({ data, theme, isEditor }) => {
  const activeLinks = (data.links || []).filter((l: SocialLinkItem) => l.active);

  if (!activeLinks.length) {
    if (isEditor) {
      return (
        <div className="w-full py-3 px-4 border border-dashed border-white/20 rounded-xl text-center text-xs opacity-60">
          Nenhuma rede social ativada. Clique para configurar.
        </div>
      );
    }
    return null;
  }

  const renderSocialIcon = (platform: string, sizeClass = "w-5 h-5") => {
    switch (platform) {
      case 'instagram':
        return <InstagramIcon className={`${sizeClass} text-pink-400`} />;
      case 'whatsapp':
        return <WhatsAppIcon className={`${sizeClass} text-emerald-400`} />;
      case 'youtube':
        return <YoutubeIcon className={`${sizeClass} text-red-500`} />;
      case 'tiktok':
        return <TikTokIcon className={sizeClass} />;
      case 'linkedin':
        return <LinkedinIcon className={`${sizeClass} text-sky-400`} />;
      case 'twitter':
        return <TwitterIcon className={`${sizeClass} text-sky-400`} />;
      case 'github':
        return <GithubIcon className={sizeClass} />;
      case 'spotify':
        return <SpotifyIcon className={`${sizeClass} text-emerald-400`} />;
      case 'facebook':
        return <FacebookIcon className={`${sizeClass} text-blue-500`} />;
      case 'email':
        return <EmailIcon className={`${sizeClass} text-amber-400`} />;
      case 'website':
      default:
        return <WebsiteIcon className={sizeClass} />;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'Instagram';
      case 'whatsapp': return 'WhatsApp';
      case 'youtube': return 'YouTube';
      case 'tiktok': return 'TikTok';
      case 'linkedin': return 'LinkedIn';
      case 'twitter': return 'Twitter / X';
      case 'github': return 'GitHub';
      case 'spotify': return 'Spotify';
      case 'facebook': return 'Facebook';
      case 'email': return 'E-mail';
      case 'website': return 'Site';
      default: return platform;
    }
  };

  const layout = data.layoutStyle || 'row';

  // Model 1: Grade de Redes Sociais com Nomes e Botão (Grid 2 colunas)
  if (layout === 'grid') {
    return (
      <div className="w-full grid grid-cols-2 gap-2.5 py-1">
        {activeLinks.map((link) => {
          const cardContent = (
            <div
              className="p-3 rounded-2xl border flex items-center justify-between gap-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-sm group cursor-pointer"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {renderSocialIcon(link.platform, "w-4 h-4")}
                </div>
                <div className="min-w-0">
                  <h4
                    className="text-xs font-bold truncate leading-tight"
                    style={{ color: theme.textColor }}
                  >
                    {link.label || getPlatformName(link.platform)}
                  </h4>
                  <span
                    className="text-[10px] opacity-70 block truncate"
                    style={{ color: theme.textSecondaryColor }}
                  >
                    Seguir
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" style={{ color: theme.primaryColor }} />
            </div>
          );

          if (isEditor) {
            return <div key={link.id}>{cardContent}</div>;
          }
          return (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block no-underline">
              {cardContent}
            </a>
          );
        })}
      </div>
    );
  }

  // Model 2: Barras / Pílulas Expandidas (Pills)
  if (layout === 'pills') {
    return (
      <div className="w-full flex flex-col gap-2 py-1">
        {activeLinks.map((link) => {
          const pillContent = (
            <div
              className="w-full py-2.5 px-4 rounded-xl border flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer group"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                {renderSocialIcon(link.platform, "w-4 h-4")}
                <span
                  className="text-xs font-semibold truncate"
                  style={{ color: theme.textColor }}
                >
                  {link.label || `Acessar ${getPlatformName(link.platform)}`}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: theme.textColor }} />
            </div>
          );

          if (isEditor) {
            return <div key={link.id}>{pillContent}</div>;
          }
          return (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block no-underline">
              {pillContent}
            </a>
          );
        })}
      </div>
    );
  }

  // Model 3: Dock Flutuante Glassmorphism
  if (layout === 'dock') {
    return (
      <div className="w-full py-2 flex justify-center">
        <div
          className="p-2 rounded-2xl flex items-center justify-center gap-2 shadow-2xl border backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          {activeLinks.map((link) => {
            const itemContent = (
              <div
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-115 active:scale-95 border border-white/10"
                title={link.label || link.platform}
              >
                {renderSocialIcon(link.platform, "w-4 h-4")}
              </div>
            );

            if (isEditor) {
              return <div key={link.id} className="cursor-pointer">{itemContent}</div>;
            }
            return (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="no-underline">
                {itemContent}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Model 4: Linha de Ícones Circulares (Row Clássica)
  return (
    <div className="w-full py-2 flex flex-wrap items-center justify-center gap-3">
      {activeLinks.map((link) => {
        const itemContent = (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm border"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorderColor,
              color: theme.textColor,
            }}
            title={link.label || link.platform}
          >
            {renderSocialIcon(link.platform)}
          </div>
        );

        if (isEditor) {
          return (
            <div key={link.id} className="cursor-pointer">
              {itemContent}
            </div>
          );
        }

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            {itemContent}
          </a>
        );
      })}
    </div>
  );
};
