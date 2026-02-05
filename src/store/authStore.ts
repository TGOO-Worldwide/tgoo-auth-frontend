import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '@/services/auth.service';
import type { LoginCredentials, LoginResponse, User } from '@/types/auth.types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loadProfile: () => Promise<void>;
  updateProfile: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const response: LoginResponse = await authService.login(credentials);
          
          set({
            token: response.token,
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
      
      loadProfile: async () => {
        try {
          const profile = await authService.getProfile();
          set({ 
            user: profile as any,
            isAuthenticated: true 
          });
        } catch (error) {
          get().logout();
          throw error;
        }
      },
      
      updateProfile: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
