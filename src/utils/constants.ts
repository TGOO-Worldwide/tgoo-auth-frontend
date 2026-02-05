export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const PLATFORM_CODE = import.meta.env.VITE_PLATFORM_CODE || 'auth_tgoo';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'TGOO Auth Master';

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
} as const;

export const ROLE_LABELS = {
  USER: 'Usuário',
  ADMIN: 'Administrador',
  SUPER_ADMIN: 'Super Administrador',
};

export const STATUS_LABELS = {
  PENDING: 'Pendente',
  ACTIVE: 'Ativo',
  BLOCKED: 'Bloqueado',
};

export const ROLE_COLORS = {
  USER: 'info',
  ADMIN: 'secondary',
  SUPER_ADMIN: 'destructive',
} as const;

export const STATUS_COLORS = {
  PENDING: 'warning',
  ACTIVE: 'success',
  BLOCKED: 'destructive',
} as const;
