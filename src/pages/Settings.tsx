import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, type ChangePasswordFormData } from '@/utils/validators';
import { toast } from 'react-hot-toast';
import authService from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

export default function Settings() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });
  
  const onSubmit = async (data: ChangePasswordFormData) => {
    setSubmitting(true);
    try {
      await authService.changePassword(data.currentPassword, data.newPassword);
      toast.success('Senha alterada com sucesso!');
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao alterar senha');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie suas preferências e segurança</p>
      </div>
      
      {/* Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Informações da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input value={user?.email || ''} disabled />
          </div>
          <div>
            <Label>Nome Completo</Label>
            <Input value={user?.fullName || '-'} disabled />
          </div>
          <div>
            <Label>Role</Label>
            <Input value={user?.role || ''} disabled />
          </div>
          <div>
            <Label>Plataforma</Label>
            <Input value={user?.platform.name || ''} disabled />
          </div>
        </CardContent>
      </Card>
      
      {/* Alterar Senha */}
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Atualize sua senha de acesso</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Senha Atual *</Label>
              <Input id="currentPassword" type="password" {...register('currentPassword')} />
              {errors.currentPassword && <p className="text-sm text-red-500 mt-1">{errors.currentPassword.message}</p>}
            </div>
            <div>
              <Label htmlFor="newPassword">Nova Senha *</Label>
              <Input id="newPassword" type="password" {...register('newPassword')} />
              {errors.newPassword && <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Nova Senha *</Label>
              <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
