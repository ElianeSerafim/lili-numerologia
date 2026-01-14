
import React, { useEffect, useRef, useState } from 'react';
import { PageType, SiteContent } from '../types';
import { SERVICES } from '../constants';
import { ChevronRight, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageType) => void;
  content: SiteContent['home'];
}

class ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  dead: boolean = false;

  constructor(width: number) {
    this.x = Math.random() * width;
    this.y = 0;
    this.len = Math.random() * 80 + 50;
    this.speed = Math.random() * 10 + 5;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = 1;
    this.color = Math.random() > 0.5 ? '#ffffff' : '#f4e4c1';
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap = 'round';
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    // Trajetória diagonal como na foto
    ctx.lineTo(this.x - this.len, this.y + this.len);
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.x -= this.speed;
    this.y += this.speed;
    this.opacity -= 0.01;
    if (this.opacity <= 0) this.dead = true;
  }
}

const Home: React.FC<HomeProps> = ({ onNavigate, content }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: ShootingStar[] = [];
    let animationId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (Math.random() < 0.01) { // Probabilidade de surgir um meteoro
        stars.push(new ShootingStar(width + 200));
      }

      stars.forEach((star, index) => {
        star.update();
        star.draw(ctx);
        if (star.dead) stars.splice(index, 1);
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const opacity = Math.max(1 - scrollY / 700, 0);
  const blur = Math.min(scrollY / 50, 10);

  return (
    <div className="animate-in fade-in duration-1000 -mt-20 overflow-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen min-h-[750px] hero-container flex items-center justify-center">
        
        {/* Layer 0: Background Atacama com Parallax */}
        <div className="hero-bg-image" style={{ filter: `blur(${blur}px)` }} />
        
        {/* Layer 1: Canvas de Meteoros */}
        <canvas ref={canvasRef} id="shooting-stars-canvas" />

        {/* Layer 2: Reflexo na Água Interativo */}
        <div className="reflection-overlay" />

        {/* Layer 3: Silhueta do Casal Ancorada */}
        <div 
          className="absolute bottom-[28%] left-1/2 -translate-x-1/2 z-10 w-40 h-40 md:w-56 md:h-56 couple-silhouette pointer-events-none"
          style={{ transform: `translateX(-50%) translateY(${scrollY * 0.1}px)` }}
        />

        {/* Layer 4: Conteúdo de Texto */}
        <div 
          className="relative z-20 max-w-6xl mx-auto px-6 w-full text-center mt-[-10vh]"
          style={{ opacity, transform: `translateY(${scrollY * -0.2}px)` }}
        >
          <div className="animate-float">
            <span className="font-montserrat text-[#D9BCAF] text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-black mb-8 block drop-shadow-lg">
              Arquitetura Estratégica da Alma
            </span>
            
            <h1 className="text-5xl md:text-[90px] font-serif font-bold headline-luxury leading-[1] mb-12 tracking-tighter">
              {content.heroTitle}
            </h1>
            
            <p className="font-montserrat text-white/90 text-lg md:text-2xl font-light mb-16 leading-[1.8] max-w-3xl mx-auto drop-shadow-md">
              {content.heroSubtitle}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-10 items-center justify-center">
            <button 
              onClick={() => onNavigate('mapa')}
              className="btn-luxury font-montserrat text-white px-16 py-6 rounded-full font-bold tracking-[0.3em] text-[12px] uppercase active:scale-95 shadow-2xl"
            >
              Iniciar Projeto
            </button>
            <button 
              onClick={() => onNavigate('sobre')}
              className="group flex items-center gap-5 text-white font-montserrat text-[11px] uppercase tracking-[0.4em] font-bold hover:text-[#D9BCAF] transition-all"
            >
              Conheça a Lili <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* Horizon Glow Enhancement */}
        <div className="absolute inset-x-0 bottom-[35%] h-[15%] bg-gradient-to-t from-[#f4e4c1]/10 to-transparent pointer-events-none z-[4]"></div>
      </section>

      {/* Seção de Jornada (Fundo Branco para contraste) */}
      <section className="py-24 md:py-40 bg-[#FDFDFD] relative z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32 max-w-3xl mx-auto">
            <span className="text-[#795663] font-montserrat text-[10px] uppercase tracking-[0.6em] font-black mb-6 block">O Caminho da Expansão</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-12 text-[#283D3B] leading-tight">A Jornada: Sua Próxima Oitava de Poder</h2>
            <div className="w-24 h-px bg-[#D9BCAF] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
            {SERVICES.map((s, idx) => (
              <article 
                key={idx}
                onClick={() => onNavigate(s.target)}
                className="group relative p-14 rounded-[4rem] cursor-pointer bg-white shadow-2xl hover:-translate-y-6 transition-all duration-700 border border-gray-100 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 text-gray-200 group-hover:opacity-10 transition-opacity">
                   {s.icon}
                </div>
                
                <div className="relative flex justify-between items-start mb-16">
                  <div className="p-8 bg-[#F9F7F5] rounded-[2.5rem] text-[#795663] group-hover:bg-[#283D3B] group-hover:text-white transition-all duration-500 shadow-sm">
                    {s.icon}
                  </div>
                  <div className="w-14 h-14 flex items-center justify-center rounded-full border border-[#D9BCAF40] group-hover:bg-[#D9BCAF] transition-all duration-500">
                    <ArrowUpRight className="text-[#D9BCAF] group-hover:text-white" size={28} />
                  </div>
                </div>
                
                <h3 className="font-montserrat text-[11px] uppercase tracking-[0.5em] text-[#8A9688] font-black mb-8">{s.title}</h3>
                <h4 className="text-4xl lg:text-5xl font-serif mb-10 text-[#283D3B] leading-tight">{s.subtitle}</h4>
                <p className="font-montserrat text-[#283D3B]/70 font-light leading-relaxed mb-6 text-xl">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 md:py-40 bg-[#011627] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div>
              <span className="text-[#D9BCAF] font-montserrat text-[11px] uppercase tracking-[0.5em] font-black mb-8 block">Pilares de Atuação</span>
              <h2 className="text-4xl md:text-7xl font-serif mb-16 leading-tight">Onde a lógica encontra o sagrado</h2>
              <div className="space-y-16">
                <div className="flex gap-10 group">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full border border-[#D9BCAF]/30 flex items-center justify-center group-hover:bg-[#D9BCAF] group-hover:text-[#011627] transition-all duration-700">
                    <ShieldCheck size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif mb-4">Confidencialidade</h3>
                    <p className="text-white/50 font-light leading-relaxed font-montserrat text-lg">Tratamento ético e sigiloso de dados para perfis de alta exposição e lideranças corporativas.</p>
                  </div>
                </div>
                <div className="flex gap-10 group">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full border border-[#D9BCAF]/30 flex items-center justify-center group-hover:bg-[#D9BCAF] group-hover:text-[#011627] transition-all duration-700">
                    <Zap size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif mb-4">Precisão Matemática</h3>
                    <p className="text-white/50 font-light leading-relaxed font-montserrat text-lg">Abordagem técnica baseada na numerologia pitagórica clássica, unindo algoritmos à intuição.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center items-center">
              <div className="relative z-10 w-full flex justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#D9BCAF]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
                <img 
                  src={content.pythagorasImage} 
                  alt="Pitágoras Digital" 
                  className="w-full max-w-[550px] drop-shadow-[0_60px_60px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
