import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import PolaroidCard from '../components/ui/PolaroidCard';
import { PolaroidSkeleton } from '../components/ui/Skeleton';
import Badge from '../components/ui/Badge';
import Stamp from '../components/ui/Stamp';
import Sparkle from '../components/ui/Sparkle';

const CATEGORIES = ['TODAS', 'CINEMA', 'LITERATURA', 'MÚSICA', 'TEATRO'];

const Resenhas = () => {
  const { posts, loading, error } = usePosts();
  const [selectedCategory, setSelectedCategory] = useState('TODAS');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Rotações para efeito estético de mesa com polaroids
  const rotations = [-2, 2, -1, 3, -3, 1, 0, -2, 2];

  // Filtro por categoria caso o usuário selecione uma aba
  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'TODAS') return true;
    return post.categoria?.toUpperCase() === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Cabeçalho da Seção de Resenhas */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-300/60 pb-6 mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">CATÁLOGO EDITORIAL</Badge>
            <Sparkle className="text-red-editorial text-xs" />
          </div>
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-graphite tracking-tight">
            Feed de <span className="italic text-red-editorial">Resenhas</span>
          </h1>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-xl">
            Ensaios analíticos e críticas independentes sobre obras e lançamentos artísticos.
          </p>
        </div>

        {/* Abas de Filtro de Categoria */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase font-bold tracking-widest border transition-all ${
                selectedCategory === cat
                  ? 'bg-graphite text-white border-graphite shadow-[2px_2px_0_0_#C8102E]'
                  : 'bg-white text-graphite border-gray-300 hover:border-graphite'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Estado: Carregando (Loading) */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {[1, 2, 3, 4, 5, 6].map((item, idx) => (
            <div key={item} className="w-full max-w-xs sm:max-w-sm" style={{ transform: `rotate(${rotations[idx % rotations.length]}deg)` }}>
              <PolaroidSkeleton />
            </div>
          ))}
        </div>
      )}

      {/* Estado: Erro */}
      {error && !loading && (
        <div className="py-16 text-center">
          <Stamp text="ERRO<br/>NA API" color="red" size="md" className="relative mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-graphite mb-2">Não foi possível carregar as resenhas</h3>
          <p className="text-gray-editorial text-sm">{error}</p>
        </div>
      )}

      {/* Estado: Lista Vazia ou Posts Retornados */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 justify-items-center">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, idx) => (
              <div key={post.id || idx} className="w-full max-w-xs sm:max-w-sm flex justify-center">
                <PolaroidCard
                  image={post.imagem || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop'}
                  title={post.titulo}
                  subtitle={post.resumo || post.conteudo?.substring(0, 90) + '...'}
                  caption={`${post.categoria || 'RESENHA'} · ${new Date(post.criando_em || Date.now()).toLocaleDateString('pt-BR')}`}
                  link={`/post/${post.id}`}
                  rotation={rotations[idx % rotations.length]}
                  className="w-full"
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                Nenhuma resenha encontrada para a categoria "{selectedCategory}".
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Resenhas;

