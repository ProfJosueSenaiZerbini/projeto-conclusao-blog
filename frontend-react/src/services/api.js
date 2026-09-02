import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Endereço do backend
  timeout: 10000,
});

// 🟢 INTERCEPTOR DE REQUISIÇÃO (Envia o token automaticamente em todas as chamadas)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('plural_token');
    if (token) {
      // Formato padrão "Bearer TOKEN" (ou altere para `config.headers.Authorization = token` se seu backend não usar Bearer)
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de forma padronizada
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getPosts = () => {
  return api.get('/posts');
};

export const getPost = (id) => {
  return api.get(`/posts/${id}`);
};

// Endpoints adicionados conforme o novo escopo da Landing Page
export const searchPosts = (query) => {
  return api.get(`/search?q=${query}`);
};

export const getDemo = () => {
  return api.get('/demo');
};

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const createPost = (postData) => {
  return api.post('/posts/criar', postData);
};

export default api;