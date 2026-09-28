import type { PageTheme } from '../types';

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  category: 'dark' | 'vibrant' | 'light';
  gradient: {
    from: string;
    to: string;
  };
}

/**
 * 22 Cores Curadas da Nova Biblioteca (com Gradiente Natural e Cor Sólida)
 * Organizadas exatamente nas 2 linhas de 11 cores do rascunho do usuário
 */
export const PRESET_SOLID_COLORS: ColorPreset[] = [
  // Linha 1: 11 Tons Principais
  { id: 'c1', name: 'Preto Profundo', hex: '#090a0f', category: 'dark', gradient: { from: '#181b22', to: '#090a0f' } },
  { id: 'c2', name: 'Cinza Grafite', hex: '#3f3f46', category: 'dark', gradient: { from: '#52525b', to: '#27272a' } },
  { id: 'c3', name: 'Rubi Intenso', hex: '#b91c1c', category: 'dark', gradient: { from: '#dc2626', to: '#7f1d1d' } },
  { id: 'c4', name: 'Vermelho Vivo', hex: '#dc2626', category: 'vibrant', gradient: { from: '#ef4444', to: '#991b1b' } },
  { id: 'c5', name: 'Laranja Tangerina', hex: '#ea580c', category: 'vibrant', gradient: { from: '#f97316', to: '#9a3412' } },
  { id: 'c6', name: 'Amarelo Ouro', hex: '#eab308', category: 'vibrant', gradient: { from: '#facc15', to: '#a16207' } },
  { id: 'c7', name: 'Verde Lima', hex: '#65a30d', category: 'vibrant', gradient: { from: '#84cc16', to: '#3f6212' } },
  { id: 'c8', name: 'Verde Esmeralda', hex: '#059669', category: 'vibrant', gradient: { from: '#10b981', to: '#064e3b' } },
  { id: 'c9', name: 'Azul Ciano', hex: '#0284c7', category: 'vibrant', gradient: { from: '#0ea5e9', to: '#0369a1' } },
  { id: 'c10', name: 'Azul Royal', hex: '#2563eb', category: 'vibrant', gradient: { from: '#3b82f6', to: '#1e3a8a' } },
  { id: 'c11', name: 'Roxo Vibrante', hex: '#9333ea', category: 'vibrant', gradient: { from: '#a855f7', to: '#581c87' } },

  // Linha 2: 11 Tons Claros, Pastéis e Contraste
  { id: 'c12', name: 'Branco Puro', hex: '#ffffff', category: 'light', gradient: { from: '#ffffff', to: '#f1f5f9' } },
  { id: 'c13', name: 'Prata Suave', hex: '#cbd5e1', category: 'light', gradient: { from: '#e2e8f0', to: '#94a3b8' } },
  { id: 'c14', name: 'Bronze Terracota', hex: '#9a3412', category: 'dark', gradient: { from: '#c2410c', to: '#7c2d12' } },
  { id: 'c15', name: 'Rosa Magenta', hex: '#db2777', category: 'vibrant', gradient: { from: '#ec4899', to: '#9d174d' } },
  { id: 'c16', name: 'Salmão Coral', hex: '#f97316', category: 'vibrant', gradient: { from: '#fb923c', to: '#c2410c' } },
  { id: 'c17', name: 'Amarelo Suave', hex: '#fde047', category: 'light', gradient: { from: '#fef08a', to: '#eab308' } },
  { id: 'c18', name: 'Creme Baunilha', hex: '#fef3c7', category: 'light', gradient: { from: '#fffbeb', to: '#fde68a' } },
  { id: 'c19', name: 'Menta Pastel', hex: '#a7f3d0', category: 'light', gradient: { from: '#d1fae5', to: '#6ee7b7' } },
  { id: 'c20', name: 'Azul Celeste', hex: '#bae6fd', category: 'light', gradient: { from: '#e0f2fe', to: '#7dd3fc' } },
  { id: 'c21', name: 'Lilás Pastel', hex: '#ddd6fe', category: 'light', gradient: { from: '#ede9fe', to: '#c084fc' } },
  { id: 'c22', name: 'Azul Noturno', hex: '#1e1b4b', category: 'dark', gradient: { from: '#312e81', to: '#0f172a' } },
];

/**
 * Calculates relative luminance of a HEX or RGB color
 */
export const getLuminance = (color: string): number => {
  if (!color) return 0;

  let r = 0, g = 0, b = 0;

  // Handle Hex
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    const num = parseInt(hex, 16);
    r = (num >> 16) & 255;
    g = (num >> 8) & 255;
    b = num & 255;
  } else if (color.startsWith('rgb')) {
    const match = color.match(/\(([^)]+)\)/);
    if (match) {
      const parts = match[1].split(',').map((p) => parseFloat(p.trim()));
      r = parts[0] || 0;
      g = parts[1] || 0;
      b = parts[2] || 0;
    }
  }

  // Linearize RGB
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Determines whether a color is considered light
 */
export const isLightColor = (color: string): boolean => {
  return getLuminance(color) > 0.45;
};

/**
 * Automatically adjusts typography and card colors based on the chosen background
 * to prevent unreadable, low-contrast text bugs.
 */
export const getAutoContrastTheme = (
  theme: PageTheme,
  newBgColor?: string,
  newGradient?: { from: string; to: string; direction?: string }
): PageTheme => {
  let isLight = false;

  if (newGradient || (theme.backgroundType === 'gradient' && !newBgColor)) {
    const from = newGradient?.from || theme.gradient.from;
    const to = newGradient?.to || theme.gradient.to;
    const avgLum = (getLuminance(from) + getLuminance(to)) / 2;
    isLight = avgLum > 0.45;
  } else {
    const targetBg = newBgColor || theme.backgroundColor;
    isLight = isLightColor(targetBg);
  }

  const updatedTheme: PageTheme = {
    ...theme,
    ...(newBgColor ? { backgroundColor: newBgColor } : {}),
    ...(newGradient ? { gradient: { ...theme.gradient, ...newGradient } } : {}),
  };

  if (isLight) {
    // Light background mode: Deep contrast dark text and clean light cards
    return {
      ...updatedTheme,
      textColor: '#0f172a',
      textSecondaryColor: '#475569',
      cardBackground: 'rgba(255, 255, 255, 0.85)',
      cardBorderColor: 'rgba(226, 232, 240, 0.9)',
      // Ensure primary button has contrast against light background
      primaryColor: isLightColor(theme.primaryColor) ? '#0f172a' : theme.primaryColor,
      primaryTextColor: isLightColor(theme.primaryColor) ? '#ffffff' : theme.primaryTextColor || '#ffffff',
    };
  } else {
    // Dark background mode: Bright white typography and translucent cards
    return {
      ...updatedTheme,
      textColor: '#ffffff',
      textSecondaryColor: '#94a3b8',
      cardBackground: 'rgba(255, 255, 255, 0.05)',
      cardBorderColor: 'rgba(255, 255, 255, 0.12)',
      // Ensure primary button has contrast against dark background
      primaryColor: !isLightColor(theme.primaryColor) && getLuminance(theme.primaryColor) < 0.12 ? '#6366f1' : theme.primaryColor,
      primaryTextColor: '#ffffff',
    };
  }
};
