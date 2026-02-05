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

export interface LoginCredentials {
  email: string;
  password: string;
  platform?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UserProfile {
  id: number;
  email: string;
  fullName: string | null;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED';
  createdAt: string;
  updatedAt: string;
  platform: {
    id: number;
    code: string;
    name: string;
    domain: string | null;
  };
}
