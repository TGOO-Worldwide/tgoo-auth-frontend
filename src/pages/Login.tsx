import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/authStore';
import { loginSchema, type LoginFormData } from '@/utils/validators';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getFriendlyError } from '@/utils/helpers';
import { APP_NAME } from '@/utils/constants';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function Login() {
  console.log('Login page rendering');
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } catch (error: any) {
      const errorMessage = getFriendlyError(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tgoo-bg-light via-background to-accent p-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-tgoo-orange/10 via-transparent to-tgoo-purple/10" />
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle variant="outline" className="shadow-lg" />
      </div>
      
      <Card className="w-full max-w-md shadow-2xl border-2 relative z-10 bg-card/95 backdrop-blur-xl">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="flex justify-center">
            <img 
              src="/logo.svg" 
              alt="TGOO Logo" 
              className="h-12 w-auto dark:brightness-110"
            />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {APP_NAME}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Plataforma Master de Autenticação
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tgoo.eu"
                {...register('email')}
                disabled={isLoading}
                autoComplete="email"
                className="h-11"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
                autoComplete="current-password"
                className="h-11"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 font-semibold text-base shadow-lg hover:shadow-xl transition-all"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-secondary/20">
              <span className="text-sm text-muted-foreground">
                Acesso restrito a <strong className="text-secondary font-bold">SUPER_ADMIN</strong>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
