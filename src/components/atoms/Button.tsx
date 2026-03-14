/**
 * App-level Button atom.
 * Imports the shadcn Button and extends it with app-specific variants
 * (danger, success, warning) using Tailwind classes.
 * Feature code imports from here — never from ui/button directly.
 */

import * as React from 'react'
import { cn } from '../../lib/cn'
import { buttonVariants, Button as ShadcnButton } from '../../ui/button'

type ShadcnButtonProps = React.ComponentProps<typeof ShadcnButton>

type AppVariant = 'danger' | 'success' | 'warning'

const appVariantClasses: Record<AppVariant, string> = {
  danger: 'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500/30',
  success: 'bg-success-600 text-white hover:bg-success-700 focus-visible:ring-success-500/30',
  warning: 'bg-warning-500 text-white hover:bg-warning-600 focus-visible:ring-warning-500/30',
}

interface ButtonProps extends ShadcnButtonProps {
  appVariant?: AppVariant
}

function Button({ appVariant, className, variant, ...props }: ButtonProps) {
  if (appVariant) {
    return (
      <ShadcnButton
        variant="ghost"
        className={cn(appVariantClasses[appVariant], className)}
        {...props}
      />
    )
  }

  return <ShadcnButton variant={variant} className={className} {...props} />
}

export { Button, buttonVariants }
export type { ButtonProps }
