import api from './api';
import type { Platform, CreatePlatformDto, UpdatePlatformDto } from '@/types/platform.types';

const platformService = {
  // Listar todas as plataformas
  async getAll(): Promise<Platform[]> {
    const { data } = await api.get<Platform[]>('/admin/platforms');
    return data;
  },
  
  // Obter uma plataforma por ID
  async getById(id: number): Promise<Platform> {
    const { data } = await api.get<Platform>(`/admin/platforms/${id}`);
    return data;
  },
  
  // Criar nova plataforma
  async create(platform: CreatePlatformDto): Promise<Platform> {
    const { data } = await api.post<Platform>('/admin/platforms', platform);
    return data;
  },
  
  // Atualizar plataforma
  async update(id: number, platform: UpdatePlatformDto): Promise<Platform> {
    const { data } = await api.patch<Platform>(`/admin/platforms/${id}`, platform);
    return data;
  },
  
  // Deletar plataforma
  async delete(id: number): Promise<void> {
    await api.delete(`/admin/platforms/${id}`);
  },
};

export default platformService;
