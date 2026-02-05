import api from './api';
import type { User, CreateUserDto, UpdateUserDto, UserFilters } from '@/types/user.types';

const userService = {
  // Listar usuários com filtros
  async getAll(filters?: UserFilters): Promise<{ users: User[]; total: number }> {
    const { data } = await api.get('/admin/users', { params: filters });
    
    // Se a resposta for um array direto, retornar no formato esperado
    if (Array.isArray(data)) {
      return { users: data, total: data.length };
    }
    
    // Se já vier no formato esperado
    return data;
  },
  
  // Obter usuário por ID
  async getById(id: number): Promise<User> {
    const { data } = await api.get<User>(`/admin/users/${id}`);
    return data;
  },
  
  // Criar novo usuário
  async create(user: CreateUserDto): Promise<User> {
    const { data } = await api.post<User>('/admin/users', user);
    return data;
  },
  
  // Atualizar usuário
  async update(id: number, user: UpdateUserDto): Promise<User> {
    const { data } = await api.patch<User>(`/admin/users/${id}`, user);
    return data;
  },
  
  // Resetar senha do usuário (admin fornece nova senha)
  async resetPassword(id: number, newPassword: string): Promise<{ message: string }> {
    const { data } = await api.post(`/admin/users/${id}/reset-password`, { newPassword });
    return data;
  },
  
  // Deletar usuário
  async delete(id: number): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  },
};

export default userService;
