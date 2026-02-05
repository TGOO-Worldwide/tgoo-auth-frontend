import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, XCircle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'info' | 'warning' | 'danger';
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  onConfirm,
  onCancel,
  variant = 'info',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const icons = {
    info: <Info className="h-6 w-6 text-blue-600" />,
    warning: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
    danger: <XCircle className="h-6 w-6 text-red-600" />,
  };

  const buttonVariants = {
    info: 'default',
    warning: 'default',
    danger: 'destructive',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            {icons[variant]}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={buttonVariants[variant] as any}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processando...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
