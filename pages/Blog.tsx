
import React, { useState } from 'react';
import { BlogPost, Comment } from '../types';
import { ArrowLeft, Clock, User, Share2, Send, MessageCircle, Search, X } from 'lucide-react';

interface BlogProps {
  posts: BlogPost[];
  onAddComment: (postId: string, comment: Comment) => void;
}

const Blog: React.FC<BlogProps> = ({ posts, onAddComment }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: commentName,
      text: commentText,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'pending'
    };

    onAddComment(selectedPost.id, newComment);
    setCommentName('');
    setCommentText('');
    setCommentSubmitted(true);
    
    setTimeout(() => setCommentSubmitted(false), 5000);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPost) {
    const approvedComments = (selectedPost.comments || []).filter(c => c.status === 'approved');

    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
        <article className="max-w-4xl mx-auto px-6 pt-16">
          <button 
            onClick={() => {
              setSelectedPost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-[#795663] text-xs uppercase tracking-[0.3em] font-bold hover:gap-5 transition-all mb-16"
          >
            <ArrowLeft size={16} /> Voltar para o Diário
          </button>

          <header className="mb-16">
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black text-[#8A9688] mb-8">
              <span className="flex items-center gap-2"><Clock size={12} /> {selectedPost.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#D9BCAF]"></span>
              <span className="flex items-center gap-2"><User size={12} /> {selectedPost.author}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-[#283D3B] leading-tight mb-12">
              {selectedPost.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-[#283D3B]/70 leading-relaxed italic border-l-4 border-[#D9BCAF] pl-10 mb-16">
              {selectedPost.excerpt}
            </p>
            <div className="aspect-video w-full overflow-hidden rounded-[3rem] shadow-2xl">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>
          </header>

          <div className="prose prose-xl max-w-none text-[#283D3B]/80 font-light leading-relaxed space-y-8 whitespace-pre-wrap mb-24">
            {selectedPost.content}
          </div>

          {/* Seção de Comentários */}
          <section className="border-t border-[#8A968815] pt-16">
            <div className="flex items-center gap-4 mb-12">
              <MessageCircle size={28} className="text-[#D9BCAF]" />
              <h3 className="text-3xl font-serif text-[#283D3B]">Diálogos ({approvedComments.length})</h3>
            </div>

            {/* Lista de Comentários */}
            <div className="space-y-12 mb-20">
              {approvedComments.map((comment) => (
                <div key={comment.id} className="bg-[#F9F7F5] p-8 rounded-[2rem] border border-[#8A968805]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-serif text-lg text-[#795663]">{comment.author}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#8A9688]">{comment.date}</span>
                  </div>
                  <p className="text-[#283D3B]/70 font-light leading-relaxed italic">"{comment.text}"</p>
                </div>
              ))}
              {approvedComments.length === 0 && (
                <p className="text-[#8A9688] font-light italic">Seja a primeira a iniciar este diálogo.</p>
              )}
            </div>

            {/* Formulário de Comentário */}
            <div className="bg-white p-10 rounded-[3rem] border border-[#D9BCAF20] shadow-sm">
              <h4 className="text-xl font-serif mb-8 text-[#283D3B]">Deixe sua percepção</h4>
              
              {commentSubmitted ? (
                <div className="bg-[#8A968810] p-6 rounded-2xl text-[#283D3B] text-center animate-in zoom-in-95">
                  <p className="font-serif italic mb-2">Sua mensagem foi enviada para o portal da Lili.</p>
                  <p className="text-xs uppercase tracking-widest text-[#8A9688]">Ela será publicada após uma breve revisão energética.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitComment} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      placeholder="Seu Nome" 
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full p-4 rounded-xl bg-[#FDFDFD] border border-gray-100 focus:border-[#D9BCAF] outline-none transition-all"
                    />
                  </div>
                  <textarea 
                    placeholder="Sua reflexão sobre esta crônica..." 
                    required
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-4 rounded-xl bg-[#FDFDFD] border border-gray-100 focus:border-[#D9BCAF] outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    className="flex items-center gap-3 bg-[#011627] text-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold btn-hover"
                  >
                    Enviar Diálogo <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </section>

          <footer className="mt-24 pt-12 border-t border-[#8A968815] flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#011627] text-[#D9BCAF] rounded-full flex items-center justify-center font-serif text-xl font-bold">L</div>
                <div>
                  <p className="text-sm font-bold text-[#283D3B] uppercase tracking-widest">Escrito por Lili</p>
                  <p className="text-xs text-[#8A9688] uppercase tracking-widest">Arquiteta da Alma & Dev</p>
                </div>
             </div>
             <button className="p-4 bg-[#8A968805] hover:bg-[#8A968815] rounded-full transition-all text-[#283D3B]">
                <Share2 size={20} />
             </button>
          </footer>
        </article>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-1000 pb-32">
      <section className="bg-[#8A968810] py-20 border-b border-[#8A968815]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#795663] text-[10px] uppercase tracking-[0.5em] font-black mb-6 block">Crônicas Estratégicas</span>
          <h1 className="text-5xl md:text-[8rem] font-serif text-[#283D3B] leading-[0.9] tracking-tighter mb-8">O Diário da Arquiteta</h1>
          <p className="text-xl md:text-3xl font-light text-[#283D3B]/70 max-w-3xl mx-auto leading-relaxed mb-12">
            Explorações sobre numerologia, tarot, tecnologia e a arte de prosperar com intenção.
          </p>

          {/* Barra de Busca Premium */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search size={18} className="text-[#8A9688] transition-colors group-focus-within:text-[#795663]" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar crônicas por palavras-chave..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-sm border border-[#D9BCAF40] rounded-full py-5 pl-16 pr-16 text-sm font-light outline-none focus:border-[#795663] focus:ring-4 focus:ring-[#79566310] transition-all shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-6 flex items-center text-[#8A9688] hover:text-[#795663] transition-colors"
                aria-label="Limpar busca"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="group cursor-pointer flex flex-col"
                onClick={() => {
                  setSelectedPost(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] mb-10 shadow-lg group-hover:shadow-2xl transition-all duration-700">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                  />
                </div>
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-black text-[#8A9688] mb-6">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#D9BCAF]"></span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-3xl font-serif text-[#283D3B] mb-6 group-hover:text-[#795663] transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-[#283D3B]/60 font-light leading-relaxed mb-10 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-6 text-[#795663] text-[10px] uppercase tracking-[0.4em] font-black">
                  Ler Dossiê <div className="w-12 h-px bg-[#D9BCAF] group-hover:w-20 transition-all duration-700"></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-[#F9F7F5] rounded-full flex items-center justify-center mx-auto mb-8">
              <Search size={32} className="text-[#D9BCAF]" />
            </div>
            <h3 className="text-2xl font-serif text-[#283D3B] mb-4">Nenhuma crônica encontrada</h3>
            <p className="text-[#8A9688] font-light max-w-md mx-auto leading-relaxed">
              Não encontramos resultados para "<span className="font-bold text-[#795663]">{searchTerm}</span>". Tente utilizar termos mais genéricos ou verifique a grafia.
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-10 text-[10px] uppercase tracking-widest font-bold text-[#795663] border-b border-[#D9BCAF] pb-1 hover:text-[#283D3B] transition-colors"
            >
              Ver todas as crônicas
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
