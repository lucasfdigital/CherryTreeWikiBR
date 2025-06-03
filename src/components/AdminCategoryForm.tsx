import { useState } from 'react';
import { createCategory } from '../lib/wiki';

interface AdminCategoryFormProps {
  onSuccess: () => void;
}

export function AdminCategoryForm({ onSuccess }: AdminCategoryFormProps) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createCategory(name, icon, description);
      onSuccess();
      setName('');
      setIcon('');
      setDescription('');
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label>Nome da Categoria</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Ícone</label>
        <input
          type="text"
          className="form-control"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="fas fa-book"
          required
        />
      </div>

      <div className="form-group">
        <label>Descrição</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? (
          <span><i className="fas fa-spinner fa-spin"></i> Criando...</span>
        ) : (
          <span><i className="fas fa-plus"></i> Criar Categoria</span>
        )}
      </button>
    </form>
  );
}