export type BlockType = 
  | 'profile'
  | 'link'
  | 'social'
  | 'product'
  | 'contact'
  | 'media'
  | 'text'
  | 'divider'
  | 'faq';

export type BackgroundType = 'color' | 'gradient' | 'image' | 'video';

export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ButtonStyle = 'filled' | 'outline' | 'glass' | 'shadow3d' | 'soft';
export type ButtonShadow = 'none' | 'sm' | 'md' | 'lg' | 'glow';

export interface PageTheme {
  backgroundType: BackgroundType;
  backgroundColor: string;
  gradient: {
    from: string;
    to: string;
    via?: string;
    direction: string;
  };
  backgroundImage: string;
  backgroundVideo: string;
  backgroundOverlayOpacity: number;
  backgroundBlur: number;
  
  fontFamily: string;
  primaryColor: string;
  primaryTextColor: string;
  textColor: string;
  textSecondaryColor: string;
  cardBackground: string;
  cardBorderColor: string;
  
  buttonRadius: ButtonRadius;
  buttonStyle: ButtonStyle;
  buttonShadow: ButtonShadow;
  
  pageWidth: 'narrow' | 'medium' | 'wide';
}

export interface SocialLinkItem {
  id: string;
  platform: 'instagram' | 'whatsapp' | 'youtube' | 'tiktok' | 'linkedin' | 'twitter' | 'github' | 'spotify' | 'facebook' | 'email' | 'website';
  url: string;
  label?: string;
  active: boolean;
}

export interface ProfileBlockData {
  avatarUrl: string;
  avatarShape: 'circle' | 'rounded' | 'square';
  name: string;
  bio: string;
  verified: boolean;
  layout: 'center' | 'left' | 'badge' | 'hero-cover' | 'card';
  tagline?: string;
  coverUrl?: string;
  badges?: string[];
  nameColor?: string;
  bioColorChoice?: 'white' | 'gray' | 'black';
  bioColor?: string;
}

export type LinkHighlightEffect = 'none' | 'pulse' | 'shimmer' | 'wobble' | 'glow';

export interface LinkBlockData {
  title: string;
  subtitle?: string;
  url: string;
  icon?: string;
  highlight: boolean;
  highlightEffect?: LinkHighlightEffect;
  badgeText?: string;
  styleOverride?: 'default' | 'primary' | 'outline' | 'glass';
  customBgColor?: string;
  customTextColor?: string;
  customBorderColor?: string;
  layout?: 'classic' | 'card-thumb' | 'duo' | 'featured';
  imageUrl?: string;
  secondaryTitle?: string;
  secondaryUrl?: string;
  secondaryStyleOverride?: 'default' | 'primary' | 'outline' | 'glass';
  secondaryCustomBgColor?: string;
  secondaryCustomTextColor?: string;
  secondaryCustomBorderColor?: string;
}

export interface SocialBlockData {
  links: SocialLinkItem[];
  layoutStyle: 'row' | 'grid' | 'pills' | 'dock';
  iconColor: 'original' | 'mono-light' | 'mono-dark' | 'brand';
}

export interface ProductItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  buttonText: string;
  buttonUrl: string;
}

export interface ProductBlockData {
  layout?: '1-col' | '2-col' | '3-col';
  items?: ProductItem[];
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  buttonText: string;
  buttonUrl: string;
}

export interface ContactBlockData {
  title: string;
  description: string;
  showName: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showMessage: boolean;
  buttonText: string;
  submitAction: 'message' | 'email' | 'whatsapp';
  destination: string;
  layout?: 'full-form' | 'whatsapp-direct' | 'inline-newsletter';
  agentAvatar?: string;
  agentStatus?: string;
}

export interface MediaBlockData {
  mediaType: 'image' | 'video';
  mediaUrl: string;
  caption?: string;
  aspectRatio: '16:9' | '1:1' | '4:5' | 'wide';
  linkUrl?: string;
  autoplayVideo?: boolean;
  layout?: 'single' | 'duo-gallery' | 'polaroid' | 'video';
  secondaryMediaUrl?: string;
  secondaryCaption?: string;
}

export interface TextBlockData {
  title?: string;
  content: string;
  align: 'left' | 'center' | 'right';
  style: 'heading' | 'quote' | 'callout' | 'body' | 'checklist';
  quoteAuthor?: string;
  quoteRole?: string;
  bulletItems?: string[];
}

export interface DividerBlockData {
  style: 'solid' | 'dashed' | 'dots' | 'gradient' | 'space' | 'badge';
  spacing: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  badgeText?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqBlockData {
  items: FaqItem[];
  title?: string;
  layout?: 'accordion' | 'cards' | 'support';
  supportButtonText?: string;
  supportButtonUrl?: string;
}

export interface BaseBlock {
  id: string;
  animation?: 'none' | 'pulse' | 'bounce' | 'fade-in';
  customPadding?: 'compact' | 'normal' | 'spacious';
}

export type Block =
  | (BaseBlock & { type: 'profile'; data: ProfileBlockData })
  | (BaseBlock & { type: 'link'; data: LinkBlockData })
  | (BaseBlock & { type: 'social'; data: SocialBlockData })
  | (BaseBlock & { type: 'product'; data: ProductBlockData })
  | (BaseBlock & { type: 'contact'; data: ContactBlockData })
  | (BaseBlock & { type: 'media'; data: MediaBlockData })
  | (BaseBlock & { type: 'text'; data: TextBlockData })
  | (BaseBlock & { type: 'divider'; data: DividerBlockData })
  | (BaseBlock & { type: 'faq'; data: FaqBlockData });

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  theme: PageTheme;
  blocks: Block[];
}

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';
export type AppView = 'picker' | 'editor' | 'preview';
