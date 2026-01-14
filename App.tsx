
import React, { useState, useEffect } from 'react';
import { PageType, SiteContent, Comment } from './types';
import { NAVIGATION, DEFAULT_CONTENT } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InstagramFeed from './components/InstagramFeed';
import Home from './pages/Home';
import Mapa from './pages/Mapa';
import Tarot from './pages/Tarot';
import Joias from './pages/Joias';
import Sobre from './pages/Sobre';
import FAQ from './pages/FAQ';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import { X, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const savedContent = localStorage.getItem('lili_site_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent({ ...DEFAULT_CONTENT, ...parsed });
      } catch (e) {
        console.error("Erro ao carregar conteúdo salvo", e);
      }
    }
  }, []);

  const handleSaveContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('lili_site_content', JSON.stringify(newContent));
  };

  const handleAddComment = (postId: string, comment: Comment) => {
    const updatedPosts = content.blogPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), comment]
        };
      }
      return post;
    });
    handleSaveContent({ ...content, blogPosts: updatedPosts });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} content={content.home} />;
      case 'mapa': return <Mapa whatsapp={content.whatsapp} content={content.mapa} pricingPlans={content.pricingPlans} />;
      case 'tarot': return <Tarot whatsapp={content.whatsapp} />;
      case 'joias': return <Joias whatsapp={content.whatsapp} />;
      case 'blog': return <Blog posts={content.blogPosts} onAddComment={handleAddComment} />;
      case 'sobre': return <Sobre content={content.sobre} whatsapp={content.whatsapp} />;
      case 'faq': return <FAQ content={content} />;
      case 'admin': return <Admin currentContent={content} onSave={handleSaveContent} />;
      default: return <Home onNavigate={setCurrentPage} content={content.home} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-[#283D3B] selection:bg-[#D9BCAF] selection:text-[#283D3B]">
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#011627] flex flex-col items-center justify-center space-y-8 text-white animate-in fade-in zoom-in duration-300">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-2 hover:rotate-90 transition-transform">
            <X size={36} strokeWidth={1.5} />
          </button>
          {NAVIGATION.map((item) => (
            <button
              key={item.target}
              onClick={() => {
                setCurrentPage(item.target);
                setIsMenuOpen(false);
              }}
              className="text-3xl font-serif hover:text-[#D9BCAF] transition-all tracking-wide"
            >
              {item.name}
            </button>
          ))}
          <a
            href={content.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#D9BCAF] text-[#283D3B] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm"
          >
            Acessar Portal <ExternalLink size={16} />
          </a>
        </div>
      )}

      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onMenuOpen={() => setIsMenuOpen(true)}
        portalUrl={content.portalUrl}
      />
      
      <main className="flex-grow pt-20">
        {renderPage()}
      </main>

      {currentPage !== 'admin' && content.instagram.showFeed && (
        <InstagramFeed handle={content.instagram.handle} url={content.instagram.url} />
      )}

      <Footer onNavigate={setCurrentPage} />

      <a
        href={`https://wa.me/${content.whatsapp}?text=Olá Lili, gostaria de iniciar minha jornada.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale comigo no WhatsApp"
        className="fixed bottom-6 right-6 z-[50] bg-[#283D3B] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <span className="absolute right-full mr-4 bg-[#283D3B] text-white text-xs py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">Fale com a Arquiteta</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </div>
  );
};

export default App;
