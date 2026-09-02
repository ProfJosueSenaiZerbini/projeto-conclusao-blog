import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
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
            <Route path="post/:id" element={<PostPage />} />
            <Route path="criar-resenha" element={<CreatePostPage />} />
            <Route path="teatro" element={<CategoryPage categoryName="TEATRO" />} />
            <Route path="musica" element={<CategoryPage categoryName="MÚSICA" />} />
            <Route path="moda" element={<CategoryPage categoryName="MODA" />} />
            <Route path="cinema" element={<CategoryPage categoryName="CINEMA" />} />
            <Route path="literatura" element={<CategoryPage categoryName="LITERATURA" />} />
            <Route path="novoPost" element={<CreatePostPage/>} />

          </Route>
          
          {/* ROTA 404 - NOT FOUND */}
          <Route path="*" element={<NotFoundPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
