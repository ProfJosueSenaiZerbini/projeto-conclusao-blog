import { useState, useEffect, useCallback } from 'react';
import { getPost } from '../services/api';

export const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getPost(id);
      setPost(data);
    } catch (err) {
      setError(err.response?.data?.mensagem || err.response?.data?.mensegem || 'Erro ao carregar o post. Pode ter sido removido ou não existe.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, loading, error, refetch: fetchPost };
};

