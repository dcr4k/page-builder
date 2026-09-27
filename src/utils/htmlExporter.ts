import type { Block, PageTheme, SocialLinkItem } from '../types';
import { isLightColor } from './contrast';

export const SOCIAL_SVGS: Record<string, string> = {
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  spotify: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 11.5c3-1 6-.5 8.5 1"/><path d="M7 8.5c4-1.2 8-.7 11 1.2"/><path d="M9 14.5c2.5-.7 5-.3 7 1"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  email: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  website: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
};

export const generateCleanHtml = (theme: PageTheme, blocks: Block[]): string => {
  // Compute background style
  let bgCss = `background-color: ${theme.backgroundColor};`;
  if (theme.backgroundType === 'gradient') {
    const viaPart = theme.gradient.via ? `, ${theme.gradient.via}` : '';
    let dir = 'to bottom';
    if (theme.gradient.direction === 'to-br') dir = 'to bottom right';
    if (theme.gradient.direction === 'to-r') dir = 'to right';
    if (theme.gradient.direction === 'to-t') dir = 'to top';
    bgCss = `background: linear-gradient(${dir}, ${theme.gradient.from}${viaPart}, ${theme.gradient.to});`;
  } else if (theme.backgroundType === 'image' && theme.backgroundImage) {
    bgCss = `background-image: url('${theme.backgroundImage}'); background-size: cover; background-position: center; background-attachment: fixed;`;
  }

  // Radius CSS
  const radiusMap = {
    none: '0px',
    sm: '6px',
    md: '12px',
    lg: '18px',
    full: '9999px',
  };
  const btnRadius = radiusMap[theme.buttonRadius] || '12px';

  // Button style class/CSS
  let btnBaseStyle = `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 14px 20px;
    border-radius: ${btnRadius};
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    transition: all 0.25s ease;
    cursor: pointer;
    box-sizing: border-box;
  `;

  if (theme.buttonStyle === 'filled') {
    btnBaseStyle += `
      background-color: ${theme.primaryColor};
      color: ${theme.primaryTextColor};
      border: 1px solid transparent;
      box-shadow: 0 4px 14px -2px rgba(0,0,0,0.15);
    `;
  } else if (theme.buttonStyle === 'outline') {
    btnBaseStyle += `
      background-color: transparent;
      color: ${theme.textColor};
      border: 1.5px solid ${theme.primaryColor};
    `;
  } else if (theme.buttonStyle === 'glass') {
    btnBaseStyle += `
      background-color: rgba(255, 255, 255, 0.08);
      color: ${theme.textColor};
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    `;
  } else if (theme.buttonStyle === 'shadow3d') {
    btnBaseStyle += `
      background-color: ${theme.primaryColor};
      color: ${theme.primaryTextColor};
      border: 1px solid transparent;
      box-shadow: 0 5px 0px 0px rgba(0,0,0,0.3);
      transform: translateY(-2px);
    `;
  } else {
    btnBaseStyle += `
      background-color: ${theme.primaryColor}25;
      color: ${theme.primaryColor};
      border: 1px solid ${theme.primaryColor}40;
    `;
  }

  // Generate blocks HTML
  const blocksHtml = blocks.map((block) => {
    switch (block.type) {
      case 'profile': {
        const d = block.data;
        const avatarRadius = d.avatarShape === 'circle' ? '50%' : d.avatarShape === 'rounded' ? '24px' : '16px';
        const isCover = d.layout === 'hero-cover';
        const isCard = d.layout === 'card' || d.layout === 'left';
        const isBadge = d.layout === 'badge';

        if (isCover) {
          const coverUrl = d.coverUrl || 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop&q=80';
          return `
          <!-- Profile Hero Cover Block -->
          <div class="block-item profile-hero" style="border-radius: 20px; overflow: hidden; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.25);">
            <div style="width: 100%; height: 110px; position: relative; overflow: hidden; background: #000;">
              <img src="${coverUrl}" alt="Capa" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 0 16px 20px 16px; margin-top: -45px; text-align: center; position: relative;">
              <div style="display: inline-block; position: relative; margin-bottom: 10px;">
                <img src="${d.avatarUrl}" alt="${d.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: ${avatarRadius}; border: 3px solid ${theme.cardBackground}; box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />
              </div>
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: ${theme.textColor}; letter-spacing: -0.02em;">${d.name}</h1>
              ${d.tagline ? `<p style="margin: 4px 0 0 0; font-size: 12px; font-weight: 600; color: ${theme.primaryColor};">${d.tagline}</p>` : ''}
              ${d.bio ? `<p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.5; color: ${theme.textSecondaryColor}; max-width: 440px; display: inline-block;">${d.bio}</p>` : ''}
            </div>
          </div>`;
        }

        if (isCard) {
          return `
          <!-- Profile Card Block -->
          <div class="block-item profile-card" style="display: flex; align-items: center; gap: 14px; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 16px; padding: 14px; margin-bottom: 20px;">
            ${d.avatarUrl ? `
            <img src="${d.avatarUrl}" alt="${d.name}" style="width: 64px; height: 64px; object-fit: cover; border-radius: ${avatarRadius}; flex-shrink: 0;" />
            ` : ''}
            <div style="flex: 1; min-width: 0;">
              <h1 style="margin: 0; font-size: 17px; font-weight: 700; color: ${theme.textColor};">${d.name}</h1>
              ${d.tagline ? `<p style="margin: 2px 0 0 0; font-size: 11px; font-weight: 600; color: ${theme.primaryColor};">${d.tagline}</p>` : ''}
              ${d.bio ? `<p style="margin: 4px 0 0 0; font-size: 12px; line-height: 1.4; color: ${theme.textSecondaryColor};">${d.bio}</p>` : ''}
            </div>
          </div>`;
        }

        const badgesHtml = isBadge && d.badges ? `
          <div style="display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; margin-top: 10px;">
            ${d.badges.map((b: string) => `<span style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; color: ${theme.textColor};">${b}</span>`).join('')}
          </div>
        ` : '';

        return `
        <!-- Profile Block -->
        <header class="block-item profile-block" style="text-align: center; margin-bottom: 24px;">
          ${d.avatarUrl ? `
          <div style="display: inline-block; position: relative; margin-bottom: 14px;">
            <img src="${d.avatarUrl}" alt="${d.name}" style="width: 96px; height: 96px; object-fit: cover; border-radius: ${avatarRadius}; border: 3px solid rgba(255, 255, 255, 0.2); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);" />
          </div>` : ''}
          <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: ${theme.textColor}; letter-spacing: -0.02em;">${d.name}</h1>
            ${d.verified ? `<svg style="color: #38bdf8; width: 20px; height: 20px; flex-shrink: 0;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>` : ''}
          </div>
          ${d.tagline ? `<p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 600; color: ${theme.primaryColor}; opacity: 0.95;">${d.tagline}</p>` : ''}
          ${badgesHtml}
          ${d.bio ? `<p style="margin: 8px 0 0 0; font-size: 14px; line-height: 1.5; color: ${theme.textSecondaryColor}; max-width: 480px; display: inline-block;">${d.bio}</p>` : ''}
        </header>`;
      }

      case 'social': {
        const d = block.data;
        const activeLinks = d.links.filter((l: SocialLinkItem) => l.active && l.url);
        if (!activeLinks.length) return '';

        if (d.layoutStyle === 'grid') {
          const items = activeLinks.map((l: SocialLinkItem) => {
            const svg = SOCIAL_SVGS[l.platform] || SOCIAL_SVGS.website;
            return `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 10px; padding: 10px; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 12px; color: ${theme.textColor}; text-decoration: none;">
              <span style="display: inline-flex; width: 28px; height: 28px; align-items: center; justify-content: center;">${svg}</span>
              <span style="font-size: 12px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${l.label || l.platform}</span>
            </a>`;
          }).join('\n');
          return `
          <!-- Social Grid Block -->
          <div class="block-item social-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;">
            ${items}
          </div>`;
        }

        if (d.layoutStyle === 'pills') {
          const items = activeLinks.map((l: SocialLinkItem) => {
            const svg = SOCIAL_SVGS[l.platform] || SOCIAL_SVGS.website;
            return `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 12px; color: ${theme.textColor}; text-decoration: none; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="display: inline-flex; width: 20px; height: 20px; align-items: center; justify-content: center;">${svg}</span>
                <span style="font-size: 13px; font-weight: 600;">${l.label || l.platform}</span>
              </div>
              <span style="opacity: 0.6;">→</span>
            </a>`;
          }).join('\n');
          return `
          <!-- Social Pills Block -->
          <div class="block-item social-pills" style="margin-bottom: 20px;">
            ${items}
          </div>`;
        }

        const items = activeLinks.map((l: SocialLinkItem) => {
          const svg = SOCIAL_SVGS[l.platform] || SOCIAL_SVGS.website;
          return `
          <a href="${l.url}" target="_blank" rel="noopener noreferrer" title="${l.label || l.platform}" class="social-icon-btn" style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; color: ${theme.textColor}; text-decoration: none; transition: transform 0.2s, background 0.2s;">
            ${svg}
          </a>`;
        }).join('\n');
        return `
        <!-- Social Block -->
        <div class="block-item social-block" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 20px;">
          ${items}
        </div>`;
      }

      case 'link': {
        const d = block.data;
        const effect = d.highlightEffect || (d.highlight ? 'pulse' : 'none');
        let effectClass = '';
        if (effect === 'pulse') effectClass = 'highlight-pulse';
        else if (effect === 'shimmer') effectClass = 'highlight-shimmer';
        else if (effect === 'wobble') effectClass = 'highlight-wobble';
        else if (effect === 'glow') effectClass = 'highlight-glow';

        const isPrimaryLight = isLightColor(theme.primaryColor);
        const isPageLight = isLightColor(theme.backgroundColor);

        let linkSpecificStyle = btnBaseStyle;
        if (d.styleOverride === 'primary') {
          linkSpecificStyle = `
            ${btnBaseStyle}
            background-color: ${theme.primaryColor} !important;
            color: ${isPrimaryLight ? '#0f172a' : '#ffffff'} !important;
            border: 1px solid transparent !important;
            box-shadow: ${isPrimaryLight ? '0 4px 14px -2px rgba(0,0,0,0.15)' : '0 4px 16px -2px rgba(99,102,241,0.35)'} !important;
          `;
        } else if (d.styleOverride === 'outline') {
          linkSpecificStyle = `
            ${btnBaseStyle}
            background-color: transparent !important;
            color: ${isPageLight ? '#0f172a' : '#ffffff'} !important;
            border: 2px solid ${theme.primaryColor} !important;
          `;
        }

        if (d.layout === 'card-thumb') {
          return `
          <!-- Link Card Thumb Block -->
          <div class="block-item link-thumb" style="margin-bottom: 14px;">
            <a href="${d.url}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 12px; padding: 10px; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 14px; text-decoration: none; color: ${theme.textColor};">
              <img src="${d.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80'}" alt="${d.title}" style="width: 52px; height: 52px; object-fit: cover; border-radius: 10px; flex-shrink: 0;" />
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${d.title}</div>
                ${d.subtitle ? `<div style="font-size: 11px; opacity: 0.8; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: ${theme.textSecondaryColor};">${d.subtitle}</div>` : ''}
              </div>
              <span style="font-size: 14px; color: ${theme.primaryColor}; padding: 0 4px;">→</span>
            </a>
          </div>`;
        }

        if (d.layout === 'duo') {
          return `
          <!-- Link Duo Block -->
          <div class="block-item link-duo" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 14px;">
            <a href="${d.url}" target="_blank" rel="noopener noreferrer" style="${linkSpecificStyle}">
              ${d.title}
            </a>
            <a href="${d.secondaryUrl || '#'}" target="_blank" rel="noopener noreferrer" style="${btnBaseStyle}; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; color: ${theme.textColor};">
              ${d.secondaryTitle || 'Opção 2'}
            </a>
          </div>`;
        }

        return `
        <!-- Link Block -->
        <div class="block-item link-block" style="margin-bottom: 14px;">
          <a href="${d.url}" target="_blank" rel="noopener noreferrer" class="link-btn ${effectClass}" style="${linkSpecificStyle}">
            <div style="flex: 1; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span>${d.title}</span>
                ${d.badgeText ? `<span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 9999px; background: rgba(0, 0, 0, 0.25); color: inherit; font-weight: 700;">${d.badgeText}</span>` : ''}
              </div>
              ${d.subtitle ? `<div style="font-size: 12px; font-weight: 400; opacity: 0.85; margin-top: 2px;">${d.subtitle}</div>` : ''}
            </div>
          </a>
        </div>`;
      }

      case 'product': {
        const d = block.data;
        const items = d.items && d.items.length > 0 ? d.items : [d];
        const layout = d.layout || '1-col';

        if (layout === '3-col') {
          const cardsHtml = items.map((item: any) => `
            <div style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="position: relative; width: 100%; aspect-ratio: 1/1; overflow: hidden; background: rgba(0,0,0,0.1);">
                  ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title || ''}" style="width: 100%; height: 100%; object-fit: cover;" />` : ''}
                  ${item.badge ? `<span style="position: absolute; top: 4px; left: 4px; background: rgba(0,0,0,0.8); color: #fff; font-size: 8px; font-weight: 700; padding: 2px 6px; border-radius: 9999px;">${item.badge}</span>` : ''}
                </div>
                <div style="padding: 6px;">
                  <h4 style="margin: 0; font-size: 11px; font-weight: 700; color: ${theme.textColor}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.title || 'Produto'}</h4>
                  <div style="font-size: 11px; font-weight: 800; color: ${theme.primaryColor}; margin-top: 2px;">${item.price || ''}</div>
                </div>
              </div>
              <div style="padding: 6px; padding-top: 0;">
                <a href="${item.buttonUrl || '#'}" target="_blank" rel="noopener noreferrer" style="${btnBaseStyle} padding: 4px 6px; font-size: 10px;">
                  ${item.buttonText || 'Ver'}
                </a>
              </div>
            </div>
          `).join('');

          return `
          <!-- Product Block (3 per line) -->
          <div class="block-item product-grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 20px;">
            ${cardsHtml}
          </div>`;
        }

        if (layout === '2-col') {
          const cardsHtml = items.map((item: any) => `
            <div style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="position: relative; width: 100%; height: 130px; overflow: hidden; background: rgba(0,0,0,0.1);">
                  ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title || ''}" style="width: 100%; height: 100%; object-fit: cover;" />` : ''}
                  ${item.badge ? `<span style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.8); color: #fff; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 9999px;">${item.badge}</span>` : ''}
                </div>
                <div style="padding: 10px;">
                  <h4 style="margin: 0; font-size: 13px; font-weight: 700; color: ${theme.textColor}; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${item.title || 'Produto'}</h4>
                  <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 4px;">
                    <span style="font-size: 13px; font-weight: 800; color: ${theme.primaryColor};">${item.price || ''}</span>
                    ${item.originalPrice ? `<span style="font-size: 10px; text-decoration: line-through; color: ${theme.textSecondaryColor}; opacity: 0.7;">${item.originalPrice}</span>` : ''}
                  </div>
                </div>
              </div>
              <div style="padding: 10px; padding-top: 0;">
                <a href="${item.buttonUrl || '#'}" target="_blank" rel="noopener noreferrer" style="${btnBaseStyle} padding: 6px 10px; font-size: 12px;">
                  ${item.buttonText || 'Comprar'}
                </a>
              </div>
            </div>
          `).join('');

          return `
          <!-- Product Block (2 per line) -->
          <div class="block-item product-grid-2" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;">
            ${cardsHtml}
          </div>`;
        }

        // 1-col (Default)
        const cardsHtml = items.map((item: any) => `
          <div style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 16px; overflow: hidden; margin-bottom: 14px;">
            ${item.imageUrl ? `
            <div style="position: relative; width: 100%; height: 210px; overflow: hidden;">
              <img src="${item.imageUrl}" alt="${item.title || ''}" style="width: 100%; height: 100%; object-fit: cover;" />
              ${item.badge ? `<span style="position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.75); color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">${item.badge}</span>` : ''}
            </div>` : ''}
            <div style="padding: 18px;">
              <h3 style="margin: 0; font-size: 17px; font-weight: 700; color: ${theme.textColor};">${item.title || 'Produto'}</h3>
              ${item.description ? `<p style="margin: 6px 0 12px 0; font-size: 13px; line-height: 1.4; color: ${theme.textSecondaryColor};">${item.description}</p>` : ''}
              <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px;">
                <span style="font-size: 20px; font-weight: 800; color: ${theme.primaryColor};">${item.price || ''}</span>
                ${item.originalPrice ? `<span style="font-size: 13px; text-decoration: line-through; color: ${theme.textSecondaryColor}; opacity: 0.7;">${item.originalPrice}</span>` : ''}
              </div>
              <a href="${item.buttonUrl || '#'}" target="_blank" rel="noopener noreferrer" style="${btnBaseStyle}">
                ${item.buttonText || 'Comprar Agora'}
              </a>
            </div>
          </div>
        `).join('');

        return `
        <!-- Product Block (1 per line) -->
        <div class="block-item product-list" style="margin-bottom: 20px;">
          ${cardsHtml}
        </div>`;
      }

      case 'media': {
        const d = block.data;
        const aspectHeight = d.aspectRatio === '1:1' ? '100%' : d.aspectRatio === '4:5' ? '125%' : '56.25%';

        if (d.layout === 'polaroid') {
          return `
          <!-- Media Polaroid Block -->
          <div class="block-item media-polaroid" style="padding: 14px 14px 18px 14px; background: #ffffff; border-radius: 14px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); margin-bottom: 20px; text-align: center;">
            <div style="aspect-ratio: 1/1; width: 100%; border-radius: 8px; overflow: hidden; background: #eee;">
              <img src="${d.mediaUrl}" alt="${d.caption || 'Foto Polaroid'}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            ${d.caption ? `<p style="margin: 10px 0 0 0; font-family: serif; font-style: italic; font-size: 13px; color: #334155;">${d.caption}</p>` : ''}
          </div>`;
        }

        if (d.layout === 'duo-gallery') {
          const url2 = d.secondaryMediaUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
          return `
          <!-- Media Duo Gallery Block -->
          <div class="block-item media-duo" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;">
            <div style="border-radius: 14px; overflow: hidden; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor};">
              <div style="aspect-ratio: 1/1; overflow: hidden;"><img src="${d.mediaUrl}" alt="1" style="width: 100%; height: 100%; object-fit: cover;" /></div>
              ${d.caption ? `<div style="padding: 6px; font-size: 11px; text-align: center; color: ${theme.textSecondaryColor};">${d.caption}</div>` : ''}
            </div>
            <div style="border-radius: 14px; overflow: hidden; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor};">
              <div style="aspect-ratio: 1/1; overflow: hidden;"><img src="${url2}" alt="2" style="width: 100%; height: 100%; object-fit: cover;" /></div>
              ${d.secondaryCaption ? `<div style="padding: 6px; font-size: 11px; text-align: center; color: ${theme.textSecondaryColor};">${d.secondaryCaption}</div>` : ''}
            </div>
          </div>`;
        }

        return `
        <!-- Media Block -->
        <div class="block-item media-block" style="border-radius: 16px; overflow: hidden; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; margin-bottom: 20px;">
          ${d.mediaType === 'video' ? `
          <div style="position: relative; width: 100%; padding-bottom: ${aspectHeight}; height: 0;">
            <iframe src="${d.mediaUrl}" title="${d.caption || 'Video'}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>` : `
          <img src="${d.mediaUrl}" alt="${d.caption || 'Imagem em destaque'}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
          `}
          ${d.caption ? `<p style="margin: 0; padding: 10px 14px; font-size: 12px; color: ${theme.textSecondaryColor}; text-align: center; border-top: 1px solid ${theme.cardBorderColor};">${d.caption}</p>` : ''}
        </div>`;
      }

      case 'contact': {
        const d = block.data;
        if (d.layout === 'whatsapp-direct') {
          const avatar = d.agentAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80';
          const cleanDest = (d.destination || '5511999999999').replace(/[^0-9]/g, '');
          return `
          <!-- Contact WhatsApp Direct Block -->
          <div class="block-item contact-whatsapp" style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 16px; padding: 16px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <img src="${avatar}" alt="Atendente" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid #10b981; object-fit: cover;" />
              <div>
                <span style="font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase;">${d.agentStatus || 'Online agora no WhatsApp'}</span>
                <h4 style="margin: 2px 0 0 0; font-size: 15px; font-weight: 700; color: ${theme.textColor};">${d.title || 'Fale Conosco Diretamente'}</h4>
                ${d.description ? `<p style="margin: 2px 0 0 0; font-size: 11px; opacity: 0.8; color: ${theme.textSecondaryColor};">${d.description}</p>` : ''}
              </div>
            </div>
            <a href="https://wa.me/${cleanDest}" target="_blank" rel="noopener noreferrer" style="${btnBaseStyle}; background-color: #059669 !important; color: #ffffff !important; display: flex; align-items: center; justify-content: center; gap: 8px;">
              ${d.buttonText || 'Iniciar Conversa no WhatsApp'} →
            </a>
          </div>`;
        }

        if (d.layout === 'inline-newsletter') {
          return `
          <!-- Contact Newsletter Block -->
          <div class="block-item contact-newsletter" style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 16px; padding: 18px; margin-bottom: 20px; text-align: center;">
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700; color: ${theme.textColor};">${d.title || 'Receba Novidades Exclusivas'}</h3>
            ${d.description ? `<p style="margin: 0 0 14px 0; font-size: 12px; color: ${theme.textSecondaryColor};">${d.description}</p>` : ''}
            <form onsubmit="handleContactSubmit(event, '${d.submitAction}', '${d.destination}')" style="display: flex; gap: 8px;">
              <input type="email" name="email" placeholder="Digite seu e-mail..." required style="flex: 1; padding: 10px 14px; border-radius: 10px; background: rgba(0,0,0,0.2); border: 1px solid ${theme.cardBorderColor}; color: ${theme.textColor}; font-size: 13px;" />
              <button type="submit" style="${btnBaseStyle}; padding: 10px 16px; font-size: 13px;">${d.buttonText || 'Cadastrar'}</button>
            </form>
          </div>`;
        }

        return `
        <!-- Contact Block -->
        <div class="block-item contact-card" style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 16px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 6px 0; font-size: 17px; font-weight: 700; color: ${theme.textColor}; text-align: center;">${d.title}</h3>
          ${d.description ? `<p style="margin: 0 0 16px 0; font-size: 13px; color: ${theme.textSecondaryColor}; text-align: center;">${d.description}</p>` : ''}
          <form onsubmit="handleContactSubmit(event, '${d.submitAction}', '${d.destination}')" style="display: flex; flex-direction: column; gap: 10px;">
            ${d.showName ? `<input type="text" name="name" placeholder="Seu nome completo" required style="width: 100%; padding: 12px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid ${theme.cardBorderColor}; color: ${theme.textColor}; font-size: 14px; box-sizing: border-box;" />` : ''}
            ${d.showEmail ? `<input type="email" name="email" placeholder="Seu melhor e-mail" required style="width: 100%; padding: 12px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid ${theme.cardBorderColor}; color: ${theme.textColor}; font-size: 14px; box-sizing: border-box;" />` : ''}
            ${d.showPhone ? `<input type="tel" name="phone" placeholder="Seu WhatsApp ou telefone" style="width: 100%; padding: 12px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid ${theme.cardBorderColor}; color: ${theme.textColor}; font-size: 14px; box-sizing: border-box;" />` : ''}
            ${d.showMessage ? `<textarea name="message" rows="3" placeholder="Sua mensagem..." required style="width: 100%; padding: 12px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid ${theme.cardBorderColor}; color: ${theme.textColor}; font-size: 14px; box-sizing: border-box; resize: vertical;"></textarea>` : ''}
            <button type="submit" style="${btnBaseStyle} margin-top: 4px;">${d.buttonText || 'Enviar Mensagem'}</button>
          </form>
        </div>`;
      }

      case 'text': {
        const d = block.data;
        if (d.style === 'quote') {
          return `
          <!-- Quote Card Block -->
          <div class="block-item text-quote" style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 16px; padding: 18px; margin-bottom: 18px;">
            <div style="font-size: 24px; color: ${theme.primaryColor}; opacity: 0.6; line-height: 1;">“</div>
            <p style="margin: 4px 0 10px 0; font-family: serif; font-style: italic; font-size: 15px; line-height: 1.5; color: ${theme.textColor};">"${d.content}"</p>
            ${(d.quoteAuthor || d.title) ? `<div style="font-size: 12px; font-weight: 700; color: ${theme.textColor}; border-top: 1px solid ${theme.cardBorderColor}; padding-top: 8px;">— ${d.quoteAuthor || d.title} <span style="opacity: 0.7; font-weight: 400;">${d.quoteRole ? `• ${d.quoteRole}` : ''}</span></div>` : ''}
          </div>`;
        }

        if (d.style === 'callout') {
          return `
          <!-- Callout Alert Block -->
          <div class="block-item text-callout" style="background: ${theme.primaryColor}15; border: 1px solid ${theme.primaryColor}40; border-left: 4px solid ${theme.primaryColor}; border-radius: 14px; padding: 14px; margin-bottom: 18px;">
            ${d.title ? `<h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: ${theme.textColor};">${d.title}</h4>` : ''}
            <div style="font-size: 13px; line-height: 1.5; color: ${theme.textSecondaryColor};">${d.content}</div>
          </div>`;
        }

        if (d.style === 'checklist') {
          const items = d.bulletItems || ['Benefício 1', 'Benefício 2', 'Benefício 3'];
          return `
          <!-- Checklist Block -->
          <div class="block-item text-checklist" style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 16px; padding: 16px; margin-bottom: 18px;">
            ${d.title ? `<h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: ${theme.textColor};">${d.title}</h4>` : ''}
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${items.map((it: string) => `<div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: ${theme.textColor};"><span style="color: #10b981; font-weight: 700;">✓</span><span>${it}</span></div>`).join('')}
            </div>
          </div>`;
        }

        return `
        <!-- Text Block -->
        <div class="block-item text-block" style="text-align: ${d.align}; margin-bottom: 18px; padding: 4px 6px;">
          ${d.title ? `<h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: ${theme.textColor};">${d.title}</h3>` : ''}
          <div style="font-size: 14px; line-height: 1.6; color: ${theme.textSecondaryColor};">${d.content}</div>
        </div>`;
      }

      case 'divider': {
        const d = block.data;
        const heights = { sm: '12px', md: '20px', lg: '30px', xl: '40px' };
        const h = heights[d.spacing] || '20px';
        if (d.style === 'space') {
          return `<div style="height: ${h};"></div>`;
        }
        if (d.style === 'badge') {
          return `
          <!-- Divider Badge Block -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: ${h} 0;">
            <div style="flex: 1; height: 1px; background: ${theme.cardBorderColor};"></div>
            <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 2px 10px; border-radius: 9999px; background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; color: ${theme.primaryColor};">${d.badgeText || '✦ SEÇÃO ✦'}</span>
            <div style="flex: 1; height: 1px; background: ${theme.cardBorderColor};"></div>
          </div>`;
        }
        if (d.style === 'dots') {
          return `
          <!-- Divider Dots Block -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: ${h} 0;">
            <span style="width: 5px; height: 5px; border-radius: 50%; background: ${theme.cardBorderColor}; display: inline-block;"></span>
            <span style="width: 7px; height: 7px; border-radius: 50%; background: ${theme.primaryColor}; display: inline-block;"></span>
            <span style="width: 5px; height: 5px; border-radius: 50%; background: ${theme.cardBorderColor}; display: inline-block;"></span>
          </div>`;
        }
        if (d.style === 'gradient') {
          return `
          <!-- Divider Gradient Block -->
          <div style="padding: ${h} 0;">
            <div style="width: 100%; height: 1px; background: linear-gradient(to right, transparent, ${theme.primaryColor}, transparent);"></div>
          </div>`;
        }
        return `
        <!-- Divider Block -->
        <div style="padding: ${h} 0;">
          <hr style="border: 0; height: 1px; background: ${theme.cardBorderColor}; margin: 0;" />
        </div>`;
      }

      case 'faq': {
        const d = block.data;
        if (d.layout === 'cards') {
          const cardsHtml = (d.items || []).map((item) => `
            <div style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 14px; padding: 14px; margin-bottom: 10px;">
              <h4 style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: ${theme.textColor};">Q: ${item.question}</h4>
              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: ${theme.textSecondaryColor};">${item.answer}</p>
            </div>
          `).join('\n');
          return `
          <!-- FAQ Cards Block -->
          <div class="block-item faq-cards" style="margin-bottom: 20px;">
            ${d.title ? `<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: ${theme.textColor}; text-align: center;">${d.title}</h3>` : ''}
            ${cardsHtml}
          </div>`;
        }

        const faqItems = (d.items || []).map((item) => `
          <details style="background: ${theme.cardBackground}; border: 1px solid ${theme.cardBorderColor}; border-radius: 12px; margin-bottom: 8px; overflow: hidden; padding: 12px 16px;">
            <summary style="font-weight: 600; font-size: 14px; color: ${theme.textColor}; cursor: pointer; outline: none; list-style: none; display: flex; justify-content: space-between; align-items: center;">
              <span>${item.question}</span>
              <span style="opacity: 0.6; font-size: 16px;">+</span>
            </summary>
            <div style="margin-top: 10px; font-size: 13px; line-height: 1.5; color: ${theme.textSecondaryColor}; border-top: 1px solid ${theme.cardBorderColor}; padding-top: 10px;">
              ${item.answer}
            </div>
          </details>
        `).join('\n');

        const supportHtml = d.layout === 'support' ? `
          <div style="margin-top: 10px; padding: 12px 16px; border-radius: 12px; background: ${theme.primaryColor}15; border: 1px solid ${theme.primaryColor}40; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
            <div>
              <div style="font-size: 12px; font-weight: 700; color: ${theme.textColor};">Ainda tem alguma dúvida?</div>
              <div style="font-size: 10px; color: ${theme.textSecondaryColor};">Fale agora com nosso suporte</div>
            </div>
            <a href="${d.supportButtonUrl || 'https://wa.me/5511999999999'}" target="_blank" rel="noopener noreferrer" style="${btnBaseStyle}; padding: 6px 12px; font-size: 11px;">
              ${d.supportButtonText || 'Atendimento'} →
            </a>
          </div>
        ` : '';

        return `
        <!-- FAQ Block -->
        <div class="block-item faq-block" style="margin-bottom: 20px;">
          ${d.title ? `<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: ${theme.textColor}; text-align: center;">${d.title}</h3>` : ''}
          ${faqItems}
          ${supportHtml}
        </div>`;
      }

      default:
        return '';
    }
  }).join('\n');

  // Max width
  const widthMap = {
    narrow: '440px',
    medium: '560px',
    wide: '680px',
  };
  const maxWidth = widthMap[theme.pageWidth] || '560px';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Minha Página</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(theme.fontFamily)}:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      ${bgCss}
      color: ${theme.textColor};
      font-family: '${theme.fontFamily}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px 16px 64px;
    }
    .page-container {
      width: 100%;
      max-width: ${maxWidth};
      margin: 0 auto;
    }
    .social-icon-btn:hover {
      transform: translateY(-3px) scale(1.08);
      filter: brightness(1.2);
    }
    .link-btn:hover {
      transform: translateY(-2px);
      filter: brightness(1.08);
    }
    .product-card:hover {
      transform: translateY(-3px);
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    .highlight-pulse {
      animation: pulse 2s infinite ease-in-out;
    }
    @keyframes shimmer {
      0% { filter: brightness(1); }
      50% { filter: brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.4)); }
      100% { filter: brightness(1); }
    }
    .highlight-shimmer {
      animation: shimmer 2s infinite ease-in-out;
    }
    @keyframes wobble {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-1.5deg) scale(1.01); }
      75% { transform: rotate(1.5deg) scale(1.01); }
    }
    .highlight-wobble {
      animation: wobble 2.8s infinite ease-in-out;
    }
    @keyframes glowAura {
      0%, 100% { box-shadow: 0 0 8px rgba(168, 85, 247, 0.4), 0 0 18px rgba(99, 102, 241, 0.2); }
      50% { box-shadow: 0 0 18px rgba(168, 85, 247, 0.8), 0 0 28px rgba(99, 102, 241, 0.5); }
    }
    .highlight-glow {
      animation: glowAura 2.2s infinite alternate ease-in-out;
    }
    input, textarea {
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus, textarea:focus {
      border-color: ${theme.primaryColor} !important;
    }
    details[open] summary span:last-child {
      transform: rotate(45deg);
    }
    footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: ${theme.textSecondaryColor};
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <main class="page-container">
    ${blocksHtml}
  </main>
  <footer>
    <p>Criado com <strong>BioCraft Studio</strong></p>
  </footer>
  <script>
    function handleContactSubmit(event, action, destination) {
      event.preventDefault();
      var form = event.target;
      var name = form.name ? form.name.value : '';
      var email = form.email ? form.email.value : '';
      var phone = form.phone ? form.phone.value : '';
      var message = form.message ? form.message.value : '';
      
      if (action === 'whatsapp') {
        var cleanDest = (destination || '').replace(/[^0-9]/g, '');
        var text = encodeURIComponent('Olá! Mensagem de ' + name + ' (' + email + ' / ' + phone + '): ' + message);
        window.open('https://wa.me/' + cleanDest + '?text=' + text, '_blank');
      } else if (action === 'email') {
        var subject = encodeURIComponent('Contato via página de ' + name);
        var body = encodeURIComponent(message + '\\n\\nContato: ' + name + ' (' + email + ' / ' + phone + ')');
        window.location.href = 'mailto:' + destination + '?subject=' + subject + '&body=' + body;
      } else {
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        form.reset();
      }
    }
  </script>
</body>
</html>`;
};
