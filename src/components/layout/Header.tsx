import { useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { getInitials, getAvatarColor } from '@/utils/helpers';
import { User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/platforms': 'Plataformas',
  '/users': 'Usuários',
  '/settings': 'Configurações',
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const pageTitle = pageTitles[location.pathname] || 'Painel';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{pageTitle}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Bem-vindo, {user?.fullName || user?.email}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className={getAvatarColor(user?.email || '')}>
                  <AvatarFallback className="text-white font-semibold">
                    {getInitials(user?.fullName || user?.email)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{user?.fullName || user?.email}</p>
                  <p className="text-xs text-gray-500 font-normal">{user?.email}</p>
                  <p className="text-xs text-gray-500 font-normal mt-1">
                    Role: <strong>{user?.role}</strong>
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
