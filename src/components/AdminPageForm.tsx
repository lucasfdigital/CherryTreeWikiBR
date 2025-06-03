import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPage, updatePage } from '../lib/wiki';

interface AdminPageFormProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    category_id: string;
  };
  categories: Array<{ id: string; name: string }>;
  onSuccess: () => void;
}

export function AdminPageForm({ initialData, categories, onSuccess }: AdminPageFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (initialData) {
        await updatePage(initialData.id, title, content, categoryId);
      } else {
        await createPage(title, content, categoryId);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save page. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Categoria</label>
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Conteúdo</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? (
          <span><i className="fas fa-spinner fa-spin"></i> Salvando...</span>
        ) : (
          <span><i className="fas fa-save"></i> Salvar</span>
        )}
      </button>
    </form>
  );
}