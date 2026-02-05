import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple';
}

const colorClasses = {
  blue: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600',
  green: 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600',
  orange: 'bg-gradient-to-br from-tgoo-orange/20 to-tgoo-orange/30 text-primary',
  red: 'bg-gradient-to-br from-red-100 to-red-200 text-red-600',
  purple: 'bg-gradient-to-br from-tgoo-purple/20 to-tgoo-purple/30 text-secondary',
};

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  color = 'blue' 
}: StatsCardProps) {
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn('p-3 rounded-xl shadow-sm', colorClasses[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          {formatNumber(value)}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 font-medium">{subtitle}</p>
        )}
        {trend && (
          <div className={cn(
            'flex items-center mt-2 text-sm font-semibold',
            trend.isPositive ? 'text-emerald-600' : 'text-red-600'
          )}>
            <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
            <span className="text-muted-foreground ml-2 font-normal">vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
