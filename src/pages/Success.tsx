import { Link } from 'react-router-dom';

export function Success() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-green-500 mb-4">
          <i className="fas fa-check-circle text-6xl" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Pagamento Confirmado!</h1>
        <p className="text-gray-600 mb-6">
          Obrigado por apoiar a CherryTreeWikiBR. Sua contribuição é muito importante para nós!
        </p>
        <Link
          to="/"
          className="btn btn-primary"
        >
          <i className="fas fa-home" /> Voltar para a Wiki
        </Link>
      </div>
    </div>
  );
}