import React from 'react';
import { Play } from 'lucide-react';
import { MediaBlockData, PageTheme } from '../../types';

interface MediaBlockViewProps {
  data: MediaBlockData;
  theme: PageTheme;
}

export const MediaBlockView: React.FC<MediaBlockViewProps> = ({ data, theme }) => {
  const aspectClass = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '4:5': 'aspect-[4/5]',
    'wide': 'aspect-[21/9]',
  }[data.aspectRatio] || 'aspect-video';

  const isVideo = data.mediaType === 'video';
  const layout = data.layout || (isVideo ? 'video' : 'single');

  // Model 1: Card Polaroid Retrô com Moldura e Legenda
  if (layout === 'polaroid') {
    return (
      <div className="w-full py-2 flex justify-center">
        <div className="p-3 pb-4 rounded-xl bg-white shadow-xl border border-slate-200 text-slate-900 max-w-sm w-full transform rotate-[-0.5deg] hover:rotate-0 transition-transform">
          <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-100 mb-2.5 relative">
            <img
              src={data.mediaUrl}
              alt={data.caption || 'Foto Polaroid'}
              className="w-full h-full object-cover"
            />
          </div>
          {data.caption && (
            <p
              className="text-center font-serif italic text-xs sm:text-sm tracking-wide"
              style={{ color: data.captionColor || '#334155' }}
            >
              {data.caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Model 2: Galeria Duo (2 Fotos Lado a Lado)
  if (layout === 'duo-gallery') {
    const url2 =
      data.secondaryMediaUrl ||
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';

    return (
      <div className="w-full grid grid-cols-2 gap-2">
        <div
          className="min-w-0 rounded-2xl overflow-hidden shadow-md border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorderColor,
          }}
        >
          <div className="aspect-square w-full overflow-hidden bg-black/20">
            <img
              src={data.mediaUrl}
              alt={data.caption || 'Foto 1'}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {data.caption && (
            <div
              className="p-2 text-center text-[10px] font-medium truncate"
              style={{ color: data.captionColor || theme.textSecondaryColor }}
            >
              {data.caption}
            </div>
          )}
        </div>

        <div
          className="min-w-0 rounded-2xl overflow-hidden shadow-md border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorderColor,
          }}
        >
          <div className="aspect-square w-full overflow-hidden bg-black/20">
            <img
              src={url2}
              alt={data.secondaryCaption || 'Foto 2'}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {data.secondaryCaption && (
            <div
              className="p-2 text-center text-[10px] font-medium truncate"
              style={{ color: data.captionColor || theme.textSecondaryColor }}
            >
              {data.secondaryCaption}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Model 3: Player de Vídeo ou Imagem Widescreen (Default)
  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-md border"
      style={{
        backgroundColor: theme.cardBackground,
        borderColor: theme.cardBorderColor,
      }}
    >
      <div className={`w-full ${aspectClass} relative overflow-hidden bg-black/40`}>
        {isVideo ? (
          <iframe
            src={data.mediaUrl}
            title={data.caption || 'Video'}
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={data.mediaUrl}
            alt={data.caption || 'Mídia em destaque'}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {data.caption && (
        <div
          className="p-3 text-center text-xs font-medium border-t"
          style={{
            borderColor: theme.cardBorderColor,
            color: data.captionColor || theme.textSecondaryColor,
          }}
        >
          {data.caption}
        </div>
      )}
    </div>
  );
};
