import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { User, Mail, Calendar, BookOpen, PlusCircle, LogOut, ArrowLeft, Heart, Sparkles } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { posts } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const userRaw = localStorage.getItem('plural_user');
    if (userRaw) {
      try {
        setUser(JSON.parse(userRaw));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('plural_token');
    localStorage.removeItem('plural_user');
    navigate('/login');
  };

  const userName = user?.nome || user?.email || 'Leitor Editorial';
  const userEmail = user?.email || 'email@exemplo.com';
  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  // Filtra as publicações do usuário (por usuario_id ou autor)
  const userPosts = posts ? posts.filter(p => {
    if (!user) return false;
    return p.usuario_id === user.id || p.usuarioId === user.id || (p.autor && p.autor.toLowerCase() === userName.toLowerCase());
  }) : [];

  return (
    <div className="w-full bg-[#F9F6F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Topo / Voltar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-300">
          <Link 
            to="/home" 
            className="text-xs font-mono uppercase font-bold tracking-widest text-graphite hover:text-red-editorial transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> VOLTAR AO FEED
          </Link>
          <span className="text-[11px] font-mono tracking-widest text-gray-500 uppercase">
            PAINEL DO LEITOR
          </span>
        </div>

        {/* Card Principal do Perfil */}
        <div className="bg-white border-2 border-graphite shadow-[6px_6px_0_0_#1A1A1A] p-6 sm:p-10 mb-12 relative">
          
          {/* Fita Adesiva Decorativa */}
          <div className="absolute -top-3 left-12 w-20 h-6 bg-white/70 border border-white/80 shadow-sm backdrop-blur-[1px] -rotate-1 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-200">
            
            {/* Avatar & Nome */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-graphite text-white flex items-center justify-center font-serif font-black text-2xl border-2 border-graphite shadow-[3px_3px_0_0_#C8382B]">
                {userInitials}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="font-serif font-black text-2xl sm:text-3xl text-graphite">
                    {userName}
                  </h1>
                  <span className="bg-red-editorial text-white font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase">
                    COLABORADOR
                  </span>
                </div>
                
                <p className="font-sans text-xs text-gray-500 flex items-center gap-1.5">
                  <Mail size={13} className="text-gray-400" />
                  {userEmail}
                </p>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/novoPost')}
                className="bg-red-editorial hover:bg-red-strong text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm flex items-center gap-1.5 shadow-[2px_2px_0_0_#1A1A1A] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                <PlusCircle size={15} />
                NOVA RESENHA
              </button>

              <button
                onClick={handleLogout}
                className="border-2 border-graphite bg-white hover:bg-gray-100 text-graphite font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm flex items-center gap-1.5 transition-colors"
                title="Sair da Conta"
              >
                <LogOut size={15} />
                SAIR
              </button>
            </div>

          </div>

          {/* Métricas / Estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="border border-gray-200 p-4 bg-[#FAF9F5]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">
                Suas Publicações
              </span>
              <p className="font-serif font-black text-3xl text-graphite">
                {userPosts.length}
              </p>
              <span className="text-[11px] font-sans text-gray-500">resenhas ativas no ar</span>
            </div>

            <div className="border border-gray-200 p-4 bg-[#FAF9F5]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">
                Comunidade
              </span>
              <p className="font-serif font-black text-3xl text-red-editorial flex items-center gap-2">
                <Sparkles size={24} />
                VIP
              </p>
              <span className="text-[11px] font-sans text-gray-500">acesso a todas as edições</span>
            </div>

            <div className="border border-gray-200 p-4 bg-[#FAF9F5]">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">
                Membro Desde
              </span>
              <p className="font-serif font-black text-3xl text-graphite flex items-center gap-2">
                <Calendar size={22} className="text-gray-400" />
                2026
              </p>
              <span className="text-[11px] font-sans text-gray-500">ano de ingresso</span>
            </div>
          </div>

        </div>

        {/* Seção: Minhas Publicações */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-300">
            <h2 className="font-serif font-black text-2xl text-graphite">
              Minhas Resenhas Publicadas
            </h2>
            <span className="font-mono text-xs text-gray-500">
              {userPosts.length} post(s)
            </span>
          </div>

          {userPosts.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 p-10 text-center space-y-4">
              <BookOpen size={36} className="mx-auto text-gray-400" />
              <h3 className="font-serif font-bold text-xl text-graphite">
                Você ainda não tem resenhas cadastradas
              </h3>
              <p className="font-sans text-sm text-gray-500 max-w-md mx-auto">
                Compartilhe suas análises críticas sobre cinema, literatura, música ou tecnologia com os leitores da Lumina.
              </p>
              <button
                onClick={() => navigate('/novoPost')}
                className="bg-red-editorial text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm shadow-[2px_2px_0_0_#1A1A1A] inline-flex items-center gap-2"
              >
                <PlusCircle size={15} /> Escrever Primeira Resenha
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map(post => (
                <div 
                  key={post.id}
                  className="bg-white border-2 border-graphite shadow-[4px_4px_0_0_#1A1A1A] p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="bg-black text-white font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase mb-3 inline-block">
                      {post.categoria || 'RESENHA'}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-graphite leading-tight mb-2 line-clamp-2">
                      {post.titulo}
                    </h4>
                    <p className="font-sans text-xs text-gray-600 line-clamp-2 mb-4">
                      {post.resumo || post.conteudo}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400">
                      ID #{post.id}
                    </span>
                    <Link
                      to={`/post/${post.id}`}
                      className="font-mono text-xs font-bold uppercase tracking-wider text-red-editorial hover:underline"
                    >
                      VER ARTIGO →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default ProfilePage;

