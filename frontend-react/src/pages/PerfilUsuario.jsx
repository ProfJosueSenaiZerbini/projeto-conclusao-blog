import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Calendar, BookOpen, ShieldCheck, ArrowLeft, Loader2, User } from 'lucide-react';
import { getUserProfile } from '../services/api';
import Tape from '../components/ui/Tape';
import Badge from '../components/ui/Badge';
import Stamp from '../components/ui/Stamp';

const PerfilUsuario = () => {
  // 1. Hook do React Router v6 para extrair o parâmetro :userId definido na rota
  const { userId } = useParams();
  
  // 2. Hook para navegação programática
  const navigate = useNavigate();

  // 3. Estados locais da página
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Função assíncrona que busca os dados do usuário com base no ID da URL
    const carregarPerfil = async () => {
      try {
        setLoading(true);
        setError(null);

        // Chamada à API com Axios passando o identificador extraído
        const response = await getUserProfile(userId);
        setUsuario(response.usuario || response);
      } catch (err) {
        console.warn('Erro ao buscar na API. Tentando fallback local...', err);

        // Fallback para testes/desenvolvimento caso o backend ainda não possua rota /users/:id
        const localUserRaw = localStorage.getItem('plural_user');
        if (localUserRaw) {
          const localUser = JSON.parse(localUserRaw);
          const currentId = String(localUser.id || localUser.usuario_id || localUser._id || '1');
          
          if (currentId === String(userId)) {
            setUsuario(localUser);
            return;
          }
        }

        setError('Não foi possível localizar o cadastro deste usuário.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      carregarPerfil();
    }
  }, [userId]);

  // ✦ CENÁRIO 1: CARREGANDO DADOS (LOADING)
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <Loader2 size={36} className="text-red-editorial animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
          Carregando dados da conta #{userId}...
        </p>
      </div>
    );
  }

  // ✦ CENÁRIO 2: USUÁRIO NÃO ENCONTRADO / ERRO (404)
  if (error || !usuario) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-cream-light border-2 border-graphite p-8 sm:p-12 shadow-[8px_8px_0_0_#111] relative">
          <Tape variant="yellow" className="-top-3 left-1/2 -translate-x-1/2 w-28 h-6" />
          <Stamp text="NÃO<br/>LOCALIZADO" color="red" size="md" className="relative mx-auto mb-6 transform -rotate-6" />

          <h2 className="font-serif font-black text-2xl sm:text-3xl text-graphite mb-2">
            Usuário Inexistente
          </h2>
          <p className="text-gray-editorial text-sm font-sans mb-8">
            {error || 'Nenhum perfil associado a este ID foi encontrado.'}
          </p>

          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-2 bg-graphite text-white font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-red-editorial transition-colors"
          >
            <ArrowLeft size={16} /> Voltar para o Início
          </button>
        </div>
      </div>
    );
  }

  // ✦ CENÁRIO 3: PERFIL ENCONTRADO E RENDERIZADO COM SUCESSO
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Botão de retorno */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite hover:text-red-editorial transition-colors font-bold"
      >
        <ArrowLeft size={16} /> Voltar
      </button>

      {/* Cartão de Identificação do Usuário */}
      <div className="bg-cream-light border-2 border-graphite p-6 sm:p-10 shadow-[8px_8px_0_0_#111] relative">
        <Tape variant="blue" className="-top-4 right-8 w-28 h-7 rotate-2" />

        {/* Topo: Avatar e Nome */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-gray-300/60 pb-8 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-graphite text-white border-2 border-graphite flex items-center justify-center font-serif font-bold text-3xl shadow-[4px_4px_0_0_#C8102E]">
              {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : <User size={32} />}
            </div>

            <div>
              <Badge variant="filled" className="mb-1">CONTA VERIFICADA</Badge>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-graphite tracking-tight">
                {usuario.nome || 'Assinante'}
              </h1>
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-1">
                Identificador Único: #{userId}
              </p>
            </div>
          </div>

          <Stamp text="STATUS<br/>ATIVO" color="black" size="sm" className="hidden sm:flex" />
        </div>

        {/* Informações de Contato e Inscrição */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="border border-graphite p-4 bg-white/70">
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-editorial font-bold block mb-1">
              E-mail de Acesso
            </span>
            <p className="text-graphite font-sans font-medium flex items-center gap-2 text-sm">
              <Mail size={16} className="text-gray-400" />
              {usuario.email || 'Não informado'}
            </p>
          </div>

          <div className="border border-graphite p-4 bg-white/70">
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-editorial font-bold block mb-1">
              Data de Cadastro
            </span>
            <p className="text-graphite font-sans font-medium flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-400" />
              {usuario.criado_em 
                ? new Date(usuario.criado_em).toLocaleDateString('pt-BR') 
                : new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

        </div>

        {/* Categorias de Interesse */}
        <div className="border-t border-gray-300/60 pt-6">
          <h3 className="font-serif font-bold text-lg text-graphite mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-red-editorial" />
            Tópicos de Preferência
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {(usuario.interesses && usuario.interesses.length > 0 
              ? usuario.interesses 
              : ['Cinema', 'Literatura', 'Música']).map((tag, i) => (
                <span key={i} className="bg-white border border-graphite px-3 py-1 font-mono text-xs uppercase font-bold text-graphite shadow-[2px_2px_0_0_#111]">
                  {tag}
                </span>
            ))}
          </div>
        </div>

        {/* Rodapé do Cartão */}
        <div className="mt-8 pt-6 border-t border-gray-300/60 flex items-center justify-between text-xs text-gray-500 font-mono uppercase">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-600" /> Autenticação Segura
          </span>
          <span>Lumina Editorial © {new Date().getFullYear()}</span>
        </div>

      </div>

    </div>
  );
};

export default PerfilUsuario;

