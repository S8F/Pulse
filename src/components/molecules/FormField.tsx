/**
 * FormField molecule.
 * Composes Label + Input (or Textarea) + error message into a single unit.
 * Reduces boilerplate in forms.
 */

import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Label } from '../atoms'

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  htmlFor?: string
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  required,
  error,
  htmlFor,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-danger-600 flex items-center gap-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
