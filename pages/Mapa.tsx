
import React from 'react';
import { PricingItem, SiteContent } from '../types';
import { Check } from 'lucide-react';

interface MapaProps {
  whatsapp: string;
  pricingPlans: PricingItem[];
  content: SiteContent['mapa'];
}

const Mapa: React.FC<MapaProps> = ({ whatsapp, pricingPlans, content }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section className="bg-[#8A968810] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#795663] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">O Guia Supremo</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-8">{content.heroTitle}</h1>
          <p className="text-xl font-light leading-relaxed text-[#283D3B] opacity-80">
            {content.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {content.benefits.map((b, i) => (
            <div key={i} className="text-center p-8 border-r border-[#8A968820] last:border-0">
              <h3 className="text-2xl font-serif mb-4 text-[#795663]">{b.title}</h3>
              <p className="font-light text-[#283D3B] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#011627] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-serif mb-8">{content.revealTitle}</h2>
              <ul className="space-y-6">
                {content.revealItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-light border-b border-white/10 pb-4">
                    <span className="text-[#D9BCAF]"><Check size={20} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/id/400/500/500" className="rounded-2xl opacity-80" alt="Estudo numerológico" />
              <img src="https://picsum.photos/id/401/500/500" className="rounded-2xl mt-8 opacity-80" alt="Harmonia cósmica" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">{content.pricingTitle}</h2>
          <p className="text-[#8A9688] uppercase tracking-widest text-xs font-bold">{content.pricingSubtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <div 
              key={i} 
              className={`p-10 rounded-3xl flex flex-col ${
                plan.highlight 
                ? 'bg-[#283D3B] text-white scale-105 shadow-2xl z-10' 
                : 'bg-white border border-[#8A968820]'
              }`}
            >
              <h3 className="text-2xl font-serif mb-2">{plan.title}</h3>
              <div className="text-3xl font-serif mb-8 text-[#D9BCAF]">{plan.price}</div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm opacity-80">
                    <Check size={14} className={plan.highlight ? 'text-[#D9BCAF]' : 'text-[#795663]'} />
                    {f}
                  </li>
                ))}
              </ul>
              <a 
                href={`https://wa.me/${whatsapp}?text=Olá Lili! Tenho interesse no Mapa Numerológico ${plan.title}. Gostaria de saber como iniciar.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-full text-xs uppercase tracking-widest font-bold transition-all text-center btn-hover ${
                plan.highlight 
                ? 'bg-[#D9BCAF] text-[#283D3B]' 
                : 'border border-[#795663] text-[#795663] hover:text-white'
              }`}>
                Encomendar Mapa
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Mapa;
