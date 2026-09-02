import React from 'react';
import { usePosts } from '../../hooks/usePosts';
import PolaroidCard from '../ui/PolaroidCard';
import { PolaroidSkeleton } from '../ui/Skeleton';
import Stamp from '../ui/Stamp';

const PostsGrid = () => {
  const { posts, loading, error } = usePosts();

  // Função para gerar uma rotação aleatória pequena entre -3 e 3 graus
  const getRandomRotation = (index) => {
    const rotations = [-2, 3, -1, 2, -3, 1, 0, -2, 2];
    return rotations[index % rotations.length];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 justify-items-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-full max-w-sm" style={{ transform: `rotate(${getRandomRotation(i)}deg)` }}>
            <PolaroidSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative py-20 flex flex-col items-center justify-center text-center">
        <Stamp text="ERRO" size="lg" color="red" className="relative mb-6 transform-none rotate-0" />
        <h3 className="font-serif text-2xl font-bold text-graphite mb-2">Ops, algo deu errado.</h3>
        <p className="text-gray-editorial max-w-md">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    // Fallback com posts fictícios caso a API não retorne nenhum post
    const mockPosts = [
      {
        id: 'mock-1',
        imagem: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=800&fit=crop',
        titulo: 'O renascimento da literatura marginal',
        resumo: 'Uma análise profunda sobre os novos autores da cena independente.',
        criando_em: new Date().toISOString()
      },
      {
        id: 'mock-2',
        imagem: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop',
        titulo: 'Retratos Urbanos',
        resumo: 'A estética das ruas capturada em 35mm pelas lentes de jovens fotógrafos.',
        criando_em: new Date().toISOString()
      },
      {
        id: 'mock-3',
        imagem: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
        titulo: 'Moda e Resistência',
        resumo: 'Como as passarelas estão abraçando a cultura de rua de forma definitiva.',
        criando_em: new Date().toISOString()
      }
    ];

    return (
      <div className="w-full">
        <div className="mb-8 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-red-editorial font-bold mb-2">Exibindo Conteúdo Fictício</p>
          <p className="text-sm text-gray-500">O backend não retornou publicações. Aqui está uma prévia visual.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-16 justify-items-center">
          {mockPosts.map((post, index) => (
            <div key={post.id} className="w-full max-w-xs sm:max-w-sm flex justify-center">
              <PolaroidCard
                image={post.imagem}
                title={post.titulo}
                subtitle={post.resumo}
                caption={`POST · ${new Date(post.criando_em).toLocaleDateString('pt-BR')} · ${new Date(post.criando_em).getFullYear()}`}
                link={`/post/${post.id}`}
                rotation={getRandomRotation(index)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-16 justify-items-center">
      {posts.map((post, index) => (
        <div key={post.id} className="w-full max-w-xs sm:max-w-sm flex justify-center">
          <PolaroidCard
            image={post.imagem}
            title={post.titulo}
            subtitle={post.resumo}
            caption={`POST · ${new Date(post.criando_em).toLocaleDateString('pt-BR')} · ${new Date(post.criando_em).getFullYear()}`}
            link={`/post/${post.id}`}
            rotation={getRandomRotation(index)}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default PostsGrid;

