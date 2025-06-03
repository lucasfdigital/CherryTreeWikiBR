import { Link } from 'react-router-dom';

export function Cancel() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-red-500 mb-4">
          <i className="fas fa-times-circle text-6xl" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Pagamento Cancelado</h1>
        <p className="text-gray-600 mb-6">
          O processo de pagamento foi cancelado. Se você encontrou algum problema, por favor tente novamente.
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