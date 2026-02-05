import { NavLink } from 'react-router-dom';
import { Home, Building2, Users, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn, getInitials } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Plataformas', path: '/platforms' },
  { icon: Users, label: 'Usuários', path: '/users' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-64 bg-gradient-to-b from-card to-tgoo-bg-light border-r border-border flex flex-col h-screen shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-border bg-background/30">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.svg" 
            alt="TGOO Logo" 
            className="h-10 w-auto dark:brightness-110"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-medium">Plataforma Master</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-md shadow-primary/30'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} />
                  <span className="font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border bg-tgoo-bg-light/50">
        <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50">
          <Avatar className="bg-gradient-to-br from-primary to-secondary border-2 border-background shadow-md">
            <AvatarFallback className="text-white font-bold text-sm bg-transparent">
              {getInitials(user?.fullName || user?.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {user?.fullName || user?.email}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
