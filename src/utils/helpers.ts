import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility para combinar classes CSS (Tailwind + clsx)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mapa de mensagens de erro amigáveis
const errorMessages: Record<string, string> = {
  'Email e senha são obrigatórios': 'Por favor, preencha todos os campos',
  'Plataforma é obrigatória': 'Erro de configuração. Contate o suporte',
  'Plataforma inválida': 'Plataforma não encontrada',
  'Plataforma está inativa': 'Plataforma temporariamente indisponível',
  'Email já cadastrado nesta plataforma': 'Este email já está em uso',
  'Credenciais inválidas': 'Email ou senha incorretos',
  'Conta bloqueada': 'Sua conta foi bloqueada. Contate o administrador',
  'Conta pendente de aprovação': 'Aguardando aprovação do administrador',
  'Token não fornecido': 'Você precisa fazer login',
  'Token inválido ou expirado': 'Sessão expirada. Faça login novamente',
};

// Função para obter mensagem de erro amigável
export function getFriendlyError(error: any): string {
  const apiError = error.response?.data?.error || error.message;
  return errorMessages[apiError] || apiError || 'Erro desconhecido. Tente novamente.';
}

// Gerar iniciais de um nome
export function getInitials(name: string | null | undefined): string {
  if (!name) return '??';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Gerar cor aleatória para avatar
export function getAvatarColor(email: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  
  const hash = email.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Sleep function
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
