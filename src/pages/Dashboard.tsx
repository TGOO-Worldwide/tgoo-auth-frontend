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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do sistema de autenticação</p>
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
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Plataformas Recentes</h3>
          <div className="space-y-3">
            {platforms.slice(0, 5).map((platform) => (
              <div key={platform.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-sm text-gray-500">{platform.code}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  platform.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {platform.isActive ? 'Ativa' : 'Inativa'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Usuários Recentes</h3>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.platform.name}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : user.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
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
