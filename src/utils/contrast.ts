import type { PageTheme } from '../types';

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  category: 'dark' | 'vibrant' | 'light';
}

/**
 * 20 Predefined curated colors for solid background mode
 */
export const PRESET_SOLID_COLORS: ColorPreset[] = [
  // 1-10: Dark / Deep Tones
  { id: 'c1', name: 'Midnight Noir', hex: '#090a0f', category: 'dark' },
  { id: 'c2', name: 'Slate Eclipse', hex: '#0f172a', category: 'dark' },
  { id: 'c3', name: 'Zinc Carbon', hex: '#18181b', category: 'dark' },
  { id: 'c4', name: 'Deep Ocean', hex: '#172554', category: 'dark' },
  { id: 'c5', name: 'Forest Emerald', hex: '#022c22', category: 'dark' },
  { id: 'c6', name: 'Royal Plum', hex: '#2e1065', category: 'dark' },
  { id: 'c7', name: 'Ruby Wine', hex: '#450a0a', category: 'dark' },
  { id: 'c8', name: 'Espresso Night', hex: '#1c1917', category: 'dark' },
  { id: 'c9', name: 'Cyber Indigo', hex: '#1e1b4b', category: 'dark' },
  { id: 'c10', name: 'Dark Teal', hex: '#042f2e', category: 'dark' },

  // 11-15: Vibrant Accent Tones
  { id: 'c11', name: 'Electric Purple', hex: '#6366f1', category: 'vibrant' },
  { id: 'c12', name: 'Azure Blue', hex: '#0284c7', category: 'vibrant' },
  { id: 'c13', name: 'Jade Green', hex: '#059669', category: 'vibrant' },
  { id: 'c14', name: 'Sunset Terracotta', hex: '#ea580c', category: 'vibrant' },
  { id: 'c15', name: 'Neon Rose', hex: '#db2777', category: 'vibrant' },

  // 16-20: Clean / Light Tones
  { id: 'c16', name: 'Chalk White', hex: '#ffffff', category: 'light' },
  { id: 'c17', name: 'Soft Alabaster', hex: '#f8fafc', category: 'light' },
  { id: 'c18', name: 'Warm Cream', hex: '#fef3c7', category: 'light' },
  { id: 'c19', name: 'Pastel Sage', hex: '#f0fdf4', category: 'light' },
  { id: 'c20', name: 'Rose Silk', hex: '#fdf2f8', category: 'light' },
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

