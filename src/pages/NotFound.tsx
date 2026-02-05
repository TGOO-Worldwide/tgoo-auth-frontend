import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Página não encontrada</h2>
        <p className="text-gray-600 mt-2 mb-8">
          A página que você está procurando não existe.
        </p>
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
