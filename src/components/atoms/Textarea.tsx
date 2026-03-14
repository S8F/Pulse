/**
 * App-level Textarea atom.
 * Extends the shadcn Textarea with an optional error state
 * (red ring + aria-invalid).
 */

import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'
import { Textarea as ShadcnTextarea } from '../../ui/textarea'

interface AppTextareaProps extends ComponentProps<typeof ShadcnTextarea> {
  error?: boolean
}

export function Textarea({ error, className, ...props }: AppTextareaProps) {
  return (
    <ShadcnTextarea
      aria-invalid={error || undefined}
      className={cn(error && 'border-danger-500 ring-danger-500/20 ring-2', className)}
      {...props}
    />
  )
}
