
import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { NAVIGATION } from '../constants';
import { Menu, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onMenuOpen: () => void;
  portalUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onMenuOpen, portalUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determina se estamos em uma página que tem hero escuro (Home)
  const isDarkHeroPage = currentPage === 'home';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[55] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-[#8A968815] py-4 shadow-sm' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`} 
      aria-label="Navegação Principal"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className={`text-xl md:text-2xl font-serif font-bold tracking-[0.15em] cursor-pointer transition-colors ${
            !isScrolled && isDarkHeroPage ? 'text-white' : 'text-[#283D3B]'
          }`}
          onClick={() => onNavigate('home')}
          role="link"
          aria-label="Lili Numerologia - Início"
        >
          LILI <span className={`font-light transition-colors ${!isScrolled && isDarkHeroPage ? 'text-[#D9BCAF]' : 'text-[#795663]'}`}>NUMEROLOGIA</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAVIGATION.map((item) => (
            <button
              key={item.target}
              onClick={() => onNavigate(item.target)}
              aria-label={`Ir para ${item.name}`}
              className={`text-[11px] uppercase tracking-[0.25em] transition-all hover:opacity-100 ${
                isScrolled || !isDarkHeroPage
                  ? currentPage === item.target ? 'text-[#795663] font-bold' : 'text-[#283D3B]/70'
                  : currentPage === item.target ? 'text-[#D9BCAF] font-bold' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
          <a 
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Acessar Portal do Cliente (abre em nova aba)"
            className={`flex items-center gap-2 px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold btn-hover shadow-md hover:shadow-lg transform active:scale-95 transition-all ${
              isScrolled || !isDarkHeroPage
                ? 'bg-[#283D3B] text-[#D9BCAF]'
                : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[#D9BCAF] hover:text-[#283D3B]'
            }`}
          >
            Acessar Portal <ExternalLink size={14} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={onMenuOpen} 
          aria-label="Abrir Menu de Navegação"
          className={`lg:hidden p-2 rounded-full transition-colors ${
            !isScrolled && isDarkHeroPage ? 'text-white hover:bg-white/10' : 'text-[#283D3B] hover:bg-gray-50'
          }`}
        >
          <Menu size={28} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
