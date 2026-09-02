import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PolaroidCard from '../components/ui/PolaroidCard';
import Badge from '../components/ui/Badge';
import Sparkle from '../components/ui/Sparkle';

const CategoryPage = ({ categoryName }) => {
  const location = useLocation();
  const cat = categoryName || location.pathname.substring(1).toUpperCase();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cat]);

  // Widgets dinâmicos baseados na categoria (conforme solicitado no prompt)
  const renderCategoryWidget = () => {
    switch (cat) {
      case 'CINEMA':
        return (
          <div className="bg-graphite text-white p-6 border-l-4 border-red-editorial font-sans text-sm my-6">
            <h4 className="font-bold uppercase tracking-widest mb-2 font-mono text-[10px] text-gray-400">Ficha Técnica & Infos</h4>
            <p className="mb-1"><strong>Nota da Crítica:</strong> ★★★★☆ (8.5/10)</p>
            <p className="mb-1"><strong>Onde Assistir:</strong> Cinemas / Streaming</p>
            <Badge variant="filled" className="mt-3 inline-block">⚠ CONTÉM SPOILERS ABAIXO</Badge>
          </div>
        );
      case 'LITERATURA':
        return (
          <div className="bg-cream-light border border-graphite p-6 font-sans text-sm my-6 shadow-[4px_4px_0_0_#1A1A1A]">
            <h4 className="font-bold uppercase tracking-widest mb-2 font-mono text-[10px] text-red-editorial">Clube do Livro LUMINA</h4>
            <p className="mb-1"><strong>Tempo médio de leitura:</strong> 6 horas</p>
            <p className="mb-1"><strong>Gênero:</strong> Ficção Contemporânea</p>
            <p><strong>Autor em destaque da semana:</strong> Machado de Assis</p>
          </div>
        );
      case 'MÚSICA':
        return (
          <div className="bg-gray-100 p-6 border-t border-b border-gray-300 my-6 flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div>
              <Badge variant="outline" className="mb-2">ÁLBUM DA SEMANA</Badge>
              <p className="font-serif font-bold text-xl text-graphite">Sons Urbanos Vol. 2</p>
            </div>
            {/* Simulando um player */}
            <div className="flex-1 w-full bg-white h-12 border border-graphite rounded-full flex items-center px-4 max-w-sm">
              <div className="w-8 h-8 rounded-full bg-red-editorial flex items-center justify-center text-white text-xs">▶</div>
              <div className="flex-1 ml-3 h-1 bg-gray-200"><div className="w-1/3 h-full bg-graphite"></div></div>
            </div>
          </div>
        );
      case 'TEATRO':
        return (
          <div className="bg-[#E8E08C] p-6 text-graphite font-sans text-sm my-6 rotate-1">
            <h4 className="font-bold uppercase tracking-widest mb-2 font-mono text-[10px]">🎭 Em Cartaz</h4>
            <p className="mb-1"><strong>Localização:</strong> Teatro Municipal</p>
            <p className="mb-4"><strong>Temporada:</strong> Até 30 de Agosto</p>
            <button className="bg-graphite text-white font-bold uppercase tracking-wider text-xs px-6 py-3 hover:bg-black w-full sm:w-auto">
              GARANTIR INGRESSOS
            </button>
          </div>
        );
      case 'MODA':
        return (
          <div className="my-8">
            <h4 className="font-bold uppercase tracking-widest mb-4 font-mono text-[10px] text-gray-500 text-center">Temas da Edição</h4>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline">ALTA COSTURA</Badge>
              <Badge variant="filled">STREETWEAR</Badge>
              <Badge variant="outline">SUSTENTABILIDADE</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop&sig=${i}`} alt="Lookbook" className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all" />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Header Temático */}
      <div className="flex flex-col items-center text-center mb-12">
        <Sparkle className="text-red-editorial text-lg mb-4" />
        <h1 className="font-serif font-black text-5xl sm:text-6xl md:text-7xl text-graphite uppercase tracking-tight mb-4">
          {cat}
        </h1>
        <div className="w-24 h-px bg-graphite mb-6"></div>
        <p className="text-gray-editorial font-sans max-w-2xl text-sm sm:text-base">
          Explorando as narrativas, críticas e novidades do mundo da {cat.toLowerCase()}. Conteúdo com a curadoria exclusiva da redação PLURAL.
        </p>
      </div>

      {/* Widget Específico da Categoria */}
      <div className="max-w-4xl mx-auto mb-16">
        {renderCategoryWidget()}
      </div>

      {/* Feed de Conteúdo da Categoria (Mock Visual) */}
      <div>
        <div className="flex items-center justify-between mb-8 border-b border-gray-300/40 pb-4">
          <h3 className="font-mono text-xs uppercase font-bold tracking-widest text-graphite">Feed de Críticas</h3>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Filtrar por: Mais Recentes</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 justify-items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full max-w-sm" style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}>
              <PolaroidCard
                image={`https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&sig=${cat}${i}`}
                title={`Análise: Impactos na ${cat}`}
                subtitle={`Uma visão aprofundada sobre as tendências de ${cat.toLowerCase()} nesta temporada.`}
                caption={`POST · 2026`}
                link={`/post/mock-${i}`}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CategoryPage;

