
import React from 'react';
import { Compass, Sparkles, Gem } from 'lucide-react';
import { PageType, SiteContent } from './types';

export const COLORS = {
  duskyRose: '#D9BCAF',
  thistle: '#8A9688',
  hawthorneGreen: '#283D3B',
  royalScepter: '#795663',
  blueNoir: '#011627',
};

export const DEFAULT_CONTENT: SiteContent = {
  whatsapp: '5511978828967',
  portalUrl: 'https://mapa.artwebcreative.com.br/',
  instagram: {
    handle: '@lilinumerologia',
    url: 'https://www.instagram.com/lilinumerologia',
    showFeed: true
  },
  blogPosts: [
    {
      id: '1',
      title: 'A Vibração do Ano 8: Prosperidade e Justiça',
      excerpt: 'Descubra como a energia do número 8 influencia as grandes decisões financeiras e o equilíbrio de poder em 2024.',
      content: 'O número 8 na numerologia pitagórica representa o equilíbrio entre o mundo material e o espiritual. É o número da colheita, do poder executivo e da justiça. \n\nNeste artigo, exploramos como as mulheres empreendedoras podem canalizar essa vibração para estruturar negócios sólidos e éticos. A arquitetura do destino não é linear; ela se expande em oitavas. \n\nQuando entendemos que o 8 é o símbolo do infinito em pé, percebemos que a riqueza flui onde há ordem e responsabilidade.',
      image: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800',
      date: '15/05/2024',
      author: 'Lili',
      comments: [
        {
          id: 'c1',
          author: 'Mariana Silva',
          text: 'Essa leitura me trouxe muita clareza sobre o meu momento profissional atual. Gratidão!',
          date: '16/05/2024',
          status: 'approved'
        }
      ]
    }
  ],
  pricingPlans: [
    {
      title: 'Pessoal',
      price: 'Sob Consulta',
      features: ['Missão de Vida', 'Ciclos e Desafios', 'Vibração do Nome', 'Planejamento Anual'],
    },
    {
      title: 'Empresarial',
      price: 'Premium',
      features: ['Análise de Marca', 'Energia dos Sócios', 'Datas para Lançamentos', 'Alinhamento Estratégico'],
      highlight: true
    },
    {
      title: 'Familiar',
      price: 'Sob Consulta',
      features: ['Conexão entre Membros', 'Dinâmicas de Convivência', 'Orientação Parental', 'Harmonização de Ambientes'],
    }
  ],
  mapa: {
    heroTitle: 'Mapa Numerológico Premium',
    heroSubtitle: 'Sua vida não é um acaso, é uma arquitetura. O mapa é o seu blueprint original, revelando as engrenagens que movem seu destino.',
    benefits: [
      { title: "Autoconhecimento Estruturado", desc: "Entenda seus talentos naturais e como monetizá-los." },
      { title: "Sincronia de Tempo", desc: "Saiba exatamente em qual ciclo você está e o que priorizar agora." },
      { title: "Alinhamento de Marca", desc: "Sua vibração pessoal refletida em seu posicionamento profissional." }
    ],
    revealTitle: 'O que o Portal revela?',
    revealItems: [
      "Missão e Propósito de Alma",
      "Desafios Kármicos e Superações",
      "Vibração do Nome Profissional e Social",
      "Análise de Ciclos de Realização",
      "Seu Ano Pessoal em detalhes",
      "Tabela de Potencialidades Mensais"
    ],
    pricingTitle: 'Investimento no seu Destino',
    pricingSubtitle: 'Planos Estratégicos'
  },
  home: {
    heroTitle: 'A Arquitetura Oculta do seu Destino',
    heroSubtitle: 'Desvenda a alma através da precisão dos números. Onde a lógica de dados encontra a sabedoria ancestral para criar uma trajetória de prosperidade.',
    heroImage: 'https://images.unsplash.com/photo-1496347315479-3077758e774a?auto=format&fit=crop&q=80&w=1920',
    pythagorasImage: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/pythagoras-digital-v2.png',
    aboutTitle: 'Quem é a Lili?',
    aboutText1: 'Sou a Eliane Serafim — e, dentro do meu universo de cura e criação, você vai me encontrar como Lili. Eu uno dois mundos que, pra mim, sempre caminharam juntos: a sensibilidade das terapias e a clareza da tecnologia.',
    aboutText2: 'Atendendo com Numerologia Pitagórica desde 2017, trago uma abordagem estratégica que ajuda a organizar pensamentos e fortalecer decisões para construir uma vida com mais verdade e presença.',
    aboutImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
  },
  sobre: {
    title: 'Eliane Serafim.',
    subtitle: 'Lili — A união entre a sensibilidade das terapias e a clareza da tecnologia.',
    paragraphs: [
      'Oie! Sou a Eliane Serafim — e, dentro do meu universo de cura e criação, você vai me encontrar como Lili. Eu uno dois mundos que, pra mim, sempre caminharam juntos: a sensibilidade das terapias e a clareza da tecnologia.',
      'Na Lili Numerologia, atendo com Numerologia Pitagórica desde 2017. Trabalho com análises pessoais e empresariais, sinastria amorosa e atendimentos de Tarot com uma abordagem prática, acolhedora e estratégica — daquelas que ajudam a organizar pensamentos, fortalecer decisões e abrir caminhos com mais consciência.',
      'Eu também gosto de dialogar com o mundo corporativo, com uma comunicação acessível e pé no chão, sempre priorizando informações confiáveis, com base em ciência, tecnologia e responsabilidade, e claro: na análise das energias.',
      'Além dos atendimentos, crio joias artesanais sob encomenda com essência terapêutica — peças que carregam intenção, simbolismo e beleza, conectando números, cristais e arquétipos de forma elegante e personalizada.',
      'Além da tecnologia e das terapias, promovo a identidade e a autoestima feminina através da minha atuação no Projeto Encrespa Geral.',
      'Se você sente que está pronta para se conhecer de verdade, alinhar sua energia com suas escolhas e construir uma vida (e uma marca) com mais verdade e presença, esse espaço é pra você. Nos unimos pra nos tornamos potência!'
    ],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    quote: 'Nos unimos pra nos tornamos potência!'
  }
};

export const NAVIGATION = [
  { name: 'Início', target: 'home' as PageType },
  { name: 'Mapa Numerológico', target: 'mapa' as PageType },
  { name: 'Tarot Estratégico', target: 'tarot' as PageType },
  { name: 'Joias de Poder', target: 'joias' as PageType },
  { name: 'Blog', target: 'blog' as PageType },
  { name: 'Sobre Lili', target: 'sobre' as PageType },
  { name: 'FAQ', target: 'faq' as PageType },
];

export const SERVICES = [
  {
    title: 'Buscando Direção',
    subtitle: 'Numerologia',
    description: 'Acesse o código matemático da sua existência e alinhe sua trajetória pessoal e profissional.',
    icon: <Compass className="w-8 h-8" strokeWidth={1} />,
    target: 'mapa' as PageType
  },
  {
    title: 'Buscando Respostas',
    subtitle: 'Tarot Estratégico',
    description: 'Clareza analítica para decisões complexas. O tarot como ferramenta de governança da própria vida.',
    icon: <Sparkles className="w-8 h-8" strokeWidth={1} />,
    target: 'tarot' as PageType
  },
  {
    title: 'Buscando Proteção',
    subtitle: 'Joias de Poder',
    description: 'Amuletos exclusivos materializados sob a frequência exata da sua vibração numérica.',
    icon: <Gem className="w-8 h-8" strokeWidth={1} />,
    target: 'joias' as PageType
  }
];
