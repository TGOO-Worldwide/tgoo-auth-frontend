import { Badge } from '@/components/ui/badge';
import { STATUS_LABELS, STATUS_COLORS, ROLE_LABELS, ROLE_COLORS } from '@/utils/constants';

interface StatusBadgeProps {
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={STATUS_COLORS[status] as any}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}

interface RoleBadgeProps {
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Badge variant={ROLE_COLORS[role] as any}>
      {ROLE_LABELS[role]}
    </Badge>
  );
}
