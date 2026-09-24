import React, { useState, useEffect } from 'react';
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
          </div>

        </div>

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

    </div>
  );
};

export default ProfilePage;

