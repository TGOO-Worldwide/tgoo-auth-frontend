import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { StatusBadge, RoleBadge } from '@/components/common/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCreateSchema, type UserCreateFormData } from '@/utils/validators';
import { toast } from 'react-hot-toast';
import { usePlatforms } from '@/hooks/usePlatforms';
import { formatDate } from '@/utils/formatters';

export default function Users() {
  const { users, isLoading, createUser, refetch } = useUsers();
  const { platforms } = usePlatforms();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<UserCreateFormData>({
    resolver: zodResolver(userCreateSchema),
  });
  
  const openCreateDialog = () => {
    reset({ email: '', password: '', fullName: '', platform: '', role: 'USER', status: 'PENDING' });
    setDialogOpen(true);
  };
  
  const onSubmit = async (data: UserCreateFormData) => {
    setSubmitting(true);
    try {
      await createUser(data);
      toast.success('Usuário criado com sucesso!');
      setDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao criar usuário');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os usuários do sistema</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado em</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Usuário</DialogTitle>
            <DialogDescription>Crie um novo usuário no sistema</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Senha *</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input id="fullName" {...register('fullName')} />
            </div>
            <div>
              <Label htmlFor="platform">Plataforma *</Label>
              <Controller
                name="platform"
                control={control}
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
              {errors.platform && <p className="text-sm text-red-500 mt-1">{errors.platform.message}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Criando...' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
