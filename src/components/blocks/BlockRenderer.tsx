import React from 'react';
import { Block, PageTheme } from '../../types';
import { ProfileBlockView } from './ProfileBlockView';
import { LinkBlockView } from './LinkBlockView';
import { SocialBlockView } from './SocialBlockView';
import { ProductBlockView } from './ProductBlockView';
import { ContactBlockView } from './ContactBlockView';
import { MediaBlockView } from './MediaBlockView';
import { TextBlockView } from './TextBlockView';
import { DividerBlockView } from './DividerBlockView';
import { FaqBlockView } from './FaqBlockView';

interface BlockRendererProps {
  block: Block;
  theme: PageTheme;
  isEditor?: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, theme, isEditor = false }) => {
  switch (block.type) {
    case 'profile':
      return <ProfileBlockView data={block.data} theme={theme} />;
    case 'link':
      return <LinkBlockView data={block.data} theme={theme} isEditor={isEditor} />;
    case 'social':
      return <SocialBlockView data={block.data} theme={theme} isEditor={isEditor} />;
    case 'product':
      return <ProductBlockView data={block.data} theme={theme} isEditor={isEditor} />;
    case 'contact':
      return <ContactBlockView data={block.data} theme={theme} isEditor={isEditor} />;
    case 'media':
      return <MediaBlockView data={block.data} theme={theme} />;
    case 'text':
      return <TextBlockView data={block.data} theme={theme} />;
    case 'divider':
      return <DividerBlockView data={block.data} theme={theme} />;
    case 'faq':
      return <FaqBlockView data={block.data} theme={theme} />;
    default:
      return null;
  }
};
