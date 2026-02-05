import { useState, useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Plus, Search, X, Filter, Edit, Trash2, CheckCircle, Lock, KeyRound } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { StatusBadge, RoleBadge } from '@/components/common/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCreateSchema, userUpdateSchema, type UserCreateFormData, type UserUpdateFormData } from '@/utils/validators';
import { toast } from 'react-hot-toast';
import { usePlatforms } from '@/hooks/usePlatforms';
import { formatDate } from '@/utils/formatters';
import { useDebounce } from '@/hooks/useDebounce';
import type { UserFilters, User } from '@/types/user.types';
import ConfirmDialog from '@/components/common/ConfirmDialog';

export default function Users() {
  const { users, isLoading, createUser, updateUser, deleteUser, resetPassword, refetch, setFilters, clearFilters, filters } = useUsers();
  const { user: currentUser } = useAuth();
  const { platforms } = usePlatforms();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [resetPasswordInput, setResetPasswordInput] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Estados dos filtros
  const [searchInput, setSearchInput] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Debounce da busca
  const debouncedSearch = useDebounce(searchInput, 500);
  
  // Form para criar usuário
  const { register: registerCreate, handleSubmit: handleSubmitCreate, control: controlCreate, formState: { errors: errorsCreate }, reset: resetCreate } = useForm<UserCreateFormData>({
    resolver: zodResolver(userCreateSchema),
  });
  
  // Form para editar usuário
  const { register: registerEdit, handleSubmit: handleSubmitEdit, control: controlEdit, formState: { errors: errorsEdit }, reset: resetEdit, setValue } = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema),
  });
  
  // Aplicar filtros quando mudarem
  useEffect(() => {
    const newFilters: UserFilters = {};
    
    if (debouncedSearch) {
      newFilters.search = debouncedSearch;
    }
    
    if (platformFilter && platformFilter !== 'all') {
      newFilters.platform = platformFilter;
    }
    
    if (roleFilter && roleFilter !== 'all') {
      newFilters.role = roleFilter;
    }
    
    if (statusFilter && statusFilter !== 'all') {
      newFilters.status = statusFilter;
    }
    
    setFilters(newFilters);
    refetch(newFilters);
  }, [debouncedSearch, platformFilter, roleFilter, statusFilter]);
  
  const openCreateDialog = () => {
    resetCreate({ email: '', password: '', fullName: '', platform: '', role: 'USER', status: 'PENDING' });
    setCreateDialogOpen(true);
  };
  
  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    resetEdit({
      fullName: user.fullName || '',
      role: user.role,
      status: user.status,
    });
    setEditDialogOpen(true);
  };
  
  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };
  
  const openResetPasswordDialog = (user: User) => {
    setSelectedUser(user);
    setResetPasswordInput('');
    setResetPasswordDialogOpen(true);
  };
  
  const handleClearFilters = () => {
    setSearchInput('');
    setPlatformFilter('all');
    setRoleFilter('all');
    setStatusFilter('all');
    clearFilters();
    refetch();
  };
  
  const hasActiveFilters = searchInput || platformFilter !== 'all' || roleFilter !== 'all' || statusFilter !== 'all';
  
  const onCreateSubmit = async (data: UserCreateFormData) => {
    setSubmitting(true);
    try {
      await createUser(data);
      toast.success('Usuário criado com sucesso!');
      setCreateDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao criar usuário');
    } finally {
      setSubmitting(false);
    }
  };
  
  const onEditSubmit = async (data: UserUpdateFormData) => {
    if (!selectedUser) return;
    
    setSubmitting(true);
    try {
      await updateUser(selectedUser.id, data);
      toast.success('Usuário atualizado com sucesso!');
      setEditDialogOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao atualizar usuário');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    setSubmitting(true);
    try {
      await deleteUser(selectedUser.id);
      toast.success('Usuário excluído com sucesso!');
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao excluir usuário');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleToggleStatus = async (user: User, newStatus: 'ACTIVE' | 'BLOCKED' | 'PENDING') => {
    try {
      await updateUser(user.id, { status: newStatus });
      toast.success(`Status atualizado para ${newStatus === 'ACTIVE' ? 'Ativo' : newStatus === 'BLOCKED' ? 'Bloqueado' : 'Pendente'}!`);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao atualizar status');
    }
  };
  
  const handleResetPassword = async () => {
    if (!selectedUser) return;
    
    // Validar senha
    if (!resetPasswordInput || resetPasswordInput.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }
    
    setSubmitting(true);
    try {
      await resetPassword(selectedUser.id, resetPasswordInput);
      toast.success('Senha resetada com sucesso!');
      setResetPasswordDialogOpen(false);
      setSelectedUser(null);
      setResetPasswordInput('');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao resetar senha');
    } finally {
      setSubmitting(false);
    }
  };
  
  const canManageUser = (user: User): boolean => {
    if (!currentUser) return false;
    
    // Super Admin pode gerenciar todos
    if (currentUser.role === 'SUPER_ADMIN') return true;
    
    // Admin pode gerenciar usuários da mesma plataforma, exceto outros admins
    if (currentUser.role === 'ADMIN') {
      const currentPlatformId = currentUser.platform?.id || currentUser.platformId;
      return user.platformId === currentPlatformId && user.role !== 'SUPER_ADMIN';
    }
    
    return false;
  };
  
  if (isLoading && users.length === 0) {
    return <LoadingSpinner fullScreen />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Usuários</h1>
          <p className="text-muted-foreground mt-1 font-medium">Gerencie todos os usuários do sistema</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>
      
      {/* Seção de Filtros */}
      <div className="bg-card/80 backdrop-blur-sm rounded-xl border-2 p-4 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Filtros</h2>
            {hasActiveFilters && (
              <span className="bg-primary/20 text-primary border-2 border-primary/30 text-xs font-bold px-2.5 py-1 rounded-full">
                Ativos
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                <X className="w-4 h-4 mr-1" />
                Limpar Filtros
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Busca */}
            <div>
              <Label htmlFor="search" className="text-sm font-semibold">
                Buscar
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Email ou nome..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Filtro de Plataforma */}
            <div>
              <Label htmlFor="platform-filter" className="text-sm font-semibold">
                Plataforma
              </Label>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger id="platform-filter" className="mt-1">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {platforms.map((p) => (
                    <SelectItem key={p.id} value={p.code}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Filtro de Role */}
            <div>
              <Label htmlFor="role-filter" className="text-sm font-semibold">
                Permissão
              </Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger id="role-filter" className="mt-1">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="USER">Usuário</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Filtro de Status */}
            <div>
              <Label htmlFor="status-filter" className="text-sm font-semibold">
                Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" className="mt-1">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="PENDING">Pendente</SelectItem>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="BLOCKED">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
      
      {/* Tabela de Usuários */}
      <div className="bg-card/80 backdrop-blur-sm rounded-xl border-2 shadow-lg overflow-hidden">
        {isLoading && users.length > 0 ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-muted-foreground mb-4">
              <Search className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              {hasActiveFilters
                ? 'Não encontramos usuários com os filtros aplicados. Tente ajustar os critérios de busca.'
                : 'Ainda não há usuários cadastrados no sistema. Clique em "Novo Usuário" para adicionar o primeiro.'}
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleClearFilters}
              >
                <X className="w-4 h-4 mr-2" />
                Limpar Filtros
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.fullName || '-'}</TableCell>
                  <TableCell>{user.platform?.name || '-'}</TableCell>
                  <TableCell><RoleBadge role={user.role} /></TableCell>
                  <TableCell><StatusBadge status={user.status} /></TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    {canManageUser(user) && (
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => openEditDialog(user)}
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                          onClick={() => openResetPasswordDialog(user)}
                          title="Resetar Senha"
                        >
                          <KeyRound className="h-4 w-4" />
                        </Button>
                        
                        {user.status === 'PENDING' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                            onClick={() => handleToggleStatus(user, 'ACTIVE')}
                            title="Aprovar"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {user.status === 'ACTIVE' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                            onClick={() => handleToggleStatus(user, 'BLOCKED')}
                            title="Bloquear"
                          >
                            <Lock className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {user.status === 'BLOCKED' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                            onClick={() => handleToggleStatus(user, 'ACTIVE')}
                            title="Ativar"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => openDeleteDialog(user)}
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      
      {/* Dialog Criar Usuário */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Usuário</DialogTitle>
            <DialogDescription>Crie um novo usuário no sistema</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreate(onCreateSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...registerCreate('email')} />
              {errorsCreate.email && <p className="text-sm text-red-500 mt-1">{errorsCreate.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Senha *</Label>
              <Input id="password" type="password" {...registerCreate('password')} />
              {errorsCreate.password && <p className="text-sm text-red-500 mt-1">{errorsCreate.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input id="fullName" {...registerCreate('fullName')} />
            </div>
            <div>
              <Label htmlFor="platform">Plataforma *</Label>
              <Controller
                name="platform"
                control={controlCreate}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p.id} value={p.code}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errorsCreate.platform && <p className="text-sm text-red-500 mt-1">{errorsCreate.platform.message}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Criando...' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog Editar Usuário */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Edite as informações do usuário {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit(onEditSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="edit-fullName">Nome Completo</Label>
              <Input id="edit-fullName" {...registerEdit('fullName')} />
              {errorsEdit.fullName && <p className="text-sm text-red-500 mt-1">{errorsEdit.fullName.message}</p>}
            </div>
            <div>
              <Label htmlFor="edit-role">Permissão</Label>
              <Controller
                name="role"
                control={controlEdit}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="edit-role">
                      <SelectValue placeholder="Selecione a permissão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Usuário</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      {currentUser?.role === 'SUPER_ADMIN' && (
                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errorsEdit.role && <p className="text-sm text-red-500 mt-1">{errorsEdit.role.message}</p>}
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Controller
                name="status"
                control={controlEdit}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pendente</SelectItem>
                      <SelectItem value="ACTIVE">Ativo</SelectItem>
                      <SelectItem value="BLOCKED">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errorsEdit.status && <p className="text-sm text-red-500 mt-1">{errorsEdit.status.message}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog Reset de Senha */}
      <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resetar Senha</DialogTitle>
            <DialogDescription>
              Digite a nova senha para o usuário {selectedUser?.email}. A senha deve ter no mínimo 6 caracteres.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="reset-password">Nova Senha *</Label>
              <Input 
                id="reset-password"
                type="password"
                value={resetPasswordInput} 
                onChange={(e) => setResetPasswordInput(e.target.value)}
                placeholder="Digite a nova senha (mín. 6 caracteres)"
                minLength={6}
                autoComplete="new-password"
              />
              <p className="text-sm text-gray-500 mt-1">
                A senha será alterada imediatamente após a confirmação.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setResetPasswordDialogOpen(false);
                setSelectedUser(null);
                setResetPasswordInput('');
              }}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button 
              type="button" 
              onClick={handleResetPassword}
              disabled={submitting || resetPasswordInput.length < 6}
            >
              {submitting ? 'Resetando...' : 'Resetar Senha'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog Confirmar Exclusão */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteUser}
        title="Excluir Usuário"
        description={`Tem certeza que deseja excluir o usuário ${selectedUser?.email}? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
        loading={submitting}
      />
    </div>
  );
}
