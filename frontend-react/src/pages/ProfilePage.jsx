import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, BookOpen, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { getUserProfile } from '../services/api';
import Tape from '../components/ui/Tape';
import Sparkle from '../components/ui/Sparkle';
import Badge from '../components/ui/Badge';
import Stamp from '../components/ui/Stamp';

const ProfilePage = () => {
  // 1. Extrai o parâmetro dinâmico da URL (definido na rota como :userId)
  const { userId } = useParams();
  
  // 2. Hook para navegação programática (redirecionar se necessário)
  const navigate = useNavigate();

  // 3. Estados locais do componente
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Função assíncrona para buscar os dados do usuário na API
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Chamada à API via Axios passando o userId extraído da URL
        const data = await getUserProfile(userId);
        setUserData(data.usuario || data);
      } catch (err) {
        console.warn('API não retornou perfil, verificando dados locais de fallback...', err);

        // Fallback didático: caso a rota da API ainda não esteja criada no backend,
        // verifica se o ID da URL corresponde ao usuário logado no localStorage
        const localUserRaw = localStorage.getItem('plural_user');
        if (localUserRaw) {
          const localUser = JSON.parse(localUserRaw);
          const currentId = String(localUser.id || localUser.usuario_id || localUser._id);
          
          if (currentId === String(userId)) {
            setUserData({
              ...localUser,
              criado_em: localUser.criado_em || new Date().toISOString(),
              interesses: localUser.interesses || ['Cinema', 'Literatura', 'Música']
            });
            return;
          }
        }

        // Se realmente não encontrar nem na API nem no fallback
        setError('Assinante não encontrado em nossa base editorial.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  // ✦ CENÁRIO 1: ESTADO DE CARREGAMENTO (LOADING)
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Loader2 size={36} className="text-red-editorial animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-gray-editorial">
          Carregando ficha do assinante #{userId}...
        </p>
      </div>
    );
  }

  // ✦ CENÁRIO 2: USUÁRIO NÃO ENCONTRADO / ERRO
  if (error || !userData) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-cream-light border-2 border-graphite p-8 sm:p-12 shadow-[8px_8px_0_0_#111] relative">
          <Tape variant="yellow" className="-top-3 left-1/2 -translate-x-1/2 w-28 h-6" />
          <Stamp text="NÃO<br/>LOCALIZADO" color="red" size="md" className="relative mx-auto mb-6 transform -rotate-6" />

          <h2 className="font-serif font-black text-2xl sm:text-3xl text-graphite mb-3">
            Assinante Inexistente
          </h2>
          <p className="text-gray-editorial text-sm font-sans mb-8">
            {error || 'Não encontramos nenhum registro associado a este identificador editorial.'}
          </p>

          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-2 bg-graphite text-white font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-red-editorial transition-colors"
          >
            <ArrowLeft size={16} /> Retornar ao Feed
          </button>
        </div>
      </div>
    );
  }

  // ✦ CENÁRIO 3: PERFIL CARREGADO COM SUCESSO
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Botão de navegação de volta */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite hover:text-red-editorial transition-colors font-bold"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
      </div>

      {/* Cartão Editorial do Perfil */}
      <div className="bg-cream-light border-2 border-graphite p-6 sm:p-10 shadow-[8px_8px_0_0_#111] relative">
        <Tape variant="blue" className="-top-4 right-10 w-28 h-7 rotate-3" />
        
        {/* Cabeçalho do Perfil */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-gray-300/60 pb-8 mb-8">
          <div className="flex items-center gap-5">
            {/* Avatar / Inicial Estilizada */}
            <div className="w-20 h-20 bg-graphite text-white border-2 border-graphite flex items-center justify-center font-serif font-bold text-3xl shadow-[4px_4px_0_0_#C8102E]">
              {userData.nome ? userData.nome.charAt(0).toUpperCase() : <User size={32} />}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="filled">ASSINANTE OFICIAL</Badge>
                <Sparkle className="text-red-editorial text-sm" />
              </div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-graphite tracking-tight">
                {userData.nome || 'Leitor Lumina'}
              </h1>
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-1">
                Matrícula: #{userId}
              </p>
            </div>
          </div>

          <Stamp text="REGISTRO<br/>ATIVO" color="black" size="sm" className="hidden sm:flex" />
        </div>

        {/* Ficha de Dados do Assinante */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="border border-graphite p-4 bg-white/60">
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-editorial font-bold block mb-1">
              Contato Editorial
            </span>
            <p className="text-graphite font-sans font-medium flex items-center gap-2 text-sm">
              <Mail size={16} className="text-gray-400" />
              {userData.email}
            </p>
          </div>

          <div className="border border-graphite p-4 bg-white/60">
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-editorial font-bold block mb-1">
              Membro Desde
            </span>
            <p className="text-graphite font-sans font-medium flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-400" />
              {userData.criado_em 
                ? new Date(userData.criado_em).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
                : 'Ano Corrente'}
            </p>
>>>>>>> ff41acb288869092937bea1f11b6bbaa65dbb5b8
          </div>

        </div>

<<<<<<< HEAD
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
=======
        {/* Interesses Culturais */}
        <div className="border-t border-gray-300/60 pt-6">
          <h3 className="font-serif font-bold text-lg text-graphite mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-red-editorial" />
            Interesses Culturais & Curadoria
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {(userData.interesses && userData.interesses.length > 0 
              ? userData.interesses 
              : ['Teatro', 'Cinema', 'Literatura', 'Crítica de Arte']).map((interesse, idx) => (
                <span
                  key={idx}
                  className="bg-cream border border-graphite px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-graphite font-bold shadow-[2px_2px_0_0_#111]"
                >
                  {interesse}
                </span>
            ))}
          </div>
        </div>

        {/* Ações da Conta */}
        <div className="mt-10 pt-6 border-t border-gray-300/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono uppercase">
            <ShieldCheck size={16} className="text-green-600" />
            Sessão criptografada via JWT
          </div>

          <button
            onClick={() => navigate('/home')}
            className="bg-red-editorial text-white font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-red-strong shadow-[4px_4px_0_0_#111] transition-all"
          >
            Explorar Novas Edições →
          </button>
        </div>

      </div>

>>>>>>> ff41acb288869092937bea1f11b6bbaa65dbb5b8
    </div>
  );
};

export default ProfilePage;

