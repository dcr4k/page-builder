import { Block, BlockType } from '../types';

export const generateId = () => 'blk_' + Math.random().toString(36).substring(2, 9);

export const createDefaultBlock = (type: BlockType): Block => {
  const id = generateId();
  switch (type) {
    case 'profile':
      return {
        id,
        type: 'profile',
        data: {
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
          avatarShape: 'circle',
          name: 'Seu Nome ou Marca',
          bio: 'Criador de Conteúdo & Empreendedor digital. Compartilhando projetos, ideias e novidades!',
          verified: true,
          layout: 'center',
          tagline: '@seuperfil',
        },
        animation: 'none',
      };

    case 'link':
      return {
        id,
        type: 'link',
        data: {
          title: 'Acesse Meu Site Oficial',
          subtitle: 'Confira todos os meus projetos e artigos recentes',
          url: 'https://seusite.com.br',
          icon: 'globe',
          highlight: false,
          badgeText: '',
          styleOverride: 'default',
        },
        animation: 'none',
      };

    case 'social':
      return {
        id,
        type: 'social',
        data: {
          layoutStyle: 'row',
          iconColor: 'original',
          links: [
            { id: '1', platform: 'instagram', url: 'https://instagram.com', active: true, label: 'Instagram' },
            { id: '2', platform: 'whatsapp', url: 'https://wa.me/5511999999999', active: true, label: 'WhatsApp' },
            { id: '3', platform: 'youtube', url: 'https://youtube.com', active: true, label: 'YouTube' },
            { id: '4', platform: 'tiktok', url: 'https://tiktok.com', active: true, label: 'TikTok' },
            { id: '5', platform: 'linkedin', url: 'https://linkedin.com', active: false, label: 'LinkedIn' },
            { id: '6', platform: 'github', url: 'https://github.com', active: false, label: 'GitHub' },
          ],
        },
        animation: 'none',
      };

    case 'product':
      return {
        id,
        type: 'product',
        data: {
          layout: '1-col',
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
          title: 'Smartwatch Pro Series 9',
          description: 'Design premium em titânio, bateria de 72h e monitoramento avançado.',
          price: 'R$ 289,90',
          originalPrice: 'R$ 449,00',
          badge: 'Mais Vendido 🔥',
          buttonText: 'Garantir com Desconto',
          buttonUrl: 'https://seusite.com.br/produto',
          items: [
            {
              id: 'p1',
              imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
              title: 'Smartwatch Pro Series 9',
              description: 'Design premium em titânio, bateria de 72h e monitoramento avançado.',
              price: 'R$ 289,90',
              originalPrice: 'R$ 449,00',
              badge: 'Mais Vendido 🔥',
              buttonText: 'Garantir com Desconto',
              buttonUrl: 'https://seusite.com.br/produto',
            },
          ],
        },
        animation: 'none',
      };

    case 'contact':
      return {
        id,
        type: 'contact',
        data: {
          title: 'Fale Conosco',
          description: 'Envie uma mensagem e retornaremos em até 24 horas úteis.',
          showName: true,
          showEmail: true,
          showPhone: true,
          showMessage: true,
          buttonText: 'Enviar Mensagem',
          submitAction: 'whatsapp',
          destination: '5511999999999',
        },
        animation: 'none',
      };

    case 'media':
      return {
        id,
        type: 'media',
        data: {
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          caption: 'Visual minimalista em 4K para sua inspiração diária',
          aspectRatio: '16:9',
          linkUrl: '',
          autoplayVideo: true,
        },
        animation: 'none',
      };

    case 'text':
      return {
        id,
        type: 'text',
        data: {
          title: 'Sobre a nossa jornada',
          content: 'Acreditamos no poder do design e da simplicidade para conectar pessoas e marcas extraordinárias pelo mundo.',
          align: 'center',
          style: 'body',
        },
        animation: 'none',
      };

    case 'divider':
      return {
        id,
        type: 'divider',
        data: {
          style: 'gradient',
          spacing: 'md',
        },
        animation: 'none',
      };

    case 'faq':
      return {
        id,
        type: 'faq',
        data: {
          title: 'Perguntas Frequentes',
          items: [
            {
              id: '1',
              question: 'Como funciona o atendimento?',
              answer: 'Nosso atendimento funciona de segunda a sexta, das 09h às 18h via WhatsApp ou e-mail.',
            },
            {
              id: '2',
              question: 'Qual é o prazo de entrega?',
              answer: 'Entregamos para todo o Brasil com prazo médio de 3 a 7 dias úteis com código de rastreamento.',
            },
            {
              id: '3',
              question: 'Posso solicitar reembolso?',
              answer: 'Sim, você tem até 7 dias corridos após o recebimento para solicitar a troca ou reembolso integral.',
            },
          ],
        },
        animation: 'none',
      };
  }
};
