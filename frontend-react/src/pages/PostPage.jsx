import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import Skeleton from '../components/ui/Skeleton';
import Badge from '../components/ui/Badge';
import Tape from '../components/ui/Tape';
import Stamp from '../components/ui/Stamp';
import { ArrowLeft } from 'lucide-react';

const PostPage = () => {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="mb-8">
          <Skeleton variant="text" className="w-32 mb-6" />
          <Skeleton variant="title" className="mb-4" />
          <Skeleton variant="text" className="w-48 mb-8" />
        </div>
        <Skeleton variant="image" className="w-full aspect-[21/9] mb-12" />
        <div className="space-y-4">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-2/3" />
        </div>
      </article>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Stamp text="ERRO 404" size="lg" color="red" className="relative mb-8 transform-none rotate-0" />
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-graphite mb-4">
          Post não encontrado
        </h2>
        <p className="text-gray-editorial mb-8">
          {error || "Este conteúdo não está mais disponível ou foi movido."}
        </p>
        <Link 
          to="/" 
          className="btn-hover inline-flex items-center gap-2 bg-graphite text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-sm"
        >
          <ArrowLeft size={16} /> VOLTAR PARA HOME
        </Link>
      </div>
    );
  }

  // Tratamento do bug do backend onde 'u.nome a autor' causou o não retorno do autor
  // Se 'autor' não vier, tentamos 'a' ou mostramos 'Redação Plural'
  const autorNome = post.autor || post.a || "Redação Plural";

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
      
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-300/40 pb-4">
        <Link to="/" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-graphite transition-colors inline-flex items-center gap-1">
          <ArrowLeft size={12} /> HOME / RESENHAS
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-gray-400">
          ID: #{post.id?.toString().padStart(4, '0')}
        </span>
      </div>

      {/* Header do Post */}
      <header className="mb-10 text-center flex flex-col items-center">
        <Badge variant="outline" className="mb-6">CULTURA</Badge>
        
        <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-graphite leading-[1.1] tracking-tight mb-6">
          {post.titulo}
        </h1>
        
        <div className="flex items-center justify-center gap-4 text-xs font-sans uppercase tracking-widest text-gray-500">
          <span>Por <strong className="text-graphite">{autorNome}</strong></span>
          <span className="w-1 h-1 bg-red-editorial rounded-full"></span>
          <span>{new Date(post.criando_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>
      </header>

      {/* Imagem de Capa (Estilo Polaroid gigante) */}
      {post.imagem && (
        <div className="relative mb-12 lg:mb-16">
          <div className="polaroid relative bg-white p-3 pb-8 sm:p-4 sm:pb-12 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <Tape variant="yellow" className="-top-3 left-1/2 -translate-x-1/2 w-24 h-8 rotate-1" />
            <img 
              src={post.imagem} 
              alt={post.titulo}
              className="w-full max-h-[600px] object-cover bg-gray-100" 
            />
            <Stamp text="ARQUIVO<br/>PLURAL" size="sm" color="red" className="-bottom-6 -right-6" />
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="font-sans text-base md:text-lg text-gray-editorial leading-relaxed max-w-2xl mx-auto space-y-6 md:space-y-8 prose prose-p:text-gray-editorial prose-headings:font-serif prose-headings:text-graphite prose-a:text-red-editorial">
        {/* Se o conteudo for HTML simples ou texto, usamos dangerouslySetInnerHTML para manter a formatação se vier do banco */}
        <div dangerouslySetInnerHTML={{ __html: post.conteudo.replace(/\n/g, '<br/>') }} />
      </div>

      {/* Footer do Post */}
      <div className="mt-16 pt-8 border-t border-gray-300/40 text-center">
        <p className="font-serif italic text-xl text-graphite mb-6">Fim da leitura.</p>
        <Link 
          to="/" 
          className="btn-hover inline-flex items-center gap-2 bg-transparent border-2 border-graphite text-graphite text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-graphite hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> LER MAIS RESENHAS
        </Link>
      </div>

    </article>
  );
};

export default PostPage;

