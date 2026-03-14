/**
 * App-level Label atom.
 * Extends the shadcn Label with an optional required-field indicator (*).
 */

import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'
import { Label as ShadcnLabel } from '../../ui/label'

interface AppLabelProps extends ComponentProps<typeof ShadcnLabel> {
  required?: boolean
}

export function Label({ required, children, className, ...props }: AppLabelProps) {
  return (
    <ShadcnLabel className={cn('text-sm font-medium text-foreground', className)} {...props}>
      {children}
      {required && <span className="text-danger-500 ml-0.5">*</span>}
    </ShadcnLabel>
  )
}
