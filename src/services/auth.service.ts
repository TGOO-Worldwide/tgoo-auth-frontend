import api from './api';
import type { LoginCredentials, LoginResponse, UserProfile } from '@/types/auth.types';

const PLATFORM_CODE = import.meta.env.VITE_PLATFORM_CODE || 'auth_tgoo';

const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      ...credentials,
      platform: PLATFORM_CODE,
    });
    return data;
  },
  
  // Obter perfil do usuário autenticado
  async getProfile(): Promise<UserProfile> {
    const { data } = await api.get<UserProfile>('/auth/profile');
    return data;
  },
  
  // Alterar senha
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/password/change', { 
      oldPassword: currentPassword, 
      newPassword 
    });
  },
};

export default authService;
