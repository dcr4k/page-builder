import React, { useState } from 'react';
import {
  User,
  Link as LinkIcon,
  Share2,
  ShoppingBag,
  Mail,
  Image as ImageIcon,
  Type,
  Minus,
  HelpCircle,
  Search,
  Plus,
  ChevronDown,
  Sparkles,
  Quote,
  CheckCircle2,
  AlertCircle,
  Columns,
  Square,
  LayoutGrid,
  Play,
  MessageCircle,
} from 'lucide-react';
import type { BlockType } from '../../types';
import { WhatsAppIcon } from '../common/SocialIcons';

interface MobileAddBlockSheetProps {
  onAddBlock: (type: BlockType, customData?: Record<string, any>) => void;
}

interface BlockSubOption {
  id: string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  visualType?:
    | '1-col'
    | '2-col'
    | '3-col'
    | 'thumb'
    | 'duo-btn'
    | 'featured'
    | 'hero-cover'
    | 'card-profile'
    | 'badge-profile'
    | 'grid-social'
    | 'pills-social'
    | 'dock-social'
    | 'row-social'
    | 'whatsapp'
    | 'newsletter'
    | 'full-form'
    | 'banner'
    | 'polaroid'
    | 'duo-gallery'
    | 'video'
    | 'quote'
    | 'callout'
    | 'checklist'
    | 'heading'
    | 'accordion'
    | 'cards-faq'
    | 'support-faq'
    | 'badge-divider'
    | 'dots-divider'
    | 'gradient-divider'
    | 'space-divider';
  customData?: Record<string, any>;
}

interface BlockCategory {
  type: BlockType;
  title: string;
  categoryLabel: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  subOptions: BlockSubOption[];
}

const CATEGORIES: BlockCategory[] = [
  // 1. PRODUTO / CATÁLOGO
  {
    type: 'product',
    title: 'Produto / Catálogo',
    categoryLabel: 'Vendas',
    description: 'Vitrines para infoprodutos, e-commerce, roupas e catálogos.',
    icon: ShoppingBag,
    badge: 'Vendas 🔥',
    subOptions: [
      {
        id: 'product-1-col',
        title: '1 Produto por Linha (Card Destaque)',
        description: 'Card amplo com foto grande, descrição detalhada, preço riscado e botão de compra.',
        badge: '1 por linha',
        visualType: '1-col',
        customData: {
          layout: '1-col',
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
              buttonUrl: 'https://wa.me/5511999999999',
            },
          ],
        },
      },
      {
        id: 'product-2-col',
        title: '2 Produtos por Linha (Vitrine Duo)',
        description: 'Grade moderna com 2 produtos lado a lado, foto, preço e botão de compra rápido.',
        badge: '2 por linha',
        visualType: '2-col',
        customData: {
          layout: '2-col',
          items: [
            {
              id: 'p1',
              imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
              title: 'Smartwatch Pro Series 9',
              price: 'R$ 289,90',
              originalPrice: 'R$ 449,00',
              badge: 'Destaque 🔥',
              buttonText: 'Comprar',
              buttonUrl: 'https://wa.me/5511999999999',
            },
            {
              id: 'p2',
              imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
              title: 'Fone Noise Cancelling',
              price: 'R$ 349,90',
              originalPrice: 'R$ 499,00',
              badge: 'Novo',
              buttonText: 'Comprar',
              buttonUrl: 'https://wa.me/5511999999999',
            },
          ],
        },
      },
      {
        id: 'product-3-col',
        title: '3 Produtos por Linha (Grade Compacta)',
        description: 'Grade com 3 colunas compactas lado a lado, ideal para catálogos com muitos produtos ou roupas.',
        badge: '3 por linha',
        visualType: '3-col',
        customData: {
          layout: '3-col',
          items: [
            {
              id: 'p1',
              imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
              title: 'Tênis Runner Speed',
              price: 'R$ 199,90',
              badge: 'Oferta',
              buttonText: 'Ver',
              buttonUrl: 'https://wa.me/5511999999999',
            },
            {
              id: 'p2',
              imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
              title: 'Smartwatch Ultra',
              price: 'R$ 289,90',
              badge: 'Top',
              buttonText: 'Ver',
              buttonUrl: 'https://wa.me/5511999999999',
            },
            {
              id: 'p3',
              imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
              title: 'Fone Bluetooth Pro',
              price: 'R$ 149,90',
              badge: 'Frete Grátis',
              buttonText: 'Ver',
              buttonUrl: 'https://wa.me/5511999999999',
            },
          ],
        },
      },
    ],
  },

  // 2. BOTÃO DE LINK
  {
    type: 'link',
    title: 'Botão de Link',
    categoryLabel: 'Conversão',
    description: 'Botões clicáveis para direcionar visitantes com múltiplos estilos de apresentação.',
    icon: LinkIcon,
    badge: 'Popular',
    subOptions: [
      {
        id: 'link-thumb',
        title: 'Card com Miniatura (Thumbnail à Esquerda)',
        description: 'Foto à esquerda, título em negrito, subtítulo e seta. Estilo vitrine de artigos e produtos.',
        badge: 'Estilo Vitrine',
        visualType: 'thumb',
        customData: {
          layout: 'card-thumb',
          title: 'Último Artigo / Vídeo Publicado',
          subtitle: 'Confira os bastidores e aprendizados recentes',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
          badgeText: 'Novo',
        },
      },
      {
        id: 'link-duo',
        title: 'Duo de Links (2 Botões Lado a Lado)',
        description: 'Dois botões compactos na mesma linha para opções complementares (ex: Site e Catálogo).',
        badge: '2 Botões',
        visualType: 'duo-btn',
        customData: {
          layout: 'duo',
          title: 'Site Oficial',
          secondaryTitle: 'Catálogo PDF',
          url: 'https://seusite.com.br',
          secondaryUrl: 'https://seusite.com.br/catalogo',
          icon: 'globe',
        },
      },
      {
        id: 'link-featured',
        title: 'Link Destaque com Efeito Pulsar / Glow',
        description: 'Botão com cor especial, badge animado "EXCLUSIVO 🔥" e efeito pulsar para conversão.',
        badge: 'Conversão Máxima 🔥',
        visualType: 'featured',
        customData: {
          layout: 'featured',
          title: 'Garantir Vaga no Treinamento',
          subtitle: 'Desconto de 40% válido apenas hoje',
          styleOverride: 'primary',
          highlight: true,
          highlightEffect: 'pulse',
          badgeText: 'EXCLUSIVO 🔥',
        },
      },
      {
        id: 'link-classic',
        title: 'Link Clássico Centralizado',
        description: 'Botão direto e elegante com ícone, título centralizado e subtítulo auxiliar.',
        badge: 'Clássico',
        visualType: '1-col',
        customData: {
          layout: 'classic',
          title: 'Acesse Meu Site Oficial',
          subtitle: 'Confira todos os meus projetos e artigos recentes',
          styleOverride: 'default',
          highlight: false,
          icon: 'globe',
        },
      },
    ],
  },

  // 3. PERFIL & IDENTIDADE
  {
    type: 'profile',
    title: 'Perfil & Identidade',
    categoryLabel: 'Identidade',
    description: 'Formatos visuais para apresentação pessoal, criador ou marca.',
    icon: User,
    badge: 'Essencial',
    subOptions: [
      {
        id: 'profile-hero-cover',
        title: 'Perfil Hero com Banner de Capa',
        description: 'Banner panorâmico no topo com avatar sobreposto, estilo cabeçalho do Twitter/LinkedIn.',
        badge: 'Banner Hero',
        visualType: 'hero-cover',
        customData: {
          layout: 'hero-cover',
          name: 'Seu Nome ou Marca',
          tagline: '@seuperfil • Criador de Conteúdo',
          bio: 'Compartilhando as melhores dicas, projetos e novidades sobre o mercado digital.',
          verified: true,
          coverUrl: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&auto=format&fit=crop&q=80',
        },
      },
      {
        id: 'profile-card-horizontal',
        title: 'Perfil Cartão Horizontal (Left Aligned)',
        description: 'Avatar à esquerda com nome, selo e descrição ao lado em formato de cartão executivo.',
        badge: 'Corporativo',
        visualType: 'card-profile',
        customData: {
          layout: 'card',
          avatarShape: 'rounded',
          name: 'Empresa ou Negócio',
          tagline: 'Soluções Digitais & Consultoria',
          bio: 'Ajudamos empresas a crescerem na internet com autoridade e presença.',
          verified: true,
        },
      },
      {
        id: 'profile-badges-authority',
        title: 'Perfil com Etiquetas de Autoridade',
        description: 'Avatar com borda gradiente e tags/chips de conquistas abaixo do nome.',
        badge: 'Autoridade ⭐',
        visualType: 'badge-profile',
        customData: {
          layout: 'badge',
          name: 'Especialista Verificado',
          tagline: 'Mentor de Carreira & Negócios',
          bio: 'Mais de 10 anos transformando resultados de profissionais em todo o país.',
          verified: true,
          badges: ['⭐ 5.0 (500+ avaliações)', '🏆 Criador Oficial', '🚀 +10k Alunos'],
        },
      },
      {
        id: 'profile-classic-center',
        title: 'Perfil Centralizado Clássico',
        description: 'Avatar circular grande centralizado, selo azul de verificado e biografia limpa.',
        badge: 'Clássico',
        visualType: '1-col',
        customData: {
          layout: 'center',
          avatarShape: 'circle',
          name: 'Seu Nome ou Marca',
          tagline: '@seuperfil',
          bio: 'Criador de Conteúdo & Empreendedor digital.',
          verified: true,
        },
      },
    ],
  },

  // 4. REDES SOCIAIS
  {
    type: 'social',
    title: 'Redes Sociais',
    categoryLabel: 'Conexões',
    description: 'Canais de comunicação e perfis com layouts horizontais, em grade ou pílulas.',
    icon: Share2,
    subOptions: [
      {
        id: 'social-grid-cards',
        title: 'Grade de Redes com Nomes (Grid 2 colunas)',
        description: 'Cards individuais em grade com logo oficial, nome da rede e indicação "Seguir".',
        badge: 'Grade de Cards',
        visualType: 'grid-social',
        customData: {
          layoutStyle: 'grid',
        },
      },
      {
        id: 'social-pills-full',
        title: 'Barras / Pílulas Expandidas (Full Width)',
        description: 'Botões horizontais largos com logo e chamada direta (ex: "Acessar Instagram").',
        badge: 'Pílulas Largas',
        visualType: 'pills-social',
        customData: {
          layoutStyle: 'pills',
        },
      },
      {
        id: 'social-dock-glass',
        title: 'Dock Flutuante Glassmorphism',
        description: 'Cápsula translúcida com efeito de vidro fosco para uma navegação moderna.',
        badge: 'Estilo Vidro ✨',
        visualType: 'dock-social',
        customData: {
          layoutStyle: 'dock',
        },
      },
      {
        id: 'social-row-classic',
        title: 'Linha Clássica de Círculos',
        description: 'Ícones circulares alinhados horizontalmente com as cores originais.',
        badge: 'Ícones em Linha',
        visualType: 'row-social',
        customData: {
          layoutStyle: 'row',
        },
      },
    ],
  },

  // 5. FORMULÁRIO DE CONTATO
  {
    type: 'contact',
    title: 'Formulário de Contato',
    categoryLabel: 'Leads',
    description: 'Captação de leads direta com foco em WhatsApp, newsletter ou formulário completo.',
    icon: Mail,
    subOptions: [
      {
        id: 'contact-whatsapp-direct',
        title: 'Card Direto de WhatsApp (Atendente Online)',
        description: 'Avatar com selo "Online agora", chamada direta e botão grande para abrir conversa.',
        badge: 'Conversão Rápida 💬',
        visualType: 'whatsapp',
        customData: {
          layout: 'whatsapp-direct',
          title: 'Falar Diretamente Comigo',
          description: 'Tire dúvidas ou solicite um orçamento rápido pelo WhatsApp.',
          buttonText: 'Iniciar Conversa no WhatsApp',
          submitAction: 'whatsapp',
          destination: '5511999999999',
          agentStatus: 'Online agora no WhatsApp',
        },
      },
      {
        id: 'contact-newsletter-inline',
        title: 'Caixa de Captura Rápida (Newsletter)',
        description: 'Caixa compacta moderna com campo de e-mail e botão inline para lista VIP.',
        badge: 'Captura de E-mail',
        visualType: 'newsletter',
        customData: {
          layout: 'inline-newsletter',
          title: 'Receba Novidades & Cupons Exclusivos',
          description: 'Cadastre seu e-mail e receba nossas melhores ofertas em primeira mão.',
          buttonText: 'Cadastrar',
          submitAction: 'email',
          destination: 'contato@seusite.com.br',
        },
      },
      {
        id: 'contact-full-lead',
        title: 'Formulário Completo de Orçamento',
        description: 'Campos para nome, e-mail, telefone e mensagem para orçamentos estruturados.',
        badge: 'Formulário Completo',
        visualType: 'full-form',
        customData: {
          layout: 'full-form',
          title: 'Solicite um Orçamento',
          description: 'Preencha o formulário e responderemos em até 24 horas.',
          showName: true,
          showEmail: true,
          showPhone: true,
          showMessage: true,
          buttonText: 'Enviar Solicitação',
          submitAction: 'whatsapp',
          destination: '5511999999999',
        },
      },
    ],
  },

  // 6. MÍDIA / IMAGEM / VÍDEO
  {
    type: 'media',
    title: 'Mídia / Imagem / Vídeo',
    categoryLabel: 'Mídia',
    description: 'Apresentação visual com fotos em moldura, galerias duplas ou banners.',
    icon: ImageIcon,
    subOptions: [
      {
        id: 'media-polaroid-frame',
        title: 'Card Polaroid com Moldura e Legenda',
        description: 'Foto com moldura branca clássica e legenda em fonte manuscrita, estilo foto revelada.',
        badge: 'Estilo Polaroid',
        visualType: 'polaroid',
        customData: {
          layout: 'polaroid',
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          caption: 'Momentos especiais & bastidores ✨',
        },
      },
      {
        id: 'media-duo-gallery',
        title: 'Galeria Duo (2 Fotos Lado a Lado)',
        description: 'Duas imagens quadradas lado a lado para comparativo antes/depois ou catálogo duplo.',
        badge: '2 Fotos Lado a Lado',
        visualType: 'duo-gallery',
        customData: {
          layout: 'duo-gallery',
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
          caption: 'Modelo Preto',
          secondaryMediaUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
          secondaryCaption: 'Modelo Prata',
        },
      },
      {
        id: 'media-banner-wide',
        title: 'Banner Panorâmico Widescreen (16:9)',
        description: 'Imagem ampla de alta definição com cantos arredondados para impacto visual.',
        badge: '16:9 Widescreen',
        visualType: 'banner',
        customData: {
          layout: 'single',
          mediaType: 'image',
          aspectRatio: '16:9',
          mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          caption: 'Nova Coleção 2026',
        },
      },
      {
        id: 'media-youtube-video',
        title: 'Vídeo Incorporado (YouTube Player)',
        description: 'Player de vídeo incorporado que pode ser assistido diretamente na sua mini página.',
        badge: 'YouTube Vídeo',
        visualType: 'video',
        customData: {
          layout: 'video',
          mediaType: 'video',
          aspectRatio: '16:9',
          mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          caption: 'Assista ao vídeo explicativo',
        },
      },
    ],
  },

  // 7. TEXTO / CITAÇÃO
  {
    type: 'text',
    title: 'Texto / Citação',
    categoryLabel: 'Conteúdo',
    description: 'Formatos para mensagens editoriais, depoimentos com aspas ou caixas de avisos.',
    icon: Type,
    subOptions: [
      {
        id: 'text-quote-card',
        title: 'Card de Citação / Depoimento (Aspas)',
        description: 'Aspas estilizadas em destaque, texto em itálico com autor e cargo.',
        badge: 'Depoimento / Citação',
        visualType: 'quote',
        customData: {
          style: 'quote',
          content: 'Trabalhar com esta equipe foi a melhor decisão que tomamos para a nossa marca este ano.',
          quoteAuthor: 'Mariana Souza',
          quoteRole: 'CEO na InovaTech',
        },
      },
      {
        id: 'text-callout-alert',
        title: 'Caixa de Aviso / Comunicado (Callout)',
        description: 'Card com borda colorida e ícone de aviso para recados urgentes ou notícias.',
        badge: 'Aviso Importante',
        visualType: 'callout',
        customData: {
          style: 'callout',
          title: 'Aviso Importante sobre Entregas',
          content: 'Devido ao grande volume de pedidos, o prazo para envio nesta semana é de até 48h úteis.',
        },
      },
      {
        id: 'text-checklist-benefits',
        title: 'Lista de Benefícios com Checkmarks (Tópicos)',
        description: 'Lista estruturada com ícones verdes de confirmação para vantagens e diferenciais.',
        badge: 'Lista de Tópicos',
        visualType: 'checklist',
        customData: {
          style: 'checklist',
          title: 'O que você vai receber:',
          bulletItems: [
            'Acesso imediato e vitalício à plataforma',
            'Suporte prioritário direto pelo WhatsApp',
            'Garantia incondicional de 7 dias ou seu dinheiro de volta',
            'Certificado de conclusão emitido automaticamente',
          ],
        },
      },
      {
        id: 'text-heading-editorial',
        title: 'Título & Parágrafo Editorial',
        description: 'Cabeçalho marcante com texto fluido para explicar sua história ou proposta.',
        badge: 'Editorial',
        visualType: 'heading',
        customData: {
          style: 'heading',
          title: 'Sobre Nossa Proposta',
          content: 'Desenvolvemos soluções simples e elegantes para que você possa focar no que realmente importa.',
          align: 'left',
        },
      },
    ],
  },

  // 8. PERGUNTAS FREQUENTES (FAQ)
  {
    type: 'faq',
    title: 'Perguntas Frequentes (FAQ)',
    categoryLabel: 'Suporte',
    description: 'Formatos para tirar dúvidas, com suporte em acordeão, cards abertos ou botão de WhatsApp.',
    icon: HelpCircle,
    subOptions: [
      {
        id: 'faq-support-banner',
        title: 'FAQ com Banner de Suporte no Rodapé',
        description: 'Perguntas frequentes em acordeão com caixa de suporte chamando para o WhatsApp.',
        badge: 'FAQ + Suporte',
        visualType: 'support-faq',
        customData: {
          layout: 'support',
          title: 'Dúvidas Frequentes',
          supportButtonText: 'Falar no WhatsApp',
          supportButtonUrl: 'https://wa.me/5511999999999',
          items: [
            {
              id: '1',
              question: 'Como funciona o envio dos pedidos?',
              answer: 'Enviamos para todo o Brasil com código de rastreamento enviado por e-mail e WhatsApp em até 24 horas.',
            },
            {
              id: '2',
              question: 'Quais são as formas de pagamento aceitas?',
              answer: 'Aceitamos PIX com aprovação imediata, cartão de crédito em até 12x e boleto bancário.',
            },
          ],
        },
      },
      {
        id: 'faq-open-cards',
        title: 'Cartões de Dúvidas Abertos (Perguntas Visíveis)',
        description: 'Cards individuais onde as respostas já ficam visíveis sem precisar clicar.',
        badge: 'Cards Abertos',
        visualType: 'cards-faq',
        customData: {
          layout: 'cards',
          title: 'Informações Essenciais',
          items: [
            {
              id: '1',
              question: 'Qual é o prazo de entrega?',
              answer: 'O prazo varia entre 2 a 7 dias úteis dependendo da sua região.',
            },
            {
              id: '2',
              question: 'Possui garantia de satisfação?',
              answer: 'Sim, você tem 7 dias de garantia incondicional ou devolvemos 100% do seu dinheiro.',
            },
          ],
        },
      },
      {
        id: 'faq-accordion-classic',
        title: 'Acordeão Clássico Expansível',
        description: 'Lista tradicional com perguntas em destaque que abrem e fecham suavemente ao toque.',
        badge: 'Acordeão',
        visualType: 'accordion',
        customData: {
          layout: 'accordion',
          title: 'Dúvidas Frequentes',
          items: [
            {
              id: '1',
              question: 'Como posso acompanhar o meu pedido?',
              answer: 'Você receberá o link de rastreio por e-mail e WhatsApp assim que o produto for postado.',
            },
            {
              id: '2',
              question: 'O suporte funciona aos finais de semana?',
              answer: 'Sim, nosso atendimento por WhatsApp responde todos os dias das 08h às 20h.',
            },
            {
              id: '3',
              question: 'Posso solicitar troca se não servir?',
              answer: 'Sim! A primeira troca é 100% gratuita por nossa conta em até 30 dias após o recebimento.',
            },
          ],
        },
      },
    ],
  },

  // 9. DIVISOR / ESPAÇO
  {
    type: 'divider',
    title: 'Divisor / Espaço',
    categoryLabel: 'Layout',
    description: 'Separadores com texto central, pontos luminosos, gradientes neon ou respiro em branco.',
    icon: Minus,
    subOptions: [
      {
        id: 'divider-badge-chip',
        title: 'Divisor com Selo / Texto Central',
        description: 'Linha dividida com chip decorativo no centro (ex: "✦ NOVIDADES ✦").',
        badge: 'Com Selo Central',
        visualType: 'badge-divider',
        customData: {
          style: 'badge',
          badgeText: '✦ DESTAQUES ✦',
          spacing: 'md',
        },
      },
      {
        id: 'divider-dots-glow',
        title: 'Três Pontos Decorativos (Dots)',
        description: 'Separador minimalista moderno com 3 esferas sutis alinhadas.',
        badge: 'Pontos Sutis',
        visualType: 'dots-divider',
        customData: {
          style: 'dots',
          spacing: 'md',
        },
      },
      {
        id: 'divider-gradient-neon',
        title: 'Linha Neon em Gradiente',
        description: 'Traço com efeito de degradê suave luminoso que se dissipa nas extremidades.',
        badge: 'Gradiente Neon',
        visualType: 'gradient-divider',
        customData: {
          style: 'gradient',
          spacing: 'md',
        },
      },
      {
        id: 'divider-space-gap',
        title: 'Espaçador Invisível (Respiro de Layout)',
        description: 'Margem em branco transparente para dar respiração e harmonia entre seções.',
        badge: 'Espaçador',
        visualType: 'space-divider',
        customData: {
          style: 'space',
          spacing: 'lg',
        },
      },
    ],
  },
];

export const MobileAddBlockSheet: React.FC<MobileAddBlockSheetProps> = ({ onAddBlock }) => {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<BlockType>>(
    new Set<BlockType>(['product'])
  );

  const toggleCategory = (type: BlockType) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedCategories(new Set<BlockType>(CATEGORIES.map((c) => c.type)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set<BlockType>());
  };

  // Filter categories and options based on search query
  const query = search.trim().toLowerCase();
  const filteredCategories = CATEGORIES.filter((category) => {
    if (!query) return true;
    const matchCategory =
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query) ||
      category.categoryLabel.toLowerCase().includes(query);
    const matchSubOptions = category.subOptions.some(
      (opt) =>
        opt.title.toLowerCase().includes(query) ||
        opt.description.toLowerCase().includes(query) ||
        (opt.badge && opt.badge.toLowerCase().includes(query))
    );
    return matchCategory || matchSubOptions;
  });

  const renderVisualBadge = (type?: BlockSubOption['visualType']) => {
    switch (type) {
      // Products
      case '3-col':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center gap-0.5 p-1 flex-shrink-0" title="3 produtos por linha">
            <div className="w-2 h-5 bg-brand-400 rounded-xs" />
            <div className="w-2 h-5 bg-brand-400 rounded-xs" />
            <div className="w-2 h-5 bg-brand-400 rounded-xs" />
          </div>
        );
      case '2-col':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center gap-1 p-1 flex-shrink-0" title="2 produtos por linha">
            <div className="w-3.5 h-5 bg-brand-400 rounded-xs" />
            <div className="w-3.5 h-5 bg-brand-400 rounded-xs" />
          </div>
        );
      case '1-col':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center p-1.5 flex-shrink-0" title="1 produto por linha">
            <div className="w-7 h-5 bg-brand-400 rounded-xs" />
          </div>
        );

      // Links
      case 'thumb':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center gap-1 p-1.5 flex-shrink-0" title="Miniatura à esquerda">
            <div className="w-3 h-5 bg-brand-400 rounded-xs" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-full h-1 bg-brand-300 rounded-full" />
              <div className="w-3/4 h-1 bg-brand-300/50 rounded-full" />
            </div>
          </div>
        );
      case 'duo-btn':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center gap-1 p-1 flex-shrink-0" title="2 botões lado a lado">
            <div className="w-3.5 h-4 bg-brand-400 rounded-xs" />
            <div className="w-3.5 h-4 bg-brand-300/70 rounded-xs" />
          </div>
        );
      case 'featured':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        );

      // Profiles
      case 'hero-cover':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex flex-col items-center justify-between p-1 flex-shrink-0">
            <div className="w-full h-3 bg-brand-400/80 rounded-xs" />
            <div className="w-4 h-4 rounded-full bg-brand-300 -mt-2 border border-studio-black" />
            <div className="w-5 h-0.5 bg-brand-300/60 rounded-full" />
          </div>
        );
      case 'card-profile':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center gap-1 p-1.5 flex-shrink-0">
            <div className="w-4 h-4 rounded-full bg-brand-400 flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-full h-1 bg-brand-300 rounded-full" />
              <div className="w-2/3 h-1 bg-brand-300/50 rounded-full" />
            </div>
          </div>
        );
      case 'badge-profile':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex flex-col items-center justify-center gap-1 p-1 flex-shrink-0">
            <div className="w-4 h-4 rounded-full bg-brand-400 border border-amber-400" />
            <div className="flex gap-0.5">
              <span className="w-1.5 h-1 bg-amber-400 rounded-full" />
              <span className="w-1.5 h-1 bg-brand-300 rounded-full" />
            </div>
          </div>
        );

      // Social
      case 'grid-social':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 grid grid-cols-2 gap-1 p-1.5 flex-shrink-0">
            <div className="bg-brand-400 rounded-xs" />
            <div className="bg-brand-400 rounded-xs" />
            <div className="bg-brand-400 rounded-xs" />
            <div className="bg-brand-400 rounded-xs" />
          </div>
        );
      case 'pills-social':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex flex-col items-center justify-center gap-1 p-1.5 flex-shrink-0">
            <div className="w-full h-2 bg-brand-400 rounded-full" />
            <div className="w-full h-2 bg-brand-400 rounded-full" />
          </div>
        );
      case 'dock-social':
        return (
          <div className="w-10 h-10 rounded-xl bg-studio-card border border-studio-border flex items-center justify-center gap-1 p-1 flex-shrink-0 shadow-inner">
            <div className="w-1.5 h-3 bg-brand-400 rounded-full" />
            <div className="w-1.5 h-4 bg-brand-300 rounded-full" />
            <div className="w-1.5 h-3 bg-brand-400 rounded-full" />
          </div>
        );
      case 'row-social':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center gap-1 p-1 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-brand-400" />
            <div className="w-2 h-2 rounded-full bg-brand-400" />
            <div className="w-2 h-2 rounded-full bg-brand-400" />
          </div>
        );

      // Contact
      case 'whatsapp':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <WhatsAppIcon className="w-5 h-5" />
          </div>
        );
      case 'newsletter':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center gap-1 p-1.5 flex-shrink-0">
            <div className="flex-1 h-4 bg-studio-black border border-brand-500/40 rounded-xs" />
            <div className="w-3 h-4 bg-brand-500 rounded-xs" />
          </div>
        );
      case 'full-form':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex flex-col justify-center gap-1 p-1.5 flex-shrink-0">
            <div className="w-full h-1.5 bg-brand-400/50 rounded-xs" />
            <div className="w-full h-1.5 bg-brand-400/50 rounded-xs" />
            <div className="w-2/3 h-1.5 bg-brand-500 rounded-xs" />
          </div>
        );

      // Media
      case 'polaroid':
        return (
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex flex-col items-center justify-between p-1 flex-shrink-0 shadow-xs">
            <div className="w-full h-5 bg-studio-black rounded-xs" />
            <div className="w-4 h-0.5 bg-slate-400 rounded-full" />
          </div>
        );
      case 'duo-gallery':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center gap-1 p-1.5 flex-shrink-0">
            <div className="w-3.5 h-6 bg-brand-400 rounded-xs" />
            <div className="w-3.5 h-6 bg-brand-400 rounded-xs" />
          </div>
        );
      case 'banner':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center p-1.5 flex-shrink-0">
            <div className="w-full h-4 bg-brand-400 rounded-xs" />
          </div>
        );
      case 'video':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-400 flex-shrink-0">
            <Play className="w-4 h-4 fill-brand-400" />
          </div>
        );

      // Text
      case 'quote':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-400 flex-shrink-0">
            <Quote className="w-5 h-5 opacity-80" />
          </div>
        );
      case 'callout':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border-l-4 border-amber-500 flex items-center justify-center text-amber-400 flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
        );
      case 'checklist':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
      case 'heading':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex flex-col justify-center gap-1 p-2 flex-shrink-0">
            <div className="w-full h-2 bg-brand-400 rounded-xs" />
            <div className="w-3/4 h-1 bg-brand-300/60 rounded-xs" />
          </div>
        );

      // FAQ
      case 'support-faq':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-brand-400 flex-shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
        );
      case 'cards-faq':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex flex-col justify-center gap-1 p-1.5 flex-shrink-0">
            <div className="w-full h-3 bg-studio-black border border-brand-500/30 rounded-xs" />
            <div className="w-full h-3 bg-studio-black border border-brand-500/30 rounded-xs" />
          </div>
        );
      case 'accordion':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex flex-col justify-center gap-1 p-1.5 flex-shrink-0">
            <div className="w-full h-2 bg-brand-400/80 rounded-xs flex items-center justify-end pr-1">
              <ChevronDown className="w-2 h-2 text-black" />
            </div>
            <div className="w-full h-2 bg-brand-400/80 rounded-xs flex items-center justify-end pr-1">
              <ChevronDown className="w-2 h-2 text-black" />
            </div>
          </div>
        );

      // Divider
      case 'badge-divider':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center gap-1 p-1 flex-shrink-0">
            <div className="w-2 h-0.5 bg-brand-400" />
            <div className="w-3 h-2 bg-brand-400 rounded-full" />
            <div className="w-2 h-0.5 bg-brand-400" />
          </div>
        );
      case 'dots-divider':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center gap-1 p-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300" />
            <span className="w-2 h-2 rounded-full bg-brand-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300" />
          </div>
        );
      case 'gradient-divider':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center p-2 flex-shrink-0">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent rounded-full" />
          </div>
        );
      case 'space-divider':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-dashed border-brand-500/40 flex items-center justify-center text-[10px] font-mono text-brand-300 flex-shrink-0">
            ↕
          </div>
        );

      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-studio-card border border-studio-border flex items-center justify-center text-slate-300 flex-shrink-0">
            <Plus className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-3 pb-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar categoria ou formato de bloco..."
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-studio-input border border-studio-border text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      {/* Categories Toolbar: Counter & Quick Controls */}
      <div className="flex items-center justify-between gap-2 px-1 pt-0.5 select-none">
        <span className="text-[11px] font-bold text-slate-400">
          Categorias ({filteredCategories.length})
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={expandAll}
            className="text-[11px] font-semibold text-slate-400 hover:text-brand-400 px-2 py-0.5 rounded-lg hover:bg-studio-card transition-colors active:scale-95"
          >
            Expandir todos
          </button>
          <span className="text-zinc-700">•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-[11px] font-semibold text-slate-400 hover:text-brand-400 px-2 py-0.5 rounded-lg hover:bg-studio-card transition-colors active:scale-95"
          >
            Recolher todos
          </button>
        </div>
      </div>

      {/* Categories Accordion List */}
      <div className="flex flex-col gap-2.5 pt-1">
        {filteredCategories.map((category) => {
          const IconComp = category.icon;
          const isExpanded = query ? true : expandedCategories.has(category.type);

          return (
            <div
              key={category.type}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-studio-panel border-brand-500/70 shadow-lg shadow-black/60 ring-1 ring-brand-500/30'
                  : 'bg-studio-card/80 border-studio-border hover:border-brand-500/30 hover:bg-studio-panel'
              }`}
            >
              {/* Category Header Row (Click to toggle collapse) */}
              <button
                type="button"
                onClick={() => toggleCategory(category.type)}
                className="w-full p-3 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer select-none group"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-brand-500 text-black font-bold shadow-md shadow-brand-500/25 scale-105'
                        : 'bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-black'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-white truncate">
                        {category.title}
                      </h4>
                      {category.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-500/15 text-brand-400 font-extrabold flex-shrink-0 border border-brand-500/30">
                          {category.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-semibold text-slate-400 hidden sm:inline-block bg-studio-card px-2 py-0.5 rounded-full border border-studio-border">
                    {category.subOptions.length} modelos
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${
                      isExpanded
                        ? 'rotate-180 bg-brand-500/20 text-brand-400 shadow-[0_0_10px_rgba(0,229,153,0.3)]'
                        : 'rotate-0 bg-studio-card text-slate-400 group-hover:text-white border border-studio-border'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </div>
              </button>

              {/* Collapsible Sub-options Area with Smooth Grid Transition */}
              <div className={`collapse-transition ${isExpanded ? 'is-expanded' : ''}`}>
                <div className="collapse-content">
                  <div className="border-t border-studio-border/70 bg-studio-black/80 p-2.5 pt-3 space-y-2">
                    <div className="flex items-center justify-between px-1 mb-1">
                      <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-brand-400" />
                        <span>Modelos disponíveis em {category.title}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Toque no modelo para adicionar
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {category.subOptions.map((subOpt) => {
                        return (
                          <div
                            key={subOpt.id}
                            onClick={() => onAddBlock(category.type, subOpt.customData)}
                            className="p-3 rounded-xl border border-studio-border bg-studio-card/80 hover:bg-studio-panel hover:border-brand-500/50 flex items-center justify-between gap-3 transition-all cursor-pointer group active:scale-[0.98] shadow-sm"
                          >
                            {/* Visual Diagram / Mini representation */}
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              {renderVisualBadge(subOpt.visualType)}

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <h5 className="text-xs font-bold text-white group-hover:text-brand-300 truncate">
                                    {subOpt.title}
                                  </h5>
                                  {subOpt.badge && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-brand-500/15 text-brand-400 font-bold border border-brand-500/30 flex-shrink-0">
                                      {subOpt.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                  {subOpt.description}
                                </p>
                              </div>
                            </div>

                            {/* Quick Add Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddBlock(category.type, subOpt.customData);
                              }}
                              className="px-2.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black text-[11px] font-black flex items-center gap-1 shadow-md shadow-brand-500/20 group-hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Adicionar</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs">
            Nenhuma categoria ou modelo encontrado para "{search}".
          </div>
        )}
      </div>
    </div>
  );
};
