import { NavLink } from 'react-router-dom';
import { Home, Building2, Users, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn, getInitials, getAvatarColor } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { APP_NAME } from '@/utils/constants';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Plataformas', path: '/platforms' },
  { icon: Users, label: 'Usuários', path: '/users' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">{APP_NAME}</h1>
        <p className="text-xs text-gray-500 mt-1">Plataforma Master</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-700 hover:bg-gray-100'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className={getAvatarColor(user?.email || '')}>
            <AvatarFallback className="text-white font-semibold">
              {getInitials(user?.fullName || user?.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.fullName || user?.email}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
