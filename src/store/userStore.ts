import { create } from 'zustand';
import userService from '@/services/user.service';
import type { User, CreateUserDto, UpdateUserDto, UserFilters } from '@/types/user.types';

interface UserState {
  users: User[];
  selectedUser: User | null;
  filters: UserFilters;
  total: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUsers: (filters?: UserFilters) => Promise<void>;
  selectUser: (user: User | null) => void;
  createUser: (data: CreateUserDto) => Promise<User>;
  updateUser: (id: number, data: UpdateUserDto) => Promise<User>;
  deleteUser: (id: number) => Promise<void>;
  setFilters: (filters: UserFilters) => void;
  clearFilters: () => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  filters: {},
  total: 0,
  isLoading: false,
  error: null,
  
  fetchUsers: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const filtersToUse = filters || get().filters;
      const { users, total } = await userService.getAll(filtersToUse);
      set({ users, total, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  selectUser: (user) => {
    set({ selectedUser: user });
  },
  
  createUser: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await userService.create(data);
      set((state) => ({
        users: [newUser, ...state.users],
        total: state.total + 1,
        isLoading: false,
      }));
      return newUser;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  updateUser: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await userService.update(id, data);
      set((state) => ({
        users: state.users.map((u) => 
          u.id === id ? updated : u
        ),
        isLoading: false,
      }));
      return updated;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await userService.delete(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        total: state.total - 1,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  
  setFilters: (filters) => {
    set({ filters });
  },
  
  clearFilters: () => {
    set({ filters: {} });
  },
  
  clearError: () => {
    set({ error: null });
  },
}));
