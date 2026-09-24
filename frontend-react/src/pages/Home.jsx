import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Clock, User, ArrowRight, Tag, Sparkles } from 'lucide-react';
import Tape from '../components/ui/Tape';
import Badge from '../components/ui/Badge';

// ✦ Array de dados simulados (Mock Data) com temas variados
const POSTS_INICIAIS = [
  {
    id: 1,
    titulo: 'O Futuro da Inteligência Artificial no Design e na Criatividade',
    categoria: 'Tecnologia',
    autor: 'Lucas Almeida',
    data: '15 de Setembro, 2026',
    tempoLeitura: '5 min de leitura',
    resumo: 'Como os novos modelos gerativos estão transformando o fluxo de trabalho dos criativos e o debate ético sobre autoria nas artes digitais.',
    imagem: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
    curtidas: 42
  },
  {
    id: 2,
    titulo: 'O Renascimento do Cinema em Película de 35mm',
    categoria: 'Filmes & Cinema',
    autor: 'Beatriz Vasconcelos',
    data: '14 de Setembro, 2026',
    tempoLeitura: '8 min de leitura',
    resumo: 'Grandes diretores contemporâneos voltam a escolher rolos analógicos para capturar a textura e a nostalgia que o sensor digital não reproduz.',
    imagem: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    curtidas: 89
  },
  {
    id: 3,
    titulo: 'Elogio à Lentidão: Como Redescobrir o Prazer do Café e da Manhã',
    categoria: 'Cotidiano & Estilo',
    autor: 'Juliana Mendes',
    data: '12 de Setembro, 2026',
    tempoLeitura: '4 min de leitura',
    resumo: 'Em uma rotina hiperconectada e acelerada, resgatar pequenos rituais sem telas é um ato de resistência e cuidado com a saúde mental.',
    imagem: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop',
    curtidas: 65
  },
  {
    id: 4,
    titulo: 'Distopias Clássicas que Prevêem os Desafios de 2026',
    categoria: 'Livros & Literatura',
    autor: 'Carlos Eduardo',
    data: '10 de Setembro, 2026',
    tempoLeitura: '7 min de leitura',
    resumo: 'De George Orwell a Philip K. Dick: releituras essenciais para compreender vigilância algorítmica, pós-verdade e controle social moderno.',
    imagem: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
    curtidas: 112
  },
  {
    id: 5,
    titulo: 'A Revolução dos Sintetizadores na Música Brasileira',
    categoria: 'Música & Cultura',
    autor: 'Mariana Duarte',
    data: '08 de Setembro, 2026',
    tempoLeitura: '6 min de leitura',
    resumo: 'Como ritmos regionais tradicionais estão se fundindo com batidas eletrônicas e timbres analógicos na nova cena independente nacional.',
    imagem: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
    curtidas: 73
  },
  {
    id: 6,
    titulo: 'Arquitetura Brutalista e o Impacto no Sentimento Urbano',
    categoria: 'Design & Espaço',
    autor: 'Rafael Nogueira',
    data: '05 de Setembro, 2026',
    tempoLeitura: '9 min de leitura',
    resumo: 'O concreto armado aparente desperta fascínio e polêmica: o que os grandes edifícios modernistas transmitem para quem vive nas metrópoles.',
    imagem: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop',
    curtidas: 54
  }
];

const Home = () => {
  // Estado local para armazenar os posts e permitir a curtida interativa
  const [posts, setPosts] = useState(POSTS_INICIAIS);
  const [postsCurtidos, setPostsCurtidos] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Função para gerenciar a curtida de cada post individualmente
  const alternarCurtida = (id) => {
    const jaCurtiu = postsCurtidos[id];
    setPostsCurtidos(prev => ({ ...prev, [id]: !jaCurtiu }));

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            curtidas: jaCurtiu ? post.curtidas - 1 : post.curtidas + 1
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* ✦ CABEÇALHO DO FEED PRINCIPAL ✦ */}
      <div className="border-b-2 border-graphite pb-8 mb-12">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="filled">EDIÇÃO ABERTA</Badge>
          <span className="font-mono text-xs uppercase tracking-widest text-gray-editorial">
            FEED MULTITEMÁTICO · LUMINA
          </span>
        </div>
        
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-graphite tracking-tight leading-none mb-4">
          Crônicas, Ensaios & <br />
          <span className="italic text-red-editorial">Perspectivas Plurais</span>.
        </h1>
        
        <p className="font-sans text-base text-gray-editorial max-w-2xl">
          Navegue pelas últimas postagens da nossa comunidade editorial. Artigos selecionados 
          cobrindo tecnologia, literatura, cinema e cotidiano.
        </p>
      </div>

      {/* ✦ GRID DE POSTAGENS VARIADAS ✦ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {posts.map((post, index) => {
          const foiCurtido = !!postsCurtidos[post.id];

          return (
            <article
              key={post.id}
              className="bg-cream-light border-2 border-graphite flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(17,17,17,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(200,16,46,1)] transition-all duration-200 relative"
            >
              {/* Detalhe de fita adesiva no primeiro e quarto cards */}
              {index % 3 === 0 && (
                <Tape variant="yellow" className="-top-3 left-6 w-24 h-6 rotate-1" />
              )}
              {index % 3 === 1 && (
                <Tape variant="blue" className="-top-3 right-6 w-20 h-5 -rotate-2" />
              )}

              <div>
                {/* Imagem de Capa do Post */}
                <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-graphite bg-gray-200">
                  <img
                    src={post.imagem}
                    alt={post.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  {/* Tag / Categoria em destaque sobreposta */}
                  <span className="absolute top-3 left-3 bg-graphite text-white font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 border border-white shadow-sm">
                    {post.categoria}
                  </span>
                </div>

                {/* Conteúdo textual do Card */}
                <div className="p-6">
                  {/* Metadados: Autor e Tempo de Leitura */}
                  <div className="flex items-center justify-between text-xs font-mono text-gray-editorial mb-3 pb-3 border-b border-gray-300/60">
                    <span className="flex items-center gap-1.5 font-bold text-graphite">
                      <User size={13} className="text-red-editorial" /> {post.autor}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock size={12} /> {post.tempoLeitura}
                    </span>
                  </div>

                  {/* Título do Post */}
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-graphite leading-snug mb-3 hover:text-red-editorial transition-colors">
                    {post.titulo}
                  </h2>

                  {/* Resumo / Trecho */}
                  <p className="font-sans text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {post.resumo}
                  </p>
                </div>
              </div>

              {/* Rodapé do Card: Ações (Curtir & Ler Mais) */}
              <div className="p-6 pt-0 border-t border-gray-200 mt-2 flex items-center justify-between">
                
                {/* Botão de Curtir com contador e estado reativo */}
                <button
                  onClick={() => alternarCurtida(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                    foiCurtido
                      ? 'bg-red-editorial text-white border-red-editorial'
                      : 'bg-white text-graphite border-graphite hover:bg-red-100 hover:text-red-editorial'
                  }`}
                  title="Curtir postagem"
                >
                  <Heart
                    size={14}
                    className={foiCurtido ? 'fill-white text-white' : 'text-graphite'}
                  />
                  <span>{post.curtidas}</span>
                </button>

                {/* Botão de Ler Mais */}
                <Link
                  to="/resenhas"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest font-bold text-graphite hover:text-red-editorial group transition-colors"
                >
                  <span>Ler mais</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
};

export default Home;
