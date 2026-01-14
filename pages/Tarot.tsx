
import React from 'react';

interface TarotProps {
  whatsapp: string;
}

const Tarot: React.FC<TarotProps> = ({ whatsapp }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#011627]">
          <img src="https://picsum.photos/id/405/1920/1080" className="w-full h-full object-cover opacity-30 grayscale" alt="Tarot background" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl font-serif mb-6">Tarot Estratégico</h1>
          <p className="text-xl font-light tracking-[0.2em] uppercase text-[#D9BCAF]">Visão • Clareza • Decisão</p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="space-y-12 text-center">
          <h2 className="text-3xl font-serif italic text-[#795663]">"O Tarot não adivinha o seu futuro; ele te ajuda a construí-lo."</h2>
          <p className="text-lg leading-relaxed font-light text-[#283D3B]">
            Esqueça as abordagens fatalistas. O Tarot Estratégico é uma ferramenta de diagnóstico e projeção. Usamos os arquétipos para identificar bloqueios, oportunidades ocultas e o melhor caminho para suas metas. É como uma sessão de conselho consultivo para a sua alma.
          </p>
        </div>
      </section>

      <section className="py-8 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-thistle p-12 rounded-3xl border-l-4 border-[#795663]">
            <h3 className="text-3xl font-serif mb-4">Leitura Mandala</h3>
            <span className="text-sm uppercase tracking-widest text-[#795663] font-bold mb-6 block">Duração: 60 minutos</span>
            <p className="font-light mb-8 opacity-80 leading-relaxed">
              Uma visão 360º da sua vida atual. Analisamos carreira, relacionamentos, saúde e espiritualidade. Ideal para momentos de transição global ou fechamentos de ciclo.
            </p>
            <div className="text-2xl font-serif mb-8 text-[#283D3B]">R$ 480,00</div>
            <a 
              href={`https://wa.me/${whatsapp}?text=Olá Lili! Gostaria de reservar uma Leitura Mandala de Tarot.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#283D3B] text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest btn-hover text-center w-full sm:w-auto"
            >
              Reservar Horário
            </a>
          </div>

          <div className="glass-thistle p-12 rounded-3xl border-l-4 border-[#8A9688]">
            <h3 className="text-3xl font-serif mb-4">Focal Estratégica</h3>
            <span className="text-sm uppercase tracking-widest text-[#795663] font-bold mb-6 block">Duração: 30 minutos</span>
            <p className="font-light mb-8 opacity-80 leading-relaxed">
              Foco total em uma pergunta ou dilema específico. Respostas diretas e planos de ação práticos para situações emergenciais ou decisões pontuais.
            </p>
            <div className="text-2xl font-serif mb-8 text-[#283D3B]">R$ 290,00</div>
            <a 
              href={`https://wa.me/${whatsapp}?text=Olá Lili! Preciso de uma consulta Focal Estratégica de Tarot para uma decisão urgente.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#283D3B] text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest btn-hover text-center w-full sm:w-auto"
            >
              Consultar Agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarot;
