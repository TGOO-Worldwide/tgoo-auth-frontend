import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function LoadingSpinner({ 
  className, 
  size = 'md',
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };
  
  const spinner = (
    <div className="relative">
      <Loader2 
        className={cn('animate-spin text-primary drop-shadow-lg', sizeClasses[size], className)} 
      />
      <Loader2 
        className={cn('animate-spin text-secondary absolute inset-0 blur-sm opacity-50', sizeClasses[size], className)} 
      />
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-tgoo-bg-light via-white to-accent/20">
        {spinner}
      </div>
    );
  }
  
  return spinner;
}
