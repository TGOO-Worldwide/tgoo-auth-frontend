import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function PublicRoute() {
  const { isAuthenticated } = useAuthStore();
  
  // Se já está autenticado, redirecionar para dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}
