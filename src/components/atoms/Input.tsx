/**
 * App-level Input atom.
 * Extends the shadcn Input with an optional error state
 * (red ring + aria-invalid) and a leading icon slot.
 */

import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Input as ShadcnInput } from '../../ui/input'

interface AppInputProps extends ComponentProps<typeof ShadcnInput> {
  error?: boolean
  icon?: ReactNode
}

export function Input({ error, icon, className, ...props }: AppInputProps) {
  if (icon) {
    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none">
          {icon}
        </div>
        <ShadcnInput
          aria-invalid={error || undefined}
          className={cn('pl-10', error && 'border-danger-500 ring-danger-500/20 ring-2', className)}
          {...props}
        />
      </div>
    )
  }

  return (
    <ShadcnInput
      aria-invalid={error || undefined}
      className={cn(error && 'border-danger-500 ring-danger-500/20 ring-2', className)}
      {...props}
    />
  )
}
