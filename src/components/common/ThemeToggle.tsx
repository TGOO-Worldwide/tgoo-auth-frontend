import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
}

export default function ThemeToggle({ className, variant = 'ghost' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      className={cn('relative h-10 w-10 rounded-full', className)}
      title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      <Sun className={cn(
        'h-5 w-5 rotate-0 scale-100 transition-all duration-300',
        theme === 'dark' && 'rotate-90 scale-0'
      )} />
      <Moon className={cn(
        'absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300',
        theme === 'dark' && 'rotate-0 scale-100'
      )} />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
