import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Request: Adicionar token JWT
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authData = localStorage.getItem('auth-storage');
    
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const token = parsed.state?.token;
        
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de Response: Tratar erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    
    if (status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('auth-storage');
      toast.error('Sessão expirada. Faça login novamente.');
      window.location.href = '/login';
    } else if (status === 403) {
      toast.error('Você não tem permissão para essa ação.');
    } else if (status && status >= 500) {
      toast.error('Erro no servidor. Tente novamente mais tarde.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
