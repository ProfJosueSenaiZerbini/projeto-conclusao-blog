import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, User, PlusCircle, LogOut } from 'lucide-react';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
<<<<<<< HEAD
  const [isLogged, setIsLogged] = useState(false);
=======
  const [currentUserId, setCurrentUserId] = useState(null);
>>>>>>> ff41acb288869092937bea1f11b6bbaa65dbb5b8
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('plural_token');
    const userRaw = localStorage.getItem('plural_user');
    if (token) {
      setIsLogged(true);
      if (userRaw) {
        try {
          const user = JSON.parse(userRaw);
<<<<<<< HEAD
          setUserName(user.nome || user.email || 'Usuário');
=======
          setUserName(user.nome || user.email || 'LEITOR');
          setCurrentUserId(user.id || user.usuario_id || user._id);
>>>>>>> ff41acb288869092937bea1f11b6bbaa65dbb5b8
        } catch (e) {
          setUserName('Usuário');
        }
      }
    } else {
      setIsLogged(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('plural_token');
    localStorage.removeItem('plural_user');
    setIsLogged(false);
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  const isHome = location.pathname === '/home' || location.pathname === '/';

  return (
<<<<<<< HEAD
    <header className="w-full bg-[#F9F6F0] border-b border-gray-300 sticky top-0 z-[100]">
=======
    <header className="w-full bg-cream-light border-b border-gray-300/50 sticky top-0 z-50">

      {/* ✦ BANNERS DE SINALIZAÇÃO DE ROTA ✦ */}
      {isLanding ? (
        <div className="w-full bg-[#E8E08C] border-b border-graphite text-center py-1.5 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-graphite select-none">
          ✦ EDIÇÃO DE APRESENTAÇÃO PÚBLICA — DESTAQUES DA REVISTA ✦
        </div>
      ) : (
        <div className="w-full bg-graphite border-b border-black text-center py-1.5 px-4 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-white flex justify-between items-center select-none">
          <div className="flex items-center gap-2 sm:gap-3">
            <span>● PAINEL DO ASSINANTE | BEM-VINDO(A), {userName.toUpperCase()}</span>
            {currentUserId && (
              <Link 
                to={`/perfil/${currentUserId}`} 
                className="text-red-editorial underline decoration-1 underline-offset-2 hover:text-white transition-colors"
              >
                [MEU PERFIL]
              </Link>
            )}
          </div>
          <button onClick={handleLogout} className="hover:text-red-editorial transition-colors flex items-center gap-1">
            SAIR <LogOut size={12} />
          </button>
        </div>
      )}

      {/* Top Bar */}
>>>>>>> ff41acb288869092937bea1f11b6bbaa65dbb5b8
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo LUMINA + */}
          <Link to={isLogged ? "/home" : "/"} className="flex items-center group">
            <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-graphite">
              LUMINA
            </span>
            <span className="ml-1 text-red-editorial font-bold text-sm sm:text-base select-none">
              ✦
            </span>
          </Link>

          {/* Ações da Direita */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Ícone Home */}
            <button
              onClick={() => navigate(isLogged ? "/home" : "/")}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-sm transition-colors ${
                isHome
                  ? 'bg-graphite text-white hover:bg-black'
                  : 'text-graphite hover:bg-cream border border-transparent hover:border-gray-300'
              }`}
              title="Início"
            >
              <Home size={18} />
            </button>

            {/* Ícone Página de Resenhas & Categorias */}
            <button
              onClick={() => navigate(isLogged ? "/resenhas" : "/login")}
              className={`w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center rounded-sm transition-colors ${
                location.pathname === '/resenhas'
                  ? 'bg-graphite text-white'
                  : 'text-graphite hover:bg-cream border-transparent hover:border-gray-300'
              }`}
              title="Página de Resenhas & Categorias"
            >
              <BookOpen size={18} />
            </button>

            {/* Ícone Perfil / Usuário */}
            <button
              onClick={() => {
                if (!isLogged) {
                  navigate('/login');
                } else {
                  navigate('/perfil');
                }
              }}
              className={`w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center rounded-sm transition-colors ${
                location.pathname === '/perfil'
                  ? 'bg-graphite text-white'
                  : 'text-graphite hover:bg-cream border-transparent hover:border-gray-300'
              }`}
              title={isLogged ? `Meu Perfil (${userName})` : "Entrar / Login"}
            >
              <User size={18} />
            </button>

            {/* Botão NOVO POST */}
            <button
              onClick={() => navigate('/novoPost')}
              className="bg-red-editorial hover:bg-red-strong text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-sm flex items-center gap-1.5 shadow-[2px_2px_0_0_#1A1A1A] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              <PlusCircle size={15} />
              <span>NOVO POST</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
