
import React from 'react';

export type PageType = 'home' | 'mapa' | 'tarot' | 'joias' | 'sobre' | 'faq' | 'admin' | 'blog';

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  status: 'pending' | 'approved';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  comments?: Comment[];
}

export interface PricingItem {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export interface MapaBenefit {
  title: string;
  desc: string;
}

export interface SiteContent {
  whatsapp: string;
  portalUrl: string;
  instagram: {
    handle: string;
    url: string;
    showFeed: boolean;
  };
  blogPosts: BlogPost[];
  pricingPlans: PricingItem[];
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    pythagorasImage: string;
    aboutTitle: string;
    aboutText1: string;
    aboutText2: string;
    aboutImage: string;
  };
  mapa: {
    heroTitle: string;
    heroSubtitle: string;
    benefits: MapaBenefit[];
    revealTitle: string;
    revealItems: string[];
    pricingTitle: string;
    pricingSubtitle: string;
  };
  sobre: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    image: string;
    quote: string;
  };
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onNavigate: (page: PageType) => void;
  target: PageType;
}
