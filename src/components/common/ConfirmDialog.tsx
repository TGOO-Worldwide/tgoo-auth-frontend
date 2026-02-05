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
    info: <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200"><Info className="h-6 w-6 text-blue-600" /></div>,
    warning: <div className="p-3 rounded-full bg-gradient-to-br from-amber-100 to-amber-200"><AlertTriangle className="h-6 w-6 text-amber-600" /></div>,
    danger: <div className="p-3 rounded-full bg-gradient-to-br from-red-100 to-red-200"><XCircle className="h-6 w-6 text-red-600" /></div>,
  };

  const buttonVariants = {
    info: 'default',
    warning: 'default',
    danger: 'destructive',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {icons[variant]}
            <div className="flex-1">
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className="mt-2 text-base">{message}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 sm:flex-1"
          >
            {cancelText}
          </Button>
          <Button
            variant={buttonVariants[variant] as any}
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 sm:flex-1"
          >
            {loading ? 'Processando...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
