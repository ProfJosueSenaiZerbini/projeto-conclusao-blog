import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { ArrowLeft, User, Clock, Heart, Share2, Loader2 } from 'lucide-react';

const PostPage = () => {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (post?.likes) {
      setLikesCount(post.likes);
    }
  }, [post]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.titulo,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#F9F6F0]">
        <Loader2 size={36} className="animate-spin text-red-editorial mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
          Carregando publicação...
        </p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#F9F6F0]">
        <div className="bg-red-editorial text-white font-mono text-xs font-bold uppercase tracking-widest px-4 py-1.5 mb-6">
          ERRO 404
        </div>
        <h2 className="font-serif font-black text-3xl sm:text-4xl text-graphite mb-4">
          Publicação não encontrada
        </h2>
        <p className="text-gray-600 max-w-md mb-8 font-sans text-sm">
          {error || "Este conteúdo não está disponível ou foi movido."}
        </p>
        <Link 
          to="/home" 
          className="inline-flex items-center gap-2 bg-graphite text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-black transition-colors"
        >
          <ArrowLeft size={15} /> VOLTAR PARA O FEED
        </Link>
      </div>
    );
  }

  const autorNome = post.autor || post.a || "Redação Lumina";
  const categoriaNome = post.categoria || "RESENHA & CRÍTICA";
  const tempoLeitura = post.tempoLeitura || "5 min de leitura";

  const dataFormatada = (() => {
    if (!post.criando_em) return 'Recentemente';
    const d = new Date(typeof post.criando_em === 'string' ? post.criando_em.replace(' ', 'T') : post.criando_em);
    return isNaN(d.getTime()) ? 'Recentemente' : d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  })();

  return (
    <div className="w-full bg-[#F9F6F0] min-h-screen py-10 sm:py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Barra Superior / Voltar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-300">
          <Link 
            to="/home" 
            className="text-xs font-mono uppercase font-bold tracking-widest text-graphite hover:text-red-editorial transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> VOLTAR AO FEED
          </Link>

          <span className="text-[11px] font-mono tracking-widest text-gray-500 uppercase">
            ID: #{String(post.id).padStart(4, '0')}
          </span>
        </div>

        {/* Cabeçalho do Artigo */}
        <header className="mb-10 text-left">
          
          {/* Categoria */}
          <div className="mb-4">
            <span className="bg-black text-white font-mono text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1 uppercase inline-block border border-black shadow-[2px_2px_0_0_#C8382B]">
              {categoriaNome}
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-graphite leading-[1.12] tracking-tight mb-6">
            {post.titulo}
          </h1>

          {/* Linha de Autor, Data e Leitura */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-sans text-gray-500 border-t border-b border-gray-200 py-3">
            <div className="flex items-center gap-1.5 text-red-editorial font-bold">
              <User size={14} className="text-red-editorial" />
              <span className="text-graphite">{autorNome}</span>
            </div>
            
            <span className="text-gray-300">•</span>

            <div className="flex items-center gap-1 text-gray-500">
              <Clock size={14} />
              <span>{tempoLeitura}</span>
            </div>

            <span className="text-gray-300">•</span>

            <span>Publicado em {dataFormatada}</span>
          </div>
        </header>

        {/* Imagem de Capa */}
        {post.imagem && (
          <div className="relative mb-12 bg-white border-2 border-graphite shadow-[6px_6px_0_0_#1A1A1A]">
            {/* Efeito de Fita Adesiva Translúcida */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/60 border border-white/70 shadow-sm backdrop-blur-[1px] rotate-1 z-10 pointer-events-none" />

            <div className="overflow-hidden aspect-[16/9] w-full bg-gray-100">
              <img 
                src={post.imagem} 
                alt={post.titulo}
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        )}

        {/* Conteúdo do Artigo */}
        <div className="bg-white border border-gray-200 p-6 sm:p-10 shadow-[3px_3px_0_0_#1A1A1A] mb-12">
          <div className="font-sans text-base sm:text-lg text-gray-800 leading-relaxed space-y-6">
            {typeof post.conteudo === 'string' && post.conteudo.split('\n\n').map((paragrafo, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragrafo}
              </p>
            ))}
          </div>
        </div>

        {/* Barra de Ações (Curtir / Compartilhar / Voltar) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-300">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 border px-4 py-2 rounded-sm text-xs font-mono font-bold transition-colors ${
                liked
                  ? 'border-red-editorial bg-red-editorial text-white'
                  : 'border-graphite bg-white text-graphite hover:border-red-editorial hover:text-red-editorial'
              }`}
            >
              <Heart size={15} className={liked ? "fill-white" : ""} />
              <span>{likesCount} CURTIDAS</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 border border-graphite bg-white text-graphite hover:bg-gray-50 px-4 py-2 rounded-sm text-xs font-mono font-bold transition-colors"
            >
              <Share2 size={15} />
              <span>COMPARTILHAR</span>
            </button>
          </div>

          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-graphite hover:text-red-editorial transition-colors"
          >
            <ArrowLeft size={14} /> VOLTAR PARA O FEED
          </Link>
        </div>

      </article>
    </div>
  );
};

export default PostPage;
