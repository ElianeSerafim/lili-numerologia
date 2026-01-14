
import React from 'react';
import { Gem, MoveRight } from 'lucide-react';

interface JoiasProps {
  whatsapp: string;
}

const Joias: React.FC<JoiasProps> = ({ whatsapp }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#D9BCAF] uppercase tracking-widest text-xs font-bold block mb-4">Amuletos Vivos</span>
            <h1 className="text-5xl md:text-6xl font-serif mb-8">Joias de Poder</h1>
            <p className="text-lg font-light leading-relaxed text-[#283D3B] mb-10">
              Mais que acessórios, nossas joias são condensadores energéticos. Cada peça é desenhada após a análise numerológica da proprietária, escolhendo pedras e metais que ressoam na frequência necessária para seu momento.
            </p>
            <div className="space-y-6">
              {[
                "Consultoria Gemológica Vibracional",
                "Design exclusivo e autoral",
                "Ouro 18k e Pedras Preciosas Selecionadas",
                "Consagração sob a vibração numérica"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-[#795663]">
                  <span className="p-2 bg-[#8A968810] rounded-lg"><Gem size={18} strokeWidth={1} /></span>
                  <span className="font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-[#8A968810] rounded-t-full flex items-center justify-center p-8">
               <img 
                src="https://picsum.photos/id/524/800/1000" 
                className="w-full h-full object-cover rounded-t-full shadow-2xl" 
                alt="Joia de luxo"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#011627] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-12">O Ritual de Criação</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Análise", desc: "Realizamos o estudo do seu Mapa de Nascimento." },
              { step: "02", title: "Concepção", desc: "O design nasce da sua frequência vibratória." },
              { step: "03", title: "Lapidação", desc: "Mestres joalheiros materializam a peça." },
              { step: "04", title: "Consagração", desc: "A joia é ativada para sua nova portadora." }
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl font-serif text-white/10 group-hover:text-[#D9BCAF]/40 transition-colors mb-4">{s.step}</div>
                <h3 className="text-xl font-serif mb-2">{s.title}</h3>
                <p className="text-sm font-light opacity-60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <a 
              href={`https://wa.me/${whatsapp}?text=Olá Lili! Me encantei pelas Joias de Poder e gostaria de encomendar uma peça exclusiva.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-[#283D3B] text-white px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold btn-hover items-center gap-4 mx-auto text-center"
            >
              Encomendar Peça Exclusiva <MoveRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Joias;
