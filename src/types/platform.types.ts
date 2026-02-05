export interface Platform {
  id: number;
  code: string;
  name: string;
  domain: string | null;
  description: string | null;
  isActive: boolean;
  isMaster: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    users: number;
  };
}

export interface CreatePlatformDto {
  code: string;
  name: string;
  domain?: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdatePlatformDto {
  code?: string;
  name?: string;
  domain?: string;
  description?: string;
  isActive?: boolean;
}
