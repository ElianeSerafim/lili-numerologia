
import React from 'react';
import { PageType, SiteContent } from '../types';
import { SERVICES } from '../constants';
import { ChevronRight, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageType) => void;
  content: SiteContent['home'];
}

const Home: React.FC<HomeProps> = ({ onNavigate, content }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#011627]">
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cinematic scale-110 blur-[2px]" 
          style={{ backgroundImage: `url('${content.heroImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          role="img"
          aria-label="Fundo artístico de espiritualidade e números"
        ></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-20 flex items-center min-h-screen">
          <div className="max-w-4xl animate-in slide-in-from-left-12 duration-1000">
            <span className="text-[#D9BCAF] text-[10px] uppercase tracking-[0.8em] font-black mb-10 block opacity-80">Arquitetura Estratégica da Alma</span>
            <h1 className="text-6xl md:text-[9.5rem] text-white font-serif leading-[0.85] mb-12 tracking-tighter drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
              {content.heroTitle.split(' ').map((word, i) => 
                word.toLowerCase().includes('destino') 
                ? <span key={i} className="texto-destaque italic pr-4">{word} </span> 
                : <span key={i}>{word} </span>
              )}
            </h1>
            <p className="text-[#D9BCAF] text-xl md:text-3xl font-light mb-16 leading-relaxed opacity-90 max-w-2xl border-l-[3px] border-[#D9BCAF]/40 pl-10">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-10 items-start sm:items-center">
              <button 
                onClick={() => onNavigate('mapa')}
                className="bg-[#283D3B] text-white px-16 py-7 rounded-full font-bold tracking-[0.3em] text-[13px] uppercase btn-hover shadow-[0_30px_60px_-15px_rgba(40,61,59,0.5)] transition-all active:scale-95"
              >
                Iniciar Projeto
              </button>
              <button 
                onClick={() => onNavigate('sobre')}
                className="group flex items-center gap-6 text-white text-[11px] uppercase tracking-[0.5em] font-bold hover:text-[#D9BCAF] transition-all"
              >
                A Arquiteta <div className="w-16 h-[2px] bg-white/20 group-hover:w-28 group-hover:bg-[#D9BCAF] transition-all duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-[#FDFDFD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="text-[#795663] text-[10px] uppercase tracking-[0.5em] font-black mb-6 block">Metodologia Exclusiva</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-10 text-[#283D3B] leading-tight">Caminhos para a sua próxima oitava de poder</h2>
            <div className="w-20 h-px bg-[#D9BCAF] mx-auto mb-10"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20 perspective-container">
            {SERVICES.map((s, idx) => (
              <article 
                key={idx}
                onClick={() => onNavigate(s.target)}
                className="group card-3d relative p-12 rounded-[4rem] cursor-pointer bg-white border border-[#8A968815] shadow-[0_30px_60px_-15px_rgba(40,61,59,0.08)]"
              >
                <div className="relative card-3d-icon flex justify-between items-start mb-16">
                  <div className="p-7 bg-[#F9F7F5] rounded-[2rem] text-[#795663] group-hover:bg-[#283D3B] group-hover:text-white transition-all duration-500 shadow-sm">
                    {s.icon}
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#D9BCAF20] group-hover:bg-[#D9BCAF] transition-all duration-500">
                    <ArrowUpRight className="text-[#D9BCAF] group-hover:text-white" size={24} />
                  </div>
                </div>
                
                <div className="relative card-3d-content">
                  <h3 className="text-[10px] uppercase tracking-[0.5em] text-[#8A9688] font-black mb-6">{s.title}</h3>
                  <h4 className="text-3xl lg:text-4xl font-serif mb-8 text-[#283D3B] leading-tight">{s.subtitle}</h4>
                  <p className="text-[#283D3B]/70 font-light leading-relaxed mb-16 text-lg min-h-[5rem]">{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section with Floating Pythagoras */}
      <section className="py-20 md:py-32 bg-[#011627] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#D9BCAF] text-[10px] uppercase tracking-[0.5em] font-black mb-6 block">Pilares de Atuação</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">Onde a lógica encontra o sagrado</h2>
              <div className="space-y-12">
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full border border-[#D9BCAF]/30 flex items-center justify-center group-hover:bg-[#D9BCAF] group-hover:text-[#011627] transition-all duration-500">
                    <ShieldCheck size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-3">Confidencialidade</h3>
                    <p className="text-white/60 font-light leading-relaxed">Tratamento ético e sigiloso de dados para perfis de alta exposição e lideranças.</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full border border-[#D9BCAF]/30 flex items-center justify-center group-hover:bg-[#D9BCAF] group-hover:text-[#011627] transition-all duration-500">
                    <Zap size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-3">Precisão Matemática</h3>
                    <p className="text-white/60 font-light leading-relaxed">Abordagem técnica baseada na numerologia pitagórica clássica, unindo dados à intuição.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2 flex justify-center items-center">
              {/* Floating Container */}
              <div className="relative z-10 animate-orchid w-full flex justify-center">
                {/* Glow Effect behind Pythagoras */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#D9BCAF]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
                
                <img 
                  src={content.pythagorasImage} 
                  alt="Pitágoras Digital - O encontro da sabedoria antiga com a tecnologia" 
                  className="w-full max-w-[500px] drop-shadow-[0_50px_50px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[4rem] shadow-xl group">
              <img 
                src={content.aboutImage} 
                alt="Eliane Serafim (Lili) - Fundadora" 
                className="w-full h-[700px] object-cover transition-all duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.5em] text-[#795663] font-black mb-6 block">O Código de Lili</span>
              <h2 className="text-4xl md:text-7xl font-serif leading-tight text-[#283D3B]">{content.aboutTitle}</h2>
            </div>
            
            <div className="space-y-8 text-xl font-light leading-relaxed text-[#283D3B]/80">
              <p className="border-l-4 border-[#D9BCAF] pl-8 py-2">{content.aboutText1}</p>
              <p>{content.aboutText2}</p>
            </div>
            
            <button 
              onClick={() => onNavigate('sobre')}
              className="group flex items-center gap-8 text-[#795663] font-serif italic text-3xl hover:text-[#283D3B] transition-all"
            >
              Nossa história 
              <span className="relative flex items-center">
                <span className="w-20 h-px bg-[#795663] group-hover:w-32 transition-all duration-700"></span>
                <ChevronRight size={20} className="ml-[-10px] group-hover:ml-4 transition-all duration-700" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
