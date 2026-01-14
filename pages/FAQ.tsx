
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SiteContent } from '../types';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#D9BCAF40] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left hover:text-[#795663] transition-colors group"
      >
        <span className="text-xl md:text-2xl font-serif">{question}</span>
        <span className={`transform transition-transform duration-500 text-[#D9BCAF] ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={24} strokeWidth={1.5} />
        </span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-lg font-light leading-relaxed text-[#283D3B] opacity-80 max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
  );
};

interface FAQProps {
  content: SiteContent;
}

const FAQ: React.FC<FAQProps> = ({ content }) => {
  const sections = [
    {
      title: "Arquitetura da Alma (Numerologia)",
      questions: [
        {
          question: "Como o Mapa Premium se diferencia de análises comuns?",
          answer: "O Mapa Premium não é um relatório automatizado. É um blueprint estratégico que une a precisão matemática da numerologia pitagórica à minha experiência em UX e análise de dados. Investigamos não apenas números, mas a engenharia por trás do seu comportamento, ciclos de vida e oportunidades de mercado."
        },
        {
          question: "Posso aplicar a Numerologia ao meu negócio?",
          answer: "Absolutamente. Oferecemos a Numerologia Empresarial, onde analisamos a marca, a harmonia entre sócios e as janelas temporais ideais para lançamentos e expansões. É governança baseada em frequência."
        },
        {
          question: "Qual o prazo para entrega do estudo completo?",
          answer: "Por ser um trabalho artesanal e analítico, o prazo de entrega do dossiê digital e a sessão de mentoria é de 15 a 20 dias úteis."
        }
      ]
    },
    {
      title: "Estratégia Vibracional (Tarot)",
      questions: [
        {
          question: "O Tarot pode prever decisões financeiras?",
          answer: "O Tarot Estratégico atua como um conselho consultivo. Ele revela a tendência das energias atuais e os prováveis desdobramentos de suas escolhas. Não é sobre adivinhação passiva, mas sobre clareza para uma governança ativa."
        },
        {
          question: "As sessões são presenciais ou online?",
          answer: "Priorizamos o formato online para clientes em todo o mundo, garantindo o mesmo nível de profundidade e confidencialidade. A energia não conhece barreiras físicas."
        }
      ]
    },
    {
      title: "Manifestação Material (Joias)",
      questions: [
        {
          question: "As pedras e metais são certificados?",
          answer: "Sim. Trabalhamos exclusivamente com Ouro 18k e gemas naturais selecionadas sob rigorosos padrões de qualidade e pureza vibracional. Cada peça acompanha seu certificado de autenticidade."
        },
        {
          question: "Como é definida a pedra da minha joia?",
          answer: "A escolha não é estética, mas matemática. Através do seu número de Missão ou Necessidade de Alma, identificamos o mineral que possui a frequência exata para equilibrar ou potencializar sua energia atual."
        }
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section className="bg-[#8A968810] py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[#795663] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Esclarecimentos Necessários</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 text-[#283D3B]">Diálogos sobre a Arquitetura</h1>
          <p className="text-xl font-light leading-relaxed text-[#283D3B] opacity-80">
            Respostas fundamentadas para quem busca profundidade e clareza em sua jornada de expansão.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-6">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-20">
            <h2 className="text-[#D9BCAF] uppercase tracking-[0.2em] text-sm font-bold mb-10 border-l-2 border-[#D9BCAF] pl-6">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.questions.map((q, qIdx) => (
                <FAQItem key={qIdx} question={q.question} answer={q.answer} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-20 p-12 glass-thistle rounded-3xl text-center border border-[#D9BCAF20]">
          <h3 className="text-3xl font-serif mb-6 text-[#283D3B]">Ainda restam dúvidas sobre sua trajetória?</h3>
          <p className="text-lg font-light text-[#283D3B] opacity-70 mb-10 max-w-2xl mx-auto">
            Seu caso pode exigir uma abordagem ainda mais exclusiva. Estou à disposição para um breve diálogo preliminar.
          </p>
          <a
            href={`https://wa.me/${content.whatsapp}?text=Olá Lili, tenho uma dúvida específica sobre os serviços vista no FAQ.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#283D3B] text-white px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold btn-hover text-center"
          >
            Conversar com a Arquiteta
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
