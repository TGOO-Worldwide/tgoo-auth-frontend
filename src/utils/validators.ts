import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  platform: z.string().optional(),
});

// Platform Schema
export const platformSchema = z.object({
  code: z
    .string()
    .min(2, 'Código deve ter no mínimo 2 caracteres')
    .regex(/^[a-z_]+$/, 'Apenas letras minúsculas e underline são permitidos'),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  domain: z
    .string()
    .url('Domínio inválido')
    .optional()
    .or(z.literal('')),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

// User Create Schema
export const userCreateSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  fullName: z.string().optional(),
  platform: z.string().min(1, 'Plataforma é obrigatória'),
  role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']).default('USER'),
  status: z.enum(['PENDING', 'ACTIVE', 'BLOCKED']).default('PENDING'),
});

// User Update Schema
export const userUpdateSchema = z.object({
  fullName: z.string().optional(),
  role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']).optional(),
  status: z.enum(['PENDING', 'ACTIVE', 'BLOCKED']).optional(),
});

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha obrigatória'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type PlatformFormData = z.infer<typeof platformSchema>;
export type UserCreateFormData = z.infer<typeof userCreateSchema>;
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
