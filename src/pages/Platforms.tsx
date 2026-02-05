import { useState } from 'react';
import { usePlatforms } from '@/hooks/usePlatforms';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { platformSchema, type PlatformFormData } from '@/utils/validators';
import { toast } from 'react-hot-toast';
import type { Platform } from '@/types/platform.types';

export default function Platforms() {
  const { platforms, isLoading, createPlatform, updatePlatform, refetch } = usePlatforms();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PlatformFormData>({
    resolver: zodResolver(platformSchema),
  });
  
  const openCreateDialog = () => {
    setEditingPlatform(null);
    reset({ code: '', name: '', domain: '', description: '', isActive: true });
    setDialogOpen(true);
  };
  
  const openEditDialog = (platform: Platform) => {
    setEditingPlatform(platform);
    reset({
      code: platform.code,
      name: platform.name,
      domain: platform.domain || '',
      description: platform.description || '',
      isActive: platform.isActive,
    });
    setDialogOpen(true);
  };
  
  const onSubmit = async (data: PlatformFormData) => {
    setSubmitting(true);
    try {
      if (editingPlatform) {
        await updatePlatform(editingPlatform.id, data);
        toast.success('Plataforma atualizada com sucesso!');
      } else {
        await createPlatform(data);
        toast.success('Plataforma criada com sucesso!');
      }
      setDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao salvar plataforma');
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
          <h1 className="text-3xl font-bold text-gray-900">Plataformas</h1>
          <p className="text-gray-600 mt-1">Gerencie todas as plataformas do ecossistema TGOO</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Plataforma
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openEditDialog(platform)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{platform.name}</CardTitle>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  platform.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {platform.isActive ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <CardDescription>{platform.code}</CardDescription>
            </CardHeader>
            <CardContent>
              {platform.domain && (
                <p className="text-sm text-gray-600 mb-2">{platform.domain}</p>
              )}
              <p className="text-sm text-gray-500">
                {platform._count?.users || 0} usuários
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPlatform ? 'Editar Plataforma' : 'Nova Plataforma'}</DialogTitle>
            <DialogDescription>
              {editingPlatform ? 'Atualize as informações da plataforma' : 'Crie uma nova plataforma no sistema'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="code">Código *</Label>
              <Input id="code" {...register('code')} disabled={!!editingPlatform} />
              {errors.code && <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>}
            </div>
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="domain">Domínio</Label>
              <Input id="domain" {...register('domain')} placeholder="https://..." />
              {errors.domain && <p className="text-sm text-red-500 mt-1">{errors.domain.message}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
