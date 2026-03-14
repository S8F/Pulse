/**
 * Metric card organism for the Team Overview dashboard.
 * Composes the shadcn Card molecule with a metric-specific layout
 * showing an icon, numeric value, label, and sub-label.
 */

import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Card, CardContent } from '../molecules'

interface MetricCardProps {
  label: string
  value: number
  subLabel: string
  icon: LucideIcon
  color: string
  bgColor: string
  className?: string
}

export function MetricCard({
  label,
  value,
  subLabel,
  icon: Icon,
  color,
  bgColor,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn('gap-0 rounded-lg hover:shadow-md transition-all duration-200', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-foreground-muted">{label}</span>
          <div className={cn('p-2 rounded-lg', bgColor)}>
            <Icon className={cn('w-5 h-5', color)} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">{value}</span>
          <span className="text-sm text-foreground-muted">{subLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}
