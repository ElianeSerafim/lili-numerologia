
import React from 'react';
import { SiteContent } from '../types';

interface SobreProps {
  content: SiteContent['sobre'];
  whatsapp: string;
}

const Sobre: React.FC<SobreProps> = ({ content, whatsapp }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 md:sticky md:top-24">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#D9BCAF20] rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
              <img 
                src={content.image} 
                alt="Eliane Serafim - Lili" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl transition-transform duration-1000 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-12 p-10 border border-[#D9BCAF] rounded-[2.5rem] italic font-serif text-[#795663] text-center md:text-left bg-white/50 backdrop-blur-sm shadow-xl">
              "{content.quote}"
            </div>
          </div>
          
          <div className="md:col-span-7 space-y-12 text-lg font-light leading-relaxed text-[#283D3B]">
            <header>
              <span className="text-[11px] uppercase tracking-[0.5em] text-[#795663] font-black mb-6 block">Identidade & Essência</span>
              <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">{content.title}</h1>
              <p className="text-xl md:text-2xl font-serif text-[#795663] italic border-l-4 border-[#D9BCAF] pl-8 py-2">
                {content.subtitle}
              </p>
            </header>
            
            <div className="space-y-8">
              {content.paragraphs.map((p, i) => (
                <p key={i} className="first-letter:text-4xl first-letter:font-serif first-letter:text-[#795663] first-letter:mr-2">
                  {p}
                </p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-10 py-12 border-y border-[#8A968820]">
              <div className="space-y-4">
                <div className="w-10 h-px bg-[#D9BCAF]"></div>
                <h4 className="font-serif text-2xl text-[#283D3B]">A Ísis</h4>
                <p className="text-sm opacity-70 leading-relaxed">Minha companheira felina e guardiã dos momentos de silêncio, onde a intuição encontra espaço para se manifestar.</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-px bg-[#D9BCAF]"></div>
                <h4 className="font-serif text-2xl text-[#283D3B]">Impacto Social</h4>
                <p className="text-sm opacity-70 leading-relaxed">Atuação ativa no Projeto Encrespa Geral, promovendo a identidade e o fortalecimento da autoestima feminina.</p>
              </div>
            </div>

            <div className="pt-10">
               <a 
                 href={`https://wa.me/${whatsapp}?text=Olá Lili! Li sobre sua trajetória e sinto que é o momento de conectarmos nossas energias.`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-block bg-[#283D3B] text-white px-16 py-6 rounded-full text-[12px] uppercase tracking-[0.3em] font-bold btn-hover shadow-2xl text-center w-full sm:w-auto"
               >
                  Conectar-se agora
               </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
