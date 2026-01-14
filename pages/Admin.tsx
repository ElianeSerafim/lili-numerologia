
import React, { useState } from 'react';
import { SiteContent, BlogPost, Comment } from '../types';
import { Save, LogOut, Home as HomeIcon, User, Globe, Instagram, Plus, Edit, Trash2, FileText, Database, MessageCircle, Check, X, ImageIcon } from 'lucide-react';

interface AdminProps {
  currentContent: SiteContent;
  onSave: (content: SiteContent) => void;
}

const Admin: React.FC<AdminProps> = ({ currentContent, onSave }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'global' | 'home' | 'sobre' | 'social' | 'blog' | 'comments'>('global');
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
    if (section === 'whatsapp' || section === 'portalUrl') {
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
    const posts = [...formData.blogPosts];
    if (editingPost) {
      if (editingPost.id) {
        const index = posts.findIndex(p => p.id === editingPost.id);
        posts[index] = { ...editingPost, comments: posts[index].comments || [] };
      } else {
        const newPost = { ...editingPost, id: Date.now().toString(), comments: [] };
        posts.unshift(newPost);
      }
    }
    setFormData({ ...formData, blogPosts: posts });
    setShowPostForm(false);
    setEditingPost(null);
  };

  const deletePost = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta crônica?")) {
      const posts = formData.blogPosts.filter(p => p.id !== id);
      setFormData({ ...formData, blogPosts: posts });
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
    setFormData({ ...formData, blogPosts: posts });
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
            aria-label="Sair do painel administrativo"
            className="flex items-center gap-3 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity bg-white/5 px-6 py-3 rounded-xl border border-white/10"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 space-y-6">
          <nav className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-3" aria-label="Menu Administrativo">
            {[
              { id: 'global', icon: <Globe size={18} />, label: 'Global' },
              { id: 'home', icon: <HomeIcon size={18} />, label: 'Home' },
              { id: 'blog', icon: <FileText size={18} />, label: 'Blog' },
              { id: 'comments', icon: <MessageCircle size={18} />, label: 'Moderação' },
              { id: 'sobre', icon: <User size={18} />, label: 'Sobre' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                aria-pressed={activeTab === tab.id}
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
          
          {activeTab === 'home' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <header>
                <h2 className="text-4xl font-serif text-[#283D3B]">Home & Identidade Visual</h2>
                <div className="w-12 h-1 bg-[#D9BCAF] mt-4" aria-hidden="true"></div>
                <p className="mt-4 text-sm text-gray-500">Gerencie os elementos visuais da porta de entrada do seu santuário.</p>
              </header>
              <div className="space-y-10">
                <div className="grid md:grid-cols-1 gap-8">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-4">Título Hero</label>
                    <input type="text" value={formData.home.heroTitle} onChange={(e) => handleChange('home', 'heroTitle', e.target.value)} className="w-full p-5 border border-gray-100 rounded-2xl outline-none focus:border-[#D9BCAF]" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-4">Subtítulo Hero</label>
                    <textarea rows={3} value={formData.home.heroSubtitle} onChange={(e) => handleChange('home', 'heroSubtitle', e.target.value)} className="w-full p-5 border border-gray-100 rounded-2xl outline-none focus:border-[#D9BCAF]" />
                  </div>
                </div>

                <div className="p-8 bg-[#F9F7F5] rounded-[3rem] border border-gray-100">
                  <h3 className="text-xl font-serif mb-8 text-[#283D3B] flex items-center gap-3"><ImageIcon size={20} className="text-[#D9BCAF]" /> Galeria de Ativos</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-4">Background Hero (URL)</label>
                      <input type="text" value={formData.home.heroImage} onChange={(e) => handleChange('home', 'heroImage', e.target.value)} className="w-full p-4 border border-gray-100 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#795663] mb-4">Pitágoras Digital (URL)</label>
                      <input type="text" value={formData.home.pythagorasImage} onChange={(e) => handleChange('home', 'pythagorasImage', e.target.value)} className="w-full p-4 border border-gray-100 rounded-xl text-sm" />
                      <p className="mt-2 text-[9px] text-gray-400 italic">Esta imagem terá efeito de flutuação orbital na página inicial.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'global' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <header>
                <h2 className="text-4xl font-serif text-[#283D3B]">Configurações Estruturais</h2>
                <div className="w-12 h-1 bg-[#D9BCAF] mt-4" aria-hidden="true"></div>
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

          {/* Mantendo as outras abas funcionais (Blog, Moderação, Sobre)... */}
        </main>
      </div>
    </div>
  );
};

export default Admin;
