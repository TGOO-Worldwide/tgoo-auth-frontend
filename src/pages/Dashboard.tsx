import { useEffect, useState } from 'react';
import { usePlatforms } from '@/hooks/usePlatforms';
import { useUsers } from '@/hooks/useUsers';
import StatsCard from '@/components/dashboard/StatsCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Building2, Users, Clock, Shield } from 'lucide-react';

interface DashboardStats {
  totalPlatforms: number;
  activePlatforms: number;
  totalUsers: number;
  pendingUsers: number;
  adminCount: number;
  superAdminCount: number;
}

export default function Dashboard() {
  const { platforms, isLoading: platformsLoading } = usePlatforms();
  const { users, isLoading: usersLoading } = useUsers();
  const [stats, setStats] = useState<DashboardStats>({
    totalPlatforms: 0,
    activePlatforms: 0,
    totalUsers: 0,
    pendingUsers: 0,
    adminCount: 0,
    superAdminCount: 0,
  });
  
  useEffect(() => {
    if (!platformsLoading && !usersLoading) {
      setStats({
        totalPlatforms: platforms.length,
        activePlatforms: platforms.filter(p => p.isActive).length,
        totalUsers: users.length,
        pendingUsers: users.filter(u => u.status === 'PENDING').length,
        adminCount: users.filter(u => u.role === 'ADMIN').length,
        superAdminCount: users.filter(u => u.role === 'SUPER_ADMIN').length,
      });
    }
  }, [platforms, users, platformsLoading, usersLoading]);
  
  if (platformsLoading || usersLoading) {
    return <LoadingSpinner fullScreen />;
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-6 border-2 border-primary/20 shadow-lg">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">Visão geral do sistema de autenticação</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Plataformas"
          value={stats.totalPlatforms}
          subtitle={`${stats.activePlatforms} ativas`}
          icon={Building2}
          color="blue"
        />
        
        <StatsCard
          title="Total de Usuários"
          value={stats.totalUsers}
          subtitle={`${stats.adminCount} admins`}
          icon={Users}
          color="green"
        />
        
        <StatsCard
          title="Usuários Pendentes"
          value={stats.pendingUsers}
          subtitle="Aguardando aprovação"
          icon={Clock}
          color="orange"
        />
        
        <StatsCard
          title="SUPER_ADMIN"
          value={stats.superAdminCount}
          subtitle="Administradores globais"
          icon={Shield}
          color="purple"
        />
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl border-2 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Plataformas Recentes</h3>
          </div>
          <div className="space-y-3">
            {platforms.slice(0, 5).map((platform) => (
              <div key={platform.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div>
                  <p className="font-semibold text-foreground">{platform.name}</p>
                  <p className="text-sm text-muted-foreground font-medium">{platform.code}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  platform.isActive 
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                    : 'bg-muted text-muted-foreground border border-border'
                }`}>
                  {platform.isActive ? 'Ativa' : 'Inativa'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm rounded-xl border-2 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-bold text-foreground">Usuários Recentes</h3>
          </div>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div>
                  <p className="font-semibold text-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground font-medium">{user.platform.name}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  user.status === 'ACTIVE' 
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                    : user.status === 'PENDING'
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {user.status === 'ACTIVE' ? 'Ativo' : user.status === 'PENDING' ? 'Pendente' : 'Bloqueado'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
