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
import { getInitials } from '@/utils/helpers';
import { User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/common/ThemeToggle';

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
    <header className="bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {pageTitle}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            Bem-vindo, <span className="text-foreground font-semibold">{user?.fullName || user?.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
                <Avatar className="bg-gradient-to-br from-primary to-secondary border-2 border-white shadow-md">
                  <AvatarFallback className="text-white font-bold text-sm bg-transparent">
                    {getInitials(user?.fullName || user?.email)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 shadow-lg">
              <DropdownMenuLabel>
                <div className="py-1">
                  <p className="font-semibold text-base">{user?.fullName || user?.email}</p>
                  <p className="text-xs text-muted-foreground font-normal mt-1">{user?.email}</p>
                  <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md bg-secondary/10 text-secondary">
                    <p className="text-xs font-semibold">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer hover:bg-destructive/10">
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
