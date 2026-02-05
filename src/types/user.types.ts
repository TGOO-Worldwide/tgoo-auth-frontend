export interface User {
  id: number;
  email: string;
  fullName: string | null;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED';
  platformId: number;
  createdAt: string;
  updatedAt: string;
  platform: {
    id: number;
    code: string;
    name: string;
  };
}

export interface CreateUserDto {
  email: string;
  password: string;
  fullName?: string;
  platform: string; // código da plataforma
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  status?: 'PENDING' | 'ACTIVE' | 'BLOCKED';
}

export interface UpdateUserDto {
  fullName?: string;
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  status?: 'PENDING' | 'ACTIVE' | 'BLOCKED';
}

export interface UserFilters {
  platform?: string;
  role?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}
