
import React from 'react';
import { PageType } from '../types';
import { NAVIGATION } from '../constants';
import { Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#011627] text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="text-3xl font-serif font-bold tracking-widest mb-6">
            LILI <span className="font-light text-[#D9BCAF]">NUMEROLOGIA</span>
          </div>
          <p className="text-white/60 font-light max-w-sm leading-relaxed">
            Arquitetando o destino de mulheres prósperas através da ciência dos números e da sabedoria do Tarot Estratégico.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D9BCAF] mb-6">Navegação</h4>
          <ul className="space-y-4">
            {NAVIGATION.map((item) => (
              <li key={item.target}>
                <button 
                  onClick={() => onNavigate(item.target)}
                  className="text-sm font-light text-white/60 hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D9BCAF] mb-6">Contato</h4>
          <ul className="space-y-4 text-sm font-light text-white/60">
            <li>contato@lilinumerologia.com.br</li>
            <li>@lilinumerologia</li>
            <li>São Paulo • Brasil</li>
            <li className="pt-4">
              <button 
                onClick={() => onNavigate('admin')}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity"
              >
                <Lock size={10} /> Acesso Restrito
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 tracking-widest uppercase text-center md:text-left gap-4">
        <div>© {new Date().getFullYear()} LILI NUMEROLOGIA. Todos os direitos reservados.</div>
        <div className="flex flex-col md:items-end items-center">
          <span>Desenvolvido com Alma e Lógica.</span>
          <a 
            href="https://www.instagram.com/atwebcreative" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#D9BCAF] transition-colors mt-1"
          >
            Desenvolvido por @atwebcreative
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
