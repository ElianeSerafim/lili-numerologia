
import React, { useState } from 'react';
import { SiteContent, BlogPost, Comment, PricingItem, MapaBenefit } from '../types';
import { Save, LogOut, Home as HomeIcon, User, Globe, Plus, Trash2, FileText, Database, MessageCircle, ImageIcon, CreditCard, Layout, Edit, X, Check } from 'lucide-react';

interface AdminProps {
  currentContent: SiteContent;
  onSave: (content: SiteContent) => void;
}

const Admin: React.FC<AdminProps> = ({ currentContent, onSave }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'global' | 'home' | 'mapa' | 'sobre' | 'blog' | 'comments'>('global');
  const [formData, setFormData] = useState<SiteContent>(currentContent);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'portal-da-arquiteta@acesso.com.br' && password === 'Bdigital@2025') {
      setIsLoggedIn(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert("Credenciais inválidas");
    }
  };

  const handleChange = (section: keyof SiteContent, field: string, value: any) => {
    if (section === 'whatsapp' || section === 'portalUrl' || section === 'pricingPlans' || section === 'blogPosts') {
      setFormData({ ...formData, [section]: value });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...(formData[section] as any),
          [field]: value
        }
      });
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const posts = [...formData.blogPosts];
    if (editingPost.id) {
      const index = posts.findIndex(p => p.id === editingPost.id);
      posts[index] = { ...editingPost, comments: posts[index].comments || [] };
    } else {
      const newPost = { 
        ...editingPost, 
        id: Date.now().toString(), 
        comments: [],
        date: editingPost.date || new Date().toLocaleDateString('pt-BR')
      };
      posts.unshift(newPost);
    }

    handleChange('blogPosts', '', posts);
    setShowPostForm(false);
    setEditingPost(null);
  };

  const deletePost = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta crônica?")) {
      const posts = formData.blogPosts.filter(p => p.id !== id);
      handleChange('blogPosts', '', posts);
    }
  };

  const updateCommentStatus = (postId: string, commentId: string, status: 'approved' | 'rejected') => {
    const posts = formData.blogPosts.map(post => {
      if (post.id === postId) {
        if (status === 'rejected') {
          return {
            ...post,
            comments: (post.comments || []).filter(c => c.id !== commentId)
          };
        }
        return {
          ...post,
          comments: (post.comments || []).map(c => 
            c.id === commentId ? { ...c, status: 'approved' } : c
          )
        };
      }
      return post;
    });
    handleChange('blogPosts', '', posts);
  };

  const triggerSave = () => {
    onSave(formData);
    const toast = document.createElement('div');
    toast.className = "fixed top-10 right-10 bg-[#283D3B] text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] animate-in fade-in slide-in-from-right-10";
    toast.innerHTML = "<div class='flex items-center gap-3'><svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'></polyline></svg> Dossiê Atualizado com Sucesso!</div>";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const allPendingComments = formData.blogPosts.flatMap(post => 
    (post.comments || [])
      .filter(c => c.status === 'pending')
      .map(c => ({ ...c, postId: post.id, postTitle: post.title }))
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F9F7F5] px-6 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[#011627] text-[#D9BCAF] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Database size={32} />
            </div>
            <h1 className="text-3xl font-serif mb-2 text-[#283D3B]">Painel da Arquiteta</h1>
            <p className="text-sm text-[#8A9688] font-light tracking-widest uppercase">Segurança de Acesso</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label htmlFor="admin-email" className="block text-[10px] uppercase tracking-widest font-black text-gray-400 mb-3">Identificação de Acesso</label>
              <input 
                id="admin-email"
                type="email" 
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#795663] outline-none transition-all bg-gray-50/50"
                placeholder="portal-da-arquiteta@acesso.com.br"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-[10px] uppercase tracking-widest font-black text-gray-400 mb-3">Chave de Segurança</label>
              <input 
                id="admin-password"
                type="password" 
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#795663] outline-none transition-all bg-gray-50/50"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#011627] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs btn-hover shadow-xl"
            >
              Entrar no Santuário
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32 animate-in fade-in duration-700">
      <div className="bg-[#011627] text-white py-10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-[#D9BCAF] text-[#011627] rounded-2xl flex items-center justify-center font-bold font-serif text-xl">L</div>
            <div>
              <h1 className="text-2xl font-serif tracking-wide">Interface de Governança</h1>
              <p className="text-[10px] text-[#D9BCAF] uppercase tracking-[0.3em] font-bold">Gerenciamento Estratégico</p>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-3 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity bg-white/5 px-6 py-3 rounded-xl border border-white/10"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 space-y-6">
          <nav className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-3">
            {[
              { id: 'global', icon: <Globe size={18} />, label: 'Global' },
              { id: 'home', icon: <HomeIcon size={18} />, label: 'Home' },
              { id: 'mapa', icon: <CreditCard size={18} />, label: 'Página do Mapa' },
              { id: 'blog', icon: <FileText size={18} />, label: 'Blog' },
              { id: 'comments', icon: <MessageCircle size={18} />, label: 'Moderação' },
              { id: 'sobre', icon: <User size={18} />, label: 'Sobre' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl text-[11px] uppercase tracking-widest font-black transition-all ${activeTab === tab.id ? 'bg-[#283D3B] text-white shadow-2xl' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  {tab.icon} {tab.label}
                </div>
                {tab.id === 'comments' && allPendingComments.length > 0 && (
                  <span className="bg-[#D9BCAF] text-[#011627] w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                    {allPendingComments.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
          
          <button 
            onClick={triggerSave}
            className="w-full flex items-center justify-center gap-4 bg-[#795663] text-white px-6 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            <Save size={20} /> Salvar Tudo
          </button>
        </aside>

        <main className="lg:col-span-9 bg-white p-10 md:p-16 rounded-[4rem] shadow-sm border border-gray-100">
          
          {activeTab === 'blog' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <header className="flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-serif text-[#283D3B]">Diário da Arquiteta</h2>
                  <div className="w-12 h-1 bg-[#D9BCAF] mt-4"></div>
                </div>
                {!showPostForm && (
                  <button 
                    onClick={() => {
                      setEditingPost({ id: '', title: '', excerpt: '', content: '', image: '', date: new Date().toLocaleDateString('pt-BR'), author: 'Lili' });
                      setShowPostForm(true);
                    }}
                    className="flex items-center gap-2 bg-[#283D3B] text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold btn-hover"
                  >
                    <Plus size={16} /> Nova Crônica
                  </button>
                )}
              </header>

              {showPostForm ? (
                <form onSubmit={handlePostSubmit} className="space-y-8 bg-gray-50 p-8 rounded-[3rem] border border-gray-100 animate-in zoom-in-95">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-3">Título</label>
                      <input 
                        type="text" 
                        required 
                        value={editingPost?.title} 
                        onChange={(e) => setEditingPost({ ...editingPost!, title: e.target.value })}
                        className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#D9BCAF]" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-3">Capa (URL Image)</label>
                      <input 
                        type="text" 
                        required 
                        value={editingPost?.image} 
                        onChange={(e) => setEditingPost({ ...editingPost!, image: e.target.value })}
                        className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#D9BCAF]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-3">Resumo (Excerpt)</label>
                    <textarea 
                      rows={2} 
                      required 
                      value={editingPost?.excerpt} 
                      onChange={(e) => setEditingPost({ ...editingPost!, excerpt: e.target.value })}
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#D9BCAF]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-3">Conteúdo Completo</label>
                    <textarea 
                      rows={10} 
                      required 
                      value={editingPost?.content} 
                      onChange={(e) => setEditingPost({ ...editingPost!, content: e.target.value })}
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-[#D9BCAF]" 
                    />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="bg-[#283D3B] text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold btn-hover flex items-center gap-2">
                      <Save size={16} /> {editingPost?.id ? 'Atualizar' : 'Publicar'}
                    </button>
                    <button type="button" onClick={() => setShowPostForm(false)} className="bg-gray-200 text-gray-700 px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-gray-300">
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid gap-6">
                  {formData.blogPosts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:border-[#D9BCAF20] transition-all">
                      <div className="flex items-center gap-6">
                        <img src={post.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="" />
                        <div>
                          <h3 className="font-serif text-lg text-[#283D3B]">{post.title}</h3>
                          <p className="text-[10px] uppercase tracking-widest text-[#8A9688]">{post.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => { setEditingPost(post); setShowPostForm(true); }} className="p-3 text-[#283D3B] hover:bg-[#D9BCAF20] rounded-xl transition-all">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => deletePost(post.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {formData.blogPosts.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                      <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-400 font-light">Nenhuma crônica publicada ainda.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <header>
                <h2 className="text-4xl font-serif text-[#283D3B]">Moderação de Diálogos</h2>
                <div className="w-12 h-1 bg-[#D9BCAF] mt-4"></div>
                <p className="mt-4 text-sm text-gray-500">Aprove ou rejeite comentários para manter a harmonia vibracional do blog.</p>
              </header>

              <div className="grid gap-6">
                {allPendingComments.map((comment) => (
                  <div key={comment.id} className="p-8 bg-white border-l-4 border-[#D9BCAF] rounded-r-[2rem] shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="font-serif text-xl text-[#283D3B]">{comment.author}</span>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#8A9688] mt-1">
                          Em: <span className="font-bold text-[#795663]">{comment.postTitle}</span> • {comment.date}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => updateCommentStatus(comment.postId!, comment.id, 'approved')}
                          className="flex items-center gap-2 bg-[#283D3B] text-white px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-black btn-hover"
                        >
                          <Check size={14} /> Aprovar
                        </button>
                        <button 
                          onClick={() => updateCommentStatus(comment.postId!, comment.id, 'rejected')}
                          className="flex items-center gap-2 bg-red-50 text-red-500 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-black hover:bg-red-100 transition-all"
                        >
                          <X size={14} /> Rejeitar
                        </button>
                      </div>
                    </div>
                    <p className="text-[#283D3B]/70 font-light italic leading-relaxed bg-[#F9F7F5] p-6 rounded-2xl">
                      "{comment.text}"
                    </p>
                  </div>
                ))}
                {allPendingComments.length === 0 && (
                  <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                    <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-400 font-light">Não há diálogos pendentes de revisão.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'global' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <header>
                <h2 className="text-4xl font-serif text-[#283D3B]">Configurações Estruturais</h2>
                <div className="w-12 h-1 bg-[#D9BCAF] mt-4"></div>
              </header>
              <div className="grid gap-12">
                <div>
                  <label htmlFor="wa-link" className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-4">WhatsApp de Contato</label>
                  <input id="wa-link" type="text" value={formData.whatsapp} onChange={(e) => handleChange('whatsapp', '', e.target.value)}
                    className="w-full p-6 rounded-[1.5rem] border border-gray-100 bg-gray-50/50 outline-none text-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="portal-link" className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-4">Link do Portal</label>
                  <input id="portal-link" type="url" value={formData.portalUrl} onChange={(e) => handleChange('portalUrl', '', e.target.value)}
                    className="w-full p-6 rounded-[1.5rem] border border-gray-100 bg-gray-50/50 outline-none text-xl focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Outras abas simplificadas para o contexto do exemplo */}
          {activeTab === 'home' && <div className="p-10 text-center text-gray-400">Edição da Home via Dossiê...</div>}
          {activeTab === 'mapa' && <div className="p-10 text-center text-gray-400">Gestão da Página do Mapa...</div>}
          {activeTab === 'sobre' && <div className="p-10 text-center text-gray-400">Gestão da Biografia...</div>}

        </main>
      </div>
    </div>
  );
};

export default Admin;
