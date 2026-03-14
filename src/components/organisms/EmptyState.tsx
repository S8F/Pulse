/**
 * Generic empty-state placeholder displayed when a list or section
 * has no data to show. Renders an icon, headline, description, and
 * an optional call-to-action element (button or link).
 */

import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 bg-surface border border-border rounded-lg',
        className,
      )}
    >
      <div className="w-32 h-32 mb-6 bg-surface-raised rounded-full flex items-center justify-center">
        <Icon className="w-16 h-16 text-foreground-subtle" />
      </div>
      <h3 className="text-foreground font-semibold mb-2">{title}</h3>
      <p className="text-foreground-muted mb-6 text-center max-w-sm">{description}</p>
      {action}
    </div>
  )
}
