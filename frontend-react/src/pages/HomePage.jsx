import React, { useEffect } from 'react';
import PostsGrid from '../components/home/PostsGrid';
import Sparkle from '../components/ui/Sparkle';
import Badge from '../components/ui/Badge';
import PolaroidCard from '../components/ui/PolaroidCard';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      
      {/* SEÇÃO: PARA VOCÊ (Personalizada) */}
      <section className="bg-cream-light border-b border-gray-300/40 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-graphite tracking-tight">
              Para <span className="italic text-red-editorial">Você</span>
            </h2>
            <div className="hidden sm:flex gap-2">
              <Badge variant="filled">CINEMA</Badge>
              <Badge variant="outline">LITERATURA</Badge>
              <Badge variant="outline">MÚSICA</Badge>
            </div>
          </div>
          
          <p className="font-sans text-sm text-gray-500 mb-8 max-w-2xl">
            Baseado nos seus interesses, separamos destaques exclusivos que unem as suas paixões artísticas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card Destaque Personalizado 1 */}
            <div className="flex flex-col sm:flex-row gap-6 bg-white border border-graphite p-4 shadow-[4px_4px_0_0_#1A1A1A]">
              <div className="w-full sm:w-1/2 aspect-[4/5] sm:aspect-auto">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop" className="w-full h-full object-cover border border-gray-200" alt="Destaque" />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col justify-center">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-red-editorial mb-2">LITERATURA & CINEMA</span>
                <h3 className="font-serif font-bold text-2xl text-graphite mb-3 leading-tight">Da Página para a Tela</h3>
                <p className="font-sans text-sm text-gray-600 mb-6 line-clamp-3">
                  Como as adaptações literárias estão dominando os cinemas em 2026 e quais são as apostas da crítica.
                </p>
                <button className="self-start text-xs font-bold uppercase tracking-widest border-b-2 border-graphite pb-1 hover:text-red-editorial hover:border-red-editorial transition-colors">
                  LER RESENHA COMPLETA
                </button>
              </div>
            </div>
            
            {/* Card Destaque Personalizado 2 */}
            <div className="flex flex-col sm:flex-row gap-6 bg-white border border-graphite p-4 shadow-[4px_4px_0_0_#1A1A1A]">
              <div className="w-full sm:w-1/2 flex flex-col justify-center order-2 sm:order-1">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-red-editorial mb-2">MÚSICA</span>
                <h3 className="font-serif font-bold text-2xl text-graphite mb-3 leading-tight">O Som do Amanhã</h3>
                <p className="font-sans text-sm text-gray-600 mb-6 line-clamp-3">
                  As novas vozes que estão redefinindo o cenário da música independente nacional.
                </p>
                <button className="self-start text-xs font-bold uppercase tracking-widest border-b-2 border-graphite pb-1 hover:text-red-editorial hover:border-red-editorial transition-colors">
                  OUVIR PLAYLIST
                </button>
              </div>
              <div className="w-full sm:w-1/2 aspect-[4/5] sm:aspect-auto order-1 sm:order-2">
                <img src="https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=400&h=500&fit=crop" className="w-full h-full object-cover border border-gray-200" alt="Destaque" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8" id="resenhas-section">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-3 w-full">
            <div className="w-12 sm:w-24 h-px bg-gray-400"></div>
            <Sparkle className="text-gray-400 text-xs" />
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-graphite uppercase tracking-widest text-center">
              Feed de <span className="text-red-editorial italic">Resenhas</span>
            </h3>
            <Sparkle className="text-gray-400 text-xs" delay={0.5} />
            <div className="w-12 sm:w-24 h-px bg-gray-400"></div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-sans">
            Feed dinâmico atualizado em tempo real
          </p>
        </div>
      </div>

      {/* POSTS GRID - Área Logada */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 overflow-visible">
        <PostsGrid />
      </section>
    </div>
  );
};

export default HomePage;

