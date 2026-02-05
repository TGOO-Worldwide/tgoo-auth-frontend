import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import type { UserFilters } from '@/types/user.types';

export function useUsers(initialFilters?: UserFilters) {
  const {
    users,
    isLoading,
    error,
    total,
    filters,
    fetchUsers,
    selectedUser,
    selectUser,
    createUser,
    updateUser,
    deleteUser,
    resetPassword,
    setFilters,
    clearFilters,
  } = useUserStore();
  
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
    fetchUsers(initialFilters);
  }, []);
  
  return {
    users,
    isLoading,
    error,
    total,
    filters,
    refetch: fetchUsers,
    selectedUser,
    selectUser,
    createUser,
    updateUser,
    deleteUser,
    resetPassword,
    setFilters,
    clearFilters,
  };
}
