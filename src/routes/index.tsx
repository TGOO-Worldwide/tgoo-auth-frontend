import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Pages (criar placeholders temporários)
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Platforms from '@/pages/Platforms';
import Users from '@/pages/Users';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'platforms', element: <Platforms /> },
          { path: 'users', element: <Users /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
