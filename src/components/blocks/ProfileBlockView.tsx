import React from 'react';
import { CheckCircle2, Award, Star, Users } from 'lucide-react';
import { PageTheme, ProfileBlockData } from '../../types';

interface ProfileBlockViewProps {
  data: ProfileBlockData;
  theme: PageTheme;
}

export const ProfileBlockView: React.FC<ProfileBlockViewProps> = ({ data, theme }) => {
  const shapeClass = {
    circle: 'rounded-full',
    rounded: 'rounded-3xl',
    square: 'rounded-2xl',
  }[data.avatarShape] || 'rounded-full';

  const layout = data.layout || 'center';

  // Dynamic colors with user overrides
  const titleColor = data.nameColor || theme.textColor;
  const subtitleColor = (() => {
    if (data.bioColorChoice === 'white') return '#ffffff';
    if (data.bioColorChoice === 'gray') return '#94a3b8';
    if (data.bioColorChoice === 'black') return '#090a0f';
    return data.bioColor || theme.textSecondaryColor;
  })();

  // Model 1: Perfil Hero com Imagem de Capa (Banner Cover)
  if (layout === 'hero-cover') {
    const coverUrl =
      data.coverUrl ||
      'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop&q=80';

    return (
      <div
        className="w-full rounded-3xl overflow-hidden border shadow-lg pb-4"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
      >
        {/* Top Cover Banner */}
        <div className="w-full h-24 sm:h-28 relative bg-black/40 overflow-hidden">
          <img src={coverUrl} alt="Capa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Avatar overlapping cover */}
        <div className="px-4 flex flex-col items-center text-center -mt-12 relative z-10">
          <div className="relative mb-2">
            <img
              src={data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
              alt={data.name}
              className={`w-20 h-20 sm:w-22 sm:h-22 object-cover ${shapeClass} shadow-xl border-3 border-slate-900`}
            />
          </div>

          <div className="flex items-center gap-1.5 justify-center flex-wrap">
            <h1
              className="text-lg sm:text-xl font-bold tracking-tight"
              style={{ color: titleColor }}
            >
              {data.name || 'Seu Nome'}
            </h1>
            {data.verified && (
              <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20 flex-shrink-0" />
            )}
          </div>

          {data.tagline && (
            <p
              className="text-xs font-semibold mt-0.5 tracking-wide"
              style={{ color: theme.primaryColor }}
            >
              {data.tagline}
            </p>
          )}

          {data.bio && (
            <p
              className="text-xs sm:text-sm mt-1.5 leading-relaxed max-w-sm"
              style={{ color: subtitleColor }}
            >
              {data.bio}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Model 2: Perfil Horizontal / Cartão Lateral (Left Aligned Card)
  if (layout === 'card' || layout === 'left') {
    return (
      <div
        className="w-full p-3.5 sm:p-4 rounded-2xl border shadow-md flex items-center gap-3.5"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
      >
        {data.avatarUrl && (
          <div className="relative flex-shrink-0">
            <img
              src={data.avatarUrl}
              alt={data.name}
              className={`w-16 h-16 sm:w-18 sm:h-18 object-cover ${shapeClass} shadow-md border-2 border-white/20`}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h1
              className="text-base sm:text-lg font-bold tracking-tight truncate"
              style={{ color: titleColor }}
            >
              {data.name || 'Seu Nome'}
            </h1>
            {data.verified && (
              <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20 flex-shrink-0" />
            )}
          </div>

          {data.tagline && (
            <p
              className="text-xs font-semibold mt-0.5 tracking-wide truncate"
              style={{ color: theme.primaryColor }}
            >
              {data.tagline}
            </p>
          )}

          {data.bio && (
            <p
              className="text-[11px] sm:text-xs mt-1 leading-snug line-clamp-2"
              style={{ color: subtitleColor }}
            >
              {data.bio}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Model 3: Perfil com Badges de Conquistas / Autoridade
  if (layout === 'badge') {
    const badges = data.badges && data.badges.length > 0 ? data.badges : [
      '🏆 Criador Oficial',
      '⭐ 5.0 (500+ avaliações)',
      '🚀 +10k Membros',
    ];

    return (
      <div className="w-full py-2 flex flex-col items-center text-center">
        {data.avatarUrl && (
          <div className="relative mb-3 group">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400">
              <img
                src={data.avatarUrl}
                alt={data.name}
                className={`w-22 h-22 sm:w-24 sm:h-24 object-cover ${shapeClass} shadow-xl border-2 border-slate-950`}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 justify-center flex-wrap">
          <h1
            className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ color: titleColor }}
          >
            {data.name || 'Seu Nome'}
          </h1>
          {data.verified && (
            <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20 flex-shrink-0" />
          )}
        </div>

        {data.tagline && (
          <p
            className="text-xs font-semibold mt-1 tracking-wide"
            style={{ color: theme.primaryColor }}
          >
            {data.tagline}
          </p>
        )}

        {/* Authority Badges */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mt-2.5 max-w-xs">
          {badges.map((b, idx) => (
            <span
              key={idx}
              className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border shadow-xs"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorderColor,
                color: theme.textColor,
              }}
            >
              {b}
            </span>
          ))}
        </div>

        {data.bio && (
          <p
            className="text-xs sm:text-sm mt-2 leading-relaxed max-w-md"
            style={{ color: subtitleColor }}
          >
            {data.bio}
          </p>
        )}
      </div>
    );
  }

  // Model 4: Perfil Centralizado Clássico (Default)
  return (
    <div className="w-full py-2 flex flex-col items-center text-center">
      {data.avatarUrl && (
        <div className="relative mb-3 group">
          <div className="relative">
            <img
              src={data.avatarUrl}
              alt={data.name}
              className={`w-24 h-24 object-cover ${shapeClass} shadow-xl border-2 border-white/20 transition-transform duration-300 group-hover:scale-105`}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-1.5 justify-center flex-wrap">
        <h1
          className="text-xl md:text-2xl font-bold tracking-tight"
          style={{ color: titleColor }}
        >
          {data.name || 'Seu Nome'}
        </h1>
        {data.verified && (
          <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20 flex-shrink-0" />
        )}
      </div>

      {data.tagline && (
        <p
          className="text-xs font-semibold mt-1 tracking-wide"
          style={{ color: theme.primaryColor }}
        >
          {data.tagline}
        </p>
      )}

      {data.bio && (
        <p
          className="text-sm mt-2 leading-relaxed max-w-md"
          style={{ color: subtitleColor }}
        >
          {data.bio}
        </p>
      )}
    </div>
  );
};
