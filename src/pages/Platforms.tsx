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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Plataformas</h1>
          <p className="text-muted-foreground mt-1 font-medium">Gerencie todas as plataformas do ecossistema TGOO</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Plataforma
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id} className="cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02] bg-card/80 backdrop-blur-sm" onClick={() => openEditDialog(platform)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-foreground">{platform.name}</CardTitle>
                <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 ${
                  platform.isActive 
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' 
                    : 'bg-muted text-muted-foreground border-border'
                }`}>
                  {platform.isActive ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <CardDescription className="font-mono text-primary">{platform.code}</CardDescription>
            </CardHeader>
            <CardContent>
              {platform.domain && (
                <p className="text-sm text-muted-foreground mb-2 font-medium">{platform.domain}</p>
              )}
              <p className="text-sm text-muted-foreground font-semibold">
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
