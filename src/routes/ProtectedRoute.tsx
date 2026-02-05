import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useAuthStore();
  
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'user:', user);
  
  // Verificar autenticação
  if (!isAuthenticated || !user) {
    console.log('Redirecionando para /login');
    return <Navigate to="/login" replace />;
  }
  
  // Verificar se é SUPER_ADMIN
  if (user.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="text-gray-600 mb-4">
            Apenas SUPER_ADMIN pode acessar esta plataforma.
          </p>
          <p className="text-sm text-gray-500">
            Seu perfil: <strong>{user.role}</strong>
          </p>
        </div>
      </div>
    );
  }
  
  return <Outlet />;
}
