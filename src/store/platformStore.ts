import { create } from 'zustand';
import platformService from '@/services/platform.service';
import type { Platform, CreatePlatformDto, UpdatePlatformDto } from '@/types/platform.types';

interface PlatformState {
  platforms: Platform[];
  selectedPlatform: Platform | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchPlatforms: () => Promise<void>;
  selectPlatform: (platform: Platform | null) => void;
  createPlatform: (data: CreatePlatformDto) => Promise<Platform>;
  updatePlatform: (id: number, data: UpdatePlatformDto) => Promise<Platform>;
  deletePlatform: (id: number) => Promise<void>;
  clearError: () => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  platforms: [],
  selectedPlatform: null,
  isLoading: false,
  error: null,
  
  fetchPlatforms: async () => {
    set({ isLoading: true, error: null });
    try {
      const platforms = await platformService.getAll();
      set({ platforms, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  selectPlatform: (platform) => {
    set({ selectedPlatform: platform });
  },
  
  createPlatform: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newPlatform = await platformService.create(data);
      set((state) => ({
        platforms: [...state.platforms, newPlatform],
        isLoading: false,
      }));
      return newPlatform;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  updatePlatform: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await platformService.update(id, data);
      set((state) => ({
        platforms: state.platforms.map((p) => 
          p.id === id ? updated : p
        ),
        isLoading: false,
      }));
      return updated;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  deletePlatform: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await platformService.delete(id);
      set((state) => ({
        platforms: state.platforms.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  clearError: () => {
    set({ error: null });
  },
}));
