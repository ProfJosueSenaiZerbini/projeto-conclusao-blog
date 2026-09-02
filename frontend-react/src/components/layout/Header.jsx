import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === '/';

  useEffect(() => {
    if (!isLanding) {
      const userRaw = localStorage.getItem('plural_user');
      if (userRaw) {
        try {
          const user = JSON.parse(userRaw);
          setUserName(user.nome || user.email || 'LEITOR');
        } catch (e) {
          setUserName('LEITOR');
        }
      }
    }
  }, [isLanding]);

  const protectedNavItems = [
    { name: 'HOME', path: '/home' },
    { name: 'RESENHAS', path: '/home' },
    { name: 'TEATRO', path: '/teatro' },
    { name: 'MÚSICA', path: '/musica' },
    { name: 'MODA', path: '/moda' },
    { name: 'CINEMA', path: '/cinema' },
    { name: 'LITERATURA', path: '/literatura' },
    { name: 'ARTES VISUAIS', path: '/artes' },
    { name: 'CHAT', path: '/chat' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('plural_token');
    localStorage.removeItem('plural_user');
    navigate('/');
  };

  return (
    <header className="w-full bg-cream-light border-b border-gray-300/50 sticky top-0 z-50">

      {/* ✦ BANNERS DE SINALIZAÇÃO DE ROTA ✦ */}
      {isLanding ? (
        <div className="w-full bg-[#E8E08C] border-b border-graphite text-center py-1.5 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-graphite select-none">
          ✦ EDIÇÃO DE APRESENTAÇÃO PÚBLICA — DESTAQUES DA REVISTA ✦
        </div>
      ) : (
        <div className="w-full bg-graphite border-b border-black text-center py-1.5 px-4 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-white flex justify-between items-center select-none">
          <span>● PAINEL DO ASSINANTE | BEM-VINDO(A), {userName.toUpperCase()}</span>
          <button onClick={handleLogout} className="hover:text-red-editorial transition-colors flex items-center gap-1">
            SAIR <LogOut size={12} />
          </button>
        </div>
      )}

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Left: Volume info */}
          {/* <div className="hidden sm:block flex-1">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gray-editorial font-sans font-medium">
              VOL: 01 · Nº 06 · JUNHO 2026
            </p>
          </div> */}

          {/* Mobile Menu Toggle (Apenas na área logada) */}
          {!isLanding && (
            <div className="sm:hidden flex-1">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-graphite p-2 -ml-2"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}

          {/* Center: Logo */}
          <Link to={isLanding ? "/" : "/home"} className="relative flex items-center justify-center flex-1 sm:flex-none">
            <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-graphite select-none">
              LUMINA
            </h1>
            <span className="absolute -top-1 -right-4 sm:-right-5 text-red-editorial text-sm sm:text-base sparkle select-none">✦</span>
          </Link>

          {/* Right: Botão Login */}
          <div className="flex-1 flex justify-end">
            {isLanding && (
              <Link
                to="/login"
                className="bg-red-editorial text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 sm:px-6 sm:py-2.5 rounded-sm transition-colors duration-200 hover:bg-red-strong shadow-sm hover:shadow-md select-none"
              >
                LOGIN
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Navigation Tabs (Desktop) - APENAS LOGADO */}
      {!isLanding && (
        <nav className="hidden sm:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-300/60">
          <div className="flex overflow-x-auto scrollbar-hide -mb-px">
            {protectedNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.name === 'HOME'}
                className={({ isActive }) =>
                  `nav-tab flex-shrink-0 px-3 sm:px-5 py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider border ${isActive
                    ? 'bg-graphite text-white border-graphite'
                    : 'text-graphite border-gray-300/60 hover:border-graphite'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {/* Submit */}
            <button
              onClick={() => navigate("/novoPost")}
              className="w-50 bg-red-editorial text-white font-bold uppercase tracking-widest text-sm py-2 px-6 border border-transparent hover:bg-red-strong hover:shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              New Post  <span className="font-normal text-lg leading-none">+</span>
            </button>
          </div>
        </nav>
      )
      }

      {/* Mobile Menu Drawer - APENAS LOGADO */}
      {
        !isLanding && isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-300/60 bg-cream">
            <nav className="flex flex-col py-2 px-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans font-medium mb-4 mt-2">
                MENU INTERNO
              </p>
              {protectedNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-3 text-sm font-semibold uppercase tracking-wider border-b border-gray-200 ${isActive ? 'text-red-editorial' : 'text-graphite'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )
      }
    </header >
  );
};

export default Header;

