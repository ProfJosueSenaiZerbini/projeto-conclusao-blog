import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes de Layout e Proteção
import Navbar from './components/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';

// 1. Entrada Pública (Visitantes)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// 2. Área Logada (Assinantes)
import Home from './pages/Home';
import Resenhas from './pages/Resenhas';
import PerfilUsuario from './pages/PerfilUsuario';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
<<<<<<< HEAD
import CategoryPage from './pages/CategoryPage';
import ResenhasPage from './pages/ResenhasPage';
import ProfilePage from './pages/ProfilePage';
=======
>>>>>>> ff41acb288869092937bea1f11b6bbaa65dbb5b8
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream flex flex-col font-sans">
        
<<<<<<< HEAD
        {/* ROTAS PÚBLICAS SEM LAYOUT (Visitantes) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        {/* ROTAS COM LAYOUT (Header + Footer) */}
        <Route path="/" element={<Layout />}>
          
          {/* ENTRYPOINT PÚBLICO */}
          <Route element={<PublicRoute />}>
            <Route index element={<LandingPage />} />
          </Route>
          
          {/* ROTAS PROTEGIDAS (Apenas usuários logados) */}
          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<HomePage />} />
            <Route path="resenhas" element={<ResenhasPage />} />
            <Route path="post/:id" element={<PostPage />} />
            <Route path="criar-resenha" element={<CreatePostPage />} />
            <Route path="teatro" element={<CategoryPage categoryName="TEATRO" />} />
            <Route path="musica" element={<CategoryPage categoryName="MÚSICA" />} />
            <Route path="moda" element={<CategoryPage categoryName="MODA" />} />
            <Route path="cinema" element={<CategoryPage categoryName="CINEMA" />} />
            <Route path="literatura" element={<CategoryPage categoryName="LITERATURA" />} />
            <Route path="novoPost" element={<CreatePostPage/>} />
            <Route path="perfil" element={<ProfilePage />} />
=======
        {/* Navbar unificada (adapta-se automaticamente para público ou logado) */}
        <Navbar />
>>>>>>> ff41acb288869092937bea1f11b6bbaa65dbb5b8

        <main className="flex-grow flex flex-col">
          <Routes>
            
            {/* ✦ FLUXO DE VISITANTE (Sem login) ✦ */}
            <Route element={<PublicRoute />}>
              {/* 1º PASSO: A Landing Page de apresentação da revista */}
              <Route path="/" element={<LandingPage />} />
              
              {/* 2º PASSO: Telas de autenticação */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* ✦ FLUXO DO ASSINANTE (Apenas após fazer login ou cadastro) ✦ */}
            <Route element={<ProtectedRoute />}>
              {/* 3º PASSO: O usuário é redirecionado para a Home da área logada */}
              <Route path="/home" element={<Home />} />
              
              {/* Navegação entre Resenhas e Perfil */}
              <Route path="/resenhas" element={<Resenhas />} />
              <Route path="/perfil/:userId" element={<PerfilUsuario />} />
              
              {/* Leitura e Criação de Resenhas */}
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/novoPost" element={<CreatePostPage />} />
            </Route>

            {/* Rota para páginas inexistentes */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </main>

        <footer className="border-t border-gray-300/60 py-6 text-center text-xs font-mono uppercase tracking-widest text-gray-editorial bg-cream">
          © {new Date().getFullYear()} Lumina — Crítica de Arte & Cultura
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
