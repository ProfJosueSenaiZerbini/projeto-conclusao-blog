import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { createPost } from '../services/api';
import Badge from '../components/ui/Badge';
import Sparkle from '../components/ui/Sparkle';

const CATEGORIES = ['Cinema', 'Literatura', 'Música', 'Teatro', 'Moda', 'Resenha'];

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Resenha',
    content: '',
    rating: 3,
    hasSpoiler: false,
    extraFields: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }
    setLoading(true);
    setError('');

    const userRaw = localStorage.getItem('plural_user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    const usuarioId = user?.id || user?.usuario_id || user?._id;

    if (!usuarioId) {
      setError('Sessão inválida. Faça login novamente.');
      setLoading(false);
      return;
    }

    // 🟢 Mapeando os campos do React para os nomes esperados pelo backend
    const payload = {
      titulo: formData.title,
      conteudo: formData.content,
      categoria: formData.category,
      avaliacao: formData.rating,
      contemSpoiler: formData.hasSpoiler,
      camposExtras: formData.extraFields,
      usuarioId: usuarioId
    };

    try {
      await createPost(payload);
      setSuccess(true);
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.mensagem || 'Erro ao publicar resenha.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Sparkle className="text-red-editorial text-4xl mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-graphite mb-2">Publicado com sucesso!</h2>
        <p className="text-gray-editorial">Sua resenha já está nas bancas. Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      <div className="mb-10 border-b border-gray-300/40 pb-6">
        <Badge variant="outline" className="mb-3">NOVA PUBLICAÇÃO</Badge>
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-graphite tracking-tight">
          Escrever <span className="italic text-red-editorial">Resenha</span>
        </h1>
      </div>

      {error && (
        <div className="mb-8 bg-red-100 border border-red-editorial text-red-editorial text-xs font-bold uppercase tracking-wider p-4 text-center">
          ⚠ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-cream-light p-6 sm:p-10 border border-graphite shadow-[4px_4px_0_0_#1A1A1A]">
        
        {/* Título */}
        <div>
          <label className="block font-mono text-xs font-bold uppercase tracking-widest text-graphite mb-2">Título da Obra / Resenha</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            className="w-full bg-cream border border-graphite px-4 py-3 text-graphite font-serif text-xl focus:outline-none focus:border-red-editorial transition-colors" 
            placeholder="Ex: Memórias Póstumas de Brás Cubas" 
            disabled={loading} 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Categoria */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-graphite mb-2">Categoria</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
              className="w-full bg-cream border border-graphite px-4 py-3 text-graphite font-sans text-sm focus:outline-none focus:border-red-editorial transition-colors appearance-none rounded-none"
              disabled={loading}
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Avaliação */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-graphite mb-2">Sua Nota (1 a 5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className={`text-2xl transition-colors ${formData.rating >= star ? 'text-red-editorial' : 'text-gray-300 hover:text-red-editorial/50'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Campos Dinâmicos */}
        {formData.category === 'Cinema' && (
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-graphite mb-2">Onde Assistir (Opcional)</label>
            <input type="text" value={formData.extraFields} onChange={e => setFormData({...formData, extraFields: e.target.value})} className="w-full bg-cream border border-graphite px-4 py-3 font-sans text-sm focus:outline-none focus:border-red-editorial" placeholder="Ex: Em cartaz nos cinemas, Netflix..." disabled={loading} />
          </div>
        )}
        {formData.category === 'Literatura' && (
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-graphite mb-2">Autor / Editora</label>
            <input type="text" value={formData.extraFields} onChange={e => setFormData({...formData, extraFields: e.target.value})} className="w-full bg-cream border border-graphite px-4 py-3 font-sans text-sm focus:outline-none focus:border-red-editorial" placeholder="Ex: Machado de Assis / Editora Globo" disabled={loading} />
          </div>
        )}
        {formData.category === 'Teatro' && (
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-graphite mb-2">Local / Status</label>
            <input type="text" value={formData.extraFields} onChange={e => setFormData({...formData, extraFields: e.target.value})} className="w-full bg-cream border border-graphite px-4 py-3 font-sans text-sm focus:outline-none focus:border-red-editorial" placeholder="Ex: Teatro Municipal - Em Cartaz" disabled={loading} />
          </div>
        )}
        {formData.category === 'Música' && (
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-graphite mb-2">Tipo de Lançamento</label>
            <input type="text" value={formData.extraFields} onChange={e => setFormData({...formData, extraFields: e.target.value})} className="w-full bg-cream border border-graphite px-4 py-3 font-sans text-sm focus:outline-none focus:border-red-editorial" placeholder="Ex: Álbum / Single / Show ao Vivo" disabled={loading} />
          </div>
        )}

        {/* Checkbox de Spoiler */}
        <div className="flex items-center border border-gray-300 p-4 bg-white/50">
          <input
            type="checkbox"
            id="spoiler"
            checked={formData.hasSpoiler}
            onChange={(e) => setFormData({...formData, hasSpoiler: e.target.checked})}
            className="w-5 h-5 rounded-none border-graphite text-red-editorial focus:ring-red-editorial bg-cream cursor-pointer"
          />
          <label htmlFor="spoiler" className="ml-3 font-mono text-xs uppercase tracking-wider text-graphite cursor-pointer font-bold">
            ⚠ Marcar texto como Sensível / Contém Spoilers
          </label>
        </div>

        {/* Conteúdo */}
        <div>
          <label className="block font-mono text-xs font-bold uppercase tracking-widest text-graphite mb-2">Texto da Resenha</label>
          <textarea 
            value={formData.content} 
            onChange={e => setFormData({...formData, content: e.target.value})} 
            rows="10"
            className="w-full bg-cream border border-graphite px-4 py-4 text-graphite font-sans text-base leading-relaxed focus:outline-none focus:border-red-editorial transition-colors resize-y" 
            placeholder="Escreva sua análise crítica..." 
            disabled={loading} 
          ></textarea>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-gray-300/40 flex justify-end">
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full sm:w-auto bg-graphite text-white font-bold uppercase tracking-widest text-sm py-4 px-10 border border-transparent hover:bg-black hover:shadow-[4px_4px_0px_0px_rgba(200,56,43,1)] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={18} className="animate-spin" /> PUBLICANDO...</> : <>PUBLICAR RESENHA</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;