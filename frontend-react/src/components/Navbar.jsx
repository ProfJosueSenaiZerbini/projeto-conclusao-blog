import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, BookOpen, Home as HomeIcon, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const [userId, setUserId] = useState('1');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Detecta se estamos na Landing Page pública (rota raiz '/')
  const isLanding = location.pathname === '/';

  // 1. Busca os dados do usuário autenticado no localStorage
  useEffect(() => {
    if (!isLanding) {
      const userRaw = localStorage.getItem('plural_user');
      if (userRaw) {
        try {
          const user = JSON.parse(userRaw);
          setUserId(user.id || user.usuario_id || user._id || '1');
          setUserName(user.nome || user.email || 'Assinante');
        } catch (e) {
          setUserId('1');
        }
      }
    }
  }, [location, isLanding]);

  // Função para deslogar
  const handleLogout = () => {
    localStorage.removeItem('plural_token');
    localStorage.removeItem('plural_user');
    navigate('/');
  };

  // 2. Destaca visualmente a aba ativa através do NavLink
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-all border ${
      isActive
        ? 'bg-graphite text-white border-graphite shadow-[2px_2px_0_0_#C8102E]'
        : 'text-graphite border-transparent hover:border-graphite hover:bg-cream-light'
    }`;

  return (
    <header className="w-full bg-cream border-b-2 border-graphite sticky top-0 z-50">
      
      {/* ✦ BANNERS SUPERIORES DE STATUS ✦ */}
      {isLanding ? (
        <div className="w-full bg-[#E8E08C] border-b border-graphite text-center py-1.5 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-graphite select-none">
          ✦ EDIÇÃO DE APRESENTAÇÃO PÚBLICA — DESTAQUES DA REVISTA ✦
        </div>
      ) : (
        <div className="w-full bg-graphite border-b border-black text-center py-1.5 px-4 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-white flex justify-between items-center select-none">
          <span>● PAINEL DO ASSINANTE | BEM-VINDO(A), {userName.toUpperCase()}</span>
          <button
            onClick={handleLogout}
            className="hover:text-red-editorial transition-colors flex items-center gap-1.5"
            title="Encerrar sessão"
          >
            SAIR <LogOut size={12} />
          </button>
        </div>
      )}

      {/* ✦ BARRA PRINCIPAL ✦ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo da Revista */}
          <Link to={isLanding ? "/" : "/home"} className="flex items-center gap-2">
            <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-graphite">
              LUMINA
            </span>
            <span className="text-red-editorial text-xs font-mono font-bold">✦</span>
          </Link>

          {/* ✦ MENU DE NAVEGAÇÃO ✦ */}
          {isLanding ? (
            /* Menu Público da Landing Page */
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="bg-red-editorial text-white text-xs font-mono uppercase font-bold tracking-widest px-5 py-2.5 hover:bg-red-strong shadow-[2px_2px_0_0_#111] transition-all"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-flex border-2 border-graphite bg-white text-graphite text-xs font-mono uppercase font-bold tracking-widest px-5 py-2.5 hover:bg-cream-light shadow-[2px_2px_0_0_#111] transition-all"
              >
                Cadastre-se
              </Link>
            </div>
          ) : (
            /* Menu da Área Logada (Home, Resenhas e Perfil Lado a Lado) */
            <nav className="flex items-center gap-2 sm:gap-4">
              
              {/* 1. Botão Home (leva para /home na área logada) */}
              <NavLink to="/home" className={getNavLinkClass}>
                <HomeIcon size={14} />
                <span className="hidden xs:inline">Home</span>
              </NavLink>

              {/* 2. Botão Resenhas */}
              <NavLink to="/resenhas" className={getNavLinkClass}>
                <BookOpen size={14} />
                <span className="hidden xs:inline">Resenhas</span>
              </NavLink>

              {/* 3. Botão Perfil (redirecionamento dinâmico para o ID do usuário) */}
              <NavLink to={`/perfil/${userId}`} className={getNavLinkClass}>
                <User size={14} />
                <span className="hidden xs:inline">Perfil</span>
              </NavLink>

              {/* Ação de Novo Post */}
              <Link
                to="/novoPost"
                className="bg-red-editorial text-white text-xs font-mono uppercase font-bold tracking-wider px-3.5 py-2 hover:bg-red-strong shadow-[2px_2px_0_0_#111] transition-all flex items-center gap-1.5"
              >
                <PlusCircle size={14} />
                <span className="hidden sm:inline">Novo Post</span>
              </Link>

            </nav>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
