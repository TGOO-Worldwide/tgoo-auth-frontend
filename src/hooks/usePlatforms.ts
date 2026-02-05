import { useEffect } from 'react';
import { usePlatformStore } from '@/store/platformStore';

export function usePlatforms() {
  const { 
    platforms, 
    isLoading, 
    error, 
    fetchPlatforms,
    selectedPlatform,
    selectPlatform,
    createPlatform,
    updatePlatform,
    deletePlatform,
  } = usePlatformStore();
  
  useEffect(() => {
    if (platforms.length === 0 && !isLoading) {
      fetchPlatforms();
    }
  }, []);
  
  return {
    platforms,
    isLoading,
    error,
    refetch: fetchPlatforms,
    selectedPlatform,
    selectPlatform,
    createPlatform,
    updatePlatform,
    deletePlatform,
  };
}
